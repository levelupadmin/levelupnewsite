import { m } from "framer-motion";
import { Star, Handshake, Globe } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";
import FadeInSection from "./FadeInSection";

import community1 from "@/assets/community/community-1.png";
import community2 from "@/assets/community/community-2.png";
import community3 from "@/assets/community/community-3.png";
import community7 from "@/assets/community/community-7.jpg";
import community8 from "@/assets/community/community-8.jpg";
import community9 from "@/assets/community/community-9.jpg";
import community10 from "@/assets/community/community-10.jpg";
import community11 from "@/assets/community/community-11.jpg";
import community12 from "@/assets/community/community-12.jpg";

const communityPhotos = [
  community1, community2, community3,
  community7, community8, community9,
  community10, community11, community12,
];

const cardBase = "rounded-sm overflow-hidden transition-all duration-300";
const darkCard = `${cardBase} bg-[hsl(25_8%_10%)] border border-primary/15`;
const orangeCard = `${cardBase} bg-primary relative`;
const orangeInnerGlow = "inset 0 1px 0 hsl(30 90% 60% / 0.2)";
const hoverGlow = "0 0 30px 4px hsl(30 80% 45% / 0.15)";

const cardHover = {
  whileHover: { scale: 1.015, y: -2 },
  transition: { type: "spring" as const, stiffness: 300, damping: 20 },
};

const ImpactBentoGrid = () => {
  return (
    <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
      {/* Ambient amber glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(30 80% 45% / 0.12), transparent 70%)",
        }}
      />

      <div
        className="relative grid grid-cols-2 md:grid-cols-[1fr_1.4fr_1.2fr] gap-2 md:gap-3"
        style={{ gridTemplateRows: "auto auto" }}
      >
        {/* 1 — Rating card */}
        <FadeInSection delay={0}>
          <m.div
            {...cardHover}
            className={`${darkCard} p-6 md:p-7 flex flex-col justify-between min-h-[180px] md:min-h-[200px]`}
            style={{ boxShadow: "none" }}
            whileHover={{ scale: 1.015, y: -2, boxShadow: hoverGlow }}
          >
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-4 h-4 text-primary fill-primary" />
              ))}
              <Star className="w-4 h-4 text-primary fill-primary/60" />
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
                <AnimatedCounter target={4.86} suffix="/5" decimals={2} />
              </p>
              <p className="text-[11px] md:text-xs text-muted-foreground mt-1.5 leading-relaxed">
                average rating across 9,000+ learners
              </p>
            </div>
          </m.div>
        </FadeInSection>

        {/* 2 — Paid learners card */}
        <FadeInSection delay={80}>
          <m.div
            {...cardHover}
            className={`${orangeCard} p-6 md:p-7 flex flex-col justify-end min-h-[180px] md:min-h-[200px]`}
            style={{ boxShadow: orangeInnerGlow }}
            whileHover={{ scale: 1.015, y: -2, boxShadow: `${orangeInnerGlow}, ${hoverGlow}` }}
          >
            {/* Noise texture */}
            <div className="noise-overlay absolute inset-0 opacity-[0.06] pointer-events-none" />
            {/* Photo overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url(${community8})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                mixBlendMode: "multiply",
              }}
            />
            <div className="relative z-10">
              <p className="text-5xl md:text-6xl lg:text-7xl font-semibold text-primary-foreground tracking-tight">
                <AnimatedCounter target={58746} hasComma />
              </p>
              <p className="text-xs md:text-sm text-primary-foreground/70 mt-1">
                paid learners
              </p>
            </div>
          </m.div>
        </FadeInSection>

        {/* 3 — Community card (spans 2 rows) */}
        <FadeInSection delay={160} className="col-span-2 md:col-span-1 md:row-span-2">
          <m.div
            {...cardHover}
            className={`${cardBase} relative flex flex-col justify-end min-h-[220px] md:min-h-full h-full`}
            style={{ boxShadow: "none" }}
            whileHover={{ scale: 1.015, y: -2, boxShadow: hoverGlow }}
          >
            {/* Photo mosaic */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5">
              {communityPhotos.map((photo, i) => (
                <div key={i} className="overflow-hidden">
                  <img
                    src={photo}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            {/* Reduced orange overlay */}
            <div
              className="absolute inset-0 bg-primary/30"
              style={{ mixBlendMode: "multiply" }}
            />
            {/* Stronger bottom gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {/* Noise texture */}
            <div className="noise-overlay absolute inset-0 opacity-[0.04] pointer-events-none" />
            <div className="relative z-10 p-6 md:p-7">
              <p className="text-5xl md:text-6xl font-semibold text-white tracking-tight">
                <AnimatedCounter target={300000} suffix="+" hasComma />
              </p>
              <p className="text-xs md:text-sm text-white/70 mt-1">
                community
              </p>
            </div>
          </m.div>
        </FadeInSection>

        {/* 4 — Cities/Countries card */}
        <FadeInSection delay={240}>
          <m.div
            {...cardHover}
            className={`${orangeCard} p-6 md:p-7 flex flex-col justify-between min-h-[180px] md:min-h-[200px]`}
            style={{ boxShadow: orangeInnerGlow }}
            whileHover={{ scale: 1.015, y: -2, boxShadow: `${orangeInnerGlow}, ${hoverGlow}` }}
          >
            {/* Noise texture */}
            <div className="noise-overlay absolute inset-0 opacity-[0.06] pointer-events-none" />
            <Globe className="w-20 h-20 md:w-24 md:h-24 text-primary-foreground/10 absolute top-2 right-2" strokeWidth={0.5} />
            <div className="relative z-10">
              <p className="text-4xl md:text-5xl font-semibold text-primary-foreground tracking-tight">
                <AnimatedCounter target={821} />
              </p>
              <p className="text-[11px] md:text-xs text-primary-foreground/70 mt-0.5">
                cities
              </p>
            </div>
            <div className="relative z-10">
              <p className="text-3xl md:text-4xl font-semibold text-primary-foreground tracking-tight">
                <AnimatedCounter target={13} suffix="+" />
              </p>
              <p className="text-[11px] md:text-xs text-primary-foreground/70 mt-0.5">
                countries
              </p>
            </div>
          </m.div>
        </FadeInSection>

        {/* 5 — Collaborations card */}
        <FadeInSection delay={320}>
          <m.div
            {...cardHover}
            className={`${darkCard} p-6 md:p-7 flex flex-col justify-between min-h-[180px] md:min-h-[200px]`}
            style={{ boxShadow: "none" }}
            whileHover={{ scale: 1.015, y: -2, boxShadow: hoverGlow }}
          >
            <Handshake className="w-8 h-8 text-primary" />
            <div>
              <p className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
                <AnimatedCounter target={3000} suffix="+" hasComma />
              </p>
              <p className="text-[11px] md:text-xs text-muted-foreground mt-1.5 leading-relaxed">
                collaborations enabled
              </p>
            </div>
          </m.div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default ImpactBentoGrid;
