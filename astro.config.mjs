// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The site lives on Cloudflare Pages at the root: base is always '/'
// and the site URL is the pages.dev URL. No env vars — when the custom
// domain nadeemdevapps.com is attached, change `site` to it.
export default defineConfig({
  site: 'https://nadeem-dev-apps.pages.dev/',
  base: '/',
  integrations: [sitemap()],
});
