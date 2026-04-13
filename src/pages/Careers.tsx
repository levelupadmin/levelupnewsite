import { useEffect, useState, useRef } from "react";
import { ArrowRight, ChevronDown, Search, Plus, Minus } from "lucide-react";
import TeamPhotoCarousel from "@/components/careers/TeamPhotoCarousel";
import { m, LazyMotion, domAnimation, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";
import usePageSeo from "@/hooks/usePageSeo";

/* ─── Team carousel data ─── */
const teamCards = [
  { name: "Aarav S.", achievement: "Designed the masterclass platform that 70K+ learners use daily", image: "/images/team-member.png" },
  { name: "Priya M.", achievement: "Built our community engine that scaled to 300K members", image: "/images/team-member-2.png" },
  { name: "Rohan K.", achievement: "Shipped the entire student dashboard in one sprint", image: "/images/team-member-3.png" },
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
    a: `Yes, lots and lots.\n\nA competitive salary. Creative freedom to experiment. Direct access to India's top creative professionals. And the chance to shape how an entire generation discovers their passion.`,
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

  /* ─── Hero slideshow ─── */
  const heroSlides = [
    { img: "/images/team-selfie.jpg", label: "Travel Travel Travel" },
    { img: "/images/team-goa-beach.jpg", label: "Team offsite — Goa 2024" },
    { img: "/images/team-beach-vibes.jpg", label: "Shoot day at the coast — Chennai 2024" },
    { img: "/images/team-towers.jpg", label: "Malaysia offsite — KL 2025" },
    { img: "/images/team-full-group.jpg", label: "The Forge wrap — Chennai 2024" },
  ];
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroProgress, setHeroProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
      setHeroProgress(0);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setHeroProgress((prev) => Math.min(prev + 1, 100));
    }, 40);
    return () => clearInterval(progressInterval);
  }, [heroIndex]);

  /* ─── Footer reveal effect ─── */
  const footerWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: footerProgress } = useScroll({
    target: footerWrapRef,
    offset: ["start end", "end end"],
  });
  const footerOverlayOpacity = useTransform(footerProgress, [0, 1], [1, 0]);
  const footerContentY = useTransform(footerProgress, [0, 1], ["-30%", "0%"]);

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-primary/30 relative">
        {/* Subtle film grain texture overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-[1]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "150px 150px",
            opacity: 0.15,
          }}
        />
        <div className="relative z-[2]">
        <Navbar />

        {/* ═══════════════════════ SECTION 1 — HERO SLIDESHOW ═══════════════════════ */}
        <section className="relative h-[85vh] md:h-screen min-h-[520px] overflow-hidden">
          {/* Sliding background images */}
          <AnimatePresence initial={false}>
            <m.div
              key={heroIndex}
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.7, ease: [0.77, 0, 0.18, 1] }}
              className="absolute inset-0"
            >
              <img
                src={heroSlides[heroIndex].img}
                alt=""
                className="w-full h-full object-cover object-[center_20%] md:object-center"
              />
            </m.div>
          </AnimatePresence>

          {/* Dark overlay — stronger on mobile */}
          <div className="absolute inset-0 bg-black/65 md:bg-black/55" />
          {/* Left gradient overlay for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 70%, transparent 100%)",
            }}
          />

          {/* Hero copy — left-aligned, vertically centred */}
          <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-12 lg:px-[48px] max-w-3xl">
            <m.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-display uppercase font-bold leading-[0.9] text-[2.2rem] sm:text-[3rem] md:text-[5rem]"
            >
              We only hire
              <br />
              <span className="text-[#FF4E00]">builders.</span>
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-5 text-sm text-white/55 max-w-md"
            >
              Come here to solve hard problems, build without permission, and ship work you're proud of.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 md:mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#jobs"
                className="inline-flex items-center gap-2 px-5 py-2.5 md:px-7 md:py-3.5 bg-[#FF4E00] text-white font-semibold text-xs md:text-sm tracking-wide rounded-full transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-[#FF4E00]/25"
              >
                See open positions
              </a>
              <a
                href="#team-carousel"
                className="inline-flex items-center gap-2 px-5 py-2.5 md:px-7 md:py-3.5 border border-white/40 text-white font-semibold text-xs md:text-sm tracking-wide rounded-full transition-all duration-300 hover:border-white hover:bg-white/5"
              >
                Meet the team &rarr;
              </a>
            </m.div>
          </div>

          {/* Bottom-left slide label */}
          <div className="absolute bottom-6 left-8 md:left-12 lg:left-[48px] z-10">
            <AnimatePresence mode="wait">
              <m.p
                key={heroIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="text-[10px] uppercase tracking-[0.15em] text-white/40"
              >
                {heroSlides[heroIndex].label}
              </m.p>
            </AnimatePresence>
          </div>

          {/* Stats ticker */}
          <div className="absolute bottom-[3px] left-0 right-0 z-10 overflow-hidden bg-[#FF4E00]">
            <div className="flex animate-ticker whitespace-nowrap py-3.5">
              {[...Array(3)].map((_, repeat) => (
                <div key={repeat} className="flex shrink-0 items-center">
                  {[
                    "67,746+ Learners",
                    "4.86 Rating (15,000+ reviews)",
                    "821+ Cities",
                    "3,000+ Collaborations enabled",
                  ].map((stat, i) => (
                    <span key={i} className="flex items-center mx-5 md:mx-12">
                      <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-black/30 mr-2 md:mr-3 shrink-0" />
                      <span className="text-[10px] md:text-sm font-bold tracking-wide text-black uppercase">
                        {stat}
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

        </section>

        <section className="py-20 md:py-32 overflow-visible">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            {/* Section headline */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-10 md:mb-20"
            >
              <h2 className="font-display text-2xl md:text-5xl lg:text-6xl uppercase leading-tight font-bold">
                Work on hard problems
                <br />
                with <span className="text-[#FF6500]">hardcore people.</span>
              </h2>
              <p className="mt-4 text-[#888] max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                Our founder thought it'd be a good idea to write a letter persuading you not to apply.
              </p>
            </m.div>

            {/* Polaroids on sides + Letter in center */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-10">
              {/* Left polaroids */}
              <div className="hidden lg:flex flex-col gap-8 flex-shrink-0 w-[280px] pt-8">
                {[
                  { rotate: -8, img: "/images/team-selfie.jpg", caption: "Late-night shipping crew" },
                  { rotate: 4, img: "/images/team-studio.jpg", caption: "Masterclass shoot day" },
                  { rotate: -5, img: "/images/team-towers.jpg", caption: "KL offsite" },
                ].map((pos, i) => (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, x: -30, rotate: pos.rotate }}
                    whileInView={{ opacity: 1, x: 0, rotate: pos.rotate }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    className="bg-white rounded-sm p-3 pb-10 shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <img src={pos.img} alt={pos.caption} className="w-full h-[180px] object-cover rounded-sm" />
                  </m.div>
                ))}
              </div>

              {/* Letter card — center */}
              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex-1 w-full max-w-2xl bg-[#FEFCF8] text-[#1A1208] rounded-xl p-8 md:p-12 shadow-2xl"
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

              {/* Right polaroids */}
              <div className="hidden lg:flex flex-col gap-8 flex-shrink-0 w-[280px] pt-16">
                {[
                  { rotate: 6, img: "/images/team-dinner.jpg", caption: "Team dinner, Goa" },
                  { rotate: -3, img: "/images/team-airport.jpg", caption: "Boarding for The Forge" },
                  { rotate: 5, img: "/images/team-tugofwar.jpg", caption: "Tug of war day" },
                ].map((pos, i) => (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, x: 30, rotate: pos.rotate }}
                    whileInView={{ opacity: 1, x: 0, rotate: pos.rotate }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    className="bg-white rounded-sm p-3 pb-10 shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <img src={pos.img} alt={pos.caption} className="w-full h-[180px] object-cover rounded-sm" />
                  </m.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ WHO WE'RE LOOKING FOR ═══════════════════════ */}
        <section className="px-6 md:px-12 lg:px-20 py-24 md:py-36">
          <div className="max-w-5xl mx-auto">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-14 md:mb-20"
            >
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#FF6500] mb-4">
                Who we are looking for
              </p>
              <h2 className="font-display text-2xl md:text-5xl lg:text-[3.5rem] leading-tight font-bold">
                LevelUp is not the right place
                <br />
                for everyone.
              </h2>
              <p className="mt-5 text-[#888] max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                If you prefer a prescriptive corporate structure and a typical office environment, that is not us. If you want hypergrowth, can solve complex problems, are willing to work weird hours, and can thrive on change and a bit of chaos, then we should talk.
              </p>
            </m.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {[
                { title: "You report in outcomes, not effort.", desc: "Hours worked do not interest you. What shipped. What changed. That is what you bring to every check-in." },
                { title: "You care deeply about your craft.", desc: "And you keep developing it. The standard here does not stay fixed. It keeps moving and you like that." },
                { title: "You ship fast and learn.", desc: "A real thing that exists beats a perfect plan still being discussed. You know when to move and you move." },
                { title: "You operate on high trust.", desc: "Say what needs to be said, even when it is uncomfortable. No politics. No positioning. Just the truth, fast." },
                { title: "You are willing to work weird hours.", desc: "Not because we demand it. Because when you care about something you do not clock-watch." },
                { title: "You thrive on change and a bit of chaos.", desc: "Stagnation scares you more than uncertainty. You figure things out as they move." },
              ].map((card, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative bg-[#1A1208] border border-white/5 rounded-xl p-6 md:p-8 overflow-hidden group hover:border-[#FF6500]/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,101,0,0.15)]"
                >
                  <div className="absolute inset-0 rounded-xl bg-[#FF6500]/0 group-hover:bg-[#FF6500]/[0.04] transition-all duration-500 pointer-events-none" />
                  <span className="absolute bottom-3 right-5 text-[5rem] font-bold leading-none pointer-events-none select-none text-white/0 group-hover:text-[#FF6500]/10 transition-all duration-500">
                    {i + 1}
                  </span>
                  <h3 className="relative text-base md:text-lg font-bold text-white mb-3 leading-snug">
                    {card.title}
                  </h3>
                  <p className="relative text-sm text-[#888] leading-relaxed group-hover:text-[#999] transition-colors duration-500">
                    {card.desc}
                  </p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ LIFE AT LEVELUP — MOBILE ONLY ═══════════════════════ */}
        <section className="lg:hidden py-16 px-6 overflow-hidden">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#FF6500] mb-2">
              Behind the scenes
            </p>
            <h2 className="font-display text-2xl uppercase font-bold">
              Life at LevelUp
            </h2>
          </m.div>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scrollbar-hide" style={{ WebkitOverflowScrolling: "touch" }}>
            {[
              "/images/team-selfie.jpg",
              "/images/team-goa-beach.jpg",
              "/images/team-dinner.jpg",
              "/images/team-towers.jpg",
              "/images/team-studio.jpg",
              "/images/team-airport.jpg",
              "/images/team-tugofwar.jpg",
              "/images/team-full-group.jpg",
              "/images/team-conference.jpg",
              "/images/team-beach-vibes.jpg",
            ].map((img, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex-shrink-0 snap-center w-[280px] bg-white rounded-sm p-2.5 pb-8 shadow-xl"
                style={{ transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)` }}
              >
                <img src={img} alt="" className="w-full h-[180px] object-cover rounded-sm" />
              </m.div>
            ))}
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
                  <h2 className="font-display text-2xl md:text-5xl lg:text-[3.5rem] uppercase leading-[0.95] font-bold">
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

              {/* Right column — polaroid photo collage */}
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 hidden lg:flex items-start justify-center pt-8"
              >
                <div className="relative w-full max-w-[520px] aspect-[4/5]">
                  {[
                    { rotate: -6, top: "0%", left: "0%", w: 250, img: "/images/team-goa-beach.jpg", caption: "Goa team trip" },
                    { rotate: 4, top: "0%", left: "52%", w: 250, img: "/images/team-full-group.jpg", caption: "The whole crew" },
                    { rotate: -3, top: "52%", left: "0%", w: 250, img: "/images/team-beach-vibes.jpg", caption: "Beach vibes" },
                    { rotate: 5, top: "52%", left: "52%", w: 250, img: "/images/team-conference.jpg", caption: "Film festival crew" },
                  ].map((pos, i) => (
                    <m.div
                      key={i}
                      initial={{ opacity: 0, y: 25, rotate: pos.rotate }}
                      whileInView={{ opacity: 1, y: 0, rotate: pos.rotate }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.12 }}
                      className="absolute bg-white rounded-sm p-3 pb-10 shadow-2xl hover:scale-105 hover:z-20 transition-transform duration-300 cursor-pointer"
                      style={{
                        top: pos.top,
                        left: pos.left,
                        width: pos.w,
                        zIndex: i + 1,
                      }}
                    >
                      <img src={pos.img} alt={pos.caption} className="w-full h-[200px] object-cover rounded-sm" />
                    </m.div>
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
              <h2 className="font-display text-2xl md:text-5xl lg:text-6xl uppercase leading-tight font-bold">
                Ready to build?
              </h2>
              <p className="font-display text-2xl md:text-5xl lg:text-6xl uppercase leading-tight font-bold text-[#FF6500]">
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
                  className="flex items-center justify-between px-4 py-4 md:px-5 md:py-5 rounded-xl bg-[#1A1208]/60 border border-white/5 hover:border-[#FF6500]/40 hover:bg-[#FF6500]/10 transition-all duration-200 group"
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

        {/* ═══════════════════════ COLD EMAIL CTA ═══════════════════════ */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl mx-auto bg-[#FEFCF8] rounded-2xl p-6 md:p-14 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-16"
          >
            <div className="flex-1">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#FF6500] mb-3">
                Want to stand out?
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-[#1A1208] leading-snug mb-4">
                Skip the form. Send a cold email.
              </h3>
              <p className="text-sm md:text-base text-[#1A1208]/60 leading-relaxed">
                If you are feeling more enthusiastic or want to push harder, write to us directly. Tell us{" "}
                <span className="font-bold text-[#1A1208]">exactly why we should hire you</span>. A sharp cold email that makes a real case will always get read. Generic ones will not.
              </p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
              <a
                href="mailto:hr@leveluplearning.in"
                className="inline-flex items-center justify-center gap-3 px-5 py-3 md:px-7 md:py-4 bg-[#1A1208] text-white font-semibold text-xs md:text-sm rounded-full hover:bg-[#FF6500] transition-colors duration-300 w-full lg:w-auto"
              >
                <span className="text-lg">&#9993;</span>
                hr@leveluplearning.in
              </a>
            </div>
          </m.div>
        </section>

        {/* ═══════════════════════ SECTION 6 — FOOTER (reveal effect) ═══════════════════════ */}
      </div>
      </div>

      {/* Footer reveal wrapper */}
      <div ref={footerWrapRef} className="relative h-screen">
        <div className="sticky top-0 h-screen overflow-hidden">
          <m.div style={{ y: footerContentY }} className="h-full">
            <Footer />
          </m.div>
          {/* Dark overlay that fades out as footer scrolls into view */}
          <m.div
            style={{ opacity: footerOverlayOpacity }}
            className="absolute inset-0 bg-[#0A0A0A] pointer-events-none"
          />
        </div>
      </div>
    </LazyMotion>
  );
};

export default Careers;
