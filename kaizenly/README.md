# Kaizenly — independent site

Kaizenly's own website, as a complete Astro project in this folder. It is
independent of the main portfolio site: its own `src`, its own `DESIGN.md`,
its own theme (the app's green palette + DM Sans), no shared code with the
main site. Only the root `package.json` / dependency files are shared in
spirit — this folder pins the same Astro version as the main site.

## Status

Scaffold (2026-11-10): the project builds; the home page is a hero-only
placeholder carrying the verified H1 + lede. The full page (features,
Tower, stats, FAQ, footer) and the Privacy/Terms pages are built next,
carrying copy over from the main site's `/products/kaizenly/` pages,
verified against `FEATURES.md` in the app repo.

## Run it

```sh
cd kaizenly
npm install   # once
npm run dev   # http://localhost:4321/my-web/products/kaizenly/
npm run build # outputs dist/
npm run preview
```

## Deploy (at cutover — NOT yet)

The main site deploys from the repo root via GitHub Pages. When this site
is ready to go live:

1. Build this folder: `npm run build` (inside `kaizenly/`).
2. Copy `kaizenly/dist/` into the main site's `dist/` under
   `products/kaizenly/` (a dist-merge step — GitHub Pages hosts one site
   per repo, so the product dists are merged into the main dist).
3. Delete the main site's `src/pages/products/kaizenly.astro`,
   `src/pages/products/kaizenly/privacy.astro` and
   `src/pages/products/kaizenly/terms.astro` so the two versions do not
   collide.

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
