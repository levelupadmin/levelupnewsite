import { useState } from "react";
import FadeInSection from "./FadeInSection";
import AccentLine from "./AccentLine";
import community1 from "@/assets/community/community-1.png";
import community2 from "@/assets/community/community-2.png";
import community3 from "@/assets/community/community-3.png";
import community4 from "@/assets/community/community-4.png";
import community5 from "@/assets/community/community-5.png";
import community6 from "@/assets/community/community-6.png";

const row1 = [
  { src: community1, alt: "Group photo at venue" },
  { src: community2, alt: "Cafe learning session" },
];
const row2 = [
  { src: community3, alt: "Group selfie indoors" },
  { src: community4, alt: "Hilltop group photo" },
];
const row3 = [
  { src: community5, alt: "Campfire circle session" },
  { src: community6, alt: "Night bonfire moment" },
];

const repeat = <T,>(arr: T[], times: number) =>
  Array.from({ length: times }, () => arr).flat();

const rows = [
  { images: repeat(row1, 6), direction: "scroll-left", duration: "25s" },
  { images: repeat(row2, 6), direction: "scroll-right", duration: "30s" },
  { images: repeat(row3, 6), direction: "scroll-left", duration: "20s" },
];

const CommunitySection = () => {
  const [paused, setPaused] = useState(false);

  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden">
      <AccentLine />
      <div
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsl(38 75% 55% / 0.03) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-[1300px] mx-auto px-6">
        <FadeInSection className="mb-10">
          <div>
            <span className="text-primary text-xs uppercase tracking-[0.25em] font-semibold mb-3 block">
              Dive into our community
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 text-foreground">
              Learn Online, Connect Offline
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg leading-relaxed">
              Engage with other learners, alumni, and mentors and attend community sessions to learn from each other in our curated community.
            </p>
          </div>
        </FadeInSection>
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex flex-col gap-3">
          {rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="flex gap-4 w-max"
              style={{
                animation: `${row.direction} ${row.duration} linear infinite`,
                animationPlayState: paused ? "paused" : "running",
              }}
            >
              {row.images.map((item, i) => (
                <div
                  key={i}
                  className="w-[220px] h-[120px] md:w-[280px] md:h-[160px] rounded-lg overflow-hidden group relative flex-shrink-0"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg ring-1 ring-inset ring-primary/30" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
