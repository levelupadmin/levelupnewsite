import FadeInSection from "./FadeInSection";
import AccentLine from "./AccentLine";
import community1 from "@/assets/community/community-1.png";
import community2 from "@/assets/community/community-2.png";
import community3 from "@/assets/community/community-3.png";
import community4 from "@/assets/community/community-4.png";
import community5 from "@/assets/community/community-5.png";
import community6 from "@/assets/community/community-6.png";

const gridItems = [
  { src: community1, alt: "Group photo at venue", className: "col-span-2 row-span-1" },
  { src: community2, alt: "Cafe learning session", className: "col-span-1 row-span-2" },
  { src: community3, alt: "Group selfie indoors", className: "col-span-1 row-span-1" },
  { src: community5, alt: "Campfire circle session", className: "col-span-1 row-span-2" },
  { src: community4, alt: "Hilltop group photo", className: "col-span-2 row-span-1" },
  { src: community6, alt: "Night bonfire moment", className: "col-span-1 row-span-1" },
  { src: community3, alt: "Community gathering", className: "col-span-1 row-span-1" },
  { src: community1, alt: "Creators together", className: "col-span-2 row-span-1" },
  { src: community6, alt: "Evening bonfire hangout", className: "col-span-1 row-span-1" },
  { src: community4, alt: "Outdoor group moment", className: "col-span-1 row-span-1" },
];

const CommunitySection = () => {
  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden">
      <AccentLine />
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsl(38 75% 55% / 0.03) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-[1300px] mx-auto px-6">
        {/* Header */}
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

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 auto-rows-[140px] md:auto-rows-[160px] gap-3">
          {gridItems.map((item, i) => (
            <FadeInSection
              key={i}
              delay={i * 60}
              className={`${item.className} rounded-lg overflow-hidden group relative`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
              {/* Hover overlay with amber glow */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg ring-1 ring-inset ring-primary/30" />
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
