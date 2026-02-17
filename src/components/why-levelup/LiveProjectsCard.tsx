import forge1 from "@/assets/forge-1.jpg";
import forge2 from "@/assets/forge-2.jpg";
import forge3 from "@/assets/forge-3.jpg";

const projects = [
  { src: forge1, label: "Short Film", rotation: -4, offsetX: -8, offsetY: 8, z: 1 },
  { src: forge2, label: "Showreel", rotation: 0, offsetX: 0, offsetY: 0, z: 2 },
  { src: forge3, label: "Scene Edit", rotation: 4, offsetX: 8, offsetY: 4, z: 3 },
];

const LiveProjectsCard = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <div className="relative w-[85%] aspect-[4/3]">
        {projects.map((project, i) => (
          <div
            key={i}
            className={`absolute rounded-lg overflow-hidden shadow-lg ${
              i === 2 ? "border border-primary/40" : "border border-primary/20"
            }`}
            style={{
              width: "68%",
              aspectRatio: "16/10",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) translate(${project.offsetX}px, ${project.offsetY}px) rotate(${project.rotation}deg)`,
              zIndex: project.z,
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
          className="absolute bottom-0 inset-x-0 h-1/4 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to top, hsl(30 40% 12%), transparent)" }}
        />
      </div>
    </div>
  );
};

export default LiveProjectsCard;
