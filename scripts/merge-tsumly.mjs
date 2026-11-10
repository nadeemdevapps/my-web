// Cutover (2026-11-10): the Tsumly independent site lives in tsumly/ as a
// complete Astro project. Its build output is merged into the main site's
// dist under products/tsumly/, so GitHub Pages serves it at
// /my-web/products/tsumly/. This runs as part of `npm run build` (root
// package.json), so every deploy — local or CI — carries the Tsumly pages.
// It fails loudly if the Tsumly build or the merge fails, so a deploy
// never silently ships without them.
import { execSync } from 'node:child_process';
import { cpSync, existsSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tsumlyDir = join(root, 'tsumly');
const tsumlyDist = join(tsumlyDir, 'dist');
const target = join(root, 'dist', 'products', 'tsumly');

function run(cmd, cwd) {
  execSync(cmd, { cwd, stdio: 'inherit' });
}

if (!existsSync(join(tsumlyDir, 'node_modules'))) {
  console.log('[merge-tsumly] installing Tsumly dependencies…');
  run('npm ci', tsumlyDir);
}
console.log('[merge-tsumly] building Tsumly site…');
run('npm run build', tsumlyDir);

if (existsSync(target)) rmSync(target, { recursive: true, force: true });
cpSync(tsumlyDist, target, { recursive: true });

for (const page of ['index.html', 'features/index.html', 'gallery/index.html', 'about/index.html', 'download/index.html', 'privacy/index.html', 'terms/index.html']) {
  if (!existsSync(join(target, page))) {
    throw new Error(`[merge-tsumly] missing ${page} in ${target} — merge failed`);
  }
}
console.log('[merge-tsumly] merged Tsumly site into dist/products/tsumly/');
