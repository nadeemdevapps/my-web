// Build-time sitemap endpoint: /sitemap.xml
//
// The @astrojs/sitemap integration only emits the index form
// (sitemap-index.xml + sitemap-0.xml) — it has no option for a plain
// sitemap.xml, which crawlers and tools expect at the conventional URL.
// This endpoint provides that plain sitemap, generated at build time
// from the actual page files in src/pages, so it can never go stale:
// add or remove a page and the next build picks it up automatically.
// The integration's sitemap-index.xml keeps working alongside it;
// both list the same URLs.
import type { APIRoute } from 'astro';

// Lazy glob: we only need the file paths (the keys), never the modules.
const pageFiles = import.meta.glob('./**/*.astro');

function fileToRoute(file: string): string | null {
  // file looks like './about.astro' or './products/tsumly.astro'
  let route = file.replace(/^\.\//, '').replace(/\.astro$/, '');
  if (route === '404') return null; // error page: never in a sitemap
  if (route.endsWith('/index')) route = route.slice(0, -'/index'.length);
  return route; // '' for the home page, otherwise e.g. 'about', 'products/tsumly'
}

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // '/my-web'
  const urls = Object.keys(pageFiles)
    .map(fileToRoute)
    .filter((route): route is string => route !== null)
    .sort()
    .map((route) => {
      // Trailing-slash form, matching what @astrojs/sitemap emits.
      const path = route ? `${base}/${route}/` : `${base}/`;
      return new URL(path, site).toString();
    });
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join('\n')}\n</urlset>\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
