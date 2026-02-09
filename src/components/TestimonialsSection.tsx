import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight } from "lucide-react";

import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";

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
    name: "Arjun Mehta",
    role: "Filmmaker",
    context: "Was stuck between passion projects and client work",
    pullQuote: "I stopped waiting for permission to make what I wanted.",
  },
  {
    image: testimonial2,
    name: "Sneha Iyer",
    role: "Editor & Colourist",
    context: "Wanted to move beyond technical skill into creative voice",
    pullQuote: "I found a language for the work I was already doing.",
  },
  {
    image: testimonial3,
    name: "Rohan Kapoor",
    role: "Writer & Director",
    context: "Searching for structure without losing artistic freedom",
    pullQuote: "The pressure didn't break me — it showed me what I had.",
  },
  {
    image: testimonial4,
    name: "Priya Sharma",
    role: "Visual Designer",
    context: "Transitioning from corporate design to independent storytelling",
    pullQuote: "I came in as a designer. I left as a storyteller.",
  },
  {
    image: testimonial1,
    name: "Vikram Desai",
    role: "Cinematographer",
    context: "Felt technically proficient but creatively stuck",
    pullQuote: "They didn't teach me how to shoot — they taught me how to see.",
  },
  {
    image: testimonial2,
    name: "Ananya Nair",
    role: "Screenwriter",
    context: "Had dozens of unfinished scripts and no clear process",
    pullQuote: "I finally learned to finish what I start — and mean every word.",
  },
  {
    image: testimonial3,
    name: "Kabir Malhotra",
    role: "Sound Designer",
    context: "Working in isolation without creative peers or feedback",
    pullQuote: "I found my people. The loneliness of creating alone just vanished.",
  },
  {
    image: testimonial4,
    name: "Meera Joshi",
    role: "Documentary Filmmaker",
    context: "Struggled to bridge personal stories with universal themes",
    pullQuote: "They showed me that my story was enough — I just had to trust it.",
  },
  {
    image: testimonial1,
    name: "Siddharth Rao",
    role: "Motion Graphics Artist",
    context: "Wanted to move from commercial work to personal expression",
    pullQuote: "I went from executing briefs to owning my creative direction.",
  },
  {
    image: testimonial2,
    name: "Tara Menon",
    role: "Photographer & Director",
    context: "Looking for mentorship that respected her existing craft",
    pullQuote: "No one told me to start over. They helped me go deeper.",
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
        {/* Section Header — headline left, CTA right */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12"
        >
          <div>
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-medium text-hero-headline leading-[1.15] tracking-tight max-w-xl">
              Real transformations. No scripts, no exaggeration — just{" "}
              <em className="italic font-normal text-primary">
                honest creative growth.
              </em>
            </h2>
          </div>

          <a
            href="#"
            className="cta-sweep cta-glow inline-flex items-center gap-2.5 px-6 py-3 rounded-sm bg-primary text-primary-foreground font-sans-body text-sm font-medium tracking-wide whitespace-nowrap transition-colors hover:bg-primary/90 shrink-0"
          >
            Read all stories
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Carousel — full width, overflows right */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      >
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

        {/* Navigation: dots + arrows */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-6 md:mt-8 flex items-center justify-between">
          {/* Progress dots */}
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

          {/* Arrow buttons */}
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
      </motion.div>
    </section>
  );
};

/* ─── Testimonial Slide ─── */

const TestimonialSlide = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="group flex flex-col md:flex-row rounded-sm overflow-hidden h-full border border-border/50 min-h-[380px] md:min-h-[420px]">
      {/* Photo panel */}
      <div className="relative md:w-1/2 shrink-0">
        <div className="relative aspect-[4/5] md:aspect-auto md:h-full overflow-hidden">
          <img
            src={testimonial.image}
            alt={`${testimonial.name}, ${testimonial.role}`}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            decoding="async"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

          {/* Name / role overlay */}
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

      {/* Quote panel */}
      <div className="md:w-1/2 bg-card flex flex-col justify-between p-6 md:p-10 border-l-0 md:border-l-2 border-primary/20">
        <div>
          <span className="font-serif-display text-5xl md:text-6xl text-primary/15 leading-none select-none block mb-3">"</span>
          <blockquote className="font-serif-display text-xl md:text-2xl lg:text-3xl text-hero-headline leading-[1.25] italic">
            {testimonial.pullQuote}
          </blockquote>
        </div>

        <a
          href="#"
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
