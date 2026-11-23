import { resolveVec } from './coordinates.mjs';
import { computePartOBB, obbsIntersect, createKinematics } from './kinematics.mjs';

const DEG_TO_RAD = Math.PI / 180;

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

function isSlidingJoint(jDef) {
  return jDef?.type === 'slide' || jDef?.type === 'slide-x';
}

function worldAABB(size, center, basis) {
  const hx = size[0] * 0.5;
  const hy = size[1] * 0.5;
  const hz = size[2] * 0.5;
  const min = [0, 0, 0];
  const max = [0, 0, 0];
  for (let a = 0; a < 3; a++) {
    const ext = Math.abs(basis[0][a]) * hx + Math.abs(basis[1][a]) * hy + Math.abs(basis[2][a]) * hz;
    min[a] = center[a] - ext;
    max[a] = center[a] + ext;
  }
  return {
    minX: min[0], maxX: max[0],
    minY: min[1], maxY: max[1],
    minZ: min[2], maxZ: max[2],
    sx: max[0] - min[0], sy: max[1] - min[1], sz: max[2] - min[2]
  };
}

function defaultOptionsFor(spec) {
  const options = {};
  for (const opt of spec.options ?? []) options[opt.id] = opt.choices[0];
  return options;
}

function mergeCoveredLength(intervals, lo, hi) {
  const clipped = [];
  for (const [a, b] of intervals) {
    const start = Math.max(lo, a);
    const end = Math.min(hi, b);
    if (end > start) clipped.push([start, end]);
  }
  if (!clipped.length) return 0;
  clipped.sort((u, v) => u[0] - v[0]);
  let total = 0;
  let curStart = clipped[0][0];
  let curEnd = clipped[0][1];
  for (let i = 1; i < clipped.length; i++) {
    if (clipped[i][0] <= curEnd) {
      curEnd = Math.max(curEnd, clipped[i][1]);
    } else {
      total += curEnd - curStart;
      [curStart, curEnd] = clipped[i];
    }
  }
  return total + (curEnd - curStart);
}

function clusterPanelsByFacing(panels) {
  const sorted = [...panels].sort((a, b) => b.facing - a.facing);
  const clusters = [];
  for (const p of sorted) {
    const match = clusters.find(c => Math.abs(p.facing - c.anchor) <= 15);
    if (match) {
      match.items.push(p);
      match.minFacing = Math.min(match.minFacing, p.facing);
    } else {
      clusters.push({ anchor: p.facing, minFacing: p.facing, items: [p] });
    }
  }
  return clusters;
}

function pushWarning(warnings, seen, tag, warning) {
  const key = `${warning.kind}:${warning.parts.join(',')}`;
  if (seen.has(key)) return;
  seen.add(key);
  warnings.push(tag ? { ...warning, message: `[${tag}] ${warning.message}` } : warning);
}

