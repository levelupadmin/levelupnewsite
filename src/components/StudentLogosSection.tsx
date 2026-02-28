import ImpactBentoGrid from "./ImpactBentoGrid";

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
      <ImpactBentoGrid />

      <div className="bg-background py-14 md:py-20">
        <p className="font-serif-display text-2xl md:text-3xl text-foreground text-center mb-8 md:mb-16">
          Our students come from:
        </p>

        <div className="space-y-8 md:space-y-12">
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
                className={`flex whitespace-nowrap items-center gap-10 md:gap-24 lg:gap-32 w-max ${
                  rowIdx === 0 ? "animate-scroll-left" : "animate-scroll-right"
                } pause-on-hover`}
              >
                {[...row, ...row].map((brand, i) => (
                  <img
                    key={`${brand.name}-${i}`}
                    src={brand.logo}
                    alt={brand.name}
                    className="h-10 md:h-20 lg:h-24 w-auto object-contain select-none opacity-70 hover:opacity-100 transition-all duration-300"
                    style={{ filter: "grayscale(1) brightness(1.5)", mixBlendMode: "screen" }}
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
