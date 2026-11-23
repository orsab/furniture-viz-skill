import * as T from 'three';

const TAU = Math.PI * 2;
const WHITE = new T.Color(0xffffff);

function makeCanvasTexture(width, height, drawFn, { colorSpace = T.SRGBColorSpace, repeatX = 1, repeatY = 1, anisotropy = 1 } = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const pixels = ctx.createImageData(width, height);
  drawFn(pixels.data, width, height);
  ctx.putImageData(pixels, 0, 0);
  const tex = new T.CanvasTexture(canvas);
  tex.colorSpace = colorSpace;
  tex.wrapS = tex.wrapT = T.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  tex.anisotropy = anisotropy;
  return tex;
}

// Seamless periodic Sobel height-to-normal converter in linear NoColorSpace.
function heightToNormalTexture(heights, width, height, strength, repeatX, repeatY, anisotropy) {
  return makeCanvasTexture(width, height, (data, w, h) => {
    const sample = (x, y) => heights[((y + h) % h) * w + ((x + w) % w)];
    for (let y = 0, k = 0; y < h; y++) {
      for (let x = 0; x < w; x++, k += 4) {
        const tl = sample(x - 1, y - 1), t = sample(x, y - 1), tr = sample(x + 1, y - 1);
        const l = sample(x - 1, y), r = sample(x + 1, y);
        const bl = sample(x - 1, y + 1), b = sample(x, y + 1), br = sample(x + 1, y + 1);
        const dx = ((tr + 2 * r + br) - (tl + 2 * l + bl)) * strength;
        const dy = ((bl + 2 * b + br) - (tl + 2 * t + tr)) * strength;
        const nx = -dx, ny = -dy, nz = 1;
        const inv = 1 / Math.hypot(nx, ny, nz);
        data[k] = Math.round((nx * inv * 0.5 + 0.5) * 255);
        data[k + 1] = Math.round((ny * inv * 0.5 + 0.5) * 255);
        data[k + 2] = Math.round((nz * inv * 0.5 + 0.5) * 255);
        data[k + 3] = 255;
      }
    }
  }, { colorSpace: T.NoColorSpace, repeatX, repeatY, anisotropy });
}

