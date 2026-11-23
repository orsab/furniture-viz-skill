import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {
  DEFAULT_ACTION_DELAY_MS,
  detectSeats,
  computeInteractionTarget,
  planFloorPath,
  pickNextPersonAction
} from '../app/person-ai.mjs';
import { resolveVec } from '../lib/coordinates.mjs';

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
