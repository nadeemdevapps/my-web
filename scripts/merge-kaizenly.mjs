// Cutover (2026-11-10): the Kaizenly independent site lives in kaizenly/ as a
// complete Astro project. Its build output is merged into the main site's
// dist under products/kaizenly/, so GitHub Pages serves it at
// /my-web/products/kaizenly/. This runs as part of `npm run build` (root
// package.json), so every deploy — local or CI — carries the Kaizenly pages.
// It fails loudly if the Kaizenly build or the merge fails, so a deploy
// never silently ships without them.
import { execSync } from 'node:child_process';
import { cpSync, existsSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const kaizenlyDir = join(root, 'kaizenly');
const kaizenlyDist = join(kaizenlyDir, 'dist');
const target = join(root, 'dist', 'products', 'kaizenly');

function run(cmd, cwd) {
  execSync(cmd, { cwd, stdio: 'inherit' });
}

if (!existsSync(join(kaizenlyDir, 'node_modules'))) {
  console.log('[merge-kaizenly] installing Kaizenly dependencies…');
  run('npm ci', kaizenlyDir);
}
console.log('[merge-kaizenly] building Kaizenly site…');
run('npm run build', kaizenlyDir);

if (existsSync(target)) rmSync(target, { recursive: true, force: true });
cpSync(kaizenlyDist, target, { recursive: true });

for (const page of ['index.html', 'features/index.html', 'gallery/index.html', 'about/index.html', 'privacy/index.html', 'terms/index.html']) {
  if (!existsSync(join(target, page))) {
    throw new Error(`[merge-kaizenly] missing ${page} in ${target} — merge failed`);
  }
}
console.log('[merge-kaizenly] merged Kaizenly site into dist/products/kaizenly/');
