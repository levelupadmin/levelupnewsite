import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import usePageSeo from "@/hooks/usePageSeo";

const departments = [
  "All Teams",
  "Growth",
  "Product",
  "Leadership",
  "Operations",
  "Learning",
  "Creative",
  "Marketing",
];

const roles = [
  { title: "Business Development Executive", dept: "Growth", type: "Full-Time" },
  { title: "Product Manager", dept: "Product", type: "Full-Time" },
  { title: "No Code Website Designer", dept: "Product", type: "Full-Time" },
  { title: "Founder's Office", dept: "Leadership", type: "Full-Time" },
  { title: "Event Operations", dept: "Operations", type: "Full-Time" },
  { title: "Instructional Designer", dept: "Learning", type: "Full-Time" },
  { title: "Graphic Designer", dept: "Creative", type: "Full-Time" },
  { title: "Content Creator / Marketing", dept: "Marketing", type: "Full-Time" },
  { title: "Video Editor", dept: "Creative", type: "Full-Time" },
];

const values = [
  {
    title: "Ownership Over Everything",
    description:
      "We don't wait for permission. Every team member owns their domain end-to-end — from ideation to execution to impact.",
  },
  {
    title: "Speed Is a Feature",
    description:
      "We ship fast, learn faster. Perfection is the enemy — momentum is the ally. Move with urgency, iterate relentlessly.",
  },
  {
    title: "Build for the Learner",
    description:
      "Every decision traces back to impact on our 70,000+ learners. If it doesn't serve them, it doesn't ship.",
  },
  {
    title: "Radical Transparency",
    description:
      "No politics, no silos. We share context freely so everyone can make the best decisions without gatekeepers.",
  },
];

const perks = [
  { emoji: "🚀", title: "Growth Budget", desc: "Annual learning stipend for courses, books, and conferences" },
  { emoji: "🏠", title: "Flexible Work", desc: "Hybrid setup — work from wherever you do your best thinking" },
  { emoji: "🎯", title: "Real Impact", desc: "Your work directly shapes the creative education landscape in India" },
  { emoji: "🤝", title: "Small Team, Big Moves", desc: "No bureaucracy — just a tight crew building at startup speed" },
  { emoji: "💡", title: "Creative Freedom", desc: "Experiment, break things, and build solutions nobody's tried before" },
  { emoji: "📈", title: "Equity & Upside", desc: "Grow with us — early team members share in the company's success" },
];

