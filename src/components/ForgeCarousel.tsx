import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

import forgeFilmmakingBanner from "@/assets/forge-filmmaking-banner.jpg";
import forgeCreatorsBanner from "@/assets/forge-creators-banner.jpg";
import forgeWritingBanner from "@/assets/forge-writing-banner.jpg";

const forgeSlides = [
  {
    image: forgeFilmmakingBanner,
    title: "Forge Filmmaking",
    subtitle: "12-day bootcamp · Make your own short film",
    alt: "Forge Filmmaking retreat banner",
  },
  {
    image: forgeCreatorsBanner,
    title: "Forge Creators",
    subtitle: "Build, collaborate, and ship creative work",
    alt: "Forge Creators retreat banner",
  },
  {
    image: forgeWritingBanner,
    title: "Forge Writing",
    subtitle: "Immersive retreat for writers and storytellers",
    alt: "Forge Writing retreat banner",
  },
];

const ForgeCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      slidesToScroll: 1,
    },
    [
      Autoplay({
        delay: 5000,
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
    >
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex items-center">
            {forgeSlides.map((slide, index) => {
              const isActive = index === selectedIndex;
              return (
                <div
                  key={slide.title}
                  className="relative flex-none px-2 md:px-3 transition-all duration-500"
                  style={{
                    width: isActive ? "70%" : "15%",
                    minWidth: isActive ? "280px" : "80px",
                  }}
                >
                  <div
                    className={`relative overflow-hidden rounded-sm transition-all duration-500 ${
                      isActive ? "shadow-2xl" : "opacity-60"
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full aspect-[21/9] object-cover object-center"
                      loading="lazy"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

                    {/* Text overlay — only on active slide */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 p-4 md:p-8 transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <h3 className="font-serif-display text-lg sm:text-2xl md:text-3xl font-medium text-foreground leading-tight">
                        {slide.title}
                      </h3>
                      <p className="font-sans-body text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">
                        {slide.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-4 md:mt-6">
          {forgeSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === selectedIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Go to ${forgeSlides[index].title}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ForgeCarousel;
