import FadeInSection from "@/components/FadeInSection";
import { veExperience } from "@/data/liveVEData";
import { m } from "framer-motion";
import {
  ClipboardCheck, MessageSquare, Radio, Users,
  Award, Briefcase, Headphones, Film
} from "lucide-react";

const expIcons = [ClipboardCheck, MessageSquare, Radio, Users, Award, Briefcase, Headphones, Film];

const VEExperience = () => (
  <section className="py-20 md:py-28" style={{ background: "hsl(22 14% 5%)" }}>
    <div className="max-w-6xl mx-auto px-6 md:px-12">
      <FadeInSection className="text-center mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-sans-body text-[11px] tracking-[0.2em] uppercase font-semibold mb-6">
          What You'll Experience?
        </span>
        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight mb-4">
          Experience Designed for Real Results
        </h2>
        <p className="font-sans-body text-base text-muted-foreground max-w-2xl mx-auto">
          This isn't just a course — it's a creative environment built to push you, support you, and get you career-ready.
        </p>
      </FadeInSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {veExperience.map((exp, i) => {
          const Icon = expIcons[i];
          return (
            <m.div
              key={exp.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-5 rounded-xl border border-border/40 bg-card/30 hover:bg-card/50 transition-colors"
            >
              <Icon className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-sans-body text-sm font-semibold text-foreground mb-2">{exp.title}</h3>
              <p className="font-sans-body text-xs text-muted-foreground leading-relaxed">{exp.description}</p>
            </m.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default VEExperience;
