export const STUDIO_PRESETS = {
  daylight: {
    label: 'Daylight',
    bgInner: '#f4f0e8', bgOuter: '#ded6c7',
    hemiSky: 0xfff9ee, hemiGround: 0xe3d6c4, hemiIntensity: 0.56,
    keyColor: 0xfff5e4, keyIntensity: 2.35,
    fillColor: 0xdce8ff, fillIntensity: 0.72,
    rimColor: 0xfff1db, rimIntensity: 0.55,
    exposure: 1.04, envIntensity: 0.85,
    envSoftbox: 0xfffcf5, envWindow: 0xeaf2ff, envRim: 0xfff0d6, envFloor: 0xd7cebe, envWall: 0xc2b8a8,
    lightBoost: 1
  },
  gallery: {
    label: 'Warm gallery',
    bgInner: '#efe7d8', bgOuter: '#d5c7b2',
    hemiSky: 0xfff1dc, hemiGround: 0xdac6ae, hemiIntensity: 0.52,
    keyColor: 0xffe6bf, keyIntensity: 2.45,
    fillColor: 0xe6e8f2, fillIntensity: 0.6,
    rimColor: 0xffdcae, rimIntensity: 0.7,
    exposure: 1.02, envIntensity: 0.88,
    envSoftbox: 0xfff3de, envWindow: 0xffe4bc, envRim: 0xffd5a1, envFloor: 0xcab9a1, envWall: 0xb6a48c,
    lightBoost: 1.15
  },
  crisp: {
    label: 'Crisp neutral',
    bgInner: '#f5f6f4', bgOuter: '#dee1de',
    hemiSky: 0xffffff, hemiGround: 0xdcdfdc, hemiIntensity: 0.58,
    keyColor: 0xffffff, keyIntensity: 2.25,
    fillColor: 0xe4ecff, fillIntensity: 0.8,
    rimColor: 0xf4f7ff, rimIntensity: 0.5,
    exposure: 1.0, envIntensity: 0.85,
    envSoftbox: 0xffffff, envWindow: 0xeaf1ff, envRim: 0xf7f9ff, envFloor: 0xd6d9d6, envWall: 0xc0c4c0,
    lightBoost: 1
  },
  evening: {
    label: 'Warm evening',
    bgInner: '#2e2b27', bgOuter: '#171614',
    hemiSky: 0x4b5163, hemiGround: 0x26211c, hemiIntensity: 0.28,
    keyColor: 0xffd7a8, keyIntensity: 0.68,
    fillColor: 0x627392, fillIntensity: 0.28,
    rimColor: 0xffb978, rimIntensity: 0.42,
    exposure: 1.08, envIntensity: 0.34,
    envSoftbox: 0x625a50, envWindow: 0x4b5c78, envRim: 0x806045, envFloor: 0x2a2621, envWall: 0x1e1b18,
    lightBoost: 2.35
  }
};

export const LED_TEMPS = {
  '2700': { id: '2700', kelvin: 2700, color: '#ffbd75', emissive: '#ffcf91' },
  '3500': { id: '3500', kelvin: 3500, color: '#ffd8a8', emissive: '#ffe4bd' },
  '4500': { id: '4500', kelvin: 4500, color: '#fff2e2', emissive: '#fff7ec' }
};

export const ROOM_WALL_PRESETS = [
  { id: 'plaster', key: 'wallPlaster', hex: '#ece6dc' },
  { id: 'gallery', key: 'wallGallery', hex: '#f4f2ee' },
  { id: 'stone', key: 'wallStone', hex: '#d4cec4' },
  { id: 'sage', key: 'wallSage', hex: '#cad0c5' },
  { id: 'charcoal', key: 'wallCharcoal', hex: '#414346' }
];

export const ROOM_FLOOR_PRESETS = [
  { id: 'oak', key: 'floorOak', baseHex: '#b8946e', grainHex: '#9c7853', lineHex: '#7d5f41' },
  { id: 'stone', key: 'floorStone', baseHex: '#d9d3c8', grainHex: '#cbc4b7', lineHex: '#b3aba0' },
  { id: 'concrete', key: 'floorConcrete', baseHex: '#9d9d9a', grainHex: '#8d8e8b', lineHex: '#737472' }
];
