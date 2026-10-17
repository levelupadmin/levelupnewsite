import { useEffect, useRef } from "react";

interface Props {
  /** CSS selector for the wrapper element whose height the line spans */
  containerSelector: string;
}

/**
 * Vertical centre line that lights up as the visitor scrolls through
 * `containerSelector`: a dim full-height rail, a gold fill that grows from
 * the top, and a bright dot at the fill's leading edge. Desktop only.
 *
 * - The fill grows with transform: scaleY and the dot moves with
 *   translate3d, written straight to the DOM once per frame, so scrolling
 *   causes no layout work and no React renders.
 * - It listens to scroll only while the section is near the screen.
 * - prefers-reduced-motion shows the rail fully lit and still.
 * - Server HTML shows the dim rail; nothing depends on the script.
 */
export default function ScrollGlowLine({ containerSelector }: Props) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = document.querySelector(containerSelector) as HTMLElement | null;
    const rail = railRef.current;
    const fill = fillRef.current;
    const dot = dotRef.current;
    if (!container || !rail || !fill || !dot) return;

    const paint = (p: number) => {
      fill.style.transform = `scaleY(${p.toFixed(4)})`;
      dot.style.transform = `translate3d(-50%, ${(p * rail.offsetHeight - 5).toFixed(1)}px, 0)`;
      dot.style.opacity = p > 0.02 && p < 0.98 ? "1" : "0";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(1);
      return;
    }

    let raf = 0;
    let near = false;
    const update = () => {
      raf = 0;
      const rect = container.getBoundingClientRect();
      // 0 when the section's top reaches the middle of the screen,
      // 1 when its bottom does.
      const p = Math.max(0, Math.min(1, (window.innerHeight / 2 - rect.top) / container.offsetHeight));
      paint(p);
    };
    const onScroll = () => {
      if (near && !raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(
      (entries) => {
        near = entries.some((e) => e.isIntersecting);
        if (near) onScroll();
      },
      { rootMargin: "50% 0px 50% 0px" }
    );
    io.observe(container);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [containerSelector]);

  return (
    <div
      ref={railRef}
      aria-hidden="true"
      className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px hidden md:block pointer-events-none z-0"
    >
      {/* Dim rail for the full length, so the line shows before any scroll. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(212,163,108,0.12) 6%, rgba(212,163,108,0.18) 50%, rgba(212,163,108,0.12) 94%, transparent 100%)",
        }}
      />
      {/* Gold fill, scaled from the top as the section scrolls past. */}
      <div
        ref={fillRef}
        className="absolute inset-0 origin-top will-change-transform"
        style={{
          transform: "scaleY(0)",
          background:
            "linear-gradient(180deg, rgba(212,163,108,0.4) 0%, rgba(245,213,154,0.95) 50%, rgba(212,163,108,0.85) 100%)",
          boxShadow: "0 0 14px rgba(245,213,154,0.7), 0 0 32px rgba(212,163,108,0.4)",
        }}
      />
      {/* Bright dot at the fill's leading edge. */}
      <div
        ref={dotRef}
        className="absolute left-1/2 top-0 w-2.5 h-2.5 rounded-full pointer-events-none will-change-transform transition-opacity duration-300"
        style={{
          transform: "translate3d(-50%, -5px, 0)",
          opacity: 0,
          background: "radial-gradient(closest-side, rgba(255,235,200,1), rgba(245,213,154,0.7) 40%, transparent 75%)",
          boxShadow: "0 0 16px rgba(245,213,154,0.95)",
        }}
      />
    </div>
  );
}
