import { useRef } from "react";
import FadeInSection from "@/components/FadeInSection";
import { veTestimonialCards } from "@/data/liveVEData";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const VETestimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 overflow-hidden" style={{ background: "hsl(160 8% 6%)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <FadeInSection className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight">
            See What Our Students Say
          </h2>
        </FadeInSection>

        <div className="relative">
          <button onClick={() => scroll("left")} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => scroll("right")} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white">
            <ChevronRight className="w-5 h-5" />
          </button>

          <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none" }}>
            {veTestimonialCards.map((card, i) => (
              <div key={card.vimeoId} className="flex-shrink-0 w-[200px] md:w-[260px] rounded-xl overflow-hidden border border-white/10 relative group">
                <div className="aspect-[3/4] relative">
                  <img src={card.image} alt={card.name} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-purple-500/20" />
                  <div className="absolute top-3 left-3">
                    <div className="w-8 h-8 rounded bg-black/60 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" fill="white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <p className="text-white text-sm font-bold tracking-wider uppercase">{card.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VETestimonials;
