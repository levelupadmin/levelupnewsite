import { useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import FadeInSection from "./FadeInSection";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, ArrowUpRight, ArrowRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { testimonials as allTestimonials } from "@/data/testimonials";

interface Testimonial {
  image: string;
  name: string;
  role: string;
  context: string;
  pullQuote: string;
  fullStory: string;
}

// Use first 5 for homepage carousel
const testimonials: Testimonial[] = allTestimonials.slice(0, 5);

/* ─── Modal ─── */

const TestimonialModal = ({
  testimonial,
  onClose,
}: {
  testimonial: Testimonial | null;
  onClose: () => void;
}) => {
  return (
    <Dialog open={!!testimonial} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 gap-0 max-w-3xl w-full overflow-hidden rounded-sm border border-border bg-card flex flex-col md:flex-row max-h-[80vh]">
        {/* Close button */}
        <DialogClose className="absolute right-4 top-4 z-20 w-9 h-9 rounded-sm border border-border bg-background/70 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
          <X className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        {testimonial && (
          <>
            {/* Image — left column */}
            <div className="relative w-full md:w-[260px] shrink-0 h-48 md:h-auto">
              <img
                src={testimonial.image}
                alt={`${testimonial.name}, ${testimonial.role}`}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              {/* Bottom gradient with name overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-serif-display text-lg font-medium text-hero-headline leading-snug">
                  {testimonial.name}
                </p>
                <p className="font-sans-body text-[10px] tracking-[0.15em] uppercase text-foreground/50 mt-1">
                  {testimonial.role}
                </p>
                <p className="font-sans-body text-[11px] text-muted-foreground mt-1 leading-relaxed">
                  {testimonial.context}
                </p>
              </div>
            </div>

            {/* Content — right column */}
            <div className="flex flex-col justify-start p-6 md:p-8 overflow-y-auto border-t md:border-t-0 md:border-l border-border/50">
              {/* Decorative quote */}
              <span className="font-serif-display text-6xl text-primary/15 leading-none select-none block -mb-3">
                "
              </span>
              {/* Story */}
              <p className="font-sans-body text-sm text-foreground/75 leading-[1.8] tracking-[0.01em]">
                {testimonial.fullStory}
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

/* ─── Main Section ─── */

const TestimonialsSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [activeTestimonial, setActiveTestimonial] = useState<Testimonial | null>(null);

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
        <FadeInSection className="flex flex-col items-center text-center gap-6 mb-10 md:mb-12">
          <div>
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-medium text-hero-headline leading-[1.15] tracking-tight max-w-xl mx-auto">
              Real transformations. No scripts, no exaggeration — just{" "}
              <em className="not-italic font-normal text-gradient-amber">
                honest creative growth.
              </em>
            </h2>
          </div>

        </FadeInSection>
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
                  <TestimonialSlide
                    testimonial={t}
                    onReadStory={() => setActiveTestimonial(t)}
                  />
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
                key={`${index}-${selectedIndex}`}
                onClick={() => emblaApi?.scrollTo(index)}
                className="py-4 px-1 flex items-center"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <span className={`h-1 rounded-full transition-all duration-500 ${
                  index === selectedIndex
                    ? "w-7 bg-primary/30 dot-progress"
                    : "w-2 bg-foreground/20 hover:bg-foreground/40"
                }`} />
              </button>
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

      {/* See all reviews link */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-6">
        <Link
          to="/reviews"
          className="inline-flex items-center gap-2 font-sans-body text-sm text-muted-foreground hover:text-foreground transition-colors cta-underline"
        >
          See all reviews
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Story Modal */}
      <TestimonialModal
        testimonial={activeTestimonial}
        onClose={() => setActiveTestimonial(null)}
      />
    </section>
  );
};

/* ─── Testimonial Slide ─── */

const TestimonialSlide = ({
  testimonial,
  onReadStory,
}: {
  testimonial: Testimonial;
  onReadStory: () => void;
}) => {
  return (
    <div className="group flex flex-col md:flex-row rounded-sm overflow-hidden h-full border border-border/50 min-h-[380px] md:min-h-[420px] transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_20px_2px_hsl(38_75%_55%/0.15)]">
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

        <button
          onClick={onReadStory}
          className="cta-underline group inline-flex items-center gap-2 font-sans-body text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mt-6 md:mt-8 text-left"
        >
          Read the story
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialsSection;
