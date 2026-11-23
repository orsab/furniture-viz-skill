import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { validateSpec } from '../lib/spec.mjs';
import { initialState, validateState } from '../lib/state.mjs';

const project = () => ({
  version: 1,
  name: 'Tabletop',
  description: 'A fixed thickness slab.',
  dimensions: Object.fromEntries(['width', 'height', 'depth'].map(k => [k, { min: 300, value: 500, max: 900 }])),
  slots: [{ id: 'body', label: 'Top', finishes: [{ name: 'Oak', color: '#b38752', surface: 'wood' }] }],
  options: [],
  joints: [],
  switches: [],
  inscription: null,
  parts: [{ id: 'slab', shape: 'box', size: ['100%', 18, '100%'], center: [0, '100%-9', 0], rotation: [0, 0, 0], slot: 'body', joint: null, when: [], asset: null }],
  evidence: ['width', 'height', 'depth'].map(k => ({ field: `dimensions.${k}`, source: 'brief', note: 'Design range', status: 'stated' }))
});

test('a conflicting dimension can be reviewed but cannot be published as a measured model', () => {
  const spec = project();
  spec.evidence[1].status = 'conflict';
  assert.equal(validateSpec(spec), spec);
  assert.throws(() => validateSpec(spec, { forExport: true }), /conflict.*dimensions.height|dimensions.height.*conflict/i);
});

test('a panel that fits the default width but collapses at minimum width cannot ship', () => {
  const spec = project();
  spec.parts[0].size[0] = '100%-350';
  assert.throws(() => validateSpec(spec, { forExport: true }), /slab.*size|size.*slab/i);
});

test('legacy v1 specs omitting switches validate and normalize cleanly', () => {
  const legacy = project();
  delete legacy.switches;
  const validated = validateSpec(legacy, { forExport: true });
  assert.deepEqual(validated.switches, []);
  const state = initialState(validated);
  assert.deepEqual(state.switches, {});
  assert.deepEqual(validateState(validated, structuredClone(state)).switches, {});
});

test('supports hinge, flap, slide, slide-x, and lift joints while rejecting invalid angular travel', () => {
  const spec = project();
  spec.joints = [
    { id: 'hinge_j', label: 'Door', type: 'hinge', pivot: [0, 0, 0], travel: 90 },
    { id: 'flap_j', label: 'Drop front', type: 'flap', pivot: [0, 200, 100], travel: 95 },
    { id: 'slide_j', label: 'Drawer', type: 'slide', pivot: [0, 0, 0], travel: 250 },
    { id: 'slidex_j', label: 'Sliding door', type: 'slide-x', pivot: [0, 0, 0], travel: -300 },
    { id: 'lift_j', label: 'Rise top', type: 'lift', pivot: [0, 0, 0], travel: 180 }
  ];
  spec.parts = spec.joints.map((j, idx) => ({
    id: `part_${idx}`, shape: 'box', size: [40, 40, 40], center: [0, 20, 0], rotation: [0, 0, 0],
    slot: 'body', joint: j.id, when: [], asset: null
  }));
  assert.equal(validateSpec(spec, { forExport: true }), spec);

  const badFlap = project();
  badFlap.joints = [{ id: 'flap_j', label: 'Bad flap', type: 'flap', pivot: [0, 0, 0], travel: 200 }];
  badFlap.parts[0].joint = 'flap_j';
  assert.throws(() => validateSpec(badFlap, { forExport: true }), /invalid flap travel/i);
});

