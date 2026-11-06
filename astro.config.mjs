// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site URL: GitHub Pages project site for now.
// When the custom domain (nadeemdevapps.com) is attached, change `site`
// to https://nadeemdevapps.com and remove `base`.
export default defineConfig({
  site: 'https://nadeemdevapps.github.io',
  base: '/my-web',
  integrations: [sitemap()],
});
