interface SeoProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: string;
  jsonLd?: Record<string, unknown>;
}

/**
 * No-op in Astro context. SEO is handled by `<BaseLayout>` / `<Seo>` at build time.
 * Kept as a stable import path so legacy React page components compile unchanged.
 */
const usePageSeo = (_props: SeoProps): void => {
  // intentionally empty
};

export default usePageSeo;
