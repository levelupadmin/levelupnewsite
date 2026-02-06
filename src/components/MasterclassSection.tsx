import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  "All",
  "Filmmaking",
  "Photography",
  "Editing",
  "Art Direction",
  "Music",
];

const masterclasses = [
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/650c1be5224f49f6432aaae6_1.Karthik_Subburaj%20course%20banner.png",
    name: "Karthik Subbaraj",
    descriptor: "Storytelling to editing to working with actors",
    format: "Filmmaker",
    category: "Filmmaking",
  },
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64f60ddd91f67b7db8f6716b_3.Anthony_Gonsalvez.png",
    name: "Anthony Gonsalvez",
    descriptor: "An all-out practical editing experience",
    format: "Film Editor",
    category: "Editing",
  },
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64f2f14d67e5504737c57ea5_2.Venket_Ram.png",
    name: "G Venket Ram",
    descriptor: "Capturing the perfect image through diverse case studies",
    format: "Photographer",
    category: "Photography",
  },
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64b79ef6d61b238747788c6c_kiran%20website%201.webp",
    name: "DRK Kiran",
    descriptor: "Set designing, creative problem-solving, and miniatures",
    format: "Art Director",
    category: "Art Direction",
  },
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/64b79ef642421ae3cbe004d9_ravi%20website%201.webp",
    name: "Ravi Basrur",
    descriptor: "From the village of Basrur to revolutionizing Sandalwood music",
    format: "Music Director",
    category: "Music",
  },
  {
    image: "https://cdn.prod.website-files.com/649fbe7d7f61c6fc912e1d33/6899f2de01c2b6f380973a82_Frame%20191%20LK.png",
    name: "Lokesh Kanagaraj",
    descriptor: "The art and craft of filmmaking",
    format: "Filmmaker",
    category: "Filmmaking",
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
          High quality pre-recorded courses taught by India's finest.
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

      {/* Masterclass cards — grid layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5 md:gap-6">
          {filtered.map((mc, index) => (
            <motion.div
              key={mc.name}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              className="group relative cursor-pointer"
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
