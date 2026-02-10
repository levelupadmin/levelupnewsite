import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const BrandIcon = ({ name }: { name: string }) => {
  const icons: Record<string, JSX.Element> = {
    FTII: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="2"/><path d="M10 10h8M10 14h5M10 18h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
    ),
    NID: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="4" y="4" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M10 18V10l8 8V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    "Whistling Woods": (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 3l3 7h7l-5.5 4.5 2 7L14 17l-6.5 4.5 2-7L4 10h7l3-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
    ),
    YRF: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M4 6l10 8L4 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 14h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    "Excel Entertainment": (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><polygon points="14,2 26,9 26,19 14,26 2,19 2,9" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M10 10l8 8M18 10l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
    ),
    TVF: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="3" y="6" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M11 12l6 3-6 3V12z" fill="currentColor"/></svg>
    ),
    Google: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2"/><path d="M14 8a6 6 0 014.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M14 14h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
    ),
    "Amazon Prime": (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M4 18c4 4 16 4 20 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M20 16l4 2-4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 6h12v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    Viacom18: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M4 8l10 14L24 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    Dharma: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 2v24M2 14h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="14" cy="14" r="6" stroke="currentColor" strokeWidth="1.5"/><circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.5"/></svg>
    ),
    "Red Chillies": (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 4c-4 0-8 4-8 10s4 10 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M14 4c4 0 8 4 8 10s-4 10-8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M14 4v20" stroke="currentColor" strokeWidth="1.5"/></svg>
    ),
    Adobe: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M4 24L14 4l10 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 17h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
    ),
  };
  return icons[name] || <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2"/></svg>;
};

const brands = [
  "FTII",
  "NID",
  "Whistling Woods",
  "YRF",
  "Excel Entertainment",
  "TVF",
  "Google",
  "Amazon Prime",
  "Viacom18",
  "Dharma",
  "Red Chillies",
  "Adobe",
];

const stats = [
  {
    value: 57600,
    suffix: "+",
    hasComma: true,
    label: "learners have enrolled across masterclasses, live programs, and residencies",
  },
  {
    value: 11,
    suffix: "",
    hasComma: false,
    label: "editions of The Forge across 7 cities",
  },
];

function formatNumber(num: number, hasComma?: boolean): string {
  if (hasComma) return Math.floor(num).toLocaleString();
  return Math.floor(num).toString();
}

const AnimatedCounter = ({
  target,
  suffix = "",
  hasComma = false,
  isInView,
}: {
  target: number;
  suffix: string;
  hasComma?: boolean;
  isInView: boolean;
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span>
      {formatNumber(value, hasComma)}
      {suffix}
    </span>
  );
};

const ease = [0.25, 0.1, 0.25, 1] as const;

const StudentLogosSection = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true, margin: "-50px" });

  return (
    <section
      aria-label="LevelUp credibility and community"
      className="relative"
    >
      <div className="section-light py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Top separator */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="h-px bg-border mx-auto mb-10 md:mb-12"
        />

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease }}
          className="font-serif-display text-2xl md:text-3xl lg:text-[2.5rem] lg:leading-[1.25] text-center text-foreground max-w-2xl mx-auto mb-12 md:mb-16"
        >
          The creative industry is competitive.{" "}
          <strong className="text-gradient-amber">
            Your growth doesn't have to wait.
          </strong>
        </motion.h2>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-10 md:mb-14 max-w-xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease }}
              className="text-center"
            >
              <p className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-medium text-cue-value tracking-tight tabular-nums">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  hasComma={stat.hasComma}
                  isInView={isInView}
                />
              </p>
              <p className="font-sans-body text-xs md:text-sm text-muted-foreground mt-3 leading-relaxed max-w-[220px] mx-auto">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          className="text-center mb-12 md:mb-16"
        >
          <a
            href="#testimonials"
            className="cta-underline font-sans-body text-sm text-primary inline-flex items-center gap-1.5 transition-colors hover:text-primary/80"
            aria-label="See what our alumni are building"
          >
            See what our alumni are building
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

      </div>
      </div>

      <div className="bg-background py-10 md:py-14">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="font-serif-display text-2xl md:text-3xl text-foreground text-center mb-10 md:mb-12"
        >
          Our students come from:
        </motion.p>

        <div className="space-y-6 md:space-y-8">
          {[brands.slice(0, 6), brands.slice(6)].map((row, rowIdx) => (
            <div key={rowIdx} className="overflow-hidden">
              <div
                className={`flex whitespace-nowrap items-center gap-8 md:gap-12 w-max ${
                  rowIdx === 0 ? "animate-scroll-left" : "animate-scroll-right"
                } pause-on-hover`}
              >
                {[...row, ...row, ...row, ...row].map((brand, i) => (
                  <span
                    key={`${brand}-${i}`}
                    className="inline-flex items-center gap-2.5 font-sans-body text-lg md:text-xl lg:text-2xl font-extrabold text-foreground/90 select-none transition-colors duration-300 hover:text-foreground"
                  >
                    <BrandIcon name={brand} />
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentLogosSection;
