import { resolveVec } from './coordinates.mjs';

const DEG_TO_RAD = Math.PI / 180;
const EPS = 1e-6;

export const JOINT_PHYSICS = {
  hinge: { stiffness: 74, damping: 15.2, maxSpeed: 3.4, softCloseZone: 0.14, softCloseDamp: 14, bounce: 0.14 },
  flap: { stiffness: 64, damping: 14.5, maxSpeed: 3.0, softCloseZone: 0.16, softCloseDamp: 14, bounce: 0.10 },
  slide: { stiffness: 105, damping: 19.0, maxSpeed: 4.2, softCloseZone: 0.12, softCloseDamp: 16, bounce: 0.12 },
  'slide-x': { stiffness: 95, damping: 18.0, maxSpeed: 3.8, softCloseZone: 0.12, softCloseDamp: 14, bounce: 0.12 },
  lift: { stiffness: 70, damping: 15.5, maxSpeed: 3.0, softCloseZone: 0.14, softCloseDamp: 14, bounce: 0.08 }
};

function clamp(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

function dot3(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

// Compute orthonormal basis columns for Three.js XYZ Euler angles in radians.
function eulerXYZBasis(rx, ry, rz) {
  const a = Math.cos(rx), b = Math.sin(rx);
  const c = Math.cos(ry), d = Math.sin(ry);
  const e = Math.cos(rz), f = Math.sin(rz);
  const ae = a * e, af = a * f, be = b * e, bf = b * f;
  return [
    [c * e, af + be * d, bf - ae * d],
    [-c * f, ae - bf * d, be + af * d],
    [d, -b * c, a * c]
  ];
}

function rotateY(v, theta) {
  const c = Math.cos(theta), s = Math.sin(theta);
  return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c];
}

function rotateX(v, theta) {
  const c = Math.cos(theta), s = Math.sin(theta);
  return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c];
}

// Compute world-space OBB for a resolved part under a joint state map.
export function computePartOBB(resolvedPart, jointDef, progress) {
  const [sx, sy, sz] = resolvedPart.size;
  const skin = Math.min(0.5, Math.min(sx, sy, sz) * 0.15);
  const e = [sx * 0.5 - skin, sy * 0.5 - skin, sz * 0.5 - skin];
  const r = Math.hypot(e[0], e[1], e[2]);
  const basis = resolvedPart.localBasis;

  if (!jointDef) {
    return { c: resolvedPart.center, u: basis, e, r };
  }

  const p = progress ?? 0;
  const amount = jointDef.travel * p;
  const pv = resolvedPart.pivot;
  let dx = resolvedPart.center[0] - pv[0];
  let dy = resolvedPart.center[1] - pv[1];
  let dz = resolvedPart.center[2] - pv[2];
  let u = basis;

  if (jointDef.type === 'hinge') {
    const theta = amount * DEG_TO_RAD;
    const rc = rotateY([dx, dy, dz], theta);
    dx = rc[0]; dy = rc[1]; dz = rc[2];
    u = [rotateY(basis[0], theta), rotateY(basis[1], theta), rotateY(basis[2], theta)];
  } else if (jointDef.type === 'flap') {
    const theta = amount * DEG_TO_RAD;
    const rc = rotateX([dx, dy, dz], theta);
    dx = rc[0]; dy = rc[1]; dz = rc[2];
    u = [rotateX(basis[0], theta), rotateX(basis[1], theta), rotateX(basis[2], theta)];
  } else if (jointDef.type === 'slide') {
    dz += amount;
  } else if (jointDef.type === 'slide-x') {
    dx += amount;
  } else if (jointDef.type === 'lift') {
    dy += amount;
  }

  return {
    c: [pv[0] + dx, pv[1] + dy, pv[2] + dz],
    u,
    e,
    r
  };
}

