import { useRef, useEffect, useLayoutEffect, useState } from "react";

/**
 * Locale is pinned so the server build and the browser format identically.
 * Left to the default, Node and an en-IN browser disagree above 1 lakh
 * ("300,000" vs "3,00,000") and React reports a hydration mismatch.
 */
function formatNumber(
  num: number,
  hasComma?: boolean,
  decimals?: number
): string {
  if (decimals) return num.toFixed(decimals);
  if (hasComma) return Math.floor(num).toLocaleString("en-US");
  return Math.floor(num).toString();
}

// useLayoutEffect warns during SSR; there is no layout to read there anyway.
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Counts up to `target` when scrolled into view.
 *
 * The initial state is `target`, not 0, so the static HTML that Astro builds
 * carries the real number. Crawlers that never run JS read the true value
 * instead of "0+". The count-up is progressive enhancement layered on top:
 * the value is reset to 0 and animated only on the client, and only just
 * before the element reaches the viewport, so no frame ever paints the final
 * number and then snaps backwards.
 */
export const AnimatedCounter = ({
  target,
  suffix = "",
  hasComma = false,
  decimals,
  onComplete,
  celebrate = false,
  delay = 0,
}: {
  target: number;
  suffix?: string;
  hasComma?: boolean;
  decimals?: number;
  onComplete?: () => void;
  celebrate?: boolean;
  delay?: number;
}) => {
  const [value, setValue] = useState(target);
  const [done, setDone] = useState(false);
  const hasAnimated = useRef(false);
  const elRef = useRef<HTMLSpanElement>(null);

  // Keep the latest onComplete without restarting the animation when the
  // parent passes a new inline closure on every render.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useIsomorphicLayoutEffect(() => {
    // Reduced motion: leave the real number on screen, never animate.
    if (prefersReducedMotion()) {
      setDone(true);
      return;
    }

    const el = elRef.current;
    let observer: IntersectionObserver | null = null;
    let frame = 0;
    let timer = 0;
    let cancelled = false;

    const runAnimation = () => {
      if (hasAnimated.current || cancelled) return;
      hasAnimated.current = true;
      observer?.disconnect();

      // Drop to 0 first, then climb. Reached either before the first paint
      // (element already on screen at hydration) or while the element is
      // still below the fold, so the reset is never visible.
      setValue(0);

      const startAnim = () => {
        if (cancelled) return;
        const duration = 1800;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          if (cancelled) return;
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(eased * target);

          if (progress < 1) {
            frame = requestAnimationFrame(animate);
          } else {
            setValue(target);
            setDone(true);
            onCompleteRef.current?.();
          }
        };

        frame = requestAnimationFrame(animate);
      };

      if (delay > 0) {
        timer = window.setTimeout(startAnim, delay);
      } else {
        startAnim();
      }
    };

    if (!el || typeof IntersectionObserver === "undefined") {
      // No way to observe: the real value is already rendered, so just mark
      // it done rather than animating from 0 at an arbitrary moment.
      setDone(true);
      return;
    }

    // Already on screen when hydration runs: reset synchronously, before the
    // browser paints, so the final value never flashes.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      runAnimation();
    } else {
      // rootMargin fires the callback while the element is still below the
      // fold, so the drop to 0 happens off-screen.
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) runAnimation();
        },
        { threshold: 0, rootMargin: "0px 0px 20% 0px" }
      );
      observer.observe(el);
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (frame) cancelAnimationFrame(frame);
      if (timer) window.clearTimeout(timer);
    };
  }, [target, delay]);

  return (
    <span
      ref={elRef}
      className={done && celebrate ? "counter-celebrate inline-block" : undefined}
    >
      {/* One expression, so React emits a single text node. Rendered as two
          children it would separate them with a <!-- --> marker and naive
          text extractors read "67,746 +" instead of "67,746+". */}
      {formatNumber(value, hasComma, decimals) + suffix}
    </span>
  );
};
