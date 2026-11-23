export const DEFAULT_ACTION_DELAY_MS = 10000;
export const AUTO_CLOSE_HOLD_SEC = 2.6;
export const JOINT_AUTO_CLOSE_SEC = 6.5;

export const REACH_ZONE_COLORS = {
  green: '#2b9358',
  yellow: '#d89b1d',
  red: '#c93b2b'
};

const SHELF_ID_RE = /shelf|מדף/i;
const NON_SHELF_ID_RE = /(?:^|[-_])(top|base|bottom|plinth|ceiling|roof|back|side|divider|door|front|pull|knob|handle|rail|rod|wall|face|bed|strip|led|plate|toggle|sink|basin|tap|faucet|mirror|frame|leg|foot|post|apron|skirt)(?:$|[-_])/i;

export function computePersonReachZones(personHeight = 1700) {
  const h = Math.max(900, Math.min(2400, Number(personHeight) || 1700));
  // Anthropometric proportions relative to standing stature H:
  // - Eye height: ~0.936 * H (e.g. 1591 mm at H = 1700 mm)
  // - Comfortable standing eye/chest shelf zone (green): waist/elbow (~0.50 * H) to eye level + 3% (~0.965 * H)
  // - Standing hand reach zone (yellow): below waist (down to ~0.12 * H) or overhead reach up to ~1.20 * H (e.g. 2040 mm at H = 1700 mm)
  // - Step-stool required zone (red): above standing hand reach (> 1.20 * H)
  const eyeHeight = Math.round(h * 0.936);
  const shoulderHeight = Math.round(h * 0.818);
  const eyeZoneMin = Math.round(h * 0.50);
  const eyeZoneMax = Math.round(h * 0.965);
  const handReachMin = Math.round(h * 0.10);
  const handReachMax = Math.round(h * 1.20);
  return {
    personHeight: h,
    eyeHeight,
    shoulderHeight,
    eyeZoneMin,
    eyeZoneMax,
    handReachMin,
    handReachMax
  };
}

export function isShelfLikePart(partDef, size, enclosureHeight = 0) {
  if (!partDef || !Array.isArray(size) || size.length < 3) return false;
  if (partDef.joint) return false;
  if (partDef.shape && partDef.shape !== 'box') return false;
  const [sx, sy, sz] = size;
  const id = String(partDef.id || '');
  const explicitShelf = SHELF_ID_RE.test(id);
  if (explicitShelf) {
    return sy <= 80 && sx >= 140 && sz >= 120;
  }
  if (NON_SHELF_ID_RE.test(id)) return false;
  const isHorizontalBoard = sy >= 8 && sy <= 50 && sx >= 220 && sz >= 160 && sx > sy * 4 && sz > sy * 3;
  if (!isHorizontalBoard) return false;
  return true;
}

export function classifyShelfAccessibility(shelfHeightMm, personHeight = 1700) {
  const z = computePersonReachZones(personHeight);
  const y = Number(shelfHeightMm) || 0;
  if (y > z.handReachMax) {
    return {
      zone: 'red',
      color: REACH_ZONE_COLORS.red,
      shelfHeight: Math.round(y),
      ...z
    };
  }
  if (y >= z.eyeZoneMin && y <= z.eyeZoneMax) {
    return {
      zone: 'green',
      color: REACH_ZONE_COLORS.green,
      shelfHeight: Math.round(y),
      ...z
    };
  }
  return {
    zone: 'yellow',
    color: REACH_ZONE_COLORS.yellow,
    shelfHeight: Math.round(y),
    ...z
  };
}

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
      maxZ: b.maxZ + personRadius,
      jointId: b.jointId ?? null,
      span: Math.max(sx, sz)
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

export function clampPersonOutsideObstacles(x, z, boxes = [], personRadius = 185) {
  let sx = x;
  let sz = z;
  const obs = buildWalkObstacles(boxes, personRadius);
  for (let pass = 0; pass < 5; pass++) {
    const hit = obs.find(r => sx > r.minX + 1 && sx < r.maxX - 1 && sz > r.minZ + 1 && sz < r.maxZ - 1);
    if (!hit) break;
    const escapes = [
      [hit.minX - 6, sz, Math.abs(sx - (hit.minX - 6))],
      [hit.maxX + 6, sz, Math.abs(sx - (hit.maxX + 6))],
      [sx, hit.minZ - 6, Math.abs(sz - (hit.minZ - 6))],
      [sx, hit.maxZ + 6, Math.abs(sz - (hit.maxZ + 6))]
    ].sort((a, b) => a[2] - b[2]);
    sx = escapes[0][0];
    sz = escapes[0][1];
  }
  return { x: sx, z: sz };
}

