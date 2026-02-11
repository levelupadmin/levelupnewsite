import { useEffect, useCallback, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

import heroPoster1 from "@/assets/hero-poster-1.jpg";
import heroPoster2 from "@/assets/hero-poster-2.jpg";
import heroPoster3 from "@/assets/hero-poster-3.jpg";
import heroPoster4 from "@/assets/hero-poster-4.jpg";
import heroPoster5 from "@/assets/hero-poster-5.jpg";
import heroPoster6 from "@/assets/hero-poster-6.jpg";

const slides = [
  {
    video: "/videos/pvr-trailer.mp4",
    poster: heroPoster1,
    alt: "PVR Trailer - LevelUp filmmaking showcase",
  },
  {
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: heroPoster2,
    alt: "Students collaborating on a short film set",
  },
  {
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: heroPoster3,
    alt: "A creator reviewing footage during an editing workshop",
  },
  {
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    poster: heroPoster4,
    alt: "Live mentoring session with a working filmmaker",
  },
  {
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    poster: heroPoster5,
    alt: "Camera and lighting setup for a practical exercise",
  },
  {
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    poster: heroPoster6,
    alt: "Storytelling workshop in progress at a LevelUp retreat",
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
        delay: 5000,
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

  // Only play active + next slide, pause all others
  useEffect(() => {
    const total = slides.length;
    const nextIndex = (selectedIndex + 1) % total;

    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === selectedIndex || index === nextIndex) {
        // Load and play active + next
        if (video.preload !== "auto") {
          video.preload = "auto";
        }
        video.play().catch(() => {});
      } else {
        // Pause and free bandwidth for distant slides
        video.pause();
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

                  {/* Deferred video — preload="none" by default, upgraded for active+next */}
                  <video
                    ref={(el) => { videoRefs.current[index] = el; }}
                    src={slide.video}
                    poster={slide.poster}
                    autoPlay={index === 0}
                    muted
                    loop
                    playsInline
                    preload="none"
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
              aria-label={`Go to slide ${index + 1}: ${slides[index].alt}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HeroCarousel;
