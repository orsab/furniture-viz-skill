import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { STRINGS, createTranslator, translateTerm } from '../app/i18n.mjs';

test('Hebrew and English dictionaries have identical non-empty keys', () => {
  const heKeys = Object.keys(STRINGS.he).sort();
  const enKeys = Object.keys(STRINGS.en).sort();
  assert.deepEqual(heKeys, enKeys);
  for (const key of enKeys) {
    assert.ok(STRINGS.he[key], `Missing Hebrew translation for ${key}`);
    assert.ok(STRINGS.en[key], `Missing English translation for ${key}`);
  }
});

test('createTranslator returns proper direction, axes, units, and interpolations', () => {
  const he = createTranslator('he');
  assert.equal(he.dir, 'rtl');
  assert.deepEqual(he.axes, ['ר', 'ג', 'ע']);
  assert.equal(he.mmUnit, 'מ״מ');
  assert.ok(he.t('noticeExportedPng', { width: 800, height: 600 }).includes('800 × 600'));

  const en = createTranslator('en');
  assert.equal(en.dir, 'ltr');
  assert.deepEqual(en.axes, ['W', 'H', 'D']);
  assert.equal(en.mmUnit, 'mm');
});

test('translateTerm translates all Linea labels in Hebrew and preserves English & custom Hebrew strings', async () => {
  const linea = JSON.parse(await readFile(new URL('../examples/linea.json', import.meta.url), 'utf8'));
  const fieldsToTranslate = [
    linea.name,
    linea.description,
    ...linea.slots.map(s => s.label),
    ...linea.slots.flatMap(s => s.finishes.map(f => f.name)),
    ...linea.options.map(o => o.label),
    ...linea.options.flatMap(o => o.choices),
    ...linea.joints.map(j => j.label),
    ...linea.switches.map(sw => sw.label)
  ];
  for (const text of fieldsToTranslate) {
    const he = translateTerm(text, 'he');
    assert.notEqual(he, text, `Expected Hebrew translation for Linea field "${text}"`);
    assert.equal(translateTerm(text, 'en'), text);
  }
  assert.equal(translateTerm('ארון מותאם אישית', 'he'), 'ארון מותאם אישית');
});
