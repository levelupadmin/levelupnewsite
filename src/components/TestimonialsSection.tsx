import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight } from "lucide-react";

import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import testimonial6 from "@/assets/testimonial-6.jpg";
import testimonial7 from "@/assets/testimonial-7.jpg";
import testimonial8 from "@/assets/testimonial-8.jpg";

interface Testimonial {
  image: string;
  name: string;
  role: string;
  context: string;
  pullQuote: string;
}

const testimonials: Testimonial[] = [
  {
    image: testimonial1,
    name: "Janani",
    role: "Director",
    context: "Enrolled in the Direction Masterclass",
    pullQuote:
      "I was blown away by the depth of knowledge shared. The instructors were passionate and experienced, providing valuable insights into the art of filmmaking.",
  },
  {
    image: testimonial2,
    name: "Karthik",
    role: "Filmmaker",
    context: "Took the Filmmaking Masterclass",
    pullQuote:
      "LevelUp Learning's Filmmaking Masterclass is a game-changer. The course content is comprehensive, covering every aspect of filmmaking.",
  },
  {
    image: testimonial4,
    name: "Kishore",
    role: "Photographer",
    context: "Enrolled in the Photography Masterclass",
    pullQuote:
      "LevelUp elevated my skills to a professional level. I particularly liked the emphasis on storytelling through photographs.",
  },
  {
    image: testimonial8,
    name: "Avantika Sharma",
    role: "Filmmaker",
    context: "BFP Live Program participant",
    pullQuote:
      "Dedicated and focused teachers, present in the moment. This really blurs the online/offline divide and makes it feel like a community.",
  },
  {
    image: testimonial4,
    name: "Michael V",
    role: "Engineering Student",
    context: "BFP Live Program participant",
    pullQuote:
      "It was great learning filmmaking from the scratch. Many processes of films make more sense now after the sessions with industry mentors.",
  },
];

const TestimonialsSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      id="testimonials"
      aria-label="Creator testimonials"
      className="relative bg-background py-12 md:py-16 overflow-hidden"
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, hsl(var(--border)) 50%, transparent 90%)",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 20%, hsl(38 75% 55% / 0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
          <div>
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-medium text-hero-headline leading-[1.15] tracking-tight max-w-xl">
              Real transformations. No scripts, no exaggeration — just{" "}
              <em className="italic font-normal text-primary">
                honest creative growth.
              </em>
            </h2>
          </div>

          <a
            href="#testimonials"
            className="cta-sweep cta-glow inline-flex items-center gap-2.5 px-6 py-3 rounded-sm bg-primary text-primary-foreground font-sans-body text-sm font-medium tracking-wide whitespace-nowrap transition-colors hover:bg-primary/90 shrink-0"
          >
            Read all stories
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Carousel */}
      <div>
        <div className="pl-6 md:pl-12 lg:pl-[calc((100vw-80rem)/2+3rem)]">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {testimonials.map((t, index) => (
                <div
                  key={`${t.name}-${index}`}
                  className="flex-none w-[85vw] sm:w-[75vw] md:w-[820px] pr-5 md:pr-8"
                >
                  <TestimonialSlide testimonial={t} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-6 md:mt-8 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === selectedIndex
                    ? "w-7 bg-primary"
                    : "w-2 bg-foreground/20 hover:bg-foreground/40"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-sans-body text-xs text-muted-foreground tabular-nums">
              {String(selectedIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="w-11 h-11 border border-border rounded-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="w-11 h-11 border border-border rounded-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Testimonial Slide ─── */

const TestimonialSlide = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="group flex flex-col md:flex-row rounded-sm overflow-hidden h-full border border-border/50 min-h-[380px] md:min-h-[420px]">
      <div className="relative md:w-1/2 shrink-0">
        <div className="relative aspect-[4/5] md:aspect-auto md:h-full overflow-hidden">
          <img
            src={testimonial.image}
            alt={`${testimonial.name}, ${testimonial.role}`}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
            <p className="font-serif-display text-lg md:text-xl font-medium text-hero-headline leading-snug">
              {testimonial.name}
            </p>
            <p className="font-sans-body text-[11px] md:text-xs tracking-[0.15em] uppercase text-foreground/50 mt-1">
              {testimonial.role}
            </p>
            <p className="font-sans-body text-xs text-muted-foreground mt-1.5 leading-relaxed">
              {testimonial.context}
            </p>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 bg-card flex flex-col justify-between p-6 md:p-10 border-l-0 md:border-l-2 border-primary/20">
        <div>
          <span className="font-serif-display text-5xl md:text-6xl text-primary/15 leading-none select-none block mb-3">"</span>
          <blockquote className="font-serif-display text-xl md:text-2xl lg:text-3xl text-hero-headline leading-[1.25] italic">
            {testimonial.pullQuote}
          </blockquote>
        </div>

        <a
          href="#testimonials"
          className="cta-underline group inline-flex items-center gap-2 font-sans-body text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mt-6 md:mt-8"
        >
          Read the story
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
};

export default TestimonialsSection;
