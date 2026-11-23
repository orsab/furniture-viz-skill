import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { createKinematics, makePersonOBB, stepPhysicsSubstep } from '../lib/kinematics.mjs';

function makeCabinetWithOpposingDoors() {
  // Door A hinges at X=-200, Z=200 (spans X[-200..-10], Z[182..200]), swings outward +Z (-75 deg).
  // Door B hinges at X=-5, Z=200 (spans X[-5..215], Z[182..200]), swings outward +Z and left (-150 deg),
  // crossing Door A's open leaf when Door A is open, while clearing cleanly when Door A is closed.
  return {
    version: 1,
    name: 'Dual Door Test',
    description: 'Opposing doors.',
    dimensions: {
      width: { min: 600, value: 800, max: 1200 },
      height: { min: 600, value: 700, max: 900 },
      depth: { min: 300, value: 400, max: 500 }
    },
    slots: [{ id: 'body', label: 'Carcass', finishes: [{ name: 'Oak', color: '#c29b70', surface: 'wood' }] }],
    options: [],
    joints: [
      { id: 'door_a', label: 'Door A', type: 'hinge', pivot: [-200, 0, 200], travel: -75 },
      { id: 'door_b', label: 'Door B', type: 'hinge', pivot: [-5, 0, 200], travel: -150 }
    ],
    switches: [],
    parts: [
      { id: 'carcass_back', shape: 'box', size: ['100%', '100%', 18], center: [0, '50%', '-50%+9'], rotation: [0, 0, 0], slot: 'body', joint: null, when: [], asset: null },
      { id: 'panel_a', shape: 'box', size: [190, 500, 18], center: [-105, 300, 191], rotation: [0, 0, 0], slot: 'body', joint: 'door_a', when: [], asset: null },
      { id: 'panel_b', shape: 'box', size: [220, 500, 18], center: [105, 300, 191], rotation: [0, 0, 0], slot: 'body', joint: 'door_b', when: [], asset: null }
    ],
    inscription: null,
    evidence: ['width', 'height', 'depth'].map(k => ({ field: `dimensions.${k}`, source: 'test', note: 'test', status: 'stated' }))
  };
}

function makeCabinetWithInsetDrawerBehindDoor() {
  return {
    version: 1,
    name: 'Drawer Behind Door',
    description: 'Inset drawer behind outer hinged door.',
    dimensions: {
      width: { min: 600, value: 600, max: 600 },
      height: { min: 600, value: 600, max: 600 },
      depth: { min: 400, value: 400, max: 400 }
    },
    slots: [{ id: 'body', label: 'Carcass', finishes: [{ name: 'Oak', color: '#c29b70', surface: 'wood' }] }],
    options: [],
    joints: [
      { id: 'outer_door', label: 'Outer door', type: 'hinge', pivot: [-280, 0, 200], travel: -105 },
      { id: 'inner_drawer', label: 'Inner drawer', type: 'slide', pivot: [0, 0, 0], travel: 260 }
    ],
    switches: [],
    parts: [
      { id: 'side_l', shape: 'box', size: [18, 600, 400], center: [-291, 300, 0], rotation: [0, 0, 0], slot: 'body', joint: null, when: [], asset: null },
      { id: 'door_panel', shape: 'box', size: [560, 560, 18], center: [0, 300, 191], rotation: [0, 0, 0], slot: 'body', joint: 'outer_door', when: [], asset: null },
      { id: 'drawer_box', shape: 'box', size: [500, 140, 320], center: [0, 200, 10], rotation: [0, 0, 0], slot: 'body', joint: 'inner_drawer', when: [], asset: null }
    ],
    inscription: null,
    evidence: ['width', 'height', 'depth'].map(k => ({ field: `dimensions.${k}`, source: 'test', note: 'test', status: 'stated' }))
  };
}

function runPhysicsUntilSettled(kin, spec, targets, initial = {}) {
  const jointMap = new Map(spec.joints.map(j => [j.id, {
    id: j.id,
    label: j.label,
    current: initial[j.id] ?? 0,
    target: targets[j.id] ?? 0,
    velocity: 0
  }]));
  const allCollisions = [];
  for (let i = 0; i < 300; i++) {
    const res = stepPhysicsSubstep(kin, jointMap, 1 / 60);
    allCollisions.push(...res.collisions);
    if (!res.animating) break;
  }
  return { jointMap, collisions: allCollisions };
}

