import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readFile, realpath, stat, writeFile, rename, rm } from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { validateSpec } from '../lib/spec.mjs';
import { resolveBrand } from '../lib/brand.mjs';
import { initialState, validateState } from '../lib/state.mjs';

const usage = 'Usage: node tools/export.mjs --reviewed [--brand <brand.json>] [--presentation <presentation.json>] <reviewed.json> <viewer.html> [--replace]\nCreates one offline interactive HTML file; no API key or uploads. Requires business setup (tools/setup.mjs). --reviewed confirms you checked the dimensions, features and labeled estimates.';
const bundled = name => readFile(new URL(`../assets/${name}`, import.meta.url), 'utf8');
const encode = value => JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, c => `\\u${c.charCodeAt(0).toString(16).padStart(4,'0')}`);
const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function inspectGlb(bytes, name) {
  const reject = why => { throw new Error(`${name}: ${why}`); };
  if (bytes.length < 20 || bytes.toString('ascii',0,4) !== 'glTF' || bytes.readUInt32LE(4) !== 2 || bytes.readUInt32LE(8) !== bytes.length || bytes.toString('ascii',16,20) !== 'JSON') reject('expected a complete binary glTF 2.0 file');
  const end = 20 + bytes.readUInt32LE(12);
  if (end > bytes.length) reject('truncated JSON chunk');
  const doc = JSON.parse(bytes.toString('utf8',20,end));
  if (doc.asset?.version !== '2.0' || !doc.meshes?.length) reject('expected a glTF 2.0 mesh');
  if (doc.animations?.length || doc.skins?.length) reject('supply a static mesh with animation and skinning baked out');
  if (doc.extensionsRequired?.length || doc.extensionsUsed?.some(e => ['KHR_draco_mesh_compression','KHR_meshopt_compression','EXT_meshopt_compression','KHR_texture_basisu'].includes(e))) reject('export as uncompressed core glTF without required extensions or external decoders');
  for (const {uri} of [...(doc.buffers ?? []), ...(doc.images ?? [])]) {
    if (uri !== undefined && !/^data:(?:image\/(?:png|jpeg|webp)|application\/(?:octet-stream|gltf-buffer));base64,/i.test(uri)) reject('external buffer/image URI: embed assets inside the GLB');
  }
}

