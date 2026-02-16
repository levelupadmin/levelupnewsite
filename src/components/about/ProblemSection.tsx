import { m } from "framer-motion";
import { BookX, ShieldX, Users } from "lucide-react";
import heroImg from "@/assets/hero-cinematic.jpg";

const problems = [
  {
    icon: BookX,
    title: "No Structured Learning",
    description: "YouTube has 10,000 tutorials. Zero clear pathways.",
  },
  {
    icon: ShieldX,
    title: "No Verified Skills",
    description: "They learn scattered skills but can't prove their capability.",
  },
  {
    icon: Users,
    title: "No Access to Network",
    description: "Talent gets lost without a network. Opportunities go to known faces only.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

const ProblemSection = () => (
  <section className="relative overflow-hidden">
    {/* Full-bleed background image */}
    <div className="absolute inset-0">
      <img src={heroImg} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85" />
    </div>

    <div className="relative py-16 md:py-24 px-6 md:px-12 z-10">
      <div className="max-w-7xl mx-auto">
        <m.p
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="font-sans-body text-xs md:text-sm uppercase tracking-[0.2em] text-primary text-center mb-3"
        >
          The Problem
        </m.p>
        <m.h2
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif-display text-2xl md:text-3xl text-white text-center mb-12"
        >
          A broken system for creative careers
        </m.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {problems.map((p, i) => (
            <m.div
              key={p.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="rounded-xl bg-white/10 backdrop-blur-md border border-white/10 p-6 flex flex-col items-start gap-4"
            >
              <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center">
                <p.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif-display text-base text-white">{p.title}</h3>
              <p className="font-sans-body text-sm text-white/70 leading-relaxed">
                {p.description}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProblemSection;
