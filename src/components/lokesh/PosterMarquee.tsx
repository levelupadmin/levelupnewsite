interface Props {
  posters: string[];
  dir?: "left" | "right";
  speed?: number;
}

export default function PosterMarquee({ posters, dir = "left", speed = 38 }: Props) {
  // Duplicate the array so the loop seamlessly tiles
  const items = [...posters, ...posters, ...posters];
  const animationName = dir === "right" ? "lokesh-marquee-rev" : "lokesh-marquee";

  return (
    <div className="relative overflow-hidden">
      <style>{`
        @keyframes lokesh-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes lokesh-marquee-rev {
          from { transform: translateX(-33.333%); }
          to { transform: translateX(0); }
        }
      `}</style>
      <div
        className="flex gap-3 md:gap-4 w-max"
        style={{
          animation: `${animationName} ${speed}s linear infinite`,
        }}
      >
        {items.map((src, i) => (
          <div
            key={i}
            className="shrink-0 w-[125px] md:w-[140px] aspect-[2/3] rounded-md overflow-hidden ring-1 ring-white/[0.06] shadow-[0_15px_30px_-15px_rgba(0,0,0,0.7)]"
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
