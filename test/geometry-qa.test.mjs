import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { validateSpec } from '../lib/spec.mjs';
import { auditGeometry } from '../lib/geometry-qa.mjs';
import { createKinematics, stepPhysicsSubstep } from '../lib/kinematics.mjs';
import { fixMeshCollisions } from '../lib/mesh-fix.mjs';

function makeBaseSpec() {
  return {
    version: 1,
    name: 'Test Cabinet',
    description: 'Minimal test cabinet.',
    dimensions: {
      width: { min: 800, value: 800, max: 800 },
      height: { min: 1000, value: 1000, max: 1000 },
      depth: { min: 500, value: 500, max: 500 }
    },
    slots: [{ id: 'body', label: 'Carcass', finishes: [{ name: 'Oak', color: '#c29b70', surface: 'wood' }] }],
    options: [],
    joints: [],
    switches: [],
    inscription: null,
    parts: [
      { id: 'back', shape: 'box', size: [800, 1000, 18], center: [0, 500, -241], rotation: [0, 0, 0], slot: 'body', joint: null, when: [], asset: null }
    ],
    evidence: ['width', 'height', 'depth'].map(k => ({ field: `dimensions.${k}`, source: 'test', note: 'test', status: 'stated' }))
  };
}

test('auditGeometry detects floating/sinking models, facade gaps, facade overlaps, rest overlaps, and blocked joints', () => {
  // 1. Ground contact warning
  const floating = makeBaseSpec();
  floating.parts[0].center[1] = 520;
  assert.ok(auditGeometry(floating).warnings.some(w => w.kind === 'ground-contact'));

  // 2. Facade gap (> 8mm between tall panels)
  const gapped = makeBaseSpec();
  gapped.parts.push(
    { id: 'door_l', shape: 'box', size: [350, 900, 18], center: [-225, 500, 241], rotation: [0, 0, 0], slot: 'body', joint: null, when: [], asset: null },
    { id: 'door_r', shape: 'box', size: [350, 900, 18], center: [225, 500, 241], rotation: [0, 0, 0], slot: 'body', joint: null, when: [], asset: null }
  );
  const gapWarnings = auditGeometry(gapped).warnings;
  assert.ok(gapWarnings.some(w => w.kind === 'facade-gap' && w.parts.includes('door_l') && w.parts.includes('door_r')));

  // 3. Facade overlap
  const overlapped = makeBaseSpec();
  overlapped.parts.push(
    { id: 'door_l', shape: 'box', size: [420, 900, 18], center: [-180, 500, 241], rotation: [0, 0, 0], slot: 'body', joint: null, when: [], asset: null },
    { id: 'door_r', shape: 'box', size: [420, 900, 18], center: [180, 500, 241], rotation: [0, 0, 0], slot: 'body', joint: null, when: [], asset: null }
  );
  assert.ok(auditGeometry(overlapped).warnings.some(w => w.kind === 'facade-overlap'));

  // 4. Rest overlap (drawer slicing static shelf) & blocked joint (door hinged on rear edge binding against neighbor)
  const blocked = makeBaseSpec();
  blocked.joints = [
    { id: 'door_j', label: 'Door', type: 'hinge', pivot: [-395, 0, 232], travel: -95 },
    { id: 'drawer_j', label: 'Drawer', type: 'slide', pivot: [0, 0, 0], travel: 250 }
  ];
  blocked.parts.push(
    { id: 'stile_l', shape: 'box', size: [50, 900, 18], center: [-422, 500, 241], rotation: [0, 0, 0], slot: 'body', joint: null, when: [], asset: null },
    { id: 'door_leaf', shape: 'box', size: [740, 900, 18], center: [-25, 500, 241], rotation: [0, 0, 0], slot: 'body', joint: 'door_j', when: [], asset: null },
    { id: 'drawer_box', shape: 'box', size: [600, 140, 300], center: [0, 300, 0], rotation: [0, 0, 0], slot: 'body', joint: 'drawer_j', when: [], asset: null },
    { id: 'shelf_hit', shape: 'box', size: [760, 18, 400], center: [0, 300, 0], rotation: [0, 0, 0], slot: 'body', joint: null, when: [], asset: null }
  );
  const bw = auditGeometry(blocked).warnings;
  assert.ok(bw.some(w => w.kind === 'rest-overlap' && w.parts.includes('drawer_box') && w.parts.includes('shelf_hit')));
  assert.ok(bw.some(w => w.kind === 'joint-blocked' && w.parts[0] === 'door_j'));
});

