import { ArrowRight } from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";
import heroBg from "@/assets/hero-bg.png";

const HeroSection = () => {
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
          Where creators{" "}
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
            className="cta-sweep cta-glow group inline-flex items-center gap-3 font-sans-body text-sm md:text-base text-foreground border border-border px-6 py-3 md:px-7 md:py-3.5 rounded-full hover:border-primary hover:text-primary transition-all duration-500"
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
