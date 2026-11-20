// Concepts (2026-11-19): the five cleaned xyz concept sites are VENDORED in
// concepts-src/ (copies of the nadeemdevapps/xyz repo's projects, same
// pattern as kaizenly/ and tsumly/ — each product folder a complete project,
// merged into this site's dist). Each is built with the base of its subpath
// under this site and merged into dist/concepts/<slug>/, so GitHub Pages
// serves it at /nadeem-dev-apps/concepts/<slug>/. This runs as part of `npm run
// build` (root package.json), so every deploy — local or CI — carries the
// concept sites, with no extra checkout or secret needed. It fails loudly
// if a concept build or the merge fails, so a deploy never silently ships
// without them. Source of truth for the concepts is the xyz repo; to sync a
// change, copy the project folder over concepts-src/<slug>/ again.
//
// NOTE: the base flag must be passed to `vite build` directly.
// `npm run build -- --base=...` does NOT work: npm appends the flag to the
// end of the whole script (`vite build && node scripts/postbuild.mjs`), so it
// lands on postbuild instead of vite and the build comes out with base '/'.
import { execSync } from 'node:child_process';
import { cpSync, existsSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const conceptsSrcDir = join(root, 'concepts-src');

// Site base: '/nadeem-dev-apps' for GitHub Pages by default, '/' for Cloudflare
// Pages at the root (SITE_BASE env).
const siteBase = (process.env.SITE_BASE ?? '/nadeem-dev-apps').replace(/\/$/, '');

const concepts = [
  { dir: 'tally-bar', slug: 'tally-bar' },
  { dir: 'look-out-below', slug: 'look-out-below' },
  { dir: 'stitch-and-tan', slug: 'stitch-and-tan' },
  { dir: 'product-site', slug: 'product-site' },
  { dir: 'portfolio-concept', slug: 'portfolio-concept' },
];

function run(cmd, cwd) {
  execSync(cmd, { cwd, stdio: 'inherit' });
}

if (!existsSync(conceptsSrcDir)) {
  throw new Error(
    '[merge-concepts] concepts-src/ not found — the concept sites are vendored copies of the nadeemdevapps/xyz repo; copy each project into concepts-src/<slug>/',
  );
}

for (const { dir, slug } of concepts) {
  const projectDir = join(conceptsSrcDir, dir);
  const base = `${siteBase}/concepts/${slug}/`;
  const target = join(root, 'dist', 'concepts', slug);

  console.log(`[merge-concepts] building ${slug} (base ${base})…`);
  if (!existsSync(join(projectDir, 'node_modules'))) {
    console.log(`[merge-concepts] installing ${slug} dependencies…`);
    run('npm ci', projectDir);
  }
  run(`npx vite build --base=${base}`, projectDir);
  run('node scripts/postbuild.mjs', projectDir);

  const clientDist = join(projectDir, 'dist', 'client');
  if (!existsSync(join(clientDist, 'index.html'))) {
    throw new Error(`[merge-concepts] missing dist/client/index.html for ${slug} — build failed`);
  }
  if (existsSync(target)) rmSync(target, { recursive: true, force: true });
  cpSync(clientDist, target, { recursive: true });

  // Verify every local asset the built index.html references exists in the
  // merged dist, and that no root-absolute local ref (/assets/..., /images/...,
  // /favicon.svg) slipped through — those would 404 under the subpath.
  const html = readFileSync(join(target, 'index.html'), 'utf8');
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
  for (const ref of refs) {
    if (ref.startsWith('/') && !ref.startsWith('//') && !ref.startsWith(base)) {
      throw new Error(`[merge-concepts] ${slug}: index.html has root-absolute ref ${ref} — rebuild with the subpath base`);
    }
    if (ref.startsWith(base) && !existsSync(join(target, ref.slice(base.length)))) {
      throw new Error(`[merge-concepts] ${slug}: index.html references ${ref} but it is missing in ${target}`);
    }
  }
  console.log(`[merge-concepts] merged ${slug} into dist/concepts/${slug}/`);
}
