#!/usr/bin/env node
import { randomUUID } from 'node:crypto';
import { readFile, rename, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import {
  applyMaterialsToSpec,
  extractPaletteFromRgba,
  normalizeSurface,
  parseMaterialsFromText
} from '../lib/materials-parse.mjs';
import { decodeImageToRgba } from '../lib/png-decode.mjs';
import { validateSpec } from '../lib/spec.mjs';

const help = `Extract and apply selectable finish materials from a sketch image or text description.
Usage:
  node tools/materials.mjs [--text "..."] [--text-file FILE] [--sketch IMAGE ...] [options]

Options:
  --text <text>         Inline English/Hebrew material list (supports "Slot: mat1, mat2")
  --text-file <path>    UTF-8 text/markdown brief containing material names
  --sketch <path>       Sketch or finish-board image (.png, .jpg, .jpeg, .webp), repeatable
  --surface <kind>      Default surface for sketch colors: wood|fabric|metal|paint|marble|brick|concrete|stone|terrazzo|tile|leather|glass (default: paint)
  --max <N>             Maximum colors extracted per sketch image (1-12, default: 6)
  --lang <he|en>        Fallback swatch labels for sketch colors (default: en)
  --spec <draft.json>   Existing draft spec to enrich with selectable finishes
  --slot <slotId>       Target slot ID when text does not specify a slot prefix (default: first slot)
  --replace-finishes    Replace existing finishes in updated slot(s) instead of appending
  --status <kind>       Evidence status for added finishes: stated|estimated (default: stated)
  --out <out.json>      Write updated draft spec to a new path
  --in-place            Update --spec atomically in place
  --replace             Allow overwriting an existing --out file
  -h, --help            Show this help message`;

async function writeJsonAtomic(target, data, allowReplace) {
  const payload = `${JSON.stringify(data, null, 2)}\n`;
  if (!allowReplace) {
    await writeFile(target, payload, { flag: 'wx' });
    return;
  }
  const tmp = `${target}.${randomUUID()}.tmp`;
  try {
    await writeFile(tmp, payload, { flag: 'wx' });
    await rename(tmp, target);
  } finally {
    await rm(tmp, { force: true });
  }
}

async function main() {
  const { values } = parseArgs({
    options: {
      help: { type: 'boolean', short: 'h' },
      text: { type: 'string', multiple: true, default: [] },
      'text-file': { type: 'string' },
      sketch: { type: 'string', multiple: true, default: [] },
      surface: { type: 'string', default: 'paint' },
      max: { type: 'string', default: '6' },
      lang: { type: 'string', default: 'en' },
      spec: { type: 'string' },
      slot: { type: 'string' },
      'replace-finishes': { type: 'boolean', default: false },
      status: { type: 'string', default: 'stated' },
      out: { type: 'string' },
      'in-place': { type: 'boolean', default: false },
      replace: { type: 'boolean', default: false }
    }
  });

  if (values.help) {
    console.log(help);
    return;
  }
  if (values.out && values['in-place']) {
    throw new Error('Use either --out or --in-place, not both.');
  }

  let existingSpec = null;
  if (values.spec) {
    const absSpec = path.resolve(values.spec);
    const info = await stat(absSpec);
    if (!info.isFile() || info.size > 8 * 1024 * 1024) throw new Error(`Invalid draft spec: ${absSpec}`);
    existingSpec = validateSpec(JSON.parse(await readFile(absSpec, 'utf8')));
  }

  const textParts = [...values.text];
  const sourceLabels = [];
  if (values.text.length) sourceLabels.push('inline description');
  if (values['text-file']) {
    const tf = path.resolve(values['text-file']);
    const info = await stat(tf);
    if (!info.isFile() || info.size > 256 * 1024) throw new Error(`Text file exceeds 256 KiB: ${tf}`);
    textParts.push(await readFile(tf, 'utf8'));
    sourceLabels.push(path.basename(tf));
  }

  const existingSlots = existingSpec?.slots ?? [];
  const extracted = [];
  if (textParts.length) {
    extracted.push(...parseMaterialsFromText(textParts.join('\n'), { existingSlots }));
  }

  const maxColors = Number(values.max) || 6;
  const lang = values.lang === 'he' ? 'he' : 'en';
  for (const sketchPath of values.sketch) {
    const { rgba, width, height } = await decodeImageToRgba(sketchPath);
    const palette = extractPaletteFromRgba(rgba, width, height, {
      maxColors,
      surface: normalizeSurface(values.surface, 'paint'),
      lang
    });
    for (const item of palette) {
      extracted.push({ ...item, slotId: values.slot || null });
    }
    sourceLabels.push(path.basename(sketchPath));
  }

  if (!extracted.length) {
    if (!values.text.length && !values['text-file'] && !values.sketch.length) {
      throw new Error('Provide --text, --text-file, or --sketch input. Run with --help for usage.');
    }
    console.log('No materials were recognized from the supplied inputs.');
    return;
  }

  if (!existingSpec) {
    console.log(JSON.stringify({ finishes: extracted }, null, 2));
    return;
  }

  const { spec: updatedSpec, applied } = applyMaterialsToSpec(existingSpec, extracted, {
    targetSlot: values.slot || null,
    replace: Boolean(values['replace-finishes']),
    source: sourceLabels.join(', ') || 'materials-input',
    status: values.status
  });
  validateSpec(updatedSpec);

  if (values['in-place']) {
    await writeJsonAtomic(path.resolve(values.spec), updatedSpec, true);
  } else if (values.out) {
    await writeJsonAtomic(path.resolve(values.out), updatedSpec, Boolean(values.replace));
  }

  console.log(`Extracted ${extracted.length} material candidate(s) from ${sourceLabels.join(' + ')}.`);
  for (const a of applied) {
    console.log(`  Slot ${a.slotId}: added ${a.count} finish(es) -> ${a.finishes.join(', ')}`);
  }
  if (!applied.length) {
    console.log('No new unique finishes added (matching finishes already exist in target slot).');
  }
  if (values['in-place']) console.log(`Updated spec: ${path.resolve(values.spec)}`);
  else if (values.out) console.log(`Wrote updated spec: ${path.resolve(values.out)}`);
  else console.log('Dry run complete. Pass --in-place or --out <file.json> to save.');
}

main().catch(err => {
  console.error(`Materials: ${err.code === 'EEXIST' ? 'Output already exists. Pass --replace to overwrite.' : err.message}`);
  process.exitCode = 1;
});
