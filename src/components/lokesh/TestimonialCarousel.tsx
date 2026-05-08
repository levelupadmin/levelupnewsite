import { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export interface LokeshTestimonial {
  name: string;
  role: string;
  quote: string;
  image?: string;
  /**
   * Star rating 1–5. Renders as a row of filled stars above the
   * reviewer's name. Defaults to 5 when omitted (matches the existing
   * carousel where every quote is treated as a 5-star review).
   */
  rating?: number;
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
  // Wave 2: stopOnInteraction true so a tap on mobile actually pauses
  // the autoplay (was false — mobile users had no way to read longer
  // quotes). stopOnMouseEnter still pauses on desktop hover.
  const autoplay = useRef(
    Autoplay({ delay: 6500, stopOnInteraction: true, stopOnMouseEnter: true })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "center", containScroll: "trimSnaps", loop: true, slidesToScroll: 1 },
    [autoplay.current]
  );
  const [selected, setSelected] = useState(0);
  // Pause autoplay if the user prefers reduced motion (Wave 2)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches && autoplay.current) autoplay.current.stop();
    const onChange = () => {
      if (mq.matches && autoplay.current) autoplay.current.stop();
      else if (autoplay.current) autoplay.current.play();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

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
                aria-hidden={!isActive}
                className={`flex-[0_0_82%] md:flex-[0_0_64%] min-w-0 transition-all duration-500 ease-out ${
                  isActive ? "scale-100" : "scale-[0.94]"
                }`}
                style={{
                  // Wave 2: brightened from 0.45 → 0.6 so peek cards
                  // still read as "context" but inactive text clears
                  // WCAG 4.5:1 against the dark page bg even when faded.
                  filter: isActive ? "none" : "brightness(0.6)",
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
                      {/* ★★★★★ row above the name. Defaults to 5 when
                          rating is omitted so existing testimonials
                          on Lokesh keep working. */}
                      <p
                        className="text-[12px] md:text-[13px] tracking-[0.08em] text-amber-300/95 leading-none"
                        aria-label={`${t.rating ?? 5} out of 5 stars`}
                      >
                        {"★".repeat(Math.max(1, Math.min(5, t.rating ?? 5)))}
                        <span className="text-white/15">{"★".repeat(5 - Math.max(1, Math.min(5, t.rating ?? 5)))}</span>
                      </p>
                      <p className="mt-1 text-[14px] md:text-[15px] font-semibold text-white">{t.name}</p>
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

      {/* Progress dots — gold active state. Wave 2: bumped tap target
          from h-1.5 → 24×24 hit area via padding so each dot meets
          WCAG 2.5.5 AAA touch-target spec. The visible dot stays small
          (h-1.5) inside a transparent 24×24 button. */}
      <div className="flex justify-center gap-2 mt-7 md:mt-9" role="tablist" aria-label="Testimonials">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            aria-selected={i === selected}
            role="tab"
            className="relative inline-flex items-center justify-center w-6 h-6 group"
          >
            <span
              aria-hidden="true"
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === selected ? "w-10 bg-amber-300/95" : "w-2 bg-white/15 group-hover:bg-white/30"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
