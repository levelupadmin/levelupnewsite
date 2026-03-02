import { useState } from "react";
import { m } from "framer-motion";
import { Star, Handshake } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

import IndiaDotsMap from "./IndiaDotsMap";

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

const tileOffsets = [
  { x: -3, y: -3 }, { x: 0, y: -4 }, { x: 3, y: -3 },
  { x: -4, y: 0 },  { x: 0, y: 0 },  { x: 4, y: 0 },
  { x: -3, y: 3 },  { x: 0, y: 4 },  { x: 3, y: 3 },
];

const mosaicContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const mosaicTileVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

const ImpactBentoGrid = () => {
  const [ratingHovered, setRatingHovered] = useState(false);
  const [learnersHovered, setLearnersHovered] = useState(false);
  const [communityHovered, setCommunityHovered] = useState(false);
  const [geoHovered, setGeoHovered] = useState(false);
  const [collabHovered, setCollabHovered] = useState(false);
  const [handshakeVisible, setHandshakeVisible] = useState(false);

  return (
    <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
      {/* Section label */}
      <div className="mb-8 md:mb-10">
        <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">
          Our Impact
        </p>
      </div>

      {/* Ambient amber glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(30 80% 45% / 0.12), transparent 70%)",
        }}
      />

      <div
        className="relative grid grid-cols-1 md:grid-cols-[1fr_1.6fr_1fr] gap-2 md:gap-3"
        style={{ gridTemplateRows: "auto auto" }}
      >
        {/* ═══ 1 — RATING (top-left) ═══ */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.015, y: -2, boxShadow: hoverGlow }}
          onHoverStart={() => setRatingHovered(true)}
          onHoverEnd={() => setRatingHovered(false)}
          className={`${darkCard} p-6 md:p-7 flex flex-col justify-between min-h-[180px] md:min-h-[200px]`}
        >
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: -90 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  delay: 0.3 + i * 0.12,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 260,
                  damping: 15,
                }}
                style={ratingHovered ? { animation: `star-pulse 0.8s ease-in-out ${i * 0.08}s infinite` } : undefined}
              >
                <Star
                  className="w-4 h-4 text-primary"
                  style={{
                    fill: i < 5
                      ? "hsl(var(--primary))"
                      : `hsl(var(--primary) / ${ratingHovered ? 1 : 0.6})`,
                    transition: "fill 0.4s ease",
                  }}
                />
              </m.div>
            ))}
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
              <AnimatedCounter target={4.86} suffix="/5" decimals={2} celebrate />
            </p>
            <p className="text-[11px] md:text-xs text-muted-foreground mt-1.5 leading-relaxed">
              average rating across 9,000+ learners
            </p>
          </div>
        </m.div>

        {/* ═══ 2 — COMMUNITY MOSAIC (center, row-span-2) ═══ */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.015, y: -2, boxShadow: hoverGlow }}
          onHoverStart={() => setCommunityHovered(true)}
          onHoverEnd={() => setCommunityHovered(false)}
          className={`${cardBase} row-span-1 md:row-span-2 relative flex flex-col justify-end min-h-[220px] md:min-h-full h-full`}
        >
          <m.div
            className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5"
            variants={mosaicContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {communityPhotos.map((photo, i) => (
              <m.div
                key={i}
                variants={mosaicTileVariants}
                className="overflow-hidden"
                style={{
                  transform: communityHovered
                    ? `translate(${tileOffsets[i].x}px, ${tileOffsets[i].y}px)`
                    : "translate(0, 0)",
                  transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <img src={photo} alt="" className="w-full h-full object-cover" loading="lazy" />
              </m.div>
            ))}
          </m.div>
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              backgroundColor: `hsl(var(--primary) / ${communityHovered ? 0.15 : 0.3})`,
              mixBlendMode: "multiply",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="noise-overlay absolute inset-0 opacity-[0.04] pointer-events-none" />
          <div className="relative z-10 p-6 md:p-7">
            <p className="text-5xl md:text-6xl font-semibold text-white tracking-tight">
              <AnimatedCounter target={300000} suffix="+" hasComma celebrate />
            </p>
            <p className="text-xs md:text-sm text-white/70 mt-1">community</p>
          </div>
        </m.div>

        {/* ═══ 3 — LEARNERS (top-right, orange) ═══ */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.015, y: -2, boxShadow: `${orangeInnerGlow}, ${hoverGlow}` }}
          onHoverStart={() => setLearnersHovered(true)}
          onHoverEnd={() => setLearnersHovered(false)}
          className={`${orangeCard} p-6 md:p-7 flex flex-col justify-end min-h-[180px] md:min-h-[200px]`}
          style={{ boxShadow: orangeInnerGlow }}
        >
          <div className="noise-overlay absolute inset-0 opacity-[0.06] pointer-events-none" />
          <div
            className="absolute inset-0 opacity-20 animate-ken-burns"
            style={{
              backgroundImage: `url(${community8})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "multiply",
              transformOrigin: "center center",
            }}
          />
          <div className="relative z-10">
            <p className={`text-5xl md:text-6xl lg:text-7xl font-semibold text-primary-foreground tracking-tight ${learnersHovered ? "text-shimmer" : ""}`}>
              <AnimatedCounter target={58746} hasComma celebrate />
            </p>
            <p className="text-xs md:text-sm text-primary-foreground/70 mt-1">paid learners</p>
          </div>
        </m.div>

        {/* ═══ 4 — CITIES/COUNTRIES + India Map (bottom-left, dark) ═══ */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.015, y: -2, boxShadow: hoverGlow }}
          onHoverStart={() => setGeoHovered(true)}
          onHoverEnd={() => setGeoHovered(false)}
          className={`${darkCard} p-5 md:p-6 flex flex-col justify-between min-h-[180px] md:min-h-[200px] relative`}
        >
          {/* India dot map visualization */}
          <div className="absolute inset-0 flex items-center justify-center opacity-80 p-4">
            <IndiaDotsMap isHovered={geoHovered} />
          </div>
          {/* Stats overlaid at bottom */}
          <div className="relative z-10 mt-auto">
            <p className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
              <AnimatedCounter target={821} celebrate />
            </p>
            <p className="text-[11px] md:text-xs text-muted-foreground mt-0.5">cities</p>
            <p className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mt-2">
              <AnimatedCounter target={13} suffix="+" celebrate delay={400} />
            </p>
            <p className="text-[11px] md:text-xs text-muted-foreground mt-0.5">countries</p>
          </div>
        </m.div>

        {/* ═══ 5 — COLLABORATIONS (bottom-right, dark) ═══ */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.015, y: -2, boxShadow: hoverGlow }}
          onHoverStart={() => setCollabHovered(true)}
          onHoverEnd={() => setCollabHovered(false)}
          onViewportEnter={() => setHandshakeVisible(true)}
          className={`${darkCard} p-6 md:p-7 flex flex-col justify-between min-h-[180px] md:min-h-[200px]`}
        >
          <m.div
            key={collabHovered ? "hover" : handshakeVisible ? "enter" : "idle"}
            initial={{ rotate: 0 }}
            animate={
              collabHovered || handshakeVisible
                ? {
                    rotate: [0, -12, 10, -8, 6, -3, 0],
                    transition: { duration: 0.8, ease: [0.36, 0.07, 0.19, 0.97] },
                  }
                : undefined
            }
            className="w-fit"
          >
            <Handshake className="w-8 h-8 text-primary" />
          </m.div>
          <div>
            <p className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
              <AnimatedCounter target={3000} suffix="+" hasComma celebrate />
            </p>
            <p className="text-[11px] md:text-xs text-muted-foreground mt-1.5 leading-relaxed">
              collaborations enabled
            </p>
          </div>
        </m.div>
      </div>
    </div>
  );
};

export default ImpactBentoGrid;
