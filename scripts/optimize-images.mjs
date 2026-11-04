import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

// Run with node scripts/optimize-images.mjs [path to an installed sharp module].
const sharp = createRequire(import.meta.url)(process.argv[2] || 'sharp');
const root = path.resolve('client/public');
const manifest = {};
let before = 0, after = 0;
async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { await walk(file); continue; }
    if (!/\.(png|jpe?g)$/i.test(file)) continue;
    const url = '/' + path.relative(root, file).replaceAll('\\', '/');
    const meta = await sharp(file).metadata();
    const variants = [];
    for (const target of [480, 960, 1600]) {
      const width = Math.min(target, meta.width);
      if (variants.some(v => v.width === width)) continue;
      const output = file.replace(/\.[^.]+$/, `-${width}.webp`);
      const info = await sharp(file).resize({ width, withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toFile(output);
      variants.push({ width: info.width, src: '/' + path.relative(root, output).replaceAll('\\', '/') });
      if (target === 480) after += info.size;
    }
    before += (await fs.stat(file)).size;
    manifest[url] = { width: meta.width, height: meta.height, variants };
  }
}
await walk(path.join(root, 'images'));
await fs.writeFile('client/src/lib/image-variants.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify({ images: Object.keys(manifest).length, originalBytes: before, smallVariantBytes: after }));
