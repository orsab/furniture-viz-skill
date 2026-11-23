export const DEFAULT_ACTION_DELAY_MS = 10000;

const SEAT_RE = /chair|stool|bench|sofa|couch|seat|cushion|ottoman|armchair|loveseat|banquette|pouf|כיסא|כסא|ספסל|ספה|מושב|הדום/i;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function overlap1D(aMin, aMax, bMin, bMax, eps = 0) {
  return aMin < bMax - eps && aMax > bMin + eps;
}

export function detectSeats(spec, partBoxes) {
  if (!partBoxes?.length) return [];
  const specText = `${spec?.name || ''} ${spec?.description || ''}`;
  const specIsSeating = SEAT_RE.test(specText);
  const overallMaxY = partBoxes.reduce((m, b) => Math.max(m, b.maxY), 0);
  const hasJoints = (spec?.joints?.length ?? 0) > 0;

  const candidates = [];
  for (const b of partBoxes) {
    if (b.jointId) continue;
    const sizeX = b.maxX - b.minX;
    const sizeY = b.maxY - b.minY;
    const sizeZ = b.maxZ - b.minZ;
    const partText = `${b.id || ''} ${b.slotLabel || ''}`;
    const explicitMatch = specIsSeating || SEAT_RE.test(partText);
    const maxSeatTop = /stool|בר|כיסא בר/i.test(`${specText} ${partText}`) ? 820 : 620;
    const validExplicit = explicitMatch && sizeX >= 280 && sizeZ >= 260 && sizeY <= 220 && b.maxY >= 300 && b.maxY <= maxSeatTop;
    const validUnlabeled = !explicitMatch && !hasJoints && overallMaxY <= 1200 && sizeX >= 340 && sizeZ >= 300 && sizeY <= 140 && b.maxY >= 360 && b.maxY <= 520;
    if (!validExplicit && !validUnlabeled) continue;

    const cx = (b.minX + b.maxX) * 0.5;
    const cz = (b.minZ + b.maxZ) * 0.5;

    // Skip surfaces blocked directly overhead (e.g. a shelf/countertop above a cabinet).
    let obstructedAbove = false;
    for (const o of partBoxes) {
      if (o.id === b.id) continue;
      if (o.minY >= b.maxY - 10 && o.minY <= b.maxY + 750) {
        if (overlap1D(cx - 60, cx + 60, o.minX, o.maxX) && overlap1D(cz - 60, cz + 60, o.minZ, o.maxZ)) {
          obstructedAbove = true;
          break;
        }
      }
    }
    if (obstructedAbove) continue;

    // Detect backrest side to orient seated figure outward cleanly.
    const backScores = [
      { nx: 0, nz: 1, edge: 'minZ' },
      { nx: 0, nz: -1, edge: 'maxZ' },
      { nx: 1, nz: 0, edge: 'minX' },
      { nx: -1, nz: 0, edge: 'maxX' }
    ];
    let bestDir = { nx: 0, nz: 1 };
    let bestScore = 0;
    for (const o of partBoxes) {
      if (o.id === b.id || o.maxY < b.maxY + 180) continue;
      for (const d of backScores) {
        let hit = false;
        let overlapSpan = 0;
        if (d.edge === 'minZ' && o.maxZ <= b.minZ + 140 && o.minZ >= b.minZ - 260 && overlap1D(b.minX + 30, b.maxX - 30, o.minX, o.maxX)) {
          hit = true;
          overlapSpan = Math.min(b.maxX, o.maxX) - Math.max(b.minX, o.minX);
        } else if (d.edge === 'maxZ' && o.minZ >= b.maxZ - 140 && o.maxZ <= b.maxZ + 260 && overlap1D(b.minX + 30, b.maxX - 30, o.minX, o.maxX)) {
          hit = true;
          overlapSpan = Math.min(b.maxX, o.maxX) - Math.max(b.minX, o.minX);
        } else if (d.edge === 'minX' && o.maxX <= b.minX + 140 && o.minX >= b.minX - 260 && overlap1D(b.minZ + 30, b.maxZ - 30, o.minZ, o.maxZ)) {
          hit = true;
          overlapSpan = Math.min(b.maxZ, o.maxZ) - Math.max(b.minZ, o.minZ);
        } else if (d.edge === 'maxX' && o.minX >= b.maxX - 140 && o.maxX <= b.maxX + 260 && overlap1D(b.minZ + 30, b.maxZ - 30, o.minZ, o.maxZ)) {
          hit = true;
          overlapSpan = Math.min(b.maxZ, o.maxZ) - Math.max(b.minZ, o.minZ);
        }
        if (hit) {
          const sc = overlapSpan * (o.maxY - b.maxY);
          if (sc > bestScore) {
            bestScore = sc;
            bestDir = { nx: d.nx, nz: d.nz };
          }
        }
      }
    }

    const { nx, nz } = bestDir;
    const spanAlong = Math.abs(nx) > 0.5 ? sizeX : sizeZ;
    const seatX = cx + nx * Math.min(45, sizeX * 0.1);
    const seatZ = cz + nz * Math.min(45, sizeZ * 0.1);
    const approachX = cx + nx * (spanAlong * 0.5 + 340);
    const approachZ = cz + nz * (spanAlong * 0.5 + 340);
    const faceYaw = Math.atan2(nx, nz);

    candidates.push({
      id: b.id,
      label: b.slotLabel || b.id,
      seatX,
      seatY: b.maxY,
      seatZ,
      faceYaw,
      nx,
      nz,
      approachX,
      approachZ
    });
  }

  // Deduplicate stacked seat frames/cushions within 180 mm in XZ, preferring higher cushion surface.
  candidates.sort((a, b) => b.seatY - a.seatY);
  const deduped = [];
  for (const s of candidates) {
    if (!deduped.some(e => Math.hypot(e.seatX - s.seatX, e.seatZ - s.seatZ) < 180)) {
      deduped.push(s);
    }
  }
  return deduped;
}

