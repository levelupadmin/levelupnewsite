import { m } from "framer-motion";
import { Compass, Star, GraduationCap, Flame } from "lucide-react";
import ConcentricRings from "./ConcentricRings";

import liveProgram1 from "@/assets/live-program-1.jpg";
import masterclass2 from "@/assets/masterclass-2.jpg";
import liveProgram3 from "@/assets/live-program-3.jpg";
import forge1 from "@/assets/forge-1.jpg";

const layers = [
  {
    icon: Compass,
    step: "01",
    title: "Discover",
    subtitle: "2-hour Workshops",
    description: "Explore creative fields through hands-on workshops that help you find your path.",
    image: liveProgram1,
  },
  {
    icon: Star,
    step: "02",
    title: "Learn from the Best",
    subtitle: "Masterclasses",
    description: "India's top 0.01% creators share their craft through in-depth masterclasses.",
    image: masterclass2,
  },
  {
    icon: GraduationCap,
    step: "03",
    title: "Master the Craft",
    subtitle: "8–16 week Live Cohorts",
    description: "Intensive programs with portfolios, feedback, and placement support.",
    image: liveProgram3,
  },
  {
    icon: Flame,
    step: "04",
    title: "Experience",
    subtitle: "The Forge Residencies",
    description: "Invite-only immersive residencies across India and beyond.",
    image: forge1,
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
      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-5">
        {/* Horizontal gradient connector — desktop */}
        <div className="hidden md:block absolute top-[60px] left-[12.5%] right-[12.5%] h-1 rounded-full bg-gradient-to-r from-primary via-primary/50 to-transparent" />

        {/* Vertical dotted connector — mobile */}
        <div className="md:hidden absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px border-l-2 border-dashed border-primary/20" />

        {layers.map((layer, i) => (
          <m.div
            key={layer.title}
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            className="relative flex flex-col items-center text-center gap-3"
          >
            {/* Photo thumbnail */}
            <div className="relative z-10 w-[120px] h-[120px] rounded-xl overflow-hidden shadow-cinematic ring-4 ring-primary/20 mb-2">
              <img src={layer.image} alt={layer.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <layer.icon className="w-4 h-4 text-primary-foreground" />
              </div>
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
