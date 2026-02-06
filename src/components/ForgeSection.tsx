import { motion } from "framer-motion";
import { ArrowRight, Flame, Users, MapPin } from "lucide-react";

import forgeImage1 from "@/assets/forge-1.jpg";
import forgeImage2 from "@/assets/forge-2.jpg";
import forgeImage3 from "@/assets/forge-3.jpg";
import forgeImage4 from "@/assets/forge-4.jpg";

const featurePoints = [
  {
    Icon: Flame,
    headline: "Pressure that transforms",
    description:
      "Not comfort. Not theory. Real creative intensity, shoulder to shoulder.",
  },
  {
    Icon: Users,
    headline: "Mentorship without filters",
    description:
      "Work directly with creators who've shaped the industry. No layers between you and the work.",
  },
  {
    Icon: MapPin,
    headline: "Offline. Immersive. Real.",
    description:
      "Step away from screens. Live, create, and break through — together, in one place.",
  },
];

const contextualCues = [
  "Invite-only",
  "Limited cohorts",
  "Offline, immersive",
];

const ForgeSection = () => {
  return (
    <section className="relative bg-background py-28 md:py-36 lg:py-44 overflow-hidden">
      {/* Subtle top divider */}
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
            "radial-gradient(ellipse 80% 50% at 50% 30%, hsl(38 75% 55% / 0.03) 0%, transparent 70%)",
        }}
      />

      {/* ─── Top: Split Two-Column Layout ─── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left Column — Text Block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="font-sans-body text-[10px] md:text-xs tracking-[0.25em] uppercase text-primary mb-4 block">
              The inner circle
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-hero-headline leading-[1.15] tracking-tight">
              Where you{" "}
              <em className="italic font-normal text-primary">become</em>
            </h2>
            <p className="font-sans-body text-sm md:text-base text-hero-subtext mt-5 md:mt-6 max-w-md leading-relaxed">
              An immersive, in-person creative residency. No screens between you
              and the work. Just pressure, mentorship, and transformation.
            </p>
          </motion.div>

          {/* Right Column — Feature Points */}
          <div className="flex flex-col gap-8 md:gap-10 md:pt-2">
            {featurePoints.map((point, index) => (
              <motion.div
                key={point.headline}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  delay: 0.15 + index * 0.12,
                  ease: "easeOut",
                }}
                className="flex gap-4 items-start"
              >
                <div className="flex-shrink-0 mt-1">
                  <point.Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif-display text-base md:text-lg font-medium text-hero-headline leading-snug">
                    {point.headline}
                  </h3>
                  <p className="font-sans-body text-xs md:text-sm text-muted-foreground mt-1 leading-relaxed max-w-sm">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Bottom: Layered Visual Showcase ─── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ForgeVisualShowcase />
      </div>

      {/* Contextual cues */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex justify-center gap-6 md:gap-10 mt-12 md:mt-16 px-6"
      >
        {contextualCues.map((cue) => (
          <span
            key={cue}
            className="font-sans-body text-[10px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground"
          >
            {cue}
          </span>
        ))}
      </motion.div>

      {/* Quiet CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mt-14 md:mt-20"
      >
        <a
          href="#"
          className="group inline-flex items-center gap-3 font-sans-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-400"
        >
          Enter The Forge
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </motion.div>
    </section>
  );
};

/* ─── Layered Visual Showcase ────────────────────────────── */

const ForgeVisualShowcase = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      className="relative"
    >
      {/* Layered composition container */}
      <div className="relative mx-auto max-w-5xl">
        {/* Left flanking image */}
        <div className="hidden md:block absolute -left-8 lg:-left-12 top-1/2 -translate-y-1/2 w-[28%] z-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-cinematic"
          >
            <img
              src={forgeImage2}
              alt="Hands on camera during a Forge shoot"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent" />
          </motion.div>
        </div>

        {/* Center main image — dominant */}
        <div className="relative z-10 mx-auto w-full md:w-[70%]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm shadow-cinematic">
            <img
              src={forgeImage1}
              alt="Late night creative discussion at The Forge"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/10" />

            {/* Subtle caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
              <span className="font-sans-body text-[10px] md:text-xs tracking-[0.15em] uppercase text-foreground/60">
                Goa · Edition III · 2025
              </span>
            </div>
          </div>

          {/* Small overlay card — forge-3 as an inset detail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="absolute -bottom-6 -right-4 md:-bottom-8 md:-right-8 w-[35%] md:w-[30%] z-20"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-cinematic border border-border/30">
              <img
                src={forgeImage3}
                alt="Creators collaborating at dusk outside The Forge"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Right flanking image */}
        <div className="hidden md:block absolute -right-8 lg:-right-12 top-1/2 -translate-y-1/2 w-[28%] z-0">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-cinematic"
          >
            <img
              src={forgeImage4}
              alt="Filmmaker editing deep into the night"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-background/30 to-transparent" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ForgeSection;
