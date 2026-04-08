import FadeInSection from "@/components/FadeInSection";
import { veCommunityData } from "@/data/liveVEData";
import communityBg from "@/assets/ve-community-bg.png";

const VECommunity = () => (
  <section className="py-16 md:py-24 px-4 md:px-8" style={{ background: "hsl(160 8% 8%)" }}>
    <div className="max-w-[1400px] mx-auto">
      <div className="rounded-2xl border border-white/10 overflow-hidden relative" style={{ background: "linear-gradient(180deg, hsl(250 15% 12%), hsl(250 10% 8%))" }}>
        <img src={communityBg} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" loading="lazy" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[500px]">
          {/* Left */}
          <div className="p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <svg viewBox="0 0 200 200" className="w-[300px] h-[300px] absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4">
                <circle cx="100" cy="100" r="90" fill="none" stroke="white" strokeWidth="3"/>
                <circle cx="100" cy="60" r="20" fill="none" stroke="white" strokeWidth="3"/>
                <line x1="100" y1="80" x2="100" y2="140" stroke="white" strokeWidth="3"/>
              </svg>
            </div>
            <div className="relative">
              <p className="text-white/40 text-xs tracking-[0.15em] uppercase mb-4">LevelUp Learning</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight mb-8">
                India's Largest Filmmaking Learning Community
              </h2>
            </div>
            <p className="text-white/40 text-sm relative">
              LevelUp Learning is more than a platform - it's a Community!
            </p>
          </div>

          {/* Right */}
          <div className="p-6 md:p-10 flex flex-col gap-4 relative z-10">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 flex items-start justify-between">
              <div>
                {veCommunityData.stats.map((stat, i) => (
                  <div key={i} className={i > 0 ? "mt-4" : ""}>
                    <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/50">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="w-16 h-16 rounded-full bg-black/30 flex items-center justify-center">
                <span className="text-white text-xs font-bold">LevelUp</span>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden flex-1">
              <img src={veCommunityData.mentorGroupImage} alt="Mentor group" className="w-full h-full object-cover min-h-[250px]" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default VECommunity;
