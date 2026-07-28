import { useRef, useEffect, useState, type CSSProperties } from "react";

interface AccentLineProps {
  /** CSS gradient string; defaults to amber */
  gradient?: string;
  className?: string;
}

/**
 * Animated section divider that "draws" itself from center outward
 * when it scrolls into view. Pure CSS animation triggered by IO.
 */
const AccentLine = ({
  gradient = "linear-gradient(90deg, transparent 10%, hsl(38 75% 55% / 0.5) 50%, transparent 90%)",
  className = "",
}: AccentLineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const style: CSSProperties = {
    background: gradient,
    transformOrigin: "center",
    transform: visible ? "scaleX(1)" : "scaleX(0)",
    transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return (
    <div
      ref={ref}
      className={`absolute top-0 left-0 right-0 h-[2px] ${className}`}
      style={style}
    />
  );
};

export default AccentLine;
