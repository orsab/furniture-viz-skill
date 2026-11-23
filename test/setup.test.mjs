import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

import {
  MAX_LOGO_BYTES,
  loadLogoAsDataUri,
  resolveBrand,
  validateBrand
} from '../lib/brand.mjs';

const execFileAsync = promisify(execFile);
const ROOT = path.resolve(new URL('../', import.meta.url).pathname);

const PNG_1X1 = Buffer.from(
  '89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c63000100000500010d0a2db40000000049454e44ae426082',
  'hex'
);
const JPEG_MIN = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01]);
const WEBP_MIN = Buffer.concat([Buffer.from('RIFF'), Buffer.alloc(4), Buffer.from('WEBP')]);
const SVG_CLEAN = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect width="10" height="10" fill="#285743"/></svg>';

function isolatedEnv(homeDir) {
  return {
    ...process.env,
    HOME: homeDir,
    XDG_CONFIG_HOME: path.join(homeDir, '.config'),
    FURNITURE_VISUALIZER_BRAND: ''
  };
}

async function runCli(scriptRel, args, { cwd, env }) {
  try {
    const { stdout, stderr } = await execFileAsync(process.execPath, [path.join(ROOT, scriptRel), ...args], { cwd, env });
    return { code: 0, stdout, stderr };
  } catch (err) {
    return { code: err.code ?? 1, stdout: err.stdout ?? '', stderr: err.stderr ?? '' };
  }
}

