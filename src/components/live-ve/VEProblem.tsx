import FadeInSection from "@/components/FadeInSection";
import { veProblemPoints, veAdvantages, VE_CTA_LINK } from "@/data/liveVEData";
import { m } from "framer-motion";

const VEProblem = () => (
  <section className="py-20 md:py-28" style={{ background: "hsl(160 8% 6%)" }}>
    <div className="max-w-[1100px] mx-auto px-6 md:px-12">
      {/* Problem */}
      <FadeInSection className="text-center mb-16">
        <p className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4">🎬 The Problem</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight mb-6">
          The Reason You're Not<br />Growing as an Editor?
        </h2>
        <p className="text-sm text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          You keep watching tutorials but never finish real projects. You see 22-year-old editors making ₹60,000/month and wonder 'Why not me?'
        </p>

        {/* Timeline scrubber */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line top */}
          <div className="absolute left-1/2 top-0 h-8 w-px bg-white/10 -translate-x-1/2" />
          {/* Playhead */}
          <div className="absolute left-1/2 top-8 -translate-x-1/2 -translate-y-0">
            <div className="w-4 h-5 bg-purple-500 rounded-sm" style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)" }} />
          </div>
          {/* Ruler */}
          <div className="relative top-14 w-full h-6 flex items-end justify-center gap-[6px] mb-2">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className={`w-px ${i % 5 === 0 ? "h-4 bg-white/20" : "h-2 bg-white/10"}`} />
            ))}
          </div>
          {/* Vertical line below ruler */}
          <div className="absolute left-1/2 top-[4.5rem] bottom-0 w-px bg-white/10 -translate-x-1/2" />

          {/* Cards */}
          <div className="relative pt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {veProblemPoints.slice(0, 2).map((point, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="px-8 py-5 rounded-xl border border-white/15 bg-white/5 text-lg text-white/70 text-center"
                >
                  {point}
                </m.div>
              ))}
            </div>
            <div className="flex justify-center">
              <m.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="px-8 py-5 rounded-xl border border-white/15 bg-white/5 text-lg text-center bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent font-medium"
              >
                {veProblemPoints[2]}
              </m.div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Advantages */}
      <FadeInSection className="mb-10">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-center mb-12 leading-tight">
          <span className="bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
            The Unfair Advantage To Change That
          </span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {veAdvantages.map((adv, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4">
                <img src={adv.icon} alt={adv.title} loading="lazy" className="w-full h-full object-contain" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2 whitespace-pre-line">{adv.title}</h4>
              <p className="text-xs text-white/50 leading-relaxed">{adv.description}</p>
            </m.div>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection className="text-center">
        <a href={VE_CTA_LINK} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-3 rounded-lg text-white text-sm font-medium"
          style={{ background: "linear-gradient(135deg, hsl(270 60% 55%), hsl(280 70% 65%))" }}>
          Request Invite
        </a>
      </FadeInSection>
    </div>
  </section>
);

export default VEProblem;
