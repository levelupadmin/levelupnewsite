import { motion } from "framer-motion";
import { useParallax } from "@/hooks/use-parallax";
import SplitTextReveal from "@/components/SplitTextReveal";

const reasons = [
  {
    headline: "Mentors who've\nlived the craft",
    supporting:
      "Not theorists. Filmmakers, editors, and writers who built careers through decades of real work.",
    accentToken: "warm" as const,
  },
  {
    headline: "Practice that\nfeels real",
    supporting:
      "Residencies, sets, and deadlines — not simulations. Your work lives in the world, not a classroom.",
    accentToken: "cool" as const,
  },
  {
    headline: "A community\nthat stays",
    supporting:
      "Not a cohort you forget. A creative ecosystem that grows with you — years after you join.",
    accentToken: "neutral" as const,
  },
];

// Each card enters from a different direction for visual variety
const cardDirections = [
  { x: -40, y: 30, rotate: -1 },
  { x: 0, y: 50, rotate: 0 },
  { x: 40, y: 30, rotate: 1 },
];

const accentStyles = {
  warm: {
    bg: "bg-[hsl(30_20%_10%)]",
    line: "bg-primary",
    glow: "radial-gradient(ellipse at 30% 80%, hsl(38 75% 55% / 0.06) 0%, transparent 60%)",
  },
  cool: {
    bg: "bg-[hsl(220_18%_10%)]",
    line: "bg-[hsl(220_30%_45%)]",
    glow: "radial-gradient(ellipse at 70% 80%, hsl(220 40% 50% / 0.06) 0%, transparent 60%)",
  },
  neutral: {
    bg: "bg-[hsl(200_10%_10%)]",
    line: "bg-[hsl(40_15%_50%)]",
    glow: "radial-gradient(ellipse at 50% 80%, hsl(40 20% 50% / 0.05) 0%, transparent 60%)",
  },
};

const WhyLevelUp = () => {
  const { ref: sectionRef, y: parallaxY } = useParallax({ speed: -0.08 });

  return (
    <section ref={sectionRef} aria-label="Why choose LevelUp" className="relative bg-background py-12 md:py-16">
      {/* Section headline with split text reveal */}
      <div className="text-center px-6 md:px-12 mb-10 md:mb-12">
        <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-hero-headline leading-[1.2] tracking-tight">
          <SplitTextReveal triggerOnView startDelay={0.1} stagger={0.07}>
            Why serious creators choose LevelUp
          </SplitTextReveal>
        </h2>
      </div>

      {/* 3-column cards — each enters from a different direction */}
      <motion.div style={{ y: parallaxY }} className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
        {reasons.map((reason, index) => {
          const style = accentStyles[reason.accentToken];
          const direction = cardDirections[index];

          return (
            <motion.div
              key={reason.headline}
              initial={{
                opacity: 0,
                x: direction.x,
                y: direction.y,
                rotate: direction.rotate,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
              }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.9,
                delay: 0.2 + index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={`relative ${style.bg} rounded-sm overflow-hidden group`}
            >
              {/* Subtle glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: style.glow }}
              />

              {/* Abstract decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 opacity-[0.03] pointer-events-none">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <circle cx="160" cy="40" r="120" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
                  <circle cx="160" cy="40" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 md:p-10 lg:p-12 min-h-[320px] md:min-h-[380px] lg:min-h-[420px] flex flex-col justify-end">
                {/* Accent line — animates width */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 32 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
                  className={`h-[2px] ${style.line} mb-6 md:mb-8 opacity-60`}
                />

                <h3 className="font-serif-display text-xl md:text-2xl lg:text-[1.75rem] font-medium text-hero-headline leading-[1.25] tracking-tight whitespace-pre-line mb-4 md:mb-5">
                  {reason.headline}
                </h3>

                <p className="font-sans-body text-sm md:text-[0.9rem] text-hero-subtext leading-relaxed max-w-[280px]">
                  {reason.supporting}
                </p>
              </div>

              {/* Bottom edge line */}
              <div className={`h-[1px] ${style.line} opacity-20`} />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default WhyLevelUp;
