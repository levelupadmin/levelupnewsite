import allMastersImg from "@/assets/all-masters.png";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const disciplines = [
  "Filmmaking", "Photography", "Editing", "Music", "Writing", "Design"
];

const TrustedCTASection = () => {
  return (
    <section className="relative py-16 md:py-24 px-6 md:px-12 overflow-hidden">
      {/* Amber accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Radial amber glow */}
      <div className="absolute inset-0 bg-gradient-amber-glow pointer-events-none" />

      <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
        {/* Masters group photo */}
        <div className="relative w-full max-w-md md:max-w-lg">
          <img
            src={allMastersImg}
            alt="LevelUp's master instructors"
            className="w-full h-auto object-contain"
            width={1080}
            height={810}
            loading="lazy"
          />
          {/* Bottom vignette blend */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />
        </div>

        {/* Headline */}
        <h2 className="font-serif-display text-2xl md:text-4xl lg:text-5xl text-hero-headline leading-tight">
          The most intentional way to{" "}
          <em className="text-gradient-amber not-italic">learn the craft.</em>
        </h2>

        {/* Discipline keywords */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          {disciplines.map((d, i) => (
            <span key={d} className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground tracking-wide">
              {d}
              {i < disciplines.length - 1 && (
                <span className="text-muted-foreground/40">·</span>
              )}
            </span>
          ))}
        </div>

        {/* Subline */}
        <p className="font-sans-body text-hero-subtext text-sm md:text-base max-w-xl leading-relaxed">
          From first shot to first paycheck — and beyond.
        </p>

        {/* Social proof */}
        <p className="text-xs md:text-sm text-muted-foreground">
          9,000+ learners across 821 cities
        </p>

        {/* CTA */}
        <a href="#masterclasses">
          <Button
            size="lg"
            className="cta-sweep cta-glow rounded-sm gap-2 text-sm font-sans-body"
          >
            Start Your Journey
            <ArrowRight className="w-4 h-4" />
          </Button>
        </a>
      </div>
    </section>
  );
};
export default TrustedCTASection;
