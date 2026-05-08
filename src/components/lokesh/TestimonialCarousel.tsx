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
 * Testimonial carousel — matches Framer's "This makes our heart beat
 * faster everyday" pattern (verified via screenshot of the live Framer
 * page):
 *   - One BIG center card (taller, more visual weight) with a subtle
 *     diagonal grain pattern in the bg
 *   - Two PEEK cards on either side, smaller scale + brightness-50% so
 *     they read as "the next/previous quote" without competing
 *   - Auto-advance every 5s; pauses on hover
 *   - 3 progress dots underneath, active dot is gold/orange and wider
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
        <div className="flex gap-3 md:gap-4">
          {items.map((t, i) => {
            const isActive = i === selected;
            return (
              <div
                key={i}
                className={`flex-[0_0_82%] md:flex-[0_0_64%] min-w-0 transition-all duration-500 ease-out ${
                  isActive ? "scale-100" : "scale-[0.92]"
                }`}
                style={{
                  filter: isActive ? "none" : "brightness(0.45)",
                }}
              >
                <div
                  className={`relative rounded-2xl border border-white/10 p-7 md:p-10 h-full transition-all duration-500 ${
                    isActive
                      ? "shadow-[0_30px_80px_-30px_rgba(212,163,108,0.45),inset_0_1px_0_rgba(255,222,179,0.08)]"
                      : ""
                  }`}
                  style={{
                    // Slight diagonal noise/grain pattern matching Framer's textured card bg
                    backgroundColor: "#0E0E0E",
                    backgroundImage: isActive
                      ? "repeating-linear-gradient(135deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 4px)"
                      : "none",
                  }}
                >
                  <p className="text-[15px] md:text-[17px] text-white/95 leading-[1.55] tracking-[-0.005em] font-normal">
                    {t.quote}
                  </p>
                  <div className="mt-7 md:mt-8 flex items-center gap-3 pt-5 border-t border-white/[0.08]">
                    {t.image && (
                      <img
                        src={t.image}
                        alt={t.name}
                        loading="lazy"
                        decoding="async"
                        className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover ring-1 ring-amber-200/35"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="text-[14px] md:text-[15px] font-semibold text-white">{t.name}</p>
                      <p className="text-[11px] md:text-[12px] tracking-wide text-white/55 mt-0.5">
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

      {/* Progress dots — gold active state */}
      <div className="flex justify-center gap-2 mt-7 md:mt-9">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === selected ? "w-10 bg-amber-300/95" : "w-2 bg-white/15 hover:bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
