import { useState, useEffect, lazy, Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";

// Lazy-load heavy hero sub-components to reduce initial JS evaluation
import HeroCarousel from "@/components/HeroCarousel";
const StarField = lazy(() => import("@/components/StarField"));

const rotatingWords = ["filmmakers", "editors", "storytellers", "artists", "writers", "creators", "animators", "screenwriters", "cinematographers", "designers", "producers", "directors", "musicians"];

// Pre-compute the longest word length to use a fixed container width and avoid CLS
const maxWordLength = Math.max(...rotatingWords.map(w => w.length));

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative flex flex-col pb-8 md:pb-12"
    >
      {/* Animated star field + grain */}
      <Suspense fallback={null}>
        <StarField starCount={750} />
      </Suspense>

      {/* Cinematic gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, hsl(24 95% 53% / 0.05) 0%, transparent 70%), linear-gradient(to bottom, hsl(0 0% 6% / 0.4) 0%, hsl(0 0% 4% / 0.5) 40%, hsl(0 0% 3% / 0.7) 100%)`,
        }}
      />
      {/* Bottom fade overlay for smooth transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none z-10"
        style={{
          background: `linear-gradient(to bottom, transparent, hsl(0 0% 4%))`,
        }}
      />

      {/* Headline area */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-24 md:pt-36 lg:pt-40 px-5 md:px-12">
        <p
          className="font-sans-body text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 md:mb-6 text-shadow-hero animate-hero-stagger"
          style={{ animationDelay: "0ms" }}
        >
          India's Creative Education Ecosystem
        </p>

        <h1 className="font-serif-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-hero-headline text-center tracking-[-0.03em] max-w-5xl text-shadow-hero" style={{ lineHeight: 1.1 }}>
          <span className="animate-hero-stagger whitespace-nowrap" style={{ animationDelay: "200ms" }}>Where India's next big</span>
          <br />
          <span
            className="relative inline-block overflow-hidden align-middle animate-hero-stagger"
            style={{ width: "min(100%, " + maxWordLength + "ch)", height: "1.15em", animationDelay: "400ms" }}
          >
            <AnimatePresence mode="wait">
              <m.span
                key={rotatingWords[wordIndex]}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-white"
              >
                {rotatingWords[wordIndex]}
              </m.span>
            </AnimatePresence>
          </span>
          <br />
          <em
            className="font-serif-display italic font-normal animate-hero-stagger"
            style={{ color: "#E6681D", animationDelay: "600ms" }}
          >
            become
          </em>
        </h1>

        <p
          className="font-sans-body text-sm md:text-lg text-hero-subtext text-center mt-4 md:mt-6 max-w-xl leading-relaxed tracking-[0.015em] text-shadow-hero animate-hero-stagger"
          style={{ animationDelay: "800ms" }}
        >
          A place for those who believe the craft is the journey.{" "}
          <br className="hidden md:block" />
          Learn from India's finest. Find your voice.
        </p>

        <div className="mt-8 md:mt-10 animate-hero-stagger" style={{ animationDelay: "1000ms" }}>
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
