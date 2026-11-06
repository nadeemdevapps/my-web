# my-web — nadeemdevapps.com

Nadeem Dev Apps' website: portfolio, marketing, and product pages
(Tsumly, Kaizenly) as sub-pages.

- **Stack:** Astro (static HTML, zero JS by default)
- **Design:** [`DESIGN.md`](./DESIGN.md) — the single source of truth for
  colours, type, spacing, radius, and components. Every page follows it.
- **AI-readable:** semantic HTML, `llms.txt`, sitemap, JSON-LD, and a
  `robots.txt` that allows AI crawlers.

## Run it

```sh
npm install
npm run dev      # local preview at http://localhost:4321/my-web
npm run build    # static output in dist/
```

## Deploy

GitHub Pages via `.github/workflows/deploy.yml` (Astro build → Pages).
Repo Settings → Pages → Source: **GitHub Actions**.

When the custom domain (`nadeemdevapps.com`) is attached, update `site`
in `astro.config.mjs` to `https://nadeemdevapps.com` and remove `base`.

## Pages

- `/` — Home
- `/products/` — product index
- `/products/tsumly/` — Tsumly (own site: home, privacy, terms)
- `/products/kaizenly/` — Kaizenly (own site: home, privacy, terms)
- `/about/`, `/contact/`, `/privacy/`, `/terms/`
