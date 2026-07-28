import { useState, useRef, useCallback } from "react";
import { Star } from "lucide-react";
import { m } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import FadeInSection from "@/components/FadeInSection";
import ImpactScene from "./ImpactScene";

const reviewsCol1 = [
  "\"Completely changed how I approach filmmaking.\"",
  "\"The mentors here are world-class. 10/10.\"",
  "\"Best investment I've made in my creative career.\"",
  "\"I learned more in 8 weeks than 4 years of college.\"",
  "\"Finally found a place that takes craft seriously.\"",
  "\"The feedback alone is worth 10x the price.\"",
  "\"Went from hobbyist to working professional in months.\"",
  "\"Every session felt like sitting with a master.\"",
];

const reviewsCol2 = [
  "\"My portfolio went from zero to getting me hired.\"",
  "\"This community is unlike anything else out there.\"",
  "\"Real projects, real deadlines, real growth.\"",
  "\"I cried after my first mentor review, in a good way.\"",
  "\"Hands down the most practical creative education.\"",
  "\"The network I built here changed my trajectory.\"",
  "\"No fluff, no filler. Just craft and honest feedback.\"",
  "\"I recommend LevelUp to every creative I know.\"",
];

const RatingScene = () => {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number; rx: number; ry: number } | null>(null);
  const [mouse, setMouse] = useState<{ rx: number; ry: number } | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = x / rect.width;
    const ry = y / rect.height;
    mouseRef.current = { x, y, rx, ry };
    setMouse({ rx, ry });
  }, []);

  const onMouseLeave = useCallback(() => {
    mouseRef.current = null;
    setMouse(null);
    setHovered(false);
  }, []);

  // Star proximity — each star gets a scale boost based on cursor distance
  const getStarScale = (index: number) => {
    if (!mouse) return 1;
    // Stars are centered, spread across ~5 positions
    const starRx = 0.35 + index * 0.075;
    const starRy = 0.35;
    const dx = mouse.rx - starRx;
    const dy = mouse.ry - starRy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const proximity = Math.max(0, 1 - dist / 0.25);
    return 1 + proximity * 0.3;
  };

  return (
    <ImpactScene showDivider={false}>
      <FadeInSection>
        <div
          ref={containerRef}
          className="relative flex flex-col items-center justify-center min-h-[280px] md:min-h-[360px] px-6 py-16 md:py-20"
          onMouseEnter={() => setHovered(true)}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          {/* Background review scroll — parallax shift on cursor */}
          <div
            className="absolute inset-0 flex gap-8 md:gap-16 items-center justify-center overflow-hidden pointer-events-none opacity-[0.07]"
            style={{
              transform: mouse
                ? `translate(${(mouse.rx - 0.5) * -12}px, ${(mouse.ry - 0.5) * -8}px)`
                : undefined,
              transition: "transform 0.3s ease-out",
            }}
          >
            <div className="animate-impact-review-scroll space-y-6 text-center">
              {[...reviewsCol1, ...reviewsCol1].map((r, i) => (
                <p key={i} className="text-xs md:text-2xl font-sans-body text-foreground whitespace-nowrap">{r}</p>
              ))}
            </div>
            <div className="animate-impact-review-scroll-reverse space-y-6 text-center">
              {[...reviewsCol2, ...reviewsCol2].map((r, i) => (
                <p key={i} className="text-xs md:text-2xl font-sans-body text-foreground whitespace-nowrap">{r}</p>
              ))}
            </div>
          </div>

          {/* Cursor-tracking radial glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              opacity: mouse ? 1 : 0.6,
              background: mouse
                ? `radial-gradient(circle at ${mouse.rx * 100}% ${mouse.ry * 100}%, hsl(30 90% 50% / 0.14), transparent 50%)`
                : "radial-gradient(circle at 50% 60%, hsl(30 90% 50% / 0.1), transparent 50%)",
            }}
          />

          {/* Stars with proximity scaling */}
          <div className="flex items-center gap-2 mb-6 relative z-10">
            {[1, 2, 3, 4, 5].map((i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  delay: 0.2 + i * 0.15,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 260,
                  damping: 15,
                }}
                style={{
                  transform: `scale(${getStarScale(i - 1)})`,
                  transition: "transform 0.2s ease-out",
                }}
              >
                <Star
                  className="w-6 h-6 md:w-8 md:h-8"
                  style={{
                    fill: "hsl(var(--primary))",
                    color: "hsl(var(--primary))",
                    filter: mouse
                      ? `drop-shadow(0 0 ${10 + getStarScale(i - 1) * 4}px hsl(30 90% 55% / ${0.4 + getStarScale(i - 1) * 0.15}))`
                      : "drop-shadow(0 0 8px hsl(30 90% 55% / 0.5))",
                  }}
                />
              </m.div>
            ))}
          </div>

          {/* Giant counter */}
          <p className="relative z-10 text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-semibold text-foreground tracking-tight">
            <AnimatedCounter target={4.86} suffix="/5" decimals={2} celebrate />
          </p>
          <p className="relative z-10 text-sm md:text-base text-muted-foreground mt-3 tracking-wide">
            average rating across 9,000+ learners
          </p>
        </div>
      </FadeInSection>
    </ImpactScene>
  );
};

export default RatingScene;