// Exact 3D OBB vs OBB Separating Axis Theorem (15 potential separating axes).
export function obbsIntersect(A, B) {
  const tx = B.c[0] - A.c[0], ty = B.c[1] - A.c[1], tz = B.c[2] - A.c[2];
  const rSum = A.r + B.r;
  if (tx * tx + ty * ty + tz * tz > rSum * rSum) return false;

  const tv = [tx, ty, tz];
  const t = [dot3(tv, A.u[0]), dot3(tv, A.u[1]), dot3(tv, A.u[2])];
  const R = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  const AbsR = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const val = dot3(A.u[i], B.u[j]);
      R[i][j] = val;
      AbsR[i][j] = Math.abs(val) + EPS;
    }
  }

  const ae = A.e, be = B.e;
  // 1. Axes of A
  for (let i = 0; i < 3; i++) {
    const ra = ae[i];
    const rb = be[0] * AbsR[i][0] + be[1] * AbsR[i][1] + be[2] * AbsR[i][2];
    if (Math.abs(t[i]) > ra + rb) return false;
  }
  // 2. Axes of B
  for (let j = 0; j < 3; j++) {
    const ra = ae[0] * AbsR[0][j] + ae[1] * AbsR[1][j] + ae[2] * AbsR[2][j];
    const rb = be[j];
    if (Math.abs(t[0] * R[0][j] + t[1] * R[1][j] + t[2] * R[2][j]) > ra + rb) return false;
  }
  // 3. Cross products A_i x B_j
  let ra, rb;
  // A0 x B0
  ra = ae[1] * AbsR[2][0] + ae[2] * AbsR[1][0];
  rb = be[1] * AbsR[0][2] + be[2] * AbsR[0][1];
  if (Math.abs(t[2] * R[1][0] - t[1] * R[2][0]) > ra + rb) return false;
  // A0 x B1
  ra = ae[1] * AbsR[2][1] + ae[2] * AbsR[1][1];
  rb = be[0] * AbsR[0][2] + be[2] * AbsR[0][0];
  if (Math.abs(t[2] * R[1][1] - t[1] * R[2][1]) > ra + rb) return false;
  // A0 x B2
  ra = ae[1] * AbsR[2][2] + ae[2] * AbsR[1][2];
  rb = be[0] * AbsR[0][1] + be[1] * AbsR[0][0];
  if (Math.abs(t[2] * R[1][2] - t[1] * R[2][2]) > ra + rb) return false;
  // A1 x B0
  ra = ae[0] * AbsR[2][0] + ae[2] * AbsR[0][0];
  rb = be[1] * AbsR[1][2] + be[2] * AbsR[1][1];
  if (Math.abs(t[0] * R[2][0] - t[2] * R[0][0]) > ra + rb) return false;
  // A1 x B1
  ra = ae[0] * AbsR[2][1] + ae[2] * AbsR[0][1];
  rb = be[0] * AbsR[1][2] + be[2] * AbsR[1][0];
  if (Math.abs(t[0] * R[2][1] - t[2] * R[0][1]) > ra + rb) return false;
  // A1 x B2
  ra = ae[0] * AbsR[2][2] + ae[2] * AbsR[0][2];
  rb = be[0] * AbsR[1][1] + be[1] * AbsR[1][0];
  if (Math.abs(t[0] * R[2][2] - t[2] * R[0][2]) > ra + rb) return false;
  // A2 x B0
  ra = ae[0] * AbsR[1][0] + ae[1] * AbsR[0][0];
  rb = be[1] * AbsR[2][2] + be[2] * AbsR[2][1];
  if (Math.abs(t[1] * R[0][0] - t[0] * R[1][0]) > ra + rb) return false;
  // A2 x B1
  ra = ae[0] * AbsR[1][1] + ae[1] * AbsR[0][1];
  rb = be[0] * AbsR[2][2] + be[2] * AbsR[2][0];
  if (Math.abs(t[1] * R[0][1] - t[0] * R[1][1]) > ra + rb) return false;
  // A2 x B2
  ra = ae[0] * AbsR[1][2] + ae[1] * AbsR[0][2];
  rb = be[0] * AbsR[2][1] + be[1] * AbsR[2][0];
  if (Math.abs(t[1] * R[0][2] - t[0] * R[1][2]) > ra + rb) return false;

  return true;
}

