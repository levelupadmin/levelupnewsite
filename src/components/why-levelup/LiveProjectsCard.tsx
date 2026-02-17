import forge1 from "@/assets/forge-1.jpg";
import forge2 from "@/assets/forge-2.jpg";
import forge3 from "@/assets/forge-3.jpg";

const projects = [
  { src: forge1, label: "Short Film", rotateY: 12, translateZ: -40, shadow: "0 8px 20px -4px hsl(0 0% 0% / 0.4)" },
  { src: forge2, label: "Showreel", rotateY: 0, translateZ: 0, shadow: "0 12px 30px -6px hsl(0 0% 0% / 0.5)" },
  { src: forge3, label: "Scene Edit", rotateY: -8, translateZ: 30, shadow: "0 16px 40px -8px hsl(0 0% 0% / 0.6)" },
];

const animationClasses = [
  "animate-float-card-1",
  "animate-float-card-2",
  "animate-float-card-3",
];

const LiveProjectsCard = () => {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center p-4"
      style={{ perspective: "800px", perspectiveOrigin: "center" }}
    >
      <div
        className="relative w-[75%] aspect-[4/3]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {projects.map((project, i) => (
          <div
            key={i}
            className={`absolute rounded-xl overflow-hidden ${animationClasses[i]} ${
              i === 2 ? "border border-primary/40" : "border border-primary/15"
            }`}
            style={{
              width: "70%",
              aspectRatio: "16/10",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotateY(${project.rotateY}deg) translateZ(${project.translateZ}px)`,
              zIndex: i + 1,
              boxShadow: project.shadow,
            }}
          >
            <img
              src={project.src}
              alt={project.label}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute bottom-0 inset-x-0 px-2 py-1.5"
              style={{ background: "linear-gradient(to top, hsl(0 0% 0% / 0.8), transparent)" }}
            >
              <span className="font-sans-body text-[9px] uppercase tracking-wider text-foreground/70">
                {project.label}
              </span>
            </div>
          </div>
        ))}
        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-1/4 pointer-events-none"
          style={{ zIndex: 10, background: "linear-gradient(to top, hsl(var(--card)), transparent)" }}
        />
      </div>
    </div>
  );
};

export default LiveProjectsCard;
