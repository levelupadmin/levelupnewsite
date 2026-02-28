import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { AnimatePresence, m } from "framer-motion";

// Lazy-load heavy hero sub-components to reduce initial JS evaluation
import HeroCarousel from "@/components/HeroCarousel";
const StarField = lazy(() => import("@/components/StarField"));

const rotatingWords = ["filmmakers", "editors", "storytellers", "writers", "cinematographers", "designers", "musicians", "directors"];


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

  // Measure word width after each change
  const measuredWord = rotatingWords[wordIndex];
  useEffect(() => {
    if (measureRef.current) {
      setWordWidth(measureRef.current.offsetWidth);
    }
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

        <h1 className="font-serif-display text-[1.6rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-hero-headline text-center tracking-[-0.03em] max-w-5xl text-shadow-hero overflow-hidden" style={{ lineHeight: 1.15 }}>
          <span className="animate-hero-stagger block" style={{ animationDelay: "200ms" }}>Where India's next great</span>
          <span className="block animate-hero-stagger text-center" style={{ animationDelay: "400ms" }}>
            {/* Hidden measurer */}
            <span
              ref={measureRef}
              className="absolute invisible whitespace-nowrap font-serif-display text-[1.6rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium"
              aria-hidden="true"
              style={{ pointerEvents: "none" }}
            >
              {rotatingWords[wordIndex]}
            </span>
            <span
              className="relative inline-block overflow-hidden text-left"
              style={{
                height: "1.2em",
                width: wordWidth ? `${wordWidth}px` : "auto",
                transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                verticalAlign: "baseline",
              }}
            >
              {/* Invisible baseline anchor */}
              <span className="invisible">{rotatingWords[0][0]}</span>
              <AnimatePresence mode="wait">
                <m.span
                  key={rotatingWords[wordIndex]}
                  initial={{ opacity: 0, y: "0.5em", filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: "-0.5em", filter: "blur(4px)" }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute left-0 top-0 inline-block whitespace-nowrap text-white"
                >
                  {rotatingWords[wordIndex]}
                </m.span>
              </AnimatePresence>
            </span>
            {" "}
            <em
              className="font-serif-display italic font-normal whitespace-nowrap"
              style={{ color: "#E6681D" }}
            >
              are made
            </em>
          </span>
        </h1>

        <p
          className="font-sans-body text-sm md:text-lg text-hero-subtext text-center mt-4 md:mt-6 max-w-xl leading-relaxed tracking-[0.015em] text-shadow-hero animate-hero-stagger"
          style={{ animationDelay: "800ms" }}
        >
          India's largest creative education ecosystem —{" "}
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
