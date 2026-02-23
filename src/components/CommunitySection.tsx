import { ArrowLeft, ArrowRight } from "lucide-react";
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
      <div className="max-w-[1300px] mx-auto px-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
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
          <div className="hidden md:flex items-center gap-2 mt-2">
            <button className="w-10 h-10 rounded-md border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-md border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 auto-rows-[140px] md:auto-rows-[160px] gap-3">
          {gridItems.map((item, i) => (
            <div
              key={i}
              className={`${item.className} rounded-lg overflow-hidden`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