function unionBoxes(boxes) {
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  for (const b of boxes) {
    if (b.minX < minX) minX = b.minX;
    if (b.minY < minY) minY = b.minY;
    if (b.minZ < minZ) minZ = b.minZ;
    if (b.maxX > maxX) maxX = b.maxX;
    if (b.maxY > maxY) maxY = b.maxY;
    if (b.maxZ > maxZ) maxZ = b.maxZ;
  }
  return {
    minX, minY, minZ, maxX, maxY, maxZ,
    cx: (minX + maxX) * 0.5,
    cy: (minY + maxY) * 0.5,
    cz: (minZ + maxZ) * 0.5,
    sx: maxX - minX,
    sy: maxY - minY,
    sz: maxZ - minZ
  };
}

function buildWalkObstacles(staticBoxes, personRadius = 240) {
  const obs = [];
  for (const b of staticBoxes || []) {
    if (b.minY > 2100 || b.maxY < 20) continue;
    const sx = b.maxX - b.minX;
    const sz = b.maxZ - b.minZ;
    if (sx < 40 && sz < 40 && b.maxY < 200) continue;
    obs.push({
      minX: b.minX - personRadius,
      maxX: b.maxX + personRadius,
      minZ: b.minZ - personRadius,
      maxZ: b.maxZ + personRadius
    });
  }
  return obs;
}

function pointInsideAny(px, pz, boxes, eps = 1) {
  for (const b of boxes) {
    if (px > b.minX + eps && px < b.maxX - eps && pz > b.minZ + eps && pz < b.maxZ - eps) return true;
  }
  return false;
}

