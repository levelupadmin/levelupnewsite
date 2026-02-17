import allMasters from "@/assets/all-masters.png";
import masterclass1 from "@/assets/masterclass-1.jpg";
import masterclass2 from "@/assets/masterclass-2.jpg";
import masterclass3 from "@/assets/masterclass-3.jpg";

const ExpertMembershipCard = () => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {/* Main mentor group photo */}
      <img
        src={allMasters}
        alt="LevelUp mentors"
        className="w-full h-full object-cover object-top"
        loading="lazy"
      />
      {/* Warm cinematic gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, hsl(30 40% 12%) 0%, hsl(30 30% 10% / 0.6) 40%, transparent 70%)",
        }}
      />
      {/* Floating mini-thumbnails for depth */}
      <div className="absolute bottom-3 left-3 right-3 flex items-end gap-2">
        {[masterclass1, masterclass2, masterclass3].map((src, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-md overflow-hidden border border-foreground/20 shadow-lg"
            style={{ opacity: 0.9 - i * 0.1 }}
          >
            <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
        <span className="ml-auto font-sans-body text-[10px] text-foreground/50 tracking-wide uppercase">
          40+ mentors
        </span>
      </div>
    </div>
  );
};

export default ExpertMembershipCard;
