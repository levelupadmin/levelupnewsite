import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import usePageSeo from "@/hooks/usePageSeo";

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
  "Supercharge Your Growth · Create Real Impact · India's Largest Creative Ecosystem · 70,000+ Learners · 300K Community · ";

const Careers = () => {
  usePageSeo({
    title: "Careers — LevelUp Learning",
    description: "Join India's largest creative education ecosystem. Explore open roles in growth, product, design, marketing, and operations at LevelUp Learning.",
    path: "/careers",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <Navbar />

      {/* Film grain overlay */}
      <div className="fixed inset-0 bg-[url('/grain.png')] opacity-[0.07] pointer-events-none z-50 mix-blend-overlay" />

      {/* HERO */}
      <section className="relative px-6 md:px-12 lg:px-20 pt-32 pb-16 md:pt-40 md:pb-24 bg-background">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <p className="text-xs tracking-[0.25em] uppercase mb-8 text-primary/60">
          Open Roles
        </p>

        <div className="mb-12 md:mb-16">
          <h1 className="font-display text-[4rem] md:text-[7rem] lg:text-[9rem] leading-[0.9] tracking-tight uppercase">
            <span className="block text-foreground">Make</span>
            <span className="flex items-center gap-4 md:gap-6">
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "2px hsl(var(--primary))" }}
              >
                Your
              </span>
              <span className="flex-grow h-[3px] md:h-[4px] bg-primary" />
            </span>
            <span className="block text-foreground">Move.</span>
          </h1>
        </div>

        <div className="pt-8 border-t border-primary/20">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
            We're building India's largest creative education ecosystem — 70,000+ learners, 300,000+ community members, and a team of superstars who refuse to be ordinary. Come break things with us.
          </p>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden whitespace-nowrap py-4 bg-primary">
        <div className="careers-marquee inline-flex">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="inline-block text-sm md:text-base tracking-widest uppercase px-2 text-primary-foreground font-semibold"
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* OPEN POSITIONS */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 bg-card">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-10">
          <h2 className="text-4xl md:text-5xl font-display text-primary uppercase">
            Open Positions
          </h2>
          <span className="text-xs tracking-widest uppercase text-muted-foreground">
            09 Roles · Full-Time
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <a
              key={role.num}
              href="https://tally.so/r/mO8eZ8"
              target="_blank"
              rel="noopener noreferrer"
              className="careers-role-card group relative overflow-hidden px-6 py-8 flex flex-col justify-between min-h-[180px] border border-primary/15 transition-colors"
            >
              <span className="absolute inset-0 origin-bottom transition-transform duration-[350ms] ease-out scale-y-0 group-hover:scale-y-100 bg-primary" />
              <div className="relative z-10">
                <span className="text-[10px] tracking-widest uppercase text-muted-foreground group-hover:text-primary-foreground/50 transition-colors duration-300">
                  {role.num}
                </span>
                <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary-foreground transition-colors duration-300 mt-3">
                  {role.title}
                </h3>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-primary-foreground/60 transition-colors duration-300 mt-2">
                  {role.dept} · Full-Time
                </p>
              </div>
              <div className="relative z-10 flex justify-end">
                <ArrowRight className="w-5 h-5 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 bg-background border-t border-primary/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-foreground mb-6 font-display uppercase">
              Good luck, and let the Hunger Games begin.
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              We weren't all born superstars — we were built through our experiences. Now we're looking for more people to build into the best at what they do.
            </p>
          </div>
          <div className="flex md:justify-end">
            <a
              href="https://tally.so/r/mO8eZ8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 border-2 border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-primary"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
