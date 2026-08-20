import { useState, useEffect, lazy, Suspense } from "react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { trackCTAClick } from "@/lib/clarity";
import MagneticButton from "@/components/MagneticButton";

// Lazy-load heavy hero sub-components to reduce initial JS evaluation
import HeroCarousel from "@/components/HeroCarousel";
const StarField = lazy(() => import("@/components/StarField"));

import { rotatingWords } from "@/data/rotatingWords";

const heroMetrics = [
  { value: "67,746+", label: "learners across India" },
  { value: "4.86/5", label: "average rating" },
  { value: "3,000+", label: "collaborations enabled" },
];

// No fixed width needed — mode="wait" ensures only one word renders at a time

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
      className="relative flex min-h-[100svh] flex-col overflow-hidden pb-8 md:pb-10"
    >
      {/* Full-bleed cinematic footage */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          src="/videos/masterclass-trailer.mp4"
          poster="/images/hero-poster-1.jpg"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className="h-full w-full object-cover opacity-55 saturate-[0.9]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_52%_38%,rgba(249,112,21,0.16),transparent_42%),linear-gradient(90deg,rgba(9,7,6,0.92)_0%,rgba(9,7,6,0.7)_45%,rgba(9,7,6,0.88)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      {/* Animated star field + grain */}
      <Suspense fallback={null}>
        <StarField starCount={750} />
      </Suspense>

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, hsl(22 14% 4% / 0.2) 0%, hsl(22 14% 5% / 0.25) 45%, hsl(22 14% 6%) 100%)`,
        }}
      />

      {/* Headline area */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-5 pt-28 md:px-12 md:pt-32 lg:px-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 md:gap-10">
          <div className="min-w-0 max-w-5xl">
            <div
              className="animate-hero-stagger mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3.5 py-1.5 text-[11px] font-semibold uppercase text-white/75 backdrop-blur-md"
              style={{ animationDelay: "80ms", letterSpacing: 0 }}
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Masterclasses · Live cohorts · Offline residencies
            </div>

            <h1 className="w-full max-w-[350px] break-words font-serif-display text-[2.15rem] font-semibold text-hero-headline sm:max-w-5xl sm:text-6xl md:text-7xl lg:text-8xl text-shadow-hero" style={{ lineHeight: 1.02, letterSpacing: 0 }}>
              <span className="animate-hero-stagger block" style={{ animationDelay: "200ms" }}>Where India's next great</span>
              <span className="block animate-hero-stagger" style={{ animationDelay: "400ms" }}>
                <span className="inline-flex max-w-full flex-wrap items-end gap-[0.16em] sm:flex-nowrap" style={{ lineHeight: 1.02 }}>
                  <span
                    className="relative inline-block shrink-0 whitespace-nowrap text-[0.82em] text-gradient-amber transition-opacity duration-300"
                    style={{
                      lineHeight: 1.02,
                      letterSpacing: 0,
                    }}
                  >
                    {rotatingWords[wordIndex]}
                  </span>

                  <em
                    className="font-serif-display whitespace-nowrap text-hero-headline not-italic"
                    style={{
                      lineHeight: 1.02,
                      letterSpacing: 0,
                    }}
                  >
                    are made
                  </em>
                </span>
              </span>
            </h1>

            <p
              className="font-sans-body mt-6 max-w-[330px] text-base leading-relaxed text-white/70 sm:max-w-2xl md:text-xl text-shadow-hero animate-hero-stagger"
              style={{ animationDelay: "800ms", letterSpacing: 0 }}
            >
              India's largest creative education ecosystem where you learn, practice,
              create, and become.
            </p>

            <div className="mt-8 flex w-full max-w-[320px] flex-col gap-4 sm:max-w-none sm:flex-row sm:items-center animate-hero-stagger" style={{ animationDelay: "1000ms" }}>
              <MagneticButton className="w-full sm:w-auto">
                <a
                  href="#masterclasses"
                  onClick={() => trackCTAClick("hero", "See all Programs")}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-3 font-sans-body text-sm font-semibold text-primary-foreground transition-all duration-500 hover:bg-primary/90 sm:w-auto md:px-7 md:py-3.5 md:text-base"
                >
                  See all Programs
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </MagneticButton>
              <a
                href="#testimonials"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 font-sans-body text-sm text-white/75 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:text-white sm:w-auto"
              >
                <Play className="h-4 w-4 fill-current" />
                Watch student stories
              </a>
            </div>
          </div>

          <div className="grid w-full max-w-md grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 backdrop-blur-md animate-hero-stagger sm:max-w-3xl sm:grid-cols-3" style={{ animationDelay: "1150ms" }}>
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="bg-black/35 p-3.5 md:p-4">
                <p className="font-serif-display text-lg font-semibold text-white md:text-2xl" style={{ letterSpacing: 0 }}>
                  {metric.value}
                </p>
                <p className="mt-1 font-sans-body text-[11px] leading-snug text-white/55 md:text-xs" style={{ letterSpacing: 0 }}>
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cinematic video carousel */}
      <HeroCarousel />
    </section>
  );
};

export default HeroSection;
