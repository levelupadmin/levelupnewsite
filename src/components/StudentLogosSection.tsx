import { ArrowUpRight } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

import logoFtii from "@/assets/logos/ftii.png";
import logoNid from "@/assets/logos/nid.png";
import logoWhistlingWoods from "@/assets/logos/whistling-woods.png";
import logoYrf from "@/assets/logos/yrf.png";
import logoExcel from "@/assets/logos/excel-entertainment.png";
import logoTvf from "@/assets/logos/tvf.png";
import logoGoogle from "@/assets/logos/google.png";
import logoAmazonPrime from "@/assets/logos/amazon-prime.png";
import logoViacom18 from "@/assets/logos/viacom18.png";
import logoDharma from "@/assets/logos/dharma.png";
import logoRedChillies from "@/assets/logos/red-chillies.png";
import logoAdobe from "@/assets/logos/adobe.png";

const brands = [
  { name: "FTII", logo: logoFtii },
  { name: "NID", logo: logoNid },
  { name: "Whistling Woods", logo: logoWhistlingWoods },
  { name: "YRF", logo: logoYrf },
  { name: "Excel Entertainment", logo: logoExcel },
  { name: "TVF", logo: logoTvf },
  { name: "Google", logo: logoGoogle },
  { name: "Amazon Prime", logo: logoAmazonPrime },
  { name: "Viacom18", logo: logoViacom18 },
  { name: "Dharma", logo: logoDharma },
  { name: "Red Chillies", logo: logoRedChillies },
  { name: "Adobe", logo: logoAdobe },
];

const stats = [
  {
    value: 57600,
    suffix: "+",
    hasComma: true,
    label: "learners have enrolled across masterclasses, live programs, and residencies",
  },
  {
    value: 11,
    suffix: "",
    hasComma: false,
    label: "editions of The Forge across 7 cities",
  },
];

const StudentLogosSection = () => {
  return (
    <section
      aria-label="LevelUp credibility and community"
      className="relative"
    >
      <div className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {/* Top separator */}
          <div className="h-px bg-border mx-auto mb-10 md:mb-12 w-12" />

          {/* Headline */}
          <h2 className="font-serif-display text-2xl md:text-3xl lg:text-[2.5rem] lg:leading-[1.25] text-center text-foreground max-w-2xl mx-auto mb-12 md:mb-16">
            The creative industry is competitive.{" "}
            <strong className="text-gradient-amber">
              Your growth doesn't have to wait.
            </strong>
          </h2>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-10 md:mb-14 max-w-xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-medium text-cue-value tracking-tight tabular-nums">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    hasComma={stat.hasComma}
                  />
                </p>
                <p className="font-sans-body text-xs md:text-sm text-muted-foreground mt-3 leading-relaxed max-w-[220px] mx-auto">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Link */}
          <div className="text-center mb-12 md:mb-16">
            <a
              href="#testimonials"
              className="cta-underline font-sans-body text-sm text-primary inline-flex items-center gap-1.5 transition-colors hover:text-primary/80"
              aria-label="See what our alumni are building"
            >
              See what our alumni are building
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-background py-10 md:py-14">
        <p className="font-serif-display text-2xl md:text-3xl text-foreground text-center mb-10 md:mb-12">
          Our students come from:
        </p>

        <div className="space-y-6 md:space-y-8">
          {[brands.slice(0, 6), brands.slice(6)].map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="overflow-hidden"
              style={{
                maskImage: "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
              }}
            >
              <div
                className={`flex whitespace-nowrap items-center gap-12 md:gap-16 lg:gap-20 w-max ${
                  rowIdx === 0 ? "animate-scroll-left" : "animate-scroll-right"
                } pause-on-hover`}
              >
                {[...row, ...row].map((brand, i) => (
                  <img
                    key={`${brand.name}-${i}`}
                    src={brand.logo}
                    alt={brand.name}
                    className="h-10 md:h-14 lg:h-16 w-auto object-contain select-none hover:opacity-80 transition-opacity duration-300"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentLogosSection;