export function computeInteractionTarget({ kind, id, label, def, targetBoxes, staticBoxes = [], pivot = null }) {
  if (!targetBoxes?.length) return null;
  const overall = unionBoxes(targetBoxes);
  const hw = targetBoxes.filter(b => b.slotId === 'hardware' || Math.max(b.maxX - b.minX, b.maxY - b.minY, b.maxZ - b.minZ) <= 220);
  const aim = hw.length ? unionBoxes(hw) : overall;

  const tx = aim.cx;
  const ty = aim.cy;
  const tz = aim.cz;

  const testBoxes = (staticBoxes || []).filter(b => b.minY <= 2100 && b.maxY >= 80);
  const pickClearDir = dirs => {
    for (const [cx, cz] of dirs) {
      const px = tx + cx * 480;
      const pz = tz + cz * 480;
      if (!pointInsideAny(px, pz, testBoxes, -160)) return [cx, cz];
    }
    return dirs[0];
  };

  let nx = 0, nz = 1;
  if (kind === 'joint' && def) {
    if (def.type === 'slide') {
      nx = 0;
      nz = Math.sign(def.travel) || 1;
    } else if (def.type === 'slide-x') {
      nx = Math.sign(def.travel) || 1;
      nz = 0;
    } else if (def.type === 'flap') {
      const dirs = overall.sz <= overall.sx ? [[0, 1], [0, -1]] : [[1, 0], [-1, 0]];
      [nx, nz] = pickClearDir(dirs);
    } else if (def.type === 'hinge') {
      const dirs = overall.sz <= overall.sx ? [[0, 1], [0, -1]] : [[1, 0], [-1, 0]];
      [nx, nz] = pickClearDir(dirs);
    } else {
      [nx, nz] = pickClearDir([[0, 1], [1, 0], [-1, 0], [0, -1]]);
    }
  } else {
    [nx, nz] = pickClearDir([[0, 1], [1, 0], [-1, 0], [0, -1]]);
  }

  const offsetDist = kind === 'switch'
    ? 460
    : (def?.type === 'slide' || def?.type === 'slide-x')
      ? 600
      : 560;

  let standX = tx + nx * offsetDist;
  let standZ = tz + nz * offsetDist;

  if (kind === 'joint' && def?.type === 'hinge' && Array.isArray(pivot)) {
    if (Math.abs(nz) > 0.5) {
      const s = Math.sign(tx - pivot[0]) || 1;
      standX += s * 140;
    } else {
      const s = Math.sign(tz - pivot[2]) || 1;
      standZ += s * 140;
    }
  }

  // Nudge outward if stand spot still touches carcass obstacle padding.
  const obs = buildWalkObstacles(staticBoxes, 220);
  for (let step = 0; step < 3; step++) {
    if (!pointInsideAny(standX, standZ, obs, 4)) break;
    standX += nx * 160;
    standZ += nz * 160;
  }

  const faceYaw = Math.atan2(tx - standX, tz - standZ);
  const reachY = clamp(ty, 450, 1650);
  return { kind, id, label, tx, ty, tz, standX, standZ, faceYaw, nx, nz, reachY };
}

function segmentIntersectsRect(x1, z1, x2, z2, r) {
  let t0 = 0, t1 = 1;
  const dx = x2 - x1;
  const dz = z2 - z1;
  const checks = [
    [-dx, x1 - r.minX],
    [dx, r.maxX - x1],
    [-dz, z1 - r.minZ],
    [dz, r.maxZ - z1]
  ];
  for (const [p, q] of checks) {
    if (Math.abs(p) < 1e-8) {
      if (q <= 0) return false;
    } else {
      const t = q / p;
      if (p < 0) {
        if (t > t1) return false;
        if (t > t0) t0 = t;
      } else {
        if (t < t0) return false;
        if (t < t1) t1 = t;
      }
    }
  }
  return t0 < t1 - 1e-4;
}

function segmentBlocked(a, b, obs) {
  for (const r of obs) {
    if (segmentIntersectsRect(a[0], a[1], b[0], b[1], r)) return true;
  }
  return false;
}

