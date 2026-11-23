import { readFile, stat } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

export const MAX_LOGO_BYTES = 2 * 1024 * 1024;
export const MAX_NAME_LENGTH = 120;
export const MAX_DESCRIPTION_LENGTH = 280;

const CONTROL_CHARS = /[\u0000-\u001f\u007f]/u;
const MIME_BY_EXT = new Map([
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
  ['.svg', 'image/svg+xml']
]);

const PNG_HEADER = Buffer.from('89504e470d0a1a0a', 'hex');
const UTF8_DECODER = new TextDecoder('utf-8', { fatal: true });
const DATA_URI_RE = /^data:(image\/(?:png|jpeg|webp|svg\+xml));base64,([A-Za-z0-9+/=]+)$/;

const UNSAFE_SVG_PATTERNS = [
  { re: /<script\b/i, why: 'SVG logo must not contain <script> elements.' },
  { re: /<foreignObject\b/i, why: 'SVG logo must not contain <foreignObject> elements.' },
  { re: /\bon[a-z]+\s*=/i, why: 'SVG logo must not contain inline event handlers.' },
  { re: /javascript\s*:/i, why: 'SVG logo must not contain javascript: URIs.' },
  { re: /vbscript\s*:/i, why: 'SVG logo must not contain vbscript: URIs.' },
  { re: /\b(?:xlink:)?href\s*=\s*["']\s*(?:https?:|\/\/|file:)/i, why: 'SVG logo must not reference external href URLs.' },
  { re: /url\(\s*["']?\s*(?:https?:|\/\/|file:)/i, why: 'SVG logo must not reference external url() resources.' }
];

/** Validate raw logo image bytes against declared MIME type and offline safety rules. */
export function validateLogoBytes(bytes, mimeType, label = 'logo') {
  const buf = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
  if (!buf.length || buf.length > MAX_LOGO_BYTES) {
    throw new Error(`${label} is empty or exceeds the ${MAX_LOGO_BYTES / (1024 * 1024)} MiB limit.`);
  }
  if (mimeType === 'image/png') {
    if (buf.length < 8 || !buf.subarray(0, 8).equals(PNG_HEADER)) {
      throw new Error(`${label}: file contents do not match PNG signature.`);
    }
    return buf;
  }
  if (mimeType === 'image/jpeg') {
    if (buf.length < 3 || buf[0] !== 0xff || buf[1] !== 0xd8 || buf[2] !== 0xff) {
      throw new Error(`${label}: file contents do not match JPEG signature.`);
    }
    return buf;
  }
  if (mimeType === 'image/webp') {
    if (buf.length < 12 || buf.subarray(0, 4).toString('ascii') !== 'RIFF' || buf.subarray(8, 12).toString('ascii') !== 'WEBP') {
      throw new Error(`${label}: file contents do not match WebP signature.`);
    }
    return buf;
  }
  if (mimeType === 'image/svg+xml') {
    let text;
    try { text = UTF8_DECODER.decode(buf); }
    catch { throw new Error(`${label}: SVG must be valid UTF-8.`); }
    if (text.includes('\0') || !/<svg[\s>]/i.test(text)) {
      throw new Error(`${label}: expected a valid <svg> document.`);
    }
    for (const rule of UNSAFE_SVG_PATTERNS) {
      if (rule.re.test(text)) throw new Error(`${label}: ${rule.why}`);
    }
    return buf;
  }
  throw new Error(`${label}: unsupported logo media type (${mimeType}).`);
}

/** Read a local PNG, JPEG, WebP, or SVG logo file and encode it as a self-contained data URI. */
export async function loadLogoAsDataUri(filePath) {
  if (typeof filePath !== 'string' || !filePath.trim()) {
    throw new Error('Logo file path is required.');
  }
  const resolved = path.resolve(filePath.trim());
  const mimeType = MIME_BY_EXT.get(path.extname(resolved).toLowerCase());
  if (!mimeType) {
    throw new Error(`Unsupported logo format (${path.basename(resolved)}). Use .png, .jpg, .jpeg, .webp, or .svg.`);
  }
  const info = await stat(resolved);
  if (!info.isFile() || !info.size || info.size > MAX_LOGO_BYTES) {
    throw new Error(`${path.basename(resolved)} must be a regular nonempty file of at most 2 MiB.`);
  }
  const bytes = await readFile(resolved);
  validateLogoBytes(bytes, mimeType, path.basename(resolved));
  return `data:${mimeType};base64,${bytes.toString('base64')}`;
}

/** Validate a business brand configuration object (requires businessName + offline logo; description optional). */
export function validateBrand(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new Error('Brand setup must be a JSON object.');
  }
  if (raw.version !== 1) {
    throw new Error('Brand setup must specify version: 1.');
  }
  if (typeof raw.businessName !== 'string') {
    throw new Error('Business name is required.');
  }
  const businessName = raw.businessName.trim();
  if (!businessName || businessName.length > MAX_NAME_LENGTH || CONTROL_CHARS.test(businessName)) {
    throw new Error(`Business name must be 1–${MAX_NAME_LENGTH} printable characters.`);
  }

  if (typeof raw.logo !== 'string') {
    throw new Error('Business logo is required.');
  }
  const match = DATA_URI_RE.exec(raw.logo);
  if (!match) {
    throw new Error('Business logo must be an offline base64 data URI (PNG, JPEG, WebP, or SVG).');
  }
  const bytes = Buffer.from(match[2], 'base64');
  validateLogoBytes(bytes, match[1], 'brand.logo');

  let description = null;
  if (raw.description !== undefined && raw.description !== null) {
    if (typeof raw.description !== 'string') {
      throw new Error('Business description must be a string or null.');
    }
    const trimmed = raw.description.trim();
    if (trimmed) {
      if (trimmed.length > MAX_DESCRIPTION_LENGTH || CONTROL_CHARS.test(trimmed)) {
        throw new Error(`Business description must be at most ${MAX_DESCRIPTION_LENGTH} printable characters.`);
      }
      description = trimmed;
    }
  }

  return {
    version: 1,
    businessName,
    logo: raw.logo,
    description
  };
}

/** Return the per-user global brand configuration file path. */
export function globalBrandPath(env = process.env) {
  const base = env.XDG_CONFIG_HOME?.trim() || path.join(env.HOME?.trim() || os.homedir(), '.config');
  return path.join(base, 'furniture-visualizer', 'brand.json');
}

/** Ordered candidate paths checked automatically for business setup resolution. */
export function defaultBrandPaths({ cwd = process.cwd(), specDir = null, env = process.env } = {}) {
  const candidates = [];
  const seen = new Set();
  const add = p => {
    if (!p) return;
    const resolved = path.resolve(cwd, p);
    if (!seen.has(resolved)) {
      seen.add(resolved);
      candidates.push(resolved);
    }
  };
  if (env.FURNITURE_VISUALIZER_BRAND?.trim()) add(env.FURNITURE_VISUALIZER_BRAND.trim());
  if (specDir) add(path.join(path.resolve(cwd, specDir), 'brand.json'));
  add(path.join(path.resolve(cwd), 'private', 'brand.json'));
  add(globalBrandPath(env));
  return candidates;
}

/** Resolve and validate the active business setup, or return null if unconfigured (throws on explicit missing or invalid file). */
export async function resolveBrand({ brandPath = null, cwd = process.cwd(), specDir = null, env = process.env } = {}) {
  if (brandPath) {
    const resolved = path.resolve(cwd, brandPath);
    const brand = validateBrand(JSON.parse(await readFile(resolved, 'utf8')));
    return { brand, path: resolved };
  }
  for (const candidate of defaultBrandPaths({ cwd, specDir, env })) {
    let text;
    try {
      text = await readFile(candidate, 'utf8');
    } catch (err) {
      if (err.code === 'ENOENT') continue;
      throw err;
    }
    const brand = validateBrand(JSON.parse(text));
    return { brand, path: candidate };
  }
  return null;
}
