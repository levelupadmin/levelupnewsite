import { useState, useCallback, useRef } from "react";
import { Handshake } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import FadeInSection from "@/components/FadeInSection";
import ImpactScene from "./ImpactScene";
import CollabNetwork from "./CollabNetwork";

const COLLAB_TAGS = [
  { label: "Film × Music", top: "10%", left: "6%", delay: 0 },
  { label: "Design × Code", top: "16%", right: "8%", delay: 0.15 },
  { label: "Writing × Direction", bottom: "22%", left: "4%", delay: 0.3 },
  { label: "VFX × Cinematography", bottom: "14%", right: "6%", delay: 0.45 },
  { label: "Acting × Editing", top: "48%", left: "2%", delay: 0.6 },
];

const TICKER_ITEMS = [
  { names: "Priya × Arjun", project: "Documentary Edit", time: "2h ago" },
  { names: "Sneha × Vikram", project: "Music Video", time: "5h ago" },
  { names: "Rahul × Meera", project: "Short Film", time: "1d ago" },
  { names: "Ananya × Dev", project: "Podcast Series", time: "2d ago" },
  { names: "Karthik × Lakshmi", project: "Ad Film", time: "3d ago" },
  { names: "Ravi × Sanya", project: "Web Series", time: "4d ago" },
  { names: "Nisha × Aditya", project: "Animation", time: "5d ago" },
  { names: "Deepak × Pooja", project: "Photo Essay", time: "6d ago" },
];

const CollaborationsScene = () => {
  const [hovered, setHovered] = useState(false);
  const [counterProgress, setCounterProgress] = useState(0);
  const [counterDone, setCounterDone] = useState(false);
  const [showTags, setShowTags] = useState(false);

  const handleCounterFrame = useCallback((value: number) => {
    setCounterProgress(Math.min(value / 3000, 1));
  }, []);

  const handleCounterComplete = useCallback(() => {
    setCounterDone(true);
    setTimeout(() => setShowTags(true), 300);
  }, []);

  return (
    <ImpactScene>
      <FadeInSection>
        <div
          className="relative flex flex-col items-center justify-center min-h-[340px] md:min-h-[480px] px-6 py-14 md:py-20 overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Thread weave background */}
          <CollabNetwork progress={counterProgress} isVisible />

          {/* Refined glassmorphic tags */}
          <AnimatePresence>
            {showTags &&
              COLLAB_TAGS.map((tag) => (
                <m.div
                  key={tag.label}
                  initial={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ delay: tag.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full
                    text-[10px] font-medium tracking-wide
                    bg-card/40 backdrop-blur-xl border border-primary/10
                    text-muted-foreground/80 shadow-[0_2px_12px_-4px_hsl(24_95%_53%/0.15)]
                    animate-collab-float pointer-events-none"
                  style={{
                    top: tag.top,
                    left: tag.left,
                    right: tag.right,
                    bottom: tag.bottom,
                    animationDelay: `${tag.delay}s`,
                  }}
                >
                  <span className="w-1 h-1 rounded-full bg-primary/60" />
                  {tag.label}
                </m.div>
              ))}
          </AnimatePresence>

          {/* Handshake icon */}
          <m.div
            key={hovered ? "hover" : "idle"}
            initial={{ rotate: 0 }}
            animate={
              hovered
                ? {
                    rotate: [0, -12, 10, -8, 6, -3, 0],
                    transition: { duration: 0.8, ease: [0.36, 0.07, 0.19, 0.97] },
                  }
                : undefined
            }
            className="relative z-10 mb-4"
          >
            <Handshake className="w-10 h-10 md:w-14 md:h-14 text-primary drop-shadow-[0_0_12px_hsl(24_95%_53%/0.3)]" />
          </m.div>

          {/* Counter */}
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

          {/* Glass card ticker */}
          {counterDone && (
            <m.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mt-10 w-full max-w-2xl overflow-hidden
                [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
            >
              <div className="flex gap-3 animate-collab-ticker group hover:[animation-play-state:paused]">
                {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                  <GlassTickerCard key={i} {...item} />
                ))}
              </div>
            </m.div>
          )}
        </div>
      </FadeInSection>
    </ImpactScene>
  );
};

/* ── Glass Ticker Card ── */
const GlassTickerCard = ({
  names,
  project,
  time,
}: {
  names: string;
  project: string;
  time: string;
}) => (
  <div
    className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-xl
      bg-card/30 backdrop-blur-xl border border-border/30
      shadow-[0_1px_8px_-2px_hsl(24_95%_53%/0.08)]
      hover:border-primary/20 transition-colors duration-300"
  >
    <span className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-pulse" />
    <span className="text-[11px] font-medium text-foreground/80 whitespace-nowrap">
      {names}
    </span>
    <span className="text-[10px] text-muted-foreground/60 whitespace-nowrap">
      · {project}
    </span>
    <span className="text-[9px] text-muted-foreground/40 whitespace-nowrap">{time}</span>
  </div>
);

/* ── Counter with progress reporting ── */
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
