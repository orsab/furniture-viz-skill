import * as T from 'three';
import clips from './person-motion.json' with { type: 'json' };

const WHITE = new T.Color(0xffffff);
const ROSE = new T.Color(0x9e5a52);
const DARK_SKIN_MIX = new T.Color(0x2a1812);
const DARK_HAIR_MIX = new T.Color(0x161210);
const TAU = Math.PI * 2;
const smooth = x => x * x * (3 - 2 * x);
const unit = x => T.MathUtils.clamp(x, 0, 1);
const blendWindow = u => smooth(unit(Math.min(u, 1 - u) * 6));
const turnClip = angle => angle >= 0 ? clips.turnLeft : clips.turnRight;

export const CHARACTER_TYPES = ['male', 'female', 'child'];
export const CHARACTER_PRESETS = {
  male: { defaultHeight: 1760, defaultHair: '#3a2b20', defaultTop: '#477065', defaultBottom: '#39454c' },
  female: { defaultHeight: 1640, defaultHair: '#4a3122', defaultTop: '#6e5a63', defaultBottom: '#383d46' },
  child: { defaultHeight: 1200, defaultHair: '#5a4028', defaultTop: '#4c7696', defaultBottom: '#44505c' }
};

// All vertical coordinates are normalized to standing height H = 1.000.
// Lower chain (thighLen + calfLen + soleDrop * footScaleY) + headY + 0.148 * headScaleY ≈ 1.000.
const CHAR_PROFILES = {
  male: {
    thighX: 0.048,
    thighLen: 0.242,
    calfLen: 0.230,
    soleDrop: 0.052,
    headY: 0.328,
    armX: 0.114,
    armY: 0.272,
    upperArmLen: 0.148,
    headScale: [1.0, 1.0, 1.0],
    legScaleX: 1.02,
    legScaleZ: 1.02,
    armScaleX: 1.02,
    armScaleZ: 1.02,
    footScale: [1.0, 1.0, 1.04],
    lipTint: 0.22
  },
  female: {
    thighX: 0.047,
    thighLen: 0.242,
    calfLen: 0.228,
    soleDrop: 0.052,
    headY: 0.334,
    armX: 0.095,
    armY: 0.268,
    upperArmLen: 0.146,
    headScale: [0.95, 0.98, 0.96],
    legScaleX: 0.92,
    legScaleZ: 0.94,
    armScaleX: 0.84,
    armScaleZ: 0.85,
    footScale: [0.88, 0.92, 0.93],
    lipTint: 0.36
  },
  child: {
    thighX: 0.049,
    thighLen: 0.224,
    calfLen: 0.214,
    soleDrop: 0.052,
    headY: 0.328,
    armX: 0.102,
    armY: 0.270,
    upperArmLen: 0.136,
    headScale: [1.22, 1.24, 1.22],
    legScaleX: 1.04,
    legScaleZ: 1.04,
    armScaleX: 0.96,
    armScaleZ: 0.96,
    footScale: [1.02, 0.94, 1.0],
    lipTint: 0.26
  }
};

function frameIndex(clip, progress) {
  return unit(progress) * (clip.frames.length - 1);
}

// Ring profiles read bottom to top:
// [y, rx, rz, zOffset] or asymmetric front/back [y, rx, rzFront, rzBack, zOffset].
function profile(rings, n = 40) {
  const vertices = [];
  const indices = [];
  for (let j = 0; j < rings.length; j++) {
    const ring = rings[j];
    const y = ring[0];
    const rx = ring[1];
    const hasSplitZ = ring.length >= 5;
    const rzFront = ring[2];
    const rzBack = hasSplitZ ? ring[3] : ring[2];
    const zOffset = hasSplitZ ? (ring[4] ?? 0) : (ring[3] ?? 0);
    for (let i = 0; i < n; i++) {
      const angle = (i * 2 * Math.PI) / n;
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      const rz = c >= 0 ? rzFront : rzBack;
      vertices.push(s * rx, y, c * rz + zOffset);
      if (j) {
        const a = (j - 1) * n + i;
        const b = (j - 1) * n + ((i + 1) % n);
        indices.push(a, b, b + n, a, b + n, a + n);
      }
    }
  }
  const end = (rings.length - 1) * n;
  for (let i = 1; i < n - 1; i++) indices.push(0, i + 1, i, end, end + i, end + i + 1);
  const g = new T.BufferGeometry();
  g.setAttribute('position', new T.Float32BufferAttribute(vertices, 3));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}

