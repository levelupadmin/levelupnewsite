import { useEffect, useState, useRef } from "react";
import { ArrowRight, ChevronDown, Search, Plus, Minus } from "lucide-react";
import TeamPhotoCarousel from "@/components/careers/TeamPhotoCarousel";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";
import usePageSeo from "@/hooks/usePageSeo";

/* ─── Team carousel data ─── */
const teamCards = [
  { name: "Aarav S.", achievement: "Designed the masterclass platform that 70K+ learners use daily" },
  { name: "Priya M.", achievement: "Built our community engine that scaled to 300K members" },
  { name: "Rohan K.", achievement: "Shipped the entire student dashboard in one sprint" },
  { name: "Meera D.", achievement: "Created our first celebrity masterclass series from scratch" },
  { name: "Vikram T.", achievement: "Automated event ops for 100+ live programs" },
  { name: "Ananya R.", achievement: "Designed the brand system you're looking at right now" },
  { name: "Karthik P.", achievement: "Grew Instagram to 200K followers in 6 months" },
  { name: "Sneha G.", achievement: "Built the learner review system — 15,000+ reviews and counting" },
  { name: "Arjun V.", achievement: "Launched LevelUp in 3 new cities in one quarter" },
  { name: "Divya N.", achievement: "Produced 50+ masterclass trailers that went viral" },
  { name: "Rahul B.", achievement: "Closed partnerships with India's top creative universities" },
  { name: "Ishita L.", achievement: "Built The Forge — our flagship creative accelerator" },
];

/* ─── FAQ data ─── */
const faqs = [
  {
    q: "What is LevelUp Learning?",
    a: `We're India's largest creative education ecosystem, designed around one simple principle:\n\n"If it doesn't help creators level up, we don't build it."\n\nThe result? 70,000+ learners, 300K+ community members, and a generation of creators discovering their creative calling.`,
  },
  {
    q: "What's the culture like?",
    a: `"Hands off" doesn't exist at LevelUp.\n\nOur designers are strategizing. Our ops team is building products. Our marketers are directing films.\n\nWe're a proud meritocracy. Titles and roles are the least interesting thing about LevelUp team members.\n\nAnd last but not least: chai breaks are tradition. Late-night shipping sessions are every week.`,
  },
  {
    q: "Why choose LevelUp?",
    a: `Well, we've grown from zero to India's largest creative education community. But that's not why you should choose LevelUp.\n\nWorking at LevelUp is a bet on yourself.\n\nName another company where a 22-year-old builds an entire masterclass platform — or a designer ships a brand refresh in a weekend.\n\nIf you have talent and drive, we will back you like nobody else.`,
  },
  {
    q: "Does LevelUp offer benefits?",
    a: `Yes, lots and lots.\n\nA competitive salary. ESOPs for early team members. Health insurance. Annual learning budget for courses, books, and conferences. Flexible hybrid work. Creative freedom to experiment. Direct access to India's top creative professionals. And the chance to shape how an entire generation discovers their passion.`,
  },
];

/* ─── Open positions ─── */
const openPositions = [
  "Content Creator / Marketing",
  "Business Development Executive",
  "Human Resource Associate",
  "Operations Associate",
  "Graphic Designer",
  "Video Editor",
  "Product Manager",
  "No Code Website Designer",
  "Founder's Office",
  "Event Operations",
  "Instructional Designer",
];

/* ─── Founders letter ─── */
const founderLetterParagraphs = [
  `When we started hiring for LevelUp we had one simple criterion:`,
  `"If this person started a company would we join them?"`,
  `This made our first call easy. We found people who were obsessed with the intersection of creativity and education — people who believed India's creative talent deserved world-class learning.`,
  `That first year, we assembled a small crew of brilliant misfits. And that group of misfits built India's largest creative education ecosystem.`,
  `Fast forward to today. 70,000+ learners. 300K+ community. 100+ masterclasses with India's best creative minds.`,
  `We didn't get here by hiring "normal" people.`,
  `You'll be given too much responsibility. You'll never be bored.`,
  `You'll be pushed to do the best work of your career — at the fastest pace of your career.`,
  `That's not for most people. And that's okay.`,
  `But maybe you're not "most people."`,
];

