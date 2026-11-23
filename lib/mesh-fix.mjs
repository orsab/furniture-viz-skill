import { resolveVec } from './coordinates.mjs';
import { validateSpec } from './spec.mjs';

const EPS = 0.5;

function isAxisAlignedMultipleOf90(rot) {
  return rot.every(deg => Math.abs(Math.round(deg / 90) * 90 - deg) < 1e-4);
}

function canUseExactBoxes(part) {
  return part.shape === 'box'
    && part.size.every(v => typeof v === 'number')
    && part.center.every(v => typeof v === 'number')
    && isAxisAlignedMultipleOf90(part.rotation);
}

function boxBounds(part, dims) {
  const [sx, sy, sz] = resolveVec(part.size, dims);
  const [cx, cy, cz] = resolveVec(part.center, dims);
  const ryMod = ((Math.round(part.rotation[1] / 90) % 4) + 4) % 4;
  const rxMod = ((Math.round(part.rotation[0] / 90) % 4) + 4) % 4;
  const rzMod = ((Math.round(part.rotation[2] / 90) % 4) + 4) % 4;
  if (rxMod !== 0 || rzMod !== 0) return null;
  const swapXZ = ryMod === 1 || ryMod === 3;
  const wx = swapXZ ? sz : sx;
  const wy = sy;
  const wz = swapXZ ? sx : sz;
  return {
    min: [cx - wx * 0.5, cy - wy * 0.5, cz - wz * 0.5],
    max: [cx + wx * 0.5, cy + wy * 0.5, cz + wz * 0.5],
    size: [wx, wy, wz],
    center: [cx, cy, cz],
    swapXZ
  };
}

function rulesCompatible(a, b) {
  for (const wa of a.when) {
    for (const wb of b.when) {
      if (wa.option === wb.option && wa.choice !== wb.choice) return false;
    }
  }
  return true;
}

function setWorldSpanOnAxis(part, worldAxis, newMin, newMax, box) {
  const newSize = Number((newMax - newMin).toFixed(3));
  const newCenter = Number(((newMin + newMax) * 0.5).toFixed(3));
  if (newSize <= 0.5) return false;
  part.center[worldAxis] = newCenter;
  if (worldAxis === 1) {
    part.size[1] = newSize;
  } else if (worldAxis === 0) {
    part.size[box.swapXZ ? 2 : 0] = newSize;
  } else {
    part.size[box.swapXZ ? 0 : 2] = newSize;
  }
  return true;
}

function uniquePartId(existingIds, base) {
  if (!existingIds.has(base)) {
    existingIds.add(base);
    return base;
  }
  let n = 2;
  while (existingIds.has(`${base}-${n}`)) n++;
  const id = `${base}-${n}`;
  existingIds.add(id);
  return id;
}

function isPrimaryStructure(part, box) {
  const id = part.id;
  if (/(?:^|-)(?:back|l|r|top|base|divider|side|panel|stile)/.test(id) && !/bottom$/.test(id)) return 2;
  const vol = box.size[0] * box.size[1] * box.size[2];
  return vol > 1_000_000 ? 1 : 0;
}

function chooseMover(partA, boxA, partB, boxB) {
  if (partA.joint && !partB.joint) return [partA, boxA, partB, boxB];
  if (partB.joint && !partA.joint) return [partB, boxB, partA, boxA];
  const priA = isPrimaryStructure(partA, boxA);
  const priB = isPrimaryStructure(partB, boxB);
  if (priA !== priB) return priA < priB ? [partA, boxA, partB, boxB] : [partB, boxB, partA, boxA];
  const volA = boxA.size[0] * boxA.size[1] * boxA.size[2];
  const volB = boxB.size[0] * boxB.size[1] * boxB.size[2];
  return volA <= volB ? [partA, boxA, partB, boxB] : [partB, boxB, partA, boxA];
}

