import { m } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const topRow = [
  { target: 9000, suffix: "+", label: "Learners" },
  { target: 821, label: "Cities" },
  { target: 13, suffix: "+", label: "Countries" },
];

const bottomRow = [
  { target: 300000, suffix: "+", label: "Community", hasComma: true },
  { target: 3000, suffix: "+", label: "Collaborations", hasComma: true },
  { target: 4.86, suffix: "/5", label: "Avg Rating", decimals: 2 },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

const StatItem = ({ s, i }: { s: typeof topRow[0] & { hasComma?: boolean; decimals?: number }; i: number }) => (
  <m.div
    key={s.label}
    {...fadeUp}
    transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
    className="flex flex-col items-center text-center gap-1.5 px-4"
  >
    <span className="font-serif-display text-4xl md:text-5xl text-primary-foreground whitespace-nowrap">
      <AnimatedCounter target={s.target} suffix={s.suffix} hasComma={s.hasComma} decimals={s.decimals} />
    </span>
    <span className="font-sans-body text-xs text-primary-foreground/60">{s.label}</span>
  </m.div>
);

const ImpactNumbers = () => (
  <section className="py-14 md:py-20 px-6 md:px-12 bg-primary relative">
    <div className="relative max-w-5xl mx-auto">
      <m.p
        {...fadeUp}
        transition={{ duration: 0.5 }}
        className="font-sans-body text-xs md:text-sm uppercase tracking-[0.2em] text-primary-foreground/70 text-center mb-10"
      >
        Our Impact
      </m.p>

      {/* Top row: 3 stats */}
      <div className="flex justify-center gap-8 md:gap-16 mb-8 md:mb-10">
        {topRow.map((s, i) => (
          <StatItem key={s.label} s={s} i={i} />
        ))}
      </div>

      {/* Divider */}
      <div className="w-16 h-[1px] bg-primary-foreground/20 mx-auto mb-8 md:mb-10" />

      {/* Bottom row: 3 stats */}
      <div className="flex justify-center gap-8 md:gap-16">
        {bottomRow.map((s, i) => (
          <StatItem key={s.label} s={s} i={i + 3} />
        ))}
      </div>
    </div>
  </section>
);

export default ImpactNumbers;
