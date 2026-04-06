import FadeInSection from "@/components/FadeInSection";
import { vePortfolioItems, veToolsImages } from "@/data/liveVEData";
import { m } from "framer-motion";
import { Film, Scissors, Camera, Play, Video, Award } from "lucide-react";

const icons = [Film, Video, Camera, Scissors, Play, Award];

const VEPortfolio = () => (
  <section className="py-20 md:py-28" style={{ background: "hsl(22 14% 5%)" }}>
    <div className="max-w-6xl mx-auto px-6 md:px-12">
      {/* Tools */}
      <FadeInSection className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-sans-body text-[11px] tracking-[0.2em] uppercase font-semibold mb-6">
          Tech Stack
        </span>
        <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">
          Tools You'll Learn
        </h2>
        <div className="flex justify-center gap-6 flex-wrap">
          {veToolsImages.map((tool, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border border-border/30 bg-card/30 p-2"
            >
              <img src={tool} alt={`Tool ${i + 1}`} loading="lazy" className="w-full h-full object-contain" />
            </m.div>
          ))}
        </div>
      </FadeInSection>

      {/* Portfolio items */}
      <FadeInSection className="text-center">
        <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
          What You'll Create by the End?
        </h2>
        <p className="font-sans-body text-sm text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          Every project in this program is designed to help you build trust, prove your skill, and land real opportunities.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {vePortfolioItems.map((item, i) => {
            const Icon = icons[i];
            return (
              <m.div
                key={item}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-5 rounded-xl border border-border/40 bg-card/30 text-center"
              >
                <Icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <span className="font-sans-body text-sm font-medium text-foreground">{item}</span>
              </m.div>
            );
          })}
        </div>
      </FadeInSection>
    </div>
  </section>
);

export default VEPortfolio;