function tryFixColumnNotch(spec, existingIds, obs, obsBox, board, boardBox, fixes) {
  if (obs.joint || board.joint) return false;
  const obsTall = obsBox.size[1] > 3 * Math.max(obsBox.size[0], obsBox.size[2]);
  if (!obsTall) return false;
  const spansY = obsBox.min[1] <= boardBox.min[1] + 1 && obsBox.max[1] >= boardBox.max[1] - 1;
  if (!spansY) return false;

  // Back panel clipped cleanly along X
  if (boardBox.size[2] <= 30 && Math.abs(obsBox.min[2] - boardBox.min[2]) <= 15) {
    const trimRight = obsBox.min[0] <= boardBox.min[0] + 1 && obsBox.max[0] < boardBox.max[0] - 20;
    const trimLeft = obsBox.max[0] >= boardBox.max[0] - 1 && obsBox.min[0] > boardBox.min[0] + 20;
    if (trimRight && setWorldSpanOnAxis(board, 0, obsBox.max[0], boardBox.max[0], boardBox)) {
      fixes.push({ action: 'trim', partId: board.id, againstId: obs.id, detail: `trimmed X min to ${obsBox.max[0]} mm around column` });
      return true;
    }
    if (trimLeft && setWorldSpanOnAxis(board, 0, boardBox.min[0], obsBox.min[0], boardBox)) {
      fixes.push({ action: 'trim', partId: board.id, againstId: obs.id, detail: `trimmed X max to ${obsBox.min[0]} mm around column` });
      return true;
    }
  }

  // Horizontal board notched at a corner by a column
  if (boardBox.size[1] <= 80 && !boardBox.swapXZ) {
    const flushLeft = obsBox.min[0] <= boardBox.min[0] + 1 && obsBox.max[0] < boardBox.max[0] - 20;
    const flushRight = obsBox.max[0] >= boardBox.max[0] - 1 && obsBox.min[0] > boardBox.min[0] + 20;
    const flushBack = obsBox.min[2] <= boardBox.min[2] + 1 && obsBox.max[2] < boardBox.max[2] - 20;
    const flushFront = obsBox.max[2] >= boardBox.max[2] - 1 && obsBox.min[2] > boardBox.min[2] + 20;

    if ((flushLeft || flushRight) && (flushBack || flushFront)) {
      const notchMinX = flushLeft ? boardBox.min[0] : obsBox.min[0];
      const notchMaxX = flushLeft ? obsBox.max[0] : boardBox.max[0];
      const remMinX = flushLeft ? obsBox.max[0] : boardBox.min[0];
      const remMaxX = flushLeft ? boardBox.max[0] : obsBox.min[0];
      const frontMinZ = flushBack ? obsBox.max[2] : boardBox.min[2];
      const frontMaxZ = flushBack ? boardBox.max[2] : obsBox.min[2];

      const suffix = flushBack ? 'front' : 'back';
      const pieceId = uniquePartId(existingIds, `${board.id}-${suffix}`);
      const frontPiece = {
        id: pieceId,
        shape: 'box',
        size: [Number((notchMaxX - notchMinX).toFixed(3)), board.size[1], Number((frontMaxZ - frontMinZ).toFixed(3))],
        center: [Number(((notchMinX + notchMaxX) * 0.5).toFixed(3)), board.center[1], Number(((frontMinZ + frontMaxZ) * 0.5).toFixed(3))],
        rotation: [0, 0, 0],
        slot: board.slot,
        joint: null,
        when: structuredClone(board.when),
        asset: null
      };
      setWorldSpanOnAxis(board, 0, remMinX, remMaxX, boardBox);
      spec.parts.push(frontPiece);
      fixes.push({ action: 'notch', partId: board.id, againstId: obs.id, detail: `notched around ${obs.id} and added ${pieceId}` });
      return true;
    }
  }
  return false;
}

