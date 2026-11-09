// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Kaizenly's independent site. It builds on its own; at cutover its dist is
// copied into the main site's dist under /products/kaizenly/ (see README.md).
// If this folder is ever extracted to its own repo, change `site` to the new
// domain and remove `base`.
export default defineConfig({
  site: 'https://nadeemdevapps.github.io',
  base: '/my-web/products/kaizenly',
  integrations: [sitemap()],
});