test('validates switches, light centers, and referenced parts', () => {
  const spec = project();
  spec.parts.push({ id: 'lamp_bar', shape: 'box', size: [100, 6, 8], center: [0, '100%-24', 0], rotation: [0, 0, 0], slot: 'body', joint: null, when: [], asset: null });
  spec.switches = [{
    id: 'task_light',
    label: 'Task lamp',
    kind: 'light',
    parts: ['lamp_bar'],
    defaultOn: true,
    joint: null,
    light: { center: [0, '100%-30', 0], color: '#ffdfaa', intensity: 2.5, distance: 1000, emissiveParts: ['lamp_bar'] }
  }];
  assert.equal(validateSpec(spec, { forExport: true }), spec);

  const badPart = structuredClone(spec);
  badPart.switches[0].parts = ['missing_part'];
  assert.throws(() => validateSpec(badPart), /unknown part missing_part/i);

  const badEmissive = structuredClone(spec);
  badEmissive.switches[0].light.emissiveParts = ['missing_led'];
  assert.throws(() => validateSpec(badEmissive), /unknown emissive part missing_led/i);

  const badCenter = structuredClone(spec);
  badCenter.switches[0].light.center = [0, '20000%', 0];
  assert.throws(() => validateSpec(badCenter), /task_light\.light\.center/i);
});

test('initialState and validateState round-trip switches and reject invalid switch types', () => {
  const spec = project();
  spec.switches = [{
    id: 'sw', label: 'Accent switch', kind: 'toggle', parts: ['slab'], defaultOn: false, joint: null, light: null
  }];
  const state = initialState(spec);
  assert.equal(state.switches.sw, false);
  assert.equal(validateState(spec, structuredClone(state)).switches.sw, false);

  const flipped = structuredClone(state);
  flipped.switches.sw = true;
  assert.equal(validateState(spec, flipped).switches.sw, true);

  const bad = structuredClone(state);
  bad.switches.sw = 'on';
  assert.throws(() => validateState(spec, bad), /Invalid configuration: Accent switch/i);

  const missing = structuredClone(state);
  delete missing.switches;
  assert.throws(() => validateState(spec, missing), /Invalid configuration: fields/i);
});

test('bundled Linea example passes strict export validation and state round-trip', async () => {
  const linea = JSON.parse(await readFile(new URL('../examples/linea.json', import.meta.url), 'utf8'));
  assert.equal(validateSpec(linea, { forExport: true }), linea);
  const state = initialState(linea);
  assert.equal(validateState(linea, structuredClone(state)).switches.bay_light, false);
});

test('validates all 12 architectural and furniture finish surface types and rejects unknown surface', () => {
  const allSurfaces = ['wood', 'fabric', 'metal', 'paint', 'marble', 'brick', 'concrete', 'stone', 'terrazzo', 'tile', 'leather', 'glass'];
  const spec = project();
  spec.slots[0].finishes = allSurfaces.map((surface, i) => ({
    name: `Finish ${i}`,
    color: '#c0b8ad',
    surface
  }));
  assert.equal(validateSpec(spec, { forExport: true }), spec);

  const bad = project();
  bad.slots[0].finishes = [{ name: 'Plasma', color: '#c0b8ad', surface: 'plasma' }];
  assert.throws(() => validateSpec(bad, { forExport: true }), /surface/i);
});

test('person state supports male/female/child characters, hair color, height 800-2200, and legacy setup backfill', () => {
  const spec = project();
  const state = initialState(spec);
  assert.equal(state.person.character, 'male');
  assert.match(state.person.hair, /^#[\da-f]{6}$/i);

  for (const [character, height] of [['male', 1760], ['female', 1640], ['child', 850]]) {
    const copy = structuredClone(state);
    copy.person.character = character;
    copy.person.height = height;
    const ok = validateState(spec, copy);
    assert.equal(ok.person.character, character);
    assert.equal(ok.person.height, height);
  }

  // Legacy saved state without character/hair is backfilled cleanly
  const legacy = structuredClone(state);
  delete legacy.person.character;
  delete legacy.person.hair;
  const migrated = validateState(spec, legacy);
  assert.equal(migrated.person.character, 'male');
  assert.match(migrated.person.hair, /^#[\da-f]{6}$/i);

  const badChar = structuredClone(state);
  badChar.person.character = 'robot';
  assert.throws(() => validateState(spec, badChar), /Invalid configuration: person/i);
});
