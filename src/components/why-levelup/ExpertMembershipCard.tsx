import masterclass1 from "@/assets/masterclass-1.jpg";
import masterclass2 from "@/assets/masterclass-2.jpg";
import masterclass3 from "@/assets/masterclass-3.jpg";
import masterclass4 from "@/assets/masterclass-4.jpg";
import masterclass5 from "@/assets/masterclass-5.jpg";
import masterclass6 from "@/assets/masterclass-6.jpg";

const mentors = [
  { src: masterclass1, alt: "Mentor 1", className: "col-span-1 row-span-2", featured: true, rotate: "-0.5deg" },
  { src: masterclass2, alt: "Mentor 2", className: "col-span-1 row-span-1", rotate: "0.8deg" },
  { src: masterclass3, alt: "Mentor 3", className: "col-span-1 row-span-1", rotate: "-0.6deg" },
  { src: masterclass4, alt: "Mentor 4", className: "col-span-1 row-span-1", rotate: "0.5deg" },
  { src: masterclass5, alt: "Mentor 5", className: "col-span-1 row-span-1", rotate: "-0.4deg" },
  { src: masterclass6, alt: "Mentor 6", className: "col-span-1 row-span-1", rotate: "0.3deg" },
];

const ExpertMembershipCard = () => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {/* Asymmetric mosaic grid */}
      <div
        className="w-full h-full grid gap-1 p-0.5"
        style={{
          gridTemplateColumns: "1.3fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr",
        }}
      >
        {mentors.map((mentor, i) => (
          <div
            key={i}
            className={`${mentor.className} overflow-hidden rounded-lg shadow-md ${
              mentor.featured
                ? "border border-primary/40"
                : "border border-primary/20"
            }`}
            style={{
              transform: mentor.rotate ? `rotate(${mentor.rotate})` : undefined,
            }}
          >
            <img
              src={mentor.src}
              alt={mentor.alt}
              className="w-full h-full object-cover object-top"
              loading="lazy"
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>

      {/* Cinematic gradient fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, hsl(30 40% 12%) 0%, hsl(30 30% 10% / 0.5) 30%, transparent 60%)",
        }}
      />

      {/* Label */}
      <span className="absolute bottom-2 right-3 font-sans-body text-[10px] text-foreground/50 tracking-wide uppercase">
        40+ mentors
      </span>
    </div>
  );
};

export default ExpertMembershipCard;
