import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { inflateSync } from 'node:zlib';

const PNG_SIG = Buffer.from('89504e470d0a1a0a', 'hex');
const MAX_IMAGE_BYTES = 15 * 1024 * 1024;

function paethPredictor(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  return pb <= pc ? b : c;
}

export function decodePngRgba(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length < 24 || !buffer.subarray(0, 8).equals(PNG_SIG)) {
    throw new Error('Expected a valid PNG buffer.');
  }
  let offset = 8;
  let width = 0, height = 0, bitDepth = 8, colorType = 6, interlace = 0;
  let palette = null;
  let trns = null;
  const idatChunks = [];

  while (offset + 8 <= buffer.length) {
    const len = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const dataStart = offset + 8;
    const dataEnd = dataStart + len;
    if (dataEnd + 4 > buffer.length) break;
    const chunk = buffer.subarray(dataStart, dataEnd);
    if (type === 'IHDR') {
      width = chunk.readUInt32BE(0);
      height = chunk.readUInt32BE(4);
      bitDepth = chunk[8];
      colorType = chunk[9];
      interlace = chunk[12];
    } else if (type === 'PLTE') {
      palette = chunk;
    } else if (type === 'tRNS') {
      trns = chunk;
    } else if (type === 'IDAT') {
      idatChunks.push(chunk);
    } else if (type === 'IEND') {
      break;
    }
    offset = dataEnd + 4;
  }

  if (!width || !height || !idatChunks.length) {
    throw new Error('PNG missing image header or pixel data.');
  }
  if (interlace !== 0) {
    throw new Error('Interlaced PNG decoding requires macOS sips conversion or non-interlaced PNG.');
  }

  const channelsMap = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 };
  const channels = channelsMap[colorType];
  if (!channels) throw new Error(`Unsupported PNG color type: ${colorType}`);

  const inflated = inflateSync(Buffer.concat(idatChunks));
  const bppBits = channels * bitDepth;
  const filterBpp = Math.max(1, Math.ceil(bppBits / 8));
  const rowBytes = Math.ceil((width * bppBits) / 8);
  const expectedLen = height * (rowBytes + 1);
  if (inflated.length < expectedLen) {
    throw new Error('Truncated PNG pixel stream.');
  }

  const raw = new Uint8Array(height * rowBytes);
  for (let y = 0; y < height; y++) {
    const srcRow = y * (rowBytes + 1);
    const filter = inflated[srcRow];
    const dstRow = y * rowBytes;
    const prevRow = (y - 1) * rowBytes;
    for (let x = 0; x < rowBytes; x++) {
      const val = inflated[srcRow + 1 + x];
      const a = x >= filterBpp ? raw[dstRow + x - filterBpp] : 0;
      const b = y > 0 ? raw[prevRow + x] : 0;
      const c = y > 0 && x >= filterBpp ? raw[prevRow + x - filterBpp] : 0;
      if (filter === 0) raw[dstRow + x] = val;
      else if (filter === 1) raw[dstRow + x] = (val + a) & 255;
      else if (filter === 2) raw[dstRow + x] = (val + b) & 255;
      else if (filter === 3) raw[dstRow + x] = (val + ((a + b) >> 1)) & 255;
      else if (filter === 4) raw[dstRow + x] = (val + paethPredictor(a, b, c)) & 255;
      else throw new Error(`Unsupported PNG filter ${filter}`);
    }
  }

  const rgba = new Uint8Array(width * height * 4);
  const scaleSample = s => bitDepth === 16 ? (s >> 8) : bitDepth === 8 ? s : Math.round((s * 255) / ((1 << bitDepth) - 1));
  const readSubByte = (rowOffset, sampleIndex) => {
    if (bitDepth === 8) return raw[rowOffset + sampleIndex];
    if (bitDepth === 16) {
      const idx = rowOffset + sampleIndex * 2;
      return (raw[idx] << 8) | raw[idx + 1];
    }
    const perByte = 8 / bitDepth;
    const byteIdx = rowOffset + Math.floor(sampleIndex / perByte);
    const shift = (perByte - 1 - (sampleIndex % perByte)) * bitDepth;
    return (raw[byteIdx] >> shift) & ((1 << bitDepth) - 1);
  };

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowBytes;
    for (let x = 0; x < width; x++) {
      const out = (y * width + x) * 4;
      if (colorType === 6) {
        rgba[out] = scaleSample(readSubByte(rowOffset, x * 4));
        rgba[out + 1] = scaleSample(readSubByte(rowOffset, x * 4 + 1));
        rgba[out + 2] = scaleSample(readSubByte(rowOffset, x * 4 + 2));
        rgba[out + 3] = scaleSample(readSubByte(rowOffset, x * 4 + 3));
      } else if (colorType === 2) {
        rgba[out] = scaleSample(readSubByte(rowOffset, x * 3));
        rgba[out + 1] = scaleSample(readSubByte(rowOffset, x * 3 + 1));
        rgba[out + 2] = scaleSample(readSubByte(rowOffset, x * 3 + 2));
        rgba[out + 3] = 255;
      } else if (colorType === 0) {
        const g = scaleSample(readSubByte(rowOffset, x));
        rgba[out] = rgba[out + 1] = rgba[out + 2] = g;
        rgba[out + 3] = 255;
      } else if (colorType === 4) {
        const g = scaleSample(readSubByte(rowOffset, x * 2));
        rgba[out] = rgba[out + 1] = rgba[out + 2] = g;
        rgba[out + 3] = scaleSample(readSubByte(rowOffset, x * 2 + 1));
      } else if (colorType === 3) {
        const pIdx = readSubByte(rowOffset, x);
        if (palette && pIdx * 3 + 2 < palette.length) {
          rgba[out] = palette[pIdx * 3];
          rgba[out + 1] = palette[pIdx * 3 + 1];
          rgba[out + 2] = palette[pIdx * 3 + 2];
          rgba[out + 3] = trns && pIdx < trns.length ? trns[pIdx] : 255;
        } else {
          rgba[out] = rgba[out + 1] = rgba[out + 2] = 0;
          rgba[out + 3] = 255;
        }
      }
    }
  }
  return { rgba, width, height };
}

export async function decodeImageToRgba(filePath) {
  const abs = path.resolve(filePath);
  const info = await stat(abs);
  if (!info.isFile() || !info.size || info.size > MAX_IMAGE_BYTES) {
    throw new Error(`Expected an image file under 15 MiB: ${abs}`);
  }
  const buf = await readFile(abs);
  const isPng = buf.subarray(0, 8).equals(PNG_SIG);
  const isJpeg = buf[0] === 255 && buf[1] === 216 && buf[2] === 255;
  const isWebp = buf.length >= 12 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP';
  if (!isPng && !isJpeg && !isWebp) {
    throw new Error(`Unsupported sketch image format (expected PNG, JPEG, or WebP): ${abs}`);
  }
  if (isPng) {
    try {
      return decodePngRgba(buf);
    } catch (err) {
      if (process.platform !== 'darwin' || !err.message.includes('Interlaced')) throw err;
    }
  }
  if (process.platform !== 'darwin') {
    throw new Error('JPEG/WebP or interlaced PNG extraction in Node CLI requires PNG format on this platform (or load in the viewer).');
  }
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), 'fv-sketch-'));
  const tmpPng = path.join(tmpDir, 'converted.png');
  try {
    execFileSync('/usr/bin/sips', ['-s', 'format', 'png', abs, '--out', tmpPng], { stdio: 'ignore' });
    return decodePngRgba(await readFile(tmpPng));
  } finally {
    await rm(tmpDir, { recursive: true, force: true });
  }
}
