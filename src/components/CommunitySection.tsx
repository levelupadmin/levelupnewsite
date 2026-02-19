import { ArrowLeft, ArrowRight } from "lucide-react";

import masterclass1 from "@/assets/masterclass-1.jpg";
import masterclass2 from "@/assets/masterclass-2.jpg";
import masterclass3 from "@/assets/masterclass-3.jpg";
import masterclass4 from "@/assets/masterclass-4.jpg";
import masterclass5 from "@/assets/masterclass-5.jpg";
import masterclass6 from "@/assets/masterclass-6.jpg";
import forge1 from "@/assets/forge-1.jpg";
import forge2 from "@/assets/forge-2.jpg";
import forge3 from "@/assets/forge-3.jpg";
import forge4 from "@/assets/forge-4.jpg";
import carousel1 from "@/assets/carousel-1.jpg";

const gridItems = [
  { src: masterclass1, alt: "Community event 1", className: "col-span-1 row-span-2" },
  { src: masterclass2, alt: "Community event 2", className: "col-span-1 row-span-1" },
  { src: forge1, alt: "Community event 3", className: "col-span-1 row-span-2" },
  { src: masterclass3, alt: "Community event 4", className: "col-span-1 row-span-1" },
  { src: forge2, alt: "Community event 5", className: "col-span-1 row-span-1" },
  { src: masterclass4, alt: "Community event 6", className: "col-span-1 row-span-1" },
  { src: forge3, alt: "Community event 7", className: "col-span-1 row-span-1" },
  { src: masterclass5, alt: "Community event 8", className: "col-span-1 row-span-1" },
  { src: carousel1, alt: "Community event 9", className: "col-span-1 row-span-2" },
  { src: forge4, alt: "Community event 10", className: "col-span-1 row-span-1" },
  { src: masterclass6, alt: "Community event 11", className: "col-span-1 row-span-1" },
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
              className={`${item.className} rounded-lg overflow-hidden ${i > 7 ? "hidden md:block" : ""}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
