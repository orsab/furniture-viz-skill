import checkShape from '../assets/check.cjs';
import { axes, resolveVec } from './coordinates.mjs';
export { resolveVec } from './coordinates.mjs';

function requireValue(ok, message) { if (!ok) throw new Error(message); }
function byId(items, label) {
  const map = new Map();
  for (const item of items) {
    requireValue(!map.has(item.id), `Duplicate ${label} id: ${item.id}`);
    requireValue(!Object.hasOwn(Object.prototype, item.id) && item.id !== 'prototype', `Reserved ${label} id: ${item.id}`);
    map.set(item.id, item);
  }
  return map;
}

const angularJointTypes = new Set(['hinge', 'flap']);

export function validateSpec(spec, {forExport = false} = {}) {
  const target = spec && typeof spec === 'object' && !Array.isArray(spec) && !Object.hasOwn(spec, 'switches')
    ? { ...spec, switches: [] }
    : spec;
  if (!checkShape(target)) {
    const {instancePath, message, params} = checkShape.errors[0];
    throw new Error(`${instancePath || 'spec'} ${message}${params.additionalProperty ? `: ${params.additionalProperty}` : ''}`);
  }
  const slots = byId(target.slots, 'slot'), options = byId(target.options, 'option'), joints = byId(target.joints, 'joint');
  const partMap = byId(target.parts, 'part');
  byId(target.switches, 'switch');
  const min = {}, max = {};
  for (const axis of axes) {
    const r = target.dimensions[axis];
    requireValue(r.min <= r.value && r.value <= r.max, `dimensions.${axis}: default must be within min and max`);
    requireValue(target.evidence.some(e => e.field === `dimensions.${axis}`), `dimensions.${axis} lacks evidence; identify the source or mark it estimated/unknown`);
    min[axis] = r.min; max[axis] = r.max;
  }
  const usedSlots = new Set(), usedOptions = new Set(), usedJoints = new Set();
  for (const s of target.slots) requireValue(new Set(s.finishes.map(f => f.name)).size === s.finishes.length, `${s.id}: duplicate finish name`);
  for (const o of target.options) requireValue(new Set(o.choices).size === o.choices.length, `${o.id}: duplicate option choice`);
  const checkJoint = (id, field) => {
    if (id === null) return;
    requireValue(joints.has(id), `${field}: unknown joint ${id}`);
    usedJoints.add(id);
  };
  const checkVec = (vec, path, isSize = false) => {
    // Each component is affine in one dimension: its extrema occur at the two endpoints.
    for (const dims of [min, max]) for (const n of resolveVec(vec, dims)) {
      requireValue(Number.isFinite(n) && Math.abs(n) <= 100000 && (!isSize || n > 0), `${path}: ${isSize ? 'size must stay positive and ' : ''}within 100000 mm throughout allowed dimensions`);
    }
  };
  for (const j of target.joints) {
    requireValue(j.travel !== 0 && (!angularJointTypes.has(j.type) || Math.abs(j.travel) <= 180), `${j.id}: invalid ${j.type} travel`);
    checkVec(j.pivot, `${j.id}.pivot`);
  }
  for (const p of target.parts) {
    requireValue(p.shape === 'glb' ? p.asset !== null : p.asset === null && p.slot !== null, `${p.id}: primitives need a finish slot and no asset; GLB parts need a local .glb file`);
    if (p.slot !== null) { requireValue(slots.has(p.slot), `${p.id}: unknown slot ${p.slot}`); usedSlots.add(p.slot); }
    checkJoint(p.joint, p.id);
    checkVec(p.size, `${p.id}.size`, true); checkVec(p.center, `${p.id}.center`);
    const seen = new Set();
    for (const c of p.when) {
      requireValue(options.get(c.option)?.choices.includes(c.choice), `${p.id}: unknown option/choice ${c.option}/${c.choice}`);
      requireValue(!seen.has(c.option), `${p.id}: duplicate condition for ${c.option}`);
      seen.add(c.option); usedOptions.add(c.option);
    }
  }
  for (const sw of target.switches) {
    const seenParts = new Set();
    for (const partId of sw.parts) {
      requireValue(partMap.has(partId), `${sw.id}: unknown part ${partId}`);
      requireValue(!seenParts.has(partId), `${sw.id}: duplicate part ${partId}`);
      seenParts.add(partId);
    }
    checkJoint(sw.joint, sw.id);
    if (sw.light) {
      checkVec(sw.light.center, `${sw.id}.light.center`);
      for (const partId of sw.light.emissiveParts) {
        requireValue(partMap.has(partId), `${sw.id}: unknown emissive part ${partId}`);
      }
    }
  }
  if (target.inscription) { checkVec(target.inscription.center, 'inscription.center'); checkJoint(target.inscription.joint, 'inscription'); }
  for (const [map, used, name] of [[slots, usedSlots, 'finish slot'], [joints, usedJoints, 'joint'], [options, usedOptions, 'option']]) {
    for (const id of map.keys()) requireValue(used.has(id), `Unused ${name}: ${id}. Every published control must affect the model.`);
  }
  if (forExport) {
    const blockers = target.evidence.filter(e => e.status === 'unknown' || e.status === 'conflict');
    requireValue(!blockers.length, `Resolve before export: ${blockers.map(e => `${e.field} (${e.status})`).join(', ')}`);
  }
  return target;
}
