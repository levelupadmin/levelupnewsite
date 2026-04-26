import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.leveluplearning.in',
  output: 'static',
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
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        if (item.url === 'https://www.leveluplearning.in/') {
          item.changefreq = 'weekly';
          item.priority = 1.0;
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
