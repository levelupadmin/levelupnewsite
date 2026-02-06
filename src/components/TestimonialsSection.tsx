import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";

interface Testimonial {
  image: string;
  name: string;
  role: string;
  context: string;
  pullQuote?: string;
}

const testimonials: Testimonial[] = [
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/652523b6662a5d2fad321caf_IMG_4947-1.jpg",
    name: "Janani",
    role: "Director",
    context: "Enrolled in the Direction Masterclass",
    pullQuote: "I was blown away by the depth of knowledge shared.",
  },
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/652526a5ff187b8061736a2c_Craving-Summer-Pc-kishan-sh-peace-countryside-rail.jpg",
    name: "Karthik",
    role: "Filmmaker",
    context: "Took the Filmmaking Masterclass",
    pullQuote: "A game-changer. The course content is comprehensive, covering every aspect of filmmaking.",
  },
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/65252678baf7cd7a2d9bfd54_photo.JPG",
    name: "Neera",
    role: "Editor",
    context: "Completed the Editing Masterclass",
    pullQuote: "I now feel confident in my editing abilities, thanks to LevelUp Learning.",
  },
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/652523987b775fea747ce609_(3).jpg",
    name: "Kishore",
    role: "Photographer",
    context: "Enrolled in the Photography Masterclass",
    pullQuote: "It elevated my skills to a professional level.",
  },
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/6525232d1f84ff3af20ab3e4_Sparkle-every-single-day-photography-class-looks-a.jpg",
    name: "Mithun",
    role: "Music Composer",
    context: "Took the Music Masterclass",
    pullQuote: "Incredibly inspiring — they emphasised the emotional connection with the audience.",
  },
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/6533a7e35661f381b62ee44c_User%203.jpg",
    name: "Lokesh",
    role: "Art Director",
    context: "Completed the Art Direction Masterclass",
    pullQuote: "A revelation. It helped me understand the importance of every element in a scene.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative bg-background py-12 md:py-16 overflow-hidden">
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-10 md:mb-12"
        >
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-medium text-hero-headline leading-[1.15] tracking-tight max-w-lg">
            This makes our{" "}
            <em className="italic font-normal text-primary">heart beat</em> faster
          </h2>
          <p className="font-sans-body text-sm md:text-base text-hero-subtext mt-4 max-w-md leading-relaxed">
            Real creators. Real turning points. No scripts.
          </p>
        </motion.div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
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
            className="group inline-flex items-center gap-3 font-sans-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-400"
          >
            Watch more stories
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Testimonial Card ────────────────────────────── */

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: 0.1 + index * 0.12,
        ease: "easeOut",
      }}
      className="group cursor-pointer"
    >
      {/* Portrait Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-4">
        <img
          src={testimonial.image}
          alt={`${testimonial.name}, ${testimonial.role}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
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
