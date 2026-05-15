import { useEffect, useState } from "react";
import { Picture } from "@/components/Picture";
import ImpactBentoGrid from "./ImpactBentoGrid";
import AccentLine from "./AccentLine";
import FadeInSection from "./FadeInSection";
import { Building2, GraduationCap, Sparkles } from "lucide-react";

import logoFtii from "@/assets/logos/ftii.png";
import logoNid from "@/assets/logos/nid.png";
import logoWhistlingWoods from "@/assets/logos/whistling-woods.png";
import logoYrf from "@/assets/logos/yrf.png";
import logoExcel from "@/assets/logos/excel-entertainment.png";
import logoTvf from "@/assets/logos/tvf.png";
import logoDharma from "@/assets/logos/dharma.png";
import logoRedChillies from "@/assets/logos/red-chillies.png";
import logoViacom18 from "@/assets/logos/viacom18.png";
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

const logoGroups = [
  {
    label: "Film and media",
    icon: Sparkles,
    line: "Studios, platforms, and production cultures our learners look up to and enter.",
    logos: [
      { name: "FTII", logo: logoFtii },
      { name: "Whistling Woods", logo: logoWhistlingWoods },
      { name: "YRF", logo: logoYrf },
      { name: "Excel Entertainment", logo: logoExcel },
      { name: "TVF", logo: logoTvf },
      { name: "Dharma", logo: logoDharma },
      { name: "Red Chillies", logo: logoRedChillies },
      { name: "Viacom18", logo: logoViacom18 },
      { name: "Amazon Prime", logo: logoAmazonPrime },
      { name: "Sony Pictures", logo: logoSonyPictures },
      { name: "Star India", logo: logoStarIndia },
      { name: "Zee", logo: logoZee },
    ],
  },
  {
    label: "Companies and teams",
    icon: Building2,
    line: "Learners come from product, technology, media, and brand teams across India.",
    logos: [
      { name: "Google", logo: logoGoogle },
      { name: "Adobe", logo: logoAdobe },
      { name: "Microsoft", logo: logoMicrosoft },
      { name: "Meta", logo: logoMeta },
      { name: "Flipkart", logo: logoFlipkart },
      { name: "Infosys", logo: logoInfosys },
      { name: "TCS", logo: logoTcs },
      { name: "Wipro", logo: logoWipro },
      { name: "Zoho", logo: logoZoho },
      { name: "Swiggy", logo: logoSwiggy },
      { name: "Razorpay", logo: logoRazorpay },
      { name: "Tata", logo: logoTata },
      { name: "Reliance", logo: logoReliance },
      { name: "ITC", logo: logoItc },
      { name: "HUL", logo: logoHul },
    ],
  },
  {
    label: "Campuses and institutes",
    icon: GraduationCap,
    line: "Aspirants arrive from India's strongest creative, design, and business campuses.",
    logos: [
      { name: "NID", logo: logoNid },
      { name: "IIT", logo: logoIit },
      { name: "IIM", logo: logoIim },
      { name: "NIFT", logo: logoNift },
      { name: "SRFTI", logo: logoSrfti },
      { name: "Symbiosis", logo: logoSymbiosis },
      { name: "Christ University", logo: logoChristUniversity },
      { name: "Manipal", logo: logoManipal },
      { name: "MICA", logo: logoMica },
      { name: "Pearl Academy", logo: logoPearlAcademy },
      { name: "Ashoka University", logo: logoAshokaUniversity },
      { name: "ISB", logo: logoIsb },
    ],
  },
];

const StudentLogosSection = () => {
  const [activeGroup, setActiveGroup] = useState(0);
  const group = logoGroups[activeGroup];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveGroup((current) => (current + 1) % logoGroups.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="student-logos"
      aria-label="LevelUp credibility and community"
      className="relative scroll-mt-24 overflow-hidden bg-background"
    >
      <div className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <FadeInSection className="mb-10 grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
            <div>
              <p className="font-sans-body text-xs font-semibold uppercase text-primary" style={{ letterSpacing: 0 }}>
                Proof, not performance
              </p>
              <h2 className="mt-4 max-w-2xl font-serif-display text-4xl font-semibold text-foreground sm:text-5xl md:text-6xl" style={{ lineHeight: 1.02, letterSpacing: 0 }}>
                The scale matters because the outcomes are human.
              </h2>
            </div>
            <p className="max-w-xl font-sans-body text-sm leading-relaxed text-muted-foreground md:text-base" style={{ letterSpacing: 0 }}>
              Ratings, cities, learners, collaborations: the numbers are not decoration. They are signals that serious creators are finding each other here.
            </p>
          </FadeInSection>
        </div>
        <ImpactBentoGrid />
      </div>

      <div className="relative border-t border-white/10 bg-[hsl(22_14%_5%)] py-16 md:py-20">
        <AccentLine />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(249,112,21,0.08),transparent_38%)]" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-12">
          <FadeInSection className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <p className="font-sans-body text-xs font-semibold uppercase text-primary" style={{ letterSpacing: 0 }}>
                Our students come from
              </p>
              <h3 className="mt-4 max-w-xl font-serif-display text-3xl font-semibold text-white md:text-5xl" style={{ lineHeight: 1.04, letterSpacing: 0 }}>
                A cross-section of India's creative ambition.
              </h3>
            </div>

            <div className="space-y-4">
              <div className="grid gap-2 sm:grid-cols-3">
                {logoGroups.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeGroup === index;

                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setActiveGroup(index)}
                      onMouseEnter={() => setActiveGroup(index)}
                      aria-pressed={isActive}
                      className={`rounded-lg border p-4 text-left transition-all duration-300 ${
                        isActive
                          ? "border-primary/40 bg-primary/10"
                          : "border-white/10 bg-white/[0.025] hover:border-white/20"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-white/45"}`} />
                      <p className="mt-3 font-serif-display text-lg font-semibold text-white" style={{ letterSpacing: 0 }}>
                        {item.label}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-lg border border-white/10 bg-white/[0.025] p-5 md:p-6">
                <p className="font-sans-body text-sm leading-relaxed text-white/55" style={{ letterSpacing: 0 }}>
                  {group.line}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-4">
                  {group.logos.map((brand) => (
                    <div key={brand.name} className="group flex h-24 items-center justify-center bg-[hsl(22_14%_6%)] p-5 transition-colors duration-300 hover:bg-white/[0.055]">
                      <Picture
                        src={brand.logo}
                        alt={brand.name}
                        className="max-h-10 w-auto max-w-[130px] object-contain opacity-60 grayscale brightness-200 transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                        style={{ mixBlendMode: "screen" }}
                        loading="eager"
                        decoding="async"
                        fetchPriority="low"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default StudentLogosSection;
