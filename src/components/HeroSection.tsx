import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { trackCTAClick } from "@/lib/clarity";
import MagneticButton from "@/components/MagneticButton";
import { AnimatePresence, m } from "framer-motion";

// Lazy-load heavy hero sub-components to reduce initial JS evaluation
import HeroCarousel from "@/components/HeroCarousel";
const StarField = lazy(() => import("@/components/StarField"));

import { rotatingWords } from "@/data/rotatingWords";


// No fixed width needed — mode="wait" ensures only one word renders at a time

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [wordWidth, setWordWidth] = useState<number | undefined>(undefined);
  
  const measureRef = useRef<HTMLSpanElement>(null);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  // Measure word width after each change and on resize
  const measuredWord = rotatingWords[wordIndex];
  useEffect(() => {
    const updateWidth = () => {
      if (measureRef.current) {
        setWordWidth(measureRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [measuredWord]);


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
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, hsl(24 95% 53% / 0.05) 0%, transparent 70%), linear-gradient(to bottom, hsl(22 14% 6% / 0.4) 0%, hsl(22 14% 5% / 0.5) 40%, hsl(22 14% 4% / 0.7) 100%)`,
        }}
      />
      {/* Bottom fade overlay for smooth transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none z-10"
        style={{
          background: `linear-gradient(to bottom, transparent, hsl(22 14% 6%))`,
        }}
      />

      {/* Headline area */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-24 md:pt-36 lg:pt-40 px-5 md:px-12">

        <h1 className="font-serif-display text-[1.6rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-hero-headline text-center tracking-[-0.03em] max-w-5xl text-shadow-hero" style={{ lineHeight: 1.15 }}>
          <span className="animate-hero-stagger block" style={{ animationDelay: "200ms" }}>Where India's next great</span>
          <span className="block animate-hero-stagger text-center" style={{ animationDelay: "400ms" }}>
            <span className="inline-flex max-w-full items-end justify-center gap-[0.2em] flex-wrap sm:flex-nowrap" style={{ lineHeight: 1.15 }}>
              {/* Hidden measurer */}
              <span
                ref={measureRef}
                className="absolute invisible whitespace-nowrap font-serif-display text-[1.6rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium"
                aria-hidden="true"
                style={{ pointerEvents: "none", lineHeight: 1.15 }}
              >
                {rotatingWords[wordIndex]}
              </span>

              <span
                className="relative inline-block overflow-hidden shrink-0"
                style={{
                  height: "1.15em",
                  lineHeight: 1.15,
                  width: wordWidth ? `${wordWidth}px` : undefined,
                  transition: "width 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <AnimatePresence mode="sync">
                  <m.span
                    key={rotatingWords[wordIndex]}
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: "0%" }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 bottom-0 inline-block whitespace-nowrap text-white"
                    style={{ lineHeight: 1.15, transformOrigin: "bottom left" }}
                  >
                    {rotatingWords[wordIndex]}
                  </m.span>
                </AnimatePresence>
              </span>

              <em
                className="font-serif-display not-italic font-medium whitespace-nowrap text-gradient-amber"
                style={{
                  lineHeight: 1.15,
                }}
              >
                are made
              </em>
            </span>
          </span>
        </h1>

        <p
          className="font-sans-body text-sm md:text-lg text-hero-subtext text-center mt-4 md:mt-6 max-w-xl leading-relaxed tracking-[0.015em] text-shadow-hero animate-hero-stagger"
          style={{ animationDelay: "800ms" }}
        >
          India's largest creative education ecosystem{" "}
          <br className="hidden md:block" />
          where you learn, practice, create, and become.
        </p>

        <div className="mt-8 md:mt-10 animate-hero-stagger" style={{ animationDelay: "1000ms" }}>
          <MagneticButton>
            <a
              href="#masterclasses"
              className="cta-sweep cta-glow group inline-flex items-center gap-3 font-sans-body text-sm md:text-base text-foreground px-6 py-3 md:px-7 md:py-3.5 rounded-full hover:text-primary transition-all duration-500"
              style={{ border: "1px solid #5c5c5c" }}
            >
              See all Programs
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Cinematic video carousel */}
      <HeroCarousel />
    </section>
  );
};

export default HeroSection;
