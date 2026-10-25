/**
 * Scroll reveal for elements with the `mck-reveal` class.
 *
 * Server HTML is always fully visible. This script only hides blocks that
 * start below the fold, and only once it is running, so a slow or failed
 * script never leaves a blank page and nothing above the fold flickers.
 * prefers-reduced-motion and browsers without IntersectionObserver get no
 * animation at all.
 */
declare global {
  interface Window {
    __mckReveal?: boolean;
  }
}

export function initReveal(): void {
  if (typeof window === "undefined" || window.__mckReveal) return;
  window.__mckReveal = true;

  const run = () => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("mck-js");

    const show = (el: Element) => {
      el.classList.remove("mck-pending");
      el.classList.add("mck-in");
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          show(e.target);
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 }
    );

    const vh = window.innerHeight || document.documentElement.clientHeight;
    document.querySelectorAll<HTMLElement>(".mck-reveal").forEach((el) => {
      if (el.classList.contains("mck-in") || el.classList.contains("mck-pending")) return;
      // Anything already on screen (or above it, after a restored scroll)
      // stays as the server drew it.
      if (el.getBoundingClientRect().top < vh * 0.92) {
        el.classList.add("mck-in");
        return;
      }
      el.classList.add("mck-pending");
      io.observe(el);
    });

    // Never print or hand off a page with hidden blocks.
    window.addEventListener("beforeprint", () => {
      document.querySelectorAll(".mck-pending").forEach(show);
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
}
