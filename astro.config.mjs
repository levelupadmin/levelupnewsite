import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';
import { storyRedirects } from './src/lib/storyMigration.mjs';

export default defineConfig({
  site: 'https://www.leveluplearning.in',
  output: 'static',
  redirects: {
    // /privacy is an alias some external references (incl. Play Console history)
    // expect; the canonical policy lives at /privacy-policy.
    '/privacy': '/privacy-policy',
    // Old masterclass URLs that Meta ads and the Framer site linked to.
    '/anthony': '/masterclass/anthony-gonsalvez',
    '/g-venket-ram-1': '/masterclass/g-venket-ram',
    '/karthik-subbaraj': '/masterclass/karthik-subbaraj',
    '/lokesh-kanagaraj': '/masterclass/lokesh-kanagaraj',
    '/nelson-dilipkumar': '/masterclass/nelson-dilipkumar',
    '/ravi-basrur': '/masterclass/ravi-basrur',
    '/drk-kiran': '/masterclass/drk-kiran',
    // Live programmes live on leveluplearning.live; these paths 404'd here.
    '/bfp-2': 'https://www.leveluplearning.live/bfp-2',
    '/ve': 'https://www.leveluplearning.live/ve',
    '/creator-academy': 'https://www.leveluplearning.live/creator-academy',
    // Student stories that have moved to /blog. Derived from the collection, so
    // the 301 appears the moment a story publishes and never before. The same
    // pairing drops the old page from getStaticPaths, so the two URLs are never
    // live together.
    ...storyRedirects(),
  },
  adapter: vercel({
    webAnalytics: { enabled: true },
    speedInsights: { enabled: true },
    imageService: true,
  }),
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap({
      // Static landing pages live in public/ rather than src/pages/, so the
      // integration never sees them. List them here or they stay unindexed.
      customPages: [
        'https://www.leveluplearning.in/communication',
        'https://www.leveluplearning.in/aivault',
        'https://www.leveluplearning.in/ai-cohort',
      ],
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        if (item.url === 'https://www.leveluplearning.in/') {
          item.changefreq = 'weekly';
          item.priority = 1.0;
        } else if (item.url === 'https://www.leveluplearning.in/reviews/') {
          item.changefreq = 'weekly';
          item.priority = 0.9;
        } else if (item.url.includes('/reviews/')) {
          item.changefreq = 'weekly';
          item.priority = 0.8;
        } else if (item.url.includes('/student-stories/') && item.url !== 'https://www.leveluplearning.in/student-stories/') {
          item.changefreq = 'monthly';
          item.priority = 0.7;
        } else if (item.url === 'https://www.leveluplearning.in/student-stories/') {
          item.changefreq = 'weekly';
          item.priority = 0.9;
        } else if (item.url.includes('/masterclass/')) {
          item.changefreq = 'monthly';
          item.priority = 0.8;
        } else if (item.url.includes('/terms') || item.url.includes('/privacy-policy')) {
          item.changefreq = 'yearly';
          item.priority = 0.3;
        } else {
          item.changefreq = 'monthly';
          item.priority = 0.6;
        }
        return item;
      },
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        'react-router-dom': '/src/lib/router-shim.tsx',
      },
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-dom/client'],
    },
    ssr: {
      noExternal: ['embla-carousel-react', 'embla-carousel-autoplay', 'framer-motion'],
    },
    plugins: [
      {
        // Force image/video imports from .tsx/.ts/.jsx/.js to return URL strings.
        // Astro's default returns ImageMetadata objects, but React islands here
        // were authored against Vite SPA defaults (string URLs) and pass `src`
        // directly into <img>/<video>. Auto-append ?url to keep them strings.
        name: 'asset-url-only-for-react',
        enforce: 'pre',
        async resolveId(source, importer) {
          if (!importer) return null;
          if (!/\.(tsx|ts|jsx|js|mjs)$/.test(importer)) return null;
          if (importer.includes('/.astro/')) return null;
          if (!/\.(png|jpe?g|webp|svg|avif|gif|mp4|webm)$/i.test(source)) return null;
          if (source.includes('?')) return null;
          const resolved = await this.resolve(source + '?url', importer, { skipSelf: true });
          return resolved;
        },
      },
    ],
  },
});
