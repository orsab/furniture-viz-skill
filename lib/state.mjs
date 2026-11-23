import { axes } from './coordinates.mjs';

// Keys are stable authored IDs, not translated labels or current part order.
export function initialState(spec) {
  return {
    dimensions: Object.fromEntries(axes.map(k => [k, spec.dimensions[k].value])),
    finishes: Object.fromEntries(spec.slots.map(s => [s.id, {index: 0, tint: null}])),
    options: Object.fromEntries(spec.options.map(o => [o.id, o.choices[0]])),
    joints: Object.fromEntries(spec.joints.map(j => [j.id, 0])),
    switches: Object.fromEntries((spec.switches ?? []).map(s => [s.id, Boolean(s.defaultOn)])),
    inscription: '', showDimensions: false,
    person: {visible: false, height: 1700, build: 'regular', pose: 'standing', side: 'right', yaw: -12, skin: '#b98464', top: '#477065', bottom: '#39454c'}
  };
}

export function validateState(spec, state) {
  const bad = key => { throw new Error(`Invalid configuration: ${key}`); };
  const fields = (obj, keys, path) => {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj) || Object.keys(obj).length !== keys.length || !keys.every(k => Object.hasOwn(obj, k))) bad(path);
  };
  const between = (v, min, max, integer = false) => Number.isFinite(v) && (!integer || Number.isInteger(v)) && v >= min && v <= max;
  const color = v => typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v) && v.length === 7;
  const switchDefs = spec.switches ?? [];
  fields(state, ['dimensions', 'finishes', 'options', 'joints', 'switches', 'inscription', 'showDimensions', 'person'], 'fields');
  fields(state.dimensions, axes, 'dimensions');
  for (const k of axes) if (!between(state.dimensions[k], spec.dimensions[k].min, spec.dimensions[k].max, true)) bad(k);
  fields(state.finishes, spec.slots.map(s => s.id), 'finishes');
  for (const s of spec.slots) {
    const f = state.finishes[s.id]; fields(f, ['index', 'tint'], s.id);
    if (!between(f.index, 0, s.finishes.length - 1, true) || (f.tint !== null && !color(f.tint))) bad(s.label);
  }
  fields(state.options, spec.options.map(o => o.id), 'options');
  for (const o of spec.options) if (!o.choices.includes(state.options[o.id])) bad(o.label);
  fields(state.joints, spec.joints.map(j => j.id), 'joints');
  for (const j of spec.joints) if (!between(state.joints[j.id], 0, 1)) bad(j.label);
  fields(state.switches, switchDefs.map(s => s.id), 'switches');
  for (const s of switchDefs) if (typeof state.switches[s.id] !== 'boolean') bad(s.label);
  if (typeof state.showDimensions !== 'boolean') bad('dimension overlay');
  if (typeof state.inscription !== 'string' || state.inscription.length > 32 || (!spec.inscription && state.inscription)) bad('inscription');
  const p = state.person;
  fields(p, ['visible', 'height', 'build', 'pose', 'side', 'yaw', 'skin', 'top', 'bottom'], 'person');
  if (typeof p.visible !== 'boolean' || !between(p.height, 900, 2200, true) || !between(p.yaw, -180, 180, true) || !['slim', 'regular', 'broad'].includes(p.build) || !['standing', 'seated'].includes(p.pose) || !['left', 'right'].includes(p.side) || ![p.skin, p.top, p.bottom].every(color)) bad('person');
  return state;
}