export function planFloorPath(fromXZ, toXZ, staticBoxes = [], personRadius = 240) {
  const start = [fromXZ[0], fromXZ[1]];
  const goal = [toXZ[0], toXZ[1]];
  if (Math.hypot(goal[0] - start[0], goal[1] - start[1]) < 5) return [goal];

  const obs = buildWalkObstacles(staticBoxes, personRadius);
  // Exclude obstacles enclosing start or goal so edge departures never lock.
  const activeObs = obs.filter(r => !pointInsideAny(start[0], start[1], [r], 0) && !pointInsideAny(goal[0], goal[1], [r], 0));
  if (!segmentBlocked(start, goal, activeObs)) return [goal];

  const rawCandidates = [
    [start[0], goal[1]],
    [goal[0], start[1]]
  ];
  const margin = 40;
  let allMinX = Infinity, allMaxX = -Infinity, allMinZ = Infinity, allMaxZ = -Infinity;
  for (const r of activeObs) {
    if (r.minX < allMinX) allMinX = r.minX;
    if (r.maxX > allMaxX) allMaxX = r.maxX;
    if (r.minZ < allMinZ) allMinZ = r.minZ;
    if (r.maxZ > allMaxZ) allMaxZ = r.maxZ;
    rawCandidates.push(
      [r.minX - margin, r.minZ - margin],
      [r.maxX + margin, r.minZ - margin],
      [r.minX - margin, r.maxZ + margin],
      [r.maxX + margin, r.maxZ + margin]
    );
  }
  if (Number.isFinite(allMinX)) {
    rawCandidates.push(
      [allMinX - 180, allMinZ - 180],
      [allMaxX + 180, allMinZ - 180],
      [allMinX - 180, allMaxZ + 180],
      [allMaxX + 180, allMaxZ + 180]
    );
  }

  const nodes = [start];
  const seen = new Set();
  for (const pt of rawCandidates) {
    if (pointInsideAny(pt[0], pt[1], activeObs, 0)) continue;
    const key = `${Math.round(pt[0] / 120)}:${Math.round(pt[1] / 120)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    nodes.push(pt);
    if (nodes.length >= 44) break;
  }
  nodes.push(goal);

  const n = nodes.length;
  const goalIdx = n - 1;
  const dist = new Float64Array(n).fill(Infinity);
  const prev = new Int32Array(n).fill(-1);
  const visited = new Uint8Array(n);
  dist[0] = 0;

  for (let step = 0; step < n; step++) {
    let u = -1;
    let best = Infinity;
    for (let i = 0; i < n; i++) {
      if (!visited[i] && dist[i] < best) { best = dist[i]; u = i; }
    }
    if (u < 0 || u === goalIdx) break;
    visited[u] = 1;
    for (let v = 0; v < n; v++) {
      if (visited[v] || u === v) continue;
      if (segmentBlocked(nodes[u], nodes[v], activeObs)) continue;
      const alt = dist[u] + Math.hypot(nodes[v][0] - nodes[u][0], nodes[v][1] - nodes[u][1]);
      if (alt < dist[v]) {
        dist[v] = alt;
        prev[v] = u;
      }
    }
  }

  if (!Number.isFinite(dist[goalIdx])) return [goal];
  const path = [];
  for (let cur = goalIdx; cur > 0; cur = prev[cur]) {
    path.push(nodes[cur]);
    if (prev[cur] < 0) break;
  }
  path.reverse();
  return path.length ? path : [goal];
}

export function pickNextPersonAction({ candidates = [], lastActionId = null, isSeated = false, rng = Math.random } = {}) {
  if (!candidates.length) {
    return isSeated ? { kind: 'stand', id: '__stand__', label: 'Reference person' } : null;
  }
  const pool = candidates.length > 1 && lastActionId
    ? candidates.filter(c => c.id !== lastActionId)
    : candidates;
  const list = pool.length ? pool : candidates;
  const idx = Math.floor(clamp(rng(), 0, 0.999999) * list.length);
  return list[idx];
}
