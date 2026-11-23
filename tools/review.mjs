#!/usr/bin/env node
import { readFile, stat } from 'node:fs/promises';
import { parseArgs } from 'node:util';
import { validateSpec } from '../lib/spec.mjs';

const help = `Inspect a private furniture draft and its evidence locally; never edit or approve it.
Usage: node tools/review.mjs DRAFT.json

Lists default dimensions and allowed ranges (mm), controls, sources and review
issues. Exit 0: structurally valid without export blockers (NOT approval);
1: invalid input; 2: unresolved issues. Estimates still require human review.`;

// Descriptions and source notes may come from untrusted documents. Keep control
// characters from turning a report row into extra lines or terminal commands.
const quote = value => JSON.stringify(value).replace(/[\u007f-\u009f\u2028\u2029\u202a-\u202e\u2066-\u2069]/g, c => `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`);

async function main() {
  const { values, positionals } = parseArgs({ options: { help: { type: 'boolean', short: 'h' } }, allowPositionals: true });
  if (values.help) return console.log(help);
  if (positionals.length !== 1) throw new Error(help);
  const file = await stat(positionals[0]);
  if (!file.isFile() || !file.size || file.size > 8 * 1024 * 1024) throw new Error('Expected a nonempty draft JSON file of at most 8 MiB.');
  const spec = validateSpec(JSON.parse(await readFile(positionals[0], 'utf8')));
  console.log(`Private review: ${quote(spec.name)}\n${quote(spec.description)}\n\nDimensions (default; range in mm)`);
  for (const axis of ['width', 'height', 'depth']) {
    const { min, value, max } = spec.dimensions[axis];
    const statuses = [...new Set(spec.evidence.filter(e => e.field === `dimensions.${axis}`).map(e => e.status))];
    console.log(`  ${axis}: ${value} mm; ${min === max ? 'fixed' : `${min}–${max} mm`} [${statuses.join(', ')}]`);
  }
  console.log(`\nGeometry: ${spec.parts.length} parts; inscription ${spec.inscription ? 'available' : 'absent'}`);
  for (const slot of spec.slots) console.log(`  Finish ${quote(slot.label)}: ${slot.finishes.map(f => quote(f.name)).join(', ')}`);
  for (const opt of spec.options) console.log(`  Option ${quote(opt.label)}: ${opt.choices.map(quote).join(', ')}`);
  for (const joint of spec.joints) {
    const unit = joint.type === 'hinge' || joint.type === 'flap' ? 'degrees' : 'mm';
    console.log(`  Joint ${quote(joint.label)}: ${joint.type}, travel ${joint.travel} ${unit}`);
  }
  for (const sw of spec.switches ?? []) {
    console.log(`  Switch ${quote(sw.label)}: ${sw.kind}, default ${sw.defaultOn ? 'on' : 'off'}${sw.light ? ', illuminated' : ''}`);
  }
  const counts = { stated: 0, estimated: 0, conflict: 0, unknown: 0 };
  console.log('\nEvidence (includes private source references)');
  for (const { field, status, source, note } of spec.evidence) {
    counts[status]++;
    console.log(`  [${status}] ${quote(field)} ← ${quote(source)}: ${quote(note)}`);
  }
  console.log(`\nIssues: ${counts.conflict} conflicting; ${counts.unknown} unknown; ${counts.estimated} estimated.`);
  try { validateSpec(spec, { forExport: true }); }
  catch (error) {
    console.log(`BLOCKED: ${quote(error.message)}\nResolve blockers with the user; update the draft and review it again.`);
    process.exitCode = 2;
    return;
  }
  if (counts.estimated) console.log('Ask the user to accept or correct each estimate. Keep accepted estimates labeled estimated.');
  console.log('Not approved. Compare the draft with the originals and obtain explicit human sign-off before export.');
}

main().catch(error => { console.error(`Review: ${error.message}`); process.exitCode = 1; });
