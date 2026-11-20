// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Tsumly's independent site. It builds on its own; the root build merges
// its dist into the main site's dist under /products/tsumly/ via
// scripts/merge-tsumly.mjs (see README.md). The site is served at the
// root of nadeem-dev-apps.pages.dev, so the base is the product subpath
// under '/'. If this folder is ever extracted to its own repo, change
// `site` to the new domain and remove `base`.
export default defineConfig({
  site: 'https://nadeem-dev-apps.pages.dev/',
  base: '/products/tsumly',
  integrations: [sitemap()],
});
