import { useRef, useEffect, useState, type ReactNode, type CSSProperties } from "react";

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  threshold?: number;
  as?: keyof JSX.IntrinsicElements;
  style?: CSSProperties;
}

/**
 * Scroll-triggered fade-up wrapper using Intersection Observer + CSS transitions.
 * Wrap any block to get a smooth entrance animation when it scrolls into view.
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
  }, [threshold]);

  const baseStyle: CSSProperties = {
    ...style,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : `translateY(${distance}px)`,
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: "opacity, transform",
  };

  return (
    // @ts-ignore
    <Tag ref={ref} className={className} style={baseStyle}>
      {children}
    </Tag>
  );
};

export default FadeInSection;

/**
 * Hook version for components that need the visibility state directly
 * (e.g. to stagger children within a grid).
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
  }, [threshold]);

  return { ref, isVisible };
}
