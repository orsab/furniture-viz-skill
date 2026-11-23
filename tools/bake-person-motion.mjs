import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { AnimationMixer, Euler, LoopOnce, Quaternion, Vector3 } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Pass a directory containing these animation-only GLBs. Run offline after downloading
// the source clips, then redirect stdout to app/person-motion.json. Do not ship the GLBs.
const files = {
  idle: ['Neutral_Idle', 0, null, true],
  walk: ['Walking', 0, null, true],
  seated: ['Seated_Idle', 0, 0, false],
  inspect: ['Looking_Around', 0, 2.35, false],
  reach: ['Button_Pushing', .58, 2.65, false],
  turnLeft: ['Unarmed_Turn_Left_90', 0, null, false],
  turnRight: ['Unarmed_Turn_Right_90', 0, null, false]
};
const order = [
  ['Hips', -1], ['Spine2', 0], ['Head', 1],
  ...['Right', 'Left'].flatMap((s, i) => {
    const n = 3 + 5 * i;
    return [[s + 'UpLeg', 0, s + 'Leg'], [s + 'Leg', n, s + 'Foot'],
      [s + 'Foot', n + 1], [s + 'Arm', 1, s + 'ForeArm'],
      [s + 'ForeArm', n + 3, s + 'Hand']];
  })
];
const down = new Vector3(0, -1, 0);
const yAxis = new Vector3(0, 1, 0);
const round = n => Math.round(n * 10000) / 10000;
const result = {};
for (const [key, [file, start, stop, loop]] of Object.entries(files)) {
  const bytes = await readFile(join(process.argv[2], file + '.glb'));
  const { scene, animations: [clip] } = await new GLTFLoader().parseAsync(Uint8Array.from(bytes).buffer, '');
  const bone = name => scene.getObjectByName('mixamorig' + name);
  const hips = bone('Hips');
  const correction = order.map(([name, , childName]) => {
    const source = bone(name);
    const desired = new Quaternion();
    if (childName) {
      const direction = bone(childName).getWorldPosition(new Vector3()).sub(source.getWorldPosition(new Vector3())).normalize();
      desired.setFromUnitVectors(down, direction);
    }
    return source.getWorldQuaternion(new Quaternion()).invert().multiply(desired);
  });
  const mixer = new AnimationMixer(scene);
  const action = mixer.clipAction(clip).setLoop(LoopOnce, 1).play();
  action.clampWhenFinished = true;
  const duration = (stop ?? clip.duration) - start;
  const count = Math.ceil(duration * 20);
  const frames = [];
  let firstYaw, firstZ;
  const turning = key.startsWith('turn');
  for (let i = 0; i <= count; i++) {
    action.paused = false;
    mixer.setTime(start + (count ? i / count * duration : 0));
    scene.updateMatrixWorld(true);
    const yaw = new Euler().setFromQuaternion(hips.quaternion, 'YXZ').y;
    firstYaw ??= yaw;
    firstZ ??= hips.position.z;
    const heading = turning ? yaw : firstYaw;
    const unrotate = new Quaternion().setFromAxisAngle(yAxis, -heading);
    const world = order.map(([name], j) => bone(name).getWorldQuaternion(new Quaternion()).premultiply(unrotate).multiply(correction[j]));
    const frame = [turning ? yaw - firstYaw : 0, ...world.flatMap((q, j) => {
      const parent = order[j][1];
      return (parent < 0 ? q : world[parent].clone().invert().multiply(q)).toArray();
    })];
    frames.push(frame.map(round));
  }
  const travel = key === 'walk' ? (hips.position.z - firstZ) / 1.8 : 0;
  if (loop) frames[count] = frames[0];
  result[key] = { duration: round(duration), travel: round(travel), frames };
}
console.log(JSON.stringify(result, null, 0));