export function makeMannequin() {
  const root = new T.Group();
  const material = (color, roughness, extra = {}) =>
    new T.MeshPhysicalMaterial({ color, roughness, metalness: 0, envMapIntensity: 0.85, ...extra });

  const skin = material('#ad8265', 0.64, { clearcoat: 0.04, clearcoatRoughness: 0.62, sheen: 0.16, sheenRoughness: 0.72 });
  const skinShadow = material('#936a50', 0.68, { sheen: 0.12, sheenRoughness: 0.75 });
  const lipMat = material('#9c665a', 0.56, { clearcoat: 0.08, clearcoatRoughness: 0.45 });
  const hairMat = material('#3a2b20', 0.74, { sheen: 0.34, sheenRoughness: 0.66, envMapIntensity: 0.82 });
  const browMat = material('#2f2219', 0.78);
  const scleraMat = material('#f4f2ec', 0.24, { clearcoat: 0.35, clearcoatRoughness: 0.18 });
  const irisMat = material('#423124', 0.16, { clearcoat: 0.85, clearcoatRoughness: 0.08 });
  const pupilMat = material('#141210', 0.14);
  const eyeSparkMat = material('#ffffff', 0.1, { emissive: new T.Color('#ffffff'), emissiveIntensity: 0.35 });

  const top = material('#55756e', 0.90, { sheen: 0.38, sheenRoughness: 0.78, envMapIntensity: 0.8 });
  const bottom = material('#565755', 0.90, { sheen: 0.35, sheenRoughness: 0.8, envMapIntensity: 0.8 });
  const rib = material('#475e59', 0.90, { sheen: 0.35, sheenRoughness: 0.8, envMapIntensity: 0.8 });
  const beltMat = material('#342e28', 0.58, { envMapIntensity: 0.9 });
  // NOTE: Shoe soles keep exact #57524d (0x57524d) for test/person-ai.test.mjs sole identification.
  const sole = material('#57524d', 0.82);
  const shoe = material('#e6e2d8', 0.78, { sheen: 0.18, sheenRoughness: 0.78 });
  const shoeTrim = material('#f5f3ed', 0.82);

  const ball = new T.SphereGeometry(1, 24, 16);
  const joint = (parent, x, y, z) => {
    const g = new T.Group();
    g.position.set(x, y, z);
    parent.add(g);
    return g;
  };
  const mesh = (parent, g, mat, x = 0, y = 0, z = 0) => {
    const m = new T.Mesh(g, mat);
    m.position.set(x, y, z);
    m.castShadow = m.receiveShadow = true;
    m.userData.interactive = { type: 'person', label: 'Reference person' };
    parent.add(m);
    return m;
  };
  const ellipsoid = (parent, mat, x, y, z, w, h, d) => {
    const m = mesh(parent, ball, mat, x, y, z);
    m.scale.set(w, h, d);
    return m;
  };

  // Core 13-joint Mixamo-order skeleton:
  // [hip, spine, head, L_thigh, L_calf, L_foot, L_arm, L_elbow, R_thigh, R_calf, R_foot, R_arm, R_elbow]
  const hip = joint(root, 0, 0, 0);
  const spine = joint(hip, 0, 0, 0);
  const head = joint(spine, 0, CHAR_PROFILES.male.headY, 0);

  // --- Character-specific Sculpted Torsos (only visual child groups, never scaling the spine joint) ---
  const torsoGroups = {
    male: new T.Group(),
    female: new T.Group(),
    child: new T.Group()
  };
  spine.add(torsoGroups.male, torsoGroups.female, torsoGroups.child);

  // Male torso: athletic chest/back asymmetry, straight waist, crew collar + belt
  {
    const g = torsoGroups.male;
    mesh(g, profile([
      [-0.044, 0.052, 0.044, 0.044, 0],
      [-0.025, 0.086, 0.060, 0.065, -0.002],
      [0.002, 0.095, 0.064, 0.070, -0.002],
      [0.036, 0.091, 0.059, 0.062, -0.001],
      [0.062, 0.084, 0.056, 0.057, 0]
    ]), bottom);
    // Belt & tucked seam
    mesh(g, profile([
      [0.036, 0.093, 0.061, 0.064, -0.001],
      [0.054, 0.088, 0.059, 0.060, 0]
    ]), beltMat);
    mesh(g, profile([
      [0.048, 0.088, 0.059, 0.059, 0],
      [0.092, 0.089, 0.060, 0.057, 0.002],
      [0.156, 0.098, 0.068, 0.059, 0.004],
      [0.214, 0.114, 0.075, 0.062, 0.005],
      [0.252, 0.120, 0.068, 0.059, 0.002],
      [0.281, 0.112, 0.058, 0.053, -0.001],
      [0.300, 0.078, 0.047, 0.045, 0],
      [0.312, 0.046, 0.039, 0.038, 0]
    ]), top);
    mesh(g, profile([
      [0.305, 0.049, 0.042, 0.041, 0],
      [0.314, 0.045, 0.039, 0.038, 0],
      [0.318, 0.040, 0.036, 0.035, 0]
    ]), rib);
    // Neck with trapezius base blend
    mesh(g, profile([
      [0.308, 0.042, 0.037, 0.036, 0],
      [0.324, 0.035, 0.033, 0.033, 0.001],
      [0.344, 0.033, 0.032, 0.032, 0.002]
    ]), skin);
  }

  // Female torso: curved pelvis, tapered waist, sculpted bust & sloped shoulders, scoop neck
  {
    const g = torsoGroups.female;
    mesh(g, profile([
      [-0.044, 0.050, 0.042, 0.044, 0],
      [-0.022, 0.090, 0.058, 0.070, -0.003],
      [0.006, 0.097, 0.060, 0.072, -0.003],
      [0.038, 0.088, 0.054, 0.060, -0.001],
      [0.068, 0.076, 0.049, 0.050, 0.001]
    ]), bottom);
    mesh(g, profile([
      [0.056, 0.079, 0.051, 0.051, 0],
      [0.092, 0.072, 0.047, 0.047, 0.002],
      [0.132, 0.079, 0.055, 0.049, 0.003],
      [0.180, 0.092, 0.074, 0.053, 0.004],
      [0.218, 0.095, 0.068, 0.053, 0.004],
      [0.254, 0.099, 0.056, 0.051, 0.001],
      [0.278, 0.092, 0.048, 0.046, 0],
      [0.296, 0.064, 0.040, 0.040, 0]
    ]), top);
    // Open scoop neckline showing upper collarbone skin
    mesh(g, profile([
      [0.285, 0.056, 0.042, 0.039, 0.002],
      [0.296, 0.050, 0.039, 0.037, 0.002],
      [0.301, 0.044, 0.036, 0.035, 0.002]
    ]), rib);
    mesh(g, profile([
      [0.290, 0.044, 0.037, 0.035, 0.001],
      [0.312, 0.032, 0.030, 0.030, 0.001],
      [0.330, 0.028, 0.027, 0.028, 0.002],
      [0.350, 0.028, 0.027, 0.028, 0.002]
    ]), skin);
  }

  // Child torso: softer compact trunk, relaxed tee hem, gentle shoulders & shorter neck
  {
    const g = torsoGroups.child;
    mesh(g, profile([
      [-0.042, 0.048, 0.042, 0.044, 0],
      [-0.018, 0.082, 0.058, 0.062, -0.001],
      [0.012, 0.089, 0.062, 0.064, 0],
      [0.055, 0.087, 0.060, 0.060, 0]
    ]), bottom);
    mesh(g, profile([
      [0.044, 0.091, 0.063, 0.063, 0],
      [0.096, 0.090, 0.063, 0.060, 0.002],
      [0.165, 0.094, 0.065, 0.058, 0.003],
      [0.228, 0.104, 0.064, 0.056, 0.003],
      [0.264, 0.105, 0.059, 0.053, 0.001],
      [0.292, 0.080, 0.048, 0.045, 0],
      [0.308, 0.048, 0.040, 0.039, 0]
    ]), top);
    mesh(g, profile([
      [0.302, 0.050, 0.042, 0.041, 0],
      [0.312, 0.046, 0.039, 0.038, 0],
      [0.316, 0.041, 0.036, 0.036, 0]
    ]), rib);
    mesh(g, profile([
      [0.306, 0.039, 0.035, 0.035, 0],
      [0.326, 0.033, 0.031, 0.031, 0.001],
      [0.344, 0.032, 0.031, 0.031, 0.002]
    ]), skin);
  }

  // --- Humanized Head, Face & Stylized Hair (scaled cleanly via headVisual, not head joint) ---
  const headVisual = new T.Group();
  head.add(headVisual);

  // Sculpted cranial vault + cheekbones + contoured jawline + chin
  mesh(headVisual, profile([
    [-0.002, 0.021, 0.029, 0.022, 0.011],
    [0.010, 0.033, 0.045, 0.031, 0.009],
    [0.028, 0.044, 0.054, 0.042, 0.005],
    [0.052, 0.049, 0.058, 0.051, 0.001],
    [0.075, 0.051, 0.058, 0.057, -0.002],
    [0.098, 0.049, 0.055, 0.058, -0.004],
    [0.120, 0.041, 0.047, 0.051, -0.005],
    [0.136, 0.025, 0.030, 0.032, -0.005],
    [0.144, 0.004, 0.005, 0.005, -0.005]
  ]), skin);

  // Nose: slender bridge + soft rounded tip + nostrils
  const bridge = mesh(headVisual, profile([
    [-0.012, 0.0065, 0.0085, 0.005, 0],
    [0.0, 0.0052, 0.0072, 0.004, 0],
    [0.013, 0.0042, 0.0052, 0.004, 0]
  ], 18), skin, 0, 0.062, 0.054);
  bridge.rotation.x = -0.26;
  ellipsoid(headVisual, skin, 0, 0.0515, 0.0615, 0.0072, 0.0062, 0.0072);

  // Lips: soft contoured upper & lower lips with a friendly subtle calm arc
  const upperLip = ellipsoid(headVisual, lipMat, 0, 0.0325, 0.0525, 0.0145, 0.0032, 0.0055);
  upperLip.rotation.x = 0.14;
  const lowerLip = ellipsoid(headVisual, lipMat, 0, 0.0282, 0.0512, 0.0125, 0.0036, 0.0055);
  lowerLip.rotation.x = -0.12;

  // Facial eyes, eyelids, brows & ears (bilateral)
  for (const s of [-1, 1]) {
    ellipsoid(headVisual, skin, s * 0.0056, 0.0495, 0.057, 0.0036, 0.0030, 0.0038); // nostril wing
    const eyePivot = joint(headVisual, s * 0.0195, 0.0715, 0.0498);
    eyePivot.rotation.y = s * 0.14;
    ellipsoid(eyePivot, scleraMat, 0, 0, 0, 0.0082, 0.0052, 0.0042);
    ellipsoid(eyePivot, irisMat, 0, -0.0002, 0.0024, 0.0042, 0.0045, 0.0026);
    ellipsoid(eyePivot, pupilMat, 0, -0.0002, 0.0036, 0.0021, 0.0022, 0.0018);
    ellipsoid(eyePivot, eyeSparkMat, 0.0014, 0.0014, 0.0046, 0.0009, 0.0009, 0.0008);
    const lid = ellipsoid(eyePivot, skinShadow, 0, 0.0034, 0.0016, 0.0088, 0.0028, 0.0046);
    lid.rotation.x = 0.25;

    const brow = ellipsoid(headVisual, browMat, s * 0.0205, 0.0835, 0.0515, 0.0115, 0.0023, 0.0032);
    brow.rotation.z = -s * 0.08;
    brow.rotation.y = s * 0.15;

    const ear = ellipsoid(headVisual, skin, s * 0.0485, 0.062, -0.003, 0.0068, 0.0145, 0.0105);
    ear.rotation.y = -s * 0.22;
    ear.rotation.z = s * 0.08;
    const earInner = ellipsoid(headVisual, skinShadow, s * 0.0505, 0.062, -0.002, 0.0038, 0.0092, 0.0062);
    earInner.rotation.y = -s * 0.22;
  }

  // Stylized sculpted hair caps for Male, Female, and Child
  const hairGroups = {
    male: new T.Group(),
    female: new T.Group(),
    child: new T.Group()
  };
  headVisual.add(hairGroups.male, hairGroups.female, hairGroups.child);

  // Male hair: fitted cranial cap + sculpted swept crown + clean sideburns
  {
    const g = hairGroups.male;
    mesh(g, profile([
      [0.072, 0.049, 0.010, 0.059, -0.005],
      [0.095, 0.052, 0.040, 0.062, -0.006],
      [0.116, 0.047, 0.054, 0.057, -0.006],
      [0.135, 0.034, 0.042, 0.042, -0.005],
      [0.148, 0.010, 0.012, 0.012, -0.004]
    ]), hairMat);
    const wave = ellipsoid(g, hairMat, -0.008, 0.124, 0.014, 0.042, 0.025, 0.044);
    wave.rotation.z = -0.18;
    const fringe = ellipsoid(g, hairMat, 0.012, 0.114, 0.036, 0.034, 0.015, 0.024);
    fringe.rotation.set(0.25, -0.25, -0.16);
    for (const s of [-1, 1]) {
      const sb = ellipsoid(g, hairMat, s * 0.0475, 0.080, 0.011, 0.0055, 0.019, 0.012);
      sb.rotation.x = -0.1;
    }
  }

  // Female hair: parted crown cap + face-framing locks + graceful curved back drape
  {
    const g = hairGroups.female;
    mesh(g, profile([
      [0.068, 0.052, 0.014, 0.063, -0.007],
      [0.094, 0.055, 0.044, 0.066, -0.007],
      [0.118, 0.049, 0.056, 0.060, -0.007],
      [0.137, 0.035, 0.043, 0.044, -0.005],
      [0.149, 0.010, 0.012, 0.012, -0.005]
    ]), hairMat);
    // Flowing back & side drape sweeping cleanly down to upper back
    const backCascade = mesh(g, profile([
      [-0.085, 0.062, 0.016, 0.024, -0.048],
      [-0.045, 0.068, 0.020, 0.032, -0.042],
      [0.005, 0.066, 0.024, 0.038, -0.036],
      [0.055, 0.058, 0.028, 0.044, -0.028],
      [0.092, 0.050, 0.030, 0.048, -0.020]
    ]), hairMat);
    backCascade.rotation.x = 0.05;
    for (const s of [-1, 1]) {
      const lock = ellipsoid(g, hairMat, s * 0.045, 0.050, 0.014, 0.015, 0.065, 0.022);
      lock.rotation.set(-0.08, -s * 0.25, s * 0.14);
      const temple = ellipsoid(g, hairMat, s * 0.030, 0.115, 0.032, 0.026, 0.020, 0.030);
      temple.rotation.set(0.22, -s * 0.28, s * 0.22);
    }
  }

  // Child hair: rounded cap + soft tousled bangs & crown tufts
  {
    const g = hairGroups.child;
    mesh(g, profile([
      [0.072, 0.051, 0.016, 0.061, -0.005],
      [0.096, 0.054, 0.044, 0.064, -0.006],
      [0.119, 0.048, 0.056, 0.058, -0.006],
      [0.137, 0.034, 0.042, 0.042, -0.005],
      [0.148, 0.009, 0.011, 0.011, -0.004]
    ]), hairMat);
    const crownTuft = ellipsoid(g, hairMat, 0.004, 0.128, 0.016, 0.042, 0.022, 0.040);
    crownTuft.rotation.set(0.14, 0.1, 0.08);
    const bangs = ellipsoid(g, hairMat, 0, 0.105, 0.044, 0.038, 0.014, 0.020);
    bangs.rotation.set(0.32, 0, 0.06);
    for (const s of [-1, 1]) {
      ellipsoid(g, hairMat, s * 0.046, 0.086, 0.004, 0.010, 0.022, 0.024);
    }
  }

  // --- Shared Limb Geometries & Visual Scaling Sub-groups ---
  const thighShape = profile([
    [-0.244, 0.030, 0.031, 0.031, 0],
    [-0.210, 0.037, 0.039, 0.038, 0],
    [-0.140, 0.045, 0.051, 0.048, 0.002],
    [-0.070, 0.052, 0.058, 0.056, 0.001],
    [-0.020, 0.053, 0.059, 0.060, 0],
    [0.018, 0.038, 0.047, 0.049, 0]
  ]);
  const calfShape = profile([
    [-0.214, 0.025, 0.026, 0.027, 0],
    [-0.198, 0.032, 0.034, 0.034, 0],
    [-0.145, 0.035, 0.036, 0.038, -0.003],
    [-0.088, 0.040, 0.038, 0.045, -0.005],
    [-0.035, 0.035, 0.037, 0.038, 0],
    [0.008, 0.033, 0.035, 0.035, 0]
  ]);
  // Casual sneaker upper + crisp white midsole trim + exact #57524d grounded sole
  const shoeShape = profile([
    [-0.042, 0.033, 0.070, 0.042, 0.018],
    [-0.028, 0.035, 0.072, 0.043, 0.018],
    [-0.016, 0.032, 0.054, 0.039, 0.011],
    [-0.002, 0.029, 0.034, 0.034, -0.002],
    [0.014, 0.028, 0.031, 0.032, -0.004]
  ]);
  const shoeTrimShape = profile([
    [-0.046, 0.034, 0.071, 0.043, 0.018],
    [-0.039, 0.035, 0.072, 0.044, 0.018]
  ]);
  const soleShape = profile([
    [-0.052, 0.032, 0.070, 0.042, 0.018],
    [-0.046, 0.034, 0.071, 0.043, 0.018]
  ]);
  const sleeveShape = profile([
    [-0.098, 0.035, 0.039, 0.039, 0],
    [-0.082, 0.038, 0.042, 0.042, 0],
    [-0.042, 0.042, 0.046, 0.046, 0],
    [-0.006, 0.040, 0.044, 0.044, 0],
    [0.020, 0.032, 0.037, 0.037, 0],
    [0.034, 0.014, 0.020, 0.020, 0]
  ]);
  const armShape = profile([
    [-0.152, 0.025, 0.026, 0.026, 0],
    [-0.125, 0.029, 0.030, 0.030, 0],
    [-0.082, 0.032, 0.033, 0.033, 0],
    [-0.040, 0.034, 0.036, 0.036, 0]
  ]);
  const forearmShape = profile([
    [-0.136, 0.018, 0.021, 0.021, 0],
    [-0.114, 0.021, 0.023, 0.023, 0],
    [-0.070, 0.027, 0.029, 0.029, 0],
    [-0.028, 0.030, 0.031, 0.031, 0],
    [0.006, 0.024, 0.025, 0.025, 0]
  ]);

  const soles = [];
  const soleMeshes = [];
  const limbs = [];
  const visualScalers = [];

  for (const s of [-1, 1]) {
    const pMale = CHAR_PROFILES.male;
    const thigh = joint(hip, s * pMale.thighX, 0, 0);
    const calf = joint(thigh, 0, -pMale.thighLen, 0);
    const foot = joint(calf, 0, -pMale.calfLen, 0);

    const thighVis = new T.Group();
    const calfVis = new T.Group();
    const footVis = new T.Group();
    thigh.add(thighVis);
    calf.add(calfVis);
    foot.add(footVis);

    mesh(thighVis, thighShape, bottom);
    ellipsoid(thighVis, bottom, 0, 0, 0, 0.036, 0.038, 0.040); // smooth hip joint blend
    ellipsoid(calfVis, bottom, 0, 0, 0, 0.033, 0.034, 0.036); // knee cap smoothness
    mesh(calfVis, calfShape, bottom);
    // Ankle transition inside sneaker collar
    mesh(footVis, profile([[0.004, 0.023, 0.024, 0.024, 0], [0.022, 0.025, 0.026, 0.026, 0]]), skin);
    mesh(footVis, shoeShape, shoe);
    mesh(footVis, shoeTrimShape, shoeTrim);
    const tongue = ellipsoid(footVis, shoe, 0, -0.009, 0.024, 0.020, 0.011, 0.018);
    tongue.rotation.x = 0.55;
    // Keep sole mesh parented directly on foot joint so foot.getWorldDirection works identically
    const soleMesh = mesh(foot, soleShape, sole);
    soles.push(soleMesh);
    soleMeshes.push(soleMesh);

    const arm = joint(spine, s * pMale.armX, pMale.armY, 0);
    const elbow = joint(arm, 0, -pMale.upperArmLen, 0);
    const armVis = new T.Group();
    const elbowVis = new T.Group();
    arm.add(armVis);
    elbow.add(elbowVis);

    mesh(armVis, sleeveShape, top);
    ellipsoid(armVis, top, 0, 0.006, 0, 0.036, 0.034, 0.038); // smooth shoulder deltoid cap
    mesh(armVis, armShape, skin);
    ellipsoid(armVis, skin, 0, -0.148, 0, 0.026, 0.026, 0.026); // elbow sphere blend
    mesh(elbowVis, forearmShape, skin);

    // Sculpted palm + gently curled fingers + opposable thumb
    const handGroup = new T.Group();
    handGroup.position.set(0, -0.140, 0.003);
    elbowVis.add(handGroup);
    ellipsoid(handGroup, skin, 0, -0.016, 0, 0.013, 0.020, 0.016);
    const thumbPivot = joint(handGroup, -s * 0.008, -0.012, 0.012);
    thumbPivot.rotation.set(-0.32, 0, s * 0.35);
    ellipsoid(thumbPivot, skin, 0, -0.011, 0.003, 0.0055, 0.012, 0.0058);
    const fingerSpecs = [
      [-0.009, -0.034, 0.006, 0.013],
      [-0.003, -0.036, 0.004, 0.0145],
      [0.003, -0.035, 0.002, 0.0135],
      [0.009, -0.032, -0.001, 0.0115]
    ];
    for (const [fx, fy, fz, fl] of fingerSpecs) {
      const f = ellipsoid(handGroup, skin, s * fx, fy, fz, 0.0042, fl, 0.0046);
      f.rotation.x = -0.18;
    }

    limbs.push({ s, thigh, calf, foot, arm, elbow });
    visualScalers.push({ thighVis, calfVis, footVis, soleMesh, armVis, elbowVis });
  }

  let lastPersonState = null;
  // Preserve exact 13-joint rig order expected by person-motion.json Mixamo clips
  const rig = [hip, spine, head, ...limbs.flatMap(({ thigh, calf, foot, arm, elbow }) =>
    [thigh, calf, foot, arm, elbow])];
  const sampleA = new T.Quaternion();
  const sampleB = new T.Quaternion();
  const gaze = new T.Quaternion();
  const gazeAngles = new T.Euler(0, 0, 0, 'YXZ');
  const aim = new T.Quaternion();
  const aimYaw = new T.Quaternion();
  const xAxis = new T.Vector3(1, 0, 0);
  const yAxis = new T.Vector3(0, 1, 0);
  const soleVertices = soleShape.getAttribute('position');

  function layer(clip, progress, weight, from = 0, to = rig.length, mirror = false) {
    if (weight <= 0) return;
    const frame = frameIndex(clip, progress);
    const i = Math.floor(frame);
    const a = clip.frames[i];
    const b = clip.frames[Math.min(i + 1, clip.frames.length - 1)];
    for (let j = from; j < to; j++) {
      const source = mirror && j >= 3 ? j + (j < 8 ? 5 : -5) : j;
      const offset = 1 + source * 4;
      sampleA.fromArray(a, offset).normalize();
      sampleB.fromArray(b, offset).normalize();
      sampleA.slerp(sampleB, frame - i);
      if (mirror) { sampleA.y *= -1; sampleA.z *= -1; }
      rig[j].quaternion.slerp(sampleA, weight);
    }
  }

  function ground(seatBlend, seatHeight) {
    hip.position.y = 0;
    root.updateWorldMatrix(true, true);
    let lowest = Infinity;
    for (const soleObj of soles) {
      const e = soleObj.matrixWorld.elements;
      for (let i = 0; i < soleVertices.count; i++) {
        const y = e[1] * soleVertices.getX(i) + e[5] * soleVertices.getY(i) +
          e[9] * soleVertices.getZ(i) + e[13];
        lowest = Math.min(lowest, y);
      }
    }
    const floorHip = (root.matrixWorld.elements[13] - lowest) / (root.matrixWorld.elements[5] || 1);
    hip.position.y = seatHeight ? T.MathUtils.lerp(floorHip, seatHeight + 0.032, seatBlend) : floorHip;
  }

  function applyStaticPose(seated) {
    const thighPitch = seated ? -1.48 : 0;
    const shinPitch = seated ? 0.07 : 0;
    hip.quaternion.identity();
    spine.rotation.set(seated ? -0.08 : 0, 0, 0);
    head.rotation.set(0, 0, 0);
    for (const { s, thigh, calf, foot, arm, elbow } of limbs) {
      thigh.rotation.set(thighPitch, s * 0.055, 0, 'YXZ');
      calf.rotation.set(shinPitch - thighPitch, 0, 0);
      foot.rotation.set(-shinPitch, 0, 0);
      arm.rotation.set(seated ? -0.34 : 0.06, 0, s * (seated ? 0.12 : 0.07));
      elbow.rotation.set(seated ? -1.05 : -0.18, 0, 0);
    }
    ground(seated ? 1 : 0, 0);
  }

  function update(p) {
    lastPersonState = p;
    root.visible = p.visible;
    if (!p.visible) return;

    const charKey = Object.hasOwn(CHAR_PROFILES, p.character) ? p.character : 'male';
    const prof = CHAR_PROFILES[charKey];
    const baseProf = CHAR_PROFILES.male;

    for (const k of CHARACTER_TYPES) {
      const active = k === charKey;
      torsoGroups[k].visible = active;
      torsoGroups[k].scale.setScalar(active ? 1 : 0.0001);
      hairGroups[k].visible = active;
      hairGroups[k].scale.setScalar(active ? 1 : 0.0001);
    }

    head.position.set(0, prof.headY, 0);
    headVisual.scale.set(...prof.headScale);

    const thighYScale = prof.thighLen / baseProf.thighLen;
    const calfYScale = prof.calfLen / baseProf.calfLen;
    const armYScale = prof.upperArmLen / baseProf.upperArmLen;

    limbs.forEach((limb, idx) => {
      const vis = visualScalers[idx];
      const s = limb.s;
      limb.thigh.position.set(s * prof.thighX, 0, 0);
      limb.calf.position.set(0, -prof.thighLen, 0);
      limb.foot.position.set(0, -prof.calfLen, 0);
      limb.arm.position.set(s * prof.armX, prof.armY, 0);
      limb.elbow.position.set(0, -prof.upperArmLen, 0);

      vis.thighVis.scale.set(prof.legScaleX, thighYScale, prof.legScaleZ);
      vis.calfVis.scale.set(prof.legScaleX, calfYScale, prof.legScaleZ);
      vis.footVis.scale.set(...prof.footScale);
      vis.soleMesh.scale.set(...prof.footScale);
      vis.armVis.scale.set(prof.armScaleX, armYScale, prof.armScaleZ);
      vis.elbowVis.scale.set(prof.armScaleX, armYScale, prof.armScaleZ);
    });

    const build = p.build === 'slim' ? 0.84 : p.build === 'broad' ? 1.19 : 1;
    root.scale.set(p.height * build, p.height, p.height * (0.45 + 0.55 * build));
    root.rotation.y = T.MathUtils.degToRad(p.yaw);

    const hairHex = p.hair || CHARACTER_PRESETS[charKey].defaultHair;
    skin.color.set(p.skin);
    skin.sheenColor.copy(skin.color).lerp(WHITE, 0.25);
    skinShadow.color.copy(skin.color).lerp(DARK_SKIN_MIX, 0.22);
    lipMat.color.copy(skin.color).lerp(ROSE, prof.lipTint);
    hairMat.color.set(hairHex);
    hairMat.sheenColor.copy(hairMat.color).lerp(WHITE, 0.28);
    browMat.color.copy(hairMat.color).lerp(DARK_HAIR_MIX, 0.24);
    top.color.set(p.top);
    bottom.color.set(p.bottom);
    rib.color.copy(top.color).multiplyScalar(0.78);
    top.sheenColor.copy(top.color).lerp(WHITE, 0.35);
    bottom.sheenColor.copy(bottom.color).lerp(WHITE, 0.35);
    rib.sheenColor.copy(rib.color).lerp(WHITE, 0.35);

    applyStaticPose(p.pose === 'seated');
  }

  function setMotion(motion) {
    if (!motion) {
      applyStaticPose(lastPersonState?.pose === 'seated');
      return;
    }
    const seated = unit(motion.sitBlend ?? 0);
    const walking = unit(motion.walkBlend ?? 0) * (1 - seated);
    const cycle = (motion.walkPhase ?? 0) / TAU;
    const idle = (motion.idleTime ?? 0) / clips.idle.duration;
    layer(clips.idle, idle % 1, 1);
    layer(clips.walk, cycle % 1, smooth(walking));
    layer(clips.seated, 0, seated);

    if (motion.turn != null) {
      const { angle, progress } = motion.turn;
      layer(turnClip(angle), progress, blendWindow(progress) * unit(Math.abs(angle) / (Math.PI / 2)));
    }
    if (motion.inspect != null) {
      layer(clips.inspect, motion.inspect, blendWindow(motion.inspect), 1, 3);
    }
    if (motion.reachBlend > 0) {
      const u = unit(motion.reachProgress ?? 0);
      const mirrored = motion.reachSide >= 0;
      const arm = mirrored ? 11 : 6;
      const weight = motion.reachBlend * blendWindow(u);
      layer(clips.reach, u, weight * 0.55, 1, 3, mirrored);
      layer(clips.reach, u, weight, arm, arm + 2, mirrored);
      // Fit the captured gesture to the varying height and azimuth of the furniture control.
      const height = T.MathUtils.clamp(motion.reachHeightNorm, 0.22, 0.90);
      rig[arm].quaternion.premultiply(aim.setFromAxisAngle(xAxis, (0.63 - height) * 2.7 * weight));
      if (motion.reachYaw) {
        const yawAim = T.MathUtils.clamp(motion.reachYaw, -0.55, 0.55);
        rig[arm].quaternion.premultiply(aimYaw.setFromAxisAngle(yAxis, yawAim * weight));
      }
    }

    gazeAngles.set(motion.headPitch ?? 0, motion.headYaw ?? 0, 0, 'YXZ');
    head.quaternion.multiply(gaze.setFromEuler(gazeAngles));
    ground(seated, motion.seatHeightNorm);
  }

  function turnProgress(angle, progress) {
    const clip = turnClip(angle);
    const end = clip.frames.length - 1;
    const frame = frameIndex(clip, progress);
    const i = Math.floor(frame);
    return T.MathUtils.lerp(clip.frames[i][0], clip.frames[Math.min(i + 1, end)][0], frame - i) / clip.frames[end][0];
  }

  return { root, update, setMotion, turnProgress, walkTravel: clips.walk.travel };
}
