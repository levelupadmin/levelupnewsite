import { useRef, useEffect, useLayoutEffect, useState, type ReactNode, type CSSProperties } from "react";

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  threshold?: number;
  as?: keyof JSX.IntrinsicElements;
  style?: CSSProperties;
}

// useLayoutEffect warns during server rendering; fall back to useEffect there.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * "static": as rendered on the server, fully visible, no transition.
 * "hidden": below the fold with JS running, waiting to scroll into view.
 * "shown":  revealed, with the entrance transition.
 */
type Phase = "static" | "hidden" | "shown";

function startsBelowFold(el: Element): boolean {
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return el.getBoundingClientRect().top > vh * 0.92;
}

function motionAllowed(): boolean {
  return (
    typeof window !== "undefined" &&
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Fade-up on scroll.
 *
 * Content is visible in the server HTML and stays visible until JS runs. On
 * mount, a block that starts below the fold is hidden and then revealed when
 * it scrolls into view; a block already on screen is left alone, so the
 * first screen never blinks and a page whose JS fails is never blank.
 * prefers-reduced-motion turns the effect off.
 */
const FadeInSection = ({
  children,
  className = "",
  delay = 0,
  distance = 24,
  threshold = 0.15,
  as: Tag = "div",
  style,
}: FadeInSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("static");

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || !motionAllowed() || !startsBelowFold(el)) return;
    setPhase("hidden");
  }, []);

  useEffect(() => {
    if (phase !== "hidden") return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("shown");
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [phase, threshold]);

  const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
  const motionStyle: CSSProperties =
    phase === "hidden"
      ? { opacity: 0, transform: `translate3d(0, ${distance}px, 0)` }
      : phase === "shown"
        ? {
            opacity: 1,
            transform: "none",
            transition: `opacity 0.7s ${ease} ${delay}ms, transform 0.7s ${ease} ${delay}ms`,
          }
        : {};

  return (
    // @ts-ignore
    <Tag ref={ref} className={className} style={{ ...style, ...motionStyle }}>
      {children}
    </Tag>
  );
};

export default FadeInSection;

/**
 * Hook version for components that need the visibility state directly
 * (e.g. to stagger children within a grid).
 *
 * `isVisible` starts true, so server HTML shows the content. On mount it
 * turns false only for an element below the fold (with JS and motion
 * allowed), then true again when the element scrolls into view.
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [armed, setArmed] = useState(false);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || !motionAllowed() || !startsBelowFold(el)) return;
    setIsVisible(false);
    setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [armed, threshold]);

  return { ref, isVisible };
}