// Tileable, deterministic multi-channel PBR maps (albedo, normal, roughness).
function buildSurfaceSet(kind, renderer) {
  const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  if (kind === 'wood') {
    const width = 1024, height = 512, repeatX = 500 / 620, repeatY = 500 / 230;
    const heights = new Float32Array(width * height);
    const roughs = new Uint8Array(width * height);
    const map = makeCanvasTexture(width, height, (data, w, h) => {
      let seed = 64873;
      for (let y = 0, idx = 0, k = 0; y < h; y++) {
        const v = (y / h) * TAU;
        for (let x = 0; x < w; x++, idx++, k += 4) {
          seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
          const noise = seed / 4294967296;
          const u = (x / w) * TAU;
          const bend = v + 0.095 * Math.sin(u + v) + 0.036 * Math.sin(2 * u - 3 * v) + 0.014 * Math.cos(3 * u + 2 * v);
          const ring = 0.5 + 0.5 * Math.sin(10 * bend + 1.35 * Math.sin(3 * bend + u));
          const fineFiber = 0.5 + 0.5 * Math.sin(82 * bend + 1.9 * Math.sin(2 * u + 7 * v));
          const poreWave = 0.5 + 0.5 * Math.sin(19 * u + 41 * bend);
          const pore = poreWave > 0.91 && noise > 0.42 ? (poreWave - 0.91) * 9.5 : 0;
          const ray = 0.5 + 0.5 * Math.sin(5 * u - 2 * v);
          const shade = Math.max(192, Math.min(252, Math.round(248 - 25 * (ring ** 3.6) - 12 * (fineFiber ** 6) - 18 * pore - 5 * ray - 6 * noise)));
          data[k] = data[k + 1] = data[k + 2] = shade;
          data[k + 3] = 255;
          heights[idx] = 0.72 * (1 - ring ** 3) + 0.16 * (1 - fineFiber ** 5) - 0.58 * pore - 0.06 * noise;
          roughs[idx] = Math.round(255 * Math.min(0.62, 0.38 + 0.14 * (ring ** 2.6) + 0.12 * pore + 0.03 * noise));
        }
      }
    }, { colorSpace: T.SRGBColorSpace, repeatX, repeatY, anisotropy });
    const roughnessMap = makeCanvasTexture(width, height, (data, w, h) => {
      for (let i = 0, k = 0; i < w * h; i++, k += 4) {
        data[k] = data[k + 1] = data[k + 2] = roughs[i];
        data[k + 3] = 255;
      }
    }, { colorSpace: T.NoColorSpace, repeatX, repeatY, anisotropy });
    const normalMap = heightToNormalTexture(heights, width, height, 1.35, repeatX, repeatY, anisotropy);
    return { map, normalMap, roughnessMap, normalScale: 0.28 };
  }

  if (kind === 'fabric') {
    const width = 512, height = 512, repeatX = 500 / 46, repeatY = 500 / 46;
    const heights = new Float32Array(width * height);
    const roughs = new Uint8Array(width * height);
    const map = makeCanvasTexture(width, height, (data, w, h) => {
      let seed = 18397;
      for (let y = 0, idx = 0, k = 0; y < h; y++) {
        const cellY = Math.floor(y / 8);
        const fy = (y % 8) / 8;
        const weftProfile = Math.sin(fy * Math.PI);
        for (let x = 0; x < w; x++, idx++, k += 4) {
          seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
          const noise = seed / 4294967296;
          const cellX = Math.floor(x / 8);
          const fx = (x % 8) / 8;
          const warpProfile = Math.sin(fx * Math.PI);
          const over = ((cellX + cellY) & 3) < 2;
          const threadTwist = 0.5 + 0.5 * Math.sin(((over ? y : x) * TAU) / 4 + ((over ? x : y) * TAU) / 16);
          const elevation = (over ? warpProfile * 0.72 + weftProfile * 0.28 : weftProfile * 0.72 + warpProfile * 0.28) * (0.82 + 0.18 * threadTwist);
          const shade = Math.max(202, Math.min(250, Math.round(206 + 38 * elevation + 6 * (noise - 0.5))));
          data[k] = data[k + 1] = data[k + 2] = shade;
          data[k + 3] = 255;
          heights[idx] = elevation + 0.08 * (noise - 0.5);
          roughs[idx] = Math.round(255 * Math.min(0.98, 0.84 + 0.13 * (1 - elevation) + 0.03 * noise));
        }
      }
    }, { colorSpace: T.SRGBColorSpace, repeatX, repeatY, anisotropy });
    const roughnessMap = makeCanvasTexture(width, height, (data, w, h) => {
      for (let i = 0, k = 0; i < w * h; i++, k += 4) {
        data[k] = data[k + 1] = data[k + 2] = roughs[i];
        data[k + 3] = 255;
      }
    }, { colorSpace: T.NoColorSpace, repeatX, repeatY, anisotropy });
    const normalMap = heightToNormalTexture(heights, width, height, 2.2, repeatX, repeatY, anisotropy);
    return { map, normalMap, roughnessMap, normalScale: 0.45 };
  }

  if (kind === 'metal') {
    const width = 512, height = 512, repeatX = 500 / 180, repeatY = 500 / 180;
    const heights = new Float32Array(width * height);
    const roughs = new Uint8Array(width * height);
    const rowJitter = new Float32Array(height);
    let rSeed = 918273;
    for (let y = 0; y < height; y++) {
      rSeed = (Math.imul(rSeed, 1664525) + 1013904223) >>> 0;
      rowJitter[y] = rSeed / 4294967296;
    }
    const map = makeCanvasTexture(width, height, (data, w, h) => {
      let seed = 44291;
      for (let y = 0, idx = 0, k = 0; y < h; y++) {
        const v = (y / h) * TAU;
        const row = rowJitter[y];
        const band = 0.5 + 0.5 * Math.sin(18 * v + 2.4 * row);
        for (let x = 0; x < w; x++, idx++, k += 4) {
          seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
          const noise = seed / 4294967296;
          const u = (x / w) * TAU;
          const streak = 0.5 + 0.5 * Math.sin(3 * u + 47 * row + 0.7 * Math.cos(7 * u - 11 * v));
          const shade = Math.max(228, Math.min(255, Math.round(234 + 13 * streak + 6 * band + 4 * noise)));
          data[k] = data[k + 1] = data[k + 2] = shade;
          data[k + 3] = 255;
          heights[idx] = 0.45 * streak + 0.35 * row + 0.2 * band;
          roughs[idx] = Math.round(255 * (0.22 + 0.13 * (1 - streak) + 0.03 * noise));
        }
      }
    }, { colorSpace: T.SRGBColorSpace, repeatX, repeatY, anisotropy });
    const roughnessMap = makeCanvasTexture(width, height, (data, w, h) => {
      for (let i = 0, k = 0; i < w * h; i++, k += 4) {
        data[k] = data[k + 1] = data[k + 2] = roughs[i];
        data[k + 3] = 255;
      }
    }, { colorSpace: T.NoColorSpace, repeatX, repeatY, anisotropy });
    const normalMap = heightToNormalTexture(heights, width, height, 0.9, repeatX, repeatY, anisotropy);
    return { map, normalMap, roughnessMap, normalScale: 0.14 };
  }

  if (kind === 'marble') {
    const width = 512, height = 512, repeatX = 500 / 700, repeatY = 500 / 700;
    const heights = new Float32Array(width * height);
    const roughs = new Uint8Array(width * height);
    const map = makeCanvasTexture(width, height, (data, w, h) => {
      let seed = 73913;
      for (let y = 0, idx = 0, k = 0; y < h; y++) {
        const v = (y / h) * TAU;
        for (let x = 0; x < w; x++, idx++, k += 4) {
          seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
          const noise = seed / 4294967296;
          const u = (x / w) * TAU;
          const warpX = 0.72 * Math.sin(u + 0.8 * v) + 0.34 * Math.cos(2 * u - 3 * v + 1.1) + 0.16 * Math.sin(5 * u + 4 * v);
          const warpY = 0.65 * Math.cos(u - v + 0.6) + 0.28 * Math.sin(3 * u + 2 * v) + 0.14 * Math.cos(4 * u - 5 * v);
          const phi = 1.6 * (u + warpX) + 1.1 * (v + warpY);
          const mainVein = (1 - Math.abs(Math.sin(phi))) ** 9;
          const secVein = (1 - Math.abs(Math.sin(2 * phi + 1.7 * Math.cos(2 * u - 2 * v)))) ** 12;
          const cloud = 0.5 + 0.5 * Math.sin(u + 2 * v + 1.2 * warpX);
          const shade = Math.max(152, Math.min(254, Math.round(248 - 10 * cloud - 58 * mainVein - 32 * secVein - 4 * noise)));
          data[k] = data[k + 1] = data[k + 2] = shade;
          data[k + 3] = 255;
          heights[idx] = 0.78 + 0.08 * cloud - 0.32 * mainVein - 0.18 * secVein - 0.03 * noise;
          roughs[idx] = Math.round(255 * Math.min(0.36, 0.14 + 0.07 * cloud + 0.11 * mainVein + 0.05 * secVein + 0.02 * noise));
        }
      }
    }, { colorSpace: T.SRGBColorSpace, repeatX, repeatY, anisotropy });
    const roughnessMap = makeCanvasTexture(width, height, (data, w, h) => {
      for (let i = 0, k = 0; i < w * h; i++, k += 4) {
        data[k] = data[k + 1] = data[k + 2] = roughs[i];
        data[k + 3] = 255;
      }
    }, { colorSpace: T.NoColorSpace, repeatX, repeatY, anisotropy });
    const normalMap = heightToNormalTexture(heights, width, height, 0.85, repeatX, repeatY, anisotropy);
    return { map, normalMap, roughnessMap, normalScale: 0.10 };
  }

  if (kind === 'brick') {
    const width = 512, height = 512, repeatX = 500 / 450, repeatY = 500 / 300;
    const heights = new Float32Array(width * height);
    const roughs = new Uint8Array(width * height);
    const cellW = width / 2, cellH = height / 4;
    const mortarHalfX = (width / 450) * 5;
    const mortarHalfY = (height / 300) * 5;
    const bevelX = (width / 450) * 5.5;
    const bevelY = (height / 300) * 5.5;
    const map = makeCanvasTexture(width, height, (data, w, h) => {
      let seed = 55109;
      for (let y = 0, idx = 0, k = 0; y < h; y++) {
        const v = (y / h) * TAU;
        for (let x = 0; x < w; x++, idx++, k += 4) {
          seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
          const noise = seed / 4294967296;
          const u = (x / w) * TAU;
          const wy = ((y + 1.2 * Math.sin(8 * u) + 0.6 * Math.cos(17 * u)) % h + h) % h;
          const row = Math.floor(wy / cellH);
          const rowShift = (row % 2) * (cellW * 0.5);
          const wx = ((x + rowShift + 1.5 * Math.sin(12 * v) + 0.7 * Math.cos(21 * v)) % w + w) % w;
          const col = Math.floor(wx / cellW);
          const lx = wx - col * cellW;
          const ly = wy - row * cellH;
          const distEdge = Math.min(
            Math.min(lx, cellW - lx) - mortarHalfX,
            Math.min(ly, cellH - ly) - mortarHalfY
          );
          const distEdgeY = Math.min(ly, cellH - ly) - mortarHalfY;
          const distEdgeX = Math.min(lx, cellW - lx) - mortarHalfX;
          const bevelT = Math.min(
            1,
            Math.max(0, distEdgeX / bevelX),
            Math.max(0, distEdgeY / bevelY)
          );
          if (distEdge <= 0) {
            const sand = Math.sin(29 * u + 11 * v) * Math.cos(37 * v - 13 * u);
            const shade = Math.max(156, Math.min(200, Math.round(176 + 10 * sand + 14 * (noise - 0.5))));
            data[k] = data[k + 1] = data[k + 2] = shade;
            data[k + 3] = 255;
            heights[idx] = 0.09 + 0.04 * noise + 0.02 * sand;
            roughs[idx] = Math.round(255 * Math.min(0.99, 0.94 + 0.04 * noise));
          } else {
            const brickHash = ((((row * 37 + col * 101 + 7) * 2654435761) >>> 0) % 1000) / 1000;
            const clay = 0.5 + 0.5 * Math.sin(5 * u + 7 * v + brickHash * 6.2) * Math.cos(9 * u - 4 * v);
            const pit = noise > 0.94 ? (noise - 0.94) * 5.2 : 0;
            const bevelFactor = bevelT < 1 ? bevelT * bevelT * (3 - 2 * bevelT) : 1;
            const baseTone = 212 + brickHash * 32;
            const shade = Math.max(176, Math.min(254, Math.round(baseTone - 14 * (1 - bevelFactor) + 10 * (clay - 0.5) - 24 * pit - 12 * noise)));
            data[k] = data[k + 1] = data[k + 2] = shade;
            data[k + 3] = 255;
            heights[idx] = 0.25 + 0.62 * bevelFactor + 0.08 * clay - 0.28 * pit - 0.06 * noise;
            roughs[idx] = Math.round(255 * Math.min(0.96, 0.8 + 0.08 * (1 - bevelFactor) + 0.06 * pit + 0.04 * noise));
          }
        }
      }
    }, { colorSpace: T.SRGBColorSpace, repeatX, repeatY, anisotropy });
    const roughnessMap = makeCanvasTexture(width, height, (data, w, h) => {
      for (let i = 0, k = 0; i < w * h; i++, k += 4) {
        data[k] = data[k + 1] = data[k + 2] = roughs[i];
        data[k + 3] = 255;
      }
    }, { colorSpace: T.NoColorSpace, repeatX, repeatY, anisotropy });
    const normalMap = heightToNormalTexture(heights, width, height, 3.0, repeatX, repeatY, anisotropy);
    return { map, normalMap, roughnessMap, normalScale: 0.72 };
  }

  if (kind === 'concrete') {
    const width = 512, height = 512, repeatX = 500 / 650, repeatY = 500 / 650;
    const heights = new Float32Array(width * height);
    const roughs = new Uint8Array(width * height);
    const map = makeCanvasTexture(width, height, (data, w, h) => {
      let seed = 27182;
      for (let y = 0, idx = 0, k = 0; y < h; y++) {
        const v = (y / h) * TAU;
        for (let x = 0; x < w; x++, idx++, k += 4) {
          seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
          const noise = seed / 4294967296;
          const u = (x / w) * TAU;
          const cloud1 = 0.5 + 0.5 * Math.sin(u + Math.cos(v + 0.7)) * Math.cos(v - Math.sin(2 * u));
          const cloud2 = 0.5 + 0.5 * Math.sin(4 * u - 3 * v + 1.4 * Math.sin(2 * u + v));
          const grit = 0.5 + 0.5 * Math.sin(13 * u + 17 * v) * Math.cos(19 * u - 11 * v);
          const pore = noise < 0.008 ? (0.008 - noise) * 90 : 0;
          const shade = Math.max(182, Math.min(248, Math.round(234 - 18 * cloud1 - 12 * cloud2 - 8 * grit - 26 * pore - 8 * noise)));
          data[k] = data[k + 1] = data[k + 2] = shade;
          data[k + 3] = 255;
          heights[idx] = 0.75 - 0.14 * cloud1 - 0.10 * cloud2 - 0.08 * grit - 0.42 * pore - 0.07 * noise;
          roughs[idx] = Math.round(255 * Math.min(0.96, 0.72 + 0.10 * cloud1 + 0.08 * pore + 0.06 * noise));
        }
      }
    }, { colorSpace: T.SRGBColorSpace, repeatX, repeatY, anisotropy });
    const roughnessMap = makeCanvasTexture(width, height, (data, w, h) => {
      for (let i = 0, k = 0; i < w * h; i++, k += 4) {
        data[k] = data[k + 1] = data[k + 2] = roughs[i];
        data[k + 3] = 255;
      }
    }, { colorSpace: T.NoColorSpace, repeatX, repeatY, anisotropy });
    const normalMap = heightToNormalTexture(heights, width, height, 1.8, repeatX, repeatY, anisotropy);
    return { map, normalMap, roughnessMap, normalScale: 0.34 };
  }

  if (kind === 'stone') {
    const width = 512, height = 512, repeatX = 500 / 600, repeatY = 500 / 600;
    const heights = new Float32Array(width * height);
    const roughs = new Uint8Array(width * height);
    const map = makeCanvasTexture(width, height, (data, w, h) => {
      let seed = 61803;
      for (let y = 0, idx = 0, k = 0; y < h; y++) {
        const v = (y / h) * TAU;
        for (let x = 0; x < w; x++, idx++, k += 4) {
          seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
          const noise = seed / 4294967296;
          const u = (x / w) * TAU;
          const strata = v + 0.14 * Math.sin(2 * u) + 0.06 * Math.cos(4 * u - v);
          const band = 0.5 + 0.5 * Math.sin(7 * strata + 1.1 * Math.sin(3 * strata));
          const poreWave = 0.5 + 0.5 * Math.sin(3 * u + 24 * strata);
          const pore = poreWave > 0.90 && noise > 0.32 ? (poreWave - 0.90) * 8.2 : 0;
          const fleck = noise > 0.97 ? -8 : 0;
          const shade = Math.max(182, Math.min(250, Math.round(240 - 18 * band - 24 * pore + fleck - 8 * noise)));
          data[k] = data[k + 1] = data[k + 2] = shade;
          data[k + 3] = 255;
          heights[idx] = 0.78 - 0.14 * band - 0.48 * pore - 0.08 * noise;
          roughs[idx] = Math.round(255 * Math.min(0.92, 0.52 + 0.16 * band + 0.20 * pore + 0.06 * noise));
        }
      }
    }, { colorSpace: T.SRGBColorSpace, repeatX, repeatY, anisotropy });
    const roughnessMap = makeCanvasTexture(width, height, (data, w, h) => {
      for (let i = 0, k = 0; i < w * h; i++, k += 4) {
        data[k] = data[k + 1] = data[k + 2] = roughs[i];
        data[k + 3] = 255;
      }
    }, { colorSpace: T.NoColorSpace, repeatX, repeatY, anisotropy });
    const normalMap = heightToNormalTexture(heights, width, height, 2.0, repeatX, repeatY, anisotropy);
    return { map, normalMap, roughnessMap, normalScale: 0.42 };
  }

  if (kind === 'terrazzo') {
    const width = 512, height = 512, repeatX = 1, repeatY = 1;
    const chipCanvas = document.createElement('canvas');
    chipCanvas.width = width;
    chipCanvas.height = height;
    const chipCtx = chipCanvas.getContext('2d');
    chipCtx.fillStyle = '#e8e8e8';
    chipCtx.fillRect(0, 0, width, height);

    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = width;
    maskCanvas.height = height;
    const maskCtx = maskCanvas.getContext('2d');
    maskCtx.fillStyle = '#000000';
    maskCtx.fillRect(0, 0, width, height);

    let seed = 88241;
    const rand = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const shades = [146, 174, 202, 224, 246];
    for (let i = 0; i < 165; i++) {
      const cx = rand() * width;
      const cy = rand() * height;
      const radius = 5 + rand() * 19;
      const verts = 5 + Math.floor(rand() * 3);
      const pts = [];
      const baseRot = rand() * TAU;
      for (let p = 0; p < verts; p++) {
        const ang = baseRot + (p / verts) * TAU + (rand() - 0.5) * 0.35;
        const r = radius * (0.62 + rand() * 0.56);
        pts.push([Math.cos(ang) * r, Math.sin(ang) * r]);
      }
      const g = shades[i % shades.length];
      for (const ox of [-width, 0, width]) {
        for (const oy of [-height, 0, height]) {
          chipCtx.beginPath();
          maskCtx.beginPath();
          pts.forEach(([px, py], idx) => {
            if (idx === 0) {
              chipCtx.moveTo(cx + ox + px, cy + oy + py);
              maskCtx.moveTo(cx + ox + px, cy + oy + py);
            } else {
              chipCtx.lineTo(cx + ox + px, cy + oy + py);
              maskCtx.lineTo(cx + ox + px, cy + oy + py);
            }
          });
          chipCtx.closePath();
          maskCtx.closePath();
          chipCtx.fillStyle = `rgb(${g},${g},${g})`;
          chipCtx.fill();
          maskCtx.fillStyle = '#ffffff';
          maskCtx.fill();
        }
      }
    }

    const chipPixels = chipCtx.getImageData(0, 0, width, height).data;
    const maskPixels = maskCtx.getImageData(0, 0, width, height).data;
    const heights = new Float32Array(width * height);
    const roughs = new Uint8Array(width * height);
    const map = makeCanvasTexture(width, height, (data, w, h) => {
      let nSeed = 19283;
      for (let i = 0, k = 0; i < w * h; i++, k += 4) {
        nSeed = (Math.imul(nSeed, 1664525) + 1013904223) >>> 0;
        const noise = nSeed / 4294967296;
        const inChip = maskPixels[k] > 128;
        const base = inChip ? chipPixels[k] : Math.round(234 + (noise - 0.5) * 16);
        const shade = Math.max(140, Math.min(254, Math.round(base + (noise - 0.5) * 6)));
        data[k] = data[k + 1] = data[k + 2] = shade;
        data[k + 3] = 255;
        heights[i] = inChip ? 0.72 - 0.04 * noise : 0.63 - 0.07 * noise;
        roughs[i] = Math.round(255 * (inChip ? 0.21 + 0.06 * noise : 0.48 + 0.08 * noise));
      }
    }, { colorSpace: T.SRGBColorSpace, repeatX, repeatY, anisotropy });
    const roughnessMap = makeCanvasTexture(width, height, (data, w, h) => {
      for (let i = 0, k = 0; i < w * h; i++, k += 4) {
        data[k] = data[k + 1] = data[k + 2] = roughs[i];
        data[k + 3] = 255;
      }
    }, { colorSpace: T.NoColorSpace, repeatX, repeatY, anisotropy });
    const normalMap = heightToNormalTexture(heights, width, height, 1.3, repeatX, repeatY, anisotropy);
    return { map, normalMap, roughnessMap, normalScale: 0.18 };
  }

  if (kind === 'tile') {
    const width = 512, height = 512, repeatX = 500 / 400, repeatY = 500 / 400;
    const heights = new Float32Array(width * height);
    const roughs = new Uint8Array(width * height);
    const cell = width / 4;
    const groutHalf = 2.6;
    const bevelPx = 6.5;
    const map = makeCanvasTexture(width, height, (data, w, h) => {
      let seed = 33921;
      for (let y = 0, idx = 0, k = 0; y < h; y++) {
        const v = (y / h) * TAU;
        const row = Math.floor(y / cell);
        const ly = y - row * cell;
        for (let x = 0; x < w; x++, idx++, k += 4) {
          seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
          const noise = seed / 4294967296;
          const u = (x / w) * TAU;
          const col = Math.floor(x / cell);
          const lx = x - col * cell;
          const edgeDist = Math.min(lx, cell - lx, ly, cell - ly) - groutHalf;
          if (edgeDist <= 0) {
            const shade = Math.max(162, Math.min(188, Math.round(174 + (noise - 0.5) * 14)));
            data[k] = data[k + 1] = data[k + 2] = shade;
            data[k + 3] = 255;
            heights[idx] = 0.06 + 0.03 * noise;
            roughs[idx] = Math.round(255 * (0.93 + 0.04 * noise));
          } else {
            const tHash = ((((row * 17 + col * 53 + 3) * 2654435761) >>> 0) % 1000) / 1000;
            const bevelT = Math.min(1, edgeDist / bevelPx);
            const bevel = bevelT * bevelT * (3 - 2 * bevelT);
            const pillow = Math.sin((lx / cell) * Math.PI) * Math.sin((ly / cell) * Math.PI);
            const glazeWave = 0.5 + 0.5 * Math.sin(3 * u + 2 * v + tHash * 5);
            const shade = Math.max(216, Math.min(255, Math.round(236 + 10 * tHash + 6 * pillow - 10 * (1 - bevel) + 4 * glazeWave + 3 * (noise - 0.5))));
            data[k] = data[k + 1] = data[k + 2] = shade;
            data[k + 3] = 255;
            heights[idx] = 0.35 + 0.45 * bevel + 0.14 * pillow + 0.04 * glazeWave;
            roughs[idx] = Math.round(255 * Math.min(0.45, 0.14 + 0.08 * (1 - bevel) + 0.04 * glazeWave + 0.02 * noise));
          }
        }
      }
    }, { colorSpace: T.SRGBColorSpace, repeatX, repeatY, anisotropy });
    const roughnessMap = makeCanvasTexture(width, height, (data, w, h) => {
      for (let i = 0, k = 0; i < w * h; i++, k += 4) {
        data[k] = data[k + 1] = data[k + 2] = roughs[i];
        data[k + 3] = 255;
      }
    }, { colorSpace: T.NoColorSpace, repeatX, repeatY, anisotropy });
    const normalMap = heightToNormalTexture(heights, width, height, 2.4, repeatX, repeatY, anisotropy);
    return { map, normalMap, roughnessMap, normalScale: 0.48 };
  }

  if (kind === 'leather') {
    const width = 512, height = 512, repeatX = 500 / 180, repeatY = 500 / 180;
    const grid = 16;
    const ptsX = new Float32Array(grid * grid);
    const ptsY = new Float32Array(grid * grid);
    let pSeed = 4099;
    for (let gy = 0; gy < grid; gy++) {
      for (let gx = 0; gx < grid; gx++) {
        const i = gy * grid + gx;
        pSeed = (Math.imul(pSeed, 1664525) + 1013904223) >>> 0;
        ptsX[i] = gx + 0.18 + 0.64 * (pSeed / 4294967296);
        pSeed = (Math.imul(pSeed, 1664525) + 1013904223) >>> 0;
        ptsY[i] = gy + 0.18 + 0.64 * (pSeed / 4294967296);
      }
    }
    const heights = new Float32Array(width * height);
    const roughs = new Uint8Array(width * height);
    const map = makeCanvasTexture(width, height, (data, w, h) => {
      let seed = 77319;
      for (let y = 0, idx = 0, k = 0; y < h; y++) {
        const v = (y / h) * TAU;
        const fy = (y / h) * grid;
        const cy = Math.floor(fy);
        for (let x = 0; x < w; x++, idx++, k += 4) {
          seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
          const noise = seed / 4294967296;
          const u = (x / w) * TAU;
          const fx = (x / w) * grid;
          const cx = Math.floor(fx);
          let d1 = 99, d2 = 99;
          for (let oy = -1; oy <= 1; oy++) {
            for (let ox = -1; ox <= 1; ox++) {
              const nx = (cx + ox + grid) % grid;
              const ny = (cy + oy + grid) % grid;
              const ci = ny * grid + nx;
              let dx = ptsX[ci] - fx;
              let dy = ptsY[ci] - fy;
              if (dx > grid * 0.5) dx -= grid;
              else if (dx < -grid * 0.5) dx += grid;
              if (dy > grid * 0.5) dy -= grid;
              else if (dy < -grid * 0.5) dy += grid;
              const d = Math.hypot(dx, dy);
              if (d < d1) { d2 = d1; d1 = d; }
              else if (d < d2) d2 = d;
            }
          }
          const t = Math.min(1, Math.max(0, (d2 - d1) / 0.34));
          const pebble = t * t * (3 - 2 * t);
          const hideWave = 0.5 + 0.5 * Math.sin(2 * u + 3 * v + 0.9 * Math.cos(u - 2 * v));
          const shade = Math.max(194, Math.min(252, Math.round(208 + 34 * pebble + 6 * hideWave - 5 * noise)));
          data[k] = data[k + 1] = data[k + 2] = shade;
          data[k + 3] = 255;
          heights[idx] = 0.25 + 0.65 * pebble + 0.08 * hideWave - 0.04 * noise;
          roughs[idx] = Math.round(255 * Math.min(0.74, 0.42 + 0.24 * (1 - pebble) + 0.04 * noise));
        }
      }
    }, { colorSpace: T.SRGBColorSpace, repeatX, repeatY, anisotropy });
    const roughnessMap = makeCanvasTexture(width, height, (data, w, h) => {
      for (let i = 0, k = 0; i < w * h; i++, k += 4) {
        data[k] = data[k + 1] = data[k + 2] = roughs[i];
        data[k + 3] = 255;
      }
    }, { colorSpace: T.NoColorSpace, repeatX, repeatY, anisotropy });
    const normalMap = heightToNormalTexture(heights, width, height, 2.1, repeatX, repeatY, anisotropy);
    return { map, normalMap, roughnessMap, normalScale: 0.38 };
  }

  if (kind === 'glass') {
    const width = 256, height = 256, repeatX = 1, repeatY = 1;
    const heights = new Float32Array(width * height);
    const roughs = new Uint8Array(width * height);
    for (let y = 0, idx = 0; y < height; y++) {
      const v = (y / height) * TAU;
      for (let x = 0; x < width; x++, idx++) {
        const u = (x / width) * TAU;
        const ripple = 0.5 + 0.5 * Math.sin(3 * u + 2 * v) * Math.cos(2 * u - 3 * v);
        heights[idx] = 0.5 + 0.18 * ripple;
        roughs[idx] = Math.round(255 * (0.07 + 0.04 * ripple));
      }
    }
    const roughnessMap = makeCanvasTexture(width, height, (data, w, h) => {
      for (let i = 0, k = 0; i < w * h; i++, k += 4) {
        data[k] = data[k + 1] = data[k + 2] = roughs[i];
        data[k + 3] = 255;
      }
    }, { colorSpace: T.NoColorSpace, repeatX, repeatY, anisotropy });
    const normalMap = heightToNormalTexture(heights, width, height, 0.35, repeatX, repeatY, anisotropy);
    return { map: null, normalMap, roughnessMap, normalScale: 0.025 };
  }

  // 'paint': pure tint/preset color (no albedo noise), ultra-fine satin lacquer micro-stipple.
  const width = 256, height = 256, repeatX = 500 / 120, repeatY = 500 / 120;
  const heights = new Float32Array(width * height);
  const roughs = new Uint8Array(width * height);
  let seed = 314159;
  for (let y = 0, idx = 0; y < height; y++) {
    const v = (y / height) * TAU;
    for (let x = 0; x < width; x++, idx++) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const noise = seed / 4294967296;
      const u = (x / width) * TAU;
      const peel = 0.5 + 0.5 * Math.sin(9 * u + 7 * v) * Math.cos(8 * u - 11 * v);
      heights[idx] = 0.55 * peel + 0.45 * noise;
      roughs[idx] = Math.round(255 * (0.38 + 0.05 * peel + 0.03 * noise));
    }
  }
  const roughnessMap = makeCanvasTexture(width, height, (data, w, h) => {
    for (let i = 0, k = 0; i < w * h; i++, k += 4) {
      data[k] = data[k + 1] = data[k + 2] = roughs[i];
      data[k + 3] = 255;
    }
  }, { colorSpace: T.NoColorSpace, repeatX, repeatY, anisotropy });
  const normalMap = heightToNormalTexture(heights, width, height, 0.55, repeatX, repeatY, anisotropy);
  return { map: null, normalMap, roughnessMap, normalScale: 0.045 };
}

