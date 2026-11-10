# Kaizenly — independent site

Kaizenly's own website, as a complete Astro project in this folder. It is
independent of the main portfolio site: its own `src`, its own `DESIGN.md`,
its own theme (the app's green palette + DM Sans), no shared code with the
main site. Only the root `package.json` / dependency files are shared in
spirit — this folder pins the same Astro version as the main site.

## Status

Multi-page (2026-11-10): Home is trimmed — hero, Why Kaizenly?, a
highlights teaser (four cards linking to Features), FAQ, the local-first
band, and the About card — plus a dedicated Features page (exhaustive:
every feature, rule, and limit in detail, verified against `FEATURES.md`
in the app repo), a Gallery shell (no images yet — real phone screenshots
arrive later from the user), an About page that is mainly about the app
(the story, why the name, the philosophy; a short developer section at
the end only — the developer bio lives on the main portfolio site), a
Download page (honest: no download yet, the app is in development; what
to expect when it arrives), plus Privacy and Terms. Nav: Home / Features
/ Gallery / About / Download / Privacy / Terms. Copy carries over from the main site's
`/products/kaizenly/` pages, verified against `FEATURES.md` in the app repo
and updated for the free model (bags, routines, sounds, and parachutes are
free — including 12-hour sessions + silence/DND). No internal details
anywhere in site copy: no architecture names, no component names, no
encryption algorithm names — behaviour only. No location is stated for the
developer anywhere on this site. Motion: scroll reveals, the Tower building
block-by-block, a ticking timer, a drifting floating pill, and 3D scroll
tilt — all transform/opacity only, disabled under
`prefers-reduced-motion`. SEO: `llms.txt` + `llms-full.txt`,
`robots.txt`, `sitemap.xml` at build time, JSON-LD
(`SoftwareApplication` + `FAQPage`) on Home.

## Run it

```sh
cd kaizenly
npm install   # once
npm run dev   # http://localhost:4321/my-web/products/kaizenly/
npm run build # outputs dist/
npm run preview
```

## Deploy (cut over 2026-11-10)

The main site deploys from the repo root via GitHub Pages. `npm run build`
at the repo root builds this folder and merges its `dist` into the main
site's `dist` under `products/kaizenly/` (`scripts/merge-kaizenly.mjs`),
so every deploy carries the Kaizenly pages. The old main-site pages
(`src/pages/products/kaizenly.astro`, `kaizenly/privacy.astro`,
`kaizenly/terms.astro`) were deleted at cutover.

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
