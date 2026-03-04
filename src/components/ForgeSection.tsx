import { ArrowRight, Flame, Users, MapPin } from "lucide-react";
import AccentLine from "./AccentLine";
import FadeInSection from "./FadeInSection";
import forgeLogo from "@/assets/forge-logo.png";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState, useRef } from "react";
import forgeFilmmaking from "@/assets/forge-filmmaking-banner.jpg";

const AnvilHammerIcon = ({ className }: {className?: string;}) =>
<svg
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.5"
  strokeLinecap="round"
  strokeLinejoin="round"
  className={className}>

    {/* Anvil base */}
    <path d="M4 20h16" />
    <path d="M6 20v-2h12v2" />
    <path d="M7 18v-3h10v3" />
    <path d="M5 15h14" />
    {/* Anvil top surface */}
    <path d="M8 15v-2h8v2" />
    <path d="M6 13h12" />
    {/* Hammer */}
    <path d="M12 13V8" />
    <path d="M8 6h8v2H8z" />
    <path d="M12 6V3" />
    {/* Sparks */}
    <path d="M5 11l-2-1" />
    <path d="M19 11l2-1" />
    <path d="M7 9l-1-2" />
    <path d="M17 9l1-2" />
  </svg>;


import forgeWriting from "@/assets/forge-writing-banner.jpg";
import forgeCreators from "@/assets/forge-creators-banner.jpg";

const featurePoints = [
{
  headline: "Learn by doing",
  description:
  "Move beyond theory. Apply what you learn in real time with practicing creators and mentors.",
  icon: Flame,
},
{
  headline: "Build with a community",
  description:
  "Collaborate with like-minded filmmakers, writers, founders, builders, and artists.",
  icon: Users,
},
{
  headline: "Immersive & offline",
  description:
  "Travel, create, and grow over an intensive week in an environment built for breakthroughs.",
  icon: MapPin,
}];


const stats = [
{ value: "10", label: "Cities Explored" },
{ value: "25+", label: "Editions" },
{ value: "500+", label: "Dreamers" }];


