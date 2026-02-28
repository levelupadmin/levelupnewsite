import { m } from "framer-motion";
import ImpactBentoGrid from "./ImpactBentoGrid";
import AccentLine from "./AccentLine";

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

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const StudentLogosSection = () => {
  return (
    <section
      aria-label="LevelUp credibility and community"
      className="relative"
    >
      <ImpactBentoGrid />

      {/* Section divider with accent line */}
      <m.div
        className="relative bg-background py-12 md:py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <AccentLine />

        <m.p
          variants={itemVariants}
          className="text-sm text-muted-foreground uppercase tracking-widest text-center mb-8 md:mb-14"
        >
          Our students come from
        </m.p>

        <div className="space-y-8 md:space-y-12">
          {[brands.slice(0, 6), brands.slice(6)].map((row, rowIdx) => (
            <m.div
              key={rowIdx}
              variants={itemVariants}
              className="overflow-hidden logo-marquee-row"
              style={{
                maskImage: "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
              }}
            >
              <div
                className={`flex whitespace-nowrap items-center gap-10 md:gap-24 lg:gap-32 w-max ${
                  rowIdx === 0 ? "animate-scroll-left" : "animate-scroll-right"
                } marquee-track`}
              >
                {[...row, ...row].map((brand, i) => (
                  <img
                    key={`${brand.name}-${i}`}
                    src={brand.logo}
                    alt={brand.name}
                    className="h-10 md:h-20 lg:h-24 w-auto object-contain select-none logo-marquee-item"
                    loading="lazy"
                  />
                ))}
              </div>
            </m.div>
          ))}
        </div>
      </m.div>
    </section>
  );
};

export default StudentLogosSection;
