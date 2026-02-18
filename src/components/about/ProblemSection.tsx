import { m } from "framer-motion";
import { BookX, ShieldX, Users } from "lucide-react";
import heroImg from "@/assets/hero-cinematic.jpg";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import testimonial7 from "@/assets/testimonial-7.jpg";

const problems = [
  {
    icon: BookX,
    title: "No Structured Learning",
    description: "YouTube has 10,000 tutorials. Zero clear pathways.",
    image: testimonial1,
    stat: "10,000+",
    statLabel: "tutorials, zero direction",
  },
  {
    icon: ShieldX,
    title: "No Verified Skills",
    description: "They learn scattered skills but can't prove their capability.",
    image: testimonial5,
    stat: "83%",
    statLabel: "of creators lack portfolio proof",
  },
  {
    icon: Users,
    title: "No Access to Network",
    description: "Talent gets lost without a network. Opportunities go to known faces only.",
    image: testimonial7,
    stat: "92%",
    statLabel: "of jobs go to referrals",
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
              className="rounded-xl bg-white/10 backdrop-blur-md border border-white/10 overflow-hidden flex flex-col"
            >
              {/* Human image with gradient overlay */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={p.image}
                  alt=""
                  className="w-full h-full object-cover object-top grayscale opacity-60"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-black/40" />
                {/* Stat overlay */}
                <div className="absolute bottom-3 left-4">
                  <span className="font-serif-display text-2xl text-primary font-bold leading-none">
                    {p.stat}
                  </span>
                  <span className="block font-sans-body text-[10px] text-white/50 mt-0.5">
                    {p.statLabel}
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 flex flex-col items-start gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center">
                  <p.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif-display text-base text-white">{p.title}</h3>
                <p className="font-sans-body text-sm text-white/70 leading-relaxed">
                  {p.description}
                </p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProblemSection;