const forgeCards = [
{
  title: "Writing Retreat — Edition 5",
  tag: "6-DAY RETREAT",
  location: "Dehradun",
  subtitle:
  "Immersive retreat for writers and storytellers. Develop your voice and craft your narrative. 6 days fully offline.",
  cohort: "Mar 7–12, 2026",
  image: forgeWriting,
  cta: "https://tally.so/r/nPJydd",
  learnMore: "https://www.forgebylevelup.com/writingresidency"
},
{
  title: "Filmmaking Bootcamp — Edition 16",
  tag: "BOOTCAMP",
  location: "Goa",
  subtitle:
  "Shape raw footage into compelling stories. Online Apr 15–23, then offline Apr 25 – May 2.",
  cohort: "Apr 2026",
  image: forgeFilmmaking,
  cta: "https://www.forgebylevelup.com/",
  learnMore: "https://www.forgebylevelup.com/"
},
{
  title: "Filmmaking Bootcamp — Edition 17",
  tag: "BOOTCAMP",
  location: "Goa",
  subtitle:
  "Shape raw footage into compelling stories. Online Apr 17–25, then offline Apr 27 – May 4.",
  cohort: "Apr 2026",
  image: forgeFilmmaking,
  cta: "https://www.forgebylevelup.com/",
  learnMore: "https://www.forgebylevelup.com/"
},
{
  title: "Forge Creators — Edition 5",
  tag: "BOOTCAMP",
  location: "Goa",
  subtitle:
  "Build, collaborate, and ship creative work. Online Apr 28 – May 2, offline May 4–10.",
  cohort: "May 2026",
  image: forgeCreators,
  cta: "https://creators.forgebylevelup.com/",
  learnMore: "https://creators.forgebylevelup.com/"
},
{
  title: "Forge Creators — Edition 6",
  tag: "BOOTCAMP",
  location: "Goa",
  subtitle:
  "Build, collaborate, and ship creative work. Online May 2–8, offline May 10–16.",
  cohort: "May 2026",
  image: forgeCreators,
  cta: "https://creators.forgebylevelup.com/",
  learnMore: "https://creators.forgebylevelup.com/"
},
{
  title: "Forge Creators — Edition 7",
  tag: "BOOTCAMP",
  location: "Bali",
  subtitle:
  "Build, collaborate, and ship creative work. Online May 24–29, offline Jun 1–7.",
  cohort: "May–Jun 2026",
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

      <AccentLine gradient="linear-gradient(90deg, transparent 10%, hsl(var(--accent-forge)) 50%, transparent 90%)" />


      {/* Orange ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
          "radial-gradient(ellipse 80% 50% at 50% 30%, hsl(24 95% 53% / 0.05) 0%, transparent 70%)"
        }} />



      {/* Section tag */}
      <FadeInSection className="text-center px-5 md:px-12 mb-4">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[hsl(15_65%_55%/0.25)] bg-[hsl(15_65%_55%/0.06)] text-[11px] tracking-[0.18em] uppercase font-sans-body text-[hsl(15_65%_55%/0.85)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(15_65%_55%/0.65)]" />
          Offline Residencies
        </span>
      </FadeInSection>

      {/* ─── Top: Split Two-Column Layout ─── */}
      <FadeInSection delay={100} className="max-w-[1600px] mx-auto px-5 md:px-12 text-center">
        <img
          src={forgeLogo}
          alt="The Forge"
          className="h-16 sm:h-20 md:h-28 lg:h-32 w-auto object-contain mx-auto" />

        <p className="font-serif-display text-lg md:text-xl text-hero-headline mt-2">
          <em className="not-italic font-normal text-gradient-amber">Learn. Do. Become.</em>
        </p>

        <p className="font-sans-body text-sm md:text-base text-hero-subtext mt-4 md:mt-6 max-w-2xl mx-auto leading-relaxed">
          The Forge is an offline, immersive learning experience that brings together travel, hands-on creation, and a like-minded community — built for filmmakers, writers, founders, builders, artists, and creators.
        </p>

        <p className="font-sans-body text-sm md:text-base text-hero-subtext mt-3 max-w-2xl mx-auto leading-relaxed">
          Over an intensive week with practicing creators and mentors, participants move beyond theory. They apply what they learn in real time, collaborate with peers, and build a complete project of their own.
        </p>

        {/* Feature points — 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto mt-8 md:mt-12">
          {featurePoints.map((point, i) => (
            <div key={i} className="text-center">
              <point.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <h3 className="font-serif-display text-base md:text-lg font-medium text-hero-headline leading-snug">
                {point.headline}
              </h3>
              <p className="font-sans-body text-xs md:text-sm text-muted-foreground mt-2 leading-relaxed max-w-xs mx-auto">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </FadeInSection>

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
                  <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 md:top-6 md:right-6">
                    <span className="inline-block bg-background/80 backdrop-blur-sm text-foreground text-[10px] md:text-xs font-sans-body tracking-wide px-3 py-1.5 rounded-full">
                      Next Cohort — {card.cohort}
                    </span>
                  </div>
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
                      className="inline-flex items-center gap-2 bg-primary text-background font-sans-body text-xs md:text-sm font-medium px-4 py-2 rounded-full hover:bg-primary/90 transition-colors">
                        Apply Now
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

      {/* Stats — 3-column grid */}
      <FadeInSection className="max-w-3xl mx-auto px-5 md:px-12 mt-10 md:mt-14">
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif-display text-3xl md:text-5xl font-bold text-hero-headline">
                {stat.value}
              </p>
              <p className="font-sans-body text-xs md:text-sm text-muted-foreground mt-1 tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </FadeInSection>
    </section>);

};

export default ForgeSection;