import { useState } from "react";
import shapeMentorsGlow from "@/assets/shape-mentors-glow.png";
import shapePracticeGlow from "@/assets/shape-practice-unique.png";
import shapeCommunityGlow from "@/assets/shape-community-unique.png";

const features = [
  {
    title: "Mentors who've lived the craft",
    description: "Learn directly from industry experts with years of real-world experience.",
    expandedDescription: "Not theorists — filmmakers, editors, and writers who built careers through decades of real work. They give you the unfiltered truth.",
    bullets: [
      "Award-winning filmmakers & editors",
      "Decades of industry experience",
      "Direct, honest feedback on your work",
    ],
    stat: "40+",
    statLabel: "INDUSTRY MENTORS",
    image: shapeMentorsGlow,
  },
  {
    title: "Practice that feels real",
    description: "Residencies, real sets, and deadlines that matter.",
    expandedDescription: "We put you in real creative environments with actual stakes. No simulations, no pretend briefs — just meaningful work that matters.",
    bullets: [
      "Real-world production residencies",
      "Industry-standard equipment & sets",
      "Portfolio-ready deliverables",
    ],
    stat: "60+",
    statLabel: "WORKSHOPS",
    image: shapePracticeGlow,
  },
  {
    title: "A community that stays",
    description: "A creative ecosystem that keeps growing.",
    expandedDescription: "A living network of creators who collaborate, hire each other, and keep pushing the craft forward together.",
    bullets: [
      "Lifetime access to the network",
      "Ongoing collaboration opportunities",
      "Alumni-led workshops & events",
    ],
    stat: "2K+",
    statLabel: "ACTIVE MEMBERS",
    image: shapeCommunityGlow,
  },
];

const WhyLevelUp = () => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  return (
    <section
      aria-label="Why choose LevelUp"
      className="relative py-12 md:py-16 overflow-hidden"
    >
      {/* Headline */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 md:mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12">
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium text-hero-headline leading-[1.15] tracking-tight max-w-lg">
            The most intentional way to learn{" "}
            <span className="text-gradient-amber">the craft.</span>
          </h2>

          <p className="font-sans-body text-sm md:text-base text-hero-subtext leading-relaxed max-w-sm md:pb-2">
            We changed how creators learn. Build real skills with mentors who
            built careers — not PowerPoint decks.
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const isFlipped = flippedIndex === index;

            return (
              <div
                key={index}
                className="cursor-pointer"
                style={{ perspective: 1200, height: 420 }}
                onClick={() => setFlippedIndex(isFlipped ? null : index)}
              >
                <div
                  className="relative w-full h-full transition-transform duration-700"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* FRONT */}
                  <div
                    className="absolute inset-0 bg-[#0a0a0a] border border-border/40 rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-[0_0_20px_2px_hsl(38_75%_55%/0.35)] transition-all duration-300"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="flex flex-col justify-between h-full p-6 md:p-8">
                      <div>
                        <h3 className="font-serif-display text-xl md:text-2xl font-medium text-foreground leading-tight">
                          {feature.title}
                        </h3>
                      </div>

                      <div className="flex-1 flex items-center justify-center py-2 min-h-0 overflow-hidden">
                        <img
                          src={feature.image}
                          alt=""
                          className="w-44 h-44 md:w-48 md:h-48 object-contain opacity-90 shrink-0"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      <div className="shrink-0 pt-2">
                        <p className="font-sans-body text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* BACK */}
                  <div
                    className="absolute inset-0 bg-[#0a0a0a] border border-primary/40 rounded-xl overflow-hidden shadow-[0_0_20px_2px_hsl(38_75%_55%/0.25)]"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="flex flex-col justify-between h-full p-6 md:p-8">
                      <div>
                        <h3 className="font-serif-display text-xl md:text-2xl font-medium text-foreground leading-tight">
                          {feature.title}
                        </h3>
                        <p className="font-sans-body text-sm text-muted-foreground leading-relaxed mt-4">
                          {feature.expandedDescription}
                        </p>
                      </div>

                      <div className="space-y-2 mt-5">
                        {feature.bullets.map((bullet, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                            <span className="font-sans-body text-sm text-foreground/80">
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>

                      {feature.stat && (
                        <div className="mt-auto pt-6">
                          <span className="font-serif-display text-4xl font-bold text-gradient-amber">
                            {feature.stat}
                          </span>
                          <span className="font-sans-body text-xs text-muted-foreground tracking-wider ml-2 uppercase">
                            {feature.statLabel}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyLevelUp;
