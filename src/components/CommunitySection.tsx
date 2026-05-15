import { useState } from "react";
import FadeInSection from "./FadeInSection";
import AccentLine from "./AccentLine";
import { Picture } from "./Picture";
import { MessageCircle, Sparkles, UsersRound } from "lucide-react";
import community1 from "@/assets/community/community-1.png";
import community2 from "@/assets/community/community-2.png";
import community3 from "@/assets/community/community-3.png";
import community4 from "@/assets/community/community-4.png";
import community5 from "@/assets/community/community-5.png";
import community6 from "@/assets/community/community-6.png";
import community7 from "@/assets/community/community-7.jpg";
import community8 from "@/assets/community/community-8.jpg";
import community9 from "@/assets/community/community-9.jpg";
import community10 from "@/assets/community/community-10.jpg";
import community11 from "@/assets/community/community-11.jpg";
import community12 from "@/assets/community/community-12.jpg";
import community13 from "@/assets/community/community-13.jpg";
import community14 from "@/assets/community/community-14.jpg";
import community15 from "@/assets/community/community-15.jpg";

const moments = [
  { src: community1, alt: "Group photo at venue", caption: "Meetups that turn strangers into collaborators" },
  { src: community7, alt: "Community gathering", caption: "Mentor rooms, peer reviews, work-in-progress honesty" },
  { src: community8, alt: "Learning together", caption: "A place to keep showing up after class ends" },
  { src: community9, alt: "Creative session", caption: "Creators across film, writing, design, music, and content" },
  { src: community10, alt: "Team collaboration", caption: "Feedback circles that make the work sharper" },
  { src: community2, alt: "Cafe learning session", caption: "Informal sessions where the best ideas usually happen" },
  { src: community3, alt: "Group selfie indoors", caption: "People who understand the ambition and the doubt" },
  { src: community11, alt: "Workshop moment", caption: "Offline energy that carries back into daily practice" },
  { src: community12, alt: "Group discussion", caption: "The room after the lesson: questions, debate, clarity" },
  { src: community13, alt: "Mentoring session", caption: "Access, direction, and honest notes when you need them" },
  { src: community4, alt: "Hilltop group photo", caption: "Travel and craft meeting in one unforgettable week" },
  { src: community5, alt: "Campfire circle session", caption: "Late-night conversations about work, taste, and life" },
  { src: community6, alt: "Night bonfire moment", caption: "Momentum that feels human, not automated" },
  { src: community14, alt: "Community meetup", caption: "Alumni, learners, and mentors staying in orbit" },
  { src: community15, alt: "Celebration moment", caption: "The joy of finishing something together" },
];

const communityStats = [
  { value: "300K+", label: "community" },
  { value: "821+", label: "cities" },
  { value: "13+", label: "countries" },
];

const CommunitySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMoment = moments[activeIndex];

  return (
    <section id="community" className="relative scroll-mt-24 overflow-hidden bg-background py-16 md:py-24">
      <AccentLine />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(249,112,21,0.10),transparent_38%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <FadeInSection>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 font-sans-body text-[11px] font-semibold uppercase text-primary" style={{ letterSpacing: 0 }}>
              <UsersRound className="h-3.5 w-3.5" />
              Dive into our community
            </span>
            <h2 className="mt-5 max-w-2xl font-serif-display text-4xl font-semibold text-foreground sm:text-5xl md:text-6xl" style={{ lineHeight: 1.02, letterSpacing: 0 }}>
              Come for the learning. Stay because the room changes you.
            </h2>
          </FadeInSection>

          <FadeInSection delay={120}>
            <p className="max-w-xl font-sans-body text-sm leading-relaxed text-muted-foreground md:text-base" style={{ letterSpacing: 0 }}>
              Engage with other learners, alumni, and mentors and attend community sessions to learn from each other in our curated community.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10">
              {communityStats.map((stat) => (
                <div key={stat.label} className="bg-card/60 p-4">
                  <p className="font-serif-display text-2xl font-semibold text-foreground md:text-3xl" style={{ letterSpacing: 0 }}>
                    {stat.value}
                  </p>
                  <p className="mt-1 font-sans-body text-[11px] text-muted-foreground" style={{ letterSpacing: 0 }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>

        <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-[1fr_0.9fr]">
          <FadeInSection delay={180}>
            <div className="group relative min-h-[560px] overflow-hidden rounded-lg border border-white/10 bg-black">
              <Picture
                key={activeMoment.caption}
                src={activeMoment.src}
                alt={activeMoment.alt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/10" />
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 font-sans-body text-[11px] text-white/70 backdrop-blur md:left-7 md:top-7" style={{ letterSpacing: 0 }}>
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Community moment {String(activeIndex + 1).padStart(2, "0")}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                <p className="max-w-2xl font-serif-display text-3xl font-semibold text-white md:text-5xl" style={{ lineHeight: 1.04, letterSpacing: 0 }}>
                  {activeMoment.caption}
                </p>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={240}>
            <div className="grid h-full grid-cols-3 gap-2 md:gap-3">
              {moments.map((moment, index) => (
                <button
                  key={`${moment.alt}-${index}`}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  aria-label={moment.caption}
                  aria-pressed={activeIndex === index}
                  className={`group relative min-h-[92px] overflow-hidden rounded-md border transition-all duration-300 md:min-h-[118px] ${
                    activeIndex === index
                      ? "border-primary/60 shadow-[0_0_28px_-12px_hsl(24_95%_53%/0.75)]"
                      : "border-white/10 opacity-65 hover:opacity-100"
                  }`}
                >
                  <Picture
                    src={moment.src}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/5" />
                </button>
              ))}
            </div>
          </FadeInSection>
        </div>

        <FadeInSection delay={340} className="mt-5">
          <div className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.025] p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                <MessageCircle className="h-5 w-5" />
              </div>
              <p className="font-sans-body text-sm leading-relaxed text-muted-foreground" style={{ letterSpacing: 0 }}>
                The community is not the afterthought. It is the place where the work gets seen, questioned, improved, and finished.
              </p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default CommunitySection;
