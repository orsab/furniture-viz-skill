import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
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
} from '../app/person-ai.mjs';
import { createKinematics, makePersonOBB } from '../lib/kinematics.mjs';
import { initialState } from '../lib/state.mjs';
import { resolveVec } from '../lib/coordinates.mjs';
import { Box3 } from 'three';
import { makeMannequin } from '../app/mannequin.mjs';

function rotateXYZ([x, y, z], [rx, ry, rz]) {
  const rad = d => (d * Math.PI) / 180;
  let px = x, py = y, pz = z;
  if (rx) {
    const c = Math.cos(rad(rx)), s = Math.sin(rad(rx));
    [py, pz] = [py * c - pz * s, py * s + pz * c];
  }
  if (ry) {
    const c = Math.cos(rad(ry)), s = Math.sin(rad(ry));
    [px, pz] = [px * c + pz * s, -px * s + pz * c];
  }
  if (rz) {
    const c = Math.cos(rad(rz)), s = Math.sin(rad(rz));
    [px, py] = [px * c - py * s, px * s + py * c];
  }
  return [px, py, pz];
}

function makeBoxesFromSpec(spec) {
  const dims = Object.fromEntries(Object.entries(spec.dimensions).map(([k, v]) => [k, v.value]));
  const slotMap = new Map(spec.slots.map(s => [s.id, s]));
  return spec.parts
    .filter(p => !p.when.length || p.when.every(r => spec.options.find(o => o.id === r.option)?.choices[0] === r.choice))
    .map(p => {
      const size = resolveVec(p.size, dims);
      const center = resolveVec(p.center, dims);
      const rot = p.rotation || [0, 0, 0];
      const hx = size[0] * 0.5, hy = size[1] * 0.5, hz = size[2] * 0.5;
      let minX = Infinity, minY = Infinity, minZ = Infinity;
      let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
      for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) {
        const [rx, ry, rz] = rotateXYZ([sx * hx, sy * hy, sz * hz], rot);
        const vx = center[0] + rx, vy = center[1] + ry, vz = center[2] + rz;
        if (vx < minX) minX = vx;
        if (vx > maxX) maxX = vx;
        if (vy < minY) minY = vy;
        if (vy > maxY) maxY = vy;
        if (vz < minZ) minZ = vz;
        if (vz > maxZ) maxZ = vz;
      }
      return {
        id: p.id,
        slotId: p.slot,
        slotLabel: slotMap.get(p.slot)?.label || '',
        jointId: p.joint ?? null,
        minX, maxX, minY, maxY, minZ, maxZ
      };
    });
}

test('DEFAULT_ACTION_DELAY_MS is 10 seconds', () => {
  assert.equal(DEFAULT_ACTION_DELAY_MS, 10000);
});

test('detectSeats identifies seating surface facing away from backrest and rejects wardrobes/sideboards', async () => {
  const chairSpec = {
    name: 'Studio dining chair',
    description: 'Upholstered seat and curved backrest.',
    slots: [
      { id: 'frame', label: 'Oak frame' },
      { id: 'cushion', label: 'Seat cushion' }
    ],
    joints: []
  };
  const chairBoxes = [
    { id: 'seat-pad', slotId: 'cushion', slotLabel: 'Seat cushion', jointId: null, minX: -220, maxX: 220, minY: 410, maxY: 465, minZ: -210, maxZ: 210 },
    { id: 'backrest', slotId: 'frame', slotLabel: 'Oak frame', jointId: null, minX: -220, maxX: 220, minY: 465, maxY: 820, minZ: -230, maxZ: -175 }
  ];
  const seats = detectSeats(chairSpec, chairBoxes);
  assert.equal(seats.length, 1);
  assert.equal(seats[0].id, 'seat-pad');
  assert.equal(seats[0].seatY, 465);
  assert.ok(seats[0].nz > 0.9, 'Should face +Z away from -Z backrest');

  const linea = JSON.parse(await fs.readFile(new URL('../examples/linea.json', import.meta.url), 'utf8'));
  const wardrobe = JSON.parse(await fs.readFile(new URL('../private/primary-bedroom-joinery-v2.json', import.meta.url), 'utf8'));
  assert.equal(detectSeats(linea, makeBoxesFromSpec(linea).filter(b => !b.jointId)).length, 0);
  assert.equal(detectSeats(wardrobe, makeBoxesFromSpec(wardrobe).filter(b => !b.jointId)).length, 0);
});

