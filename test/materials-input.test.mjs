import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import {
  applyMaterialsToSpec,
  extractPaletteFromRgba,
  normalizeSurface,
  parseMaterialsFromText,
  SURFACE_TYPES
} from '../lib/materials-parse.mjs';
import { SURFACE_PROPS } from '../app/materials.mjs';
import { STRINGS } from '../app/i18n.mjs';
import { decodeImageToRgba } from '../lib/png-decode.mjs';
import { validateSpec } from '../lib/spec.mjs';

const execFileAsync = promisify(execFile);

test('parseMaterialsFromText extracts English, Hebrew, inline hex, and slot-mapped materials', () => {
  const existingSlots = [
    { id: 'fronts', label: 'Door & drawer fronts' },
    { id: 'hardware', label: 'Hardware' }
  ];
  const parsed = parseMaterialsFromText(
    'Fronts: Sage green, Warm Walnut #6a4c36 wood; Hardware: פליז מוברש, Graphite',
    { existingSlots }
  );
  assert.equal(parsed.length, 4);
  assert.equal(parsed[0].slotId, 'fronts');
  assert.equal(parsed[0].surface, 'paint');
  assert.equal(parsed[1].slotId, 'fronts');
  assert.equal(parsed[1].color, '#6a4c36');
  assert.equal(parsed[1].surface, 'wood');
  assert.equal(parsed[2].slotId, 'hardware');
  assert.equal(parsed[2].surface, 'metal');
  assert.equal(parsed[3].slotId, 'hardware');
  assert.equal(parsed[3].color, '#464642');

  const heOnly = parseMaterialsFromText('אלון טבעי, בד בוקלה, פחם מט');
  assert.deepEqual(
    heOnly.map(m => m.surface),
    ['wood', 'fabric', 'paint']
  );
});

test('decodeImageToRgba + extractPaletteFromRgba decodes examples/linea-finishes.png cleanly', async () => {
  const { rgba, width, height } = await decodeImageToRgba(new URL('../examples/linea-finishes.png', import.meta.url).pathname);
  assert.ok(width > 50 && height > 50);
  assert.equal(rgba.length, width * height * 4);

  const palette = extractPaletteFromRgba(rgba, width, height, { maxColors: 6, surface: 'paint' });
  assert.ok(palette.length >= 3, `Expected >= 3 dominant colors, got ${palette.length}`);
  for (const entry of palette) {
    assert.match(entry.color, /^#[\da-f]{6}$/);
    assert.equal(entry.surface, 'paint');
  }
});

test('applyMaterialsToSpec enriches spec cleanly, records evidence, and passes strict validation', async () => {
  const linea = JSON.parse(await fs.readFile(new URL('../examples/linea.json', import.meta.url), 'utf8'));
  const entries = parseMaterialsFromText(
    'Door & drawer fronts: Soft sage, Terracotta; Hardware: Aged brass',
    { existingSlots: linea.slots }
  );
  const { spec: updated, applied } = applyMaterialsToSpec(linea, entries, {
    source: 'customer-brief.txt',
    status: 'stated'
  });
  validateSpec(updated, { forExport: true });

  const fronts = updated.slots.find(s => s.id === 'fronts');
  assert.ok(fronts.finishes.some(f => f.name === 'Soft sage'));
  assert.ok(fronts.finishes.some(f => f.name === 'Terracotta'));
  assert.ok(updated.evidence.some(e => e.field === 'slots.fronts' && e.source === 'customer-brief.txt'));
  assert.ok(applied.some(a => a.slotId === 'fronts'));

  const replaced = applyMaterialsToSpec(linea, [{ name: 'Chalk', color: '#dedbd0', surface: 'paint', slotId: 'case' }], {
    replace: true,
    source: 'override'
  });
  validateSpec(replaced.spec, { forExport: true });
  assert.equal(replaced.spec.slots.find(s => s.id === 'case').finishes.length, 1);
});

test('tools/materials.mjs CLI extracts sketch + text finishes and updates a draft atomically', async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'fv-materials-test-'));
  try {
    const outSpec = path.join(tmpDir, 'enriched.json');
    const { stdout: helpOut } = await execFileAsync(process.execPath, ['tools/materials.mjs', '--help'], {
      cwd: process.cwd()
    });
    assert.match(helpOut, /--sketch/);
    assert.match(helpOut, /--text/);

    await execFileAsync(process.execPath, [
      'tools/materials.mjs',
      '--spec', 'examples/linea.json',
      '--text', 'fronts: Olive green, Deep navy',
      '--sketch', 'examples/linea-finishes.png',
      '--slot', 'fronts',
      '--surface', 'paint',
      '--max', '4',
      '--out', outSpec
    ], { cwd: process.cwd() });

    const enriched = validateSpec(JSON.parse(await fs.readFile(outSpec, 'utf8')), { forExport: true });
    assert.ok(enriched.slots.find(s => s.id === 'fronts').finishes.length > 3);
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
});

test('supports marble, brick, concrete, stone, terrazzo, tile, leather, and glass surfaces end-to-end', async () => {
  const schema = JSON.parse(await fs.readFile(new URL('../lib/schema.json', import.meta.url), 'utf8'));
  const schemaSurfaces = schema.$defs.finish.properties.surface.enum;
  assert.deepEqual([...SURFACE_TYPES].sort(), [...schemaSurfaces].sort());

  for (const s of SURFACE_TYPES) {
    assert.ok(Object.hasOwn(SURFACE_PROPS, s), `Missing SURFACE_PROPS entry for ${s}`);
    const cap = s[0].toUpperCase() + s.slice(1);
    const key = `surface${cap}`;
    assert.ok(STRINGS.he[key], `Missing Hebrew translation STRINGS.he.${key}`);
    assert.ok(STRINGS.en[key], `Missing English translation STRINGS.en.${key}`);
  }

  assert.equal(normalizeSurface('bricks'), 'brick');
  assert.equal(normalizeSurface('tiles'), 'tile');
  assert.equal(normalizeSurface('MARBLE'), 'marble');

  const enParsed = parseMaterialsFromText(
    'Carrara marble, Red clay brick, Microcement concrete, Warm travertine stone, Light terrazzo, Subway ceramic tile, Cognac leather, Smoked glass'
  );
  assert.deepEqual(
    enParsed.map(m => m.surface),
    ['marble', 'brick', 'concrete', 'stone', 'terrazzo', 'tile', 'leather', 'glass']
  );

  const heParsed = parseMaterialsFromText(
    'שיש קרארה, לבנים אדומות, בטון מוחלק, אבן טרוורטין, טראצו בהיר, אריחי קרמיקה, עור קוניאק, זכוכית מעושנת'
  );
  assert.deepEqual(
    heParsed.map(m => m.surface),
    ['marble', 'brick', 'concrete', 'stone', 'terrazzo', 'tile', 'leather', 'glass']
  );

  // Regression guards for ambiguous Hebrew/English tokens
  assert.deepEqual(
    parseMaterialsFromText('לכה לבנה, Mirror glass, זכוכית מראה, Slate blue-grey').map(m => m.surface),
    ['paint', 'metal', 'metal', 'paint']
  );

  const linea = JSON.parse(await fs.readFile(new URL('../examples/linea.json', import.meta.url), 'utf8'));
  const { spec: updated } = applyMaterialsToSpec(linea, enParsed, {
    targetSlot: 'case',
    source: 'architectural-materials.txt',
    status: 'stated'
  });
  validateSpec(updated, { forExport: true });
});