test('auditGeometry detects static mesh collisions and Z-fighting, and fixMeshCollisions notches and trims them cleanly', () => {
  const collided = makeBaseSpec();
  collided.dimensions = {
    width: { min: 1000, value: 1000, max: 1000 },
    height: { min: 1000, value: 1000, max: 1000 },
    depth: { min: 600, value: 600, max: 600 }
  };
  collided.slots.push({ id: 'column', label: 'Column', finishes: [{ name: 'Dark', color: '#464642', surface: 'paint' }] });
  collided.parts = [
    { id: 'back', shape: 'box', size: [1000, 1000, 16], center: [0, 500, -292], rotation: [0, 0, 0], slot: 'body', joint: null, when: [], asset: null },
    { id: 'side-l', shape: 'box', size: [18, 1000, 584], center: [-491, 500, 0], rotation: [0, 0, 0], slot: 'body', joint: null, when: [], asset: null },
    { id: 'side-r', shape: 'box', size: [18, 1000, 584], center: [491, 500, 0], rotation: [0, 0, 0], slot: 'body', joint: null, when: [], asset: null },
    { id: 'base', shape: 'box', size: [964, 18, 584], center: [0, 9, 0], rotation: [0, 0, 0], slot: 'body', joint: null, when: [], asset: null },
    { id: 'top', shape: 'box', size: [964, 18, 584], center: [0, 991, 0], rotation: [0, 0, 0], slot: 'body', joint: null, when: [], asset: null },
    // Column pierces back, base, and co-planar top (Y=1000) creating Z-fighting, plus overlapping pull trim
    { id: 'post', shape: 'box', size: [150, 1000, 150], center: [-407, 500, -225], rotation: [0, 0, 0], slot: 'column', joint: null, when: [], asset: null },
    { id: 'door-pull', shape: 'box', size: [14, 120, 24], center: [0, 500, 286], rotation: [0, 0, 0], slot: 'body', joint: null, when: [], asset: null },
    { id: 'front-stile', shape: 'box', size: [40, 1000, 24], center: [0, 500, 280], rotation: [0, 0, 0], slot: 'body', joint: null, when: [], asset: null }
  ];

  const pre = auditGeometry(collided);
  assert.ok(pre.warnings.some(w => w.kind === 'mesh-collision' && w.message.includes('Z-fighting')));

  const { spec: fixed, fixes } = fixMeshCollisions(collided);
  assert.ok(fixes.length >= 3);
  const post = auditGeometry(fixed);
  assert.deepEqual(post.warnings, [], `Expected 0 QA warnings after auto-fix, got: ${JSON.stringify(post.warnings)}`);
});

test('examples/linea.json passes auditGeometry with zero warnings', async () => {
  const linea = JSON.parse(await readFile(new URL('../examples/linea.json', import.meta.url), 'utf8'));
  validateSpec(linea, { forExport: true });
  const res = auditGeometry(linea);
  assert.deepEqual(res.warnings, []);
});

test('historical v1 primary-bedroom-joinery.json triggers expected gap, overlap, and blocked-joint warnings', async () => {
  const v1 = JSON.parse(await readFile(new URL('../private/primary-bedroom-joinery.json', import.meta.url), 'utf8'));
  const res = auditGeometry(v1);
  assert.ok(res.warnings.some(w => w.kind === 'facade-gap' && w.parts.includes('b-door-3-panel') && w.parts.includes('fluted-stile-1')));
  assert.ok(res.warnings.some(w => w.kind === 'facade-gap' && w.parts.includes('blind-corner-front') && w.parts.includes('b-door-1-panel')));
  assert.ok(res.warnings.some(w => w.kind === 'facade-overlap' && w.parts.includes('fluted-stile-2') && w.parts.includes('b-door-4-panel')));
  assert.ok(res.warnings.some(w => w.kind === 'rest-overlap'));
  assert.ok(res.warnings.some(w => w.kind === 'joint-blocked'));
});

