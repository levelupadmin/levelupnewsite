import FadeInSection from "@/components/FadeInSection";
import { veCommunityStats } from "@/data/liveVEData";
import { m } from "framer-motion";

const VECommunity = () => (
  <section className="py-16 md:py-24" style={{ background: "hsl(22 14% 5%)" }}>
    <div className="max-w-4xl mx-auto px-6 md:px-12">
      <FadeInSection className="text-center mb-10">
        <p className="font-sans-body text-sm text-purple-400 tracking-[0.15em] uppercase font-semibold mb-3">LevelUp Learning</p>
        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight mb-4">
          India's Largest Filmmaking Learning Community
        </h2>
        <p className="font-sans-body text-base text-muted-foreground">
          LevelUp Learning is more than a platform — it's a Community!
        </p>
      </FadeInSection>

      <FadeInSection delay={100}>
        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
          {veCommunityStats.map((stat, i) => (
            <m.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl border border-purple-500/20 bg-purple-500/5"
            >
              <div className="font-serif-display text-3xl md:text-4xl font-bold text-purple-400 mb-1">{stat.value}</div>
              <div className="font-sans-body text-sm text-muted-foreground">{stat.label}</div>
            </m.div>
          ))}
        </div>
      </FadeInSection>
    </div>
  </section>
);

export default VECommunity;
