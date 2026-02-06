import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col bg-gradient-cinematic overflow-hidden">
      {/* Subtle amber glow at top */}
      <div className="absolute inset-0 bg-gradient-amber-glow pointer-events-none" />

      {/* Headline area */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-36 md:pt-44 lg:pt-48 px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-sans-body text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6 md:mb-8"
        >
          India's Creative Education Ecosystem
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="font-serif-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-hero-headline text-center leading-[1.1] tracking-tight max-w-5xl"
        >
          Where creators{" "}
          <em className="font-serif-display italic font-normal text-primary">
            become
          </em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="font-sans-body text-base md:text-lg text-hero-subtext text-center mt-6 md:mt-8 max-w-xl leading-relaxed"
        >
          A place for those who believe the craft is the journey.
          <br className="hidden md:block" />
          Learn from India's finest. Find your voice.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-10 md:mt-12"
        >
          <a
            href="#"
            className="group inline-flex items-center gap-3 font-sans-body text-sm md:text-base text-foreground border border-border px-7 py-3.5 rounded-full hover:border-primary hover:text-primary transition-all duration-500"
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
