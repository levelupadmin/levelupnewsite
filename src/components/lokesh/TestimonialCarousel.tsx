import { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export interface LokeshTestimonial {
  name: string;
  role: string;
  quote: string;
  image?: string;
}

export default function TestimonialCarousel({ items }: { items: LokeshTestimonial[] }) {
  const autoplay = useRef(
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })
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
        <div className="flex gap-4 md:gap-6">
          {items.map((t, i) => (
            <div key={i} className="flex-[0_0_85%] md:flex-[0_0_42%] min-w-0">
              <div
                className={`rounded-2xl border border-white/10 bg-[#0E0E0E]/95 p-6 md:p-7 h-full transition-opacity duration-500 ${
                  i === selected ? "opacity-100" : "opacity-50"
                }`}
              >
                <p className="font-sans-body text-sm md:text-base text-white/85 leading-relaxed">
                  {t.quote}
                </p>
                <div className="mt-5 flex items-center gap-3">
                  {t.image && (
                    <img
                      src={t.image}
                      alt={t.name}
                      loading="lazy"
                      decoding="async"
                      className="w-11 h-11 rounded-full object-cover ring-1 ring-white/15"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="font-sans-body text-sm font-medium text-white">{t.name}</p>
                    <p className="font-sans-body text-[11px] tracking-wide text-white/50">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === selected ? "w-8 bg-amber-300/80" : "w-2 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
