import { m } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { veHero } from "@/data/liveVEData";

const VEHero = () => (
  <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0">
      <img
        src={veHero.bgImage}
        alt="Video editing workspace"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
    </div>

    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-8"
      >
        <Sparkles className="w-4 h-4 text-purple-400" />
        <span className="font-sans-body text-sm text-purple-300">{veHero.badge}</span>
      </m.div>

      <m.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-serif-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight mb-6 whitespace-pre-line"
      >
        {veHero.headline}
      </m.h1>

      <m.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-sans-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
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
        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-purple-500 text-white font-sans-body text-base font-semibold tracking-wide transition-shadow hover:shadow-[0_0_30px_hsl(270_70%_55%/0.4)]"
      >
        {veHero.ctaLabel}
        <ArrowRight className="w-5 h-5" />
      </m.a>
    </div>
  </section>
);

export default VEHero;