test('computeInteractionTarget places stand position in open floor space for front and L-wing doors/drawers', async () => {
  const wardrobe = JSON.parse(await fs.readFile(new URL('../private/primary-bedroom-joinery-v2.json', import.meta.url), 'utf8'));
  const boxes = makeBoxesFromSpec(wardrobe);
  const staticBoxes = boxes.filter(b => !b.jointId);

  const bDoor = wardrobe.joints.find(j => j.id === 'b-door-1');
  const bDoorTarget = computeInteractionTarget({
    kind: 'joint',
    id: bDoor.id,
    label: bDoor.label,
    def: bDoor,
    targetBoxes: boxes.filter(b => b.jointId === bDoor.id),
    staticBoxes,
    pivot: bDoor.pivot
  });
  assert.ok(bDoorTarget.nz > 0.5, 'Wing B door approach faces +Z room courtyard');
  assert.ok(bDoorTarget.standZ > bDoorTarget.tz + 300);

  const aDoor = wardrobe.joints.find(j => j.id === 'a-door-1');
  const aDoorTarget = computeInteractionTarget({
    kind: 'joint',
    id: aDoor.id,
    label: aDoor.label,
    def: aDoor,
    targetBoxes: boxes.filter(b => b.jointId === aDoor.id),
    staticBoxes,
    pivot: aDoor.pivot
  });
  assert.ok(aDoorTarget.nx > 0.5, 'Wing A door approach faces +X inward into bedroom');
  assert.ok(aDoorTarget.standX > aDoorTarget.tx + 300);
});

test('planFloorPath routes around L-shaped cabinet obstacles cleanly without clipping walls', async () => {
  const wardrobe = JSON.parse(await fs.readFile(new URL('../private/primary-bedroom-joinery-v2.json', import.meta.url), 'utf8'));
  const staticBoxes = makeBoxesFromSpec(wardrobe).filter(b => !b.jointId);
  const path = planFloorPath([-1200, 1400], [1800, 200], staticBoxes, 240);
  assert.ok(path.length >= 1);
  const last = path[path.length - 1];
  assert.deepEqual(last, [1800, 200]);

  const lObstacles = [
    { id: 'wing-b', minX: -1000, maxX: 1000, minY: 0, maxY: 2000, minZ: -900, maxZ: -400 },
    { id: 'wing-a', minX: -1000, maxX: -500, minY: 0, maxY: 2000, minZ: -400, maxZ: 1200 }
  ];
  const detour = planFloorPath([-1500, -100], [-200, 600], lObstacles, 200);
  assert.ok(detour.length >= 2, 'Detours around L wing without walking through wing-a');
});

test('pickNextPersonAction avoids repeating last action and handles seated state', () => {
  const candidates = [
    { kind: 'joint', id: 'door', label: 'Left door' },
    { kind: 'joint', id: 'drawer', label: 'Upper drawer' }
  ];
  const picked = pickNextPersonAction({ candidates, lastActionId: 'door', rng: () => 0.1 });
  assert.equal(picked.id, 'drawer');

  const standFallback = pickNextPersonAction({ candidates: [], isSeated: true });
  assert.equal(standFallback.kind, 'stand');
});

test('resolveWalkStandPoint clamps far points and nudges points out of cabinet obstacles', () => {
  const staticBoxes = [
    { id: 'body', minX: -500, maxX: 500, minY: 0, maxY: 900, minZ: -300, maxZ: 300 }
  ];
  const bounds = { min: { x: -500, y: 0, z: -300 }, max: { x: 500, y: 900, z: 300 } };

  const open = resolveWalkStandPoint([120, 900], staticBoxes, bounds, 240);
  assert.equal(open.standX, 120);
  assert.equal(open.standZ, 900);

  const far = resolveWalkStandPoint([9000, 9000], staticBoxes, bounds, 240);
  assert.equal(far.standX, 2700);
  assert.equal(far.standZ, 2500);

  const inside = resolveWalkStandPoint([0, 260], staticBoxes, bounds, 240);
  assert.ok(inside.standZ >= 540, `Expected click inside padded front zone to nudge to >= 540, got ${inside.standZ}`);
});