test('validateBrand and loadLogoAsDataUri accept PNG, JPEG, WebP, and static SVG while rejecting invalid or unsafe payloads', async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'fv-brand-unit-'));
  try {
    const pngFile = path.join(dir, 'logo.png');
    const jpgFile = path.join(dir, 'logo.jpg');
    const webpFile = path.join(dir, 'logo.webp');
    const svgFile = path.join(dir, 'logo.svg');
    await writeFile(pngFile, PNG_1X1);
    await writeFile(jpgFile, JPEG_MIN);
    await writeFile(webpFile, WEBP_MIN);
    await writeFile(svgFile, SVG_CLEAN);

    for (const [file, prefix] of [
      [pngFile, 'data:image/png;base64,'],
      [jpgFile, 'data:image/jpeg;base64,'],
      [webpFile, 'data:image/webp;base64,'],
      [svgFile, 'data:image/svg+xml;base64,']
    ]) {
      const uri = await loadLogoAsDataUri(file);
      assert.ok(uri.startsWith(prefix), `Expected ${prefix}`);
      const validated = validateBrand({ version: 1, businessName: '  Alkin Joinery  ', logo: uri, description: '   ' });
      assert.equal(validated.businessName, 'Alkin Joinery');
      assert.equal(validated.description, null);
    }

    const withDesc = validateBrand({
      version: 1,
      businessName: 'Alkin Joinery',
      logo: await loadLogoAsDataUri(pngFile),
      description: '  Custom architectural millwork  '
    });
    assert.equal(withDesc.description, 'Custom architectural millwork');

    // Missing name / missing logo
    assert.throws(() => validateBrand({ version: 1, businessName: '   ', logo: `data:image/png;base64,${PNG_1X1.toString('base64')}` }), /Business name/i);
    assert.throws(() => validateBrand({ version: 1, businessName: 'Studio', logo: 'https://example.com/logo.png' }), /offline base64 data URI/i);

    // Mismatched magic bytes
    const fakePng = path.join(dir, 'fake.png');
    await writeFile(fakePng, 'not actually a png');
    await assert.rejects(() => loadLogoAsDataUri(fakePng), /PNG signature/i);

    // Oversized logo > 2 MiB
    const bigPng = path.join(dir, 'huge.png');
    await writeFile(bigPng, Buffer.concat([PNG_1X1, Buffer.alloc(MAX_LOGO_BYTES + 16)]));
    await assert.rejects(() => loadLogoAsDataUri(bigPng), /2 MiB/i);

    // Unsafe SVG payloads (<script>, onclick, <foreignObject>, external href / url)
    for (const badSvg of [
      '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg" onclick="alert(1)"><rect width="10" height="10"/></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg"><foreignObject/></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg"><image href="https://evil.test/x.png"/></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg" style="background:url(https://evil.test/a.png)"></svg>'
    ]) {
      const f = path.join(dir, 'bad.svg');
      await writeFile(f, badSvg);
      await assert.rejects(() => loadLogoAsDataUri(f), /SVG logo must not/i);
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('tools/setup.mjs enforces required business name and logo, supports optional description, and verifies --check', async () => {
  const work = await mkdtemp(path.join(os.tmpdir(), 'fv-setup-cli-'));
  try {
    const home = path.join(work, 'home');
    await mkdir(home, { recursive: true });
    const env = isolatedEnv(home);

    const logoPath = path.join(work, 'studio.png');
    await writeFile(logoPath, PNG_1X1);

    // Missing setup --check exits 2
    const preCheck = await runCli('tools/setup.mjs', ['--check'], { cwd: work, env });
    assert.equal(preCheck.code, 2);
    assert.match(preCheck.stderr, /not configured/i);

    // Missing required flags exit 1
    const noName = await runCli('tools/setup.mjs', ['--logo', logoPath], { cwd: work, env });
    assert.equal(noName.code, 1);
    assert.match(noName.stderr, /Business name/i);

    const noLogo = await runCli('tools/setup.mjs', ['--name', 'Studio North'], { cwd: work, env });
    assert.equal(noLogo.code, 1);
    assert.match(noLogo.stderr, /Logo file/i);

    // Setup without optional description
    const ok1 = await runCli('tools/setup.mjs', ['--name', 'Studio North', '--logo', logoPath], { cwd: work, env });
    assert.equal(ok1.code, 0);
    const saved1 = JSON.parse(await readFile(path.join(work, 'private', 'brand.json'), 'utf8'));
    assert.equal(saved1.businessName, 'Studio North');
    assert.equal(saved1.description, null);
    assert.ok(saved1.logo.startsWith('data:image/png;base64,'));

    // Refuse overwrite without --replace
    const clash = await runCli('tools/setup.mjs', ['--name', 'Studio Two', '--logo', logoPath], { cwd: work, env });
    assert.equal(clash.code, 1);
    assert.match(clash.stderr, /--replace/i);

    // Overwrite with optional description + --replace
    const ok2 = await runCli('tools/setup.mjs', ['--name', 'Atelier Nord', '--logo', logoPath, '--description', 'Bespoke oak joinery', '--replace'], { cwd: work, env });
    assert.equal(ok2.code, 0);
    const checkAfter = await runCli('tools/setup.mjs', ['--check'], { cwd: work, env });
    assert.equal(checkAfter.code, 0);
    assert.match(checkAfter.stdout, /Atelier Nord/);
    assert.match(checkAfter.stdout, /Bespoke oak joinery/);

    const resolved = await resolveBrand({ cwd: work, env });
    assert.equal(resolved.brand.businessName, 'Atelier Nord');
    assert.equal(resolved.brand.description, 'Bespoke oak joinery');
  } finally {
    await rm(work, { recursive: true, force: true });
  }
});

test('tools/export.mjs blocks unconfigured projects, embeds configured brand data, and preserves setup identity across brand changes', async () => {
  const work = await mkdtemp(path.join(os.tmpdir(), 'fv-export-brand-'));
  try {
    const home = path.join(work, 'home');
    await mkdir(home, { recursive: true });
    const env = isolatedEnv(home);
    const specSrc = path.join(ROOT, 'examples', 'linea.json');
    const out1 = path.join(work, 'deliverables', 'out1.html');
    const out2 = path.join(work, 'deliverables', 'out2.html');

    // Unconfigured export fails cleanly
    const blocked = await runCli('tools/export.mjs', ['--reviewed', specSrc, out1], { cwd: work, env });
    assert.equal(blocked.code, 1);
    assert.match(blocked.stderr, /Business setup is required/i);

    // Configure brand A and export
    const logoPath = path.join(work, 'brand.svg');
    await writeFile(logoPath, SVG_CLEAN);
    const setupA = await runCli('tools/setup.mjs', ['--name', 'Cedar & Brass', '--logo', logoPath, '--description', 'Custom cabinetry'], { cwd: work, env });
    assert.equal(setupA.code, 0);

    const expA = await runCli('tools/export.mjs', ['--reviewed', specSrc, out1], { cwd: work, env });
    assert.equal(expA.code, 0);
    const htmlA = await readFile(out1, 'utf8');
    const payloadA = JSON.parse(htmlA.match(/<script id="study-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
    assert.equal(payloadA.brand.businessName, 'Cedar & Brass');
    assert.equal(payloadA.brand.description, 'Custom cabinetry');
    assert.ok(payloadA.brand.logo.startsWith('data:image/svg+xml;base64,'));
    assert.match(htmlA, /<title>Cedar &amp; Brass · Linea sideboard<\/title>/);

    // Re-brand to brand B (no optional description) and re-export -> customer setup identity remains identical!
    const setupB = await runCli('tools/setup.mjs', ['--name', 'Another Maker', '--logo', logoPath, '--replace'], { cwd: work, env });
    assert.equal(setupB.code, 0);
    const expB = await runCli('tools/export.mjs', ['--reviewed', specSrc, out2], { cwd: work, env });
    assert.equal(expB.code, 0);
    const htmlB = await readFile(out2, 'utf8');
    const payloadB = JSON.parse(htmlB.match(/<script id="study-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
    assert.equal(payloadB.brand.businessName, 'Another Maker');
    assert.equal(payloadB.brand.description, null);
    assert.equal(payloadB.identity, payloadA.identity);
  } finally {
    await rm(work, { recursive: true, force: true });
  }
});
