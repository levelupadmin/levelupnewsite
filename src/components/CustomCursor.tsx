import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorVariant = "default" | "view" | "play" | "arrow" | "explore";

const CURSOR_SIZE = {
  default: 10,
  view: 72,
  play: 72,
  arrow: 56,
  explore: 80,
};

const CURSOR_LABELS: Record<CursorVariant, string> = {
  default: "",
  view: "View",
  play: "Play",
  arrow: "→",
  explore: "Explore",
};

const CustomCursor = () => {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const rafRef = useRef<number>();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const size = CURSOR_SIZE[variant];
  const label = CURSOR_LABELS[variant];

  // Detect touch device
  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
  }, []);

  // Track mouse position
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      });
      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible]
  );

  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);

  // Detect interactive elements via data attributes
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const interactive = target.closest("[data-cursor]") as HTMLElement | null;
    if (interactive) {
      setVariant(interactive.dataset.cursor as CursorVariant);
    } else {
      setVariant("default");
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouchDevice, handleMouseMove, handleMouseOver, handleMouseLeave, handleMouseEnter]);

  if (isTouchDevice) return null;

  const isExpanded = variant !== "default";

  return (
    <>
      {/* Global style to hide default cursor on non-touch */}
      <style>{`
        @media (pointer: fine) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Dot / expanded circle */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: size,
          height: size,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { type: "spring", damping: 20, stiffness: 300 },
          height: { type: "spring", damping: 20, stiffness: 300 },
          opacity: { duration: 0.15 },
        }}
      >
        {/* Circle background */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            backgroundColor: isExpanded
              ? "rgba(255, 255, 255, 0.9)"
              : "rgba(255, 255, 255, 1)",
            scale: isExpanded ? 1 : 1,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Label */}
        <motion.span
          className="relative z-10 font-sans-body text-black select-none"
          animate={{
            opacity: isExpanded ? 1 : 0,
            scale: isExpanded ? 1 : 0.5,
          }}
          transition={{ duration: 0.2, delay: isExpanded ? 0.05 : 0 }}
          style={{
            fontSize: variant === "arrow" ? "20px" : "11px",
            fontWeight: variant === "arrow" ? 300 : 500,
            letterSpacing: variant === "arrow" ? "0" : "0.06em",
            textTransform: variant === "arrow" ? "none" : "uppercase" as any,
          }}
        >
          {label}
        </motion.span>
      </motion.div>

      {/* Outer ring (default state only) */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-white/20"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isExpanded ? size + 8 : 32,
          height: isExpanded ? size + 8 : 32,
          opacity: isVisible ? (isExpanded ? 0 : 0.4) : 0,
          borderColor: isExpanded
            ? "rgba(255,255,255,0)"
            : "rgba(255,255,255,0.15)",
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 200,
          opacity: { duration: 0.2 },
        }}
      />
    </>
  );
};

export default CustomCursor;