const Careers = () => {
  usePageSeo({
    title: "Careers — LevelUp Learning",
    description:
      "Join India's largest creative education ecosystem. Explore open roles in growth, product, design, marketing, and operations at LevelUp Learning.",
    path: "/careers",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeDept, setActiveDept] = useState("All Teams");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  const filteredRoles = roles.filter((role) => {
    const matchesDept = activeDept === "All Teams" || role.dept === activeDept;
    const matchesSearch = role.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
        <Navbar />

        {/* Film grain overlay */}
        <div className="fixed inset-0 bg-[url('/grain.png')] opacity-[0.07] pointer-events-none z-50 mix-blend-overlay" />

        {/* ═══ HERO ═══ */}
        <section className="relative px-6 md:px-12 lg:px-20 pt-32 pb-8 md:pt-44 md:pb-12 overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/8 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <m.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display text-[3.5rem] md:text-[6rem] lg:text-[8rem] leading-[0.9] tracking-tight uppercase"
            >
              We Only Hire{" "}
              <span className="text-primary">Builders</span>
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 md:mt-8 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Come help us build India's largest creative education ecosystem — 70,000+ learners,
              300K community, and a team that refuses to be ordinary.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <a
                href="#open-positions"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold text-sm tracking-widest uppercase rounded-sm transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
              >
                See Open Roles <ArrowRight className="w-4 h-4" />
              </a>
            </m.div>
          </div>

          {/* Scattered achievement cards — Ramp-style collage */}
          <div className="relative z-10 mt-14 md:mt-20 max-w-6xl mx-auto h-[260px] md:h-[340px] hidden md:block">
            {/* Card 1 — top left */}
            <m.div
              initial={{ opacity: 0, y: 30, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -6 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute left-[2%] top-[10%] w-44 bg-card border border-border rounded-sm p-4 shadow-lg"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-primary/60 mb-1">Impact</p>
              <p className="text-sm font-semibold text-foreground leading-snug">
                Built a creative ecosystem reaching <span className="text-primary">70K+ learners</span>
              </p>
            </m.div>

            {/* Card 2 — top center-left */}
            <m.div
              initial={{ opacity: 0, y: 30, rotate: 3 }}
              animate={{ opacity: 1, y: 0, rotate: 3 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="absolute left-[22%] top-[0%] w-40 bg-primary rounded-sm p-4 shadow-lg"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-primary-foreground/60 mb-1">Growth</p>
              <p className="text-sm font-bold text-primary-foreground leading-snug">
                Scaled community to 300K+ members
              </p>
            </m.div>

            {/* Card 3 — center */}
            <m.div
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute left-[38%] top-[15%] w-48 bg-card border border-primary/20 rounded-sm p-4 shadow-lg"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-primary/60 mb-1">Recognition</p>
              <p className="text-sm font-semibold text-foreground leading-snug">
                Featured in <span className="text-primary">YourStory, The Hindu</span> & more
              </p>
            </m.div>

            {/* Card 4 — center-right */}
            <m.div
              initial={{ opacity: 0, y: 30, rotate: 5 }}
              animate={{ opacity: 1, y: 0, rotate: 5 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="absolute right-[20%] top-[5%] w-44 bg-card border border-border rounded-sm p-4 shadow-lg"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-primary/60 mb-1">Rating</p>
              <p className="text-sm font-semibold text-foreground leading-snug">
                <span className="text-primary font-display text-2xl">4.86</span>
                <span className="text-muted-foreground text-xs ml-1">/ 5 avg rating</span>
              </p>
            </m.div>

            {/* Card 5 — far right */}
            <m.div
              initial={{ opacity: 0, y: 30, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: -4 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="absolute right-[1%] top-[12%] w-40 bg-card border border-border rounded-sm p-4 shadow-lg"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-primary/60 mb-1">Programs</p>
              <p className="text-sm font-semibold text-foreground leading-snug">
                100+ masterclasses & programs delivered
              </p>
            </m.div>

            {/* Decorative dots */}
            <div className="absolute left-[18%] bottom-[10%] w-3 h-3 rounded-full bg-primary/30" />
            <div className="absolute right-[35%] bottom-[5%] w-2 h-2 rounded-full bg-primary/20" />
            <div className="absolute right-[12%] bottom-[20%] w-4 h-4 rounded-full bg-primary/15" />
          </div>
        </section>

        {/* ═══ WORK ON HARD PROBLEMS ═══ */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl uppercase leading-tight">
                Work on hard problems
                <br />
                with{" "}
                <span className="text-primary">hardcore people.</span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                Our team is small, scrappy, and obsessed with impact. Every role here pushes the boundaries of what creative education can be in India.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { value: "70K+", label: "Learners" },
                { value: "300K+", label: "Community" },
                { value: "100+", label: "Programs Delivered" },
                { value: "4.86", label: "Avg Rating" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-6 md:p-8 border border-border rounded-sm bg-card/50"
                >
                  <p className="font-display text-3xl md:text-5xl text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-2 tracking-widest uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ NOT A NORMAL STARTUP JOB — Values ═══ */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl uppercase leading-tight">
                Not a <span className="text-primary">"normal"</span> startup job.
              </h2>
              <p className="mt-4 text-muted-foreground max-w-lg mx-auto text-sm md:text-base leading-relaxed">
                We're not building another edtech product. We're shaping how an entire generation discovers and masters their creative calling.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {values.map((v, i) => (
                <m.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group p-6 md:p-8 border border-border rounded-sm bg-card/30 hover:bg-card/60 hover:border-primary/30 transition-all duration-300"
                >
                  <span className="text-[10px] tracking-[0.3em] uppercase text-primary/60 font-medium">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl uppercase mt-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    {v.description}
                  </p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PERKS ═══ */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-5xl uppercase">
                Why <span className="text-primary">LevelUp?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {perks.map((perk, i) => (
                <m.div
                  key={perk.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-6 border border-border rounded-sm bg-card/30 hover:border-primary/20 transition-colors duration-300"
                >
                  <span className="text-2xl">{perk.emoji}</span>
                  <h3 className="font-semibold text-foreground mt-3">{perk.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {perk.desc}
                  </p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ OPEN POSITIONS ═══ */}
        <section
          id="open-positions"
          className="px-6 md:px-12 lg:px-20 py-16 md:py-24 border-t border-border"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="font-display text-3xl md:text-5xl uppercase">
                Ready to build?
              </h2>
              <p className="font-display text-3xl md:text-5xl uppercase text-primary">
                See our open positions.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              {/* Department pills */}
              <div className="flex flex-wrap gap-2 flex-1">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setActiveDept(dept)}
                    className={`px-4 py-2 text-xs tracking-widest uppercase rounded-sm border transition-all duration-200 ${
                      activeDept === dept
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search positions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-card/50 border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            {/* Job listings */}
            <div className="border-t border-border">
              <AnimatePresence mode="wait">
                {filteredRoles.length > 0 ? (
                  filteredRoles.map((role) => (
                    <m.div
                      key={role.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-border"
                    >
                      <button
                        onClick={() =>
                          setExpandedRole(
                            expandedRole === role.title ? null : role.title
                          )
                        }
                        className="w-full flex items-center justify-between py-5 px-2 text-left group hover:bg-card/30 transition-colors"
                      >
                        <div>
                          <h3 className="text-base md:text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                            {role.title}
                          </h3>
                          <p className="text-[11px] tracking-widest uppercase text-muted-foreground mt-1">
                            {role.dept} · {role.type}
                          </p>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                            expandedRole === role.title ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {expandedRole === role.title && (
                          <m.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="px-2 pb-6 flex flex-col sm:flex-row sm:items-center gap-4">
                              <p className="text-sm text-muted-foreground flex-1">
                                Join our {role.dept.toLowerCase()} team and help shape the
                                future of creative education in India.
                              </p>
                              <a
                                href="https://tally.so/r/mO8eZ8"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-xs font-semibold tracking-widest uppercase rounded-sm hover:bg-primary/90 transition-colors whitespace-nowrap"
                              >
                                Apply Now <ArrowRight className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </m.div>
                  ))
                ) : (
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 text-center text-muted-foreground"
                  >
                    <p>No positions match your search. Try a different filter.</p>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ═══ BOTTOM CTA ═══ */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 border-t border-border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-6xl uppercase leading-tight">
              Don't see your role?
              <br />
              <span className="text-primary">Reach out anyway.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto text-sm md:text-base leading-relaxed">
              We're always looking for extraordinary people. If you think you can make an
              impact, we want to hear from you.
            </p>
            <div className="mt-8">
              <a
                href="https://tally.so/r/mO8eZ8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-widest uppercase border-2 border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-primary transition-all duration-300 rounded-sm"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </LazyMotion>
  );
};

export default Careers;