test('door-on-door collision prevents opening one door through another door', () => {
  const spec = makeCabinetWithOpposingDoors();
  const kin = createKinematics(spec);
  kin.setDimensionsAndOptions({ width: 800, height: 700, depth: 400 }, {});

  // Open Door A fully (-90 deg outward)
  const pos = { door_a: 1, door_b: 0 };
  // Now try opening Door B (+160 deg toward Door A)
  const res = kin.resolveJointMotion('door_b', 0, 1, pos);
  assert.equal(res.blocked, true);
  assert.equal(res.blocker.jointId, 'door_a');
  assert.ok(res.progress > 0 && res.progress < 0.85, `Door B should stop on contact with Door A, got ${res.progress}`);

  // Close Door A -> Door B can now open cleanly without colliding
  pos.door_a = 0;
  const clear = kin.resolveJointMotion('door_b', 0, 1, pos);
  assert.equal(clear.blocked, false);
  assert.equal(clear.progress, 1);
});

test('simultaneous physics Open All stops colliding doors cleanly upon contact', () => {
  const spec = makeCabinetWithOpposingDoors();
  const kin = createKinematics(spec);
  kin.setDimensionsAndOptions({ width: 800, height: 700, depth: 400 }, {});

  const { jointMap, collisions } = runPhysicsUntilSettled(kin, spec, { door_a: 1, door_b: 1 });
  assert.ok(collisions.length > 0, 'Expected simultaneous opening of overlapping doors to report contact');
  const pos = { door_a: jointMap.get('door_a').current, door_b: jointMap.get('door_b').current };
  assert.equal(kin.checkJointCollision('door_a', pos.door_a, pos), null);
  assert.equal(kin.checkJointCollision('door_b', pos.door_b, pos), null);
});

test('inset drawer behind closed door is blocked until door opens, and extended drawer blocks closing door', () => {
  const spec = makeCabinetWithInsetDrawerBehindDoor();
  const kin = createKinematics(spec);
  kin.setDimensionsAndOptions({ width: 600, height: 600, depth: 400 }, {});

  // Closed door blocks drawer from sliding out
  const blockedDrawer = kin.resolveJointMotion('inner_drawer', 0, 1, { outer_door: 0, inner_drawer: 0 });
  assert.equal(blockedDrawer.blocked, true);
  assert.equal(blockedDrawer.blocker.jointId, 'outer_door');
  assert.ok(blockedDrawer.progress < 0.08);

  // Open door -> drawer glides out to 100%
  const openDrawer = kin.resolveJointMotion('inner_drawer', 0, 1, { outer_door: 1, inner_drawer: 0 });
  assert.equal(openDrawer.blocked, false);
  assert.equal(openDrawer.progress, 1);

  // Try closing door while drawer is fully extended -> door stops against drawer
  const blockedDoor = kin.resolveJointMotion('outer_door', 1, 0, { outer_door: 1, inner_drawer: 1 });
  assert.equal(blockedDoor.blocked, true);
  assert.equal(blockedDoor.blocker.jointId, 'inner_drawer');
  assert.ok(blockedDoor.progress > 0.25 && blockedDoor.progress < 1);
});

test('two sliding doors on the same track cannot pass through each other', () => {
  const spec = {
    version: 1,
    name: 'Sliding Track',
    description: 'Co-planar sliding doors.',
    dimensions: {
      width: { min: 1000, value: 1000, max: 1000 },
      height: { min: 600, value: 600, max: 600 },
      depth: { min: 400, value: 400, max: 400 }
    },
    slots: [{ id: 'body', label: 'Carcass', finishes: [{ name: 'Oak', color: '#c29b70', surface: 'wood' }] }],
    options: [],
    joints: [
      { id: 'left_slider', label: 'Left slider', type: 'slide-x', pivot: [0, 0, 0], travel: 450 },
      { id: 'right_slider', label: 'Right slider', type: 'slide-x', pivot: [0, 0, 0], travel: -450 }
    ],
    switches: [],
    parts: [
      { id: 'left_panel', shape: 'box', size: [400, 500, 18], center: [-250, 300, 191], rotation: [0, 0, 0], slot: 'body', joint: 'left_slider', when: [], asset: null },
      { id: 'right_panel', shape: 'box', size: [400, 500, 18], center: [250, 300, 191], rotation: [0, 0, 0], slot: 'body', joint: 'right_slider', when: [], asset: null }
    ],
    inscription: null,
    evidence: ['width', 'height', 'depth'].map(k => ({ field: `dimensions.${k}`, source: 'test', note: 'test', status: 'stated' }))
  };
  const kin = createKinematics(spec);
  kin.setDimensionsAndOptions({ width: 1000, height: 600, depth: 400 }, {});
  // Left gap is 100mm (-50..+50). Slide left_slider halfway (225mm) -> hits right_panel around 100mm!
  const res = kin.resolveJointMotion('left_slider', 0, 1, { left_slider: 0, right_slider: 0 });
  assert.equal(res.blocked, true);
  assert.equal(res.blocker.jointId, 'right_slider');
  const travel = res.progress * 450;
  assert.ok(travel >= 95 && travel <= 105, `Expected stop near 100mm gap, got ${travel.toFixed(1)}mm`);
});

