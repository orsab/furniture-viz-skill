import * as T from 'three';

const WHITE = new T.Color(0xffffff);

// An original scale figure. All dimensions here are fractions of its standing height.
// Ring profiles read bottom to top: elevation, half-width, half-depth, forward offset.
function profile(rings) {
  const n = 32, vertices = [], indices = [];
  for (let j = 0; j < rings.length; j++) {
    const [y, rx, rz, z = 0] = rings[j];
    for (let i = 0; i < n; i++) {
      const angle = i * 2 * Math.PI / n;
      vertices.push(Math.sin(angle) * rx, y, Math.cos(angle) * rz + z);
      if (j) {
        const a = (j - 1) * n + i, b = (j - 1) * n + (i + 1) % n;
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
  const skin = material('#ad8265', .68, { clearcoat: 0.04, clearcoatRoughness: 0.6 });
  const top = material('#55756e', .92, { sheen: 0.35, sheenRoughness: 0.8, envMapIntensity: 0.8 });
  const bottom = material('#565755', .92, { sheen: 0.35, sheenRoughness: 0.8, envMapIntensity: 0.8 });
  const rib = material('#475e59', .92, { sheen: 0.35, sheenRoughness: 0.8, envMapIntensity: 0.8 });
  const sole = material('#57524d', .82);
  const shoe = material('#ddd7c9', .84);
  const ball = new T.SphereGeometry(1, 24, 16);
  const joint = (parent, x, y, z) => {
    const g = new T.Group(); g.position.set(x, y, z); parent.add(g); return g;
  };
  const mesh = (parent, g, mat, x = 0, y = 0, z = 0) => {
    const m = new T.Mesh(g, mat); m.position.set(x, y, z);
    m.castShadow = m.receiveShadow = true;
    m.userData.interactive = { type: 'person', label: 'Reference person' };
    parent.add(m); return m;
  };
  const ellipsoid = (parent, mat, x, y, z, w, h, d) => {
    const m = mesh(parent, ball, mat, x, y, z); m.scale.set(w, h, d); return m;
  };
  const hip = joint(root, 0, 0, 0), spine = joint(hip, 0, 0, 0), head = joint(spine, 0, .335, 0);
  mesh(spine, profile([[-.044,.048,.04],[-.029,.083,.06],[-.003,.094,.066],
    [.035,.09,.057],[.057,.081,.052]]), bottom);
  mesh(spine, profile([[.025,.086,.056],[.031,.09,.058],[.08,.088,.057],
    [.15,.093,.063],[.212,.109,.069,.005],[.25,.116,.064,.002],
    [.279,.111,.056,-.002],[.298,.078,.046],[.309,.044,.037]]), top);
  mesh(spine, profile([[.303,.047,.041],[.311,.044,.037],[.315,.04,.034]]), rib);
  ellipsoid(spine, skin, 0,.328,.001, .036,.047,.033);
  mesh(head, profile([[0,.019,.024,.012],[.007,.033,.036,.012],
    [.025,.043,.048,.006],[.052,.05,.056],[.076,.052,.058,-.003],
    [.103,.049,.055,-.005],[.126,.037,.044,-.005],[.139,.019,.024,-.003],
    [.143,.002,.003,-.003]]), skin);
  ellipsoid(head, skin, 0,.054,.052, .011,.015,.012);
  const limbs = [];
  const thighShape = profile([[-.257,.028,.03],[-.242,.04,.041],[-.203,.043,.045],
    [-.12,.047,.053],[-.052,.053,.061],[-.012,.05,.061],[.016,.036,.048]]);
  const calfShape = profile([[-.219,.029,.032],[-.213,.032,.034],[-.14,.034,.038,-.005],
    [-.092,.039,.044,-.007],[-.035,.035,.039],[.003,.037,.039],[.01,.031,.033]]);
  const shoeShape = profile([[-.049,.033,.069,.026],[-.041,.036,.074,.026],
    [-.025,.034,.07,.024],[-.014,.033,.049,.013],[.013,.029,.032,-.003]]);
  const soleShape = profile([[-.053,.031,.068,.026],[-.051,.036,.074,.026],[-.044,.036,.074,.026]]);
  const sleeve = profile([[-.1,.036,.041],[-.093,.039,.043],[-.052,.042,.048],
    [-.011,.041,.046],[.015,.034,.039],[.03,.012,.019]]);
  const armShape = profile([[-.156,.025,.026],[-.146,.031,.031],[-.091,.032,.034],[-.04,.034,.037]]);
  const forearm = profile([[-.137,.018,.02],[-.116,.02,.022],[-.073,.025,.029],
    [-.035,.029,.031],[.004,.025,.026]]);
  for (const s of [-1, 1]) {
    ellipsoid(head, skin, s * .049,.060,0, .009,.015,.01);
    const thigh = joint(hip, s * .048,0,0), calf = joint(thigh,0,-.242,0);
    const foot = joint(calf,0,-.227,0);
    mesh(thigh,thighShape,bottom); mesh(calf,calfShape,bottom);
    mesh(foot,shoeShape,shoe); mesh(foot,soleShape,sole);
    const arm = joint(spine,s * .108,.271,0), elbow = joint(arm,0,-.148,0);
    mesh(arm,sleeve,top); mesh(arm,armShape,skin); mesh(elbow,forearm,skin);
    ellipsoid(elbow,skin,0,-.166,.004,.02,.042,.017);
    ellipsoid(elbow,skin,-s * .013,-.159,.016,.009,.021,.009).rotation.x = -.28;
    limbs.push({s, thigh, calf, foot, arm, elbow});
  }
  let lastPersonState = null;

  function applyStaticPose(seated) {
    const thighPitch = seated ? -1.48 : 0, shinPitch = seated ? .07 : 0;
    // Solve hip height from both rigid segments so the shoe soles stay on the floor.
    hip.position.y = .053 + .242 * Math.cos(thighPitch) + .227 * Math.cos(shinPitch);
    spine.rotation.set(seated ? -.08 : 0, 0, 0);
    head.rotation.set(0, 0, 0);
    for (const {s, thigh, calf, foot, arm, elbow} of limbs) {
      thigh.rotation.set(thighPitch, s * .055, 0, 'YXZ');
      calf.rotation.x = shinPitch - thighPitch;
      foot.rotation.x = -shinPitch;
      arm.rotation.set(seated ? -.34 : .08, 0, s * (seated ? .12 : .075));
      elbow.rotation.x = seated ? -1.05 : -.18;
    }
  }

  function update(p) {
    lastPersonState = p;
    root.visible = p.visible;
    if (!p.visible) return;
    const build = p.build === 'slim' ? .84 : p.build === 'broad' ? 1.19 : 1;
    root.scale.set(p.height * build, p.height, p.height * (.45 + .55 * build));
    root.rotation.y = T.MathUtils.degToRad(p.yaw);
    skin.color.set(p.skin); top.color.set(p.top); bottom.color.set(p.bottom);
    rib.color.copy(top.color).multiplyScalar(.78);
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
    const walkPhase = motion.walkPhase ?? 0;
    const sitBlend = T.MathUtils.clamp(motion.sitBlend ?? 0, 0, 1);
    const walkBlend = T.MathUtils.clamp(motion.walkBlend ?? 0, 0, 1) * (1 - sitBlend);
    const reachBlend = T.MathUtils.clamp(motion.reachBlend ?? 0, 0, 1);
    const reachSide = motion.reachSide >= 0 ? 1 : -1;
    const reachHeightNorm = T.MathUtils.clamp(motion.reachHeightNorm ?? 0.55, 0.2, 0.95);
    const idleTime = motion.idleTime ?? 0;

    const baseThighPitch = -1.48 * sitBlend;
    const baseShinPitch = 0.07 * sitBlend;
    const standHipY = 0.053 + 0.242 * Math.cos(baseThighPitch) + 0.227 * Math.cos(baseShinPitch);
    const seatHipY = motion.seatHeightNorm
      ? T.MathUtils.clamp(motion.seatHeightNorm + 0.02, 0.21, 0.36)
      : 0.053 + 0.242 * Math.cos(-1.48) + 0.227 * Math.cos(0.07);
    const strideLift = Math.abs(Math.sin(walkPhase)) * 0.015 * walkBlend;
    hip.position.y = standHipY + (seatHipY - standHipY) * sitBlend + strideLift;

    const breathe = Math.sin(idleTime * 1.9) * 0.014 * (1 - walkBlend);
    const reachLean = reachBlend * Math.max(0, 0.52 - reachHeightNorm) * 0.45;
    spine.rotation.set(
      (-0.08 * sitBlend) - reachLean + breathe,
      Math.sin(walkPhase) * 0.055 * walkBlend,
      0
    );
    head.rotation.set(
      T.MathUtils.clamp(motion.headPitch ?? 0, -0.45, 0.45) - breathe * 0.4,
      T.MathUtils.clamp(motion.headYaw ?? 0, -0.7, 0.7),
      0
    );

    for (const { s, thigh, calf, foot, arm, elbow } of limbs) {
      const phaseOffset = s < 0 ? 0 : Math.PI;
      const stride = Math.sin(walkPhase + phaseOffset) * 0.48 * walkBlend;
      const kneeBend = Math.max(0, -Math.sin(walkPhase + phaseOffset)) * 0.65 * walkBlend;
      const tPitch = baseThighPitch + stride;
      const sPitch = baseShinPitch + kneeBend;
      thigh.rotation.set(tPitch, s * 0.055, 0, 'YXZ');
      calf.rotation.x = sPitch - tPitch;
      foot.rotation.x = -sPitch;

      const armSwing = -Math.sin(walkPhase + phaseOffset) * 0.42 * walkBlend;
      const restArmPitch = (0.08 + Math.sin(idleTime * 1.4 + s) * 0.025) * (1 - sitBlend) + (-0.34 * sitBlend);
      const restElbowPitch = (-0.18 + Math.sin(idleTime * 1.4 + s) * 0.02) * (1 - sitBlend) + (-1.05 * sitBlend);
      const isReachArm = s === reachSide;
      const rWeight = isReachArm ? reachBlend : 0;
      const reachArmPitch = -0.35 - (reachHeightNorm - 0.25) * 1.35;
      const reachElbowPitch = -0.55 + (reachHeightNorm - 0.5) * 0.35;

      arm.rotation.set(
        (restArmPitch + armSwing) * (1 - rWeight) + reachArmPitch * rWeight,
        0,
        s * ((0.075 * (1 - sitBlend) + 0.12 * sitBlend) * (1 - rWeight) + 0.06 * rWeight)
      );
      elbow.rotation.x = restElbowPitch * (1 - rWeight) + reachElbowPitch * rWeight;
    }
  }

  return { root, update, setMotion };
}