export const SURFACE_PROPS = {
  wood: { roughness: 1, metalness: 0, clearcoat: 0.16, clearcoatRoughness: 0.38, sheen: 0, sheenRoughness: 1, envMapIntensity: 0.95 },
  fabric: { roughness: 1, metalness: 0, clearcoat: 0, clearcoatRoughness: 0, sheen: 0.55, sheenRoughness: 0.72, envMapIntensity: 0.78 },
  metal: { roughness: 1, metalness: 0.88, clearcoat: 0.08, clearcoatRoughness: 0.25, sheen: 0, sheenRoughness: 1, envMapIntensity: 1.35 },
  paint: { roughness: 1, metalness: 0, clearcoat: 0.14, clearcoatRoughness: 0.42, sheen: 0, sheenRoughness: 1, envMapIntensity: 0.9 },
  marble: { roughness: 1, metalness: 0, clearcoat: 0.52, clearcoatRoughness: 0.14, sheen: 0, sheenRoughness: 1, envMapIntensity: 1.15 },
  brick: { roughness: 1, metalness: 0, clearcoat: 0, clearcoatRoughness: 0, sheen: 0, sheenRoughness: 1, envMapIntensity: 0.72 },
  concrete: { roughness: 1, metalness: 0, clearcoat: 0.04, clearcoatRoughness: 0.65, sheen: 0, sheenRoughness: 1, envMapIntensity: 0.78 },
  stone: { roughness: 1, metalness: 0, clearcoat: 0.1, clearcoatRoughness: 0.45, sheen: 0, sheenRoughness: 1, envMapIntensity: 0.88 },
  terrazzo: { roughness: 1, metalness: 0, clearcoat: 0.34, clearcoatRoughness: 0.22, sheen: 0, sheenRoughness: 1, envMapIntensity: 1.02 },
  tile: { roughness: 1, metalness: 0, clearcoat: 0.62, clearcoatRoughness: 0.12, sheen: 0, sheenRoughness: 1, envMapIntensity: 1.18 },
  leather: { roughness: 1, metalness: 0, clearcoat: 0.18, clearcoatRoughness: 0.36, sheen: 0.18, sheenRoughness: 0.62, envMapIntensity: 0.96 },
  glass: { roughness: 1, metalness: 0.06, clearcoat: 0.9, clearcoatRoughness: 0.05, sheen: 0, sheenRoughness: 1, envMapIntensity: 1.45, transparent: true, opacity: 0.44, depthWrite: false }
};

