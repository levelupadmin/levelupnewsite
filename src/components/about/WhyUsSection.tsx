import { m } from "framer-motion";
import { Sparkles, Users, Award } from "lucide-react";

const pillars = [
  {
    icon: Sparkles,
    title: "Mentor IP",
    description: "Exclusive masterclasses with India's top filmmakers, editors, photographers, and musicians — content you can't find anywhere else.",
  },
  {
    icon: Users,
    title: "Community Flywheel",
    description: "300K+ creators fueling organic acquisition, peer learning, and real-world opportunity — a self-reinforcing ecosystem.",
  },
  {
    icon: Award,
    title: "Brand & Certification Partners",
    description: "Partnered with India's leading entertainment houses, production studios, and institutions for credibility and placement.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

const WhyUsSection = () => (
  <section className="py-12 md:py-16 px-6 md:px-12 bg-[hsl(24,40%,96%)] relative">
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

    <div className="max-w-7xl mx-auto">
      <m.p
        {...fadeUp}
        transition={{ duration: 0.5 }}
        className="font-sans-body text-xs md:text-sm uppercase tracking-[0.2em] text-primary text-center mb-3"
      >
        Why LevelUp
      </m.p>
      <m.h2
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-serif-display text-2xl md:text-3xl text-hero-headline text-center mb-10"
      >
        Why should we be the ones building this?
      </m.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {pillars.map((p, i) => (
          <m.div
            key={p.title}
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            className="rounded-xl bg-card p-6 md:p-8 flex flex-col gap-4 shadow-cinematic"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <p.icon className="w-6 h-6 text-primary" />
            </div>
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

export default WhyUsSection;