function checkFacadeSeams(resolved, tag, warnings, seen) {
  const axes = [
    {
      name: 'z',
      isPanel: r => r.box.sz <= 45 && r.box.sx >= 40 && r.box.sy >= 400,
      toCandidate: r => ({
        id: r.def.id,
        joint: r.def.joint,
        back: r.box.minZ,
        facing: r.box.maxZ,
        runMin: r.box.minX,
        runMax: r.box.maxX,
        minY: r.box.minY,
        maxY: r.box.maxY
      }),
      staticSpan: r => ({ facing: r.box.maxZ, runMin: r.box.minX, runMax: r.box.maxX, minY: r.box.minY, maxY: r.box.maxY })
    },
    {
      name: 'x',
      isPanel: r => r.box.sx <= 45 && r.box.sz >= 40 && r.box.sy >= 400,
      toCandidate: r => ({
        id: r.def.id,
        joint: r.def.joint,
        back: r.box.minX,
        facing: r.box.maxX,
        runMin: r.box.minZ,
        runMax: r.box.maxZ,
        minY: r.box.minY,
        maxY: r.box.maxY
      }),
      staticSpan: r => ({ facing: r.box.maxX, runMin: r.box.minZ, runMax: r.box.maxZ, minY: r.box.minY, maxY: r.box.maxY })
    }
  ];

  const staticItems = resolved.filter(r => !r.def.joint);

  for (const ax of axes) {
    const panels = resolved.filter(ax.isPanel).map(ax.toCandidate);
    const statics = staticItems.map(ax.staticSpan);
    for (const cluster of clusterPanelsByFacing(panels)) {
      const items = cluster.items.sort((a, b) => a.runMin - b.runMin || a.id.localeCompare(b.id));
      for (let i = 0; i < items.length; i++) {
        const A = items[i];
        const aH = A.maxY - A.minY;
        let nextNeighbor = null;

        for (let j = i + 1; j < items.length; j++) {
          const B = items[j];
          if (Math.min(A.facing, B.facing) <= Math.max(A.back, B.back)) continue;
          const overlapBot = Math.max(A.minY, B.minY);
          const overlapTop = Math.min(A.maxY, B.maxY);
          const overlapH = overlapTop - overlapBot;
          if (overlapH < 0.5 * Math.min(aH, B.maxY - B.minY)) continue;

          const gap = B.runMin - A.runMax;
          if (gap < -1 && (A.joint === null || A.joint !== B.joint)) {
            pushWarning(warnings, seen, tag, {
              kind: 'facade-overlap',
              parts: [A.id, B.id],
              metric: Number((-gap).toFixed(1)),
              message: `Facade overlap of ${(-gap).toFixed(1)} mm between ${A.id} and ${B.id}`
            });
            continue;
          }

          if (gap >= -1 && (!nextNeighbor || B.runMin < nextNeighbor.panel.runMin)) {
            nextNeighbor = { panel: B, gap, overlapBot, overlapTop, overlapH };
          }
        }

        if (nextNeighbor && nextNeighbor.gap > 8 && nextNeighbor.gap <= 250) {
          const { panel: B, gap, overlapBot, overlapTop, overlapH } = nextNeighbor;
          const coverIntervals = [];
          for (const s of statics) {
            if (s.facing < cluster.minFacing - 25) continue;
            if (s.maxY < overlapTop - 0.1 * overlapH || s.minY > overlapBot + 0.1 * overlapH) continue;
            if (s.runMax > A.runMax && s.runMin < B.runMin) {
              coverIntervals.push([s.runMin, s.runMax]);
            }
          }
          const covered = mergeCoveredLength(coverIntervals, A.runMax, B.runMin);
          if (covered / gap < 0.8) {
            pushWarning(warnings, seen, tag, {
              kind: 'facade-gap',
              parts: [A.id, B.id],
              metric: Number(gap.toFixed(1)),
              message: `Facade gap of ${gap.toFixed(1)} mm between ${A.id} and ${B.id}; expected <= 8 mm reveal or a filler panel`
            });
          }
        }
      }
    }
  }
}

function checkRestOverlaps(resolved, spec, tag, warnings, seen) {
  const jointById = new Map(spec.joints.map(j => [j.id, j]));
  const obbs = resolved.map(r => {
    const jDef = r.def.joint ? jointById.get(r.def.joint) : null;
    const obb = computePartOBB(
      { def: r.def, size: r.size, center: r.center, localBasis: r.basis, jointDef: jDef, pivot: jDef ? r.pivot : null },
      jDef,
      0
    );
    return { r, jDef, obb };
  });

  // 1. Distinct moving assemblies must not intersect at rest (0%).
  const moving = obbs.filter(x => x.jDef);
  for (let i = 0; i < moving.length; i++) {
    for (let j = i + 1; j < moving.length; j++) {
      const A = moving[i], B = moving[j];
      if (A.jDef.id === B.jDef.id) continue;
      if (obbsIntersect(A.obb, B.obb)) {
        const pair = [A.r.def.id, B.r.def.id].sort();
        pushWarning(warnings, seen, tag, {
          kind: 'rest-overlap',
          parts: pair,
          metric: 0,
          message: `Moving assemblies intersect at rest: ${pair[0]} (${A.jDef.id}) and ${pair[1]} (${B.jDef.id})`
        });
      }
    }
  }

  // 2. Sliding drawers must not intersect static carcass parts at rest (0%).
  const statics = obbs.filter(x => !x.jDef);
  const drawers = obbs.filter(x => x.jDef && (x.jDef.type === 'slide' || x.jDef.type === 'slide-x'));
  for (const D of drawers) {
    for (const S of statics) {
      if (obbsIntersect(D.obb, S.obb)) {
        pushWarning(warnings, seen, tag, {
          kind: 'rest-overlap',
          parts: [D.r.def.id, S.r.def.id],
          metric: 0,
          message: `Drawer part ${D.r.def.id} (${D.jDef.id}) intersects static part ${S.r.def.id} at rest`
        });
      }
    }
  }
}

