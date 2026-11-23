import * as T from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone as cloneModel } from 'three/addons/utils/SkeletonUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { resolveVec } from '../lib/coordinates.mjs';
import { createKinematics, makePersonOBB, stepPhysicsSubstep } from '../lib/kinematics.mjs';
import { STUDIO_PRESETS, LED_TEMPS, ROOM_WALL_PRESETS, ROOM_FLOOR_PRESETS } from './presets.mjs';
import {
  DEFAULT_ACTION_DELAY_MS,
  AUTO_CLOSE_HOLD_SEC,
  JOINT_AUTO_CLOSE_SEC,
  REACH_ZONE_COLORS,
  computePersonReachZones,
  isShelfLikePart,
  classifyShelfAccessibility,
  detectSeats,
  computeInteractionTarget,
  clampPersonOutsideObstacles,
  resolveWalkStandPoint,
  planFloorPath,
  pickNextPersonAction
} from './person-ai.mjs';
import { makeMannequin } from './mannequin.mjs';
import { makeFinishes, makePlate, mapBoardUV, mapCylinderUV } from './materials.mjs';

const rad = T.MathUtils.degToRad;
const clamp = T.MathUtils.clamp;
const vector = () => new T.Vector3();
const corners = () => Array.from({ length: 8 }, vector);
const halfSign = (corner, axisBit) => (corner & axisBit) ? .5 : -.5;
const studioDirection = new T.Vector3(.85, .56, 1.55).normalize();

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
    getPresetName: () => activePreset,
    getLightBoost: () => STUDIO_PRESETS[activePreset]?.lightBoost ?? 1,
    getBackdropTexture: () => bgCache.get(activePreset),
    setFloorVisible(visible) {
      floor.visible = Boolean(visible);
      contactAO.mesh.visible = Boolean(visible);
    },
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

