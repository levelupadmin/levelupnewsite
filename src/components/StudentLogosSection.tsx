import { motion } from "framer-motion";

const brands = [
  "FTII",
  "NID",
  "Whistling Woods",
  "YRF",
  "Excel Entertainment",
  "TVF",
  "Google",
  "Amazon Prime",
  "Viacom18",
  "Dharma",
  "Red Chillies",
  "Adobe",
];

const MarqueeRow = () => (
  <div className="flex items-center gap-12 md:gap-16">
    {brands.map((brand) => (
      <span
        key={brand}
        className="font-sans-body text-lg md:text-xl lg:text-2xl font-medium uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap select-none"
      >
        {brand}
      </span>
    ))}
  </div>
);

const StudentLogosSection = () => {
  return (
    <section aria-label="Our students are from" className="relative bg-background py-12 md:py-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
      >
        {/* Thin separator */}
        <div className="w-12 h-px bg-border mx-auto mb-10 md:mb-12" />

        {/* Headline */}
        <h2 className="font-serif-display text-2xl md:text-3xl lg:text-4xl text-center text-muted-foreground mb-10 md:mb-12 px-6">
          Our students are from
        </h2>

        {/* Marquee container */}
        <div className="relative">
          {/* Fade left */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />

          {/* Fade right */}
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

          {/* Scrolling track */}
          <div className="flex animate-scroll-left">
            <MarqueeRow />
            <div className="w-12 md:w-16 shrink-0" />
            <MarqueeRow />
            <div className="w-12 md:w-16 shrink-0" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default StudentLogosSection;
