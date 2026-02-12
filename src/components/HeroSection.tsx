import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import HeroCarousel from "@/components/HeroCarousel";
import heroBg from "@/assets/hero-bg.png";

const rotatingWords = ["filmmakers", "editors", "storytellers", "artists", "writers"];

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative flex flex-col pb-8 md:pb-12"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
    >
      {/* Bottom fade overlay for smooth transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none z-10"
        style={{
          background: `linear-gradient(to bottom, transparent, hsl(220 12% 7%))`,
        }}
      />

      {/* Headline area */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-24 md:pt-36 lg:pt-40 px-5 md:px-12">
        <p className="font-sans-body text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 md:mb-6 text-shadow-hero">
          India's Creative Education Ecosystem
        </p>

        <h1 className="font-serif-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-hero-headline text-center leading-[1.1] tracking-[-0.03em] max-w-5xl text-shadow-hero">
          Where{" "}
          <span className="inline-block relative align-bottom overflow-hidden" style={{ minWidth: "2ch" }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[wordIndex]}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                className="inline-block text-white"
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>{" "}
          <em className="font-serif-display italic font-normal" style={{ color: "#E6681D" }}>
            become
          </em>
        </h1>

        <p className="font-sans-body text-sm md:text-lg text-hero-subtext text-center mt-4 md:mt-6 max-w-xl leading-relaxed tracking-[0.015em] text-shadow-hero">
          A place for those who believe the craft is the journey.{" "}
          <br className="hidden md:block" />
          Learn from India's finest. Find your voice.
        </p>

        <div className="mt-8 md:mt-10">
          <a
            href="#masterclasses"
            className="cta-sweep cta-glow group inline-flex items-center gap-3 font-sans-body text-sm md:text-base text-foreground px-6 py-3 md:px-7 md:py-3.5 rounded-full hover:text-primary transition-all duration-500"
            style={{ border: "1px solid #5c5c5c" }}
          >
            Explore the ecosystem
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Cinematic video carousel */}
      <HeroCarousel />
    </section>
  );
};

export default HeroSection;
