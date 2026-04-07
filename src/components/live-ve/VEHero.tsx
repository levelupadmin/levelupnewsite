import { m } from "framer-motion";
import { Sparkles } from "lucide-react";
import { veHero } from "@/data/liveVEData";

const VEHero = () => (
  <section className="pt-8 pb-4 px-4 md:px-8" style={{ background: "hsl(160 8% 8%)" }}>
    <div className="max-w-[1400px] mx-auto">
      <div className="relative rounded-2xl overflow-hidden min-h-[85vh] flex items-center justify-center border border-white/10">
        <video
          src="https://ik.imagekit.io/levelup/VE/VE%20Hero.mp4?updatedAt=1775051433172"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-white/80">{veHero.badge}</span>
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-[1.1] tracking-tight mb-6 whitespace-pre-line"
           
          >
            {veHero.headline}
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
           
          >
            {veHero.subheadline}
          </m.p>

          <m.a
            href={veHero.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center justify-center px-10 py-4 rounded-lg text-white text-base font-medium tracking-wide"
            style={{
              background: "linear-gradient(135deg, hsl(270 60% 55%), hsl(280 70% 65%))",
            }}
          >
            {veHero.ctaLabel}
          </m.a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-purple-400/60" />
        </div>
      </div>
    </div>
  </section>
);

export default VEHero;
