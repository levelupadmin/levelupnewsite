import { useEffect } from "react";
import { SITE_URL } from "@/lib/constants";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: string;
  jsonLd?: Record<string, unknown>;
}

/**
 * Sets document title, meta description, canonical URL, and optional JSON-LD
 * for GEO and SEO on SPA route changes.
 */
const usePageSeo = ({ title, description, path, ogImage, type = "website", jsonLd }: SeoProps) => {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;

    const setMeta = (property: string, content: string, isOg = false) => {
      const attr = isOg ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, property);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", type, true);
    setMeta("og:url", url, true);
    if (ogImage) setMeta("og:image", ogImage, true);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // JSON-LD
    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      if (script) script.remove();
    };
  }, [title, description, path, ogImage, type, jsonLd]);
};

export default usePageSeo;