// Architectural room enclosure: procedural tiled oak/travertine/microcement floor,
// single-sided +Z rear wall (visible from front/studio, never blocks Back view), and non-clipping skirting.
function createRoomShell() {
  const group = new T.Group();
  group.visible = false;

  const floorTexCache = new Map();
  function makeFloorTexture(kindId) {
    if (floorTexCache.has(kindId)) return floorTexCache.get(kindId);
    const preset = ROOM_FLOOR_PRESETS.find(f => f.id === kindId) || ROOM_FLOOR_PRESETS[0];
    const size = 512;
    const cvs = document.createElement('canvas');
    cvs.width = size;
    cvs.height = size;
    const ctx = cvs.getContext('2d');
    ctx.fillStyle = preset.baseHex;
    ctx.fillRect(0, 0, size, size);

    let seed = kindId === 'oak' ? 19 : kindId === 'stone' ? 47 : 83;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };

    if (kindId === 'oak') {
      const rows = 8;
      const ph = size / rows;
      for (let r = 0; r < rows; r++) {
        const y = r * ph;
        const offset = (r % 2) * (size * 0.5);
        for (let c = 0; c < 2; c++) {
          const x = (c * size * 0.5 + offset) % size;
          ctx.fillStyle = preset.grainHex;
          ctx.globalAlpha = 0.08 + rand() * 0.14;
          ctx.fillRect(x, y, size * 0.5, ph);
          ctx.globalAlpha = 0.16 + rand() * 0.14;
          for (let g = 0; g < 14; g++) {
            const gy = y + 3 + rand() * (ph - 6);
            ctx.fillRect(x, gy, size * 0.5, 1.2);
          }
        }
        ctx.globalAlpha = 0.36;
        ctx.fillStyle = preset.lineHex;
        ctx.fillRect(0, y, size, 1.6);
        ctx.fillRect((offset + size * 0.5) % size, y, 1.6, ph);
      }
      ctx.globalAlpha = 1;
    } else if (kindId === 'stone') {
      const tiles = 4;
      const step = size / tiles;
      for (let r = 0; r < tiles; r++) {
        for (let c = 0; c < tiles; c++) {
          ctx.fillStyle = preset.grainHex;
          ctx.globalAlpha = 0.06 + rand() * 0.12;
          ctx.fillRect(c * step, r * step, step, step);
        }
      }
      for (let i = 0; i < 650; i++) {
        ctx.fillStyle = i % 2 ? preset.grainHex : preset.lineHex;
        ctx.globalAlpha = 0.08;
        ctx.fillRect(rand() * size, rand() * size, 2 + rand() * 14, 1 + rand() * 2);
      }
      ctx.globalAlpha = 0.28;
      ctx.fillStyle = preset.lineHex;
      for (let i = 0; i < tiles; i++) {
        ctx.fillRect(0, i * step, size, 1.5);
        ctx.fillRect(i * step, 0, 1.5, size);
      }
      ctx.globalAlpha = 1;
    } else {
      for (let i = 0; i < 900; i++) {
        ctx.fillStyle = i % 2 ? preset.grainHex : preset.lineHex;
        ctx.globalAlpha = 0.05 + rand() * 0.06;
        ctx.beginPath();
        ctx.arc(rand() * size, rand() * size, 6 + rand() * 28, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = preset.lineHex;
      ctx.fillRect(0, size * 0.5, size, 1);
      ctx.fillRect(size * 0.5, 0, 1, size);
      ctx.globalAlpha = 1;
    }

    const tex = new T.CanvasTexture(cvs);
    tex.colorSpace = T.SRGBColorSpace;
    tex.wrapS = T.RepeatWrapping;
    tex.wrapT = T.RepeatWrapping;
    tex.anisotropy = 4;
    floorTexCache.set(kindId, tex);
    return tex;
  }

  let wallColor = ROOM_WALL_PRESETS[0].hex;
  let floorKind = ROOM_FLOOR_PRESETS[0].id;
  let currentTex = makeFloorTexture(floorKind);

  const floorMat = new T.MeshStandardMaterial({
    map: currentTex,
    roughness: 0.72,
    metalness: 0.03
  });
  const wallMat = new T.MeshStandardMaterial({
    color: wallColor,
    roughness: 0.94,
    metalness: 0,
    side: T.FrontSide
  });
  const skirtMat = new T.MeshStandardMaterial({
    color: new T.Color(wallColor).multiplyScalar(0.92),
    roughness: 0.78,
    metalness: 0.02
  });

  const floorMesh = new T.Mesh(new T.PlaneGeometry(1, 1), floorMat);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.receiveShadow = true;

  const wallMesh = new T.Mesh(new T.PlaneGeometry(1, 1), wallMat);
  wallMesh.receiveShadow = true;

  const skirtGeo = new T.BoxGeometry(1, 1, 1);
  const leftSkirt = new T.Mesh(skirtGeo, skirtMat);
  const rightSkirt = new T.Mesh(skirtGeo, skirtMat);
  leftSkirt.castShadow = leftSkirt.receiveShadow = true;
  rightSkirt.castShadow = rightSkirt.receiveShadow = true;

  group.add(floorMesh, wallMesh, leftSkirt, rightSkirt);

  let roomW = 9000;
  let roomD = 7000;
  function applyTileRepeat() {
    currentTex.repeat.set(Math.max(1, roomW / 900), Math.max(1, roomD / 900));
    currentTex.needsUpdate = true;
  }

  function fit(furnitureBounds, personBounds, personVisible) {
    const empty = furnitureBounds.isEmpty();
    const minX = empty ? -600 : furnitureBounds.min.x;
    const maxX = empty ? 600 : furnitureBounds.max.x;
    const minZ = empty ? -300 : furnitureBounds.min.z;
    const maxZ = empty ? 300 : furnitureBounds.max.z;
    const maxY = empty ? 1800 : furnitureBounds.max.y;

    let sceneMinX = minX;
    let sceneMaxX = maxX;
    if (personVisible && !personBounds.isEmpty()) {
      sceneMinX = Math.min(sceneMinX, personBounds.min.x);
      sceneMaxX = Math.max(sceneMaxX, personBounds.max.x);
    }
    const cx = (sceneMinX + sceneMaxX) * 0.5;
    const spanX = Math.max(1200, sceneMaxX - sceneMinX);
    const spanZ = Math.max(800, maxZ - minZ);
    roomW = Math.max(9000, spanX * 4);
    roomD = Math.max(7000, spanZ * 6);
    const wallH = Math.max(3600, maxY * 2.1);
    const wallZ = minZ - 4;

    floorMesh.position.set(cx, -0.3, wallZ + roomD * 0.45);
    floorMesh.scale.set(roomW, roomD, 1);
    wallMesh.position.set(cx, wallH * 0.5 - 0.5, wallZ);
    wallMesh.scale.set(roomW, wallH, 1);
    applyTileRepeat();

    const roomLeft = cx - roomW * 0.5;
    const roomRight = cx + roomW * 0.5;
    const gapLeft = minX - 2;
    const gapRight = maxX + 2;
    const skirtH = 80;
    const skirtD = 14;
    const skirtZ = wallZ + skirtD * 0.5;

    if (empty) {
      leftSkirt.visible = true;
      rightSkirt.visible = false;
      leftSkirt.scale.set(roomW, skirtH, skirtD);
      leftSkirt.position.set(cx, skirtH * 0.5 - 0.3, skirtZ);
    } else {
      const lw = Math.max(0, gapLeft - roomLeft);
      const rw = Math.max(0, roomRight - gapRight);
      leftSkirt.visible = lw > 1;
      if (leftSkirt.visible) {
        leftSkirt.scale.set(lw, skirtH, skirtD);
        leftSkirt.position.set(roomLeft + lw * 0.5, skirtH * 0.5 - 0.3, skirtZ);
      }
      rightSkirt.visible = rw > 1;
      if (rightSkirt.visible) {
        rightSkirt.scale.set(rw, skirtH, skirtD);
        rightSkirt.position.set(gapRight + rw * 0.5, skirtH * 0.5 - 0.3, skirtZ);
      }
    }
  }

  function setStyle({ wallColor: nextWall, floorKind: nextFloor } = {}) {
    if (typeof nextWall === 'string' && /^#[\da-f]{6}$/i.test(nextWall)) {
      wallColor = nextWall;
      wallMat.color.set(wallColor);
      skirtMat.color.set(wallColor).multiplyScalar(0.92);
    }
    if (nextFloor && ROOM_FLOOR_PRESETS.some(f => f.id === nextFloor)) {
      floorKind = nextFloor;
      currentTex = makeFloorTexture(floorKind);
      floorMat.map = currentTex;
      floorMat.needsUpdate = true;
      applyTileRepeat();
    }
  }

  function setVisible(visible) {
    group.visible = Boolean(visible);
  }

  return { group, fit, setStyle, setVisible };
}

const DEFAULT_LOCALE = {
  lang: 'en',
  dir: 'ltr',
  axes: ['W', 'H', 'D'],
  mmUnit: 'mm',
  term: x => x,
  formatCanvasLabel: name => `Interactive 3D view of ${name}. Click doors, drawers, switches, or parts to interact, or pinch/scroll with two fingers to zoom.`,
  formatHotspot: (kind, label, val) => kind === 'joint'
    ? `${label}: ${val > 0.02 ? `Open (${Math.round(val * 100)}%), click to close` : 'Closed, click to open'}`
    : `${label}: ${val >= 0.5 ? 'On, click to turn off' : 'Off, click to turn on'}`
};

// Shared W/H/D guide layout used identically by live SVG overlay and offscreen PNG export canvas.
function computeGuideLayout(endpoints, cam, w, h, dims, uiScale = 1, locale = DEFAULT_LOCALE, measureTextFn = null) {
  const projected = corners();
  for (let i = 0; i < 8; i++) {
    const p = projected[i].copy(endpoints[i]).project(cam);
    p.x = (1 + p.x) * w / 2;
    p.y = (1 - p.y) * h / 2;
  }
  const letters = locale?.axes ?? DEFAULT_LOCALE.axes;
  const mmUnit = locale?.mmUnit ?? DEFAULT_LOCALE.mmUnit;
  const values = [dims.width, dims.height, dims.depth];
  const items = [];
  for (let axis = 0; axis < 3; axis++) {
    const str = `${letters[axis]}  ${values[axis].toLocaleString('en-US')} ${mmUnit}`;
    const half = measureTextFn
      ? Math.ceil(measureTextFn(str) * 0.5 + 8 * uiScale)
      : Math.ceil((str.length * 4.1 + 8) * uiScale);
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

function measureOverlay(container, initialLocale = DEFAULT_LOCALE) {
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
  let visible = false, currentDims = { width: 1, height: 1, depth: 1 }, locale = initialLocale;
  let lastCam = null, lastW = 0, lastH = 0;
  function set(on, dims) {
    visible = on;
    currentDims = { ...dims };
    svg.style.display = on ? 'block' : 'none';
    for (let i = 0; i < 8; i++) endpoints[i].set(halfSign(i, 1) * dims.width, i & 2 ? dims.height : 0, halfSign(i, 4) * dims.depth);
  }
  function draw(cam, w, h) {
    lastCam = cam; lastW = w; lastH = h;
    if (!visible || !w || !h || !cam) return;
    const layout = computeGuideLayout(endpoints, cam, w, h, currentDims, 1, locale);
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
  function setLocale(nextLocale) {
    locale = nextLocale || DEFAULT_LOCALE;
    draw(lastCam, lastW, lastH);
  }
  return { set, draw, setLocale, endpoints };
}

function drawGuidesToCanvas(ctx, endpoints, cam, w, h, dims, scale, locale = DEFAULT_LOCALE) {
  ctx.save();
  ctx.font = `600 ${Math.round(12 * scale)}px system-ui, -apple-system, sans-serif`;
  const layout = computeGuideLayout(endpoints, cam, w, h, dims, scale, locale, s => ctx.measureText(s).width);
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

export async function createStudio(container, spec, assets, callbacks = {}, initialLocale = null) {
  let locale = initialLocale || DEFAULT_LOCALE;
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
  canvas.setAttribute('aria-label', locale.formatCanvasLabel(locale.term(spec.name)));
  canvas.style.cssText = 'display:block;width:100%;height:100%;touch-action:none;cursor:grab';
  container.appendChild(canvas);

  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const scene = new T.Scene();
  const lighting = lightStudio(renderer, scene);
  const room = createRoomShell();
  scene.add(room.group);
  const finishes = makeFinishes(spec, renderer);
  const kinematics = createKinematics(spec);

  const perspCam = new T.PerspectiveCamera(28, 1, 10, 50000);
  const orthoCam = new T.OrthographicCamera(-1, 1, 1, -1, 0.1, 10000);
  let projectionMode = 'perspective';
  let activeCam = perspCam;
  activeCam.position.copy(studioDirection).multiplyScalar(3000);

  let aoEnabled = true;
  let xrayEnabled = false;
  let accessibilityEnabled = false;
  let ledTempId = '3500';
  let backdropMode = 'studio';
  let composer = null, renderPass = null, gtaoPass = null, outputPass = null;
  const aoClipBox = new T.Box3();
  try {
    composer = new EffectComposer(renderer);
    composer.setPixelRatio(renderer.getPixelRatio());
    renderPass = new RenderPass(scene, activeCam);
    gtaoPass = new GTAOPass(scene, activeCam, 512, 512);
    gtaoPass.output = GTAOPass.OUTPUT.Default;
    gtaoPass.blendIntensity = 0.62;
    gtaoPass.updateGtaoMaterial({
      radius: 28,
      distanceExponent: 1.5,
      thickness: 0.7,
      scale: 1,
      samples: 12
    });
    gtaoPass.updatePdMaterial({
      lumaPhi: 10,
      depthPhi: 2,
      normalPhi: 3,
      radius: 4,
      rings: 2,
      samples: 8
    });
    outputPass = new OutputPass();
    composer.addPass(renderPass);
    composer.addPass(gtaoPass);
    composer.addPass(outputPass);
  } catch {
    composer = null;
  }

  const orbit = new OrbitControls(activeCam, canvas);
  orbit.enablePan = false;
  orbit.enableZoom = false; // Handled smoothly via custom capture-phase trackpad/wheel/gesture zoom on container.
  orbit.enableDamping = !reducedMotion;
  orbit.dampingFactor = 0.09;
  orbit.minPolarAngle = 0.0001;
  orbit.maxPolarAngle = Math.PI / 2;
  orbit.minZoom = 0.3;
  orbit.maxZoom = 8;
  orbit.zoomSpeed = 0.85;
  orbit.touches = { ONE: T.TOUCH.ROTATE, TWO: T.TOUCH.DOLLY_ROTATE };

  const furnitureRoot = new T.Group(), person = makeMannequin();
  scene.add(furnitureRoot, person.root);

  const joints = new Map(spec.joints.map(def => {
    const group = new T.Group();
    furnitureRoot.add(group);
    return [def.id, {
      id: def.id,
      label: def.label,
      def,
      group,
      pivot: [0, 0, 0],
      current: 0,
      target: 0,
      velocity: 0,
      initialized: false
    }];
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
      hovered: false,
      contactFlash: 0,
      isShelf: false,
      accessZone: null,
      accessHeightMm: 0
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
      light.castShadow = false;
      light.shadow.mapSize.set(512, 512);
      light.shadow.camera.near = 8;
      light.shadow.camera.far = Math.max(200, def.light.distance);
      light.shadow.bias = -0.0006;
      light.shadow.normalBias = 2.0;
      light.shadow.radius = 2.5;
      (joint ? joint.group : furnitureRoot).add(light);
      for (const ep of emissiveParts) {
        ep.noShadowCast = true;
        ep.visual.traverse(obj => { if (obj.isMesh) obj.castShadow = false; });
      }
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

  // Interactive 3D hotspot pins overlay (off by default; toggleable from toolbar)
  const hotspotLayer = document.createElement('div');
  hotspotLayer.className = 'hotspot-layer';
  container.appendChild(hotspotLayer);
  let hotspotsEnabled = false;
  const hotspotNodes = [];
  for (const j of joints.values()) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'hotspot hotspot-joint';
    btn.innerHTML = '<span class="hotspot-dot" aria-hidden="true"></span><span class="hotspot-tag"></span>';
    btn.querySelector('.hotspot-tag').textContent = locale.term(j.def.label);
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
    btn.querySelector('.hotspot-tag').textContent = locale.term(sw.def.label);
    btn.addEventListener('click', e => {
      e.stopPropagation();
      callbacks.onInteract?.({ type: 'switch', id: sw.def.id, label: sw.def.label });
    });
    hotspotLayer.appendChild(btn);
    hotspotNodes.push({ kind: 'switch', id: sw.def.id, entry: sw, btn, pos: vector(), ndc: vector() });
  }

  const guides = measureOverlay(container, locale);
  const staticFurnitureBounds = new T.Box3(), liveFurnitureBounds = new T.Box3();
  const personBounds = new T.Box3(), staticBounds = new T.Box3(), shadowBounds = new T.Box3();
  const personCorners = corners(), focus = vector(), direction = vector(), delta = vector(), right = vector(), up = vector(), forward = vector();
  const spherical = new T.Spherical();
  let width = 0, height = 0, raf = 0, ready = false, showGuides = false, dims = null, optionsCache = null, personGeometry = null;
  let projectionDirty = true, baseDist = 3000;
  let camAnim = null;
  let activeHoverAction = null;
  let lastFrameTime = 0;
  let zoomFactorPending = 1;

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

  function liveJointPositions() {
    const out = {};
    for (const j of joints.values()) out[j.id] = j.current;
    return out;
  }

  function triggerBlockerFlash(collision) {
    if (reducedMotion) return;
    const targets = collision.blockerJointId
      ? parts.filter(p => p.joint?.id === collision.blockerJointId && p.anchor.visible)
      : parts.filter(p => p.def.id === collision.blockerPartId && p.anchor.visible);
    const expires = performance.now() + 260;
    for (const part of targets) {
      part.contactFlash = expires;
      syncPartEmissive(part);
    }
  }

  function applySwitchState(sw, p) {
    const anyVisible = sw.actuatorParts.some(part => part.anchor.visible) || sw.emissiveParts.some(part => part.anchor.visible);
    const boost = lighting.getLightBoost();
    const kelvinPreset = LED_TEMPS[ledTempId] || LED_TEMPS['3500'];
    if (sw.light) {
      sw.light.color.set(kelvinPreset.color);
      sw.light.intensity = anyVisible ? sw.def.light.intensity * Math.pow(200, 1.5) * boost * p : 0;
      const shouldCast = Boolean(anyVisible && p > 0.005);
      let activeCasters = 0;
      for (const other of switches.values()) {
        if (other !== sw && other.light?.castShadow) activeCasters++;
      }
      const nextCast = shouldCast && (sw.light.castShadow || activeCasters < 4);
      if (sw.light.castShadow !== nextCast) {
        sw.light.castShadow = nextCast;
        renderer.shadowMap.needsUpdate = true;
      }
    }
    const glowColor = sw.def.light ? new T.Color(kelvinPreset.emissive) : null;
    const emissiveMult = 3.2 * (1 + (boost - 1) * 0.45);
    for (const part of sw.emissiveParts) {
      part.ledColor = glowColor;
      part.ledIntensity = emissiveMult * p;
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

  function refreshSwitches() {
    for (const sw of switches.values()) applySwitchState(sw, sw.current);
  }

  const isXrayFront = part => part?.joint?.def.type === 'hinge' || part?.joint?.def.type === 'flap';
  const hasXrayTargets = parts.some(isXrayFront);
  const xrayWireMat = new T.LineBasicMaterial({ color: 0x3b4d42, transparent: true, opacity: 0.42, depthWrite: false });
  const accessMats = {
    green: new T.MeshPhysicalMaterial({
      color: REACH_ZONE_COLORS.green,
      emissive: new T.Color(REACH_ZONE_COLORS.green),
      emissiveIntensity: 0.24,
      roughness: 0.48,
      metalness: 0.04
    }),
    yellow: new T.MeshPhysicalMaterial({
      color: REACH_ZONE_COLORS.yellow,
      emissive: new T.Color(REACH_ZONE_COLORS.yellow),
      emissiveIntensity: 0.24,
      roughness: 0.48,
      metalness: 0.04
    }),
    red: new T.MeshPhysicalMaterial({
      color: REACH_ZONE_COLORS.red,
      emissive: new T.Color(REACH_ZONE_COLORS.red),
      emissiveIntensity: 0.26,
      roughness: 0.48,
      metalness: 0.04
    })
  };
  const accessEdgeMats = {
    green: new T.LineBasicMaterial({ color: 0x165934, transparent: true, opacity: 0.85 }),
    yellow: new T.LineBasicMaterial({ color: 0x7c5308, transparent: true, opacity: 0.85 }),
    red: new T.LineBasicMaterial({ color: 0x7a1b12, transparent: true, opacity: 0.85 })
  };

  function clearPartAccessWire(visual) {
    visual.traverse(obj => {
      for (let i = obj.children.length - 1; i >= 0; i--) {
        const child = obj.children[i];
        if (child.userData?.isAccessWire) {
          obj.remove(child);
          child.geometry.dispose();
        }
      }
    });
  }

  function applyAccessibilityState() {
    const personH = personGeometry?.height || 1700;
    const encH = dims?.height || 0;
    for (const part of parts) {
      part.isShelf = isShelfLikePart(part.def, part.size, encH);
      clearPartAccessWire(part.visual);
      if (part.isShelf) {
        const topY = (part.closedCenter?.[1] ?? 0) + (part.size?.[1] ?? 0) * 0.5;
        const info = classifyShelfAccessibility(topY, personH);
        part.accessZone = info.zone;
        part.accessHeightMm = info.shelfHeight;
      } else {
        part.accessZone = null;
        part.accessHeightMm = 0;
      }
      part.visual.traverse(obj => {
        if (!obj.isMesh) return;
        if (accessibilityEnabled && part.isShelf && part.accessZone) {
          if (!obj.userData.origAccessMat) obj.userData.origAccessMat = obj.material;
          obj.material = accessMats[part.accessZone] || obj.userData.origAccessMat;
          if ((part.def.shape === 'box' || part.def.shape === 'cylinder') && obj.geometry?.attributes?.position?.count) {
            const edges = new T.EdgesGeometry(obj.geometry, 28);
            const lines = new T.LineSegments(edges, accessEdgeMats[part.accessZone]);
            lines.userData.isAccessWire = true;
            lines.raycast = () => { };
            obj.add(lines);
          }
        } else if (obj.userData.origAccessMat) {
          obj.material = obj.userData.origAccessMat;
          delete obj.userData.origAccessMat;
        }
      });
    }
  }

  function clearPartXrayWire(visual) {
    visual.traverse(obj => {
      for (let i = obj.children.length - 1; i >= 0; i--) {
        const child = obj.children[i];
        if (child.userData?.isXrayWire) {
          obj.remove(child);
          child.geometry.dispose();
        }
      }
    });
  }

  function applyXrayState(active) {
    for (const part of parts) {
      const ghost = active && isXrayFront(part);
      clearPartXrayWire(part.visual);
      part.visual.traverse(obj => {
        if (!obj.isMesh || !obj.material) return;
        const m = obj.material;
        if (m.userData.xrayOrig === undefined) {
          m.userData.xrayOrig = {
            transparent: Boolean(m.transparent),
            opacity: m.opacity ?? 1,
            depthWrite: m.depthWrite ?? true,
            castShadow: obj.castShadow,
            receiveShadow: obj.receiveShadow
          };
        }
        const orig = m.userData.xrayOrig;
        if (ghost) {
          m.userData.xrayApplied = true;
          m.transparent = true;
          m.opacity = 0.16;
          m.depthWrite = false;
          m.needsUpdate = true;
          obj.castShadow = false;
          obj.receiveShadow = false;
          if ((part.def.shape === 'box' || part.def.shape === 'cylinder') && obj.geometry?.attributes?.position?.count) {
            const edges = new T.EdgesGeometry(obj.geometry, 28);
            const lines = new T.LineSegments(edges, xrayWireMat);
            lines.userData.isXrayWire = true;
            lines.raycast = () => { };
            obj.add(lines);
          }
        } else {
          m.transparent = orig.transparent;
          m.opacity = orig.opacity;
          m.depthWrite = orig.depthWrite;
          m.needsUpdate = true;
          obj.castShadow = part.noShadowCast ? false : orig.castShadow;
          obj.receiveShadow = orig.receiveShadow;
          delete m.userData.xrayApplied;
          delete m.userData.xrayOrig;
        }
      });
    }
  }

  function updateAoClipBox() {
    if (!gtaoPass) return;
    if (liveFurnitureBounds.isEmpty()) {
      gtaoPass.setSceneClipBox(null);
      return;
    }
    aoClipBox.copy(liveFurnitureBounds);
    if (person.root.visible && !personBounds.isEmpty()) aoClipBox.union(personBounds);
    aoClipBox.min.x -= 80;
    aoClipBox.max.x += 80;
    aoClipBox.min.z -= 80;
    aoClipBox.max.z += 80;
    aoClipBox.max.y += 80;
    aoClipBox.min.y = backdropMode === 'room' ? -4 : 0.5;
    gtaoPass.setSceneClipBox(aoClipBox);
  }

  function syncPartEmissive(part, now = performance.now()) {
    const flashing = part.contactFlash > now;
    part.visual.traverse(obj => {
      if (!obj.isMesh || !obj.material || !('emissive' in obj.material)) return;
      if (obj.material.userData.baseEmissive === undefined) {
        obj.material.userData.baseEmissive = obj.material.emissive.getHex();
        obj.material.userData.baseEmissiveIntensity = obj.material.emissiveIntensity ?? 0;
      }
      if (part.ledColor && part.ledIntensity > 0.001) {
        obj.material.emissive.copy(part.ledColor);
        obj.material.emissiveIntensity = part.ledIntensity + (part.hovered ? 0.25 : 0);
      } else if (flashing) {
        obj.material.emissive.setHex(0xe59d3c);
        obj.material.emissiveIntensity = 0.22;
      } else if (part.hovered) {
        obj.material.emissive.setHex(0x3b7a5e);
        obj.material.emissiveIntensity = 0.22;
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
    updateAoClipBox();
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
        const pct = Math.round(j.current * 100);
        node.btn.setAttribute('aria-pressed', String(j.current > 0.02));
        node.btn.setAttribute('aria-label', locale.formatHotspot('joint', locale.term(j.def.label), j.current));
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
        node.btn.setAttribute('aria-label', locale.formatHotspot('switch', locale.term(sw.def.label), sw.target));
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

  function applyZoomStep(factor) {
    if (!Number.isFinite(factor) || factor <= 0 || Math.abs(factor - 1) < 1e-6) return;
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
    projectionDirty = true;
  }

  function queueZoom(factor) {
    if (!Number.isFinite(factor) || factor <= 0) return;
    camAnim = null;
    if (reducedMotion || !ready) {
      applyZoomStep(factor);
      schedule();
      return;
    }
    zoomFactorPending = clamp(zoomFactorPending * factor, 0.25, 4);
    schedule();
  }

  const wrapAngle = a => Math.atan2(Math.sin(a), Math.cos(a));
  const lerpAngle = (cur, target, t) => cur + wrapAngle(target - cur) * t;

  const personActor = {
    running: false,
    directed: false,
    queue: [],
    hasMoved: false,
    phase: 'stopped',
    waitTimer: 0,
    phaseTime: 0,
    path: [],
    pathIdx: 0,
    currentAction: null,
    actionFired: false,
    lastActionId: null,
    walkPhase: 0,
    walkBlend: 0,
    sitBlend: 0,
    seatHeightNorm: 0,
    reachBlend: 0,
    reachProgress: 0,
    reachSide: 1,
    reachHeightNorm: 0.55,
    headYaw: 0,
    headPitch: 0,
    idleTime: 0,
    turn: null,
    inspect: null,
    seatedSeat: null,
    posX: 0,
    posZ: 0,
    yaw: 0
  };

  function collectWorldPartBoxes() {
    const boxes = [];
    for (const p of parts) {
      if (!p.anchor.visible) continue;
      let minX = Infinity, minY = Infinity, minZ = Infinity;
      let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
      for (const v of p.points) {
        if (v.x < minX) minX = v.x;
        if (v.x > maxX) maxX = v.x;
        if (v.y < minY) minY = v.y;
        if (v.y > maxY) maxY = v.y;
        if (v.z < minZ) minZ = v.z;
        if (v.z > maxZ) maxZ = v.z;
      }
      const slot = slotMap.get(p.def.slot);
      boxes.push({
        id: p.def.id,
        slotId: p.def.slot,
        slotLabel: slot?.label || '',
        jointId: p.joint?.id ?? null,
        minX, maxX, minY, maxY, minZ, maxZ
      });
    }
    return boxes;
  }

  function updateKinematicsPersonObstacle() {
    if (!person.root.visible || !personGeometry) {
      kinematics.setPersonObstacle(null);
      return;
    }
    kinematics.setPersonObstacle(makePersonOBB({
      x: person.root.position.x,
      z: person.root.position.z,
      yaw: person.root.rotation.y,
      height: personGeometry.height,
      build: personGeometry.build,
      seated: personActor.sitBlend > 0.5 || personGeometry.pose === 'seated'
    }));
  }

  function makeStandClearChecker(jointId, fromP, toP) {
    const posMap = liveJointPositions();
    const h = personGeometry?.height || 1700;
    const b = personGeometry?.build || 'regular';
    return (sx, sz, yaw) => kinematics.isPersonClearOfJointSweep(
      jointId,
      fromP,
      toP,
      posMap,
      makePersonOBB({ x: sx, z: sz, yaw, height: h, build: b, seated: false })
    );
  }

  const jointAutoCloseTimers = new Map();

  function armJointAutoClose(jointId, delaySec = JOINT_AUTO_CLOSE_SEC) {
    if (!jointId) return;
    jointAutoCloseTimers.set(jointId, delaySec);
  }

  function clearJointAutoClose(jointId) {
    if (!jointId) return;
    jointAutoCloseTimers.delete(jointId);
  }

  function buildPersonCandidates() {
    const allBoxes = collectWorldPartBoxes();
    const staticBoxes = allBoxes.filter(b => !b.jointId);
    const movingBoxes = allBoxes.filter(b => b.jointId);
    const byJoint = new Map();
    for (const b of movingBoxes) {
      const arr = byJoint.get(b.jointId) || [];
      arr.push(b);
      byJoint.set(b.jointId, arr);
    }
    const byPartId = new Map(allBoxes.map(b => [b.id, b]));
    const posMap = liveJointPositions();
    const candidates = [];

    for (const j of joints.values()) {
      const tBoxes = byJoint.get(j.id);
      if (!tBoxes?.length) continue;
      const goal = j.current > 0.45 ? 0 : 1;
      const res = kinematics.resolveJointMotion(j.id, j.current, goal, posMap, { ignorePerson: true });
      if (Math.abs(res.progress - j.current) <= 0.12) continue;
      if (goal > j.current && res.blocked && Math.abs(res.progress - j.current) < 0.5) continue;
      if (goal < j.current && res.blocked && res.progress > 0.15) continue;
      const target = computeInteractionTarget({
        kind: 'joint',
        id: j.id,
        label: j.label,
        def: j.def,
        targetBoxes: tBoxes,
        staticBoxes,
        movingObstacles: movingBoxes.filter(b => b.jointId !== j.id),
        pivot: j.pivot,
        isStandClear: makeStandClearChecker(j.id, j.current, res.progress)
      });
      if (target) candidates.push({ ...target, goal, isOpening: goal > 0.5 });
    }

    for (const sw of switches.values()) {
      const tBoxes = [...sw.actuatorParts, ...sw.emissiveParts]
        .map(p => byPartId.get(p.def.id))
        .filter(Boolean);
      if (!tBoxes.length) continue;
      const goal = sw.target >= 0.5 ? 0 : 1;
      const target = computeInteractionTarget({
        kind: 'switch',
        id: sw.def.id,
        label: sw.def.label,
        def: null,
        targetBoxes: tBoxes,
        staticBoxes,
        movingObstacles: movingBoxes
      });
      if (target) candidates.push({ ...target, goal, isOpening: goal > 0.5 });
    }

    const seats = detectSeats(spec, staticBoxes);
    for (const seat of seats) {
      if (personActor.seatedSeat?.id === seat.id) {
        candidates.push({
          kind: 'stand',
          id: `stand:${seat.id}`,
          label: seat.label,
          seat,
          standX: seat.approachX,
          standZ: seat.approachZ,
          faceYaw: seat.faceYaw,
          tx: seat.seatX,
          ty: seat.seatY,
          tz: seat.seatZ,
          reachY: seat.seatY
        });
      } else {
        candidates.push({
          kind: 'sit',
          id: `sit:${seat.id}`,
          label: seat.label,
          seat,
          standX: seat.approachX,
          standZ: seat.approachZ,
          faceYaw: seat.faceYaw,
          tx: seat.seatX,
          ty: seat.seatY,
          tz: seat.seatZ,
          reachY: seat.seatY
        });
      }
    }

    if (!candidates.length && !staticFurnitureBounds.isEmpty()) {
      const b = staticFurnitureBounds;
      const fx = (b.min.x + b.max.x) * 0.5;
      const fy = (b.min.y + b.max.y) * 0.5;
      const fz = (b.min.z + b.max.z) * 0.5;
      for (const [id, sx, sz] of [
        ['inspect:front', fx, b.max.z + 620],
        ['inspect:right', b.max.x + 620, fz],
        ['inspect:left', b.min.x - 620, fz]
      ]) {
        candidates.push({
          kind: 'inspect',
          id,
          label: spec.name,
          tx: fx,
          ty: fy,
          tz: fz,
          standX: sx,
          standZ: sz,
          faceYaw: Math.atan2(fx - sx, fz - sz),
          reachY: fy
        });
      }
    }

    return { candidates, staticBoxes, allBoxes };
  }

  function currentMotionPayload() {
    return {
      walkPhase: personActor.walkPhase,
      walkBlend: personActor.walkBlend,
      sitBlend: personActor.sitBlend,
      seatHeightNorm: personActor.seatHeightNorm,
      reachBlend: personActor.reachBlend,
      reachProgress: personActor.reachProgress,
      reachSide: personActor.reachSide,
      reachHeightNorm: personActor.reachHeightNorm,
      headYaw: personActor.headYaw,
      headPitch: personActor.headPitch,
      idleTime: personActor.idleTime,
      turn: personActor.turn,
      inspect: personActor.inspect
    };
  }

  function syncPersonBoundsFromRoot() {
    if (!person.root.visible) return;
    person.root.updateMatrixWorld(true);
    personBounds.setFromObject(person.root);
    for (let i = 0; i < 8; i++) {
      personCorners[i].set(
        i & 1 ? personBounds.max.x : personBounds.min.x,
        i & 2 ? personBounds.max.y : personBounds.min.y,
        i & 4 ? personBounds.max.z : personBounds.min.z
      );
    }
    shadowBounds.copy(liveFurnitureBounds);
    if (!personBounds.isEmpty()) shadowBounds.union(personBounds);
    lighting.updateShadowBounds(shadowBounds, liveFurnitureBounds, parts, person.root.visible, personBounds);
    updateAoClipBox();
    updateKinematicsPersonObstacle();
  }

  function stepPersonActor(dt) {
    const activeDriver = personActor.running || personActor.directed;
    const needsSettle = personActor.walkBlend > 0.002 || personActor.reachBlend > 0.002;
    if (!activeDriver && !needsSettle) return false;
    if (!person.root.visible) {
      if (activeDriver) {
        personActor.directed = false;
        personActor.queue = [];
        setPersonAutoRun(false);
      }
      return false;
    }

    personActor.idleTime += dt;
    const h = Math.max(900, personGeometry?.height || 1700);

    if (!activeDriver) {
      personActor.walkBlend = Math.max(0, personActor.walkBlend - dt * 6);
      personActor.reachBlend = Math.max(0, personActor.reachBlend - dt * 6);
      personActor.headYaw *= Math.max(0, 1 - dt * 6);
      personActor.headPitch *= Math.max(0, 1 - dt * 6);
      person.setMotion?.(currentMotionPayload());
      syncPersonBoundsFromRoot();
      return personActor.walkBlend > 0.002 || personActor.reachBlend > 0.002;
    }

    const enterWaiting = () => {
      personActor.currentAction = null;
      personActor.phaseTime = 0;
      personActor.turn = null;
      personActor.inspect = null;
      if (personActor.queue.length > 0) {
        personActor.phase = 'queue_wait';
        personActor.waitTimer = personActor.queue[0]?.holdBeforeSec ?? 0.35;
      } else if (personActor.directed && !personActor.running) {
        personActor.directed = false;
        personActor.phase = 'stopped';
        callbacks.onPersonAutoAction?.({ phase: 'directed_done' });
      } else {
        personActor.phase = 'idle_wait';
        personActor.waitTimer = DEFAULT_ACTION_DELAY_MS / 1000;
        callbacks.onPersonAutoAction?.({
          phase: 'waiting',
          nextDelaySec: Math.round(DEFAULT_ACTION_DELAY_MS / 1000)
        });
      }
    };

    const startActionStep = (next, staticBoxes, allBoxes = []) => {
      personActor.currentAction = next;
      personActor.actionFired = false;
      personActor.lastActionId = next.id;
      personActor.phaseTime = 0;
      personActor.turn = null;
      personActor.inspect = null;
      if (personActor.seatedSeat) {
        personActor.phase = 'standing_up';
      } else if (next.kind === 'stand') {
        enterWaiting();
      } else {
        const walkObs = allBoxes.length ? allBoxes : staticBoxes;
        personActor.path = planFloorPath([personActor.posX, personActor.posZ], [next.standX, next.standZ], walkObs);
        personActor.pathIdx = 0;
        const d0 = Math.hypot(next.standX - personActor.posX, next.standZ - personActor.posZ);
        personActor.phase = d0 < 24 ? 'turning' : 'walking';
      }
    };

    if (personActor.phase === 'queue_wait') {
      personActor.walkBlend = Math.max(0, personActor.walkBlend - dt * 5);
      personActor.reachBlend = Math.max(0, personActor.reachBlend - dt * 5);
      personActor.waitTimer -= dt;
      if (personActor.waitTimer <= 0) {
        const next = personActor.queue.shift();
        if (!next) {
          enterWaiting();
        } else {
          const allBoxes = collectWorldPartBoxes();
          const staticBoxes = allBoxes.filter(b => !b.jointId);
          const movingBoxes = allBoxes.filter(b => b.jointId);
          // Recompute stand target against live door geometry when closing or opening a queued joint.
          if (next.kind === 'joint') {
            const j = joints.get(next.id);
            const tBoxes = movingBoxes.filter(b => b.jointId === next.id);
            if (j && tBoxes.length) {
              const refreshed = computeInteractionTarget({
                kind: 'joint',
                id: j.id,
                label: j.label,
                def: j.def,
                targetBoxes: tBoxes,
                staticBoxes,
                movingObstacles: movingBoxes.filter(b => b.jointId !== j.id),
                pivot: j.pivot,
                isStandClear: makeStandClearChecker(j.id, j.current, next.goal)
              });
              if (refreshed) Object.assign(next, refreshed);
            }
          }
          startActionStep(next, staticBoxes, allBoxes);
        }
      }
    } else if (personActor.phase === 'idle_wait') {
      personActor.walkBlend = Math.max(0, personActor.walkBlend - dt * 5);
      personActor.reachBlend = Math.max(0, personActor.reachBlend - dt * 5);
      personActor.waitTimer -= dt;
      if (personActor.waitTimer <= 0) {
        const { candidates, staticBoxes, allBoxes } = buildPersonCandidates();
        const next = pickNextPersonAction({
          candidates,
          lastActionId: personActor.lastActionId,
          isSeated: Boolean(personActor.seatedSeat)
        });
        if (!next) {
          personActor.waitTimer = DEFAULT_ACTION_DELAY_MS / 1000;
        } else {
          if (next.kind === 'joint' && next.goal > 0.5) {
            personActor.queue.push({
              ...next,
              goal: 0,
              isOpening: false,
              holdBeforeSec: AUTO_CLOSE_HOLD_SEC
            });
          }
          startActionStep(next, staticBoxes, allBoxes);
        }
      }
    } else if (personActor.phase === 'standing_up') {
      const seat = personActor.seatedSeat;
      if (!seat) {
        personActor.phase = 'walking';
      } else {
        const dur = 0.65;
        personActor.phaseTime = Math.min(dur, personActor.phaseTime + dt);
        const u = personActor.phaseTime / dur;
        const smooth = u * u * (3 - 2 * u);
        personActor.sitBlend = 1 - smooth;
        personActor.posX = seat.seatX + (seat.approachX - seat.seatX) * smooth;
        personActor.posZ = seat.seatZ + (seat.approachZ - seat.seatZ) * smooth;
        personActor.hasMoved = true;
        if (personActor.phaseTime >= dur) {
          personActor.sitBlend = 0;
          personActor.seatHeightNorm = 0;
          personActor.seatedSeat = null;
          callbacks.onPersonAutoAction?.({
            phase: 'action',
            actionType: 'stand',
            id: seat.id,
            label: seat.label
          });
          if (personActor.currentAction?.kind === 'stand') {
            enterWaiting();
          } else {
            const { staticBoxes, allBoxes } = buildPersonCandidates();
            const walkObs = allBoxes.length ? allBoxes : staticBoxes;
            personActor.path = planFloorPath(
              [personActor.posX, personActor.posZ],
              [personActor.currentAction.standX, personActor.currentAction.standZ],
              walkObs
            );
            personActor.pathIdx = 0;
            personActor.phase = 'walking';
            personActor.phaseTime = 0;
          }
        }
      }
    } else if (personActor.phase === 'walking') {
      const wp = personActor.path[personActor.pathIdx];
      if (!wp) {
        personActor.phase = 'turning';
        personActor.phaseTime = 0;
      } else {
        const dx = wp[0] - personActor.posX;
        const dz = wp[1] - personActor.posZ;
        const dist = Math.hypot(dx, dz);
        if (dist < 18) {
          personActor.pathIdx++;
          if (personActor.pathIdx >= personActor.path.length) {
            personActor.phase = 'turning';
            personActor.phaseTime = 0;
          }
        } else {
          const lastWaypoint = personActor.pathIdx === personActor.path.length - 1;
          const speed = Math.min(h * .70, Math.max(180, 180 + personActor.walkBlend * h * .62),
            lastWaypoint ? 200 + dist * 3.8 : Infinity);
          const step = Math.min(dist, speed * dt);
          const nextX = personActor.posX + (dx / dist) * step;
          const nextZ = personActor.posZ + (dz / dist) * step;
          const liveBoxes = collectWorldPartBoxes();
          const clamped = clampPersonOutsideObstacles(nextX, nextZ, liveBoxes, 165);
          personActor.posX = clamped.x;
          personActor.posZ = clamped.z;
          personActor.hasMoved = true;
          if (Math.hypot(clamped.x - nextX, clamped.z - nextZ) > 2 && personActor.currentAction) {
            const replanned = planFloorPath(
              [personActor.posX, personActor.posZ],
              [personActor.currentAction.standX, personActor.currentAction.standZ],
              liveBoxes
            );
            if (replanned?.length) {
              personActor.path = replanned;
              personActor.pathIdx = 0;
            }
          }
          const heading = Math.atan2(dx, dz);
          personActor.yaw = lerpAngle(personActor.yaw, heading, Math.min(1, dt * 8));
          personActor.walkPhase = (personActor.walkPhase + step / (h * person.walkTravel) * Math.PI * 2) % (Math.PI * 2);
          personActor.walkBlend = Math.min(1, personActor.walkBlend + dt * 4);
          if (personActor.currentAction) {
            const aimYaw = Math.atan2(personActor.currentAction.tx - personActor.posX, personActor.currentAction.tz - personActor.posZ);
            personActor.headYaw = clamp(wrapAngle(aimYaw - personActor.yaw), -0.55, 0.55);
            personActor.headPitch = clamp((personActor.currentAction.ty - h * 0.85) / 1500, -0.3, 0.25);
          }
        }
      }
    } else if (personActor.phase === 'turning') {
      personActor.walkBlend = Math.max(0, personActor.walkBlend - dt * 6);
      const act = personActor.currentAction;
      if (!act) {
        enterWaiting();
      } else {
        const turn = personActor.turn ??= {
          start: personActor.yaw, angle: wrapAngle(act.faceYaw - personActor.yaw), progress: 0
        };
        const duration = Math.min(1.6, .32 + Math.abs(turn.angle) * .48);
        personActor.phaseTime += dt;
        turn.progress = Math.min(1, personActor.phaseTime / duration);
        personActor.yaw = turn.start + turn.angle * person.turnProgress(turn.angle, turn.progress);
        personActor.headYaw *= Math.exp(-dt * 8);
        personActor.headPitch = clamp((act.ty - h * 0.85) / 1400, -0.35, 0.3);
        if (turn.progress === 1) {
          personActor.yaw = act.faceYaw;
          personActor.headYaw = 0;
          personActor.turn = null;
          personActor.phase = 'acting';
          personActor.phaseTime = 0;
          personActor.actionFired = false;
          const lx = (act.tx - personActor.posX) * Math.cos(personActor.yaw) - (act.tz - personActor.posZ) * Math.sin(personActor.yaw);
          personActor.reachSide = lx >= 0 ? 1 : -1;
          personActor.reachHeightNorm = (act.reachY ?? h * 0.55) / h;
        }
      }
    } else if (personActor.phase === 'acting') {
      const act = personActor.currentAction;
      if (!act) {
        enterWaiting();
      } else {
        personActor.walkBlend = Math.max(0, personActor.walkBlend - dt * 8);
        personActor.phaseTime += dt;
        if (act.kind === 'sit') {
          const seat = act.seat;
          const dur = 0.9;
          const u = clamp(personActor.phaseTime / dur, 0, 1);
          const smooth = u * u * (3 - 2 * u);
          personActor.posX = seat.approachX + (seat.seatX - seat.approachX) * smooth;
          personActor.posZ = seat.approachZ + (seat.seatZ - seat.approachZ) * smooth;
          personActor.yaw = lerpAngle(personActor.yaw, seat.faceYaw, Math.min(1, dt * 8));
          personActor.sitBlend = smooth;
          personActor.seatHeightNorm = seat.seatY / h;
          personActor.hasMoved = true;
          if (personActor.phaseTime >= 0.45 && !personActor.actionFired) {
            personActor.actionFired = true;
            personActor.seatedSeat = seat;
            callbacks.onPersonAutoAction?.({
              phase: 'action',
              actionType: 'sit',
              id: seat.id,
              label: act.label
            });
          }
          if (personActor.phaseTime >= dur) enterWaiting();
        } else if (act.kind === 'joint' || act.kind === 'switch') {
          const dur = 1.5;
          personActor.reachProgress = clamp(personActor.phaseTime / dur, 0, 1);
          personActor.reachBlend = 1;
          if (personActor.reachProgress >= .34 && !personActor.actionFired) {
            personActor.actionFired = true;
            if (act.kind === 'joint') {
              const targetJoint = joints.get(act.id);
              if (targetJoint) {
                targetJoint.target = act.goal;
                if (act.goal > 0.45) armJointAutoClose(act.id);
                else clearJointAutoClose(act.id);
              }
            }
            callbacks.onPersonAutoAction?.({
              phase: 'action',
              actionType: act.kind,
              id: act.id,
              label: act.label,
              goal: act.goal,
              isOpening: act.isOpening
            });
          }
          if (personActor.phaseTime >= dur) {
            personActor.reachBlend = 0;
            enterWaiting();
          }
        } else if (act.kind === 'walk') {
          if (!personActor.actionFired) {
            personActor.actionFired = true;
            callbacks.onPersonAutoAction?.({
              phase: 'action',
              actionType: 'walk',
              id: act.id,
              label: act.label
            });
          }
          if (personActor.phaseTime >= 0.35) enterWaiting();
        } else {
          const dur = 1.8;
          personActor.inspect = clamp(personActor.phaseTime / dur, 0, 1);
          if (personActor.phaseTime >= 0.35 && !personActor.actionFired) {
            personActor.actionFired = true;
            callbacks.onPersonAutoAction?.({
              phase: 'action',
              actionType: 'inspect',
              id: act.id,
              label: act.label
            });
          }
          if (personActor.phaseTime >= dur) enterWaiting();
        }
      }
    }

    person.root.position.set(personActor.posX, 0, personActor.posZ);
    person.root.rotation.y = personActor.yaw;
    person.setMotion?.(currentMotionPayload());
    syncPersonBoundsFromRoot();
    return true;
  }

  function setPersonAutoRun(run, { waitFirst = false } = {}) {
    const next = Boolean(run);
    if (next) {
      personActor.posX = person.root.position.x;
      personActor.posZ = person.root.position.z;
      personActor.yaw = person.root.rotation.y;
      if (personGeometry?.pose !== 'seated') {
        personActor.sitBlend = 0;
        personActor.seatHeightNorm = 0;
        personActor.seatedSeat = null;
      } else {
        personActor.sitBlend = 1;
      }
      personActor.running = true;
      personActor.phase = 'idle_wait';
      personActor.waitTimer = waitFirst ? DEFAULT_ACTION_DELAY_MS / 1000 : 0.25;
      personActor.phaseTime = 0;
      personActor.currentAction = null;
      if (waitFirst) callbacks.onPersonAutoAction?.({ phase: 'waiting', nextDelaySec: personActor.waitTimer });
      schedule();
    } else {
      personActor.running = false;
      personActor.directed = false;
      personActor.queue = [];
      personActor.phase = 'stopped';
      personActor.currentAction = null;
      personActor.turn = null;
      personActor.inspect = null;
      callbacks.onPersonAutoAction?.({ phase: 'stopped' });
      schedule();
    }
  }

  function resetPersonPosition(start = null) {
    personActor.running = false;
    personActor.directed = false;
    personActor.queue = [];
    personActor.hasMoved = Boolean(start);
    if (start) {
      personActor.posX = start.x;
      personActor.posZ = start.z;
      personActor.yaw = rad(start.yaw);
      personActor.idleTime = 0;
      personActor.walkPhase = 0;
    }
    personActor.phase = 'stopped';
    personActor.currentAction = null;
    personActor.turn = null;
    personActor.inspect = null;
    personActor.seatedSeat = null;
    personActor.walkBlend = 0;
    personActor.reachBlend = 0;
    personActor.sitBlend = personGeometry?.pose === 'seated' ? 1 : 0;
    personActor.seatHeightNorm = 0;
    person.setMotion?.(null);
    if (personGeometry) updateLayout(personGeometry);
    schedule();
  }

  function commandPerson(cmd) {
    if (!cmd || !ready) return false;
    if (!personActor.hasMoved && !personActor.running && !personActor.directed) {
      personActor.posX = person.root.position.x;
      personActor.posZ = person.root.position.z;
      personActor.yaw = person.root.rotation.y;
    }
    if (personGeometry?.pose === 'seated' && personActor.sitBlend < 0.5) {
      personActor.sitBlend = 1;
    }

    const allBoxes = collectWorldPartBoxes();
    const staticBoxes = allBoxes.filter(b => !b.jointId);
    const movingBoxes = allBoxes.filter(b => b.jointId);
    const byJoint = new Map();
    for (const b of movingBoxes) {
      const arr = byJoint.get(b.jointId) || [];
      arr.push(b);
      byJoint.set(b.jointId, arr);
    }
    const byPartId = new Map(allBoxes.map(b => [b.id, b]));
    const steps = [];

    if (cmd.kind === 'joint') {
      const j = joints.get(cmd.id);
      const tBoxes = j ? byJoint.get(j.id) : null;
      if (!j || !tBoxes?.length) return false;
      const goal = cmd.goal !== undefined ? cmd.goal : (j.current > 0.45 ? 0 : 1);
      const posMap = liveJointPositions();
      const res = kinematics.resolveJointMotion(j.id, j.current, goal, posMap, { ignorePerson: true });
      const needsUnblock = res.blocked && res.blocker?.jointId && res.blocker.jointId !== j.id && Math.abs(res.progress - j.current) < 0.55;
      const blockerJ = needsUnblock ? joints.get(res.blocker.jointId) : null;
      const blockerBoxes = blockerJ ? byJoint.get(blockerJ.id) : null;

      if (blockerJ && blockerBoxes?.length) {
        const blockerGoal = blockerJ.current > 0.45 ? 0 : 1;
        const bRes = kinematics.resolveJointMotion(blockerJ.id, blockerJ.current, blockerGoal, posMap, { ignorePerson: true });
        if (Math.abs(bRes.progress - blockerJ.current) > 0.12) {
          const blockerTarget = computeInteractionTarget({
            kind: 'joint',
            id: blockerJ.id,
            label: blockerJ.label,
            def: blockerJ.def,
            targetBoxes: blockerBoxes,
            staticBoxes,
            movingObstacles: movingBoxes.filter(b => b.jointId !== blockerJ.id),
            pivot: blockerJ.pivot,
            isStandClear: makeStandClearChecker(blockerJ.id, blockerJ.current, bRes.progress)
          });
          if (blockerTarget) steps.push({ ...blockerTarget, goal: blockerGoal, isOpening: blockerGoal > 0.5 });
        }
      }

      const mainTarget = computeInteractionTarget({
        kind: 'joint',
        id: j.id,
        label: j.label,
        def: j.def,
        targetBoxes: tBoxes,
        staticBoxes,
        movingObstacles: movingBoxes.filter(b => b.jointId !== j.id),
        pivot: j.pivot,
        isStandClear: makeStandClearChecker(j.id, j.current, needsUnblock ? goal : res.progress)
      });
      if (!mainTarget) return false;
      steps.push({ ...mainTarget, goal, isOpening: goal > 0.5 });

      if (cmd.autoClose !== false && goal > 0.5) {
        steps.push({
          ...mainTarget,
          goal: 0,
          isOpening: false,
          holdBeforeSec: AUTO_CLOSE_HOLD_SEC
        });
        if (steps[0]?.id && steps[0].id !== j.id && steps[0].goal > 0.5) {
          steps.push({
            ...steps[0],
            goal: 0,
            isOpening: false,
            holdBeforeSec: 0.45
          });
        }
      }
    } else if (cmd.kind === 'switch') {
      const sw = switches.get(cmd.id);
      if (!sw) return false;
      const tBoxes = [...sw.actuatorParts, ...sw.emissiveParts].map(p => byPartId.get(p.def.id)).filter(Boolean);
      if (!tBoxes.length) return false;
      const goal = cmd.goal !== undefined ? cmd.goal : (sw.target >= 0.5 ? 0 : 1);
      const target = computeInteractionTarget({
        kind: 'switch',
        id: sw.def.id,
        label: sw.def.label,
        def: null,
        targetBoxes: tBoxes,
        staticBoxes,
        movingObstacles: movingBoxes
      });
      if (!target) return false;
      steps.push({ ...target, goal, isOpening: goal > 0.5 });
    } else if (cmd.kind === 'sit') {
      const seats = detectSeats(spec, staticBoxes);
      const seat = (cmd.seatId ? seats.find(s => s.id === cmd.seatId) : null) || seats[0];
      if (!seat) return false;
      steps.push({
        kind: 'sit',
        id: `sit:${seat.id}`,
        label: seat.label,
        seat,
        standX: seat.approachX,
        standZ: seat.approachZ,
        faceYaw: seat.faceYaw,
        tx: seat.seatX,
        ty: seat.seatY,
        tz: seat.seatZ,
        reachY: seat.seatY
      });
    } else if (cmd.kind === 'stand') {
      if (!personActor.seatedSeat) return false;
      steps.push({
        kind: 'stand',
        id: `stand:${personActor.seatedSeat.id}`,
        label: personActor.seatedSeat.label,
        seat: personActor.seatedSeat,
        standX: personActor.seatedSeat.approachX,
        standZ: personActor.seatedSeat.approachZ,
        faceYaw: personActor.seatedSeat.faceYaw,
        tx: personActor.seatedSeat.seatX,
        ty: personActor.seatedSeat.seatY,
        tz: personActor.seatedSeat.seatZ,
        reachY: personActor.seatedSeat.seatY
      });
    } else if (cmd.kind === 'walk') {
      if (cmd.partId) {
        const box = byPartId.get(cmd.partId);
        if (!box) return false;
        const target = computeInteractionTarget({
          kind: 'part',
          id: cmd.partId,
          label: cmd.label || spec.name,
          def: null,
          targetBoxes: [box],
          staticBoxes,
          movingObstacles: movingBoxes
        });
        if (!target) return false;
        steps.push({ ...target, kind: cmd.inspect ? 'inspect' : 'walk' });
      } else if (Array.isArray(cmd.targetPoint)) {
        const pt = resolveWalkStandPoint(cmd.targetPoint, allBoxes, staticFurnitureBounds);
        const fx = staticFurnitureBounds.isEmpty() ? pt.standX : (staticFurnitureBounds.min.x + staticFurnitureBounds.max.x) * 0.5;
        const fy = staticFurnitureBounds.isEmpty() ? 900 : (staticFurnitureBounds.min.y + staticFurnitureBounds.max.y) * 0.5;
        const fz = staticFurnitureBounds.isEmpty() ? pt.standZ + 500 : (staticFurnitureBounds.min.z + staticFurnitureBounds.max.z) * 0.5;
        steps.push({
          kind: cmd.inspect ? 'inspect' : 'walk',
          id: `walk:${Math.round(pt.standX)}:${Math.round(pt.standZ)}`,
          label: cmd.label || spec.name,
          tx: fx,
          ty: fy,
          tz: fz,
          standX: pt.standX,
          standZ: pt.standZ,
          faceYaw: pt.faceYaw,
          reachY: fy
        });
      }
    }

    if (!steps.length) return false;
    const first = steps.shift();
    personActor.queue = steps;
    personActor.directed = true;
    personActor.currentAction = first;
    personActor.actionFired = false;
    personActor.phaseTime = 0;
    personActor.turn = null;
    personActor.inspect = null;
    if (personActor.seatedSeat) {
      personActor.phase = 'standing_up';
    } else if (first.kind === 'stand') {
      personActor.phase = 'stopped';
      personActor.directed = false;
    } else {
      personActor.path = planFloorPath([personActor.posX, personActor.posZ], [first.standX, first.standZ], allBoxes);
      personActor.pathIdx = 0;
      const d0 = Math.hypot(first.standX - personActor.posX, first.standZ - personActor.posZ);
      personActor.phase = d0 < 24 ? 'turning' : 'walking';
    }
    schedule();
    return true;
  }

  function stepAnimations(now, dt) {
    let active = false;
    let cornersNeedUpdate = false;

    if (stepPersonActor(dt)) active = true;

    if (jointAutoCloseTimers.size > 0) {
      const posMap = liveJointPositions();
      const synced = {};
      for (const [jId, rem] of [...jointAutoCloseTimers.entries()]) {
        const j = joints.get(jId);
        if (!j || (j.target <= 0.05 && j.current <= 0.05)) {
          jointAutoCloseTimers.delete(jId);
          continue;
        }
        const personBusyWithJoint =
          personActor.currentAction?.id === jId ||
          personActor.queue.some(q => q.id === jId);
        if (personBusyWithJoint) {
          active = true;
          continue;
        }
        const nextRem = rem - dt;
        if (nextRem > 0) {
          jointAutoCloseTimers.set(jId, nextRem);
          active = true;
        } else {
          const res = kinematics.resolveJointMotion(jId, j.current, 0, posMap);
          if (res.blocked && res.progress > 0.08) {
            // Wait for internal drawer or person in doorway to clear, then retry.
            jointAutoCloseTimers.set(jId, 1.5);
            active = true;
          } else {
            j.target = 0;
            posMap[jId] = 0;
            jointAutoCloseTimers.delete(jId);
            synced[jId] = 0;
            active = true;
          }
        }
      }
      if (Object.keys(synced).length > 0) {
        callbacks.onJointSync?.(synced);
      }
    }

    const phys = stepPhysicsSubstep(kinematics, joints, dt);
    if (phys.moved) {
      for (const j of joints.values()) applyJointTransform(j, j.current);
      cornersNeedUpdate = true;
    }
    if (phys.collisions.length) {
      for (const col of phys.collisions) {
        triggerBlockerFlash(col);
        callbacks.onJointBlocked?.(col);
      }
    }
    if (phys.animating) active = true;

    for (const part of parts) {
      if (part.contactFlash > 0) {
        if (now >= part.contactFlash) {
          part.contactFlash = 0;
          syncPartEmissive(part, now);
        } else {
          active = true;
        }
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
      projectionDirty = true;
      if (t >= 1) camAnim = null;
      else active = true;
    }

    if (Math.abs(zoomFactorPending - 1) > 0.0005) {
      const alpha = reducedMotion ? 1 : Math.min(1, dt * 16);
      const step = Math.pow(zoomFactorPending, alpha);
      applyZoomStep(step);
      zoomFactorPending /= step;
      if (Math.abs(zoomFactorPending - 1) <= 0.0005) {
        applyZoomStep(zoomFactorPending);
        zoomFactorPending = 1;
      } else {
        active = true;
      }
    }

    if (cornersNeedUpdate) {
      updatePartLiveCorners();
      projectionDirty = true;
    }
    return active;
  }

  function render(now = performance.now()) {
    raf = 0;
    if (!ready || !width || !height) return;
    const dt = lastFrameTime ? clamp((now - lastFrameTime) / 1000, 0.001, 0.05) : 1 / 60;
    lastFrameTime = now;
    const animating = stepAnimations(now, dt);
    const damped = orbit.enableDamping ? orbit.update() : false;
    if (projectionDirty) fitProjection();
    if (composer && aoEnabled && !xrayEnabled && !accessibilityEnabled) composer.render();
    else renderer.render(scene, activeCam);
    if (animating || damped) schedule();
    else lastFrameTime = 0;
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
      if (composer) {
        composer.setPixelRatio(renderer.getPixelRatio());
        composer.setSize(w, h);
      }
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
  orbit.addEventListener('start', () => { camAnim = null; zoomFactorPending = 1; });
  new ResizeObserver(resize).observe(container);
  resize();

  function positionPart(anchor, center, joint) {
    anchor.position.fromArray(center);
    if (joint) { const p = joint.pivot; anchor.position.x -= p[0]; anchor.position.y -= p[1]; anchor.position.z -= p[2]; }
  }

  function applyCoplanarOffsetMitigation() {
    const boxes = [];
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      part.visual.traverse(obj => {
        if (!obj.isMesh || !obj.material) return;
        obj.material.polygonOffset = false;
        obj.material.polygonOffsetFactor = 0;
        obj.material.polygonOffsetUnits = 0;
      });
      if (!part.anchor.visible) continue;
      let minX = Infinity, minY = Infinity, minZ = Infinity;
      let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
      for (const v of part.points) {
        if (v.x < minX) minX = v.x;
        if (v.x > maxX) maxX = v.x;
        if (v.y < minY) minY = v.y;
        if (v.y > maxY) maxY = v.y;
        if (v.z < minZ) minZ = v.z;
        if (v.z > maxZ) maxZ = v.z;
      }
      const vol = Math.max(1, (maxX - minX) * (maxY - minY) * (maxZ - minZ));
      boxes.push({ idx: i, part, minX, maxX, minY, maxY, minZ, maxZ, vol });
    }
    const tiers = new Map();
    for (let i = 0; i < boxes.length; i++) {
      const A = boxes[i];
      for (let j = i + 1; j < boxes.length; j++) {
        const B = boxes[j];
        const ox = Math.min(A.maxX, B.maxX) - Math.max(A.minX, B.minX);
        const oy = Math.min(A.maxY, B.maxY) - Math.max(A.minY, B.minY);
        const oz = Math.min(A.maxZ, B.maxZ) - Math.max(A.minZ, B.minZ);
        if (ox <= 0.25 || oy <= 0.25 || oz <= 0.25) continue;
        const coplanar =
          Math.abs(A.minX - B.minX) < 0.5 || Math.abs(A.maxX - B.maxX) < 0.5 ||
          Math.abs(A.minY - B.minY) < 0.5 || Math.abs(A.maxY - B.maxY) < 0.5 ||
          Math.abs(A.minZ - B.minZ) < 0.5 || Math.abs(A.maxZ - B.maxZ) < 0.5;
        if (!coplanar) continue;
        const target = A.vol <= B.vol ? A.part : B.part;
        const nextTier = (tiers.get(target) ?? 0) + 1;
        tiers.set(target, nextTier);
        target.visual.traverse(obj => {
          if (!obj.isMesh || !obj.material) return;
          obj.material.polygonOffset = true;
          obj.material.polygonOffsetFactor = -(nextTier * 0.75);
          obj.material.polygonOffsetUnits = -(nextTier * 1.5);
        });
      }
    }
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
      if (!personActor.running && !personActor.directed && !personActor.hasMoved) {
        person.root.position.set(0, 0, 0);
        personBounds.setFromObject(person.root);
        const gap = p.height * 0.09;
        const offset = p.side === 'right' ? staticBounds.max.x + gap - personBounds.min.x : staticBounds.min.x - gap - personBounds.max.x;
        person.root.position.x = offset;
        personActor.posX = offset;
        personActor.posZ = 0;
        personActor.yaw = person.root.rotation.y;
        personBounds.min.x += offset; personBounds.max.x += offset;
        staticBounds.union(personBounds);
      } else {
        person.root.position.set(personActor.posX, 0, personActor.posZ);
        person.root.rotation.y = personActor.yaw;
        person.root.updateMatrixWorld(true);
        personBounds.setFromObject(person.root);
      }
      for (let i = 0; i < 8; i++) personCorners[i].set(
        i & 1 ? personBounds.max.x : personBounds.min.x,
        i & 2 ? personBounds.max.y : personBounds.min.y,
        i & 4 ? personBounds.max.z : personBounds.min.z
      );
    }
    updateKinematicsPersonObstacle();

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
    applyCoplanarOffsetMitigation();
    room.fit(staticFurnitureBounds, personBounds, p.visible);
    projectionDirty = true;
  }

  function update(state, { animate = false, restoreJoints = false } = {}) {
    const now = performance.now();
    const d = state.dimensions, resized = !dims || dims.width !== d.width || dims.height !== d.height || dims.depth !== d.depth;
    let layout = resized || showGuides !== state.showDimensions;
    if (layout) { dims = { ...d }; showGuides = state.showDimensions; guides.set(showGuides, d); }
    if (xrayEnabled) applyXrayState(false);
    if (accessibilityEnabled) {
      for (const part of parts) {
        clearPartAccessWire(part.visual);
        part.visual.traverse(obj => {
          if (obj.isMesh && obj.userData.origAccessMat) {
            obj.material = obj.userData.origAccessMat;
            delete obj.userData.origAccessMat;
          }
        });
      }
    }
    finishes.update(state.finishes);

    let optionChanged = false;
    if (!optionsCache) optionChanged = true;
    else {
      for (const k of Object.keys(state.options)) if (optionsCache[k] !== state.options[k]) { optionChanged = true; break; }
    }
    if (resized || optionChanged) {
      optionsCache = { ...state.options };
      kinematics.setDimensionsAndOptions(d, state.options);
    }

    for (const p of parts) {
      if (resized) {
        const center = resolveVec(p.def.center, d);
        p.closedCenter = center;
        positionPart(p.anchor, center, p.joint ?? null);
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
    if (xrayEnabled || accessibilityEnabled) applyXrayState(true);
    applyAccessibilityState();

    let jointImmediate = false;
    for (const j of joints.values()) {
      if (resized) j.pivot = resolveVec(j.def.pivot, d);
    }
    for (const p of parts) {
      if (resized && p.joint) positionPart(p.anchor, p.closedCenter, p.joint);
    }

    if (!restoreJoints && (resized || optionChanged) && ready) {
      const adjusted = kinematics.resolveAllOverlaps(liveJointPositions());
      const adjKeys = Object.keys(adjusted);
      if (adjKeys.length) {
        for (const id of adjKeys) {
          const j = joints.get(id);
          j.current = j.target = adjusted[id];
          j.velocity = 0;
          applyJointTransform(j, j.current);
          jointImmediate = true;
        }
        callbacks.onJointSync?.(adjusted);
      }
    }

    const posMap = liveJointPositions();
    if (restoreJoints) jointAutoCloseTimers.clear();
    for (const j of joints.values()) {
      const requested = state.joints[j.id];
      if (!j.initialized || restoreJoints || !animate || reducedMotion) {
        if (!j.initialized || restoreJoints) {
          j.current = j.target = requested;
          j.velocity = 0;
          j.initialized = true;
          applyJointTransform(j, j.current);
          posMap[j.id] = j.current;
          jointImmediate = true;
        } else if (resized || Math.abs(j.current - requested) > 1e-6) {
          const res = kinematics.resolveJointMotion(j.id, j.current, requested, posMap);
          j.current = j.target = res.progress;
          j.velocity = 0;
          posMap[j.id] = res.progress;
          applyJointTransform(j, j.current);
          jointImmediate = true;
          if (res.blocked) {
            const col = {
              id: j.id,
              label: j.label,
              blockerLabel: res.blocker.label,
              blockerJointId: res.blocker.jointId,
              blockerPartId: res.blocker.partId,
              progress: res.progress
            };
            triggerBlockerFlash(col);
            callbacks.onJointBlocked?.(col);
          }
        }
      } else {
        j.target = requested;
        if (requested > 0.45) armJointAutoClose(j.id);
        else clearJointAutoClose(j.id);
      }
    }

    for (const sw of switches.values()) {
      const target = state.switches?.[sw.def.id] ? 1 : 0;
      if (resized && sw.light) {
        positionPart(sw.light, resolveVec(sw.def.light.center, d), sw.joint);
        renderer.shadowMap.needsUpdate = true;
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

    const actorActive = personActor.running || personActor.directed;
    const personState = state.person, prior = personGeometry;
    if (prior && prior.side !== personState.side && !actorActive) {
      personActor.hasMoved = false;
    }
    if (prior && prior.pose !== personState.pose && !actorActive) {
      personActor.sitBlend = personState.pose === 'seated' ? 1 : 0;
      personActor.seatHeightNorm = 0;
      personActor.seatedSeat = null;
    }
    const poseOrYawChanged = !actorActive && (prior?.pose !== personState.pose || prior?.yaw !== personState.yaw);
    if (!prior || prior.visible !== personState.visible || (personState.visible &&
      (prior.height !== personState.height || prior.build !== personState.build || prior.side !== personState.side || poseOrYawChanged))) {
      personGeometry = { ...personState };
      layout = true;
    } else if (actorActive) {
      personGeometry = { ...personState };
    }
    person.update(personState);
    if (actorActive || personActor.hasMoved) {
      person.root.position.set(personActor.posX, 0, personActor.posZ);
      person.root.rotation.y = personActor.yaw;
      person.setMotion?.(currentMotionPayload());
    }

    if (layout) updateLayout(personState);
    else if (jointImmediate) { updatePartLiveCorners(); projectionDirty = true; }
    updateKinematicsPersonObstacle();
    ready = true;
    schedule();
  }

  function view(name, { yaw = 0, immediate = false } = {}) {
    const toDir = vector();
    if (name === 'studio') toDir.copy(studioDirection);
    else if (name === 'front') toDir.set(0, 0, 1);
    else if (name === 'side') toDir.set(1, 0, 0);
    else if (name === 'top') toDir.set(0, 1, 0.0001).normalize();
    else if (name === 'back') toDir.set(0, 0, -1);
    else throw new Error(`Unknown camera view: ${name}`);
    if (yaw) toDir.applyAxisAngle(up.set(0, 1, 0), rad(yaw));

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

    if (immediate || reducedMotion || !ready) {
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
    queueZoom(factor);
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
    zoomFactorPending = 1;
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
    if (renderPass) renderPass.camera = activeCam;
    if (gtaoPass) {
      gtaoPass.camera = activeCam;
      const isPersp = activeCam.isPerspectiveCamera ? 1 : 0;
      if (gtaoPass.gtaoMaterial.defines.PERSPECTIVE_CAMERA !== isPersp) {
        gtaoPass.gtaoMaterial.defines.PERSPECTIVE_CAMERA = isPersp;
        gtaoPass.gtaoMaterial.needsUpdate = true;
      }
    }
    orbit.object = activeCam;
    orbit.update();
    cameraChanged();
  }

  function setLighting(name) {
    lighting.setPreset(name);
    refreshSwitches();
    schedule();
  }

  function setBackdrop(mode) {
    backdropMode = mode === 'room' ? 'room' : 'studio';
    const isRoom = backdropMode === 'room';
    room.setVisible(isRoom);
    lighting.setFloorVisible(!isRoom);
    updateAoClipBox();
    renderer.shadowMap.needsUpdate = true;
    schedule();
  }

  function setRoomStyle(style) {
    room.setStyle(style);
    schedule();
  }

  function setXray(enabled) {
    xrayEnabled = Boolean(enabled);
    applyXrayState(xrayEnabled || accessibilityEnabled);
    renderer.shadowMap.needsUpdate = true;
    schedule();
  }

  function setAccessibility(enabled) {
    accessibilityEnabled = Boolean(enabled);
    applyXrayState(xrayEnabled || accessibilityEnabled);
    applyAccessibilityState();
    renderer.shadowMap.needsUpdate = true;
    schedule();
  }

  function setLedTemp(tempId) {
    if (!LED_TEMPS[tempId]) return;
    ledTempId = tempId;
    refreshSwitches();
    schedule();
  }

  function setAO(enabled) {
    aoEnabled = Boolean(enabled);
    schedule();
  }

  function setHotspots(visible) {
    hotspotsEnabled = Boolean(visible);
    updateHotspots();
  }

  // Smooth cross-browser two-finger trackpad zoom (pinch + vertical two-finger scroll + Safari gestures).
  container.addEventListener('wheel', e => {
    if (!ready) return;
    e.preventDefault();
    e.stopPropagation();
    let dy = e.deltaY;
    if (e.deltaMode === 1) dy *= 16;
    else if (e.deltaMode === 2) dy *= 100;
    if (!e.ctrlKey && Math.abs(e.deltaX) > Math.abs(dy) * 2 && Math.abs(dy) < 0.5) return;
    if (Math.abs(dy) < 0.01) return;
    const factor = e.ctrlKey
      ? Math.exp(-clamp(dy, -120, 120) * 0.012)
      : Math.exp(-clamp(dy, -200, 200) * 0.0018);
    queueZoom(factor);
  }, { passive: false, capture: true });

  let gestureScale = 1;
  container.addEventListener('gesturestart', e => {
    e.preventDefault();
    gestureScale = e.scale || 1;
  }, { passive: false });
  container.addEventListener('gesturechange', e => {
    e.preventDefault();
    const next = e.scale || 1;
    if (gestureScale > 0 && next > 0) queueZoom(next / gestureScale);
    gestureScale = next;
  }, { passive: false });
  container.addEventListener('gestureend', e => {
    e.preventDefault();
    gestureScale = 1;
  }, { passive: false });

  // Pointer interaction: raycast click vs orbit drag + fine hover feedback + multi-touch safety.
  const raycaster = new T.Raycaster();
  const pointer = new T.Vector2();
  const floorPlane = new T.Plane(new T.Vector3(0, 1, 0), 0);
  const floorHitPoint = new T.Vector3();
  const activePointers = new Set();
  let pointerDown = null;
  let rightDown = null;

  function pickInteractive(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, activeCam);
    const hits = raycaster.intersectObjects(interactiveMeshes, false);
    const visibleHits = [];
    for (const hit of hits) {
      let visible = true;
      for (let o = hit.object; o; o = o.parent) { if (!o.visible) { visible = false; break; } }
      if (visible && hit.object.userData.interactive) visibleHits.push(hit.object);
    }
    if (!visibleHits.length) return null;
    if (xrayEnabled || accessibilityEnabled) {
      const inner = visibleHits.find(obj => !isXrayFront(obj.userData.part));
      if (inner) return inner;
    }
    return visibleHits[0];
  }

  let activeHoverKey = null;

  function setHoverHit(hit, clientX = 0, clientY = 0) {
    const action = hit ? hit.userData.interactive : null;
    const partObj = hit?.userData.part ?? null;
    const slotId = partObj?.def.slot ?? null;
    const partId = partObj?.def.id ?? null;
    const key = action ? `${action.type}:${action.id ?? ''}:${partId ?? ''}` : null;

    if (key !== activeHoverKey) {
      activeHoverKey = key;
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
      schedule();
    }

    if (!action) {
      callbacks.onHover?.(null);
      return;
    }
    const rect = container.getBoundingClientRect();
    callbacks.onHover?.({
      action,
      slotId,
      partId,
      accessZone: accessibilityEnabled && partObj?.isShelf ? partObj.accessZone : null,
      accessHeightMm: accessibilityEnabled && partObj?.isShelf ? partObj.accessHeightMm : 0,
      x: clientX - rect.left,
      y: clientY - rect.top
    });
  }

  canvas.addEventListener('pointerdown', e => {
    activePointers.add(e.pointerId);
    if (activePointers.size > 1) {
      pointerDown = null;
      rightDown = null;
      setHoverHit(null);
      return;
    }
    if (e.button === 0) {
      pointerDown = { x: e.clientX, y: e.clientY, id: e.pointerId };
      canvas.style.cursor = 'grabbing';
    } else if (e.button === 2) {
      rightDown = { x: e.clientX, y: e.clientY };
    }
  });
  canvas.addEventListener('contextmenu', e => {
    e.preventDefault();
    e.stopPropagation();
    const movedRight = rightDown ? Math.hypot(e.clientX - rightDown.x, e.clientY - rightDown.y) : 0;
    rightDown = null;
    if (movedRight > 8 || !ready) return;
    const stageRect = container.getBoundingClientRect();
    const x = e.clientX - stageRect.left;
    const y = e.clientY - stageRect.top;
    const hit = pickInteractive(e.clientX, e.clientY);
    if (hit) {
      const action = hit.userData.interactive;
      const partObj = hit.userData.part ?? null;
      const partId = partObj?.def.id ?? null;
      const slotId = partObj?.def.slot ?? null;
      const allBoxes = collectWorldPartBoxes();
      const staticBoxes = allBoxes.filter(b => !b.jointId);
      const seats = detectSeats(spec, staticBoxes);
      const seatHit = partId ? seats.find(s => s.id === partId) ?? null : null;
      callbacks.onContextMenu?.({
        kind: 'hit',
        action,
        partId,
        slotId,
        seat: seatHit ? { id: seatHit.id, label: seatHit.label, isSeated: personActor.seatedSeat?.id === seatHit.id } : null,
        isOpen: action?.type === 'joint' ? (joints.get(action.id)?.current ?? 0) > 0.45 : undefined,
        isOn: action?.type === 'switch' ? (switches.get(action.id)?.target ?? 0) >= 0.5 : undefined,
        x,
        y
      });
      return;
    }

    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, activeCam);
    if (raycaster.ray.intersectPlane(floorPlane, floorHitPoint)) {
      callbacks.onContextMenu?.({
        kind: 'floor',
        floorPoint: [floorHitPoint.x, floorHitPoint.z],
        x,
        y
      });
    }
  }, { capture: true });
  canvas.addEventListener('pointermove', e => {
    if (activePointers.size > 1) return;
    if (pointerDown && e.pointerId === pointerDown.id) {
      if (Math.hypot(e.clientX - pointerDown.x, e.clientY - pointerDown.y) >= 6) {
        setHoverHit(null);
      }
      return;
    }
    if (e.pointerType !== 'mouse') return;
    const hit = pickInteractive(e.clientX, e.clientY);
    setHoverHit(hit, e.clientX, e.clientY);
  });
  canvas.addEventListener('pointerleave', () => {
    setHoverHit(null);
  });
  canvas.addEventListener('pointerup', e => {
    activePointers.delete(e.pointerId);
    if (!pointerDown || e.pointerId !== pointerDown.id) {
      if (activePointers.size === 0) canvas.style.cursor = activeHoverKey ? 'pointer' : 'grab';
      return;
    }
    const moved = Math.hypot(e.clientX - pointerDown.x, e.clientY - pointerDown.y);
    pointerDown = null;
    if (moved < 6) {
      const hit = pickInteractive(e.clientX, e.clientY);
      if (hit) callbacks.onInteract?.(hit.userData.interactive);
    }
    canvas.style.cursor = activeHoverKey ? 'pointer' : 'grab';
  });
  canvas.addEventListener('pointercancel', e => {
    activePointers.delete(e.pointerId);
    pointerDown = null;
    canvas.style.cursor = 'grab';
  });

  function loadDataImage(dataUri) {
    return new Promise(resolve => {
      if (typeof dataUri !== 'string' || !dataUri.startsWith('data:image/')) { resolve(null); return; }
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = dataUri;
    });
  }

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
      const useAoComposer = Boolean(composer && aoEnabled && !xrayEnabled && !accessibilityEnabled && !transparent);
      if (useAoComposer) {
        composer.setPixelRatio(1);
        composer.setSize(exportW, exportH);
      }
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

      if (useAoComposer) composer.render();
      else renderer.render(scene, activeCam);
      ctx.drawImage(canvas, 0, 0, exportW, exportH);

      if (includeGuides) {
        drawGuidesToCanvas(ctx, guides.endpoints, activeCam, exportW, exportH, dims, safeScale, locale);
      }

      if (includeCaption && caption) {
        ctx.fillStyle = transparent ? 'rgba(255, 254, 250, 0.96)' : '#fffefa';
        ctx.fillRect(0, exportH, exportW, footerH);
        ctx.fillStyle = '#d8dacf';
        ctx.fillRect(0, exportH, exportW, Math.max(1, safeScale));

        const padX = Math.round(22 * safeScale);
        const midY = exportH + footerH * 0.5;
        const rtl = Boolean(caption.rtl);
        let textOffset = 0;

        if (caption.brand?.logo) {
          const logoImg = await loadDataImage(caption.brand.logo);
          if (logoImg) {
            const natW = logoImg.naturalWidth || 120;
            const natH = logoImg.naturalHeight || 40;
            const maxH = 40 * safeScale;
            const maxW = 120 * safeScale;
            const ratio = Math.min(maxW / natW, maxH / natH);
            const drawW = Math.max(1, Math.round(natW * ratio));
            const drawH = Math.max(1, Math.round(natH * ratio));
            const logoX = rtl ? exportW - padX - drawW : padX;
            const logoY = Math.round(midY - drawH * 0.5);
            ctx.drawImage(logoImg, logoX, logoY, drawW, drawH);
            textOffset = drawW + Math.round(14 * safeScale);
          }
        }

        const titleX = rtl ? exportW - padX - textOffset : padX + textOffset;
        const metaX = rtl ? padX : exportW - padX;
        const titleMaxW = Math.max(80 * safeScale, exportW * 0.54 - textOffset);
        const finishesMaxW = Math.max(80 * safeScale, exportW * 0.58 - textOffset);

        ctx.fillStyle = '#222b26';
        ctx.font = `600 ${Math.round(17 * safeScale)}px Georgia, "Times New Roman", serif`;
        ctx.textAlign = rtl ? 'right' : 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText(caption.name, titleX, midY - 2 * safeScale, titleMaxW);

        ctx.fillStyle = '#56635b';
        ctx.font = `500 ${Math.round(11 * safeScale)}px system-ui, -apple-system, sans-serif`;
        ctx.textBaseline = 'top';
        ctx.fillText(caption.finishes, titleX, midY + 4 * safeScale, finishesMaxW);

        ctx.textAlign = rtl ? 'left' : 'right';
        ctx.fillStyle = '#222b26';
        ctx.font = `600 ${Math.round(12.5 * safeScale)}px ui-monospace, SFMono-Regular, Consolas, monospace`;
        ctx.textBaseline = 'bottom';
        ctx.fillText(caption.dimensions, metaX, midY - 2 * safeScale);

        ctx.fillStyle = '#56635b';
        ctx.font = `500 ${Math.round(10 * safeScale)}px system-ui, -apple-system, sans-serif`;
        ctx.textBaseline = 'top';
        ctx.fillText(caption.disclaimer || 'Form Study · Visual reference only', metaX, midY + 4 * safeScale);
      }
    } finally {
      renderer.setPixelRatio(savedPR);
      renderer.setSize(width, height, false);
      if (composer) {
        composer.setPixelRatio(savedPR);
        composer.setSize(width, height);
      }
      scene.background = savedBg;
      renderer.setClearColor(savedClearColor, savedClearAlpha);
      fitProjection();
      if (composer && aoEnabled && !xrayEnabled && !accessibilityEnabled) composer.render();
      else renderer.render(scene, activeCam);
    }

    const blob = await new Promise((resolve, reject) => {
      outCanvas.toBlob(b => (b ? resolve(b) : reject(new Error('Failed to encode PNG image.'))), 'image/png');
    });
    return { blob, width: outCanvas.width, height: outCanvas.height };
  }

  async function captureSpecSheetViews() {
    if (!ready || !width || !height) throw new Error('3D view is not ready yet.');
    const snapW = 1200;
    const snapH = 820;
    const aspect = snapW / snapH;

    const savedPR = renderer.getPixelRatio();
    const savedMode = projectionMode;
    const savedCamPos = activeCam.position.clone();
    const savedTarget = orbit.target.clone();
    const savedZoom = orthoCam.zoom;
    const savedShowGuides = showGuides;
    const savedPersonVis = person.root.visible;
    const savedPersonPos = person.root.position.clone();
    const savedPersonRotY = person.root.rotation.y;
    const savedXray = xrayEnabled;
    const savedHotspots = hotspotsEnabled;
    const savedBg = scene.background;

    const snapCanvas = document.createElement('canvas');
    snapCanvas.width = snapW;
    snapCanvas.height = snapH;
    const ctx = snapCanvas.getContext('2d');

    const syncComposerCam = cam => {
      if (renderPass) renderPass.camera = cam;
      if (gtaoPass) {
        gtaoPass.camera = cam;
        const isPersp = cam.isPerspectiveCamera ? 1 : 0;
        if (gtaoPass.gtaoMaterial.defines.PERSPECTIVE_CAMERA !== isPersp) {
          gtaoPass.gtaoMaterial.defines.PERSPECTIVE_CAMERA = isPersp;
          gtaoPass.gtaoMaterial.needsUpdate = true;
        }
      }
    };

    const snapView = async (viewKey, projMode, guidesOn, xrayOn, personOn) => {
      const toDir = vector();
      if (viewKey === 'studio') toDir.copy(studioDirection);
      else if (viewKey === 'front') toDir.set(0, 0, 1);
      else if (viewKey === 'side') toDir.set(1, 0, 0);
      else toDir.set(0, 1, 0.0001).normalize();

      hotspotLayer.hidden = true;
      person.root.visible = Boolean(personOn && personGeometry?.visible);
      xrayEnabled = Boolean(xrayOn);
      applyXrayState(xrayEnabled);

      projectionMode = projMode;
      activeCam = projMode === 'orthographic' ? orthoCam : perspCam;
      syncComposerCam(activeCam);

      const box = person.root.visible
        ? staticBounds
        : (staticFurnitureBounds.isEmpty() ? staticBounds : staticFurnitureBounds);
      const snapTarget = box.getCenter(vector());
      const radius = Math.max(50, box.min.distanceTo(box.max) * 0.5);

      activeCam.position.copy(snapTarget).addScaledVector(toDir, radius * 4);
      activeCam.lookAt(snapTarget);
      activeCam.updateMatrixWorld(true);

      right.setFromMatrixColumn(activeCam.matrixWorld, 0);
      up.setFromMatrixColumn(activeCam.matrixWorld, 1);
      forward.setFromMatrixColumn(activeCam.matrixWorld, 2);

      let hx = 1, hy = 1, hz = 1;
      const measureSnap = pt => {
        delta.subVectors(pt, snapTarget);
        hx = Math.max(hx, Math.abs(delta.dot(right)));
        hy = Math.max(hy, Math.abs(delta.dot(up)));
        hz = Math.max(hz, Math.abs(delta.dot(forward)));
      };
      for (const p of parts) if (p.anchor.visible) for (const v of p.points) measureSnap(v);
      if (person.root.visible) for (const v of personCorners) measureSnap(v);
      if (plate?.mesh.visible) for (const v of platePoints) measureSnap(v);
      if (guidesOn) for (const v of guides.endpoints) measureSnap(v);

      const reqHalfH = Math.max(hy, hx / aspect) * (guidesOn ? 1.24 : 1.15);
      if (projMode === 'orthographic') {
        orthoCam.zoom = 1;
        orthoCam.near = radius * 0.08;
        orthoCam.far = radius * 16;
        orthoCam.top = reqHalfH;
        orthoCam.bottom = -reqHalfH;
        orthoCam.right = reqHalfH * aspect;
        orthoCam.left = -orthoCam.right;
        orthoCam.updateProjectionMatrix();
        orthoCam.lookAt(snapTarget);
      } else {
        const dist = reqHalfH / Math.tan(rad(perspCam.fov * 0.5)) + hz * 0.55;
        perspCam.near = Math.max(10, radius * 0.08);
        perspCam.far = Math.max(10000, radius * 24);
        perspCam.position.copy(snapTarget).addScaledVector(toDir, dist);
        perspCam.aspect = aspect;
        perspCam.updateProjectionMatrix();
        perspCam.lookAt(snapTarget);
      }

      renderer.setPixelRatio(1);
      renderer.setSize(snapW, snapH, false);
      const useAo = Boolean(composer && aoEnabled && !xrayEnabled);
      if (useAo) {
        composer.setPixelRatio(1);
        composer.setSize(snapW, snapH);
      }
      scene.background = lighting.getBackdropTexture();
      renderer.setClearColor(0x000000, 1);
      updateAoClipBox();

      if (useAo) composer.render();
      else renderer.render(scene, activeCam);

      ctx.clearRect(0, 0, snapW, snapH);
      ctx.drawImage(canvas, 0, 0, snapW, snapH);
      if (guidesOn) {
        drawGuidesToCanvas(ctx, guides.endpoints, activeCam, snapW, snapH, dims, 1.35, locale);
      }
      return snapCanvas.toDataURL('image/png');
    };

    try {
      const studio = await snapView('studio', 'perspective', false, savedXray, true);
      const front = await snapView('front', 'orthographic', true, false, false);
      const side = await snapView('side', 'orthographic', true, false, false);
      const interior = await snapView(
        hasXrayTargets ? 'studio' : 'top',
        hasXrayTargets ? 'perspective' : 'orthographic',
        !hasXrayTargets,
        hasXrayTargets,
        false
      );
      return { studio, front, side, interior };
    } finally {
      xrayEnabled = savedXray;
      applyXrayState(xrayEnabled);
      person.root.visible = savedPersonVis;
      person.root.position.copy(savedPersonPos);
      person.root.rotation.y = savedPersonRotY;
      if (personActor.running || personActor.directed || personActor.hasMoved) person.setMotion?.(currentMotionPayload());
      showGuides = savedShowGuides;
      guides.set(showGuides, dims);
      projectionMode = savedMode;
      activeCam = savedMode === 'orthographic' ? orthoCam : perspCam;
      syncComposerCam(activeCam);
      orbit.object = activeCam;
      orbit.target.copy(savedTarget);
      activeCam.position.copy(savedCamPos);
      orthoCam.zoom = savedZoom;
      orthoCam.updateProjectionMatrix();
      orbit.update();
      hotspotsEnabled = savedHotspots;
      scene.background = savedBg;
      renderer.setPixelRatio(savedPR);
      renderer.setSize(width, height, false);
      if (composer) {
        composer.setPixelRatio(savedPR);
        composer.setSize(width, height);
      }
      updatePartLiveCorners();
      fitProjection();
      if (composer && aoEnabled && !xrayEnabled && !accessibilityEnabled) composer.render();
      else renderer.render(scene, activeCam);
    }
  }

  function setLocale(nextLocale) {
    locale = nextLocale || DEFAULT_LOCALE;
    canvas.setAttribute('aria-label', locale.formatCanvasLabel(locale.term(spec.name)));
    guides.setLocale(locale);
    for (const node of hotspotNodes) {
      node.btn.querySelector('.hotspot-tag').textContent = locale.term(node.entry.def.label);
    }
    fitProjection();
    schedule();
  }

  return {
    update,
    view,
    zoom,
    turn,
    setProjection,
    setLighting,
    setBackdrop,
    setRoomStyle,
    setXray,
    setAccessibility,
    isAccessibilityEnabled: () => accessibilityEnabled,
    setLedTemp,
    setAO,
    setPersonAutoRun,
    isPersonAutoRunning: () => personActor.running,
    resetPersonPosition,
    commandPerson,
    hasXrayTargets,
    setHotspots,
    setLocale,
    exportPng,
    captureSpecSheetViews
  };
}