export function makeFinishes(spec, renderer) {
  const textures = new Map(), entries = new Map();
  for (const slot of spec.slots) {
    const base = new T.MeshPhysicalMaterial();
    entries.set(slot.id, { slot, base, instances: [base], index: -1, tint: null, preset: null });
  }

  function getMaps(kind) {
    if (!textures.has(kind)) textures.set(kind, buildSurfaceSet(kind, renderer));
    return textures.get(kind);
  }

  function applyToMaterial(m, preset, tint) {
    const kind = Object.hasOwn(SURFACE_PROPS, preset.surface) ? preset.surface : 'paint';
    const maps = getMaps(kind);
    const props = SURFACE_PROPS[kind];
    const nextTransparent = Boolean(props.transparent);
    const texChanged =
      Boolean(m.map) !== Boolean(maps.map) ||
      Boolean(m.normalMap) !== Boolean(maps.normalMap) ||
      Boolean(m.roughnessMap) !== Boolean(maps.roughnessMap) ||
      Boolean(m.transparent) !== nextTransparent;
    m.map = maps.map;
    m.normalMap = maps.normalMap;
    m.roughnessMap = maps.roughnessMap;
    m.normalScale.set(maps.normalScale, maps.normalScale);
    m.roughness = props.roughness;
    m.metalness = props.metalness;
    m.clearcoat = props.clearcoat;
    m.clearcoatRoughness = props.clearcoatRoughness;
    m.sheen = props.sheen;
    m.sheenRoughness = props.sheenRoughness;
    m.envMapIntensity = props.envMapIntensity;
    m.transparent = nextTransparent;
    m.opacity = props.opacity ?? 1;
    m.depthWrite = props.depthWrite ?? true;
    m.color.set(tint || preset.color);
    if (kind === 'fabric') {
      m.sheenColor.copy(m.color).lerp(WHITE, 0.45);
    } else if (kind === 'leather') {
      m.sheenColor.copy(m.color).lerp(WHITE, 0.25);
    } else {
      m.sheenColor.set(0x000000);
    }
    if (texChanged) m.needsUpdate = true;
  }

  function update(finishes) {
    for (const [id, e] of entries) {
      const { index, tint } = finishes[id];
      const preset = e.slot.finishes[index];
      if (!preset || (e.index === index && e.tint === tint && e.preset === preset)) continue;
      e.index = index;
      e.tint = tint;
      e.preset = preset;
      for (const m of e.instances) applyToMaterial(m, preset, tint);
    }
  }

  function getForPart(id) {
    const e = entries.get(id);
    if (!e) return null;
    const m = new T.MeshPhysicalMaterial();
    e.instances.push(m);
    if (e.index >= 0) applyToMaterial(m, e.slot.finishes[e.index], e.tint);
    return m;
  }

  return { get: id => entries.get(id).base, getForPart, update };
}

