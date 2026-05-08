import { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export interface LokeshTestimonial {
  name: string;
  role: string;
  quote: string;
  image?: string;
}

/**
 * Testimonial carousel — clones Framer's "This makes our heart beat faster
 * everyday" pattern: one BIG card pinned at center with two FADED peek
 * cards on either side; auto-advances every 5s; orange progress dots
 * below. Hover pauses the autoplay so users can read the active quote.
 */
export default function TestimonialCarousel({ items }: { items: LokeshTestimonial[] }) {
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "center", containScroll: "trimSnaps", loop: true, slidesToScroll: 1 },
    [autoplay.current]
  );
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        {/* Generous gutter so peek cards are visibly partial on both sides
            of the active one. The active card is wider (60% on desktop)
            with peek cards visible at ~18% each. */}
        <div className="flex gap-5 md:gap-7">
          {items.map((t, i) => {
            const isActive = i === selected;
            return (
              <div
                key={i}
                className={`flex-[0_0_82%] md:flex-[0_0_60%] min-w-0 transition-all duration-500 ${
                  isActive ? "scale-100 opacity-100" : "scale-95 opacity-35"
                }`}
              >
                {/* Card. The active variant gets a richer border, a soft
                    gold inner-shadow, and noticeable elevation. */}
                <div
                  className={`relative rounded-2xl border bg-[#0E0E0E]/95 p-7 md:p-9 h-full transition-all duration-500 ${
                    isActive
                      ? "border-amber-200/25 shadow-[0_30px_80px_-30px_rgba(212,163,108,0.45),inset_0_1px_0_rgba(255,222,179,0.06)]"
                      : "border-white/10"
                  }`}
                >
                  {/* Decorative gold quote mark, top-left */}
                  <span
                    aria-hidden="true"
                    className="absolute top-5 left-6 md:top-7 md:left-9 text-gold font-cinzel text-[42px] md:text-[64px] leading-none select-none"
                    style={{
                      backgroundImage:
                        "linear-gradient(284deg, rgb(126,75,39) 0%, rgb(152,93,51) 17.974%, rgb(255,222,179) 49%, rgb(152,93,51) 73.8563%, rgb(240,187,122) 92%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      opacity: isActive ? 0.7 : 0.3,
                    }}
                  >
                    “
                  </span>
                  <p className="mt-9 md:mt-12 text-base md:text-lg text-white/90 leading-relaxed tracking-[-0.005em]">
                    {t.quote}
                  </p>
                  <div className="mt-6 md:mt-7 flex items-center gap-3 pt-4 border-t border-white/[0.08]">
                    {t.image && (
                      <img
                        src={t.image}
                        alt={t.name}
                        loading="lazy"
                        decoding="async"
                        className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover ring-1 ring-amber-200/30"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm md:text-base font-medium text-white">{t.name}</p>
                      <p className="text-[11px] md:text-[12px] tracking-wide text-white/55">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress dots — gold active state, matches Framer's */}
      <div className="flex justify-center gap-2 mt-7 md:mt-9">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === selected ? "w-10 bg-amber-300/90" : "w-2 bg-white/15 hover:bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
