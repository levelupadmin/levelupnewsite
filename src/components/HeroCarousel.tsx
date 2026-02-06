import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

const slides = [
  {
    poster: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/6899f2de01c2b6f380973a82_Frame%20191%20LK.png",
    alt: "Filmmaking Masterclass preview",
  },
  {
    poster: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/650c1be5224f49f6432aaae6_1.Karthik_Subburaj%20course%20banner.png",
    alt: "Direction Masterclass preview",
  },
  {
    poster: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64f2f14d67e5504737c57ea5_2.Venket_Ram.png",
    alt: "Photography Masterclass preview",
  },
  {
    poster: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64f60ddd91f67b7db8f6716b_3.Anthony_Gonsalvez.png",
    alt: "Film Editing Masterclass preview",
  },
  {
    poster: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64b79ef6d61b238747788c6c_kiran%20website%201.webp",
    alt: "Art Direction Masterclass preview",
  },
  {
    poster: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64b79ef642421ae3cbe004d9_ravi%20website%201.webp",
    alt: "Music Direction Masterclass preview",
  },
];

const HeroCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      slidesToScroll: 1,
    },
    [
      Autoplay({
        delay: 8000,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
      className="relative z-10 mt-4 md:mt-6"
    >
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="relative flex-none w-[92vw] sm:w-[80vw] md:w-[70vw] lg:w-[65vw] px-1.5 md:px-3"
              >
                <div className="relative overflow-hidden rounded-sm">
                  {/* Film grain overlay */}
                  <div
                    className="absolute inset-0 z-20 opacity-[0.04] mix-blend-overlay pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* Video placeholder — uses poster image, ready for real video src */}
                  <video
                    poster={slide.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full aspect-[16/9] object-cover object-center"
                  >
                    {/* Video source will be added when real videos are available */}
                  </video>

                  {/* Fallback image for when video has no src */}
                  <img
                    src={slide.poster}
                    alt={slide.alt}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === selectedIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HeroCarousel;