export function createKinematics(spec) {
  const jointById = new Map(spec.joints.map(j => [j.id, j]));
  const slotById = new Map(spec.slots.map(s => [s.id, s]));
  let resolvedParts = [];
  let staticParts = [];
  let movingPartsByJoint = new Map();
  let ignoredStaticPairs = new Set();

  function setDimensionsAndOptions(dims, options) {
    const pivots = new Map();
    for (const j of spec.joints) pivots.set(j.id, resolveVec(j.pivot, dims));

    resolvedParts = [];
    staticParts = [];
    movingPartsByJoint = new Map(spec.joints.map(j => [j.id, []]));

    for (const def of spec.parts) {
      const visible = def.when.every(c => options[c.option] === c.choice);
      if (!visible) continue;
      const size = resolveVec(def.size, dims);
      const center = resolveVec(def.center, dims);
      const localBasis = eulerXYZBasis(
        def.rotation[0] * DEG_TO_RAD,
        def.rotation[1] * DEG_TO_RAD,
        def.rotation[2] * DEG_TO_RAD
      );
      const jointDef = def.joint ? jointById.get(def.joint) : null;
      const pivot = def.joint ? pivots.get(def.joint) : null;
      const entry = { def, size, center, localBasis, jointDef, pivot };
      resolvedParts.push(entry);
      if (def.joint) {
        movingPartsByJoint.get(def.joint).push(entry);
      } else {
        staticParts.push({ entry, obb: computePartOBB(entry, null, 0) });
      }
    }

    // Exempt static carcass parts that intentionally touch/overlap a moving part at rest (progress = 0).
    // Moving-vs-moving pairs (door vs door, door vs drawer) are NEVER exempted.
    ignoredStaticPairs = new Set();
    for (const [jId, list] of movingPartsByJoint) {
      const jDef = jointById.get(jId);
      for (const mPart of list) {
        const restOBB = computePartOBB(mPart, jDef, 0);
        for (const sItem of staticParts) {
          if (obbsIntersect(restOBB, sItem.obb)) {
            ignoredStaticPairs.add(`${mPart.def.id}\0${sItem.entry.def.id}`);
          }
        }
      }
    }
  }

  function checkJointCollision(jointId, progress, jointPositions) {
    const moving = movingPartsByJoint.get(jointId);
    if (!moving?.length) return null;
    const jDef = jointById.get(jointId);
    const activeOBBs = moving.map(p => ({ entry: p, obb: computePartOBB(p, jDef, progress) }));

    // 1. Check against all OTHER moving joints
    for (const [otherId, otherParts] of movingPartsByJoint) {
      if (otherId === jointId || !otherParts.length) continue;
      const otherDef = jointById.get(otherId);
      const otherProgress = jointPositions[otherId] ?? 0;
      for (const oPart of otherParts) {
        const oOBB = computePartOBB(oPart, otherDef, otherProgress);
        for (const a of activeOBBs) {
          if (obbsIntersect(a.obb, oOBB)) {
            return { partId: oPart.def.id, jointId: otherId, label: otherDef.label };
          }
        }
      }
    }

    // 2. Check against visible static carcass parts not exempted at rest
    for (const sItem of staticParts) {
      const sId = sItem.entry.def.id;
      for (const a of activeOBBs) {
        if (ignoredStaticPairs.has(`${a.entry.def.id}\0${sId}`)) continue;
        if (obbsIntersect(a.obb, sItem.obb)) {
          const slotLabel = sItem.entry.def.slot ? slotById.get(sItem.entry.def.slot)?.label : null;
          return { partId: sId, jointId: null, label: slotLabel || 'Cabinet structure' };
        }
      }
    }

    return null;
  }

  function resolveJointMotion(jointId, fromProgress, desiredProgress, jointPositions) {
    const from = clamp(fromProgress, 0, 1);
    const desired = clamp(desiredProgress, 0, 1);
    const jDef = jointById.get(jointId);
    if (!jDef || !movingPartsByJoint.get(jointId)?.length) {
      return { progress: desired, blocked: false, blocker: null };
    }
    if (Math.abs(desired - from) <= 1e-7) {
      return { progress: desired, blocked: false, blocker: null };
    }

    const startHit = checkJointCollision(jointId, from, jointPositions);
    const isAngular = jDef.type === 'hinge' || jDef.type === 'flap';
    const maxStepSpan = isAngular ? 2 / Math.max(1, Math.abs(jDef.travel)) : 6 / Math.max(1, Math.abs(jDef.travel));
    const span = Math.abs(desired - from);
    const steps = Math.min(96, Math.max(1, Math.ceil(span / Math.max(0.005, maxStepSpan))));

    // Escape-from-overlap: if already colliding (e.g. after resize), prevent opening deeper,
    // while allowing closing back toward 0 smoothly without deadlocking.
    if (startHit) {
      if (desired > from) {
        return { progress: from, blocked: true, blocker: startHit };
      }
      let cleared = false;
      let prevClear = from;
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const probe = from + (desired - from) * t;
        const hit = checkJointCollision(jointId, probe, jointPositions);
        if (!hit) {
          cleared = true;
          prevClear = probe;
        } else if (cleared) {
          let lo = prevClear, hi = probe;
          for (let b = 0; b < 10; b++) {
            const mid = (lo + hi) * 0.5;
            if (checkJointCollision(jointId, mid, jointPositions)) hi = mid;
            else lo = mid;
          }
          return { progress: lo, blocked: true, blocker: hit };
        }
      }
      return { progress: desired, blocked: false, blocker: null };
    }

    let prev = from;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const probe = from + (desired - from) * t;
      const hit = checkJointCollision(jointId, probe, jointPositions);
      if (hit) {
        let lo = prev, hi = probe;
        for (let b = 0; b < 10; b++) {
          const mid = (lo + hi) * 0.5;
          if (checkJointCollision(jointId, mid, jointPositions)) hi = mid;
          else lo = mid;
        }
        return { progress: lo, blocked: true, blocker: hit };
      }
      prev = probe;
    }

    return { progress: desired, blocked: false, blocker: null };
  }

  function resolveAllOverlaps(jointPositions) {
    const pos = { ...jointPositions };
    const adjusted = {};
    for (const j of spec.joints) {
      const cur = clamp(pos[j.id] ?? 0, 0, 1);
      if (cur <= 0) continue;
      if (!checkJointCollision(j.id, cur, pos)) continue;
      // Search backward toward 0 for the nearest collision-free pose
      const steps = 48;
      let safe = 0;
      for (let i = steps - 1; i >= 0; i--) {
        const probe = cur * (i / steps);
        if (!checkJointCollision(j.id, probe, pos)) {
          let lo = probe, hi = cur * ((i + 1) / steps);
          for (let b = 0; b < 10; b++) {
            const mid = (lo + hi) * 0.5;
            if (checkJointCollision(j.id, mid, pos)) hi = mid;
            else lo = mid;
          }
          safe = lo;
          break;
        }
      }
      pos[j.id] = safe;
      adjusted[j.id] = safe;
    }
    return adjusted;
  }

  function getJointPhysics(jointId) {
    const j = jointById.get(jointId);
    return JOINT_PHYSICS[j?.type] || JOINT_PHYSICS.hinge;
  }

  return {
    setDimensionsAndOptions,
    checkJointCollision,
    resolveJointMotion,
    resolveAllOverlaps,
    getJointPhysics
  };
}

