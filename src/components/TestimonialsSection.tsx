import { useEffect, useCallback, useState } from "react";
import FadeInSection from "./FadeInSection";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
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
  fullStory: string;
}

const testimonials: Testimonial[] = [
  {
    image: testimonial1,
    name: "Janani",
    role: "Director",
    context: "Enrolled in the Direction Masterclass",
    pullQuote:
      "I was blown away by the depth of knowledge shared. The instructors were passionate and experienced, providing valuable insights into the art of filmmaking.",
    fullStory:
      "Before joining LevelUp, I had been dabbling with short films for two years, feeling stuck and unsure of how to take my work to the next level. The Direction Masterclass completely changed how I think about storytelling and visual language. From the very first session, I realised I had been approaching scenes from the wrong angle — focusing too much on action and too little on emotion. The instructors broke down complex concepts like blocking, shot composition, and actor direction into frameworks I could immediately apply on set. What surprised me most was the feedback culture — every assignment was dissected with care and specificity, not just generic praise. I started getting callbacks for projects I submitted after the course. Within six months, I directed my first commissioned short for a regional streaming platform. The community that LevelUp built around the course was equally invaluable — I connected with cinematographers, writers, and producers who I continue to collaborate with today. If you're serious about directing, this isn't just a course — it's a career turning point. I recommend it to anyone who wants to move from aspiring to actually working in the industry.",
  },
  {
    image: testimonial2,
    name: "Karthik",
    role: "Filmmaker",
    context: "Took the Filmmaking Masterclass",
    pullQuote:
      "LevelUp Learning's Filmmaking Masterclass is a game-changer. The course content is comprehensive, covering every aspect of filmmaking.",
    fullStory:
      "I came into the Filmmaking Masterclass with a basic understanding of cameras and editing software, but no real grasp of how films actually get made from start to finish. The course bridged that gap completely. We covered everything — from scriptwriting fundamentals and pre-production planning to on-set etiquette and post-production workflows. What stood out was how each module connected to the next. By the time we got to the editing sessions, I understood why certain decisions had been made on the shoot, and vice versa. The guest sessions with working industry professionals gave me an honest picture of what the job actually looks like day-to-day. I stopped romanticising filmmaking and started treating it as a craft with learnable skills. After completing the course, I co-directed a documentary that was screened at a local film festival — something I would never have had the confidence to pursue before. The structured learning path, combined with real-world assignments, made the experience both rigorous and deeply engaging. LevelUp doesn't just teach you to make films. It teaches you to think like a filmmaker, and that shift in mindset has been the most valuable thing I have taken away.",
  },
  {
    image: testimonial4,
    name: "Kishore",
    role: "Photographer",
    context: "Enrolled in the Photography Masterclass",
    pullQuote:
      "LevelUp elevated my skills to a professional level. I particularly liked the emphasis on storytelling through photographs.",
    fullStory:
      "Photography had always been a weekend hobby for me — something I did to decompress from my nine-to-five. After years of posting on Instagram without any real growth or understanding of why certain images worked and others didn't, I decided to invest in the Photography Masterclass. The transformation was immediate. The very first module on light — how to read it, how to use it, and when to fight it — rewired how I see every environment I walk into. The sessions on composition went far beyond the rule of thirds that you find in every free tutorial. We discussed visual weight, leading lines in context, and how the human eye naturally moves through a frame. The emphasis on narrative — building a story within a single still image — was something I hadn't encountered before and it completely changed my approach to portrait and street photography. By the end of the course, I had a portfolio I was genuinely proud of. I started getting freelance inquiries within weeks of sharing the work. The instructors were accessible, thoughtful, and clearly invested in each student's individual growth. LevelUp gave me the technical confidence and the creative vocabulary to call myself a photographer with conviction.",
  },
  {
    image: testimonial8,
    name: "Avantika Sharma",
    role: "Filmmaker",
    context: "BFP Live Program participant",
    pullQuote:
      "Dedicated and focused teachers, present in the moment. This really blurs the online/offline divide and makes it feel like a community.",
    fullStory:
      "I was initially sceptical about a live online filmmaking program — my previous experience with virtual learning had been passive and isolating. The BFP Live Program at LevelUp was nothing like that. From the first session, the energy was collaborative and the instructors were genuinely present, not just reading from slides. Every class felt like a real workshop, with live feedback, group critiques, and spontaneous conversations that went far beyond the scheduled agenda. The program pushed me to make work consistently — short exercises, rapid assignments, and a final project that required real commitment. The accountability of a cohort was something I hadn't expected to value so much, but it made all the difference. Having peers who were at similar stages of their journey, facing the same creative and technical challenges, made the experience feel less lonely and far more dynamic. By the end of the program, I had a short film I was proud enough to submit to festivals. Two of my classmates have since become long-term collaborators. The live format truly erases the distance — I felt as connected to my instructors and peers as I would have in a physical classroom, sometimes even more so.",
  },
  {
    image: testimonial4,
    name: "Michael V",
    role: "Engineering Student",
    context: "BFP Live Program participant",
    pullQuote:
      "It was great learning filmmaking from the scratch. Many processes of films make more sense now after the sessions with industry mentors.",
    fullStory:
      "As an engineering student with zero formal background in film, I was nervous about joining the BFP Live Program. I had a passion for cinema but felt like I was missing a foundational vocabulary that everyone else seemed to already have. From the very first week, that anxiety disappeared. The program was built for people like me — curious, motivated, but starting from the beginning. The mentors were patient and specific in a way that made complex concepts approachable without ever feeling dumbed down. Understanding how a script becomes a shot list, how a shot list becomes a shooting schedule, and how that schedule shapes the final film gave me a clarity I had never had before. I started watching films completely differently — noticing choices I had always felt subconsciously but couldn't name. The industry mentor sessions were particularly revelatory. Hearing real accounts of how productions are structured, how decisions get made under pressure, and how the business side of filmmaking works alongside the creative side was invaluable context. I'm now developing my first short film as a writer-director. I never imagined saying that a year ago. LevelUp made it feel not just possible but inevitable.",
  },
];

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
      <DialogContent className="p-0 gap-0 max-w-3xl w-full overflow-hidden rounded-sm border border-border bg-card flex flex-row max-h-[80vh]">
        {/* Close button */}
        <DialogClose className="absolute right-4 top-4 z-20 w-9 h-9 rounded-sm border border-border bg-background/70 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
          <X className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        {testimonial && (
          <>
            {/* Image — left column */}
            <div className="relative w-[260px] shrink-0">
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
            <div className="flex flex-col justify-start p-8 overflow-y-auto border-l border-border/50">
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
        <FadeInSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
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
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === selectedIndex
                    ? "w-7 bg-primary/30 dot-progress"
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
