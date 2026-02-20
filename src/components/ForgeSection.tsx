import { PlusCircle, ArrowRight } from "lucide-react";
import forgeLogo from "@/assets/forge-logo.png";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState, useRef } from "react";
import forgeFilmmaking from "@/assets/forge-filmmaking-banner.jpg";
import forgeWriting from "@/assets/forge-writing-banner.jpg";
import forgeCreators from "@/assets/forge-creators-banner.jpg";

const featurePoints = [
{
  headline: "Pressure that transforms",
  description:
  "Not comfort. Not theory. Real creative intensity, shoulder to shoulder."
},
{
  headline: "Mentorship without filters",
  description:
  "Work directly with creators who've shaped the industry. No layers between you and the work."
},
{
  headline: "Offline. Immersive. Real.",
  description:
  "Step away from screens. Live, create, and break through — together, in one place."
}];


const stats = [
{ value: "10", label: "Cities Explored" },
{ value: "25+", label: "Editions" },
{ value: "500+", label: "Dreamers" }];


const forgeCards = [
{
  title: "Forge Filmmaking",
  tag: "10-DAY WORKSHOP",
  location: "Delhi · Bangalore",
  subtitle:
  "Shape raw footage into compelling stories. Learn rhythm, pacing, and the art of emotional beats from working editors.",
  cohort: "Dec 2025",
  image: forgeFilmmaking,
  cta: "https://www.forgebylevelup.com/",
  learnMore: "https://www.forgebylevelup.com/"
},
{
  title: "Forge Writers",
  tag: "12-DAY RETREAT",
  location: "Goa",
  subtitle:
  "Immersive retreat for writers and storytellers. Develop your voice and craft your narrative.",
  cohort: "Jan 2026",
  image: forgeWriting,
  cta: "https://tally.so/r/nPJydd",
  learnMore: "https://www.forgebylevelup.com/writingresidency"
},
{
  title: "Forge Creators",
  tag: "10-DAY BOOTCAMP",
  location: "Mumbai · Delhi",
  subtitle:
  "Build, collaborate, and ship creative work with fellow creators.",
  cohort: "Feb 2026",
  image: forgeCreators,
  cta: "https://creators.forgebylevelup.com/",
  learnMore: "https://creators.forgebylevelup.com/"
}];


const ForgeSection = () => {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      containScroll: "trimSnaps",
      slidesToScroll: 1,
      loop: true
    },
    [autoplayPlugin.current]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <section
      id="forge"
      aria-label="The Forge residency"
      className="relative py-12 md:py-16 overflow-hidden bg-background">

      {/* Accent line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
          "linear-gradient(90deg, transparent 10%, hsl(var(--accent-forge)) 50%, transparent 90%)"
        }} />


      {/* Orange ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
          "radial-gradient(ellipse 80% 50% at 50% 30%, hsl(24 95% 53% / 0.05) 0%, transparent 70%)"
        }} />


      {/* Section header — centered, matching other sections */}
      <div className="text-center px-6 md:px-12 mb-10 md:mb-12">
        <span className="inline-block font-sans-body text-[10px] md:text-xs tracking-[0.15em] uppercase px-3 py-1 rounded-full border border-primary/30 text-primary bg-primary/5 mb-4">
          Offline Bootcamps
        </span>
      </div>

      {/* ─── Top: Split Two-Column Layout ─── */}
      <div className="max-w-[1600px] mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Left Column — Text Block */}
          <div>

            <img
              src={forgeLogo}
              alt="The Forge"
              className="h-16 sm:h-20 md:h-28 lg:h-32 w-auto object-contain" />


            <p className="font-serif-display text-lg md:text-xl text-hero-headline mt-2">
              Learn. Do. <em className="italic font-normal text-primary">Become.</em>
            </p>

            <p className="font-sans-body text-sm md:text-base text-hero-subtext mt-4 md:mt-6 max-w-md leading-relaxed">
              The Forge is an offline, immersive experience built for filmmakers, writers, founders, and creators who want to learn by doing. 

Over an intensive week with practicing mentors, participants move beyond theory — applying what they learn in real time, collaborating with peers, and building a complete project of their own.
            </p>

            {/* Stats row */}
            <div className="flex gap-8 md:gap-10 mt-6 md:mt-8">
              {stats.map((stat) => <div key={stat.label}>
                  <p className="font-serif-display text-2xl md:text-3xl font-medium text-hero-headline">
                    {stat.value}
                  </p>
                  <p className="font-sans-body text-xs text-muted-foreground mt-1 tracking-wide">
                    {stat.label}
                  </p>
                </div>)}
            </div>
          </div>

          {/* Right Column — Feature Points */}
          <div className="flex flex-col gap-6 md:gap-10 md:pt-2">
            {featurePoints.map((point) =>
            <div key={point.headline} className="flex gap-4 items-start">
                <div className="flex-shrink-0 mt-1">
                  <PlusCircle
                  className="w-5 h-5 text-primary"
                  strokeWidth={1.5} />

                </div>
                <div>
                  <h3 className="font-serif-display text-base md:text-lg font-medium text-hero-headline leading-snug">
                    {point.headline}
                  </h3>
                  <p className="font-sans-body text-xs md:text-sm text-muted-foreground mt-1 leading-relaxed max-w-sm">
                    {point.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Horizontal Embla Carousel ─── */}
      <div className="max-w-[1600px] mx-auto px-5 md:px-12 mt-6 md:mt-8">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 md:gap-6">
            {forgeCards.map((card, index) =>
            <div
              key={index}
              className={`flex-[0_0_85%] md:flex-[0_0_65%] min-w-0 transition-opacity duration-500 ${
              index === selectedIndex ? "opacity-100" : "opacity-40"}`
              }>

                <div className="relative aspect-[3/4] md:aspect-[16/10] rounded-sm overflow-hidden group">
                  {/* Background Image */}
                  <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy" />


                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

                  {/* Cohort Badge */}
                  <div className="absolute top-4 right-4 md:top-6 md:right-6">
                    <span className="inline-block bg-background/80 backdrop-blur-sm text-foreground text-[10px] md:text-xs font-sans-body tracking-wide px-3 py-1.5 rounded-full">
                      Next Cohort — {card.cohort}
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                    <p className="font-sans-body text-[10px] md:text-xs tracking-[0.15em] uppercase text-primary mb-1">
                      {card.tag}
                    </p>
                    <p className="font-sans-body text-[10px] md:text-xs text-muted-foreground mb-2">
                      {card.location}
                    </p>
                    <h3 className="font-serif-display text-xl md:text-2xl lg:text-3xl font-medium text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="font-sans-body text-xs md:text-sm text-white/70 max-w-md leading-relaxed mb-4">
                      {card.subtitle}
                    </p>
                    <div className="flex gap-3">
                      <a
                      href={card.cta}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-sans-body text-xs md:text-sm px-4 py-2 rounded-full hover:bg-primary/90 transition-colors">

                        Request an Invite
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                      <a
                      href={card.learnMore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center font-sans-body text-xs md:text-sm px-4 py-2 rounded-full border border-white/30 text-white hover:border-white/60 transition-colors">
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {forgeCards.map((_, index) =>
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
            index === selectedIndex ?
            "w-8 bg-primary" :
            "w-2 bg-muted-foreground/30"}`
            }
            aria-label={`Go to slide ${index + 1}`} />

          )}
        </div>
      </div>
    </section>);

};

export default ForgeSection;