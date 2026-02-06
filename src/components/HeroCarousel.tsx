import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const slides = [
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/6899f2de01c2b6f380973a82_Frame%20191%20LK.png",
    label: "Filmmaking Masterclass",
    mentor: "Lokesh Kanagaraj",
    alt: "Lokesh Kanagaraj — Filmmaking Masterclass course banner",
  },
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/650c1be5224f49f6432aaae6_1.Karthik_Subburaj%20course%20banner.png",
    label: "Filmmaking Masterclass",
    mentor: "Karthik Subbaraj",
    alt: "Karthik Subbaraj — Filmmaking Masterclass course banner",
  },
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64f2f14d67e5504737c57ea5_2.Venket_Ram.png",
    label: "Photography Masterclass",
    mentor: "G Venket Ram",
    alt: "G Venket Ram — Photography Masterclass course banner",
  },
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64f60ddd91f67b7db8f6716b_3.Anthony_Gonsalvez.png",
    label: "Film Editing Masterclass",
    mentor: "Anthony Gonsalvez",
    alt: "Anthony Gonsalvez — Film Editing Masterclass course banner",
  },
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64b79ef6d61b238747788c6c_kiran%20website%201.webp",
    label: "Art Direction Masterclass",
    mentor: "DRK Kiran",
    alt: "DRK Kiran — Art Direction Masterclass course banner",
  },
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64b79ef642421ae3cbe004d9_ravi%20website%201.webp",
    label: "Music Direction Masterclass",
    mentor: "Ravi Basrur",
    alt: "Ravi Basrur — Music Direction Masterclass course banner",
  },
];

const HeroCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      slidesToScroll: 1,
      breakpoints: {
        "(min-width: 768px)": { slidesToScroll: 1 },
      },
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
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
      className="relative z-10 mt-6 md:mt-8"
    >
      {/* Carousel with overlay dots */}
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="relative flex-none w-[95vw] sm:w-[80vw] md:w-[70vw] lg:w-[65vw] px-2 md:px-3"
              >
                <div className="relative group overflow-hidden rounded-sm cursor-pointer">
                  {/* Film grain overlay */}
                  <div
                    className="absolute inset-0 z-20 opacity-[0.04] mix-blend-overlay pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* Bottom gradient for text readability */}
                  <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 40%, hsl(220 15% 6% / 0.85) 100%)",
                    }}
                  />

                  {/* Play button indicator */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-14 h-14 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
                      <Play className="w-5 h-5 text-primary fill-primary ml-0.5" />
                    </div>
                  </div>

                  {/* Image */}
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full aspect-[16/9] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading={index < 3 ? "eager" : "lazy"}
                  />

                  {/* Text overlay */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-5">
                    <p className="font-sans-body text-[10px] md:text-xs tracking-[0.2em] uppercase text-primary/80 mb-1">
                      {slide.mentor}
                    </p>
                    <h3 className="font-serif-display text-sm md:text-base lg:text-lg text-hero-headline leading-snug">
                      {slide.label}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress dots - overlaid on carousel */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
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