export function computeInteractionTarget({
  kind,
  id,
  label,
  def,
  targetBoxes,
  staticBoxes = [],
  movingObstacles = [],
  pivot = null,
  isStandClear = null
}) {
  if (!targetBoxes?.length) return null;
  const overall = unionBoxes(targetBoxes);
  const hw = targetBoxes.filter(b => b.slotId === 'hardware' || Math.max(b.maxX - b.minX, b.maxY - b.minY, b.maxZ - b.minZ) <= 220);
  const aim = hw.length ? unionBoxes(hw) : overall;

  const tx = aim.cx;
  const ty = aim.cy;
  const tz = aim.cz;

  const testBoxes = [...(staticBoxes || []), ...(movingObstacles || [])].filter(b => b.minY <= 2100 && b.maxY >= 80);
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

  // Include targetBoxes in obs so stand candidates never land inside an already-open door or drawer leaf.
  const obs = buildWalkObstacles([...(staticBoxes || []), ...(movingObstacles || []), ...targetBoxes], 220);
  let latX = 0, latZ = 0;
  if (Math.abs(nz) > 0.5) {
    latX = Array.isArray(pivot) ? (Math.sign(tx - pivot[0]) || 1) : 1;
  } else {
    latZ = Array.isArray(pivot) ? (Math.sign(tz - pivot[2]) || 1) : 1;
  }

  const candidatesXZ = [];
  if (kind === 'joint' && def?.type === 'hinge') {
    const leafSpan = Math.max(overall.sx, overall.sz);
    candidatesXZ.push(
      [tx + nx * 520 + latX * 260, tz + nz * 520 + latZ * 260],
      [tx + nx * 680 + latX * 320, tz + nz * 680 + latZ * 320],
      [tx + nx * 820 + latX * 280, tz + nz * 820 + latZ * 280],
      [tx + nx * Math.max(660, leafSpan + 280), tz + nz * Math.max(660, leafSpan + 280)],
      [tx + nx * 680 - latX * 300, tz + nz * 680 - latZ * 300],
      [tx + nx * Math.max(850, leafSpan + 380), tz + nz * Math.max(850, leafSpan + 380)],
      [overall.cx + nx * 560, overall.cz + nz * 560],
      [overall.cx - nx * 560, overall.cz - nz * 560]
    );
  } else if (kind === 'joint' && (def?.type === 'slide' || def?.type === 'slide-x')) {
    const pullDist = Math.abs(def.travel) + 340;
    const perpX = -nz, perpZ = nx;
    candidatesXZ.push(
      [tx + nx * (pullDist * 0.78) + perpX * 220, tz + nz * (pullDist * 0.78) + perpZ * 220],
      [tx + nx * (pullDist * 0.78) - perpX * 220, tz + nz * (pullDist * 0.78) - perpZ * 220],
      [tx + nx * pullDist, tz + nz * pullDist],
      [tx + nx * (pullDist + 180), tz + nz * (pullDist + 180)]
    );
  } else if (kind === 'joint' && def?.type === 'flap') {
    const perpX = -nz, perpZ = nx;
    candidatesXZ.push(
      [tx + nx * 680, tz + nz * 680],
      [tx + nx * 580 + perpX * 260, tz + nz * 580 + perpZ * 260],
      [tx + nx * 580 - perpX * 260, tz + nz * 580 - perpZ * 260],
      [tx + nx * 860, tz + nz * 860]
    );
  } else {
    const baseDist = kind === 'switch' ? 460 : 560;
    candidatesXZ.push(
      [tx + nx * baseDist, tz + nz * baseDist],
      [tx + nx * (baseDist + 160), tz + nz * (baseDist + 160)]
    );
  }

  let chosen = null;
  // 1. Prefer a spot clear of floor obstacles AND outside the joint sweep arc.
  for (const [cx, cz] of candidatesXZ) {
    if (pointInsideAny(cx, cz, obs, 4)) continue;
    const yaw = Math.atan2(tx - cx, tz - cz);
    if (!isStandClear || isStandClear(cx, cz, yaw)) {
      chosen = [cx, cz];
      break;
    }
  }
  // 2. Fallback: first spot clear of static + open obstacles.
  if (!chosen) {
    for (const [cx, cz] of candidatesXZ) {
      if (!pointInsideAny(cx, cz, obs, 4)) {
        chosen = [cx, cz];
        break;
      }
    }
  }
  // 3. Final fallback: primary offset nudged outward out of obstacle padding.
  if (!chosen) {
    let sx = candidatesXZ[0][0], sz = candidatesXZ[0][1];
    for (let step = 0; step < 5; step++) {
      if (!pointInsideAny(sx, sz, obs, 4)) break;
      sx += nx * 160;
      sz += nz * 160;
    }
    const clamped = clampPersonOutsideObstacles(sx, sz, [...(staticBoxes || []), ...(movingObstacles || []), ...targetBoxes], 210);
    chosen = [clamped.x, clamped.z];
  }

  const [standX, standZ] = chosen;
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

function solveShortestPath(start, goal, obsList) {
  if (!segmentBlocked(start, goal, obsList)) return [goal];

  // Prioritize moving door/drawer obstacles first, then larger structural panels, so open doors always contribute corner waypoints.
  const sortedObs = [...obsList].sort((a, b) => {
    const aj = a.jointId ? 1 : 0;
    const bj = b.jointId ? 1 : 0;
    if (aj !== bj) return bj - aj;
    return (b.span || 0) - (a.span || 0);
  });

  const rawCandidates = [
    [start[0], goal[1]],
    [goal[0], start[1]]
  ];
  const margin = 36;
  let allMinX = Infinity, allMaxX = -Infinity, allMinZ = Infinity, allMaxZ = -Infinity;
  for (const r of sortedObs) {
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
    if (r.jointId) {
      rawCandidates.push(
        [r.minX - 110, r.minZ - 110],
        [r.maxX + 110, r.minZ - 110],
        [r.minX - 110, r.maxZ + 110],
        [r.maxX + 110, r.maxZ + 110],
        [(r.minX + r.maxX) * 0.5, r.maxZ + 110],
        [(r.minX + r.maxX) * 0.5, r.minZ - 110],
        [r.maxX + 110, (r.minZ + r.maxZ) * 0.5],
        [r.minX - 110, (r.minZ + r.maxZ) * 0.5]
      );
    }
  }
  if (Number.isFinite(allMinX)) {
    const midX = (allMinX + allMaxX) * 0.5;
    const midZ = (allMinZ + allMaxZ) * 0.5;
    rawCandidates.push(
      [allMinX - 180, allMinZ - 180],
      [allMaxX + 180, allMinZ - 180],
      [allMinX - 180, allMaxZ + 180],
      [allMaxX + 180, allMaxZ + 180],
      [midX, allMaxZ + 260],
      [allMaxX + 260, midZ],
      [allMinX - 260, midZ],
      [midX, allMinZ - 260]
    );
  }

  const nodes = [start];
  const seen = new Set();
  for (const pt of rawCandidates) {
    if (pointInsideAny(pt[0], pt[1], sortedObs, 0)) continue;
    const key = `${Math.round(pt[0] / 85)}:${Math.round(pt[1] / 85)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    nodes.push(pt);
    if (nodes.length >= 160) break;
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
      if (segmentBlocked(nodes[u], nodes[v], sortedObs)) continue;
      const alt = dist[u] + Math.hypot(nodes[v][0] - nodes[u][0], nodes[v][1] - nodes[u][1]);
      if (alt < dist[v]) {
        dist[v] = alt;
        prev[v] = u;
      }
    }
  }

  if (!Number.isFinite(dist[goalIdx])) return null;
  const path = [];
  for (let cur = goalIdx; cur > 0; cur = prev[cur]) {
    path.push(nodes[cur]);
    if (prev[cur] < 0) break;
  }
  path.reverse();
  return path.length ? path : [goal];
}

export function planFloorPath(fromXZ, toXZ, staticBoxes = [], personRadius = 240) {
  const rawStart = [fromXZ[0], fromXZ[1]];
  const rawGoal = [toXZ[0], toXZ[1]];
  if (Math.hypot(rawGoal[0] - rawStart[0], rawGoal[1] - rawStart[1]) < 5) return [rawGoal];

  // Never discard obstacles containing start or goal. Instead, shrink only the padding of obstacles that enclose start/goal to a tight physical core so the door/panel leaf remains solid.
  const fullObs = buildWalkObstacles(staticBoxes, personRadius);
  const coreRadius = Math.min(85, Math.max(35, personRadius * 0.35));
  const coreObs = buildWalkObstacles(staticBoxes, coreRadius);

  const adaptiveObs = fullObs.map((r, idx) => {
    const hitsStart = pointInsideAny(rawStart[0], rawStart[1], [r], 0);
    const hitsGoal = pointInsideAny(rawGoal[0], rawGoal[1], [r], 0);
    if (!hitsStart && !hitsGoal) return r;
    const c = coreObs[idx];
    if (!pointInsideAny(rawStart[0], rawStart[1], [c], 0) && !pointInsideAny(rawGoal[0], rawGoal[1], [c], 0)) {
      return c;
    }
    // Even if start/goal was placed right on the panel edge, keep the physical unpadded panel solid if possible.
    const raw = buildWalkObstacles([staticBoxes[idx]], 12)[0];
    if (raw && !pointInsideAny(rawStart[0], rawStart[1], [raw], 0) && !pointInsideAny(rawGoal[0], rawGoal[1], [raw], 0)) {
      return raw;
    }
    return null;
  }).filter(Boolean);

  const primary = solveShortestPath(rawStart, rawGoal, adaptiveObs);
  if (primary) return primary;

  // Retry with tighter body clearance so narrow gaps around open doors remain navigable without ever walking through doors.
  const tightObs = coreObs.filter(r => !pointInsideAny(rawStart[0], rawStart[1], [r], 0) && !pointInsideAny(rawGoal[0], rawGoal[1], [r], 0));
  const secondary = solveShortestPath(rawStart, rawGoal, tightObs);
  if (secondary) return secondary;

  // Final safety detour around the front perimeter of all obstacles.
  if (tightObs.length) {
    let maxZ = -Infinity, minX = Infinity, maxX = -Infinity;
    for (const r of tightObs) {
      if (r.maxZ > maxZ) maxZ = r.maxZ;
      if (r.minX < minX) minX = r.minX;
      if (r.maxX > maxX) maxX = r.maxX;
    }
    const safeZ = maxZ + 320;
    return [
      [clamp(rawStart[0], minX - 320, maxX + 320), safeZ],
      [clamp(rawGoal[0], minX - 320, maxX + 320), safeZ],
      rawGoal
    ];
  }
  return [rawGoal];
}

export function resolveWalkStandPoint(pointXZ, staticBoxes = [], furnitureBounds = null, personRadius = 240) {
  let sx = pointXZ[0];
  let sz = pointXZ[1];
  let cx = 0;
  let cz = 0;
  const hasBounds = furnitureBounds &&
    Number.isFinite(furnitureBounds.min?.x) &&
    Number.isFinite(furnitureBounds.max?.x) &&
    Number.isFinite(furnitureBounds.min?.z) &&
    Number.isFinite(furnitureBounds.max?.z);
  if (hasBounds) {
    cx = (furnitureBounds.min.x + furnitureBounds.max.x) * 0.5;
    cz = (furnitureBounds.min.z + furnitureBounds.max.z) * 0.5;
    sx = clamp(sx, furnitureBounds.min.x - 2200, furnitureBounds.max.x + 2200);
    sz = clamp(sz, furnitureBounds.min.z - 2200, furnitureBounds.max.z + 2200);
  }

  const obs = buildWalkObstacles(staticBoxes, personRadius);
  for (let pass = 0; pass < 4; pass++) {
    const hit = obs.find(r => sx > r.minX + 1 && sx < r.maxX - 1 && sz > r.minZ + 1 && sz < r.maxZ - 1);
    if (!hit) break;
    const escapes = [
      [hit.minX - 10, sz, Math.abs(sx - (hit.minX - 10))],
      [hit.maxX + 10, sz, Math.abs(sx - (hit.maxX + 10))],
      [sx, hit.minZ - 10, Math.abs(sz - (hit.minZ - 10))],
      [sx, hit.maxZ + 10, Math.abs(sz - (hit.maxZ + 10))]
    ].sort((a, b) => a[2] - b[2]);
    sx = escapes[0][0];
    sz = escapes[0][1];
  }

  const faceYaw = hasBounds ? Math.atan2(cx - sx, cz - sz) : 0;
  return { standX: sx, standZ: sz, faceYaw };
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
