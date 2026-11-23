import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {
  STUDIO_PRESETS,
  LED_TEMPS,
  ROOM_WALL_PRESETS,
  ROOM_FLOOR_PRESETS
} from '../app/presets.mjs';
import { buildSpecSheetModel } from '../app/spec-sheet.mjs';
import { createTranslator } from '../app/i18n.mjs';
import { auditGeometry } from '../lib/geometry-qa.mjs';
import { validateSpec } from '../lib/spec.mjs';
import { initialState } from '../lib/state.mjs';

test('STUDIO_PRESETS includes calibrated evening preset with strong internal lightBoost', () => {
  for (const key of ['daylight', 'gallery', 'crisp', 'evening']) {
    const p = STUDIO_PRESETS[key];
    assert.ok(p, `Missing preset ${key}`);
    assert.equal(typeof p.lightBoost, 'number');
    assert.ok(p.lightBoost > 0);
  }
  assert.ok(STUDIO_PRESETS.evening.lightBoost > STUDIO_PRESETS.daylight.lightBoost);
  assert.ok(STUDIO_PRESETS.evening.keyIntensity < STUDIO_PRESETS.daylight.keyIntensity);
});

test('LED_TEMPS, ROOM_WALL_PRESETS, and ROOM_FLOOR_PRESETS expose valid presets', () => {
  assert.deepEqual(Object.keys(LED_TEMPS).sort(), ['2700', '3500', '4500']);
  for (const [id, entry] of Object.entries(LED_TEMPS)) {
    assert.equal(entry.id, id);
    assert.match(entry.color, /^#[\da-f]{6}$/i);
    assert.match(entry.emissive, /^#[\da-f]{6}$/i);
  }
  assert.ok(ROOM_WALL_PRESETS.length >= 4);
  for (const wall of ROOM_WALL_PRESETS) assert.match(wall.hex, /^#[\da-f]{6}$/i);
  assert.deepEqual(ROOM_FLOOR_PRESETS.map(f => f.id), ['oak', 'stone', 'concrete']);
});

test('buildSpecSheetModel produces structured Hebrew and English summaries across specs', async () => {
  const linea = JSON.parse(await fs.readFile(new URL('../examples/linea.json', import.meta.url), 'utf8'));
  const wardrobe = JSON.parse(await fs.readFile(new URL('../private/primary-bedroom-joinery-v2.json', import.meta.url), 'utf8'));
  const brand = { version: 1, businessName: 'Studio Test', logo: 'data:image/png;base64,iVBORw0KGgo=', description: 'Bespoke Joinery' };

  const heModel = buildSpecSheetModel({
    spec: wardrobe,
    state: initialState(wardrobe),
    brand,
    tr: createTranslator('he'),
    ledTempId: '2700',
    backdropMode: 'room'
  });
  assert.equal(heModel.rtl, true);
  assert.equal(heModel.businessName, 'Studio Test');
  assert.equal(heModel.ledKelvin, '2700K');
  assert.equal(heModel.backdropMode, 'room');
  assert.ok(heModel.finishes.length >= 1);
  assert.match(heModel.dimensionsText, /מ״מ/);

  const enModel = buildSpecSheetModel({
    spec: linea,
    state: initialState(linea),
    brand: null,
    tr: createTranslator('en'),
    ledTempId: '4500',
    backdropMode: 'studio'
  });
  assert.equal(enModel.rtl, false);
  assert.equal(enModel.ledKelvin, '4500K');
  assert.equal(enModel.businessName, 'Form Study');
  assert.match(enModel.dimensionsText, /mm/);

  const unlitModel = buildSpecSheetModel({
    spec: { ...linea, switches: [] },
    state: initialState(linea),
    brand: null,
    tr: createTranslator('en'),
    ledTempId: '4500',
    backdropMode: 'studio'
  });
  assert.equal(unlitModel.ledKelvin, null);
});

test('primary-bedroom mirror light is recessed inside vanity alcove and passes QA cleanly', async () => {
  const wardrobe = JSON.parse(await fs.readFile(new URL('../private/primary-bedroom-joinery-v2.json', import.meta.url), 'utf8'));
  validateSpec(wardrobe, { forExport: true });
  const qa = auditGeometry(wardrobe);
  assert.equal(qa.warnings.length, 0);

  const mirrorLight = wardrobe.switches.find(s => s.id === 'mirror-lights');
  assert.ok(mirrorLight?.light);
  const [lx, ly, lz] = mirrorLight.light.center;
  assert.ok(lx > 485 && lx < 1035, `Expected mirror light X inside vanity width [485, 1035], got ${lx}`);
  assert.ok(ly > 1220 && ly < 2730, `Expected mirror light Y inside mirror height, got ${ly}`);
  assert.ok(lz > -386 && lz < -307, `Expected mirror light Z inside vanity alcove [-386, -307], got ${lz}`);
});
