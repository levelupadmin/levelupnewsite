import { useEffect, useRef, useState } from "react";

interface Props {
  /** CSS selector for the wrapper element whose height the line spans */
  containerSelector: string;
}

/**
 * Vertical center line that lights up progressively as the user scrolls
 * through `containerSelector`. The line itself is full-height; an inner
 * "filled" gradient grows from 0% → 100% as the section scrolls into and
 * past the viewport. Matches Framer's why-is-this center line behaviour.
 *
 * Usage: place inside the wrapper element you pass via containerSelector.
 *
 * SSR-safe — the line renders at full opacity by default; JS mounts and
 * takes over once the page hydrates.
 */
export default function ScrollGlowLine({ containerSelector }: Props) {
  const [progress, setProgress] = useState(0); // 0 → 1
  const rafRef = useRef(0);

  useEffect(() => {
    const container = document.querySelector(containerSelector) as HTMLElement | null;
    if (!container) return;

    const update = () => {
      const rect = container.getBoundingClientRect();
      const total = container.offsetHeight;
      // 0 when section's top hits center of viewport,
      // 1 when section's bottom hits center of viewport
      const center = window.innerHeight / 2;
      const scrolled = center - rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [containerSelector]);

  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px hidden md:block pointer-events-none z-0"
    >
      {/* Base track — dim line for the full length so even before scroll
          the user sees the visual rail. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(212,163,108,0.12) 6%, rgba(212,163,108,0.18) 50%, rgba(212,163,108,0.12) 94%, transparent 100%)",
        }}
      />
      {/* Filled portion — grows as scroll progresses. Bright gold with
          outer glow so it reads as "the section is lighting up". */}
      <div
        className="absolute left-0 right-0 top-0 transition-[height] duration-100 ease-out"
        style={{
          height: `${progress * 100}%`,
          background:
            "linear-gradient(180deg, rgba(212,163,108,0.4) 0%, rgba(245,213,154,0.95) 50%, rgba(212,163,108,0.85) 100%)",
          boxShadow:
            "0 0 14px rgba(245,213,154,0.7), 0 0 32px rgba(212,163,108,0.4)",
        }}
      />
      {/* Bright "leading edge" pulse at the bottom of the filled section */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full pointer-events-none transition-[top] duration-100 ease-out"
        style={{
          top: `calc(${progress * 100}% - 5px)`,
          background:
            "radial-gradient(closest-side, rgba(255,235,200,1), rgba(245,213,154,0.7) 40%, transparent 75%)",
          boxShadow: "0 0 16px rgba(245,213,154,0.95)",
          opacity: progress > 0.02 && progress < 0.98 ? 1 : 0,
        }}
      />
    </div>
  );
}
