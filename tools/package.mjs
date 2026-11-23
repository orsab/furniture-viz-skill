import { cp, mkdir, mkdtemp, readdir, rename, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Distribution is an allowlist, never the workspace or a customer's sketches.
const root = fileURLToPath(new URL('../',import.meta.url));
const dist = path.join(root,'dist'); await mkdir(dist,{recursive:true});
const temp = await mkdtemp(path.join(dist,'.pack-'));
const name = 'furniture-visualizer', skill = path.join(temp,name);
try {
  const files = [
    'SKILL.md', 'PRD-Furniture-Visualizer.md',
    'examples/linea.json', 'examples/linea-brief.txt', 'examples/linea-elevations.pdf', 'examples/linea-finishes.png', 'examples/demo-logo.svg', 'examples/demo-brand.json',
    'lib/spec.mjs', 'lib/state.mjs', 'lib/schema.json', 'lib/coordinates.mjs', 'lib/kinematics.mjs', 'lib/geometry-qa.mjs', 'lib/mesh-fix.mjs', 'lib/brand.mjs', 'lib/materials-parse.mjs', 'lib/png-decode.mjs',
    'assets/check.cjs', 'assets/viewer.js', 'assets/studio.css', 'assets/THIRD-PARTY.txt',
    'tools/setup.mjs', 'tools/review.mjs', 'tools/fix-collisions.mjs', 'tools/materials.mjs', 'tools/extract.mjs', 'tools/prepare.mjs', 'tools/render-pdf.swift', 'tools/export.mjs'
  ];
  for (const f of await readdir(path.join(root,'references')).catch(e=>{if(e.code==='ENOENT') return []; throw e;})) if (f.endsWith('.md')) files.push(`references/${f}`);
  for (const f of files) { await mkdir(path.dirname(path.join(skill,f)),{recursive:true}); await cp(path.join(root,f),path.join(skill,f)); }
  const archive = path.join(temp,`${name}.zip`);
  execFileSync('zip',['-q','-r',archive,name],{cwd:temp});
  // Keep a discoverable skill directory plus an uploadable ZIP-format .skill file.
  await cp(skill,path.join(dist,name),{recursive:true});
  await rename(archive,path.join(dist,`${name}.skill`));
  console.log(`Packaged ${files.length} resources: dist/${name}.skill and dist/${name}/`);
} finally { await rm(temp,{recursive:true,force:true}); }
