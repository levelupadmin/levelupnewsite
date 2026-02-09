import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";
import SplitTextReveal from "@/components/SplitTextReveal";

const HeroSection = () => {
  return (
    <section id="hero" aria-label="Hero" className="relative flex flex-col bg-background pb-8 md:pb-12">
      {/* Noise/grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
      {/* Light streaks radiating from center-top */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          background: `
            conic-gradient(
              from 180deg at 50% 0%,
              transparent 30%,
              hsl(0 0% 40% / 0.5) 35%,
              transparent 40%,
              transparent 44%,
              hsl(0 0% 35% / 0.4) 46%,
              transparent 48%,
              transparent 52%,
              hsl(0 0% 40% / 0.3) 54%,
              transparent 56%,
              transparent 60%,
              hsl(0 0% 35% / 0.5) 65%,
              transparent 70%
            )
          `,
        }}
      />
      {/* Radial fade / vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, transparent 30%, hsl(0 0% 4%) 100%)`,
        }}
      />

      {/* Headline area */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-24 md:pt-36 lg:pt-40 px-5 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-sans-body text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 md:mb-6 text-shadow-hero"
        >
          India's Creative Education Ecosystem
        </motion.p>

        <h1 className="font-serif-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-hero-headline text-center leading-[1.1] tracking-[-0.03em] max-w-5xl text-shadow-hero">
          <SplitTextReveal
            startDelay={0.6}
            stagger={0.12}
            renderWord={(word) =>
              word === "become" ? (
                <em className="font-serif-display italic font-normal text-gradient-amber">
                  {word}
                </em>
              ) : (
                word
              )
            }
          >
            Where creators become
          </SplitTextReveal>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="font-sans-body text-sm md:text-lg text-hero-subtext text-center mt-4 md:mt-6 max-w-xl leading-relaxed tracking-[0.015em] text-shadow-hero"
        >
          A place for those who believe the craft is the journey.{" "}
          <br className="hidden md:block" />
          Learn from India's finest. Find your voice.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-8 md:mt-10"
        >
          <a
            href="#masterclasses"
            
            className="cta-sweep cta-glow group inline-flex items-center gap-3 font-sans-body text-sm md:text-base text-foreground border border-border px-6 py-3 md:px-7 md:py-3.5 rounded-full hover:border-primary hover:text-primary transition-all duration-500"
          >
            Explore the ecosystem
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>

      {/* Cinematic video carousel */}
      <HeroCarousel />
    </section>
  );
};

export default HeroSection;
