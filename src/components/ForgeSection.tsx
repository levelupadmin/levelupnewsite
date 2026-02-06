import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import forgeImage1 from "@/assets/forge-1.jpg";
import forgeImage2 from "@/assets/forge-2.jpg";
import forgeImage3 from "@/assets/forge-3.jpg";
import forgeImage4 from "@/assets/forge-4.jpg";

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

      {/* Ambient glow behind the section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 30%, hsl(38 75% 55% / 0.03) 0%, transparent 70%)",
        }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center px-6 md:px-12 mb-16 md:mb-20"
      >
        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-hero-headline leading-[1.15] tracking-tight">
          Where you{" "}
          <em className="italic font-normal text-primary">become</em>
        </h2>
        <p className="font-sans-body text-sm md:text-base text-hero-subtext mt-5 md:mt-6 max-w-lg mx-auto leading-relaxed">
          An immersive, in-person creative residency. No screens between you
          and the work. Just pressure, mentorship, and transformation.
        </p>
      </motion.div>

      {/* Cinematic visual collage */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ForgeCollage />
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

/* ─── Cinematic Collage Layout ───────────────────────────── */

const ForgeCollage = () => {
  return (
    <div className="grid grid-cols-12 gap-3 md:gap-4">
      {/* Wide hero image — spans 8 cols */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="col-span-12 md:col-span-8 relative group"
      >
        <CollageImage
          src={forgeImage1}
          alt="Late night creative discussion at The Forge"
          aspectClass="aspect-[16/9]"
          caption="The conversation that changes everything"
        />
      </motion.div>

      {/* Tall portrait — spans 4 cols */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay: 0.25 }}
        className="col-span-6 md:col-span-4 relative group"
      >
        <CollageImage
          src={forgeImage4}
          alt="Filmmaker editing deep into the night"
          aspectClass="aspect-[3/4]"
          caption="The hours no one sees"
        />
      </motion.div>

      {/* Bottom left square */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay: 0.35 }}
        className="col-span-6 md:col-span-4 relative group"
      >
        <CollageImage
          src={forgeImage2}
          alt="Hands on camera during a Forge shoot"
          aspectClass="aspect-square"
          caption="Craft lives in the hands"
        />
      </motion.div>

      {/* Bottom wide image — spans 8 cols */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay: 0.45 }}
        className="col-span-12 md:col-span-8 relative group"
      >
        <CollageImage
          src={forgeImage3}
          alt="Creators collaborating at dusk outside The Forge"
          aspectClass="aspect-[2/1]"
          caption="Goa · Edition III · 2025"
        />
      </motion.div>
    </div>
  );
};

/* ─── Single Collage Image ───────────────────────────────── */

interface CollageImageProps {
  src: string;
  alt: string;
  aspectClass: string;
  caption?: string;
}

const CollageImage = ({ src, alt, aspectClass, caption }: CollageImageProps) => (
  <div className={`relative ${aspectClass} overflow-hidden rounded-sm`}>
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      loading="lazy"
    />
    {/* Dark vignette overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/10" />

    {/* Caption — appears subtly on hover */}
    {caption && (
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
        <span className="font-sans-body text-[10px] md:text-xs tracking-[0.15em] uppercase text-foreground/70">
          {caption}
        </span>
      </div>
    )}
  </div>
);

export default ForgeSection;