// Give each face a physically sized grain chart. Board edges and the adjacent panel face
// share their long direction; slender uprights run lengthwise instead of across the grain.
export function mapBoardUV(g, size, phase) {
  const p = g.getAttribute('position'), normal = g.getAttribute('normal'), uv = g.getAttribute('uv');
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const nx = Math.abs(normal.getX(i)), ny = Math.abs(normal.getY(i)), nz = Math.abs(normal.getZ(i));
    let a, b;
    if (nx >= ny && nx >= nz) {
      if (size[1] > size[2]) { a = y; b = z; } else { a = z; b = y; }
    } else if (ny >= nz) {
      if (size[0] >= size[2]) { a = x; b = z; } else { a = z; b = x; }
    } else if (size[1] > size[0]) { a = y; b = x; } else { a = x; b = y; }
    uv.setXY(i, a / 500 + phase, b / 500 + 0.618 * phase);
  }
  uv.needsUpdate = true;
}

// Map cylinder barrels so grain/brushing runs along cylinder height without seam stretch,
// and end caps map planar XZ at matching physical scale.
export function mapCylinderUV(g, size, phase) {
  const p = g.getAttribute('position'), normal = g.getAttribute('normal'), uv = g.getAttribute('uv');
  const circ = Math.PI * (size[0] + size[2]) * 0.5;
  for (let i = 0; i < p.count; i++) {
    const ny = Math.abs(normal.getY(i));
    if (ny < 0.9) {
      const u = uv.getX(i), v = uv.getY(i);
      uv.setXY(i, v * (size[1] / 500) + phase, u * (circ / 500) + 0.618 * phase);
    } else {
      uv.setXY(i, (p.getX(i) * size[0]) / 500 + phase, (p.getZ(i) * size[2]) / 500 + 0.618 * phase);
    }
  }
  uv.needsUpdate = true;
}

