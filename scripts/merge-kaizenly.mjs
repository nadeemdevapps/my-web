// Cutover (2026-11-10): the Kaizenly independent site lives in kaizenly/ as a
// complete Astro project. Its build output is merged into the main site's
// dist under products/kaizenly/, so Cloudflare Pages serves it at
// /products/kaizenly/. This runs as part of `npm run build` (root
// package.json), so every deploy — local or CI — carries the Kaizenly pages.
// It fails loudly if the Kaizenly build or the merge fails, so a deploy
// never silently ships without them.
import { execSync } from 'node:child_process';
import { cpSync, existsSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const kaizenlyDir = join(root, 'kaizenly');
const kaizenlyDist = join(kaizenlyDir, 'dist');
const target = join(root, 'dist', 'products', 'kaizenly');

// Site base is always '/' — the site lives at the root of
// nadeem-dev-apps.pages.dev, so the Kaizenly base is /products/kaizenly/.
const base = '/products/kaizenly/';

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

for (const page of ['index.html', 'features/index.html', 'gallery/index.html', 'about/index.html', 'download/index.html', 'privacy/index.html', 'terms/index.html']) {
  if (!existsSync(join(target, page))) {
    throw new Error(`[merge-kaizenly] missing ${page} in ${target} — merge failed`);
  }
}

// Verify every local asset the merged index.html references exists in the
// merged dist, and that no root-absolute local ref (/assets/..., /_astro/...)
// slipped through — those would 404, since assets live under
// /products/kaizenly/. Same check as scripts/merge-concepts.mjs, adapted:
// product pages also link to in-page anchors, so strip any #fragment (or
// ?query) before the existence check.
const html = readFileSync(join(target, 'index.html'), 'utf8');
const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
for (const ref of refs) {
  if (ref.startsWith('/') && !ref.startsWith('//') && !ref.startsWith(base)) {
    throw new Error(`[merge-kaizenly] index.html has root-absolute ref ${ref} — rebuild with the root base`);
  }
  if (ref.startsWith(base)) {
    const path = ref.slice(base.length).split(/[?#]/)[0];
    if (!existsSync(join(target, path))) {
      throw new Error(`[merge-kaizenly] index.html references ${ref} but it is missing in ${target}`);
    }
  }
}
console.log('[merge-kaizenly] merged Kaizenly site into dist/products/kaizenly/');
