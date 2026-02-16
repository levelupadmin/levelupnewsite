import { m } from "framer-motion";

const AboutHero = () => (
  <section className="relative py-24 md:py-36 px-6 md:px-12 overflow-hidden bg-background">
    {/* Radial amber glow */}
    <div className="absolute inset-0 bg-gradient-amber-glow pointer-events-none" />

    <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
      <m.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-sans-body text-xs md:text-sm uppercase tracking-[0.2em] text-primary"
      >
        About LevelUp
      </m.p>

      <m.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-serif-display text-3xl md:text-5xl lg:text-6xl text-hero-headline leading-tight"
      >
        Building India's Creative{" "}
        <em className="text-gradient-amber not-italic">Career Infrastructure</em>
      </m.h1>

      <m.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="font-sans-body text-hero-subtext text-base md:text-lg max-w-2xl leading-relaxed"
      >
        India's next workforce isn't coding — it's creating.
      </m.p>

      <m.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="font-sans-body text-muted-foreground text-sm md:text-base max-w-xl leading-relaxed"
      >
        Filmmakers, Musicians, Designers and Creators are building a new kind of career — driven by ideas, not job titles.
      </m.p>
    </div>
  </section>
);

export default AboutHero;
