import { m } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const stats = [
  { target: 9000, suffix: "+", label: "Learners" },
  { target: 821, label: "Cities" },
  { target: 13, suffix: "+", label: "Countries" },
  { target: 300000, suffix: "+", label: "Community", hasComma: true },
  { target: 3000, suffix: "+", label: "Collaborations", hasComma: true },
  { target: 4.86, suffix: "/5", label: "Avg Rating", decimals: 2 },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

const ImpactNumbers = () => (
  <section className="py-12 md:py-16 px-6 md:px-12 bg-background relative">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-border to-transparent" />
    <div className="absolute inset-0 bg-gradient-amber-glow pointer-events-none" />

    <div className="relative max-w-7xl mx-auto">
      <m.p
        {...fadeUp}
        transition={{ duration: 0.5 }}
        className="font-sans-body text-xs md:text-sm uppercase tracking-[0.2em] text-primary text-center mb-10"
      >
        Our Impact
      </m.p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4">
        {stats.map((s, i) => (
          <m.div
            key={s.label}
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
            className="flex flex-col items-center text-center gap-1"
          >
            <span className="font-serif-display text-2xl md:text-3xl text-gradient-amber">
              <AnimatedCounter target={s.target} suffix={s.suffix} hasComma={s.hasComma} decimals={s.decimals} />
            </span>
            <span className="font-sans-body text-xs text-muted-foreground">{s.label}</span>
          </m.div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactNumbers;
