import { m } from "framer-motion";
import ImpactBentoGrid from "./ImpactBentoGrid";
import AccentLine from "./AccentLine";

// Existing raster logos
import logoFtii from "@/assets/logos/ftii.png";
import logoNid from "@/assets/logos/nid.png";
import logoWhistlingWoods from "@/assets/logos/whistling-woods.png";
import logoYrf from "@/assets/logos/yrf.png";
import logoExcel from "@/assets/logos/excel-entertainment.png";
import logoTvf from "@/assets/logos/tvf.png";
import logoDharma from "@/assets/logos/dharma.png";
import logoRedChillies from "@/assets/logos/red-chillies.png";
import logoViacom18 from "@/assets/logos/viacom18.png";

// Real SVG logos — downloaded from simple-icons / svgl
import logoGoogle from "@/assets/logos/google-real.svg";
import logoAdobe from "@/assets/logos/adobe-real.svg";
import logoAmazonPrime from "@/assets/logos/amazon-prime-real.svg";
import logoMicrosoft from "@/assets/logos/microsoft-real.svg";
import logoMeta from "@/assets/logos/meta-real.svg";
import logoFlipkart from "@/assets/logos/flipkart.svg";
import logoInfosys from "@/assets/logos/infosys-real.svg";
import logoTcs from "@/assets/logos/tcs-real.svg";
import logoWipro from "@/assets/logos/wipro-real.svg";
import logoZoho from "@/assets/logos/zoho-real.svg";
import logoSwiggy from "@/assets/logos/swiggy-real.svg";
import logoRazorpay from "@/assets/logos/razorpay-real.svg";
import logoTata from "@/assets/logos/tata-real.svg";
import logoReliance from "@/assets/logos/reliance.svg";
import logoHul from "@/assets/logos/hul.svg";
import logoSonyPictures from "@/assets/logos/sony-real.svg";
import logoStarIndia from "@/assets/logos/star-india.svg";
import logoZee from "@/assets/logos/zee.svg";
import logoItc from "@/assets/logos/itc.svg";

// Institutions (improved SVG logos)
import logoIit from "@/assets/logos/iit-real.svg";
import logoIim from "@/assets/logos/iim-real.svg";
import logoNift from "@/assets/logos/nift-real.svg";
import logoSrfti from "@/assets/logos/srfti-real.svg";
import logoSymbiosis from "@/assets/logos/symbiosis-real.svg";
import logoChristUniversity from "@/assets/logos/christ-university-real.svg";
import logoManipal from "@/assets/logos/manipal-real.svg";
import logoMica from "@/assets/logos/mica-real.svg";
import logoPearlAcademy from "@/assets/logos/pearl-academy-real.svg";
import logoAshokaUniversity from "@/assets/logos/ashoka-university-real.svg";
import logoIsb from "@/assets/logos/isb-real.svg";

const row1 = [
  { name: "FTII", logo: logoFtii },
  { name: "NID", logo: logoNid },
  { name: "Whistling Woods", logo: logoWhistlingWoods },
  { name: "YRF", logo: logoYrf },
  { name: "Excel Entertainment", logo: logoExcel },
  { name: "TVF", logo: logoTvf },
  { name: "IIT", logo: logoIit },
  { name: "IIM", logo: logoIim },
  { name: "NIFT", logo: logoNift },
  { name: "SRFTI", logo: logoSrfti },
  { name: "Symbiosis", logo: logoSymbiosis },
  { name: "Christ University", logo: logoChristUniversity },
  { name: "Manipal", logo: logoManipal },
];

const row2 = [
  { name: "Google", logo: logoGoogle },
  { name: "Amazon Prime", logo: logoAmazonPrime },
  { name: "Viacom18", logo: logoViacom18 },
  { name: "Dharma", logo: logoDharma },
  { name: "Red Chillies", logo: logoRedChillies },
  { name: "Adobe", logo: logoAdobe },
  { name: "Microsoft", logo: logoMicrosoft },
  { name: "Meta", logo: logoMeta },
  { name: "Flipkart", logo: logoFlipkart },
  { name: "Infosys", logo: logoInfosys },
  { name: "TCS", logo: logoTcs },
  { name: "Wipro", logo: logoWipro },
  { name: "Zoho", logo: logoZoho },
];

const row3 = [
  { name: "Tata", logo: logoTata },
  { name: "Reliance", logo: logoReliance },
  { name: "ITC", logo: logoItc },
  { name: "HUL", logo: logoHul },
  { name: "Sony Pictures", logo: logoSonyPictures },
  { name: "Star India", logo: logoStarIndia },
  { name: "Zee", logo: logoZee },
  { name: "Swiggy", logo: logoSwiggy },
  { name: "Razorpay", logo: logoRazorpay },
  { name: "MICA", logo: logoMica },
  { name: "Pearl Academy", logo: logoPearlAcademy },
  { name: "Ashoka University", logo: logoAshokaUniversity },
  { name: "ISB", logo: logoIsb },
];

const rows = [
  { brands: row1, animation: "scroll-left 40s linear infinite" },
  { brands: row2, animation: "scroll-right 40s linear infinite" },
  { brands: row3, animation: "scroll-left 40s linear infinite" },
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
      id="student-logos"
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
          {rows.map((row, rowIdx) => (
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
                className="flex whitespace-nowrap items-center gap-8 md:gap-16 lg:gap-20 w-max marquee-track"
                style={{ animation: row.animation }}
              >
                {[...row.brands, ...row.brands].map((brand, i) => (
                  <img
                    key={`${brand.name}-${i}`}
                    src={brand.logo}
                    alt={brand.name}
                    className="h-7 md:h-12 lg:h-14 max-w-[80px] md:max-w-[140px] lg:max-w-[160px] w-auto object-contain select-none logo-marquee-item"
                    style={{ filter: "brightness(0) invert(1)" }}
                    loading="lazy"
                    decoding="async"
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
