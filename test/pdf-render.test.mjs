import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const nativePDF = process.platform === 'darwin' && spawnSync('xcode-select',['-p']).status === 0;
test('native PDF preparation preserves the full-page extent of dimension callouts', {skip:!nativePDF}, () => {
  const temp = mkdtempSync(join(tmpdir(),'furniture-pdf-test-'));
  try {
    const here = rel => fileURLToPath(new URL(rel,import.meta.url));
    execFileSync('swift',[here('../tools/render-pdf.swift'),'render',here('../examples/linea-elevations.pdf'),'1','1',temp]);
    // This sheet has ink near all four page edges. Measure a small grayscale raster,
    // not PNG dimensions: a tiny centered thumbnail in a large PNG is unreadable.
    const occupancy = execFileSync('swift',['-e',`import AppKit
      let image = NSBitmapImageRep(data: try Data(contentsOf:URL(fileURLWithPath:CommandLine.arguments[1])))!.cgImage!
      let n=128; var samples=[UInt8](repeating:255,count:n*n)
      samples.withUnsafeMutableBytes { bytes in
        let ctx=CGContext(data:bytes.baseAddress,width:n,height:n,bitsPerComponent:8,bytesPerRow:n,space:CGColorSpaceCreateDeviceGray(),bitmapInfo:CGImageAlphaInfo.none.rawValue)!
        ctx.interpolationQuality = .high; ctx.draw(image,in:CGRect(x:0,y:0,width:n,height:n))
      }
      let ink=samples.indices.filter { samples[$0] < 190 }; let xs=ink.map { $0 % n }, ys=ink.map { $0 / n }
      print((xs.max() ?? 0)-(xs.min() ?? 0), (ys.max() ?? 0)-(ys.min() ?? 0))`,join(temp,'page-0001.png')],{encoding:'utf8'}).trim().split(/\s+/).map(Number);
    assert.ok(occupancy[0] >= 100 && occupancy[1] >= 96, `drawing covers only ${occupancy.join(' × ')} cells on a 128 × 128 page`);
  } finally { rmSync(temp,{recursive:true,force:true}); }
});
