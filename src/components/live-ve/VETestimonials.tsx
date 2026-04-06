import { useRef, useState } from "react";
import FadeInSection from "@/components/FadeInSection";
import { veTestimonialVideos } from "@/data/liveVEData";
import { ChevronLeft, ChevronRight } from "lucide-react";

const VETestimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 400;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    setTimeout(checkScroll, 400);
  };

  return (
    <section className="py-20 md:py-28" style={{ background: "hsl(22 14% 4%)" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <FadeInSection className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-sans-body text-[11px] tracking-[0.2em] uppercase font-semibold mb-6">
            Students' Words
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
            See What Our Students Say<br />About Their Journey
          </h2>
        </FadeInSection>

        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card/80 border border-border/50 flex items-center justify-center text-foreground hover:bg-card transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card/80 border border-border/50 flex items-center justify-center text-foreground hover:bg-card transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {veTestimonialVideos.map((video) => (
              <div
                key={video.vimeoId}
                className="flex-shrink-0 w-[320px] md:w-[380px] snap-start rounded-xl overflow-hidden border border-border/30 bg-card/30"
              >
                <div className="aspect-[9/16] max-h-[480px]">
                  <iframe
                    src={`https://player.vimeo.com/video/${video.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
                    allow="autoplay; fullscreen; picture-in-picture"
                    title={`${video.name} testimonial`}
                    loading="lazy"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <p className="font-sans-body text-sm font-medium text-foreground">{video.name}</p>
                  <p className="font-sans-body text-xs text-muted-foreground">VE Alumni</p>
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
