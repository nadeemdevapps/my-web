// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Kaizenly's independent site. It builds on its own; at cutover its dist is
// copied into the main site's dist under /products/kaizenly/ (see README.md).
// Base follows SITE_BASE (default '/my-web' for GitHub Pages, '/' for
// Cloudflare Pages at the root); if this folder is ever extracted to its
// own repo, change `site` to the new domain and remove `base`.
const siteBase = (process.env.SITE_BASE ?? '/my-web').replace(/\/$/, '');
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://nadeemdevapps.github.io',
  base: `${siteBase}/products/kaizenly`,
  integrations: [sitemap()],
});