export function makePlate(width, height) {
  const canvas = document.createElement('canvas');
  const aspect = width / height;
  canvas.width = Math.max(256, Math.min(2048, Math.round(640 * aspect)));
  canvas.height = Math.max(96, Math.min(1024, Math.round(canvas.width / aspect)));
  const ctx = canvas.getContext('2d'), tex = new T.CanvasTexture(canvas);
  tex.colorSpace = T.SRGBColorSpace;
  const mat = new T.MeshPhysicalMaterial({
    map: tex, metalness: 0.62, roughness: 0.32, clearcoat: 0.15, clearcoatRoughness: 0.3,
    polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1
  });
  const mesh = new T.Mesh(new T.PlaneGeometry(width, height), mat);
  mesh.receiveShadow = true; mesh.visible = false;
  let previous;
  return {
    mesh,
    setText(text) {
      if (text === previous) return;
      previous = text; mesh.visible = Boolean(text.trim());
      if (!mesh.visible) return;
      const w = canvas.width, h = canvas.height;
      const wash = ctx.createLinearGradient(0, 0, w, h);
      wash.addColorStop(0, '#f3e2b8'); wash.addColorStop(0.5, '#dbc18d'); wash.addColorStop(1, '#ead4a7');
      ctx.fillStyle = wash; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(255,250,235,0.08)';
      for (let y = 2; y < h; y += 3) ctx.fillRect(0, y, w, 1);
      ctx.strokeStyle = '#977f54'; ctx.lineWidth = Math.max(1.5, h * 0.022);
      ctx.strokeRect(w * 0.024, h * 0.08, w * 0.952, h * 0.84);
      ctx.strokeStyle = 'rgba(255,248,228,0.45)'; ctx.lineWidth = Math.max(1, h * 0.01);
      ctx.strokeRect(w * 0.032, h * 0.12, w * 0.936, h * 0.76);
      let fontSize = h * 0.56;
      ctx.font = `600 ${fontSize}px system-ui, sans-serif`;
      const measured = ctx.measureText(text).width;
      if (measured > w * 0.84) fontSize *= (w * 0.84) / measured;
      ctx.font = `600 ${fontSize}px system-ui, sans-serif`;
      ctx.fillStyle = '#2d2920'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(text, w / 2, h * 0.52); tex.needsUpdate = true;
    }
  };
}
