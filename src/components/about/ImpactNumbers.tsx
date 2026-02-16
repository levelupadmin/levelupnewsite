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
  <section className="py-14 md:py-20 px-6 md:px-12 bg-primary relative">
    <div className="relative max-w-7xl mx-auto">
      <m.p
        {...fadeUp}
        transition={{ duration: 0.5 }}
        className="font-sans-body text-xs md:text-sm uppercase tracking-[0.2em] text-primary-foreground/70 text-center mb-10"
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
            <span className="font-serif-display text-4xl md:text-5xl text-primary-foreground">
              <AnimatedCounter target={s.target} suffix={s.suffix} hasComma={s.hasComma} decimals={s.decimals} />
            </span>
            <span className="font-sans-body text-xs text-primary-foreground/60">{s.label}</span>
          </m.div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactNumbers;
