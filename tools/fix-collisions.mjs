#!/usr/bin/env node
import { randomUUID } from 'node:crypto';
import { readFile, rename, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { validateSpec } from '../lib/spec.mjs';
import { auditGeometry } from '../lib/geometry-qa.mjs';
import { fixMeshCollisions } from '../lib/mesh-fix.mjs';

const usage = `Automatically resolve static and same-joint 3D mesh intersections / Z-fighting in a draft spec.
Usage:
  node tools/fix-collisions.mjs <DRAFT.json> [--out NEW.json | --in-place] [--replace]

Options:
  --out <path>   Write the cleaned spec to a new file (default if not --in-place)
  --in-place     Atomically update DRAFT.json in place
  --replace      Allow overwriting an existing --out target
  -h, --help     Show this help message`;

async function writeJsonAtomic(target, spec, replace) {
  const payload = `${JSON.stringify(spec, null, 2)}\n`;
  if (!replace) {
    await writeFile(target, payload, { flag: 'wx', mode: 0o600 });
    return;
  }
  const temp = `${target}.${randomUUID()}.tmp`;
  try {
    await writeFile(temp, payload, { flag: 'wx', mode: 0o600 });
    await rename(temp, target);
  } finally {
    await rm(temp, { force: true });
  }
}

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      help: { type: 'boolean', short: 'h' },
      out: { type: 'string' },
      'in-place': { type: 'boolean' },
      replace: { type: 'boolean' }
    }
  });
  if (values.help) { console.log(usage); return; }
  if (positionals.length !== 1) throw new Error(usage);
  if (values['in-place'] && values.out) throw new Error('Use either --in-place or --out, not both.');
  if (!values['in-place'] && !values.out) throw new Error('Specify --out NEW.json or --in-place.');

  const src = path.resolve(positionals[0]);
  const info = await stat(src);
  if (!info.isFile() || !info.size || info.size > 8 * 1024 * 1024) {
    throw new Error('Expected a nonempty draft JSON file of at most 8 MiB.');
  }

  const raw = validateSpec(JSON.parse(await readFile(src, 'utf8')));
  const { spec, fixes } = fixMeshCollisions(raw);
  const qa = auditGeometry(spec);

  const dest = values['in-place'] ? src : path.resolve(values.out);
  await writeJsonAtomic(dest, spec, Boolean(values['in-place'] || values.replace));

  console.log(`Processed: ${src}`);
  console.log(`Applied ${fixes.length} mesh collision fix(es):`);
  for (const f of fixes) {
    console.log(`  [${f.action}] ${f.partId} vs ${f.againstId}: ${f.detail}`);
  }
  console.log(`Remaining Geometry QA warnings: ${qa.warnings.length}`);
  for (const w of qa.warnings) console.log(`  [${w.kind}] ${w.message}`);
  console.log(`Wrote: ${dest}`);
}

main().catch(err => {
  const msg = err.code === 'EEXIST' ? 'Output already exists. Pass --replace or choose another path.' : err.message;
  console.error(`Fix collisions: ${msg}`);
  process.exitCode = 1;
});
