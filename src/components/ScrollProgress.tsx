import { m, useScroll, useSpring, useReducedMotion } from "framer-motion";

export default function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  if (prefersReducedMotion) return null;

  return (
    <m.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-200"
      style={{ scaleX }}
    />
  );
}
