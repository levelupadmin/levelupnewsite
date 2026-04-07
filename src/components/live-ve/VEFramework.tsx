import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import frameworkNodes from "@/assets/framework-nodes.png";

const steps = [
  {
    heading: "Learn",
    body: "Every weekend, you'll join live sessions where mentors break down the exact tools, techniques, and storytelling tricks they use every day.",
  },
  {
    heading: "Practice",
    body: "After each session, you'll get hands-on with real projects. We'll give you clear briefs, and you'll get feedback so you're always improving.",
  },
  {
    heading: "Apply",
    body: "You'll build a portfolio along the way — not at the end. You'll learn how to pitch, deliver, and actually get paid for your work.",
  },
  {
    heading: "Collaborate & Grow",
    body: "Weekly community calls, peer reviews, and collab threads keep you connected, accountable, and constantly improving — with people on the same path.",
  },
];

const VEFramework = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Pan the image horizontally as user scrolls */
  const imgX = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setActiveIndex(Math.min(3, Math.floor(v * 4)));
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <section ref={sectionRef} className="relative" style={{ height: "300vh" }}>
      <div
        className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: "#0d0d0d" }}
      >
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 px-6">
          <span className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3 block">
            How You'll Learn?
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3"
            style={{ fontFamily: "'Funnel Display', sans-serif" }}
          >
            The Framework
          </h2>
          <p className="text-[#9CA3AF] max-w-2xl mx-auto text-base md:text-lg">
            Here's how we turn you from a curious beginner into a confident, working editor
            — one step at a time.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="max-w-[1380px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-6 lg:gap-10 w-full">
          {/* Left — scrolling image */}
          <div className="lg:w-[60%] rounded-2xl overflow-hidden" style={{ background: "#111" }}>
            <motion.img
              src={frameworkNodes}
              alt="Framework node graph"
              style={{ x: imgX }}
              className="h-auto max-h-[340px] w-auto max-w-none will-change-transform"
              draggable={false}
            />
          </div>

          {/* Right — sticky info */}
          <div className="lg:w-[40%] flex flex-col justify-center">
            <div className="flex gap-2 mb-8">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="h-[3px] rounded-full transition-all duration-500"
                  style={{
                    width: i === activeIndex ? 32 : 20,
                    background: i === activeIndex ? "#fff" : "#333",
                  }}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-6 h-6 rounded-full flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)" }}
                  />
                  <h3
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
                    style={{ fontFamily: "'Funnel Display', sans-serif" }}
                  >
                    {steps[activeIndex].heading}
                  </h3>
                </div>

                <div className="h-px bg-white/10 mb-6" />

                <p className="text-[#9CA3AF] text-base md:text-lg leading-relaxed mb-8">
                  {steps[activeIndex].body}
                </p>

                <a
                  href="#apply"
                  className="inline-block px-8 py-3 rounded-full text-white font-medium text-sm"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
                >
                  Request Invite
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VEFramework;