function checkJointMotion(spec, dims, options, tag, warnings, seen) {
  if (!spec.joints.length) return;
  const kin = createKinematics(spec);
  kin.setDimensionsAndOptions(dims, options);
  const zeroPos = Object.fromEntries(spec.joints.map(j => [j.id, 0]));

  for (const j of spec.joints) {
    if (j.type === 'slide' || j.type === 'slide-x') continue;
    const res = kin.resolveJointMotion(j.id, 0, 1, zeroPos);
    if (res.blocked && res.progress < 0.9) {
      pushWarning(warnings, seen, tag, {
        kind: 'joint-blocked',
        parts: [j.id, res.blocker.partId],
        metric: Number((res.progress * 100).toFixed(1)),
        message: `Joint ${j.id} blocked at ${(res.progress * 100).toFixed(1)}% by ${res.blocker.partId}`
      });
    }
  }

  // Evaluate drawers against static carcass parts and other sliding joints (omitting hinged doors that cover internal drawers).
  const drawerIds = new Set(spec.joints.filter(j => j.type === 'slide' || j.type === 'slide-x').map(j => j.id));
  if (!drawerIds.size) return;
  const slideSpec = {
    ...spec,
    joints: spec.joints.filter(j => drawerIds.has(j.id)),
    parts: spec.parts.filter(p => !p.joint || drawerIds.has(p.joint))
  };
  const slideKin = createKinematics(slideSpec);
  slideKin.setDimensionsAndOptions(dims, options);
  const slideZero = Object.fromEntries(slideSpec.joints.map(j => [j.id, 0]));
  for (const j of slideSpec.joints) {
    const res = slideKin.resolveJointMotion(j.id, 0, 1, slideZero);
    if (res.blocked && res.progress < 0.9) {
      pushWarning(warnings, seen, tag, {
        kind: 'joint-blocked',
        parts: [j.id, res.blocker.partId],
        metric: Number((res.progress * 100).toFixed(1)),
        message: `Drawer ${j.id} blocked at ${(res.progress * 100).toFixed(1)}% by ${res.blocker.partId}`
      });
    }
  }
}

function checkMeshCollisions(resolved, spec, tag, warnings, seen) {
  const jointById = new Map(spec.joints.map(j => [j.id, j]));
  const items = resolved.map(r => {
    const [sx, sy, sz] = r.size;
    const e = [
      Math.max(0.05, sx * 0.5 - Math.min(0.25, sx * 0.1)),
      Math.max(0.05, sy * 0.5 - Math.min(0.25, sy * 0.1)),
      Math.max(0.05, sz * 0.5 - Math.min(0.25, sz * 0.1))
    ];
    return {
      r,
      jDef: r.def.joint ? jointById.get(r.def.joint) : null,
      obb: { c: r.center, u: r.basis, e, r: Math.hypot(e[0], e[1], e[2]) }
    };
  });

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const A = items[i], B = items[j];
      // Cross-joint and drawer-vs-static overlaps are reported under rest-overlap.
      if (A.jDef && B.jDef && A.jDef.id !== B.jDef.id) continue;
      if ((isSlidingJoint(A.jDef) && !B.jDef) || (isSlidingJoint(B.jDef) && !A.jDef)) continue;
      if (!obbsIntersect(A.obb, B.obb)) continue;

      const bA = A.r.box, bB = B.r.box;
      const ox = Math.min(bA.maxX, bB.maxX) - Math.max(bA.minX, bB.minX);
      const oy = Math.min(bA.maxY, bB.maxY) - Math.max(bA.minY, bB.minY);
      const oz = Math.min(bA.maxZ, bB.maxZ) - Math.max(bA.minZ, bB.minZ);
      if (ox <= 0.5 || oy <= 0.5 || oz <= 0.5) continue;

      const coplanar =
        Math.abs(bA.minX - bB.minX) < 0.5 || Math.abs(bA.maxX - bB.maxX) < 0.5 ||
        Math.abs(bA.minY - bB.minY) < 0.5 || Math.abs(bA.maxY - bB.maxY) < 0.5 ||
        Math.abs(bA.minZ - bB.minZ) < 0.5 || Math.abs(bA.maxZ - bB.maxZ) < 0.5;
      const pair = [A.r.def.id, B.r.def.id].sort();
      const note = coplanar ? ', co-planar Z-fighting' : '';
      pushWarning(warnings, seen, tag, {
        kind: 'mesh-collision',
        parts: pair,
        metric: Number(Math.min(ox, oy, oz).toFixed(1)),
        message: `Mesh collision between ${pair[0]} and ${pair[1]} (${ox.toFixed(1)}×${oy.toFixed(1)}×${oz.toFixed(1)} mm${note})`
      });
    }
  }
}

