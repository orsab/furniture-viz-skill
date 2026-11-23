import * as T from 'three';
import clips from './person-motion.json' with { type: 'json' };

const WHITE = new T.Color(0xffffff);
const TAU = Math.PI * 2;
const smooth = x => x * x * (3 - 2 * x);
const unit = x => T.MathUtils.clamp(x, 0, 1);
const blendWindow = u => smooth(unit(Math.min(u, 1 - u) * 6));
const turnClip = angle => angle >= 0 ? clips.turnLeft : clips.turnRight;

function frameIndex(clip, progress) {
  return unit(progress) * (clip.frames.length - 1);
}

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
  const soles = [];
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
    mesh(foot,shoeShape,shoe);
    soles.push(mesh(foot,soleShape,sole));
    const arm = joint(spine,s * .108,.271,0), elbow = joint(arm,0,-.148,0);
    mesh(arm,sleeve,top); mesh(arm,armShape,skin); mesh(elbow,forearm,skin);
    ellipsoid(elbow,skin,0,-.166,.004,.02,.042,.017);
    ellipsoid(elbow,skin,-s * .013,-.159,.016,.009,.021,.009).rotation.x = -.28;
    limbs.push({s, thigh, calf, foot, arm, elbow});
  }
  let lastPersonState = null;
  const rig = [hip, spine, head, ...limbs.flatMap(({ thigh, calf, foot, arm, elbow }) =>
    [thigh, calf, foot, arm, elbow])];
  const sampleA = new T.Quaternion(), sampleB = new T.Quaternion();
  const gaze = new T.Quaternion(), gazeAngles = new T.Euler(0, 0, 0, 'YXZ');
  const aim = new T.Quaternion(), xAxis = new T.Vector3(1, 0, 0);
  const soleVertices = soleShape.getAttribute('position');

  function layer(clip, progress, weight, from = 0, to = rig.length, mirror = false) {
    if (weight <= 0) return;
    const frame = frameIndex(clip, progress);
    const i = Math.floor(frame);
    const a = clip.frames[i], b = clip.frames[Math.min(i + 1, clip.frames.length - 1)];
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
    for (const sole of soles) {
      const e = sole.matrixWorld.elements;
      for (let i = 0; i < soleVertices.count; i++) {
        const y = e[1] * soleVertices.getX(i) + e[5] * soleVertices.getY(i) +
          e[9] * soleVertices.getZ(i) + e[13];
        lowest = Math.min(lowest, y);
      }
    }
    const floorHip = (root.matrixWorld.elements[13] - lowest) / root.matrixWorld.elements[5];
    hip.position.y = seatHeight ? T.MathUtils.lerp(floorHip, seatHeight + .032, seatBlend) : floorHip;
  }

  function applyStaticPose(seated) {
    const thighPitch = seated ? -1.48 : 0, shinPitch = seated ? .07 : 0;
    // Solve hip height from both rigid segments so the shoe soles stay on the floor.
    hip.quaternion.identity();
    hip.position.y = .053 + .242 * Math.cos(thighPitch) + .227 * Math.cos(shinPitch);
    spine.rotation.set(seated ? -.08 : 0, 0, 0);
    head.rotation.set(0, 0, 0);
    for (const {s, thigh, calf, foot, arm, elbow} of limbs) {
      thigh.rotation.set(thighPitch, s * .055, 0, 'YXZ');
      calf.rotation.set(shinPitch - thighPitch, 0, 0);
      foot.rotation.set(-shinPitch, 0, 0);
      arm.rotation.set(seated ? -.34 : .08, 0, s * (seated ? .12 : .075));
      elbow.rotation.set(seated ? -1.05 : -.18, 0, 0);
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
      layer(clips.reach, u, weight * .55, 1, 3, mirrored);
      layer(clips.reach, u, weight, arm, arm + 2, mirrored);
      // Fit the captured gesture to the varying height of the furniture control.
      const height = T.MathUtils.clamp(motion.reachHeightNorm, .28, .88);
      rig[arm].quaternion.premultiply(aim.setFromAxisAngle(xAxis, (.63 - height) * 2.7 * weight));
    }

    gazeAngles.set(motion.headPitch ?? 0, motion.headYaw ?? 0, 0, 'YXZ');
    head.quaternion.multiply(gaze.setFromEuler(gazeAngles));
    ground(seated, motion.seatHeightNorm);
  }

  function turnProgress(angle, progress) {
    const clip = turnClip(angle);
    const end = clip.frames.length - 1;
    const frame = frameIndex(clip, progress), i = Math.floor(frame);
    return T.MathUtils.lerp(clip.frames[i][0], clip.frames[Math.min(i + 1, end)][0], frame - i) / clip.frames[end][0];
  }

  return { root, update, setMotion, turnProgress, walkTravel: clips.walk.travel };
}
