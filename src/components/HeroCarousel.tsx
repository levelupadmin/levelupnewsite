import { useEffect, useCallback, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

const slides = [
  {
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    alt: "Cinematic reel one",
  },
  {
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    alt: "Cinematic reel two",
  },
  {
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    alt: "Cinematic reel three",
  },
  {
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    alt: "Cinematic reel four",
  },
  {
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    alt: "Cinematic reel five",
  },
  {
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    alt: "Cinematic reel six",
  },
];

const HeroCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

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

  // Ensure all videos play
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.play().catch(() => {});
      }
    });
  }, [selectedIndex]);

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

                  {/* Autoplay video */}
                  <video
                    ref={(el) => { videoRefs.current[index] = el; }}
                    src={slide.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full aspect-[16/9] object-cover object-center bg-card"
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