// Step damped spring-mass + soft-close physics in fixed 1/120s substeps with swept CCD collision stopping.
export function stepPhysicsSubstep(kinematics, jointMap, dt) {
  const clampedDt = clamp(dt, 0, 0.05);
  if (clampedDt <= 0) return { moved: false, animating: false, collisions: [] };

  const SUB_DT = 1 / 120;
  const substeps = Math.max(1, Math.ceil(clampedDt / SUB_DT));
  const h = clampedDt / substeps;
  const pos = {};
  for (const j of jointMap.values()) pos[j.id] = j.current;

  let moved = false;
  const collisions = [];
  const reportedInStep = new Set();

  for (let s = 0; s < substeps; s++) {
    for (const j of jointMap.values()) {
      const diff = j.target - j.current;
      if (Math.abs(diff) <= 0.0003 && Math.abs(j.velocity) <= 0.002) {
        if (j.current !== j.target) {
          const snap = kinematics.resolveJointMotion(j.id, j.current, j.target, pos);
          j.current = snap.progress;
          pos[j.id] = snap.progress;
          moved = true;
        }
        j.velocity = 0;
        continue;
      }

      const prof = kinematics.getJointPhysics(j.id);
      let acc = prof.stiffness * diff - prof.damping * j.velocity;
      if (j.velocity < 0 && j.target < j.current && j.current < prof.softCloseZone) {
        const zoneFactor = 1 - j.current / prof.softCloseZone;
        acc -= prof.softCloseDamp * zoneFactor * j.velocity;
      }

      j.velocity = clamp(j.velocity + acc * h, -prof.maxSpeed, prof.maxSpeed);
      let next = j.current + j.velocity * h;

      if (next <= 0 && j.target <= 0) {
        next = 0;
        j.velocity = 0;
      } else if (next >= 1 && j.target >= 1) {
        next = 1;
        j.velocity = 0;
      } else {
        next = clamp(next, 0, 1);
      }

      const res = kinematics.resolveJointMotion(j.id, j.current, next, pos);
      if (Math.abs(res.progress - j.current) > 1e-6) moved = true;
      j.current = res.progress;
      pos[j.id] = res.progress;

      if (res.blocked) {
        j.target = res.progress;
        j.velocity = Math.abs(j.velocity) > 0.08 ? -j.velocity * prof.bounce : 0;
        if (!reportedInStep.has(j.id)) {
          reportedInStep.add(j.id);
          collisions.push({
            id: j.id,
            label: j.label,
            blockerLabel: res.blocker.label,
            blockerJointId: res.blocker.jointId,
            blockerPartId: res.blocker.partId,
            progress: res.progress
          });
        }
      }
    }
  }

  let animating = false;
  for (const j of jointMap.values()) {
    if (Math.abs(j.target - j.current) > 0.0003 || Math.abs(j.velocity) > 0.002) {
      animating = true;
      break;
    }
  }

  return { moved, animating, collisions };
}
