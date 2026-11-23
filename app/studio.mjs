import * as T from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone as cloneModel } from 'three/addons/utils/SkeletonUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { resolveVec } from '../lib/coordinates.mjs';
import { makeMannequin } from './mannequin.mjs';
import { makeFinishes, makePlate, mapBoardUV, mapCylinderUV } from './materials.mjs';

const rad = T.MathUtils.degToRad;
const clamp = T.MathUtils.clamp;
const vector = () => new T.Vector3();
const corners = () => Array.from({ length: 8 }, vector);
const halfSign = (corner, axisBit) => (corner & axisBit) ? .5 : -.5;
const studioDirection = new T.Vector3(.85, .56, 1.55).normalize();

const STUDIO_PRESETS = {
  daylight: {
    label: 'Daylight',
    bgInner: '#f4f0e8', bgOuter: '#ded6c7',
    hemiSky: 0xfff9ee, hemiGround: 0xe3d6c4, hemiIntensity: 0.56,
    keyColor: 0xfff5e4, keyIntensity: 2.35,
    fillColor: 0xdce8ff, fillIntensity: 0.72,
    rimColor: 0xfff1db, rimIntensity: 0.55,
    exposure: 1.04, envIntensity: 0.85,
    envSoftbox: 0xfffcf5, envWindow: 0xeaf2ff, envRim: 0xfff0d6, envFloor: 0xd7cebe, envWall: 0xc2b8a8
  },
  gallery: {
    label: 'Warm gallery',
    bgInner: '#efe7d8', bgOuter: '#d5c7b2',
    hemiSky: 0xfff1dc, hemiGround: 0xdac6ae, hemiIntensity: 0.52,
    keyColor: 0xffe6bf, keyIntensity: 2.45,
    fillColor: 0xe6e8f2, fillIntensity: 0.6,
    rimColor: 0xffdcae, rimIntensity: 0.7,
    exposure: 1.02, envIntensity: 0.88,
    envSoftbox: 0xfff3de, envWindow: 0xffe4bc, envRim: 0xffd5a1, envFloor: 0xcab9a1, envWall: 0xb6a48c
  },
  crisp: {
    label: 'Crisp neutral',
    bgInner: '#f5f6f4', bgOuter: '#dee1de',
    hemiSky: 0xffffff, hemiGround: 0xdcdfdc, hemiIntensity: 0.58,
    keyColor: 0xffffff, keyIntensity: 2.25,
    fillColor: 0xe4ecff, fillIntensity: 0.8,
    rimColor: 0xf4f7ff, rimIntensity: 0.5,
    exposure: 1.0, envIntensity: 0.85,
    envSoftbox: 0xffffff, envWindow: 0xeaf1ff, envRim: 0xf7f9ff, envFloor: 0xd6d9d6, envWall: 0xc0c4c0
  }
};

// A bin can reference an external buffer/image despite being a .glb. Inspect authored
// URIs before parsing (some optional texture failures are otherwise swallowed by glTF).
async function readAsset(name, base64) {
  try {
    if (typeof base64 !== 'string') throw new Error('Missing embedded bytes.');
    const raw = atob(base64), bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
    const h = new DataView(bytes.buffer);
    if (bytes.length < 20 || h.getUint32(0, true) !== 0x46546c67 || h.getUint32(4, true) !== 2 ||
      h.getUint32(8, true) !== bytes.length || h.getUint32(16, true) !== 0x4e4f534a) {
      throw new Error('Expected a complete glTF 2.0 binary.');
    }
    const json = JSON.parse(new TextDecoder().decode(new Uint8Array(bytes.buffer, 20, h.getUint32(12, true))));
    for (const item of [...(json.buffers || []), ...(json.images || [])]) {
      if (item.uri !== undefined && !/^data:/i.test(item.uri)) throw new Error('External buffer or image URI. Embed the resource in the GLB.');
    }
    const manager = new T.LoadingManager();
    manager.setURLModifier(url => {
      if (!/^(?:blob|data):/i.test(url)) throw new Error('External model resource blocked.');
      return url;
    });
    let resourceFailed = false;
    manager.onError = () => { resourceFailed = true; };
    const data = await new GLTFLoader(manager).parseAsync(bytes.buffer, '');
    if (resourceFailed) throw new Error('An embedded image or buffer could not be decoded.');
    const scene = data.scene;
    const lights = [];
    let meshCount = 0;
    scene.traverse(obj => {
      if (obj.isLight) lights.push(obj);
      if (obj.isMesh) { meshCount++; obj.castShadow = obj.receiveShadow = true; }
    });
    for (const light of lights) light.removeFromParent();
    const box = new T.Box3().setFromObject(scene, true), size = box.getSize(vector());
    if (!meshCount || ![size.x, size.y, size.z].every(x => Number.isFinite(x) && x > 0)) {
      throw new Error('The default scene must contain mesh geometry with three nonzero extents.');
    }
    const offset = new T.Group(), normalized = new T.Group();
    box.getCenter(offset.position).negate(); offset.add(scene); normalized.add(offset);
    normalized.scale.set(1 / size.x, 1 / size.y, 1 / size.z);
    return normalized;
  } catch (error) { throw new Error(`Cannot display ${name}: ${error.message}`, { cause: error }); }
}

// Architectural photography softbox environment + dark negative-fill flags for crisp metallic & clearcoat contrast.
function buildStudioEnv(renderer, presetKey) {
  const p = STUDIO_PRESETS[presetKey] || STUDIO_PRESETS.daylight;
  const envScene = new T.Scene();
  const boxGeo = new T.BoxGeometry(1, 1, 1);
  const disposables = [boxGeo];
  const addPanel = (color, emissive, intensity, pos, scale, side = T.FrontSide) => {
    const mat = emissive
      ? new T.MeshBasicMaterial({ color: new T.Color(color).multiplyScalar(intensity), side })
      : new T.MeshStandardMaterial({ color, roughness: 0.9, metalness: 0, side });
    disposables.push(mat);
    const m = new T.Mesh(boxGeo, mat);
    m.position.set(...pos);
    m.scale.set(...scale);
    envScene.add(m);
    return m;
  };
  addPanel(p.envWall, false, 1, [0, 8, 0], [32, 26, 32], T.BackSide);
  addPanel(p.envFloor, false, 1, [0, -4.8, 0], [31, 0.2, 31]);
  addPanel(p.envSoftbox, true, 16, [-1.5, 19.5, 2], [11, 0.2, 9]);
  addPanel(p.envSoftbox, true, 18, [-15.2, 8.5, 8], [0.2, 12, 7]);
  addPanel(p.envWindow, true, 9, [15.2, 7, 3], [0.2, 10, 9]);
  addPanel(p.envRim, true, 14, [2.5, 11.5, -15], [10, 4.5, 0.2]);
  addPanel(0x141615, false, 1, [-15.1, 4, -8], [0.25, 11, 6]);
  addPanel(0x141615, false, 1, [15.1, 2.5, -9], [0.25, 9, 5.5]);

  const generator = new T.PMREMGenerator(renderer);
  const tex = generator.fromScene(envScene, 0.035).texture;
  generator.dispose();
  for (const d of disposables) d.dispose();
  return tex;
}

function buildBackdropTexture(presetKey) {
  const p = STUDIO_PRESETS[presetKey] || STUDIO_PRESETS.daylight;
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const ctx = c.getContext('2d');
  const grad = ctx.createRadialGradient(256, 215, 24, 256, 256, 360);
  grad.addColorStop(0, p.bgInner);
  grad.addColorStop(1, p.bgOuter);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);
  const tex = new T.CanvasTexture(c);
  tex.colorSpace = T.SRGBColorSpace;
  return tex;
}

