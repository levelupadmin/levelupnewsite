import { m } from "framer-motion";
import { Star, Handshake, Globe } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

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

const cardHover = {
  whileHover: { scale: 1.02, y: -4 },
  transition: { type: "spring" as const, stiffness: 300, damping: 20 },
};

const ImpactBentoGrid = () => {
  return (
    <div className="max-w-6xl mx-auto px-5 md:px-10 py-14 md:py-20">
      {/* 
        Reference layout: 3 columns 
        Col 1: Rating (row1) + Cities (row2)
        Col 2: Paid Learners (row1) + Collaborations (row2)  
        Col 3: Community (spans both rows)
      */}
      <div
        className="grid grid-cols-2 md:grid-cols-[1fr_1.4fr_1.2fr] gap-3 md:gap-4"
        style={{
          gridTemplateRows: "auto auto",
        }}
      >
        {/* 1 — Rating card (warm dark, top-left) */}
        <m.div
          {...cardHover}
          className="rounded-2xl border border-primary/25 p-6 md:p-7 flex flex-col justify-between min-h-[180px] md:min-h-[200px]"
          style={{ background: "hsl(24 30% 12%)" }}
        >
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <Star className="w-4 h-4 text-primary fill-primary" />
            <Star className="w-4 h-4 text-primary fill-primary" />
            <Star className="w-4 h-4 text-primary fill-primary" />
            <Star className="w-4 h-4 text-primary fill-primary/60" />
          </div>
          <div>
            <p className="font-serif-display text-4xl md:text-5xl font-medium text-foreground tracking-tight">
              <AnimatedCounter target={4.86} suffix="/5" decimals={2} />
            </p>
            <p className="font-sans-body text-[11px] md:text-xs text-muted-foreground mt-1.5 leading-relaxed">
              average rating across 9,000+ learners
            </p>
          </div>
        </m.div>

        {/* 2 — Paid learners card (orange, top-center) */}
        <m.div
          {...cardHover}
          className="rounded-2xl bg-primary relative overflow-hidden p-6 md:p-7 flex flex-col justify-end min-h-[180px] md:min-h-[200px]"
        >
          {/* Background photo overlay */}
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
            <p className="font-serif-display text-5xl md:text-6xl lg:text-7xl font-medium text-primary-foreground tracking-tight">
              <AnimatedCounter target={58746} hasComma />
            </p>
            <p className="font-sans-body text-xs md:text-sm text-primary-foreground/70 mt-1">
              paid learners
            </p>
          </div>
        </m.div>

        {/* 3 — Community card (right column, spans 2 rows) */}
        <m.div
          {...cardHover}
          className="col-span-2 md:col-span-1 md:row-span-2 rounded-2xl relative overflow-hidden flex flex-col justify-end min-h-[220px] md:min-h-0"
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
          {/* Orange overlay */}
          <div
            className="absolute inset-0 bg-primary/60"
            style={{ mixBlendMode: "multiply" }}
          />
          {/* Gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="relative z-10 p-6 md:p-7">
            <p className="font-serif-display text-5xl md:text-6xl font-medium text-white tracking-tight">
              <AnimatedCounter target={300000} suffix="+" hasComma />
            </p>
            <p className="font-sans-body text-xs md:text-sm text-white/70 mt-1">
              community
            </p>
          </div>
        </m.div>

        {/* 4 — Cities/Countries card (orange, bottom-left) */}
        <m.div
          {...cardHover}
          className="rounded-2xl bg-primary relative overflow-hidden p-6 md:p-7 flex flex-col justify-between min-h-[180px] md:min-h-[200px]"
        >
          <Globe className="w-20 h-20 md:w-24 md:h-24 text-primary-foreground/10 absolute top-2 right-2" strokeWidth={0.5} />
          <div className="relative z-10">
            <p className="font-serif-display text-4xl md:text-5xl font-medium text-primary-foreground tracking-tight">
              <AnimatedCounter target={821} />
            </p>
            <p className="font-sans-body text-[11px] md:text-xs text-primary-foreground/70 mt-0.5">
              cities
            </p>
          </div>
          <div className="relative z-10">
            <p className="font-serif-display text-3xl md:text-4xl font-medium text-primary-foreground tracking-tight">
              <AnimatedCounter target={13} suffix="+" />
            </p>
            <p className="font-sans-body text-[11px] md:text-xs text-primary-foreground/70 mt-0.5">
              countries
            </p>
          </div>
        </m.div>

        {/* 5 — Collaborations card (warm dark, bottom-center) */}
        <m.div
          {...cardHover}
          className="rounded-2xl border border-primary/25 p-6 md:p-7 flex flex-col justify-between min-h-[180px] md:min-h-[200px]"
          style={{ background: "hsl(24 30% 12%)" }}
        >
          <Handshake className="w-8 h-8 text-primary" />
          <div>
            <p className="font-serif-display text-4xl md:text-5xl font-medium text-foreground tracking-tight">
              <AnimatedCounter target={3000} suffix="+" hasComma />
            </p>
            <p className="font-sans-body text-[11px] md:text-xs text-muted-foreground mt-1.5 leading-relaxed">
              collaborations enabled
            </p>
          </div>
        </m.div>
      </div>
    </div>
  );
};

export default ImpactBentoGrid;
