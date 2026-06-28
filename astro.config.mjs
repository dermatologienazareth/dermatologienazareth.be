// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Pure static site (SSG) deployed to Cloudflare Pages — Cloudflare serves the
// built `dist/` directly, so the @astrojs/cloudflare adapter (SSR-only) is not needed.
// `site` is required for correct sitemap entries and canonical URLs.
export default defineConfig({
  site: 'https://dermatologienazareth.be',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    // Tailwind CSS v4 is wired through its Vite plugin (the legacy
    // @astrojs/tailwind integration is deprecated for v4).
    plugins: [tailwindcss()],
  },
});
