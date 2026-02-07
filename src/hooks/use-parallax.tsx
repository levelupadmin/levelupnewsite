import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

interface UseParallaxOptions {
  /** How much the element moves relative to scroll. Negative = opposite direction. Default: -0.15 */
  speed?: number;
  /** Scroll offset range. Default: ["start end", "end start"] */
  offset?: [string, string];
}

/**
 * Returns a ref and a y MotionValue for parallax scroll effect.
 * Attach ref to the container and y to a motion element's style.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: UseParallaxOptions = {}
): { ref: React.RefObject<T>; y: MotionValue<number> } {
  const { speed = -0.15, offset = ["start end", "end start"] } = options;
  const ref = useRef<T>(null!);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  // Map scroll progress (0→1) to pixel movement
  const range = speed * 200; // total pixel range
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  return { ref, y };
}
