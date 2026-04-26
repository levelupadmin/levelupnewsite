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
    },
    ssr: {
      noExternal: ['embla-carousel-react', 'embla-carousel-autoplay', 'framer-motion'],
    },
  },
});
