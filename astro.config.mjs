import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.dfsengineer.com',
  // 'hybrid': every page is static by default, same as before. Only
  // src/pages/api/* opts into server rendering (see `prerender = false`
  // in that route) so it can call Brevo with a server-side-only API key.
  output: 'hybrid',
  adapter: vercel(),
  // mdx lets a handful of blog posts (the ones that embed a live
  // component, like the optimizer waitlist form) use .mdx instead of
  // .md. Existing .md posts are untouched.
  integrations: [
    sitemap({
      // /tools/* is unlisted beta work (gated behind a cookie, noindex'd
      // on the page itself too) — keep it out of the sitemap as well.
      filter: (page) => !page.includes('/tools/'),
    }),
    mdx(),
  ],
});
