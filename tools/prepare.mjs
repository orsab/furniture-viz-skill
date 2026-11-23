#!/usr/bin/env node
import { execFile } from 'node:child_process';
import { chmod, mkdir, mkdtemp, rm, stat } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs, promisify } from 'node:util';

const exec = promisify(execFile);
const help = `Prepare PDF pages locally for a vision-capable agent. No OCR or uploads.
Usage: node tools/prepare.mjs --input FILE.pdf --out DIRECTORY [--first-page N] [--last-page N]

--out is a parent directory. Each run creates a fresh private pages-* directory
with page-0001.png and page-0001.txt pairs numbered by original PDF page.
Select at most 48 pages per run. Scans may have empty text; inspect the PNGs.
Uses Poppler's pdfinfo, pdftoppm and pdftotext on PATH (brew install poppler
or apt install poppler-utils). macOS can instead use Swift + system PDFKit
via Xcode Command Line Tools. No network or package install is performed.`;

async function poppler(command, args) {
  try {
    return (await exec(command, args, {
      timeout: 60_000, maxBuffer: 2 * 1024 * 1024, windowsHide: true,
      env: { ...process.env, LC_ALL: 'C' },
    })).stdout;
  } catch (error) {
    if (error.code === 'ENOENT') throw new Error(`Missing ${command}. Install Poppler (pdfinfo, pdftoppm, pdftotext) and add its bin directory to PATH.`, { cause: error });
    const reason = error.killed ? 'timed out' : `exited with ${error.code ?? error.signal}`;
    throw new Error(`${command} ${reason}. Check that the PDF is readable, valid and not password-protected.`);
  }
}

async function pdfkit(args) {
  const script = fileURLToPath(new URL('./render-pdf.swift', import.meta.url));
  try {
    return (await exec('/usr/bin/swift', [script, ...args], {
      timeout: 240_000, maxBuffer: 2 * 1024 * 1024,
    })).stdout;
  } catch (error) {
    const reason = error.killed ? 'timed out' : `failed (${error.code ?? error.signal})`;
    throw new Error(`macOS PDFKit ${reason}. Install Xcode Command Line Tools for Swift, or put all three Poppler tools on PATH. Check that the PDF is readable and not password-protected.`);
  }
}

function pageNumber(value, fallback) {
  if (value === undefined) return fallback;
  if (!/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(Number(value))) throw new Error('Page numbers must be positive integers.');
  return Number(value);
}

async function main() {
  const { values } = parseArgs({ options: {
    help: { type: 'boolean', short: 'h' }, input: { type: 'string' }, out: { type: 'string' },
    'first-page': { type: 'string' }, 'last-page': { type: 'string' },
  } });
  if (values.help) return console.log(help);
  if (!values.input?.trim() || !values.out?.trim()) throw new Error(help);
  const input = resolve(values.input);
  const file = await stat(input);
  if (!file.isFile() || !file.size || file.size > 50 * 1024 * 1024) throw new Error('Expected a nonempty regular PDF of at most 50 MiB.');
  // Absolute paths keep filenames starting with a dash out of option parsers.
  let native = false;
  let total;
  try {
    const [info] = await Promise.all([
      poppler('pdfinfo', [input]), poppler('pdftoppm', ['-v']), poppler('pdftotext', ['-v']),
    ]);
    total = Number(/^Pages:\s+(\d+)\s*$/m.exec(info)?.[1]);
  } catch (error) {
    if (process.platform !== 'darwin' || error.cause?.code !== 'ENOENT') throw error;
    native = true;
    total = Number((await pdfkit(['info', input])).trim());
  }
  if (!Number.isSafeInteger(total) || total < 1) throw new Error('Could not determine the number of PDF pages.');
  const first = pageNumber(values['first-page'], 1);
  const last = pageNumber(values['last-page'], total);
  if (first > last || last > total || last - first + 1 > 48) throw new Error(`This PDF has ${total} pages. Choose a valid --first-page/--last-page interval of at most 48 pages.`);
  const parent = resolve(values.out);
  await mkdir(parent, { recursive: true, mode: 0o700 });
  const dir = await mkdtemp(join(parent, 'pages-'));
  try {
    await chmod(dir, 0o700);
    if (native) {
      await pdfkit(['render', input, String(first), String(last), dir]);
    } else {
      for (let page = first; page <= last; page++) {
        const range = ['-f', String(page), '-l', String(page)];
        const stem = join(dir, `page-${String(page).padStart(4, '0')}`);
        await poppler('pdftoppm', [...range, '-singlefile', '-png', '-scale-to', '2400', input, stem]);
        await poppler('pdftotext', [...range, '-layout', '-enc', 'UTF-8', '-nopgbrk', input, `${stem}.txt`]);
      }
    }
  } catch (error) {
    await rm(dir, { recursive: true, force: true });
    throw error;
  }
  console.log(`Prepared ${JSON.stringify(basename(input))}, original pages ${first}–${last} of ${total}, in:\n${dir}`);
}

main().catch(error => { console.error(`Prepare: ${error.message}`); process.exitCode = 1; });
