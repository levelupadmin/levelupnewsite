import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import forgeFilmmakingBanner from "@/assets/forge-filmmaking-banner.jpg";
import forgeCreatorsBanner from "@/assets/forge-creators-banner.jpg";
import forgeWritingBanner from "@/assets/forge-writing-banner.jpg";
import forge1 from "@/assets/forge-1.jpg";
import forge2 from "@/assets/forge-2.jpg";
import forge3 from "@/assets/forge-3.jpg";

interface TabData {
  value: string;
  label: string;
  heading: string;
  description: string;
  images: { src: string; alt: string }[];
}

const tabsData: TabData[] = [
  {
    value: "filmmaking",
    label: "Filmmaking",
    heading: "Forge Filmmaking Bootcamp",
    description:
      "An intensive 12-day hands-on bootcamp where you'll write, shoot, and edit your own short film alongside industry mentors. From script to screen, gain real-world experience in cinematography, directing, and post-production.",
    images: [
      { src: forgeFilmmakingBanner, alt: "Filmmaking bootcamp in action" },
      { src: forge1, alt: "Behind the scenes filmmaking" },
      { src: forge2, alt: "Collaborative film production" },
    ],
  },
  {
    value: "writing",
    label: "Writing",
    heading: "Immersive Writing Retreats",
    description:
      "Escape the noise and sharpen your storytelling craft in focused, multi-day retreats. Work closely with published authors and screenwriters to develop your voice, structure compelling narratives, and finish what you start.",
    images: [
      { src: forgeWritingBanner, alt: "Writing retreat session" },
      { src: forge3, alt: "Collaborative writing workshop" },
      { src: forge1, alt: "Writers at work" },
    ],
  },
  {
    value: "creators",
    label: "Creators",
    heading: "Creator Workshops",
    description:
      "Build, collaborate, and ship creative work in a high-energy environment designed for modern creators. Whether you're a YouTuber, podcaster, or digital artist, these workshops help you level up your craft and grow your audience.",
    images: [
      { src: forgeCreatorsBanner, alt: "Creator workshop environment" },
      { src: forge2, alt: "Creators collaborating" },
      { src: forge3, alt: "Creative production setup" },
    ],
  },
];

const TabCarousel = ({ images }: { images: { src: string; alt: string }[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
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
    <div>
      <div ref={emblaRef} className="overflow-hidden rounded-xl">
        <div className="flex">
          {images.map((img, i) => (
            <div key={i} className="flex-none w-full min-w-0">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === selectedIndex
                ? "w-8 bg-primary"
                : "w-2 bg-foreground/20 hover:bg-foreground/40"
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const ProgramsTabsSection = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-8 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto"
      >
        <Tabs defaultValue="filmmaking" className="w-full">
          <TabsList className="bg-transparent w-full justify-center gap-1 md:gap-2 mb-6 md:mb-8 h-auto p-0">
            {tabsData.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="font-sans-body text-sm md:text-base px-4 md:px-6 py-2.5 rounded-none bg-transparent text-muted-foreground border-b-2 border-transparent transition-all duration-300 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-bold data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none hover:text-foreground/80"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabsData.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-0">
              <div className="bg-[hsl(0_0%_7%)] rounded-2xl p-6 md:p-10 lg:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* Left — Text */}
                  <div className="flex flex-col gap-5 order-2 md:order-1">
                    <h3 className="font-serif-display text-2xl md:text-3xl lg:text-4xl font-medium text-foreground leading-tight">
                      {tab.heading}
                    </h3>
                    <p className="font-sans-body text-sm md:text-base text-muted-foreground leading-relaxed">
                      {tab.description}
                    </p>
                    <div className="mt-2">
                      <button className="bg-white text-background rounded-full px-6 py-3 font-sans-body font-medium text-sm hover:bg-white/90 transition-colors">
                        Learn more
                      </button>
                    </div>
                  </div>

                  {/* Right — Carousel */}
                  <div className="order-1 md:order-2">
                    <TabCarousel images={tab.images} />
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </section>
  );
};

export default ProgramsTabsSection;
