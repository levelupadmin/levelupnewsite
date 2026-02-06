import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

import carousel1 from "@/assets/carousel-1.jpg";
import carousel2 from "@/assets/carousel-2.jpg";
import carousel3 from "@/assets/carousel-3.jpg";
import carousel4 from "@/assets/carousel-4.jpg";
import carousel5 from "@/assets/carousel-5.jpg";

const slides = [
  {
    image: carousel1,
    label: "Cinematography Masterclass",
    mentor: "Anil Mehta",
    alt: "Filmmaker operating a professional camera on set with warm amber lighting",
  },
  {
    image: carousel2,
    label: "The Art of Editing",
    mentor: "Sreekar Prasad",
    alt: "Video editor working at a multi-monitor editing suite in a dark room",
  },
  {
    image: carousel3,
    label: "The Forge — Creative Residency",
    mentor: "Cohort 04",
    alt: "Creative workshop with a mentor teaching young filmmakers",
  },
  {
    image: carousel4,
    label: "Directing for Screen",
    mentor: "Shoojit Sircar",
    alt: "Director calling action on a film set with dramatic amber lighting",
  },
  {
    image: carousel5,
    label: "Creator Essentials",
    mentor: "Live Workshop",
    alt: "Young content creator recording with professional camera setup",
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
                className="relative flex-none w-[92vw] sm:w-[70vw] md:w-[60vw] lg:w-[55vw] px-2 md:px-3"
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