// Multi-part soft contact ambient occlusion under floor-touching furniture parts and shoes.
function createContactAO() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const texture = new T.CanvasTexture(canvas);
  texture.colorSpace = T.SRGBColorSpace;
  const mesh = new T.Mesh(
    new T.PlaneGeometry(1, 1),
    new T.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, toneMapped: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -0.025;
  mesh.renderOrder = 1;
  const partBox = new T.Box3();

  function update(totalBounds, furnitureBounds, parts, personVisible, personBounds) {
    if (totalBounds.isEmpty()) { mesh.visible = false; return; }
    mesh.visible = true;
    const minX = totalBounds.min.x, maxX = totalBounds.max.x;
    const minZ = totalBounds.min.z, maxZ = totalBounds.max.z;
    const spanX = Math.max(200, maxX - minX);
    const spanZ = Math.max(200, maxZ - minZ);
    const padX = spanX * 0.28 + 140;
    const padZ = spanZ * 0.28 + 140;
    const worldW = spanX + padX * 2;
    const worldD = spanZ + padZ * 2;
    const originX = (minX + maxX) * 0.5;
    const originZ = (minZ + maxZ) * 0.5;
    mesh.position.set(originX, -0.025, originZ);
    mesh.scale.set(worldW, worldD, 1);

    const toU = x => ((x - (originX - worldW * 0.5)) / worldW) * size;
    const toV = z => ((z - (originZ - worldD * 0.5)) / worldD) * size;
    const toW = dx => (dx / worldW) * size;
    const toH = dz => (dz / worldD) * size;

    ctx.clearRect(0, 0, size, size);
    const drawSoftEllipse = (cx, cz, rx, rz, alpha) => {
      const px = toU(cx), py = toV(cz);
      const prx = Math.max(3, toW(rx)), prz = Math.max(3, toH(rz));
      ctx.save();
      ctx.translate(px, py);
      ctx.scale(1, prz / prx);
      const g = ctx.createRadialGradient(0, 0, prx * 0.15, 0, 0, prx);
      g.addColorStop(0, `rgba(38, 30, 22, ${alpha})`);
      g.addColorStop(0.55, `rgba(38, 30, 22, ${alpha * 0.45})`);
      g.addColorStop(1, 'rgba(38, 30, 22, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, prx, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    if (!furnitureBounds.isEmpty()) {
      const fcx = (furnitureBounds.min.x + furnitureBounds.max.x) * 0.5;
      const fcz = (furnitureBounds.min.z + furnitureBounds.max.z) * 0.5;
      drawSoftEllipse(fcx, fcz, (furnitureBounds.max.x - furnitureBounds.min.x) * 0.62, (furnitureBounds.max.z - furnitureBounds.min.z) * 0.68, 0.17);
      for (const p of parts) {
        if (!p.anchor.visible) continue;
        partBox.makeEmpty();
        const [sx, sy, sz] = p.size;
        for (let i = 0; i < 8; i++) {
          const v = vector().set(halfSign(i, 1) * sx, halfSign(i, 2) * sy, halfSign(i, 4) * sz).applyMatrix4(p.anchor.matrixWorld);
          partBox.expandByPoint(v);
        }
        if (partBox.min.y < 18) {
          const pcx = (partBox.min.x + partBox.max.x) * 0.5;
          const pcz = (partBox.min.z + partBox.max.z) * 0.5;
          const rx = Math.max(24, (partBox.max.x - partBox.min.x) * 0.78);
          const rz = Math.max(24, (partBox.max.z - partBox.min.z) * 0.78);
          drawSoftEllipse(pcx, pcz, rx, rz, 0.26);
        }
      }
    }

    if (personVisible && !personBounds.isEmpty()) {
      const pcx = (personBounds.min.x + personBounds.max.x) * 0.5;
      const pcz = (personBounds.min.z + personBounds.max.z) * 0.5;
      drawSoftEllipse(pcx, pcz, (personBounds.max.x - personBounds.min.x) * 0.58, (personBounds.max.z - personBounds.min.z) * 0.72, 0.24);
    }
    texture.needsUpdate = true;
  }

  return { mesh, update };
}

function lightStudio(renderer, scene) {
  const envCache = new Map();
  const bgCache = new Map();
  const hemi = new T.HemisphereLight(0xfff9ee, 0xe3d6c4, 0.56);
  const key = new T.DirectionalLight(0xfff5e4, 2.35);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.bias = -0.00016;
  key.shadow.radius = 3.2;
  const fill = new T.DirectionalLight(0xdce8ff, 0.72);
  fill.position.set(1, 0.8, -0.55);
  const rim = new T.DirectionalLight(0xfff1db, 0.55);
  rim.position.set(-0.6, 0.9, -1.25);
  scene.add(hemi, key, key.target, fill, rim);

  const floor = new T.Mesh(new T.PlaneGeometry(1, 1), new T.ShadowMaterial({ opacity: 0.21 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  floor.material.depthWrite = false;
  const contactAO = createContactAO();
  scene.add(floor, contactAO.mesh);

  let activePreset = 'daylight';
  function setPreset(name) {
    const keyName = STUDIO_PRESETS[name] ? name : 'daylight';
    activePreset = keyName;
    const p = STUDIO_PRESETS[keyName];
    if (!envCache.has(keyName)) envCache.set(keyName, buildStudioEnv(renderer, keyName));
    if (!bgCache.has(keyName)) bgCache.set(keyName, buildBackdropTexture(keyName));
    scene.environment = envCache.get(keyName);
    scene.environmentIntensity = p.envIntensity;
    scene.background = bgCache.get(keyName);
    renderer.toneMappingExposure = p.exposure;
    hemi.color.setHex(p.hemiSky);
    hemi.groundColor.setHex(p.hemiGround);
    hemi.intensity = p.hemiIntensity;
    key.color.setHex(p.keyColor);
    key.intensity = p.keyIntensity;
    fill.color.setHex(p.fillColor);
    fill.intensity = p.fillIntensity;
    rim.color.setHex(p.rimColor);
    rim.intensity = p.rimIntensity;
  }
  setPreset('daylight');

  return {
    setPreset,
    getBackdropTexture: () => bgCache.get(activePreset),
    updateShadowBounds(bounds, furnitureBounds, parts, personVisible, personBounds) {
      const r = Math.max(5, bounds.min.distanceTo(bounds.max) * 0.65);
      const center = bounds.getCenter(key.target.position);
      key.position.set(center.x - 1.4 * r, center.y + 2.4 * r, center.z + 1.7 * r);
      Object.assign(key.shadow.camera, { left: -r, right: r, top: r, bottom: -r, near: r * 0.4, far: r * 5 });
      key.shadow.camera.updateProjectionMatrix();
      key.shadow.normalBias = r * 0.0004;
      renderer.shadowMap.needsUpdate = true;
      floor.position.set(center.x, -0.05, center.z);
      floor.scale.setScalar(r * 40);
      contactAO.update(bounds, furnitureBounds, parts, personVisible, personBounds);
    }
  };
}

// Shared W/H/D guide layout used identically by live SVG overlay and offscreen PNG export canvas.
function computeGuideLayout(endpoints, cam, w, h, dims, uiScale = 1) {
  const projected = corners();
  for (let i = 0; i < 8; i++) {
    const p = projected[i].copy(endpoints[i]).project(cam);
    p.x = (1 + p.x) * w / 2;
    p.y = (1 - p.y) * h / 2;
  }
  const letters = ['W', 'H', 'D'];
  const values = [dims.width, dims.height, dims.depth];
  const items = [];
  for (let axis = 0; axis < 3; axis++) {
    const str = `${letters[axis]}  ${values[axis].toLocaleString('en-US')} mm`;
    const half = Math.ceil((str.length * 3.65 + 6) * uiScale);
    const bit = 1 << axis;
    const dx = projected[bit].x - projected[0].x;
    const dy = projected[bit].y - projected[0].y;
    const length = Math.hypot(dx, dy);
    const endOn = length < 8 * uiScale;
    const tx = length ? dx / length : 1;
    const ty = length ? dy / length : 0;
    let nx = -ty, ny = tx;
    const preferred = axis === 0 ? ny : axis === 1 ? -nx : nx;
    if (preferred < 0 || (Math.abs(preferred) < 0.001 && ny < 0)) { nx = -nx; ny = -ny; }
    if (endOn) { nx = axis === 1 ? -1 : 1; ny = axis === 0 ? 0.65 : -0.65; }
    let best = -Infinity, start = 0;
    for (let i = 0; i < 8; i++) if (!(i & bit)) {
      const p = projected[i], score = p.x * nx + p.y * ny;
      if (score > best) { best = score; start = i; }
    }
    const p = projected[start], q = projected[start | bit];
    const offset = (w < 450 * uiScale ? 13 : 20) * uiScale;
    const x1 = p.x + nx * offset, y1 = p.y + ny * offset;
    const x2 = q.x + nx * offset, y2 = q.y + ny * offset;
    let lx = (x1 + x2) / 2 + nx * 10 * uiScale;
    let ly = (y1 + y2) / 2 + ny * 10 * uiScale;
    lx = clamp(lx, half + 4 * uiScale, Math.max(half + 4 * uiScale, w - half - 4 * uiScale));
    ly = clamp(ly, 14 * uiScale, Math.max(14 * uiScale, h - 14 * uiScale));
    const badgeStep = 24 * uiScale;
    for (let j = 0; j < axis; j++) {
      const b = items[j];
      if (Math.abs(lx - b.lx) < half + b.half + 3 * uiScale && Math.abs(ly - b.ly) < badgeStep) {
        ly = b.ly + badgeStep < h - 13 * uiScale ? b.ly + badgeStep : b.ly - badgeStep;
      }
    }
    items.push({ letter: letters[axis], axis, str, half, px: p.x, py: p.y, qx: q.x, qy: q.y, x1, y1, x2, y2, nx, ny, tx, ty, lx, ly, endOn });
  }
  return items;
}

const svgNS = 'http://www.w3.org/2000/svg';
function svgNode(tag, attrs, parent) {
  const node = document.createElementNS(svgNS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  parent.appendChild(node);
  return node;
}

function measureOverlay(container) {
  const svg = svgNode('svg', { 'aria-hidden': 'true' }, container);
  svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:hidden;display:none';
  const endpoints = corners();
  const indicators = ['W', 'H', 'D'].map(() => {
    const g = svgNode('g', {}, svg);
    const ink = svgNode('path', { fill: 'none', stroke: '#686858', 'stroke-width': '1.2', 'stroke-linecap': 'round' }, g);
    const badge = svgNode('g', {}, g);
    const bg = svgNode('rect', { height: 21, y: -10.5, rx: 3, fill: '#faf7ef', stroke: '#a6a494', 'stroke-width': '.75' }, badge);
    const text = svgNode('text', { 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: '#343a31', 'font-family': 'system-ui,sans-serif', 'font-size': 12, 'font-weight': 600 }, badge);
    return { ink, badge, bg, text };
  });
  let visible = false, currentDims = { width: 1, height: 1, depth: 1 };
  function set(on, dims) {
    visible = on;
    currentDims = { ...dims };
    svg.style.display = on ? 'block' : 'none';
    for (let i = 0; i < 8; i++) endpoints[i].set(halfSign(i, 1) * dims.width, i & 2 ? dims.height : 0, halfSign(i, 4) * dims.depth);
  }
  function draw(cam, w, h) {
    if (!visible || !w || !h) return;
    const layout = computeGuideLayout(endpoints, cam, w, h, currentDims, 1);
    for (let i = 0; i < 3; i++) {
      const a = layout[i], ui = indicators[i];
      if (a.str !== ui.text.textContent) {
        ui.text.textContent = a.str;
        ui.bg.setAttribute('x', -a.half);
        ui.bg.setAttribute('width', a.half * 2);
      }
      const tickX = a.nx * 4 + a.tx * 2, tickY = a.ny * 4 + a.ty * 2;
      ui.ink.setAttribute('d', a.endOn
        ? `M${a.px},${a.py}L${a.lx},${a.ly}`
        : `M${a.px + a.nx * 3},${a.py + a.ny * 3}L${a.x1},${a.y1}L${a.x2},${a.y2}L${a.qx + a.nx * 3},${a.qy + a.ny * 3}M${a.x1 - tickX},${a.y1 - tickY}l${2 * tickX},${2 * tickY}M${a.x2 - tickX},${a.y2 - tickY}l${2 * tickX},${2 * tickY}M${(a.x1 + a.x2) / 2},${(a.y1 + a.y2) / 2}L${a.lx},${a.ly}`);
      ui.badge.setAttribute('transform', `translate(${a.lx},${a.ly})`);
    }
  }
  return { set, draw, endpoints };
}

function drawGuidesToCanvas(ctx, endpoints, cam, w, h, dims, scale) {
  const layout = computeGuideLayout(endpoints, cam, w, h, dims, scale);
  ctx.save();
  ctx.font = `600 ${Math.round(12 * scale)}px system-ui, -apple-system, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (const a of layout) {
    const tickX = a.nx * 4 * scale + a.tx * 2 * scale;
    const tickY = a.ny * 4 * scale + a.ty * 2 * scale;
    ctx.strokeStyle = '#686858';
    ctx.lineWidth = 1.2 * scale;
    ctx.lineCap = 'round';
    ctx.beginPath();
    if (a.endOn) {
      ctx.moveTo(a.px, a.py);
      ctx.lineTo(a.lx, a.ly);
    } else {
      ctx.moveTo(a.px + a.nx * 3 * scale, a.py + a.ny * 3 * scale);
      ctx.lineTo(a.x1, a.y1);
      ctx.lineTo(a.x2, a.y2);
      ctx.lineTo(a.qx + a.nx * 3 * scale, a.qy + a.ny * 3 * scale);
      ctx.moveTo(a.x1 - tickX, a.y1 - tickY);
      ctx.lineTo(a.x1 + tickX, a.y1 + tickY);
      ctx.moveTo(a.x2 - tickX, a.y2 - tickY);
      ctx.lineTo(a.x2 + tickX, a.y2 + tickY);
      ctx.moveTo((a.x1 + a.x2) / 2, (a.y1 + a.y2) / 2);
      ctx.lineTo(a.lx, a.ly);
    }
    ctx.stroke();

    const bh = 21 * scale;
    const bw = a.half * 2;
    const rx = a.lx - a.half, ry = a.ly - bh / 2, radPx = 3 * scale;
    ctx.fillStyle = '#faf7ef';
    ctx.strokeStyle = '#a6a494';
    ctx.lineWidth = 0.75 * scale;
    ctx.beginPath();
    ctx.roundRect(rx, ry, bw, bh, radPx);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#343a31';
    ctx.fillText(a.str, a.lx, a.ly);
  }
  ctx.restore();
}

export async function createStudio(container, spec, assets, callbacks = {}) {
  const models = new Map();
  for (const part of spec.parts) if (part.shape === 'glb' && !models.has(part.asset)) {
    models.set(part.asset, await readAsset(part.asset, assets[part.asset]));
  }
  const renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'default' });
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.AgXToneMapping;
  renderer.toneMappingExposure = 1.04;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const canvas = renderer.domElement;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', `Interactive 3D view of ${spec.name}. Click doors, drawers, switches, or parts to interact, or use the camera controls.`);
  canvas.style.cssText = 'display:block;width:100%;height:100%;touch-action:none;cursor:grab';
  container.appendChild(canvas);

  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const scene = new T.Scene();
  const lighting = lightStudio(renderer, scene);
  const finishes = makeFinishes(spec, renderer);

  const perspCam = new T.PerspectiveCamera(28, 1, 10, 50000);
  const orthoCam = new T.OrthographicCamera(-1, 1, 1, -1, 0.1, 10000);
  let projectionMode = 'perspective';
  let activeCam = perspCam;
  activeCam.position.copy(studioDirection).multiplyScalar(3000);

  const orbit = new OrbitControls(activeCam, canvas);
  orbit.enablePan = false;
  orbit.enableDamping = !reducedMotion;
  orbit.dampingFactor = 0.09;
  orbit.minPolarAngle = 0.0001;
  orbit.maxPolarAngle = Math.PI / 2;
  orbit.minZoom = 0.3;
  orbit.maxZoom = 8;
  orbit.zoomSpeed = 0.85;

  const furnitureRoot = new T.Group(), person = makeMannequin();
  scene.add(furnitureRoot, person.root);

  const joints = new Map(spec.joints.map(def => {
    const group = new T.Group();
    furnitureRoot.add(group);
    return [def.id, { def, group, pivot: [0, 0, 0], current: 0, target: 0, from: 0, startTime: 0, duration: 0, initialized: false }];
  }));

  const ellipsoid = new T.SphereGeometry(0.5, 40, 24);
  const slotMap = new Map(spec.slots.map(s => [s.id, s]));
  const optionMap = new Map(spec.options.map(o => [o.id, o]));
  const partMap = new Map();
  const partToSwitch = new Map();
  for (const sw of spec.switches ?? []) {
    for (const id of sw.parts) partToSwitch.set(id, sw);
    for (const id of sw.light?.emissiveParts ?? []) partToSwitch.set(id, sw);
  }

  const interactiveMeshes = [];
  const registerMeshInteractive = (mesh, info) => {
    mesh.userData.interactive = info;
    interactiveMeshes.push(mesh);
  };

  const parts = spec.parts.map((def, index) => {
    const anchor = new T.Group(), joint = joints.get(def.joint);
    (joint ? joint.group : furnitureRoot).add(anchor);
    anchor.rotation.set(rad(def.rotation[0]), rad(def.rotation[1]), rad(def.rotation[2]));
    const mat = def.slot === null ? null : finishes.getForPart(def.slot);
    let visual;
    if (def.shape === 'glb') {
      visual = new T.Group();
      const model = cloneModel(models.get(def.asset));
      if (mat) model.traverse(obj => { if (obj.isMesh) obj.material = mat; });
      visual.add(model);
    } else {
      visual = new T.Mesh(
        def.shape === 'ellipsoid' ? ellipsoid : new T.BufferGeometry(),
        mat
      );
      visual.castShadow = visual.receiveShadow = true;
    }
    anchor.add(visual);
    const part = {
      def, anchor, joint, visual,
      size: [0, 0, 0],
      closedCenter: [0, 0, 0],
      points: corners(),
      grain: (index * 0.754877666) % 1,
      ledColor: null,
      ledIntensity: 0,
      hovered: false
    };
    partMap.set(def.id, part);

    let action = null;
    const sw = partToSwitch.get(def.id);
    if (sw) action = { type: 'switch', id: sw.id, label: sw.label };
    else if (joint) action = { type: 'joint', id: joint.def.id, label: joint.def.label };
    else if (def.when.length === 1) {
      const opt = optionMap.get(def.when[0].option);
      action = { type: 'option', id: opt.id, label: opt.label };
    } else if (def.slot !== null) {
      const slot = slotMap.get(def.slot);
      action = { type: 'slot', id: slot.id, label: slot.label };
    }
    if (action) {
      visual.traverse(obj => {
        if (obj.isMesh) {
          obj.userData.part = part;
          registerMeshInteractive(obj, action);
        }
      });
    }
    return part;
  });

  person.root.traverse(obj => {
    if (obj.isMesh) interactiveMeshes.push(obj);
  });

  const switches = new Map((spec.switches ?? []).map(def => {
    const joint = joints.get(def.joint) ?? null;
    const actuatorParts = def.parts.map(id => partMap.get(id)).filter(Boolean);
    const emissiveParts = (def.light?.emissiveParts ?? []).map(id => partMap.get(id)).filter(Boolean);
    let light = null;
    if (def.light) {
      light = new T.PointLight(def.light.color, 0, def.light.distance, 1.5);
      (joint ? joint.group : furnitureRoot).add(light);
    }
    return [def.id, {
      def, joint, light, actuatorParts, emissiveParts,
      current: def.defaultOn ? 1 : 0,
      target: def.defaultOn ? 1 : 0,
      from: def.defaultOn ? 1 : 0,
      startTime: 0, duration: 0, initialized: false
    }];
  }));

  const inscription = spec.inscription, plate = inscription ? makePlate(inscription.width, inscription.height) : null;
  const plateJoint = inscription ? joints.get(inscription.joint) : null;
  if (plate) {
    (plateJoint ? plateJoint.group : furnitureRoot).add(plate.mesh);
    if (plateJoint) {
      registerMeshInteractive(plate.mesh, { type: 'joint', id: plateJoint.def.id, label: plateJoint.def.label });
    }
  }
  const platePoints = plate ? Array.from({ length: 4 }, vector) : [];

  // Interactive 3D hotspot pins overlay
  const hotspotLayer = document.createElement('div');
  hotspotLayer.className = 'hotspot-layer';
  container.appendChild(hotspotLayer);
  let hotspotsEnabled = spec.joints.length > 0 || (spec.switches?.length ?? 0) > 0;
  const hotspotNodes = [];
  for (const j of joints.values()) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'hotspot hotspot-joint';
    btn.innerHTML = '<span class="hotspot-dot" aria-hidden="true"></span><span class="hotspot-tag"></span>';
    btn.querySelector('.hotspot-tag').textContent = j.def.label;
    btn.addEventListener('click', e => {
      e.stopPropagation();
      callbacks.onInteract?.({ type: 'joint', id: j.def.id, label: j.def.label });
    });
    hotspotLayer.appendChild(btn);
    hotspotNodes.push({ kind: 'joint', id: j.def.id, entry: j, btn, pos: vector(), ndc: vector() });
  }
  for (const sw of switches.values()) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'hotspot hotspot-switch';
    btn.innerHTML = '<span class="hotspot-dot" aria-hidden="true"></span><span class="hotspot-tag"></span>';
    btn.querySelector('.hotspot-tag').textContent = sw.def.label;
    btn.addEventListener('click', e => {
      e.stopPropagation();
      callbacks.onInteract?.({ type: 'switch', id: sw.def.id, label: sw.def.label });
    });
    hotspotLayer.appendChild(btn);
    hotspotNodes.push({ kind: 'switch', id: sw.def.id, entry: sw, btn, pos: vector(), ndc: vector() });
  }

  const guides = measureOverlay(container);
  const staticFurnitureBounds = new T.Box3(), liveFurnitureBounds = new T.Box3();
  const personBounds = new T.Box3(), staticBounds = new T.Box3(), shadowBounds = new T.Box3();
  const personCorners = corners(), focus = vector(), direction = vector(), delta = vector(), right = vector(), up = vector(), forward = vector();
  const spherical = new T.Spherical();
  let width = 0, height = 0, raf = 0, ready = false, showGuides = false, dims = null, personGeometry = null;
  let projectionDirty = true, baseDist = 3000;
  let camAnim = null;
  let activeHoverAction = null;

  function applyJointTransform(j, p) {
    j.group.position.fromArray(j.pivot);
    j.group.rotation.set(0, 0, 0);
    const amount = j.def.travel * p;
    if (j.def.type === 'hinge') j.group.rotation.y = rad(amount);
    else if (j.def.type === 'flap') j.group.rotation.x = rad(amount);
    else if (j.def.type === 'slide') j.group.position.z += amount;
    else if (j.def.type === 'slide-x') j.group.position.x += amount;
    else if (j.def.type === 'lift') j.group.position.y += amount;
  }

  function applySwitchState(sw, p) {
    const anyVisible = sw.actuatorParts.some(part => part.anchor.visible) || sw.emissiveParts.some(part => part.anchor.visible);
    if (sw.light) {
      sw.light.intensity = anyVisible ? sw.def.light.intensity * Math.pow(200, 1.5) * p : 0;
    }
    const glowColor = sw.def.light ? new T.Color(sw.def.light.color) : null;
    for (const part of sw.emissiveParts) {
      part.ledColor = glowColor;
      part.ledIntensity = 3.2 * p;
      syncPartEmissive(part);
    }
    for (const part of sw.actuatorParts) {
      if (sw.emissiveParts.includes(part)) continue;
      if (sw.def.kind === 'toggle') {
        const axis = Math.abs(part.def.rotation[2]) >= 45 || part.size[0] > part.size[2] ? 'z' : 'x';
        part.visual.rotation.set(0, 0, 0);
        part.visual.rotation[axis] = (p - 0.5) * rad(44);
      } else if (sw.def.kind === 'rocker') {
        const axis = part.size[1] >= part.size[0] ? 'x' : 'z';
        part.visual.rotation.set(0, 0, 0);
        part.visual.rotation[axis] = (p - 0.5) * rad(24);
      } else {
        part.visual.position.z = -2 * p;
      }
    }
  }

  function syncPartEmissive(part) {
    part.visual.traverse(obj => {
      if (!obj.isMesh || !obj.material || !('emissive' in obj.material)) return;
      if (obj.material.userData.baseEmissive === undefined) {
        obj.material.userData.baseEmissive = obj.material.emissive.getHex();
        obj.material.userData.baseEmissiveIntensity = obj.material.emissiveIntensity ?? 0;
      }
      if (part.ledColor && part.ledIntensity > 0.001) {
        obj.material.emissive.copy(part.ledColor);
        obj.material.emissiveIntensity = part.ledIntensity + (part.hovered ? 0.25 : 0);
      } else if (part.hovered) {
        obj.material.emissive.setHex(0xfff4de);
        obj.material.emissiveIntensity = 0.08;
      } else {
        obj.material.emissive.setHex(obj.material.userData.baseEmissive);
        obj.material.emissiveIntensity = obj.material.userData.baseEmissiveIntensity;
      }
    });
  }

  function updatePartLiveCorners() {
    furnitureRoot.updateMatrixWorld(true);
    liveFurnitureBounds.makeEmpty();
    for (const part of parts) if (part.anchor.visible) {
      const [x, y, z] = part.size;
      for (let i = 0; i < 8; i++) {
        const v = part.points[i].set(halfSign(i, 1) * x, halfSign(i, 2) * y, halfSign(i, 4) * z).applyMatrix4(part.anchor.matrixWorld);
        liveFurnitureBounds.expandByPoint(v);
      }
    }
    if (plate?.mesh.visible) for (let i = 0; i < 4; i++) {
      const v = platePoints[i].set(halfSign(i, 1) * inscription.width, halfSign(i, 2) * inscription.height, 0).applyMatrix4(plate.mesh.matrixWorld);
      liveFurnitureBounds.expandByPoint(v);
    }
    shadowBounds.copy(liveFurnitureBounds);
    if (shadowBounds.isEmpty() || showGuides) for (const v of guides.endpoints) shadowBounds.expandByPoint(v);
    if (person.root.visible && !personBounds.isEmpty()) shadowBounds.union(personBounds);
    lighting.updateShadowBounds(shadowBounds, liveFurnitureBounds, parts, person.root.visible, personBounds);
  }

  function computeProjectionMetrics(useBounds) {
    activeCam.updateMatrixWorld();
    right.setFromMatrixColumn(activeCam.matrixWorld, 0);
    up.setFromMatrixColumn(activeCam.matrixWorld, 1);
    forward.setFromMatrixColumn(activeCam.matrixWorld, 2);
    let hx = 1, hy = 1, hz = 1;
    const measurePt = p => {
      delta.subVectors(p, orbit.target);
      hx = Math.max(hx, Math.abs(delta.dot(right)));
      hy = Math.max(hy, Math.abs(delta.dot(up)));
      hz = Math.max(hz, Math.abs(delta.dot(forward)));
    };
    if (useBounds === 'static') {
      for (const i of [0, 1, 2, 3, 4, 5, 6, 7]) {
        const v = vector().set(
          i & 1 ? staticBounds.max.x : staticBounds.min.x,
          i & 2 ? staticBounds.max.y : staticBounds.min.y,
          i & 4 ? staticBounds.max.z : staticBounds.min.z
        );
        measurePt(v);
      }
    } else {
      for (const p of parts) if (p.anchor.visible) for (const v of p.points) measurePt(v);
      if (person.root.visible) for (const v of personCorners) measurePt(v);
      if (plate?.mesh.visible) for (const v of platePoints) measurePt(v);
      if (showGuides || liveFurnitureBounds.isEmpty()) for (const v of guides.endpoints) measurePt(v);
    }
    const mx = showGuides ? Math.min(width * 0.17, 85) : Math.min(width * 0.085, 65);
    const my = showGuides ? Math.min(height * 0.16, 62) : Math.min(height * 0.13, 62);
    const reqHalfH = Math.max(hy / (1 - 2 * my / height), hx * height / Math.max(1, width - 2 * mx));
    return { reqHalfH, hz };
  }

  function fitProjection() {
    if (!width || !height) return;
    const aspect = width / height;
    if (projectionMode === 'orthographic') {
      const { reqHalfH } = computeProjectionMetrics('live');
      orthoCam.top = reqHalfH;
      orthoCam.bottom = -reqHalfH;
      orthoCam.right = reqHalfH * aspect;
      orthoCam.left = -orthoCam.right;
      orthoCam.updateProjectionMatrix();
    } else {
      perspCam.aspect = aspect;
      perspCam.updateProjectionMatrix();
    }
    guides.draw(activeCam, width, height);
    updateHotspots();
    projectionDirty = false;
  }

  function updateHotspots() {
    hotspotLayer.hidden = !hotspotsEnabled || !ready || !width || !height;
    if (hotspotLayer.hidden) return;
    const tempBox = new T.Box3();
    for (const node of hotspotNodes) {
      let visible = false;
      if (node.kind === 'joint') {
        const j = node.entry;
        const attached = parts.filter(p => p.joint === j && p.anchor.visible);
        if (attached.length) {
          visible = true;
          const hardware = attached.filter(p => p.def.slot === 'hardware' || Math.max(...p.size) < 220);
          const targets = hardware.length ? hardware : attached;
          tempBox.makeEmpty();
          for (const part of targets) {
            for (const v of part.points) tempBox.expandByPoint(v);
          }
          tempBox.getCenter(node.pos);
          if (!hardware.length) node.pos.z = tempBox.max.z;
        }
        const pct = Math.round(j.target * 100);
        node.btn.setAttribute('aria-pressed', String(j.target > 0.02));
        node.btn.setAttribute('aria-label', `${j.def.label}: ${j.target > 0.02 ? `Open (${pct}%), click to close` : 'Closed, click to open'}`);
      } else {
        const sw = node.entry;
        const targets = sw.actuatorParts.filter(p => p.anchor.visible);
        if (targets.length) {
          visible = true;
          tempBox.makeEmpty();
          for (const part of targets) {
            for (const v of part.points) tempBox.expandByPoint(v);
          }
          tempBox.getCenter(node.pos);
        }
        const isOn = sw.target >= 0.5;
        node.btn.setAttribute('aria-pressed', String(isOn));
        node.btn.setAttribute('aria-label', `${sw.def.label}: ${isOn ? 'On, click to turn off' : 'Off, click to turn on'}`);
      }
      node.btn.hidden = !visible;
      if (!visible) continue;
      node.ndc.copy(node.pos).project(activeCam);
      if (node.ndc.z < -1 || node.ndc.z > 1) { node.btn.hidden = true; continue; }
      const x = clamp((1 + node.ndc.x) * width * 0.5, 22, Math.max(22, width - 22));
      const y = clamp((1 - node.ndc.y) * height * 0.5, 22, Math.max(22, height - 22));
      node.btn.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
    }
  }

  function stepAnimations(now) {
    let active = false;
    for (const j of joints.values()) {
      if (Math.abs(j.current - j.target) > 0.0005) {
        const elapsed = now - j.startTime;
        const t = j.duration > 0 ? clamp(elapsed / j.duration, 0, 1) : 1;
        const eased = 1 - Math.pow(1 - t, 3.5);
        j.current = t >= 1 ? j.target : j.from + (j.target - j.from) * eased;
        applyJointTransform(j, j.current);
        active = true;
      } else if (j.current !== j.target) {
        j.current = j.target;
        applyJointTransform(j, j.current);
      }
    }
    for (const sw of switches.values()) {
      if (Math.abs(sw.current - sw.target) > 0.0005) {
        const elapsed = now - sw.startTime;
        const t = sw.duration > 0 ? clamp(elapsed / sw.duration, 0, 1) : 1;
        const eased = 1 - Math.pow(1 - t, 3);
        sw.current = t >= 1 ? sw.target : sw.from + (sw.target - sw.from) * eased;
        applySwitchState(sw, sw.current);
        active = true;
      } else if (sw.current !== sw.target) {
        sw.current = sw.target;
        applySwitchState(sw, sw.current);
      }
    }
    if (camAnim) {
      const t = camAnim.duration > 0 ? clamp((now - camAnim.startTime) / camAnim.duration, 0, 1) : 1;
      const eased = 1 - Math.pow(1 - t, 3);
      direction.lerpVectors(camAnim.fromDir, camAnim.toDir, eased).normalize();
      const dist = camAnim.fromDist + (camAnim.toDist - camAnim.fromDist) * eased;
      activeCam.position.copy(orbit.target).addScaledVector(direction, dist);
      if (projectionMode === 'orthographic') {
        orthoCam.zoom = camAnim.fromZoom + (camAnim.toZoom - camAnim.fromZoom) * eased;
      }
      orbit.update();
      if (t >= 1) camAnim = null;
      else active = true;
    }
    if (active) {
      updatePartLiveCorners();
      projectionDirty = true;
    }
    return active;
  }

  function render(now = performance.now()) {
    raf = 0;
    if (!ready || !width || !height) return;
    const animating = stepAnimations(now);
    const damped = orbit.enableDamping ? orbit.update() : false;
    if (projectionDirty) fitProjection();
    renderer.render(scene, activeCam);
    if (animating || damped) schedule();
  }

  function schedule() {
    if (!raf) raf = requestAnimationFrame(render);
  }

  function cameraChanged() {
    projectionDirty = true;
    schedule();
  }

  function resize() {
    const w = container.clientWidth, h = container.clientHeight;
    if (width === w && height === h) return;
    const prevBase = baseDist;
    const prevDist = activeCam.position.distanceTo(orbit.target) || baseDist;
    const zoomRatio = prevBase / prevDist;
    width = w; height = h;
    if (w && h) {
      renderer.setSize(w, h, false);
      if (projectionMode === 'perspective' && ready) {
        const { reqHalfH, hz } = computeProjectionMetrics('static');
        baseDist = reqHalfH / Math.tan(rad(perspCam.fov * 0.5)) + hz * 0.55;
        direction.subVectors(perspCam.position, orbit.target).normalize();
        perspCam.position.copy(orbit.target).addScaledVector(direction, baseDist / clamp(zoomRatio, orbit.minZoom, orbit.maxZoom));
        orbit.minDistance = baseDist / orbit.maxZoom;
        orbit.maxDistance = baseDist / orbit.minZoom;
        orbit.update();
      }
    }
    cameraChanged();
  }

  orbit.addEventListener('change', cameraChanged);
  orbit.addEventListener('start', () => { camAnim = null; });
  new ResizeObserver(resize).observe(container);
  resize();

  function positionPart(anchor, center, joint) {
    anchor.position.fromArray(center);
    if (joint) { const p = joint.pivot; anchor.position.x -= p[0]; anchor.position.y -= p[1]; anchor.position.z -= p[2]; }
  }

  function updateLayout(p) {
    // Compute neutral/static bounds so opening a door or drawer never shifts orbit.target.
    const savedJoints = [];
    for (const j of joints.values()) {
      savedJoints.push([j, j.current]);
      applyJointTransform(j, 0);
    }
    furnitureRoot.updateMatrixWorld(true);
    staticFurnitureBounds.makeEmpty();
    for (const part of parts) if (part.anchor.visible) {
      const [x, y, z] = part.size;
      for (let i = 0; i < 8; i++) {
        const v = vector().set(halfSign(i, 1) * x, halfSign(i, 2) * y, halfSign(i, 4) * z).applyMatrix4(part.anchor.matrixWorld);
        staticFurnitureBounds.expandByPoint(v);
      }
    }
    for (const [j, progress] of savedJoints) applyJointTransform(j, progress);

    staticBounds.copy(staticFurnitureBounds);
    if (staticBounds.isEmpty() || showGuides) for (const v of guides.endpoints) staticBounds.expandByPoint(v);

    personBounds.makeEmpty();
    if (p.visible) {
      person.root.position.set(0, 0, 0);
      personBounds.setFromObject(person.root);
      const gap = p.height * 0.09;
      const offset = p.side === 'right' ? staticBounds.max.x + gap - personBounds.min.x : staticBounds.min.x - gap - personBounds.max.x;
      person.root.position.x = offset;
      personBounds.min.x += offset; personBounds.max.x += offset;
      staticBounds.union(personBounds);
      for (let i = 0; i < 8; i++) personCorners[i].set(
        i & 1 ? personBounds.max.x : personBounds.min.x,
        i & 2 ? personBounds.max.y : personBounds.min.y,
        i & 4 ? personBounds.max.z : personBounds.min.z
      );
    }

    const prevBase = baseDist;
    const prevDist = activeCam.position.distanceTo(orbit.target) || prevBase;
    const zoomRatio = ready ? clamp(prevBase / prevDist, orbit.minZoom, orbit.maxZoom) : 1;

    direction.subVectors(activeCam.position, orbit.target).normalize();
    staticBounds.getCenter(focus);
    orbit.target.copy(focus);

    const radius = Math.max(5, staticBounds.min.distanceTo(staticBounds.max) * 0.5);
    perspCam.near = Math.max(10, radius * 0.08);
    perspCam.far = Math.max(10000, radius * 24);
    orthoCam.near = radius * 0.08;
    orthoCam.far = radius * 16;

    activeCam.position.copy(focus).addScaledVector(direction, Math.max(5, radius * 4));
    activeCam.lookAt(focus);
    if (width && height) {
      const { reqHalfH, hz } = computeProjectionMetrics('static');
      baseDist = reqHalfH / Math.tan(rad(perspCam.fov * 0.5)) + hz * 0.55;
    } else {
      baseDist = radius * 4.2;
    }

    orbit.minDistance = baseDist / orbit.maxZoom;
    orbit.maxDistance = baseDist / orbit.minZoom;
    const targetDist = projectionMode === 'perspective' ? baseDist / zoomRatio : radius * 4;
    activeCam.position.copy(focus).addScaledVector(direction, targetDist);
    orbit.update();
    updatePartLiveCorners();
    projectionDirty = true;
  }

  function update(state, { animate = false } = {}) {
    const now = performance.now();
    const d = state.dimensions, resized = !dims || dims.width !== d.width || dims.height !== d.height || dims.depth !== d.depth;
    let layout = resized || showGuides !== state.showDimensions;
    if (layout) { dims = { ...d }; showGuides = state.showDimensions; guides.set(showGuides, d); }
    finishes.update(state.finishes);

    let jointImmediate = false;
    for (const j of joints.values()) {
      const target = state.joints[j.def.id];
      if (resized) j.pivot = resolveVec(j.def.pivot, d);
      if (!j.initialized || !animate || reducedMotion) {
        if (resized || j.current !== target || !j.initialized) {
          j.current = j.target = j.from = target;
          j.initialized = true;
          applyJointTransform(j, j.current);
          jointImmediate = true;
        }
      } else if (j.target !== target) {
        j.from = j.current;
        j.target = target;
        j.startTime = now;
        j.duration = 420;
      }
    }

    for (const p of parts) {
      if (resized) {
        const center = resolveVec(p.def.center, d);
        p.closedCenter = center;
        positionPart(p.anchor, center, p.joint);
        const s = resolveVec(p.def.size, d), prev = p.size;
        if (s[0] !== prev[0] || s[1] !== prev[1] || s[2] !== prev[2]) {
          p.size = s;
          if (p.def.shape === 'box') {
            const bevel = Math.min(1.8, Math.min(...s) * 0.1);
            p.visual.geometry.dispose();
            p.visual.geometry = new RoundedBoxGeometry(...s, 2, bevel);
            mapBoardUV(p.visual.geometry, s, p.grain);
          } else if (p.def.shape === 'cylinder') {
            p.visual.geometry.dispose();
            p.visual.geometry = new T.CylinderGeometry(0.5, 0.5, 1, 48);
            mapCylinderUV(p.visual.geometry, s, p.grain);
            p.visual.scale.fromArray(s);
          } else {
            p.visual.scale.fromArray(s);
          }
        }
      }
      const visible = p.def.when.every(rule => state.options[rule.option] === rule.choice);
      if (p.anchor.visible !== visible) { p.anchor.visible = visible; layout = true; }
    }

    for (const sw of switches.values()) {
      const target = state.switches?.[sw.def.id] ? 1 : 0;
      if (resized && sw.light) {
        positionPart(sw.light, resolveVec(sw.def.light.center, d), sw.joint);
      }
      if (!sw.initialized || !animate || reducedMotion) {
        sw.current = sw.target = sw.from = target;
        sw.initialized = true;
        applySwitchState(sw, sw.current);
      } else if (sw.target !== target) {
        sw.from = sw.current;
        sw.target = target;
        sw.startTime = now;
        sw.duration = 200;
      }
    }

    if (plate) {
      if (resized) positionPart(plate.mesh, resolveVec(inscription.center, d), plateJoint);
      const wasVisible = plate.mesh.visible; plate.setText(state.inscription);
      if (wasVisible !== plate.mesh.visible) layout = true;
    }

    const personState = state.person, prior = personGeometry;
    if (!prior || prior.visible !== personState.visible || (personState.visible &&
      (prior.height !== personState.height || prior.build !== personState.build || prior.pose !== personState.pose ||
        prior.side !== personState.side || prior.yaw !== personState.yaw))) {
      personGeometry = { ...personState };
      layout = true;
    }
    person.update(personState);

    if (layout) updateLayout(personState);
    else if (jointImmediate) { updatePartLiveCorners(); projectionDirty = true; }
    ready = true;
    schedule();
  }

  function view(name) {
    const toDir = vector();
    if (name === 'studio') toDir.copy(studioDirection);
    else if (name === 'front') toDir.set(0, 0, 1);
    else if (name === 'side') toDir.set(1, 0, 0);
    else if (name === 'top') toDir.set(0, 1, 0.0001).normalize();
    else if (name === 'back') toDir.set(0, 0, -1);
    else throw new Error(`Unknown camera view: ${name}`);

    const fromDir = vector().subVectors(activeCam.position, orbit.target).normalize();
    const fromDist = activeCam.position.distanceTo(orbit.target);
    const radius = Math.max(5, staticBounds.min.distanceTo(staticBounds.max) * 0.5);
    let toDist = radius * 2;
    if (projectionMode === 'perspective') {
      if (width && height) {
        const savedPos = activeCam.position.clone();
        activeCam.position.copy(orbit.target).addScaledVector(toDir, Math.max(5, radius * 4));
        activeCam.lookAt(orbit.target);
        const { reqHalfH, hz } = computeProjectionMetrics('static');
        baseDist = reqHalfH / Math.tan(rad(perspCam.fov * 0.5)) + hz * 0.55;
        orbit.minDistance = baseDist / orbit.maxZoom;
        orbit.maxDistance = baseDist / orbit.minZoom;
        activeCam.position.copy(savedPos);
        activeCam.lookAt(orbit.target);
      }
      toDist = baseDist;
    }

    if (reducedMotion || !ready) {
      camAnim = null;
      activeCam.position.copy(orbit.target).addScaledVector(toDir, toDist);
      orthoCam.zoom = 1;
      orbit.update();
      cameraChanged();
    } else {
      camAnim = {
        fromDir, toDir, fromDist, toDist,
        fromZoom: orthoCam.zoom, toZoom: 1,
        startTime: performance.now(), duration: 380
      };
      schedule();
    }
  }

  function zoom(factor) {
    if (!Number.isFinite(factor) || factor <= 0) throw new Error('Zoom factor must be positive.');
    camAnim = null;
    if (projectionMode === 'orthographic') {
      orthoCam.zoom = clamp(orthoCam.zoom * factor, orbit.minZoom, orbit.maxZoom);
      orthoCam.updateProjectionMatrix();
    } else {
      direction.subVectors(perspCam.position, orbit.target);
      const dist = clamp(direction.length() / factor, orbit.minDistance, orbit.maxDistance);
      direction.normalize();
      perspCam.position.copy(orbit.target).addScaledVector(direction, dist);
    }
    orbit.update();
    cameraChanged();
  }

  function turn(yawDegrees, pitchDegrees) {
    camAnim = null;
    spherical.setFromVector3(delta.subVectors(activeCam.position, orbit.target));
    spherical.theta += rad(yawDegrees);
    spherical.phi = clamp(spherical.phi - rad(pitchDegrees), orbit.minPolarAngle, orbit.maxPolarAngle);
    activeCam.position.copy(orbit.target).add(delta.setFromSpherical(spherical));
    orbit.update();
    cameraChanged();
  }

  function setProjection(mode) {
    if (mode !== 'perspective' && mode !== 'orthographic') throw new Error(`Unknown projection: ${mode}`);
    if (projectionMode === mode) return;
    camAnim = null;
    const prevCam = activeCam;
    direction.subVectors(prevCam.position, orbit.target).normalize();
    const prevDist = prevCam.position.distanceTo(orbit.target);
    const radius = Math.max(5, staticBounds.min.distanceTo(staticBounds.max) * 0.5);

    projectionMode = mode;
    if (mode === 'orthographic') {
      const zoomEquiv = clamp(baseDist / prevDist, orbit.minZoom, orbit.maxZoom);
      orthoCam.position.copy(orbit.target).addScaledVector(direction, radius * 4);
      orthoCam.zoom = zoomEquiv;
      orthoCam.near = radius * 0.08;
      orthoCam.far = radius * 16;
      activeCam = orthoCam;
    } else {
      const dist = clamp(baseDist / clamp(orthoCam.zoom, orbit.minZoom, orbit.maxZoom), orbit.minDistance, orbit.maxDistance);
      perspCam.position.copy(orbit.target).addScaledVector(direction, dist);
      activeCam = perspCam;
    }
    orbit.object = activeCam;
    orbit.update();
    cameraChanged();
  }

  function setLighting(name) {
    lighting.setPreset(name);
    schedule();
  }

  function setHotspots(visible) {
    hotspotsEnabled = Boolean(visible);
    updateHotspots();
  }

  // Pointer interaction: raycast click vs orbit drag + fine hover feedback.
  const raycaster = new T.Raycaster();
  const pointer = new T.Vector2();
  let pointerDown = null;

  function pickInteractive(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, activeCam);
    const hits = raycaster.intersectObjects(interactiveMeshes, false);
    for (const hit of hits) {
      let visible = true;
      for (let o = hit.object; o; o = o.parent) { if (!o.visible) { visible = false; break; } }
      if (visible && hit.object.userData.interactive) return hit.object;
    }
    return null;
  }

  function setHoverAction(action) {
    const same = activeHoverAction?.type === action?.type && activeHoverAction?.id === action?.id;
    if (same) return;
    activeHoverAction = action;
    for (const part of parts) {
      const match =
        (action?.type === 'switch' && partToSwitch.get(part.def.id)?.id === action.id) ||
        (action?.type === 'joint' && part.joint?.def.id === action.id) ||
        (action?.type === 'option' && part.def.when.length === 1 && part.def.when[0].option === action.id) ||
        (action?.type === 'slot' && part.def.slot === action.id);
      if (part.hovered !== Boolean(match)) {
        part.hovered = Boolean(match);
        syncPartEmissive(part);
      }
    }
    canvas.style.cursor = action ? 'pointer' : 'grab';
    callbacks.onHover?.(action);
    schedule();
  }

  canvas.addEventListener('pointerdown', e => {
    if (e.button === 0) pointerDown = { x: e.clientX, y: e.clientY, id: e.pointerId };
    canvas.style.cursor = 'grabbing';
  });
  canvas.addEventListener('pointermove', e => {
    if (pointerDown && e.pointerId === pointerDown.id) {
      if (Math.hypot(e.clientX - pointerDown.x, e.clientY - pointerDown.y) >= 6) {
        setHoverAction(null);
      }
      return;
    }
    if (e.pointerType !== 'mouse') return;
    const hit = pickInteractive(e.clientX, e.clientY);
    setHoverAction(hit ? hit.userData.interactive : null);
  });
  canvas.addEventListener('pointerleave', () => {
    setHoverAction(null);
  });
  canvas.addEventListener('pointerup', e => {
    if (!pointerDown || e.pointerId !== pointerDown.id) return;
    const moved = Math.hypot(e.clientX - pointerDown.x, e.clientY - pointerDown.y);
    pointerDown = null;
    if (moved < 6) {
      const hit = pickInteractive(e.clientX, e.clientY);
      if (hit) callbacks.onInteract?.(hit.userData.interactive);
    }
    canvas.style.cursor = activeHoverAction ? 'pointer' : 'grab';
  });
  canvas.addEventListener('pointercancel', () => {
    pointerDown = null;
    canvas.style.cursor = 'grab';
  });

  async function exportPng({ scale = 2, transparent = false, includeGuides = false, includeCaption = false, caption = null } = {}) {
    if (!ready || !width || !height) throw new Error('3D view is not ready yet.');
    const maxTex = Math.min(4096, renderer.capabilities.maxTextureSize || 4096);
    const safeScale = Math.max(1, Math.min(scale, maxTex / Math.max(width, height)));
    const exportW = Math.max(1, Math.round(width * safeScale));
    const exportH = Math.max(1, Math.round(height * safeScale));
    const footerH = includeCaption ? Math.round(74 * safeScale) : 0;

    const outCanvas = document.createElement('canvas');
    outCanvas.width = exportW;
    outCanvas.height = exportH + footerH;
    const ctx = outCanvas.getContext('2d');

    const savedPR = renderer.getPixelRatio();
    const savedBg = scene.background;
    const savedClearColor = new T.Color();
    renderer.getClearColor(savedClearColor);
    const savedClearAlpha = renderer.getClearAlpha();

    try {
      renderer.setPixelRatio(1);
      renderer.setSize(exportW, exportH, false);
      if (transparent) {
        scene.background = null;
        renderer.setClearColor(0x000000, 0);
      } else {
        scene.background = lighting.getBackdropTexture();
        renderer.setClearColor(0x000000, 1);
      }

      const aspect = exportW / exportH;
      if (projectionMode === 'orthographic') {
        const { reqHalfH } = computeProjectionMetrics('live');
        orthoCam.top = reqHalfH;
        orthoCam.bottom = -reqHalfH;
        orthoCam.right = reqHalfH * aspect;
        orthoCam.left = -orthoCam.right;
        orthoCam.updateProjectionMatrix();
      } else {
        perspCam.aspect = aspect;
        perspCam.updateProjectionMatrix();
      }

      renderer.render(scene, activeCam);
      ctx.drawImage(canvas, 0, 0, exportW, exportH);

      if (includeGuides) {
        drawGuidesToCanvas(ctx, guides.endpoints, activeCam, exportW, exportH, dims, safeScale);
      }

      if (includeCaption && caption) {
        ctx.fillStyle = transparent ? 'rgba(255, 254, 250, 0.96)' : '#fffefa';
        ctx.fillRect(0, exportH, exportW, footerH);
        ctx.fillStyle = '#d8dacf';
        ctx.fillRect(0, exportH, exportW, Math.max(1, safeScale));

        const padX = Math.round(22 * safeScale);
        const midY = exportH + footerH * 0.5;
        ctx.fillStyle = '#222b26';
        ctx.font = `600 ${Math.round(17 * safeScale)}px Georgia, "Times New Roman", serif`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText(caption.name, padX, midY - 2 * safeScale, exportW * 0.54);

        ctx.fillStyle = '#56635b';
        ctx.font = `500 ${Math.round(11 * safeScale)}px system-ui, -apple-system, sans-serif`;
        ctx.textBaseline = 'top';
        ctx.fillText(caption.finishes, padX, midY + 4 * safeScale, exportW * 0.58);

        ctx.textAlign = 'right';
        ctx.fillStyle = '#222b26';
        ctx.font = `600 ${Math.round(12.5 * safeScale)}px ui-monospace, SFMono-Regular, Consolas, monospace`;
        ctx.textBaseline = 'bottom';
        ctx.fillText(caption.dimensions, exportW - padX, midY - 2 * safeScale);

        ctx.fillStyle = '#56635b';
        ctx.font = `500 ${Math.round(10 * safeScale)}px system-ui, -apple-system, sans-serif`;
        ctx.textBaseline = 'top';
        ctx.fillText('Form Study · Visual reference only', exportW - padX, midY + 4 * safeScale);
      }
    } finally {
      renderer.setPixelRatio(savedPR);
      renderer.setSize(width, height, false);
      scene.background = savedBg;
      renderer.setClearColor(savedClearColor, savedClearAlpha);
      fitProjection();
      renderer.render(scene, activeCam);
    }

    const blob = await new Promise((resolve, reject) => {
      outCanvas.toBlob(b => (b ? resolve(b) : reject(new Error('Failed to encode PNG image.'))), 'image/png');
    });
    return { blob, width: outCanvas.width, height: outCanvas.height };
  }

  return { update, view, zoom, turn, setProjection, setLighting, setHotspots, exportPng };
}
