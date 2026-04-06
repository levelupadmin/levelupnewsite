import FadeInSection from "@/components/FadeInSection";
import { veToolIcons, vePortfolioCards } from "@/data/liveVEData";
import { m } from "framer-motion";

const VEPortfolio = () => (
  <section className="py-20 md:py-28" style={{ background: "hsl(160 8% 8%)" }}>
    <div className="max-w-[1200px] mx-auto px-6 md:px-12">
      {/* Tools circular layout */}
      <FadeInSection className="text-center mb-20">
        <p className="text-xs text-white/40 tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>🎬 Tech Stack</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-12" style={{ fontFamily: "'DM Serif Text', serif" }}>
          Tools You'll Learn
        </h2>
        <div className="relative w-full max-w-[600px] mx-auto aspect-square">
          {/* Concentric circles */}
          <div className="absolute inset-[10%] rounded-full border border-white/5" />
          <div className="absolute inset-[25%] rounded-full border border-white/5" />
          {/* Tool icons arranged in a circle */}
          {veToolIcons.map((tool, i) => {
            const angle = (i / veToolIcons.length) * 2 * Math.PI - Math.PI / 2;
            const radius = 42;
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);
            return (
              <m.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden bg-white/5 border border-white/10 p-1.5">
                  <img src={tool.image} alt={tool.name} className="w-full h-full object-contain" loading="lazy" />
                </div>
                <span className="text-[9px] md:text-[10px] text-white/50 mt-1 text-center max-w-[80px] leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>{tool.name}</span>
              </m.div>
            );
          })}
        </div>
      </FadeInSection>

      {/* Portfolio */}
      <FadeInSection className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4" style={{ fontFamily: "'DM Serif Text', serif" }}>
          What You'll Create by the End?
        </h2>
        <p className="text-sm text-white/50 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Every project in this program is designed to help you build trust, prove your skill, and land real opportunities.
        </p>
      </FadeInSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {vePortfolioCards.map((card, i) => (
          <m.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl overflow-hidden border border-white/10 relative group"
          >
            <div className="aspect-[4/3] relative">
              <img src={card.image} alt={card.title} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4">
                <h3 className="text-purple-400 text-lg font-semibold whitespace-pre-line leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>{card.title}</h3>
                {card.description && (
                  <p className="text-white/60 text-xs mt-2 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{card.description}</p>
                )}
              </div>
            </div>
          </m.div>
        ))}
      </div>
    </div>
  </section>
);

export default VEPortfolio;
