import FadeInSection from "@/components/FadeInSection";
import { veExperience } from "@/data/liveVEData";
import { m } from "framer-motion";
import {
  ClipboardCheck, MessageSquare, Radio, Users,
  Award, Briefcase, Headphones, Film
} from "lucide-react";

const expIcons = [ClipboardCheck, MessageSquare, Radio, Users, Award, Briefcase, Headphones, Film];

const VEExperience = () => (
  <section className="py-20 md:py-28" style={{ background: "hsl(160 8% 8%)" }}>
    <div className="max-w-[1200px] mx-auto px-6 md:px-12">
      <FadeInSection className="text-center mb-14">
        <p className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4">🎬 What You'll Experience?</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight mb-4">
          Experience Designed for Real Results
        </h2>
        <p className="text-sm text-white/50 max-w-2xl mx-auto">
          This isn't just a course — it's a creative environment built to push you, support you, and get you career-ready.
        </p>
      </FadeInSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {veExperience.map((exp, i) => {
          const Icon = expIcons[i];
          return (
            <m.div
              key={exp.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-start gap-4">
                <Icon className="w-10 h-10 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{exp.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            </m.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default VEExperience;
