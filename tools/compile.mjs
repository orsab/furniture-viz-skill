import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import Ajv from 'ajv';
import standalone from 'ajv/dist/standalone/index.js';
import schema from '../lib/schema.json' with {type:'json'};

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
await mkdir(new URL('../assets/',import.meta.url), {recursive:true});
const validator = new Ajv({code:{source:true}, strict:true});
const validate = standalone(validator, validator.compile(schema));
const shared = {absWorkingDir:root,bundle:true,minify:true,logLevel:'warning',legalComments:'inline'};
await Promise.all([
  build({...shared,stdin:{contents:validate,resolveDir:root,sourcefile:'furniture-validator.cjs'},platform:'node',format:'cjs',outfile:'assets/check.cjs'}),
  build({...shared,entryPoints:['app/viewer.mjs'],platform:'browser',format:'iife',target:'es2022',outfile:'assets/viewer.js',define:{'process.env.NODE_ENV':'"production"'}}),
  build({...shared,entryPoints:['app/studio.css'],outfile:'assets/studio.css'}),
  (async () => {
    const thirdParty = await Promise.all(['three','ajv'].map(async pkg => {
      const path = pkg === 'three' ? new URL('../node_modules/three/LICENSE',import.meta.url) : require.resolve('ajv/LICENSE');
      return `${pkg}\n${await readFile(path,'utf8')}`;
    }));
    thirdParty.push('Reference mannequin motion: Adobe Mixamo (https://www.mixamo.com/).\n' +
      'Neutral Idle, Walking, Seated Idle, Looking Around, Button Pushing, and Unarmed Turn Left/Right 90.\n' +
      'Retargeted to the Form Study mannequin; no source models or standalone motion files are shipped.\n' +
      'Source exports: https://github.com/MisterYI/deevid-mixamo-assets/tree/13066bbd431c855fdc154d1e32d7a37c0b8ee013/anim\n' +
      'Usage: https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html');
    await writeFile(new URL('../assets/THIRD-PARTY.txt',import.meta.url), thirdParty.join('\n\n'));
  })()
]);
console.log('Compiled offline viewer and standalone schema validator in assets/.');
