#!/usr/bin/env node
import { randomUUID } from 'node:crypto';
import { mkdir, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import readline from 'node:readline/promises';
import { parseArgs } from 'node:util';
import {
  globalBrandPath,
  loadLogoAsDataUri,
  resolveBrand,
  validateBrand
} from '../lib/brand.mjs';

const help = `Configure required business branding (business name, logo, optional description).
Usage:
  node tools/setup.mjs --name "Studio Name" --logo path/to/logo.png [--description "..."] [--out private/brand.json | --global] [--replace]
  node tools/setup.mjs --check [--brand path/to/brand.json]

Options:
  --name <text>         Business / studio name (required for setup)
  --logo <path>         Path to .png, .jpg, .jpeg, .webp, or .svg logo (required, max 2 MiB)
  --description <text>  Optional business tagline or short description
  --out <path>          Write brand JSON to a custom path (default: private/brand.json)
  --global              Save to ~/.config/furniture-visualizer/brand.json for all workspaces
  --replace             Overwrite existing brand file atomically
  --check               Verify active brand setup (exit 0 if configured, exit 2 if missing/invalid)
  --brand <path>        Explicit brand file to check with --check
  -h, --help            Show this help message`;

function describeLogo(dataUri) {
  const m = /^data:(image\/[^;]+);base64,([A-Za-z0-9+/=]+)$/.exec(dataUri);
  const bytes = m ? Buffer.byteLength(Buffer.from(m[2], 'base64')) : 0;
  return { mime: m?.[1] ?? 'unknown', bytes };
}

async function writeBrandAtomic(target, brand, replace) {
  await mkdir(path.dirname(target), { recursive: true });
  const payload = `${JSON.stringify(brand, null, 2)}\n`;
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

async function runCheck(brandPath) {
  try {
    const resolved = await resolveBrand({
      brandPath: brandPath ?? null,
      cwd: process.cwd(),
      env: process.env
    });
    if (!resolved) {
      console.error('Business setup: not configured.');
      console.error('Run: node tools/setup.mjs --name "<Business Name>" --logo <path/to/logo.png> [--description "<optional>"]');
      process.exitCode = 2;
      return;
    }
    const { brand, path: foundPath } = resolved;
    const { mime, bytes } = describeLogo(brand.logo);
    console.log(`Business setup: ${JSON.stringify(brand.businessName)}`);
    console.log(`  Logo: ${mime} (${bytes.toLocaleString('en-US')} bytes)`);
    console.log(`  Description: ${brand.description ? JSON.stringify(brand.description) : '(none)'}`);
    console.log(`  File: ${foundPath}`);
  } catch (err) {
    console.error(`Business setup invalid: ${err.message}`);
    console.error('Re-run: node tools/setup.mjs --name "<Business Name>" --logo <path/to/logo.png> [--description "<optional>"] --replace');
    process.exitCode = 2;
  }
}

async function promptInteractive() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const businessName = await rl.question('Business name (required): ');
    const logoPath = await rl.question('Logo file path (.png, .jpg, .webp, .svg) (required): ');
    const description = await rl.question('Business description (optional, press Enter to skip): ');
    return { businessName, logoPath, description };
  } finally {
    rl.close();
  }
}

async function main() {
  const { values } = parseArgs({
    options: {
      help: { type: 'boolean', short: 'h' },
      check: { type: 'boolean' },
      brand: { type: 'string' },
      name: { type: 'string' },
      logo: { type: 'string' },
      description: { type: 'string' },
      out: { type: 'string' },
      global: { type: 'boolean' },
      replace: { type: 'boolean' }
    }
  });

  if (values.help) {
    console.log(help);
    return;
  }
  if (values.check) {
    await runCheck(values.brand);
    return;
  }
  if (values.global && values.out) {
    throw new Error('Use either --global or --out, not both.');
  }

  let businessName = values.name;
  let logoPath = values.logo;
  let description = values.description;

  if (businessName === undefined && logoPath === undefined && process.stdin.isTTY && process.stdout.isTTY) {
    ({ businessName, logoPath, description } = await promptInteractive());
  }

  if (!businessName || !businessName.trim()) {
    throw new Error('Business name (--name) is required.');
  }
  if (!logoPath || !logoPath.trim()) {
    throw new Error('Logo file (--logo) is required (.png, .jpg, .jpeg, .webp, or .svg).');
  }

  const target = path.resolve(
    values.global ? globalBrandPath(process.env) : (values.out ?? path.join('private', 'brand.json'))
  );

  const logo = await loadLogoAsDataUri(logoPath);
  const brand = validateBrand({
    version: 1,
    businessName,
    logo,
    description: description ?? null
  });

  await writeBrandAtomic(target, brand, Boolean(values.replace));
  const { mime, bytes } = describeLogo(brand.logo);
  console.log(`Saved business setup: ${target}`);
  console.log(`  Business: ${JSON.stringify(brand.businessName)}`);
  console.log(`  Logo: ${mime} (${bytes.toLocaleString('en-US')} bytes)`);
  console.log(`  Description: ${brand.description ? JSON.stringify(brand.description) : '(none)'}`);
}

main().catch(err => {
  const msg = err.code === 'EEXIST'
    ? 'Brand file already exists. Pass --replace to overwrite it.'
    : err.message;
  console.error(`Setup: ${msg}`);
  process.exitCode = 1;
});
