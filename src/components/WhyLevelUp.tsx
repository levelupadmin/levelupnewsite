import { motion } from "framer-motion";

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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.3 + i * 0.15, ease: "easeOut" as const },
  }),
};

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
  return (
    <section className="relative bg-background py-16 md:py-20 lg:py-24">
      {/* Section headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="text-center px-6 md:px-12 mb-16 md:mb-24"
      >
        <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-hero-headline leading-[1.2] tracking-tight">
          Why serious creators choose{" "}
          <em className="italic font-normal text-primary">LevelUp</em>
        </h2>
      </motion.div>

      {/* 3-column cards */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
        {reasons.map((reason, index) => {
          const style = accentStyles[reason.accentToken];

          return (
            <motion.div
              key={reason.headline}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
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
                  <circle
                    cx="160"
                    cy="40"
                    r="120"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-foreground"
                  />
                  <circle
                    cx="160"
                    cy="40"
                    r="80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-foreground"
                  />
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 md:p-10 lg:p-12 min-h-[320px] md:min-h-[380px] lg:min-h-[420px] flex flex-col justify-end">
                {/* Accent line */}
                <div className={`w-8 h-[2px] ${style.line} mb-6 md:mb-8 opacity-60`} />

                <h3 className="font-serif-display text-xl md:text-2xl lg:text-[1.75rem] font-medium text-hero-headline leading-[1.25] tracking-tight whitespace-pre-line mb-4 md:mb-5">
                  {reason.headline}
                </h3>

                <p className="font-sans-body text-sm md:text-[0.9rem] text-hero-subtext leading-relaxed max-w-[280px]">
                  {reason.supporting}
                </p>
              </div>

              {/* Bottom edge line — subtle visual weight */}
              <div className={`h-[1px] ${style.line} opacity-20`} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyLevelUp;
