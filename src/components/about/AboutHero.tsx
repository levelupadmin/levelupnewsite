import { m } from "framer-motion";
import StarField from "@/components/StarField";
import ConcentricRings from "./ConcentricRings";

const AboutHero = () => (
  <section className="relative py-32 md:py-44 px-6 md:px-12 overflow-hidden bg-[hsl(0,0%,5%)]">
    {/* Star field background */}
    <StarField />
    {/* Concentric rings */}
    <ConcentricRings className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" size={600} count={6} />
    <ConcentricRings className="-top-20 -right-32 opacity-20" size={400} count={5} />
    <ConcentricRings className="-bottom-24 -left-28 opacity-15" size={350} count={4} />
    {/* Radial amber glow */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(24,95%,53%,0.08)_0%,_transparent_70%)] pointer-events-none" />

    <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center gap-6 z-10">
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
        className="font-serif-display text-3xl md:text-5xl lg:text-6xl text-white leading-tight"
      >
        Building India's Creative{" "}
        <em className="text-gradient-amber not-italic">Career Infrastructure</em>
      </m.h1>

      <m.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="font-sans-body text-white/70 text-base md:text-lg max-w-2xl leading-relaxed"
      >
        India's next workforce isn't coding — it's creating.
      </m.p>

      <m.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="font-sans-body text-white/50 text-sm md:text-base max-w-xl leading-relaxed"
      >
        Filmmakers, Musicians, Designers and Creators are building a new kind of career — driven by ideas, not job titles.
      </m.p>
    </div>
  </section>
);

export default AboutHero;
