import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useIsTouch } from "@/lib/motion-utils";

export default function CustomCursor() {
  const isTouch = useIsTouch();
  const prefersReducedMotion = useReducedMotion();
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 360, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 360, damping: 32, mass: 0.4 });

  useEffect(() => {
    if (isTouch || prefersReducedMotion) return;

    const handleMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], [data-cursor='hover']"
      );
      setHovering(Boolean(interactive));
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerover", handleOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, [isTouch, prefersReducedMotion, visible, x, y]);

  if (isTouch || prefersReducedMotion) return null;

  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100]"
      style={{ x: sx, y: sy }}
    >
      <m.div
        className="rounded-full bg-amber-400/80 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_24px_rgba(251,191,36,0.55)]"
        animate={{
          width: hovering ? 56 : 14,
          height: hovering ? 56 : 14,
          opacity: visible ? (hovering ? 0.55 : 0.9) : 0,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.4 }}
      />
    </m.div>
  );
}
