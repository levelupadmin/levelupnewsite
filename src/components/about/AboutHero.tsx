import { m } from "framer-motion";
import StarField from "@/components/StarField";
import ConcentricRings from "./ConcentricRings";

import mc1 from "@/assets/masterclass-1.jpg";
import mc2 from "@/assets/masterclass-2.jpg";
import mc3 from "@/assets/masterclass-3.jpg";
import mc4 from "@/assets/masterclass-4.jpg";
import mc5 from "@/assets/masterclass-5.jpg";
import mc6 from "@/assets/masterclass-6.jpg";

const portraits = [
  { src: mc1, x: "8%", y: "12%", size: 90, delay: 0 },
  { src: mc2, x: "78%", y: "8%", size: 80, delay: 0.2 },
  { src: mc3, x: "18%", y: "65%", size: 70, delay: 0.4 },
  { src: mc4, x: "85%", y: "60%", size: 85, delay: 0.1 },
  { src: mc5, x: "45%", y: "5%", size: 65, delay: 0.3 },
  { src: mc6, x: "60%", y: "75%", size: 75, delay: 0.5 },
];

const AboutHero = () => (
  <section className="relative py-32 md:py-44 px-6 md:px-12 overflow-hidden bg-[hsl(0,0%,5%)]">
    {/* Star field background */}
    <StarField starCount={450} speed={0.2} />

    {/* Floating creator portraits — blurred, low opacity */}
    <div className="absolute inset-0 z-[1] pointer-events-none">
      {portraits.map((p, i) => (
        <m.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 + p.delay }}
          className="absolute rounded-full overflow-hidden"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            filter: "blur(6px)",
          }}
        >
          <img
            src={p.src}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </m.div>
      ))}
    </div>

    {/* Concentric rings */}
    <ConcentricRings className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60" size={900} count={10} />
    {/* Stronger amber glow */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(24,95%,53%,0.15)_0%,_transparent_60%)] pointer-events-none" />

    <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center gap-6 z-10">
      <m.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-sans-body text-xs md:text-sm uppercase tracking-[0.2em] text-primary"
      >
        About LevelUp
      </m.p>

      <m.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-serif-display text-3xl md:text-5xl lg:text-6xl text-white leading-tight"
      >
        Building India's Creative{" "}
        <em className="text-gradient-amber not-italic">Career Infrastructure</em>
      </m.h1>

      <m.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="font-sans-body text-white/70 text-base md:text-lg max-w-2xl leading-relaxed"
      >
        India's next workforce isn't coding. It's creating.
      </m.p>

      <m.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="font-sans-body text-white/50 text-sm md:text-base max-w-xl leading-relaxed"
      >
        Filmmakers, Musicians, Designers and Creators are building a new kind of career, driven by ideas, not job titles.
      </m.p>
    </div>
  </section>
);

export default AboutHero;