test('person filters out hidden internal drawers behind closed doors and picks sweep-clear stand spots', async () => {
  const wardrobe = JSON.parse(await fs.readFile(new URL('../private/primary-bedroom-joinery-v2.json', import.meta.url), 'utf8'));
  const linea = JSON.parse(await fs.readFile(new URL('../examples/linea.json', import.meta.url), 'utf8'));

  const kinW = createKinematics(wardrobe);
  const wState = initialState(wardrobe);
  kinW.setDimensionsAndOptions(wState.dimensions, wState.options);

  // At rest, internal drawers behind closed doors are blocked around 13-14%; filtering requires >= 50% opening when blocked
  const eligibleIds = [];
  for (const j of wardrobe.joints) {
    const res = kinW.resolveJointMotion(j.id, 0, 1, wState.joints, { ignorePerson: true });
    if (res.blocked && Math.abs(res.progress - 0) < 0.5) continue;
    eligibleIds.push(j.id);
  }
  assert.equal(eligibleIds.some(id => id.includes('drawer')), false, 'Hidden drawers behind closed doors must be skipped');
  assert.ok(eligibleIds.includes('b-door-1'));

  const wBoxes = makeBoxesFromSpec(wardrobe);
  const bDoor = wardrobe.joints.find(j => j.id === 'b-door-1');
  const bDoorTarget = computeInteractionTarget({
    kind: 'joint',
    id: bDoor.id,
    label: bDoor.label,
    def: bDoor,
    targetBoxes: wBoxes.filter(b => b.jointId === bDoor.id),
    staticBoxes: wBoxes.filter(b => !b.jointId),
    pivot: bDoor.pivot,
    isStandClear: (sx, sz, yaw) => kinW.isPersonClearOfJointSweep(
      bDoor.id,
      0,
      1,
      wState.joints,
      makePersonOBB({ x: sx, z: sz, yaw, height: 1700, build: 'regular', seated: false })
    )
  });
  const chosenW = makePersonOBB({ x: bDoorTarget.standX, z: bDoorTarget.standZ, yaw: bDoorTarget.faceYaw, height: 1700, build: 'regular', seated: false });
  assert.equal(kinW.isPersonClearOfJointSweep(bDoor.id, 0, 1, wState.joints, chosenW), true);

  const kinL = createKinematics(linea);
  const lState = initialState(linea);
  kinL.setDimensionsAndOptions(lState.dimensions, lState.options);
  const lBoxes = makeBoxesFromSpec(linea);
  const lDoor = linea.joints.find(j => j.id === 'door');
  const lDoorTarget = computeInteractionTarget({
    kind: 'joint',
    id: lDoor.id,
    label: lDoor.label,
    def: lDoor,
    targetBoxes: lBoxes.filter(b => b.jointId === lDoor.id),
    staticBoxes: lBoxes.filter(b => !b.jointId),
    pivot: lDoor.pivot,
    isStandClear: (sx, sz, yaw) => kinL.isPersonClearOfJointSweep(
      lDoor.id,
      0,
      1,
      lState.joints,
      makePersonOBB({ x: sx, z: sz, yaw, height: 1700, build: 'regular', seated: false })
    )
  });
  const chosenL = makePersonOBB({ x: lDoorTarget.standX, z: lDoorTarget.standZ, yaw: lDoorTarget.faceYaw, height: 1700, build: 'regular', seated: false });
  assert.equal(kinL.isPersonClearOfJointSweep(lDoor.id, 0, 1, lState.joints, chosenL), true);
});

test('walking rolls through heel strike and toe-off without sinking or floating', () => {
  const person = makeMannequin();
  person.update({ visible: true, height: 1700, build: 'average', yaw: 0,
    skin: '#ad8265', top: '#55756e', bottom: '#565755' });
  const soles = [];
  person.root.traverse(object => {
    if (object.isMesh && object.material.color.getHex() === 0x57524d) soles.push(object);
  });
  assert.equal(soles.length, 2);
  const floor = new Box3();
  const pitches = [];
  for (let i = 0; i < 60; i++) {
    person.setMotion({ walkPhase: i * Math.PI / 30, walkBlend: 1 });
    person.root.updateMatrixWorld(true);
    assert.ok(Math.abs(Math.min(...soles.map(sole => floor.setFromObject(sole, true).min.y))) < 3,
      `one shoe touches the floor at frame ${i}`);
    pitches.push(soles[0].parent.getWorldDirection(new (person.root.position.constructor)()).y);
  }
  assert.ok(Math.min(...pitches) < -.08 && Math.max(...pitches) > .08, 'heel and toe lead at different points in the stride');
});