function tryFixBoundaryOverlap(partA, boxA, partB, boxB, dims, fixes) {
  const [mover, mBox, anchor, aBox] = chooseMover(partA, boxA, partB, boxB);
  const candidates = [];
  for (let ax = 0; ax < 3; ax++) {
    const ov = Math.min(mBox.max[ax], aBox.max[ax]) - Math.max(mBox.min[ax], aBox.min[ax]);
    if (ov <= EPS || ov > 20) continue;
    const minDist = Math.abs(mBox.min[ax] - aBox.max[ax]);
    const maxDist = Math.abs(mBox.max[ax] - aBox.min[ax]);
    // Trim mover so its overlapping boundary meets anchor boundary flush at ov -> 0
    if (mBox.max[ax] > aBox.max[ax] && mBox.min[ax] >= aBox.min[ax] - 1) {
      candidates.push({ ax, ov, dir: +1, remain: mBox.max[ax] - aBox.max[ax] });
    } else if (mBox.min[ax] < aBox.min[ax] && mBox.max[ax] <= aBox.max[ax] + 1) {
      candidates.push({ ax, ov, dir: -1, remain: aBox.min[ax] - mBox.min[ax] });
    } else if (Math.min(minDist, maxDist) < mBox.size[ax] * 0.5) {
      const dir = mBox.center[ax] >= aBox.center[ax] ? +1 : -1;
      candidates.push({ ax, ov, dir, remain: mBox.size[ax] - ov });
    }
  }
  if (!candidates.length) return false;
  candidates.sort((u, v) => u.ov - v.ov);
  const best = candidates[0];
  if (best.remain < 1) return false;

  const isHardware = !mover.id.endsWith('-bottom') && !mover.id.endsWith('-base') && (
    /(?:pull|grip|knob|switch|led|toggle|rail)/.test(mover.id) || (mover.size[best.ax] <= 36 && mover.joint)
  );
  const envLimits = [dims.width * 0.5, dims.height, dims.depth * 0.5];
  if (isHardware && best.ov <= 6) {
    const nextMin = mBox.min[best.ax] + best.dir * best.ov;
    const nextMax = mBox.max[best.ax] + best.dir * best.ov;
    if (best.ax === 1 ? (nextMin >= 0 && nextMax <= envLimits[1] + 50) : true) {
      mover.center[best.ax] = Number((mover.center[best.ax] + best.dir * best.ov).toFixed(3));
      fixes.push({ action: 'shift', partId: mover.id, againstId: anchor.id, detail: `shifted ${'XYZ'[best.ax]} by ${(best.dir * best.ov).toFixed(1)} mm flush` });
      return true;
    }
  }

  const newMin = best.dir > 0 ? aBox.max[best.ax] : mBox.min[best.ax];
  const newMax = best.dir > 0 ? mBox.max[best.ax] : aBox.min[best.ax];
  if (!setWorldSpanOnAxis(mover, best.ax, newMin, newMax, mBox)) return false;
  fixes.push({ action: 'trim', partId: mover.id, againstId: anchor.id, detail: `trimmed ${'XYZ'[best.ax]} by ${best.ov.toFixed(1)} mm to flush with ${anchor.id}` });
  return true;
}

/**
 * Resolve static/same-joint volumetric mesh intersections and co-planar Z-fighting
 * across axis-aligned box parts (corner-column notching + flush boundary trimming).
 */
export function fixMeshCollisions(inputSpec) {
  const spec = structuredClone(inputSpec);
  const dims = {
    width: spec.dimensions.width.value,
    height: spec.dimensions.height.value,
    depth: spec.dimensions.depth.value
  };
  const fixes = [];
  const existingIds = new Set(spec.parts.map(p => p.id));

  for (let pass = 0; pass < 4; pass++) {
    let changed = false;
    const boxes = new Map();
    for (const p of spec.parts) {
      if (canUseExactBoxes(p)) {
        const b = boxBounds(p, dims);
        if (b) boxes.set(p.id, b);
      }
    }

    const snapshot = [...spec.parts];
    for (let i = 0; i < snapshot.length; i++) {
      const A = snapshot[i];
      const boxA = boxes.get(A.id);
      if (!boxA) continue;
      for (let j = i + 1; j < snapshot.length; j++) {
        const B = snapshot[j];
        const boxB = boxes.get(B.id);
        if (!boxB) continue;
        if (A.joint && B.joint && A.joint !== B.joint) continue;
        if (!rulesCompatible(A, B)) continue;

        const curA = boxBounds(A, dims);
        const curB = boxBounds(B, dims);
        if (!curA || !curB) continue;
        const ox = Math.min(curA.max[0], curB.max[0]) - Math.max(curA.min[0], curB.min[0]);
        const oy = Math.min(curA.max[1], curB.max[1]) - Math.max(curA.min[1], curB.min[1]);
        const oz = Math.min(curA.max[2], curB.max[2]) - Math.max(curA.min[2], curB.min[2]);
        if (ox <= EPS || oy <= EPS || oz <= EPS) continue;

        if (tryFixColumnNotch(spec, existingIds, A, curA, B, curB, fixes)
          || tryFixColumnNotch(spec, existingIds, B, curB, A, curA, fixes)
          || tryFixBoundaryOverlap(A, curA, B, curB, dims, fixes)) {
          changed = true;
        }
      }
    }
    if (!changed) break;
  }

  validateSpec(spec);
  return { spec, fixes };
}