test('flush 0mm reveal doors do not falsely jam against side carcass or each other at 0%', () => {
  const spec = {
    version: 1,
    name: 'Zero Reveal',
    description: 'Flush doors touching at center seam.',
    dimensions: {
      width: { min: 800, value: 800, max: 800 },
      height: { min: 600, value: 600, max: 600 },
      depth: { min: 400, value: 400, max: 400 }
    },
    slots: [{ id: 'body', label: 'Carcass', finishes: [{ name: 'Oak', color: '#c29b70', surface: 'wood' }] }],
    options: [],
    joints: [
      { id: 'door_l', label: 'Left', type: 'hinge', pivot: [-382, 0, 200], travel: -100 },
      { id: 'door_r', label: 'Right', type: 'hinge', pivot: [382, 0, 200], travel: 100 }
    ],
    switches: [],
    parts: [
      { id: 'wall_l', shape: 'box', size: [18, 600, 400], center: [-391, 300, 0], rotation: [0, 0, 0], slot: 'body', joint: null, when: [], asset: null },
      { id: 'wall_r', shape: 'box', size: [18, 600, 400], center: [391, 300, 0], rotation: [0, 0, 0], slot: 'body', joint: null, when: [], asset: null },
      { id: 'dl', shape: 'box', size: [382, 580, 18], center: [-191, 300, 191], rotation: [0, 0, 0], slot: 'body', joint: 'door_l', when: [], asset: null },
      { id: 'dr', shape: 'box', size: [382, 580, 18], center: [191, 300, 191], rotation: [0, 0, 0], slot: 'body', joint: 'door_r', when: [], asset: null }
    ],
    inscription: null,
    evidence: ['width', 'height', 'depth'].map(k => ({ field: `dimensions.${k}`, source: 'test', note: 'test', status: 'stated' }))
  };
  const kin = createKinematics(spec);
  kin.setDimensionsAndOptions({ width: 800, height: 600, depth: 400 }, {});
  assert.equal(kin.resolveJointMotion('door_l', 0, 1, { door_l: 0, door_r: 0 }).blocked, false);
  assert.equal(kin.resolveJointMotion('door_r', 0, 1, { door_l: 0, door_r: 0 }).blocked, false);
});

test('resize overlap recovery pulls colliding open joints safely back toward closed', () => {
  const spec = makeCabinetWithOpposingDoors();
  const kin = createKinematics(spec);
  kin.setDimensionsAndOptions({ width: 800, height: 700, depth: 400 }, {});
  // Pretend door_b was set at 0.9 while overlapping door_a at 1.0
  const adjusted = kin.resolveAllOverlaps({ door_a: 1, door_b: 0.9 });
  assert.ok('door_b' in adjusted || 'door_a' in adjusted);
  const finalPos = { door_a: 1, door_b: 0.9, ...adjusted };
  assert.equal(kin.checkJointCollision('door_b', finalPos.door_b, finalPos), null);
});

test('spring-damper physics produces smooth soft-close deceleration and mid-motion reversal', () => {
  const spec = makeCabinetWithInsetDrawerBehindDoor();
  const kin = createKinematics(spec);
  kin.setDimensionsAndOptions({ width: 600, height: 600, depth: 400 }, {});

  const jointMap = new Map([['outer_door', { id: 'outer_door', label: 'Outer door', current: 0, target: 1, velocity: 0 }]]);
  // Accelerate halfway open
  for (let i = 0; i < 12; i++) stepPhysicsSubstep(kin, jointMap, 1 / 60);
  const midPos = jointMap.get('outer_door').current;
  const midVel = jointMap.get('outer_door').velocity;
  assert.ok(midPos > 0.1 && midPos < 0.9 && midVel > 0.5);

  // Reverse target mid-flight to close softly to 0
  jointMap.get('outer_door').target = 0;
  let peakCloseSpeed = 0;
  let nearLatchSpeed = 0;
  for (let i = 0; i < 180; i++) {
    stepPhysicsSubstep(kin, jointMap, 1 / 60);
    const j = jointMap.get('outer_door');
    peakCloseSpeed = Math.max(peakCloseSpeed, -j.velocity);
    if (j.current > 0 && j.current < 0.05) nearLatchSpeed = -j.velocity;
    if (j.current === 0 && j.velocity === 0) break;
  }
  assert.equal(jointMap.get('outer_door').current, 0);
  assert.ok(nearLatchSpeed < peakCloseSpeed, 'Soft-close zone should damp speed before latching');
});