function validatePresentation(spec, {
  lighting, backdrop, wallColor, floor, cameraYaw, inspector, personStart = null,
  personVisible = true, showDimensions = false, autoplay, joints, options = {}
}) {
  if (!['daylight', 'gallery', 'crisp', 'evening'].includes(lighting) || !['studio', 'room'].includes(backdrop) ||
      !['oak', 'stone', 'concrete'].includes(floor) || !['person', 'furniture'].includes(inspector) ||
      !Number.isFinite(cameraYaw) || Math.abs(cameraYaw) > 180 || typeof autoplay !== 'boolean' ||
      (wallColor !== undefined && (typeof wallColor !== 'string' || !/^#[\da-f]{6}$/i.test(wallColor))) ||
      (personStart !== null && ![personStart.x, personStart.z, personStart.yaw].every(Number.isFinite)) ||
      (autoplay && !personVisible) ||
      !joints || typeof joints !== 'object' || Array.isArray(joints) ||
      !options || typeof options !== 'object' || Array.isArray(options)) {
    throw new Error('Invalid preview presentation.');
  }
  const state = initialState(spec);
  validateState(spec, {...state, showDimensions, person: {...state.person, visible: personVisible},
    joints: {...state.joints, ...joints}, options: {...state.options, ...options}});
  return { lighting, backdrop, wallColor, floor, cameraYaw, inspector, personVisible, showDimensions,
    personStart: personStart && { x: personStart.x, z: personStart.z, yaw: personStart.yaw }, autoplay, joints, options };
}

async function main() {
  const {values,positionals} = parseArgs({allowPositionals:true,options:{reviewed:{type:'boolean'},replace:{type:'boolean'},brand:{type:'string'},presentation:{type:'string'},help:{type:'boolean',short:'h'}}});
  if (values.help) { console.log(usage); return; }
  if (!values.reviewed || positionals.length !== 2) throw new Error(usage);
  const [input,output] = positionals.map(p=>path.resolve(p));
  if (!/\.html?$/i.test(output) || !/\.json$/i.test(input)) throw new Error('Use a JSON input and a separate .html output.');
  const spec = validateSpec(JSON.parse(await readFile(input,'utf8')), {forExport:true});
  const presentation = values.presentation
    ? validatePresentation(spec, JSON.parse(await readFile(values.presentation, 'utf8')))
    : null;
  const resolvedBrand = await resolveBrand({ brandPath: values.brand ?? null, cwd: process.cwd(), specDir: path.dirname(input), env: process.env });
  if (!resolvedBrand) {
    throw new Error('Business setup is required before export (business name and logo). Run: node tools/setup.mjs --name "<Business Name>" --logo <path/to/logo.png> [--description "<optional>"] (or pass --brand <brand.json>).');
  }
  const { brand } = resolvedBrand;
  // Author notes, private filenames and page/image inputs are never inserted in the HTML.
  const publicSpec = {...spec, evidence:spec.evidence.filter(e=>e.status === 'estimated').map(({field,status})=>({field,status}))};
  const assets = Object.create(null), names = new Map();
  const root = await realpath(path.dirname(input));
  let total = 0;
  for (const p of publicSpec.parts) {
    if (p.asset === null) continue;
    const original = p.asset;
    if (!names.has(original)) {
      const file = await realpath(path.join(root, original));
      if (path.dirname(file) !== root) throw new Error(`${original}: asset must be beside the spec, not outside through a symlink`);
      const info = await stat(file); total += info.size;
      if (!info.isFile() || total > 48 * 1024 * 1024) throw new Error('GLBs must be regular files totaling at most 48 MiB');
      const bytes = await readFile(file); inspectGlb(bytes, original);
      const id = `mesh-${names.size+1}.glb`; names.set(original, id); assets[id] = bytes.toString('base64');
    }
    p.asset = names.get(original);
  }
  const identity = createHash('sha256').update(JSON.stringify([publicSpec,assets])).digest('hex');
  const [css,js,licenses] = await Promise.all(['studio.css','viewer.js','THIRD-PARTY.txt'].map(bundled));
  const titleText = `${escapeHtml(brand.businessName)} · ${escapeHtml(spec.name)}`;
  const html = `<!doctype html>\n<html lang="he" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; connect-src data: blob:; object-src 'none'; base-uri 'none'; form-action 'none'"><title>${titleText}</title><style>${css}</style></head><body><div id="app"></div><noscript>יש להפעיל JavaScript כדי להשתמש במדמה הרהיטים.</noscript><script id="study-data" type="application/json">${encode({identity,spec:publicSpec,brand,assets,...(presentation && {presentation})})}</script><script>${js.replace(/<\/script/gi,'<\\/script')}</script>\n<!-- Bundled software notices:\n${licenses.replace(/-->/g,'-- >')} -->\n</body></html>\n`;
  await mkdir(path.dirname(output),{recursive:true});
  if (values.replace) {
    const temp = `${output}.${randomUUID()}.tmp`;
    try { await writeFile(temp,html,{flag:'wx'}); await rename(temp,output); } finally { await rm(temp,{force:true}); }
  } else await writeFile(output,html,{flag:'wx'});
  console.log(`${output}\n${spec.name} · ${brand.businessName} · ${spec.parts.length} parts · ${spec.slots.length} finish groups · ${publicSpec.evidence.length} labeled estimates · ${Buffer.byteLength(html).toLocaleString('en-US')} bytes`);
}
main().catch(e=>{ console.error(`Export: ${e.code === 'EEXIST' ? 'Output already exists. Choose another name or pass --replace.' : e.message}`); process.exitCode=1; });
