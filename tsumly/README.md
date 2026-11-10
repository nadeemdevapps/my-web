# Tsumly — independent site

Tsumly's own website, as a complete Astro project in this folder. It is
independent of the main portfolio site: its own `src`, its own `DESIGN.md`,
its own theme (the app's purple/amber/cream palette + Inter and Bricolage
Grotesque), no shared code with the main site. Only the root `package.json`
/ dependency files are shared in spirit — this folder pins the same Astro
version as the main site.

## Status

Full site (2026-11-10): Home (hero, Why Tsumly, How it works, smart
repayment split, pre-app loans, person profiles, everyday money,
accounts, reports & statements, home dashboard, loan reminders, make it
yours, backup & privacy, FAQ) + Privacy + Terms, with nav, footer,
theme toggle, sitemap, llms.txt/llms-full.txt and robots.txt. Copy
carries over from the main site's `/products/tsumly/` page, verified
against the app repo and `docs/06_DESIGN.md`.

## Run it

```sh
cd tsumly
npm install   # once
npm run dev   # http://localhost:4321/my-web/products/tsumly/
npm run build # outputs dist/
npm run preview
```

## Deploy (at cutover — NOT yet)

The main site deploys from the repo root via GitHub Pages. When this site
is ready to go live, the merge is durable, not a manual copy:

1. Root `package.json` build runs `node scripts/merge-tsumly.mjs`
   after the main build (same pattern as `merge-kaizenly.mjs`): it
   auto-installs this folder's deps if `node_modules` is missing,
   builds it, copies `tsumly/dist/` into the main site's `dist/`
   under `products/tsumly/`, and verifies index/privacy/terms exist.
2. Delete the main site's `src/pages/products/tsumly.astro` AND
   `src/pages/products/tsumly/privacy.astro` AND
   `src/pages/products/tsumly/terms.astro` so the two versions do not
   collide, and add the Tsumly sitemap line to the root `robots.txt`.

Until cutover, this folder builds standalone only and is not deployed.

## Extract to its own repo

This folder is already a complete Astro project. To lift it out:

1. Copy this folder to a new repo.
2. `npm install` there (it has its own `package.json`).
3. In `astro.config.mjs`, change `site` to the new domain and remove
   `base` (or set it to the new sub-path).
4. Add a root `README.md` + `.gitignore` (`node_modules/`, `dist/`,
   `.astro/`) in the new repo — nothing else from the main site is needed.
   No shared components, layouts, or styles are imported from outside
   this folder.

## Design

See `DESIGN.md` in this folder — the single source of truth for this
site's design. The main site's `DESIGN.md` (repo root) does not apply here.
