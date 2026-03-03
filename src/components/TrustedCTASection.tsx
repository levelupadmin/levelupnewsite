import FadeInSection from "./FadeInSection";
import allMastersImg from "@/assets/all-masters.png";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import AccentLine from "./AccentLine";

import outlookLogo from "@/assets/press/outlook-india.svg";
import quintLogo from "@/assets/press/the-quint.svg";
import htLogo from "@/assets/press/hindustan-times.svg";
import yourstoryLogo from "@/assets/press/yourstory.svg";
import abnLogo from "@/assets/press/abn-telugu.svg";

const pressLogos = [
{ name: "Outlook India", src: outlookLogo },
{ name: "The Quint", src: quintLogo },
{ name: "Hindustan Times", src: htLogo },
{ name: "YourStory", src: yourstoryLogo },
{ name: "ABN", src: abnLogo }];


const disciplines = [
"Filmmaking", "Photography", "Editing", "Music", "Writing", "Design"];


const TrustedCTASection = () => {
  return (
    <section className="relative py-16 md:py-24 px-6 md:px-12 overflow-hidden bg-background">
      <AccentLine gradient="linear-gradient(90deg, transparent 20%, hsl(38 75% 55% / 0.5) 50%, transparent 80%)" className="w-48 left-1/2 -translate-x-1/2 right-auto" />

      {/* Radial amber glow */}
      <div className="absolute inset-0 bg-gradient-amber-glow pointer-events-none" />

      <FadeInSection className="relative max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
        {/* Masters group photo */}
        <div className="relative w-full max-w-md md:max-w-lg" style={{ maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 100%)' }}>
          <img
            alt="LevelUp's master instructors"
            className="w-full h-auto object-contain"
            width={1080}
            height={810}
            loading="lazy"
            src="/lovable-uploads/bded7ac9-4461-4363-bf02-5298f0b77158.png"
          />
        </div>

        {/* Headline */}
        <h2 className="font-serif-display text-2xl md:text-4xl lg:text-5xl text-hero-headline leading-tight">
          Trusted by{" "}
          <em className="text-gradient-amber not-italic">India's best</em>
        </h2>

        {/* Discipline keywords */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          {disciplines.map((d, i) =>
          <span key={d} className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground tracking-wide">
              {d}
              {i < disciplines.length - 1 &&
            <span className="text-muted-foreground/40">·</span>
            }
            </span>
          )}
        </div>

        {/* Subline */}
        <p className="font-sans-body text-hero-subtext text-sm md:text-base max-w-xl leading-relaxed">
          From first shot to first paycheck — and beyond.
        </p>

        {/* Featured in - press logos */}
        <div className="flex flex-col items-center gap-5 w-full mt-2">
          <p className="text-sm md:text-base text-muted-foreground/80 uppercase tracking-[0.2em] font-medium">
            Featured in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-7 md:gap-10">
            {pressLogos.map((logo) =>
            <img
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              className="h-5 md:h-7 w-auto object-contain opacity-60 grayscale brightness-200"
              style={{ mixBlendMode: "screen" }}
              loading="lazy" />
            )}
          </div>
        </div>

        {/* Social proof */}
        <p className="text-xs md:text-sm text-muted-foreground">
          9,000+ learners across 821 cities
        </p>

        {/* CTA */}
        <MagneticButton>
          <a href="#masterclasses">
            <Button
              size="lg"
              className="cta-sweep cta-glow rounded-sm gap-2 text-sm font-sans-body">
              
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </MagneticButton>
      </FadeInSection>
    </section>);

};
export default TrustedCTASection;