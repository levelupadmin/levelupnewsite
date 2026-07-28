import { useEffect, useRef } from "react";
import { trackSectionView } from "@/lib/clarity";

/**
 * Tracks when page sections scroll into view using IntersectionObserver.
 * Fires once per section per page load.
 */
export function useSectionViewTracking() {
  const tracked = useRef(new Set<string>());

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting && id && !tracked.current.has(id)) {
            tracked.current.add(id);
            trackSectionView(id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
}
