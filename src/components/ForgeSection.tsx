import { useState } from "react";
import { ArrowRight, Flame, MapPin, RadioTower, Route, Users } from "lucide-react";
import AccentLine from "./AccentLine";
import FadeInSection from "./FadeInSection";
import { Picture } from "./Picture";
import forgeLogo from "@/assets/forge-logo.png";
import forgeFilmmaking from "@/assets/forge-filmmaking-banner.jpg";
import forgeWriting from "@/assets/forge-writing-banner.jpg";
import forgeCreators from "@/assets/forge-creators-banner.jpg";
import { trackCTAClick } from "@/lib/clarity";

const featurePoints = [
  {
    headline: "Learn by doing",
    description:
      "Move beyond theory. Apply what you learn in real time with practicing creators and mentors.",
    icon: Flame,
  },
  {
    headline: "Build with a community",
    description:
      "Collaborate with like-minded filmmakers, writers, founders, builders, and artists.",
    icon: Users,
  },
  {
    headline: "Immersive & offline",
    description:
      "Travel, create, and grow over an intensive week in an environment built for breakthroughs.",
    icon: MapPin,
  },
];

const stats = [
  { value: "11", label: "Cities Explored" },
  { value: "25+", label: "Editions" },
  { value: "600+", label: "Dreamers" },
];

const forgeCards = [
  {
    title: "Writing Retreat",
    subtitle:
      "A 6-day scenic retreat where writers unplug, immerse deeply, and learn from bestselling storytellers.",
    image: forgeWriting,
    cta: "https://tally.so/r/nPJydd",
    locations: ["Coorg, June 2026"],
    pace: "6 days",
  },
  {
    title: "Filmmaking Bootcamp",
    subtitle:
      "An intensive 15-day bootcamp where filmmakers write, direct, and shoot short films with top mentors.",
    image: forgeFilmmaking,
    cta: "https://www.forgebylevelup.com/",
    locations: ["Goa, April 2026"],
    pace: "15 days",
  },
  {
    title: "Creator Residency",
    subtitle:
      "An invite-only 12-day residency where founders build personal brands through daily content and creator mentorship.",
    image: forgeCreators,
    cta: "https://creators.forgebylevelup.com/",
    locations: ["Goa, May 2026", "Bali, June 2026"],
    pace: "12 days",
  },
];

const ForgeSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const activeCard = forgeCards[activeIndex];

  return (
    <section
      id="forge"
      aria-label="The Forge residency"
      className="relative scroll-mt-24 overflow-hidden bg-[hsl(18_15%_4%)] py-16 md:py-24"
    >
      <AccentLine gradient="linear-gradient(90deg, transparent 10%, hsl(var(--accent-forge)) 50%, transparent 90%)" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_15%,rgba(249,112,21,0.14),transparent_34%),radial-gradient(ellipse_at_80%_70%,rgba(255,255,255,0.055),transparent_32%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <FadeInSection>
            <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(15_65%_55%/0.25)] bg-[hsl(15_65%_55%/0.08)] px-3.5 py-1.5 font-sans-body text-[11px] font-semibold uppercase text-[hsl(15_65%_55%/0.9)]" style={{ letterSpacing: 0 }}>
              <Route className="h-3.5 w-3.5" />
              Offline residencies
            </span>
            <div className="mt-5 flex items-end gap-4">
              <Picture
                src={forgeLogo}
                alt="The Forge"
                className="h-16 w-auto object-contain sm:h-20 md:h-24"
              />
              <p className="pb-2 font-serif-display text-xl text-gradient-amber md:text-2xl" style={{ letterSpacing: 0 }}>
                Learn. Do. Become.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={100}>
            <p className="max-w-2xl font-sans-body text-sm leading-relaxed text-white/58 md:text-base" style={{ letterSpacing: 0 }}>
              The Forge is an offline, immersive learning experience that brings together travel, hands-on creation, and a like-minded community, built for filmmakers, writers, founders, builders, artists, and creators.
            </p>
            <p className="mt-4 max-w-2xl font-sans-body text-sm leading-relaxed text-white/58 md:text-base" style={{ letterSpacing: 0 }}>
              Over an intensive week with practicing creators and mentors, participants move beyond theory. They apply what they learn in real time, collaborate with peers, and build a complete project of their own.
            </p>
          </FadeInSection>
        </div>

        <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-[1.15fr_0.85fr]">
          <FadeInSection delay={160}>
            <div className="group relative min-h-[560px] overflow-hidden rounded-lg border border-white/10 bg-black">
              <Picture
                key={activeCard.title}
                src={activeCard.image}
                alt={`LevelUp Learning ${activeCard.title} course thumbnail`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

              <div className="absolute left-5 top-5 flex flex-wrap gap-2 md:left-7 md:top-7">
                {activeCard.locations.map((location) => (
                  <span key={location} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 font-sans-body text-[11px] text-white/72 backdrop-blur" style={{ letterSpacing: 0 }}>
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {location}
                  </span>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 lg:p-10">
                <div className="mb-5 grid w-full max-w-md grid-cols-3 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 backdrop-blur">
                  {stats.map((stat) => (
                    <div key={stat.label} className="bg-black/35 p-3">
                      <p className="font-serif-display text-2xl font-semibold text-white md:text-3xl" style={{ letterSpacing: 0 }}>
                        {stat.value}
                      </p>
                      <p className="mt-1 font-sans-body text-[10px] leading-tight text-white/50 md:text-xs" style={{ letterSpacing: 0 }}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="font-sans-body text-[11px] font-semibold uppercase text-primary" style={{ letterSpacing: 0 }}>
                  {activeCard.pace} immersive field build
                </p>
                <h3 className="mt-2 max-w-2xl font-serif-display text-4xl font-semibold text-white md:text-6xl" style={{ lineHeight: 1, letterSpacing: 0 }}>
                  {activeCard.title}
                </h3>
                <p className="mt-4 max-w-xl font-sans-body text-sm leading-relaxed text-white/68 md:text-base" style={{ letterSpacing: 0 }}>
                  {activeCard.subtitle}
                </p>
                <a
                  href={activeCard.cta}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCTAClick("forge", activeCard.title)}
                  className="group/link mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-sans-body text-sm font-semibold text-background transition-colors hover:bg-primary/90"
                >
                  Request an invite
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>
          </FadeInSection>

          <div className="space-y-3">
            {forgeCards.map((card, index) => (
              <FadeInSection key={card.title} delay={220 + index * 70}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={activeIndex === index}
                  className={`group w-full rounded-lg border p-4 text-left transition-all duration-300 md:p-5 ${
                    activeIndex === index
                      ? "border-primary/40 bg-primary/10"
                      : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-md bg-black md:h-24 md:w-32">
                      <Picture
                        src={card.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-sans-body text-[11px] uppercase text-primary/75" style={{ letterSpacing: 0 }}>
                        {card.pace} - {card.locations.join(" / ")}
                      </p>
                      <h4 className="mt-1 font-serif-display text-xl font-semibold text-white" style={{ letterSpacing: 0 }}>
                        {card.title}
                      </h4>
                      <p className="mt-2 line-clamp-2 font-sans-body text-xs leading-relaxed text-white/54 md:text-sm" style={{ letterSpacing: 0 }}>
                        {card.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              </FadeInSection>
            ))}

            <FadeInSection delay={460}>
              <div className="rounded-lg border border-white/10 bg-white/[0.025] p-5">
                <div className="flex items-center gap-2 text-primary">
                  <RadioTower className="h-4 w-4" />
                  <p className="font-sans-body text-[11px] font-semibold uppercase" style={{ letterSpacing: 0 }}>
                    What makes it different
                  </p>
                </div>
                <div className="mt-5 grid gap-4">
                  {featurePoints.map((point) => (
                    <div key={point.headline} className="flex items-start gap-3">
                      <point.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <h4 className="font-serif-display text-base font-semibold text-white" style={{ letterSpacing: 0 }}>
                          {point.headline}
                        </h4>
                        <p className="mt-1 font-sans-body text-xs leading-relaxed text-white/52" style={{ letterSpacing: 0 }}>
                          {point.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgeSection;
