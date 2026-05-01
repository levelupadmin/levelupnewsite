import { useEffect } from "react";

interface PageInteractionsProps {
  /** Course slug (e.g. "lokesh-kanagaraj") — used for ViewContent + Lead tracking */
  course?: string;
  /** Course display name (e.g. "Lokesh Kanagaraj Masterclass") */
  courseName?: string;
  /** Course price in INR — used for InitiateCheckout value */
  price?: number;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Page-level interactions for the Framer-clone masterclass pages:
 *  - Scroll-triggered fade-up reveals on .reveal elements
 *  - Smooth scroll polish (CSS scroll-behavior + ease)
 *  - Subtle hero parallax on scroll
 *  - Mouse-position tilt on .tilt elements
 *  - Meta Pixel events: ViewContent (on mount) + Lead/InitiateCheckout (on CTA click)
 *  - Microsoft Clarity custom events for the same actions
 *
 * Mounted as a client:idle island so it never blocks first paint or breaks
 * server-rendered HTML for SEO / no-JS / screenshot tools. Content is always
 * visible by default — this only ADDS animation when JS is available.
 */
export default function PageInteractions({ course, courseName, price }: PageInteractionsProps = {}) {
  useEffect(() => {
    // Mark page so CSS can switch elements into hidden-then-revealed state
    // ONLY after we've confirmed JS is alive. If JS never runs, content
    // stays visible by default.
    const root = document.documentElement;
    if (!root.classList.contains("mc-js-on")) root.classList.add("mc-js-on");

    // ─────────────────────────────────────────────────────────────────
    // Scroll-triggered fade-up
    // ─────────────────────────────────────────────────────────────────
    const reveal = (entries: IntersectionObserverEntry[], obs: IntersectionObserver) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("mc-in");
          obs.unobserve(e.target);
        }
      }
    };
    const io = new IntersectionObserver(reveal, {
      threshold: 0.1,
      rootMargin: "0px 0px -8% 0px",
    });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // (Removed) Hero parallax — was rewriting transform on every scroll tick
    // which caused some browsers to stutter the video element. The hero video
    // now plays cleanly without scroll-driven transforms.

    // ─────────────────────────────────────────────────────────────────
    // Mouse-position tilt for cards with .tilt
    // ─────────────────────────────────────────────────────────────────
    const tilts = document.querySelectorAll<HTMLElement>(".tilt");
    const tiltMove = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(0) scale(1.015)`;
    };
    const tiltLeave = (e: MouseEvent) => {
      (e.currentTarget as HTMLElement).style.transform = "";
    };
    tilts.forEach((t) => {
      t.addEventListener("mousemove", tiltMove);
      t.addEventListener("mouseleave", tiltLeave);
    });

    // Note: ViewContent + Lead + InitiateCheckout + UTM-forward are now
    // handled site-wide by an inline script in BaseLayout.astro. This island
    // only owns the visual interactions (reveal/parallax/tilt) so it stays
    // small + works the same for every clone page.

    return () => {
      io.disconnect();
      tilts.forEach((t) => {
        t.removeEventListener("mousemove", tiltMove);
        t.removeEventListener("mouseleave", tiltLeave);
      });
    };
  }, [course, courseName, price]);

  return null;
}
