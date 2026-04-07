import { useRef, useEffect } from "react";
import FadeInSection from "@/components/FadeInSection";
import { veMentorCreators, veMentorCards, VE_CTA_LINK } from "@/data/liveVEData";

const VEMentors = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const allCards = [
    ...veMentorCreators.flatMap((c, i) => [
      { type: "creator" as const, ...c },
      ...(veMentorCards[i * 2] ? [{ type: "poster" as const, image: veMentorCards[i * 2] }] : []),
      ...(veMentorCards[i * 2 + 1] ? [{ type: "poster" as const, image: veMentorCards[i * 2 + 1] }] : []),
    ]),
    ...veMentorCards.slice(6).map(img => ({ type: "poster" as const, image: img })),
  ];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animId: number;
    const speed = 1.5;

    const step = () => {
      el.scrollLeft += speed;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        el.scrollLeft = 0;
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="py-16 md:py-24 px-4 md:px-8" style={{ background: "hsl(160 8% 8%)" }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="rounded-2xl border border-white/10 overflow-hidden py-12 px-6 md:px-10" style={{ background: "linear-gradient(180deg, hsl(250 20% 12%), hsl(250 15% 8%))" }}>
          <FadeInSection className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight">
              Learn from Mentors Who've Worked<br />
              with Your Favourite Creators & Films!
            </h2>
          </FadeInSection>

          <div className="relative mb-10">
            <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide px-6" style={{ scrollbarWidth: "none" }}>
              {allCards.map((card, i) => (
                <div key={i} className="flex-shrink-0 w-[180px] md:w-[220px] rounded-xl overflow-hidden border border-white/10">
                  <div className="aspect-[2/3] relative">
                    <img src={card.type === "creator" ? card.image : card.image} alt={card.type === "creator" ? card.name : `Film ${i}`} className="w-full h-full object-cover" loading="lazy" />
                    {card.type === "creator" && (
                      <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-purple-400 text-sm font-semibold">{card.name}</p>
                        <p className="text-white/60 text-xs">{card.role}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <FadeInSection className="text-center">
            <p className="text-sm text-white/60 max-w-3xl mx-auto mb-6 leading-relaxed">
              Taught by <strong className="text-white">Viral Social Media Editors</strong>,{" "}
              <strong className="text-white">National Award-Winning Filmmaker</strong>,
              and a <strong className="text-white">DaVinci Resolve Certified Colorist</strong> — all in one program.
            </p>
            <a href={VE_CTA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg text-white text-sm font-medium"
              style={{ background: "linear-gradient(135deg, hsl(270 60% 55%), hsl(280 70% 65%))" }}>
              Request Invite
            </a>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default VEMentors;