test('planFloorPath never walks through open doors even on 230+ part models or when start is inside door padding', async () => {
  assert.ok(AUTO_CLOSE_HOLD_SEC >= 2 && AUTO_CLOSE_HOLD_SEC <= 5);
  assert.ok(JOINT_AUTO_CLOSE_SEC >= 4 && JOINT_AUTO_CLOSE_SEC <= 10);

  const wardrobe = JSON.parse(await fs.readFile(new URL('../private/primary-bedroom-joinery-v2.json', import.meta.url), 'utf8'));
  const boxes = makeBoxesFromSpec(wardrobe);

  // Simulate b-door-1 swung 90 degrees open into the room (+Z from -230 to +506 at X = -720)
  const openDoorBox = {
    id: 'b-door-1-open-leaf',
    slotId: 'fronts',
    slotLabel: 'Fronts',
    jointId: 'b-door-1',
    minX: -742,
    maxX: -700,
    minY: 80,
    maxY: 2380,
    minZ: -230,
    maxZ: 510
  };
  const liveBoxes = [
    ...boxes.filter(b => b.jointId !== 'b-door-1'),
    openDoorBox
  ];

  // Start close to the left of the open door (within 240mm padding) and walk to the right side of the open door
  const start = [-910, 220];
  const goal = [-420, 220];
  const path = planFloorPath(start, goal, liveBoxes, 240);
  assert.ok(path.length >= 2, `Expected multi-waypoint detour around open door, got ${JSON.stringify(path)}`);

  // Verify no segment of the path crosses the physical open door panel
  let prev = start;
  for (const wp of path) {
    // Check 20 sample points along each segment against the physical open door leaf
    for (let k = 0; k <= 20; k++) {
      const u = k / 20;
      const px = prev[0] + (wp[0] - prev[0]) * u;
      const pz = prev[1] + (wp[1] - prev[1]) * u;
      const insideLeaf = px > openDoorBox.minX - 30 && px < openDoorBox.maxX + 30 &&
                         pz > openDoorBox.minZ - 10 && pz < openDoorBox.maxZ + 30;
      assert.equal(insideLeaf, false, `Path segment [${prev}] -> [${wp}] passed through open door leaf at (${px.toFixed(1)}, ${pz.toFixed(1)})`);
    }
    prev = wp;
  }

  // Verify clampPersonOutsideObstacles pushes a point out of the open door leaf
  const clamped = clampPersonOutsideObstacles(-720, 200, [openDoorBox], 165);
  const stillInside = clamped.x > openDoorBox.minX - 160 && clamped.x < openDoorBox.maxX + 160 &&
                      clamped.z > openDoorBox.minZ - 160 && clamped.z < openDoorBox.maxZ + 160;
  assert.equal(stillInside, false, 'clampPersonOutsideObstacles must push person clear of open door');
});

test('shelf accessibility classifies green (eye level), yellow (standing hand reach), and red (stool needed) proportionally to person height', async () => {
  const zones1700 = computePersonReachZones(1700);
  assert.equal(zones1700.eyeHeight, 1591);
  assert.equal(zones1700.eyeZoneMin, 850);
  assert.equal(zones1700.eyeZoneMax, 1641);
  assert.equal(zones1700.handReachMax, 2040);

  // At 1700 mm stature:
  // 1450 mm shelf -> green (eye level zone)
  const eyeShelf = classifyShelfAccessibility(1450, 1700);
  assert.equal(eyeShelf.zone, 'green');
  assert.equal(eyeShelf.color, REACH_ZONE_COLORS.green);

  // 1950 mm shelf -> yellow (standing hand reach)
  const reachShelf = classifyShelfAccessibility(1950, 1700);
  assert.equal(reachShelf.zone, 'yellow');
  assert.equal(reachShelf.color, REACH_ZONE_COLORS.yellow);

  // 2350 mm high wardrobe shelf -> red (stool needed)
  const highShelf = classifyShelfAccessibility(2350, 1700);
  assert.equal(highShelf.zone, 'red');
  assert.equal(highShelf.color, REACH_ZONE_COLORS.red);

  // Proportional scaling: for a shorter person (1400 mm), 1950 mm becomes red (stool needed)
  const highForShortPerson = classifyShelfAccessibility(1950, 1400);
  assert.equal(highForShortPerson.zone, 'red');

  // Verify shelf detection on primary-bedroom-joinery-v2.json identifies shelves across all three zones
  const wardrobe = JSON.parse(await fs.readFile(new URL('../private/primary-bedroom-joinery-v2.json', import.meta.url), 'utf8'));
  const dims = Object.fromEntries(Object.entries(wardrobe.dimensions).map(([k, v]) => [k, v.value]));
  const shelfZones = new Set();
  for (const part of wardrobe.parts) {
    const size = resolveVec(part.size, dims);
    const center = resolveVec(part.center, dims);
    if (isShelfLikePart(part, size, dims.height)) {
      const topY = center[1] + size[1] * 0.5;
      shelfZones.add(classifyShelfAccessibility(topY, 1700).zone);
    }
  }
  assert.equal(shelfZones.has('green'), true, 'Wardrobe has eye-level green shelves');
  assert.equal(shelfZones.has('yellow'), true, 'Wardrobe has standing-reach yellow shelves');
  assert.equal(shelfZones.has('red'), true, 'Wardrobe has high red shelves requiring a stool');
});