function auditConfiguration(spec, dims, options, tag, warnings, seen) {
  const pivots = new Map(spec.joints.map(j => [j.id, resolveVec(j.pivot, dims)]));
  const resolved = [];
  let globalMinY = Infinity;

  for (const def of spec.parts) {
    const visible = def.when.every(c => options[c.option] === c.choice);
    if (!visible) continue;
    const size = resolveVec(def.size, dims);
    const center = resolveVec(def.center, dims);
    const basis = eulerXYZBasis(
      def.rotation[0] * DEG_TO_RAD,
      def.rotation[1] * DEG_TO_RAD,
      def.rotation[2] * DEG_TO_RAD
    );
    const box = worldAABB(size, center, basis);
    globalMinY = Math.min(globalMinY, box.minY);
    resolved.push({ def, size, center, basis, box, pivot: def.joint ? pivots.get(def.joint) : null });
  }

  if (Number.isFinite(globalMinY) && (globalMinY > 2 || globalMinY < -2)) {
    const kindNote = globalMinY > 2 ? `floats ${globalMinY.toFixed(1)} mm above floor` : `sinks ${(-globalMinY).toFixed(1)} mm below floor`;
    pushWarning(warnings, seen, tag, {
      kind: 'ground-contact',
      parts: ['model'],
      metric: Number(globalMinY.toFixed(1)),
      message: `Model ${kindNote} (expected minY near 0 mm)`
    });
  }

  checkFacadeSeams(resolved, tag, warnings, seen);
  checkRestOverlaps(resolved, spec, tag, warnings, seen);
  checkMeshCollisions(resolved, spec, tag, warnings, seen);
  checkJointMotion(spec, dims, options, tag, warnings, seen);
}

/**
 * Audit closed-pose geometry, facade seams, rest clearances, mesh collisions, and joint motion.
 * Checks default dims/options, min/max extremes for parametric specs, and alternate option choices.
 */
export function auditGeometry(spec) {
  const warnings = [];
  const seen = new Set();
  const options = defaultOptionsFor(spec);
  const defaultDims = {
    width: spec.dimensions.width.value,
    height: spec.dimensions.height.value,
    depth: spec.dimensions.depth.value
  };
  auditConfiguration(spec, defaultDims, options, '', warnings, seen);

  for (const opt of spec.options ?? []) {
    for (const choice of opt.choices.slice(1)) {
      auditConfiguration(spec, defaultDims, { ...options, [opt.id]: choice }, `${opt.id}=${choice}`, warnings, seen);
    }
  }

  const hasRange = ['width', 'height', 'depth'].some(k => spec.dimensions[k].min !== spec.dimensions[k].max);
  if (hasRange) {
    const minDims = { width: spec.dimensions.width.min, height: spec.dimensions.height.min, depth: spec.dimensions.depth.min };
    const maxDims = { width: spec.dimensions.width.max, height: spec.dimensions.height.max, depth: spec.dimensions.depth.max };
    auditConfiguration(spec, minDims, options, 'min', warnings, seen);
    auditConfiguration(spec, maxDims, options, 'max', warnings, seen);
  }

  return {
    warnings,
    summary: { total: warnings.length }
  };
}
