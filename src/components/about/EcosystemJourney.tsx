import { m } from "framer-motion";
import { Compass, Star, GraduationCap, Flame } from "lucide-react";
import ConcentricRings from "./ConcentricRings";

const layers = [
  {
    icon: Compass,
    step: "01",
    title: "Discover",
    subtitle: "2-hour Workshops",
    description: "Explore creative fields through hands-on workshops that help you find your path.",
  },
  {
    icon: Star,
    step: "02",
    title: "Learn from the Best",
    subtitle: "Masterclasses",
    description: "India's top 0.01% creators share their craft through in-depth masterclasses.",
  },
  {
    icon: GraduationCap,
    step: "03",
    title: "Master the Craft",
    subtitle: "8–16 week Live Cohorts",
    description: "Intensive programs with portfolios, feedback, and placement support.",
  },
  {
    icon: Flame,
    step: "04",
    title: "Experience",
    subtitle: "The Forge Residencies",
    description: "Invite-only immersive residencies across India and beyond.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

const EcosystemJourney = () => (
  <section className="py-12 md:py-16 px-6 md:px-12 bg-background relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-border to-transparent" />
    <ConcentricRings className="-bottom-16 -left-20 opacity-60" size={450} count={6} />

    <div className="relative max-w-7xl mx-auto">
      <m.p
        {...fadeUp}
        transition={{ duration: 0.5 }}
        className="font-sans-body text-xs md:text-sm uppercase tracking-[0.2em] text-primary text-center mb-3"
      >
        Our Answer
      </m.p>
      <m.h2
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-serif-display text-2xl md:text-3xl text-hero-headline text-center mb-4"
      >
        The only end-to-end infrastructure for creative careers
      </m.h2>
      <m.p
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="font-sans-body text-sm text-muted-foreground text-center mb-12 max-w-xl mx-auto"
      >
        Four layers that take you from curiosity to career.
      </m.p>

      {/* Timeline */}
      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
        {/* Horizontal gradient connector — desktop */}
        <div className="hidden md:block absolute top-[28px] left-[12.5%] right-[12.5%] h-1 rounded-full bg-gradient-to-r from-primary via-primary/50 to-transparent" />

        {/* Vertical dotted connector — mobile */}
        <div className="md:hidden absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px border-l-2 border-dashed border-primary/20" />

        {layers.map((layer, i) => (
          <m.div
            key={layer.title}
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            className="relative flex flex-col items-center text-center gap-3"
          >
            {/* Step circle with outer glow ring */}
            <div className="relative z-10 w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-2 ring-4 ring-primary/20">
              <layer.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-sans-body text-[10px] uppercase tracking-widest text-primary">
              {layer.step}
            </span>
            <h3 className="font-serif-display text-base md:text-lg text-foreground">{layer.title}</h3>
            <p className="font-sans-body text-xs text-primary/70">{layer.subtitle}</p>
            <p className="font-sans-body text-sm text-muted-foreground leading-relaxed max-w-[240px]">
              {layer.description}
            </p>
          </m.div>
        ))}
      </div>
    </div>
  </section>
);

export default EcosystemJourney;