const Careers = () => {
  usePageSeo({
    title: "Careers — LevelUp Learning",
    description:
      "Join India's largest creative education ecosystem. We only hire builders.",
    path: "/careers",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-primary/30">
        <Navbar />

        {/* ═══════════════════════ SECTION 1 — HERO ═══════════════════════ */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 pt-28 pb-16 overflow-hidden">
          {/* Starfield background */}
          <div className="absolute inset-0">
            <StarField starCount={400} speed={0.15} />
          </div>

          {/* Ambient glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#FF6500]/8 rounded-full blur-[160px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <m.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-display text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] leading-[0.85] tracking-tight uppercase font-bold"
            >
              We only hire
              <br />
              <span className="text-[#FF6500]">builders</span>
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 md:mt-8 text-base md:text-lg text-[#888] max-w-2xl mx-auto leading-relaxed"
            >
              Come here to solve hard problems, build without permission, and ship work you're proud of. Sounds intense? It is.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8"
            >
              <a
                href="#jobs"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF6500] text-black font-semibold text-sm tracking-wide rounded-full transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-[#FF6500]/25"
              >
                See open positions
              </a>
            </m.div>
          </div>
        </section>

        <section className="py-16 md:py-24 overflow-hidden">
          <TeamPhotoCarousel cards={teamCards} />
        </section>
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
          <div className="max-w-6xl mx-auto">
            {/* Section headline */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16 md:mb-20"
            >
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl uppercase leading-tight font-bold">
                Work on hard problems
                <br />
                with <span className="text-[#FF6500]">hardcore people.</span>
              </h2>
              <p className="mt-4 text-[#888] max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                Our founder thought it'd be a good idea to write a letter persuading you not to apply.
              </p>
            </m.div>

            {/* Polaroid collage + Letter */}
            <div className="relative flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
              {/* Polaroid cluster — left side */}
              <div className="hidden lg:block relative w-[340px] h-[420px] flex-shrink-0">
                {[
                  { rotate: -8, top: "0%", left: "0%" },
                  { rotate: 4, top: "5%", left: "45%" },
                  { rotate: -3, top: "40%", left: "10%" },
                  { rotate: 6, top: "45%", left: "50%" },
                  { rotate: -5, top: "20%", left: "25%" },
                ].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute w-[140px] h-[170px] bg-white rounded-sm p-2 shadow-xl"
                    style={{
                      transform: `rotate(${pos.rotate}deg)`,
                      top: pos.top,
                      left: pos.left,
                    }}
                  >
                    <div className="w-full h-[120px] bg-gradient-to-br from-[#1A1208] to-[#2a1e10] rounded-sm" />
                    <div className="mt-1.5 h-2 w-12 bg-[#ddd] rounded-full" />
                  </div>
                ))}
              </div>

              {/* Letter card */}
              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex-1 relative bg-[#FEFCF8] text-[#1A1208] rounded-xl p-8 md:p-12 shadow-2xl"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
                }}
              >
                {founderLetterParagraphs.map((p, i) => (
                  <p
                    key={i}
                    className={`text-sm md:text-base leading-relaxed ${
                      i === 1 ? "italic font-semibold my-4" : "mb-4"
                    } ${i === founderLetterParagraphs.length - 1 ? "font-semibold italic" : ""}`}
                  >
                    {p}
                  </p>
                ))}
                <div className="mt-8 flex items-center gap-6">
                  <div>
                    <p className="text-xs font-bold tracking-wider uppercase text-[#1A1208]/60">
                      The LevelUp Team
                    </p>
                    <p className="text-[10px] text-[#1A1208]/40 mt-0.5">Founders</p>
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ SECTION 4 — FAQ ═══════════════════════ */}
        <section className="px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
              {/* Left column — headline + accordion */}
              <div className="flex-1 lg:max-w-[50%]">
                <m.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="mb-10 md:mb-14"
                >
                  <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] uppercase leading-[0.95] font-bold">
                    Not a <span className="text-[#FF6500]">"normal"</span>
                    <br />
                    startup job.
                  </h2>
                  <p className="mt-5 text-[#888] text-sm md:text-[15px] leading-relaxed max-w-md">
                    Ready to do the best work of your career? We'll give you the autonomy and ridiculously talented co-workers to make it happen.
                  </p>
                </m.div>

                {/* Accordion */}
                <div>
                  {faqs.map((faq, i) => (
                    <m.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="border-b border-white/10"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between py-6 md:py-7 text-left group"
                      >
                        <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-[#FF6500] transition-colors">
                          {faq.q}
                        </h3>
                        <span className="flex-shrink-0 ml-4 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[#FF6500] transition-colors group-hover:border-[#FF6500]/40">
                          {openFaq === i ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </span>
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <m.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="pb-6 text-sm text-[#888] leading-relaxed whitespace-pre-line">
                              {faq.a}
                            </p>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </m.div>
                  ))}
                </div>
              </div>

              {/* Right column — placeholder image collage */}
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 hidden lg:flex items-start justify-center pt-8"
              >
                <div className="relative w-full max-w-[520px] aspect-[4/5]">
                  {/* Stacked photo collage placeholders */}
                  {[
                    { rotate: -6, top: "5%", left: "5%", w: "65%", h: "55%", z: 1 },
                    { rotate: 3, top: "0%", left: "30%", w: "70%", h: "50%", z: 2 },
                    { rotate: -2, top: "35%", left: "8%", w: "60%", h: "50%", z: 3 },
                    { rotate: 5, top: "25%", left: "35%", w: "65%", h: "55%", z: 4 },
                    { rotate: -4, top: "15%", left: "20%", w: "55%", h: "45%", z: 5 },
                  ].map((pos, i) => (
                    <div
                      key={i}
                      className="absolute rounded-lg overflow-hidden shadow-2xl border border-white/5"
                      style={{
                        transform: `rotate(${pos.rotate}deg)`,
                        top: pos.top,
                        left: pos.left,
                        width: pos.w,
                        height: pos.h,
                        zIndex: pos.z,
                      }}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-[#1a1510] to-[#2a1e10]" />
                    </div>
                  ))}
                </div>
              </m.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ SECTION 5 — JOB LISTINGS ═══════════════════════ */}
        <section id="jobs" className="px-6 md:px-12 lg:px-20 py-20 md:py-28">
          <div className="max-w-4xl mx-auto">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-10 md:mb-14"
            >
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl uppercase leading-tight font-bold">
                Ready to build?
              </h2>
              <p className="font-display text-3xl md:text-5xl lg:text-6xl uppercase leading-tight font-bold text-[#FF6500]">
                See our open positions.
              </p>
            </m.div>

            {/* Positions grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {openPositions.map((role) => (
                <a
                  key={role}
                  href="https://tally.so/r/mO8eZ8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 py-5 rounded-xl bg-[#1A1208]/60 border border-white/5 hover:border-[#FF6500]/40 hover:bg-[#FF6500]/10 transition-all duration-200 group"
                >
                  <span className="text-sm md:text-base font-semibold text-white group-hover:text-[#FF6500] transition-colors">
                    {role}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#FF6500] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-3" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ SECTION 6 — FOOTER ═══════════════════════ */}
        <Footer />
      </div>
    </LazyMotion>
  );
};

export default Careers;
