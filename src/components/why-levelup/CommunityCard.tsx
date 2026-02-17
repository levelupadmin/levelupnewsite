import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import testimonial6 from "@/assets/testimonial-6.jpg";
import testimonial7 from "@/assets/testimonial-7.jpg";

const avatars = [testimonial1, testimonial2, testimonial4, testimonial5, testimonial6, testimonial7];

const CommunityCard = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 p-4">
      {/* Avatar cluster */}
      <div className="flex flex-wrap justify-center gap-2">
        {avatars.map((src, i) => (
          <div
            key={i}
            className="w-11 h-11 rounded-full overflow-hidden border-2 border-primary/30 shadow-md"
            style={{
              transform: `rotate(${(i - 2.5) * 4}deg)`,
            }}
          >
            <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>

      {/* Simulated chat bubble */}
      <div
        className="w-full max-w-[220px] rounded-lg px-3.5 py-2.5"
        style={{
          background: "hsl(30 20% 14% / 0.9)",
          border: "1px solid hsl(30 30% 25% / 0.3)",
        }}
      >
        <p className="font-sans-body text-[11px] text-foreground/60 leading-relaxed">
          "Just wrapped my first short film edit with feedback from 3 peers — this community is 🔥"
        </p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="text-[10px]">❤️ 24</span>
          <span className="text-[10px]">🎬 8</span>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
