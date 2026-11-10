// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Tsumly's independent site. It builds on its own; at cutover the root
// build merges its dist into the main site's dist under /products/tsumly/
// via scripts/merge-tsumly.mjs (see README.md).
// If this folder is ever extracted to its own repo, change `site` to the new
// domain and remove `base`.
export default defineConfig({
  site: 'https://nadeemdevapps.github.io',
  base: '/my-web/products/tsumly',
  integrations: [sitemap()],
});
