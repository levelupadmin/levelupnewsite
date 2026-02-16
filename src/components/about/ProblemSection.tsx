import { m } from "framer-motion";
import { BookX, ShieldX, Users } from "lucide-react";

const problems = [
  {
    icon: BookX,
    title: "No Structured Learning",
    description: "YouTube has 10,000 tutorials. Zero clear pathways.",
  },
  {
    icon: ShieldX,
    title: "No Verified Skills",
    description: "They learn scattered skills but can't prove their capability.",
  },
  {
    icon: Users,
    title: "No Access to Network",
    description: "Talent gets lost without a network. Opportunities go to known faces only.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

const ProblemSection = () => (
  <section className="py-12 md:py-16 px-6 md:px-12 bg-background relative">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-border to-transparent" />

    <div className="max-w-7xl mx-auto">
      <m.p
        {...fadeUp}
        transition={{ duration: 0.5 }}
        className="font-sans-body text-xs md:text-sm uppercase tracking-[0.2em] text-primary text-center mb-3"
      >
        The Problem
      </m.p>
      <m.h2
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-serif-display text-2xl md:text-3xl text-hero-headline text-center mb-10"
      >
        A broken system for creative careers
      </m.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {problems.map((p, i) => (
          <m.div
            key={p.title}
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            className="rounded-xl bg-card p-6 md:p-8 flex flex-col gap-4 shadow-cinematic"
          >
            <p.icon className="w-6 h-6 text-primary" />
            <h3 className="font-serif-display text-lg text-foreground">{p.title}</h3>
            <p className="font-sans-body text-sm text-muted-foreground leading-relaxed">
              {p.description}
            </p>
          </m.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
