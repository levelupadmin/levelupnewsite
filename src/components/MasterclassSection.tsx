import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import masterclass1 from "@/assets/masterclass-1.jpg";
import masterclass2 from "@/assets/masterclass-2.jpg";
import masterclass3 from "@/assets/masterclass-3.jpg";
import masterclass4 from "@/assets/masterclass-4.jpg";
import masterclass5 from "@/assets/masterclass-5.jpg";
import masterclass6 from "@/assets/masterclass-6.jpg";

const categories = [
  "All",
  "Filmmaking",
  "Direction",
  "Cinematography",
  "Editing",
  "Writing",
  "Music",
  "Acting",
];

const masterclasses = [
  {
    image: masterclass1,
    name: "Arun Varma",
    descriptor: "Directing with Intent",
    format: "18 lessons",
    category: "Direction",
  },
  {
    image: masterclass2,
    name: "Meera Kapoor",
    descriptor: "Seeing Light, Feeling Frame",
    format: "14 lessons",
    category: "Cinematography",
  },
  {
    image: masterclass3,
    name: "Vikram Desai",
    descriptor: "The Craft of Storytelling",
    format: "22 lessons",
    category: "Writing",
  },
  {
    image: masterclass4,
    name: "Priya Nair",
    descriptor: "Composing for Emotion",
    format: "16 lessons",
    category: "Music",
  },
  {
    image: masterclass5,
    name: "Rohan Mehta",
    descriptor: "The Invisible Cut",
    format: "12 lessons",
    category: "Editing",
  },
  {
    image: masterclass6,
    name: "Ananya Sen",
    descriptor: "Presence and Truth",
    format: "20 lessons",
    category: "Acting",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.2 + i * 0.1, ease: "easeOut" as const },
  }),
};

const MasterclassSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? masterclasses
      : masterclasses.filter((m) => m.category === activeCategory);

  return (
    <section className="relative bg-background py-12 md:py-16">
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsl(38 75% 55% / 0.03) 0%, transparent 70%)",
        }}
      />

      {/* Section headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="text-center px-6 md:px-12 mb-8 md:mb-10"
      >
        <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-hero-headline leading-[1.2] tracking-tight">
          Learn from the ones{" "}
          <em className="italic font-normal text-primary">who shaped the craft</em>
        </h2>
        <p className="font-sans-body text-sm md:text-base text-hero-subtext mt-5 md:mt-6 max-w-lg mx-auto leading-relaxed">
          Deep, reflective masterclasses on process, mindset, and creative decision-making.
        </p>
      </motion.div>

      {/* Category chips */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-2 md:gap-3 px-6 md:px-12 mb-10 md:mb-12"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`font-sans-body text-xs md:text-sm px-4 py-2 rounded-full border transition-all duration-300 ${
              activeCategory === cat
                ? "border-primary text-primary bg-primary/5"
                : "border-border text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Masterclass cards — horizontal scroll row */}
      <div className="relative">
        {/* Left fade edge */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        {/* Right fade edge */}
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex gap-5 md:gap-6 overflow-x-auto scrollbar-hide px-6 md:px-12 pb-4 snap-x snap-mandatory">
          {filtered.map((mc, index) => (
            <motion.div
              key={mc.name}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              className="group relative cursor-pointer flex-shrink-0 w-[75vw] sm:w-[45vw] md:w-[35vw] lg:w-[28vw] xl:w-[22vw] snap-start"
            >
              {/* Image container */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-card">
                <img
                  src={mc.image}
                  alt={`${mc.name} — ${mc.descriptor}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark gradient overlay from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Hover glow overlay */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content pinned to bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  {/* Format tag */}
                  <span className="font-sans-body text-[10px] md:text-xs tracking-[0.15em] uppercase text-muted-foreground/70 mb-3 block">
                    {mc.format}
                  </span>

                  {/* Creator name */}
                  <h3 className="font-serif-display text-xl md:text-2xl font-medium text-hero-headline leading-tight tracking-tight mb-1.5">
                    {mc.name}
                  </h3>

                  {/* Descriptor */}
                  <p className="font-sans-body text-sm text-hero-subtext leading-relaxed">
                    {mc.descriptor}
                  </p>

                  {/* Subtle accent line */}
                  <div className="w-6 h-[1px] bg-primary/40 mt-5 transition-all duration-500 group-hover:w-10 group-hover:bg-primary/70" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Soft CTA */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-10 md:mt-14"
      >
        <a
          href="#"
          className="group inline-flex items-center gap-3 font-sans-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-400"
        >
          Explore the full library
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </motion.div>
    </section>
  );
};

export default MasterclassSection;
