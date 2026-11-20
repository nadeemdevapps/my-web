// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Tsumly's independent site. It builds on its own; at cutover the root
// build merges its dist into the main site's dist under /products/tsumly/
// via scripts/merge-tsumly.mjs (see README.md).
// Base follows SITE_BASE (default '/nadeem-dev-apps' for GitHub Pages, '/' for
// Cloudflare Pages at the root); if this folder is ever extracted to its
// own repo, change `site` to the new domain and remove `base`.
const siteBase = (process.env.SITE_BASE ?? '/nadeem-dev-apps').replace(/\/$/, '');
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://nadeemdevapps.github.io',
  base: `${siteBase}/products/tsumly`,
  integrations: [sitemap()],
});
