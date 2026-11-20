// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site URL + base: GitHub Pages project site by default.
// Cloudflare Pages serves the same build at the root — set SITE_URL to the
// pages.dev URL and SITE_BASE to '/' there (and drop `base` entirely
// when the custom domain nadeemdevapps.com is attached).
const siteBase = (process.env.SITE_BASE ?? '/nadeem-dev-apps').replace(/\/$/, '');
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://nadeemdevapps.github.io',
  base: siteBase || '/',
  integrations: [sitemap()],
});
