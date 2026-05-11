import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR + first paint: render children as-is, no wrapper, no Lenis.
  // ReactLenis with root=true attaches to <html> via JS so deferring this
  // does not change the visible layout — it just avoids a hydration mismatch.
  if (!mounted || prefersReducedMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  );
}
