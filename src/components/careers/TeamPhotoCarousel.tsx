import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEmblaSelect } from "@/hooks/useEmblaSelect";

interface TeamCard {
  name: string;
  achievement: string;
}

const TeamPhotoCarousel = ({ cards }: { cards: TeamCard[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const selectedIndex = useEmblaSelect(emblaApi);
  const total = cards.length;

  return (
    <div>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex items-end gap-3 md:gap-5">
          {cards.map((card, i) => {
            const distance = Math.min(
              Math.abs(i - selectedIndex),
              total - Math.abs(i - selectedIndex)
            );
            const isCenter = distance === 0;
            const isNear = distance === 1;
            const height = isCenter
              ? "h-[400px] md:h-[520px]"
              : isNear
              ? "h-[340px] md:h-[440px]"
              : "h-[280px] md:h-[360px]";
            const width = isCenter
              ? "min-w-[220px] md:min-w-[340px]"
              : isNear
              ? "min-w-[180px] md:min-w-[260px]"
              : "min-w-[140px] md:min-w-[200px]";

            return (
              <div
                key={card.name}
                className={`relative flex-shrink-0 ${width} ${height} rounded-xl overflow-hidden shadow-lg transition-all duration-500 ${
                  !isCenter && !isNear ? "opacity-50" : ""
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#f0ede8] to-[#e5e1da]" />
                <div className="absolute inset-0 flex items-end justify-center">
                  <div className="w-[60%] h-[70%] bg-[#d8d4cc] rounded-t-full" />
                </div>
                {(isCenter || isNear) && (
                  <div className="absolute top-0 left-0 right-0 p-3 md:p-5 z-10">
                    <span className="inline-block px-2.5 py-1 text-[10px] md:text-xs tracking-wide font-medium rounded-md bg-white/60 text-[#1A1208]/70 backdrop-blur-sm mb-2">
                      {card.name}
                    </span>
                    <p
                      className={`text-[#1A1208] leading-snug ${
                        isCenter
                          ? "text-lg md:text-2xl font-bold"
                          : "text-sm md:text-base font-semibold"
                      }`}
                    >
                      {card.achievement}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === selectedIndex
                ? "w-8 bg-[#FF6500]"
                : "w-2 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamPhotoCarousel;