test('revised v2 primary-bedroom-joinery-v2.json passes strict export validation, auditGeometry (0 warnings), and full bay kinematics', async () => {
  const v2 = JSON.parse(await readFile(new URL('../private/primary-bedroom-joinery-v2.json', import.meta.url), 'utf8'));
  validateSpec(v2, { forExport: true });
  const qa = auditGeometry(v2);
  assert.deepEqual(qa.warnings, [], `Unexpected QA warnings: ${JSON.stringify(qa.warnings, null, 2)}`);

  const kin = createKinematics(v2);
  kin.setDimensionsAndOptions({
    width: v2.dimensions.width.value,
    height: v2.dimensions.height.value,
    depth: v2.dimensions.depth.value
  }, {});
  const zeroPos = Object.fromEntries(v2.joints.map(j => [j.id, 0]));

  // All 9 doors and flaps open solo cleanly to 100% at maximum unobstructed angles
  const expectedTravels = {
    'b-door-1': -90,
    'b-door-2': 165,
    'b-door-3': -165,
    'b-door-4': -125,
    'b-door-5': 165,
    'a-door-1': -165,
    'a-door-2': 90,
    'mirror-door': -96,
    'sink-flap': 90
  };
  for (const j of v2.joints.filter(x => x.type === 'hinge' || x.type === 'flap')) {
    assert.equal(j.travel, expectedTravels[j.id], `${j.id} expected travel ${expectedTravels[j.id]}`);
    const res = kin.resolveJointMotion(j.id, 0, 1, zeroPos);
    assert.equal(res.blocked, false, `${j.id} blocked solo by ${JSON.stringify(res.blocker)}`);
    assert.equal(res.progress, 1, `${j.id} should reach 100%`);
  }

  // Closed bay doors block internal drawers
  assert.equal(kin.resolveJointMotion('b-left-drawer-0', 0, 1, zeroPos).blocked, true);
  assert.equal(kin.resolveJointMotion('a-drawer-1', 0, 1, zeroPos).blocked, true);

  // Opening each bay's doors allows every internal drawer in that bay to slide cleanly to 100%
  const drawerBays = [
    ['b-left-drawer-0', { ...zeroPos, 'b-door-1': 1 }],
    ['b-left-drawer-1', { ...zeroPos, 'b-door-1': 1 }],
    ['b-left-drawer-2', { ...zeroPos, 'b-door-1': 1 }],
    ['b-mid-drawer-0', { ...zeroPos, 'b-door-1': 1, 'b-door-2': 1 }],
    ['b-mid-drawer-1', { ...zeroPos, 'b-door-1': 1, 'b-door-2': 1 }],
    ['b-mid-drawer-2', { ...zeroPos, 'b-door-1': 1, 'b-door-2': 1 }],
    ['fridge-top-drawer', { ...zeroPos, 'b-door-3': 1 }],
    ['right-small-drawer', { ...zeroPos, 'b-door-4': 1, 'b-door-5': 1 }],
    ['right-wide-drawer-0', { ...zeroPos, 'b-door-4': 1, 'b-door-5': 1 }],
    ['right-wide-drawer-1', { ...zeroPos, 'b-door-4': 1, 'b-door-5': 1 }],
    ['a-drawer-1', { ...zeroPos, 'a-door-1': 1, 'a-door-2': 1 }],
    ['a-drawer-2', { ...zeroPos, 'a-door-1': 1, 'a-door-2': 1 }],
    ['a-drawer-3', { ...zeroPos, 'a-door-2': 1 }],
    ['a-drawer-4', { ...zeroPos, 'a-door-2': 1 }]
  ];

  for (const [drawerId, openBayPos] of drawerBays) {
    const res = kin.resolveJointMotion(drawerId, 0, 1, openBayPos);
    assert.equal(res.blocked, false, `${drawerId} blocked with bay door open by ${JSON.stringify(res.blocker)}`);
    assert.equal(res.progress, 1, `${drawerId} should slide to 100%`);
  }

  // Simultaneous physics opening on opposing pairs stops cleanly on contact with zero residual overlap
  for (const pair of [['b-door-2', 'b-door-3'], ['b-door-1', 'a-door-2']]) {
    const jMap = new Map(v2.joints.map(j => [j.id, {
      id: j.id, label: j.label, current: 0, target: pair.includes(j.id) ? 1 : 0, velocity: 0
    }]));
    for (let i = 0; i < 400; i++) {
      const r = stepPhysicsSubstep(kin, jMap, 1 / 60);
      if (!r.animating) break;
    }
    const settled = Object.fromEntries([...jMap.values()].map(j => [j.id, j.current]));
    for (const id of pair) {
      assert.ok(settled[id] > 0.25 && settled[id] < 0.99, `Expected ${id} in pair ${pair.join('+')} to stop cleanly on contact, got ${settled[id]}`);
      assert.equal(kin.checkJointCollision(id, settled[id], settled), null, `Expected zero residual overlap on settled ${id}`);
    }
  }
});
