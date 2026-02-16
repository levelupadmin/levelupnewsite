import { m } from "framer-motion";

const stats = [
  { value: "$30B", label: "India's creative industry today", note: "Set to be $50B by 2030", source: "BCG" },
  { value: "180%", label: "Growth in creative job postings", note: "In the last 3 years", source: "LinkedIn" },
  { value: "67%", label: "Creative positions remain unfilled", note: "Demand far outpaces supply", source: "AIICE" },
  { value: "10M", label: "Creative professionals by 2030", note: "15–18% of India's IT workforce", source: "Industry Reports" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

const OpportunityStats = () => (
  <section className="py-12 md:py-16 px-6 md:px-12 bg-background relative">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-border to-transparent" />
    <div className="absolute inset-0 bg-gradient-amber-glow pointer-events-none" />

    <div className="relative max-w-7xl mx-auto">
      <m.p
        {...fadeUp}
        transition={{ duration: 0.5 }}
        className="font-sans-body text-xs md:text-sm uppercase tracking-[0.2em] text-primary text-center mb-3"
      >
        The Opportunity
      </m.p>
      <m.h2
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-serif-display text-2xl md:text-3xl text-hero-headline text-center mb-10"
      >
        Creativity is India's next big workforce shift
      </m.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s, i) => {
          const isHighlight = i === 0 || i === 2;
          return (
            <m.div
              key={s.label}
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className={`rounded-xl p-5 flex flex-col gap-2 shadow-cinematic ${
                isHighlight
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border"
              }`}
            >
              <span className={`font-serif-display text-2xl md:text-3xl ${isHighlight ? "" : "text-gradient-amber"}`}>{s.value}</span>
              <p className={`font-sans-body text-sm leading-snug ${isHighlight ? "text-primary-foreground/90" : "text-foreground"}`}>{s.label}</p>
              <p className={`font-sans-body text-xs ${isHighlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{s.note}</p>
              <p className={`font-sans-body text-[10px] mt-auto ${isHighlight ? "text-primary-foreground/50" : "text-muted-foreground/50"}`}>Source: {s.source}</p>
            </m.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default OpportunityStats;
