import { useEffect } from "react";
import Lenis from "lenis";

const useLenis = () => {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafId: number | null = null;

    // Defer Lenis init until after first paint to avoid blocking rendering
    const initLenis = () => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    };

    // Use requestIdleCallback if available, otherwise a short setTimeout fallback
    if ("requestIdleCallback" in window) {
      const idleId = (window as any).requestIdleCallback(initLenis);
      return () => {
        (window as any).cancelIdleCallback(idleId);
        if (rafId !== null) cancelAnimationFrame(rafId);
        lenis?.destroy();
      };
    } else {
      const timeoutId = setTimeout(initLenis, 100);
      return () => {
        clearTimeout(timeoutId);
        if (rafId !== null) cancelAnimationFrame(rafId);
        lenis?.destroy();
      };
    }
  }, []);
};

export default useLenis;
