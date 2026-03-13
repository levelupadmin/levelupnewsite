import { m } from "framer-motion";
import { Compass, Star, GraduationCap, Flame } from "lucide-react";

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

      {/* Storyboard cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {layers.map((layer, i) => (
          <m.div
            key={layer.title}
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            className="rounded-xl overflow-hidden bg-card shadow-cinematic group"
          >
            {/* Large image top half */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={layer.image}
                alt={`LevelUp Learning ${layer.title} program`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <layer.icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-sans-body text-[10px] uppercase tracking-widest text-white/80">
                  Step {layer.step}
                </span>
              </div>
            </div>
            {/* Text bottom half */}
            <div className="p-4 flex flex-col gap-1.5">
              <h3 className="font-serif-display text-base text-foreground">{layer.title}</h3>
              <p className="font-sans-body text-xs text-primary/70">{layer.subtitle}</p>
              <p className="font-sans-body text-sm text-muted-foreground leading-relaxed">
                {layer.description}
              </p>
            </div>
          </m.div>
        ))}
      </div>
    </div>
  </section>
);

export default EcosystemJourney;
