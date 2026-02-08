import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { useParallax } from "@/hooks/use-parallax";

import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";

interface Testimonial {
  image: string;
  name: string;
  role: string;
  context: string;
  pullQuote?: string;
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
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" aria-label="Creator testimonials" className="relative bg-background py-12 md:py-16 overflow-hidden">
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
        {/* Section Header — horizontal reveal */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10 md:mb-12"
        >
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-medium text-hero-headline leading-[1.15] tracking-tight max-w-lg">
            Journeys that{" "}
            <em className="italic font-normal text-primary">speak</em> for
            themselves
          </h2>
          <p className="font-sans-body text-sm md:text-base text-hero-subtext mt-4 max-w-md leading-relaxed">
            Real creators. Real turning points. No scripts.
          </p>
        </motion.div>

        {/* Testimonial Cards Grid — staggered from alternating directions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Soft CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-10 md:mt-14"
        >
          <a
            href="#"
            
          className="cta-underline group inline-flex items-center gap-3 font-sans-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-400"
        >
          Watch more stories
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Testimonial Card with parallax image ────────── */

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) => {
  const { ref, y: imageY } = useParallax<HTMLDivElement>({ speed: -0.1 });
  // Alternate entrance: even from left, odd from right
  const enterX = index % 2 === 0 ? -30 : 30;

  return (
    <motion.div
      initial={{ opacity: 0, x: enterX, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: 0.1 + index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group cursor-pointer"
      
    >
      {/* Portrait Image Container with parallax */}
      <div ref={ref} className="relative aspect-[4/5] overflow-hidden rounded-sm mb-4">
        <motion.img
          src={testimonial.image}
          alt={`${testimonial.name}, ${testimonial.role}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          style={{ y: imageY }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

        {/* Play button indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-foreground/20 bg-background/20 backdrop-blur-sm flex items-center justify-center opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
            <Play
              className="w-4 h-4 md:w-5 md:h-5 text-foreground/80 ml-0.5"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
          <p className="font-serif-display text-base md:text-lg font-medium text-hero-headline leading-snug">
            {testimonial.name}
          </p>
          <p className="font-sans-body text-[11px] md:text-xs tracking-[0.15em] uppercase text-foreground/50 mt-1">
            {testimonial.role}
          </p>
        </div>
      </div>

      {/* Context line */}
      <p className="font-sans-body text-xs md:text-sm text-muted-foreground leading-relaxed">
        {testimonial.context}
      </p>

      {/* Pull quote */}
      {testimonial.pullQuote && (
        <p className="font-serif-display text-sm md:text-base text-hero-subtext mt-2 leading-snug italic">
          "{testimonial.pullQuote}"
        </p>
      )}
    </motion.div>
  );
};

export default TestimonialsSection;
