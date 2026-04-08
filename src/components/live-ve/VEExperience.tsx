import FadeInSection from "@/components/FadeInSection";
import { veExperience } from "@/data/liveVEData";
import { m } from "framer-motion";
import {
  ClipboardCheck, MessageSquare, Radio, Users,
  Award, Briefcase, Headphones, Film
} from "lucide-react";

const expIcons = [ClipboardCheck, MessageSquare, Radio, Users, Award, Briefcase, Headphones, Film];

// Layout: row1 = 3 cols, row2 = 2 cols (wider), row3 = 3 cols
const rows = [
  [0, 1, 2],
  [3, 4],
  [5, 6, 7],
];

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

      <div className="flex flex-col gap-4">
        {rows.map((row, ri) => (
          <div
            key={ri}
            className={`grid gap-4 ${
              row.length === 3
                ? "grid-cols-1 sm:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2"
            }`}
          >
            {row.map((idx) => {
              const exp = veExperience[idx];
              const Icon = expIcons[idx];
              return (
                <m.div
                  key={exp.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="relative overflow-hidden rounded-2xl p-6 md:p-8 min-h-[180px] flex flex-col justify-end"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(260 20% 12%) 0%, hsl(270 40% 18%) 60%, hsl(270 50% 28%) 100%)",
                  }}
                >
                  {/* Icon top-right */}
                  <Icon className="absolute top-5 right-5 w-10 h-10 text-purple-400/60" strokeWidth={1.5} />

                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">
                      {exp.title}
                    </h3>
                    <p className="text-xs md:text-sm text-white/50 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </m.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default VEExperience;
