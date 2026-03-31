import { useEffect, useState, useRef } from "react";
import { ArrowRight, ChevronDown, Search, Plus, Minus } from "lucide-react";
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

/* ─── Job departments ─── */
const jobDepartments = [
  { name: "Growth", count: 2 },
  { name: "Product", count: 2 },
  { name: "Leadership", count: 1 },
  { name: "Operations", count: 2 },
  { name: "Learning Design", count: 1 },
  { name: "Creative", count: 3 },
  { name: "Marketing", count: 2 },
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
  const [expandedDept, setExpandedDept] = useState<string | null>(null);
  const [teamFilter, setTeamFilter] = useState("All teams");
  const [locationFilter, setLocationFilter] = useState("All locations");
  const [searchQuery, setSearchQuery] = useState("");
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredDepts = jobDepartments.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        {/* ═══════════════════════ SECTION 2 — TEAM CAROUSEL ═══════════════════════ */}
        <section className="py-16 md:py-24 overflow-hidden">
          <div
            ref={carouselRef}
            className="flex gap-4 md:gap-6 px-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {teamCards.map((card, i) => {
              const isCenter = i === Math.floor(teamCards.length / 2);
              return (
                <m.div
                  key={card.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.4) }}
                  className={`flex-shrink-0 snap-center w-[260px] md:w-[300px] rounded-xl p-5 md:p-6 relative transition-all duration-500 ${
                    isCenter
                      ? "scale-105 opacity-100"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: "#1A1208" }}
                >
                  {/* Name badge */}
                  <span className="inline-block px-3 py-1 text-[10px] tracking-[0.15em] uppercase font-medium rounded-full bg-[#FF6500]/15 text-[#FF6500] mb-4">
                    {card.name}
                  </span>
                  <p className="text-white font-bold text-base md:text-lg leading-snug">
                    {card.achievement}
                  </p>
                  {/* Subtle bottom glow */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#FF6500]/20 to-transparent" />
                </m.div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════ SECTION 3 — FOUNDERS LETTER ═══════════════════════ */}
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
                      Eric & Karim
                    </p>
                    <p className="text-[10px] text-[#1A1208]/40 mt-0.5">Co-Founders</p>
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ SECTION 4 — FAQ ═══════════════════════ */}
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28">
          <div className="max-w-3xl mx-auto">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl uppercase leading-tight font-bold">
                Not a <span className="text-[#FF6500]">"normal"</span> startup job.
              </h2>
              <p className="mt-4 text-[#888] max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                Ready to do the best work of your career? We'll give you the autonomy and ridiculously talented co-workers to make it happen.
              </p>
            </m.div>

            <div className="space-y-0">
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
                    className="w-full flex items-center justify-between py-6 text-left group"
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

            {/* Filters row */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              {/* Team dropdown */}
              <div className="relative">
                <select
                  value={teamFilter}
                  onChange={(e) => setTeamFilter(e.target.value)}
                  className="appearance-none w-full sm:w-48 px-4 py-3 pr-10 text-sm bg-[#1A1208] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF6500]/50 cursor-pointer"
                >
                  <option>All teams</option>
                  {jobDepartments.map((d) => (
                    <option key={d.name}>{d.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888] pointer-events-none" />
              </div>

              {/* Location dropdown */}
              <div className="relative">
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="appearance-none w-full sm:w-48 px-4 py-3 pr-10 text-sm bg-[#1A1208] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF6500]/50 cursor-pointer"
                >
                  <option>All locations</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888] pointer-events-none" />
              </div>

              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
                <input
                  type="text"
                  placeholder="Search open positions"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 text-sm bg-[#1A1208] border border-white/10 rounded-xl text-white placeholder:text-[#888]/60 focus:outline-none focus:border-[#FF6500]/50 transition-colors"
                />
              </div>
            </div>

            {/* Departments accordion */}
            <div className="border-t border-white/10">
              {filteredDepts.map((dept) => (
                <div key={dept.name} className="border-b border-white/10">
                  <button
                    onClick={() =>
                      setExpandedDept(expandedDept === dept.name ? null : dept.name)
                    }
                    className="w-full flex items-center justify-between py-5 px-1 text-left group"
                  >
                    <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-[#FF6500] transition-colors">
                      {dept.name}{" "}
                      <span className="text-[#888] font-normal">({dept.count})</span>
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-[#FF6500] transition-transform duration-200 ${
                        expandedDept === dept.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedDept === dept.name && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 px-1 space-y-3">
                          {Array.from({ length: dept.count }, (_, j) => (
                            <a
                              key={j}
                              href="https://tally.so/r/mO8eZ8"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between py-3 px-4 rounded-xl bg-[#1A1208]/60 hover:bg-[#1A1208] border border-white/5 hover:border-[#FF6500]/20 transition-all group/job"
                            >
                              <span className="text-sm text-white group-hover/job:text-[#FF6500] transition-colors">
                                {dept.name} — Role {j + 1}
                              </span>
                              <ArrowRight className="w-4 h-4 text-[#FF6500] opacity-0 group-hover/job:opacity-100 transition-opacity" />
                            </a>
                          ))}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
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
