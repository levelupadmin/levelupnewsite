import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import levelupLogo from "@/assets/levelup-logo.svg";

const NAVY = "#1C2333";
const DARK_NAVY = "#131929";
const GOLD = "#D4AF5A";

const roles = [
  { num: "01", title: "Business Development Executive", dept: "Growth" },
  { num: "02", title: "Product Manager", dept: "Product" },
  { num: "03", title: "No Code Website Designer", dept: "Product" },
  { num: "04", title: "Founder's Office", dept: "Leadership" },
  { num: "05", title: "Event Operations", dept: "Operations" },
  { num: "06", title: "Instructional Designer", dept: "Learning" },
  { num: "07", title: "Graphic Designer", dept: "Creative" },
  { num: "08", title: "Content Creator / Marketing", dept: "Marketing" },
  { num: "09", title: "Video Editor", dept: "Creative" },
];

const marqueeText =
  "Supercharge Your Growth · Work Weird Hours · Create Real Impact · India's Largest Creative Ecosystem · 70,000+ Learners · 300K Community · Let The Hunger Games Begin · ";

const Careers = () => {
  useEffect(() => {
    document.title = "Careers — LevelUp Learning";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* NAV */}
      <nav
        className="flex items-center justify-between px-6 md:px-12 py-5"
        style={{ backgroundColor: NAVY, borderBottom: `1px solid rgba(212,175,90,0.2)` }}
      >
        <a href="/" className="flex items-center">
          <img src={levelupLogo} alt="LevelUp Learning" className="h-8 md:h-10" />
        </a>
        <span
          className="text-xs md:text-sm tracking-widest uppercase"
          style={{ fontFamily: "'Space Mono', monospace", color: GOLD }}
        >
          Careers · 2025
        </span>
      </nav>

      {/* HERO */}
      <section className="relative px-6 md:px-12 lg:px-20 py-16 md:py-24" style={{ backgroundColor: NAVY }}>
        <p
          className="text-xs tracking-[0.25em] uppercase mb-8"
          style={{ fontFamily: "'Space Mono', monospace", color: `rgba(212,175,90,0.6)` }}
        >
          LevelUp Learning · Open Roles · 2025
        </p>

        {/* Headline */}
        <div className="mb-12 md:mb-16">
          <h1
            className="text-[4rem] md:text-[7rem] lg:text-[9rem] leading-[0.9] tracking-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-white">MAKE</span>
            <span className="flex items-center gap-4 md:gap-6">
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: `2px ${GOLD}` }}
              >
                YOUR
              </span>
              <span className="flex-grow h-[3px] md:h-[4px]" style={{ backgroundColor: GOLD }} />
            </span>
            <span className="block text-white">MOVE.</span>
          </h1>
        </div>

        {/* Two-column info */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-8"
          style={{ borderTop: `1px solid ${GOLD}` }}
        >
          <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            We're building India's largest creative education ecosystem — 70,000+ learners, 300,000+ community members, and a team of superstars who refuse to be ordinary. Come break things with us.
          </p>
          <div className="flex items-start gap-8 md:gap-12">
            {[
              { num: "70K+", label: "Learners" },
              { num: "300K", label: "Community" },
              { num: "9", label: "Open Roles" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl md:text-4xl" style={{ fontFamily: "'Bebas Neue', sans-serif", color: GOLD }}>
                  {s.num}
                </p>
                <p className="text-[10px] md:text-xs tracking-widest uppercase text-white/50" style={{ fontFamily: "'Space Mono', monospace" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden whitespace-nowrap py-4" style={{ backgroundColor: GOLD }}>
        <div className="careers-marquee inline-flex">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="inline-block text-sm md:text-base tracking-widest uppercase px-2"
              style={{ fontFamily: "'Space Mono', monospace", color: NAVY }}
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* OPEN POSITIONS */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24" style={{ backgroundColor: DARK_NAVY }}>
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-10">
          <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "'Bebas Neue', sans-serif", color: GOLD }}>
            Open Positions
          </h2>
          <span className="text-xs tracking-widest uppercase text-white/40" style={{ fontFamily: "'Space Mono', monospace" }}>
            09 Roles · Full-Time
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <a
              key={role.num}
              href="#apply"
              className="careers-role-card group relative overflow-hidden px-6 py-8 flex flex-col justify-between min-h-[180px]"
              style={{ border: `1px solid rgba(212,175,90,0.15)` }}
            >
              {/* Gold fill on hover */}
              <span
                className="absolute inset-0 origin-bottom transition-transform duration-[350ms] ease-out scale-y-0 group-hover:scale-y-100"
                style={{ backgroundColor: GOLD }}
              />
              <div className="relative z-10">
                <span
                  className="text-[10px] tracking-widest uppercase text-white/30 group-hover:text-[#1C2333]/50 transition-colors duration-300"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {role.num}
                </span>
                <h3
                  className="text-lg md:text-xl font-bold text-white group-hover:text-[#1C2333] transition-colors duration-300 mt-3"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {role.title}
                </h3>
                <p
                  className="text-[10px] tracking-[0.2em] uppercase text-white/40 group-hover:text-[#1C2333]/60 transition-colors duration-300 mt-2"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {role.dept} · Full-Time
                </p>
              </div>
              <div className="relative z-10 flex justify-end">
                <ArrowRight
                  className="w-5 h-5 text-[#1C2333] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section
        className="px-6 md:px-12 lg:px-20 py-16 md:py-24"
        style={{ backgroundColor: NAVY, borderTop: `1px solid rgba(212,175,90,0.2)` }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-white mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Good luck, and let the Hunger Games begin.
            </h2>
            <p className="text-white/60 leading-relaxed max-w-md" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              We weren't all born superstars — we were built through our experiences. Now we're looking for more people to build into the best at what they do.
            </p>
          </div>
          <div className="flex md:justify-end">
            <a
              href="#apply"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 border-2"
              style={{
                fontFamily: "'Space Mono', monospace",
                backgroundColor: GOLD,
                color: NAVY,
                borderColor: GOLD,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = GOLD;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = GOLD;
                e.currentTarget.style.color = NAVY;
              }}
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
