import { useState, useCallback, useRef } from "react";
import { Handshake } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import FadeInSection from "@/components/FadeInSection";
import ImpactScene from "./ImpactScene";
import NetworkGraph from "./NetworkGraph";

const COLLAB_TAGS = [
  { label: "Film × Music", top: "8%", left: "5%", delay: 0 },
  { label: "Design × Code", top: "18%", right: "8%", delay: 0.3 },
  { label: "Writing × Direction", bottom: "22%", left: "3%", delay: 0.6 },
  { label: "VFX × Cinematography", bottom: "12%", right: "5%", delay: 0.9 },
  { label: "Acting × Editing", top: "45%", left: "1%", delay: 1.2 },
];

const TICKER_ITEMS = [
  "Priya × Arjun — Documentary Edit • 2h ago",
  "Sneha × Vikram — Music Video • 5h ago",
  "Rahul × Meera — Short Film • 1d ago",
  "Ananya × Dev — Podcast Series • 2d ago",
  "Karthik × Lakshmi — Ad Film • 3d ago",
  "Ravi × Sanya — Web Series • 4d ago",
  "Nisha × Aditya — Animation • 5d ago",
  "Deepak × Pooja — Photo Essay • 6d ago",
];

const CollaborationsScene = () => {
  const [hovered, setHovered] = useState(false);
  const [counterProgress, setCounterProgress] = useState(0);
  const [counterDone, setCounterDone] = useState(false);
  const [showRings, setShowRings] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const counterStarted = useRef(false);

  // Track counter rolling progress (0→1)
  const handleCounterFrame = useCallback((value: number) => {
    setCounterProgress(Math.min(value / 3000, 1));
  }, []);

  const handleCounterComplete = useCallback(() => {
    setCounterDone(true);
    setShowRings(true);
    setTimeout(() => setShowTags(true), 400);
    setTimeout(() => setShowRings(false), 2500);
  }, []);

  return (
    <ImpactScene>
      <FadeInSection>
        <div
          className="relative flex flex-col items-center justify-center min-h-[340px] md:min-h-[480px] px-6 py-14 md:py-20 overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Network graph background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full max-w-2xl pointer-events-auto">
              <NetworkGraph
                isVisible
                counterProgress={counterProgress}
              />
            </div>
          </div>

          {/* Floating collaboration type tags */}
          <AnimatePresence>
            {showTags && COLLAB_TAGS.map((tag, i) => (
              <m.div
                key={tag.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: tag.delay, duration: 0.5 }}
                className="absolute hidden md:block px-3 py-1.5 rounded-full text-[10px] font-medium tracking-wide
                  bg-card/60 backdrop-blur-md border border-border/40 text-muted-foreground
                  animate-collab-float pointer-events-none"
                style={{
                  top: tag.top,
                  left: tag.left,
                  right: tag.right,
                  bottom: tag.bottom,
                  animationDelay: `${tag.delay}s`,
                }}
              >
                {tag.label}
              </m.div>
            ))}
          </AnimatePresence>

          {/* Expanding sonar rings on counter complete */}
          {showRings && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[0, 1, 2].map((ring) => (
                <div
                  key={ring}
                  className="absolute rounded-full border border-primary/40 animate-collab-sonar"
                  style={{
                    width: 60,
                    height: 60,
                    animationDelay: `${ring * 0.35}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Handshake icon */}
          <m.div
            key={hovered ? "hover" : "idle"}
            initial={{ rotate: 0 }}
            animate={
              hovered
                ? { rotate: [0, -12, 10, -8, 6, -3, 0], transition: { duration: 0.8, ease: [0.36, 0.07, 0.19, 0.97] } }
                : undefined
            }
            className="relative z-10 mb-4"
          >
            <Handshake className="w-10 h-10 md:w-14 md:h-14 text-primary" />
          </m.div>

          <div className="relative z-10 text-center">
            <p className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold text-foreground tracking-tight">
              <AnimatedCounterWithProgress
                target={3000}
                suffix="+"
                hasComma
                celebrate
                onProgress={handleCounterFrame}
                onComplete={handleCounterComplete}
              />
            </p>
            <p className="text-sm md:text-base text-muted-foreground mt-3 tracking-wide">
              collaborations enabled
            </p>
          </div>

          {/* Live activity ticker */}
          {counterDone && (
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative z-10 mt-8 w-full max-w-xl overflow-hidden group"
            >
              <div className="flex animate-collab-ticker group-hover:[animation-play-state:paused]">
                {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                  <span
                    key={i}
                    className="flex-shrink-0 px-4 py-1.5 text-[11px] text-muted-foreground/70 whitespace-nowrap"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </m.div>
          )}
        </div>
      </FadeInSection>
    </ImpactScene>
  );
};

/**
 * Wrapper around AnimatedCounter that also reports frame-by-frame progress.
 */
const AnimatedCounterWithProgress = ({
  target,
  suffix,
  hasComma,
  celebrate,
  onProgress,
  onComplete,
}: {
  target: number;
  suffix?: string;
  hasComma?: boolean;
  celebrate?: boolean;
  onProgress: (value: number) => void;
  onComplete: () => void;
}) => {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);
  const hasAnimated = useRef(false);
  const elRef = useRef<HTMLSpanElement>(null);

  // Inline counter logic so we can tap into each frame
  const runAnimation = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setValue(current);
      onProgress(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDone(true);
        onComplete();
      }
    };

    requestAnimationFrame(animate);
  }, [target, onProgress, onComplete]);

  // Intersection observer
  useState(() => {
    // Effect-like via lazy init won't work – use useEffect below
  });

  // Use a ref callback approach to observe
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setRef = useCallback(
    (node: HTMLSpanElement | null) => {
      (elRef as any).current = node;
      if (!node) return;
      if (hasAnimated.current) return;

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            runAnimation();
            observerRef.current?.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      observerRef.current.observe(node);

      // Fallback
      setTimeout(() => {
        if (!hasAnimated.current) runAnimation();
      }, 2500);
    },
    [runAnimation]
  );

  const formatNumber = (num: number) => {
    if (hasComma) return Math.floor(num).toLocaleString();
    return Math.floor(num).toString();
  };

  return (
    <span ref={setRef} className={done && celebrate ? "counter-celebrate inline-block" : undefined}>
      {formatNumber(value)}
      {suffix}
    </span>
  );
};

export default CollaborationsScene;