test('Linea sideboard moves freely 0%<->100% across min, default, and max sizes with flush drawer joinery', async () => {
  const linea = JSON.parse(await readFile(new URL('../examples/linea.json', import.meta.url), 'utf8'));
  const kin = createKinematics(linea);
  const options = { pulls: 'Bar pulls', shelves: 'One shelf', base: 'Timber feet' };
  const dimsList = [
    { width: 1100, height: 660, depth: 360 },
    { width: 1400, height: 780, depth: 420 },
    { width: 1800, height: 960, depth: 550 }
  ];
  for (const dims of dimsList) {
    kin.setDimensionsAndOptions(dims, options);
    const resDoor = kin.resolveJointMotion('door', 0, 1, { door: 0, drawer: 0 });
    assert.equal(resDoor.blocked, false, `Door falsely blocked at ${JSON.stringify(dims)}: ${JSON.stringify(resDoor.blocker)}`);
    assert.equal(resDoor.progress, 1);

    const resDrawer = kin.resolveJointMotion('drawer', 0, 1, { door: 1, drawer: 0 });
    assert.equal(resDrawer.blocked, false, `Drawer falsely blocked at ${JSON.stringify(dims)}: ${JSON.stringify(resDrawer.blocker)}`);
    assert.equal(resDrawer.progress, 1);
  }
});

test('person 3D collision OBB stops opening door upon contact and clears outside swing arc', async () => {
  const linea = JSON.parse(await readFile(new URL('../examples/linea.json', import.meta.url), 'utf8'));
  const kin = createKinematics(linea);
  kin.setDimensionsAndOptions({ width: 1400, height: 780, depth: 420 }, { pulls: 'Bar pulls', shelves: 'One shelf', base: 'Timber feet' });

  // Stand directly inside Linea left door's outward swing arc (pivot x=-680, width ~669mm)
  const inPathOBB = makePersonOBB({ x: -350, z: 520, yaw: Math.PI, height: 1700, build: 'regular', seated: false });
  kin.setPersonObstacle(inPathOBB);
  const blockedRes = kin.resolveJointMotion('door', 0, 1, { door: 0, drawer: 0 });
  assert.equal(blockedRes.blocked, true);
  assert.equal(blockedRes.blocker.partId, '__person__');
  assert.equal(blockedRes.blocker.isPerson, true);
  assert.equal(kin.isPersonClearOfJointSweep('door', 0, 1, { door: 0, drawer: 0 }, inPathOBB), false);

  // Move safely outside the door swing arc
  const clearOBB = makePersonOBB({ x: 350, z: 980, yaw: Math.PI, height: 1700, build: 'regular', seated: false });
  kin.setPersonObstacle(clearOBB);
  const clearRes = kin.resolveJointMotion('door', 0, 1, { door: 0, drawer: 0 });
  assert.equal(clearRes.blocked, false);
  assert.equal(clearRes.progress, 1);
  assert.equal(kin.isPersonClearOfJointSweep('door', 0, 1, { door: 0, drawer: 0 }, clearOBB), true);

  // Dense sweep check with safety pad catches a thin 18mm door swinging 165 deg past a close bystander
  const wardrobeV4 = JSON.parse(await readFile(new URL('../private/primary-bedroom-joinery-v4.json', import.meta.url), 'utf8'));
  const kinW = createKinematics(wardrobeV4);
  kinW.setDimensionsAndOptions({ width: 4250, height: 2740, depth: 1810 }, { 'preview-scene': 'Joinery only' });
  const closeMidArc = makePersonOBB({ x: -120, z: 320, yaw: Math.PI, height: 1760, build: 'regular', character: 'male', seated: false });
  assert.equal(kinW.isPersonClearOfJointSweep('b-door-2', 0, 1, { 'b-door-2': 0 }, closeMidArc, { pad: 65 }), false);
});
