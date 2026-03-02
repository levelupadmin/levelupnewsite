import { AnimatedCounter } from "@/components/AnimatedCounter";
import FadeInSection from "@/components/FadeInSection";
import ImpactScene from "./ImpactScene";

// ── India dots from IndiaDotsMap viewBox 0 0 200 280 ──
// Major city positions for ping effect (from IndiaDotsMap.tsx)
const majorCities = [
  { cx: 72, cy: 148, label: "Mumbai" },
  { cx: 100, cy: 68, label: "Delhi" },
  { cx: 150, cy: 115, label: "Kolkata" },
  { cx: 90, cy: 195, label: "Bangalore" },
  { cx: 110, cy: 200, label: "Chennai" },
  { cx: 102, cy: 168, label: "Hyderabad" },
];

// International arcs from center (Nagpur 108,140)
const CENTER_X = 108;
const CENTER_Y = 140;

const internationalDots = [
  { cx: 25, cy: 130, label: "UAE" },
  { cx: 15, cy: 50, label: "UK" },
  { cx: 8, cy: 90, label: "US" },
  { cx: 185, cy: 190, label: "SG" },
  { cx: 190, cy: 145, label: "AU" },
  { cx: 180, cy: 55, label: "CA" },
];

// Dense India dots — enough to clearly read as the India silhouette
const indiaDots = [
  // Kashmir / J&K
  { cx: 82, cy: 30, r: 1.2 }, { cx: 86, cy: 28, r: 1.2 }, { cx: 90, cy: 26, r: 1.2 },
  { cx: 88, cy: 32, r: 1.2 }, { cx: 84, cy: 34, r: 1.2 }, { cx: 92, cy: 30, r: 1.2 },
  { cx: 86, cy: 36, r: 1.2 }, { cx: 94, cy: 34, r: 1.2 },
  
  // Punjab / Haryana / Himachal
  { cx: 85, cy: 38, r: 1.5 }, { cx: 92, cy: 42, r: 2 }, { cx: 88, cy: 44, r: 1.5 },
  { cx: 96, cy: 40, r: 1.5 }, { cx: 98, cy: 46, r: 1.5 }, { cx: 84, cy: 42, r: 1.2 },
  { cx: 100, cy: 42, r: 1.2 }, { cx: 90, cy: 48, r: 1.5 },
  
  // Rajasthan
  { cx: 72, cy: 72, r: 1.5 }, { cx: 68, cy: 80, r: 1.5 }, { cx: 74, cy: 78, r: 1.5 },
  { cx: 78, cy: 82, r: 2 }, { cx: 70, cy: 90, r: 1.5 }, { cx: 76, cy: 88, r: 1.5 },
  { cx: 82, cy: 86, r: 1.5 }, { cx: 66, cy: 86, r: 1.2 }, { cx: 74, cy: 96, r: 1.2 },
  { cx: 80, cy: 94, r: 1.5 }, { cx: 68, cy: 96, r: 1.2 }, { cx: 64, cy: 92, r: 1.2 },
  { cx: 76, cy: 68, r: 1.2 }, { cx: 82, cy: 74, r: 1.2 }, { cx: 85, cy: 70, r: 1.5 },
  
  // Delhi / UP / Uttarakhand
  { cx: 100, cy: 68, r: 3 }, { cx: 95, cy: 64, r: 1.5 }, { cx: 92, cy: 58, r: 2 },
  { cx: 104, cy: 56, r: 1.5 }, { cx: 108, cy: 62, r: 1.5 }, { cx: 95, cy: 72, r: 1.5 },
  { cx: 102, cy: 74, r: 1.5 }, { cx: 110, cy: 68, r: 1.5 }, { cx: 106, cy: 50, r: 1.2 },
  { cx: 100, cy: 52, r: 1.2 }, { cx: 96, cy: 56, r: 1.2 },
  
  // UP / Bihar belt
  { cx: 112, cy: 74, r: 1.5 }, { cx: 118, cy: 78, r: 1.5 }, { cx: 120, cy: 82, r: 2.2 },
  { cx: 126, cy: 80, r: 1.5 }, { cx: 130, cy: 85, r: 2 }, { cx: 116, cy: 86, r: 1.5 },
  { cx: 124, cy: 88, r: 1.5 }, { cx: 136, cy: 88, r: 1.5 }, { cx: 140, cy: 92, r: 1.5 },
  { cx: 132, cy: 92, r: 1.2 }, { cx: 114, cy: 82, r: 1.2 }, { cx: 108, cy: 78, r: 1.2 },
  
  // Gujarat
  { cx: 56, cy: 108, r: 1.5 }, { cx: 62, cy: 104, r: 1.5 }, { cx: 50, cy: 110, r: 1.5 },
  { cx: 62, cy: 120, r: 2.5 }, { cx: 55, cy: 116, r: 1.5 }, { cx: 58, cy: 126, r: 1.5 },
  { cx: 48, cy: 104, r: 1.2 }, { cx: 44, cy: 108, r: 1.2 }, { cx: 52, cy: 118, r: 1.2 },
  { cx: 46, cy: 114, r: 1.2 }, { cx: 68, cy: 112, r: 1.5 }, { cx: 64, cy: 116, r: 1.2 },
  { cx: 56, cy: 122, r: 1.2 },
  
  // MP / Central
  { cx: 88, cy: 102, r: 1.5 }, { cx: 95, cy: 98, r: 1.5 }, { cx: 102, cy: 96, r: 1.5 },
  { cx: 108, cy: 100, r: 1.5 }, { cx: 95, cy: 106, r: 1.5 }, { cx: 88, cy: 110, r: 1.5 },
  { cx: 102, cy: 108, r: 1.5 }, { cx: 110, cy: 106, r: 1.5 }, { cx: 116, cy: 102, r: 1.5 },
  { cx: 95, cy: 118, r: 2.2 }, { cx: 88, cy: 125, r: 1.5 }, { cx: 102, cy: 114, r: 1.5 },
  { cx: 108, cy: 110, r: 1.2 }, { cx: 82, cy: 106, r: 1.2 }, { cx: 76, cy: 102, r: 1.2 },
  
  // Central India (Nagpur area)
  { cx: 108, cy: 138, r: 2.5 }, { cx: 100, cy: 130, r: 1.8 }, { cx: 115, cy: 145, r: 1.5 },
  { cx: 95, cy: 140, r: 1.5 }, { cx: 105, cy: 150, r: 1.5 }, { cx: 112, cy: 132, r: 1.5 },
  { cx: 118, cy: 128, r: 1.5 }, { cx: 105, cy: 124, r: 1.2 },
  
  // Maharashtra / West
  { cx: 72, cy: 148, r: 3 }, { cx: 82, cy: 142, r: 2.5 }, { cx: 68, cy: 155, r: 1.5 },
  { cx: 78, cy: 158, r: 1.5 }, { cx: 88, cy: 150, r: 1.5 }, { cx: 65, cy: 142, r: 1.5 },
  { cx: 75, cy: 136, r: 1.2 }, { cx: 70, cy: 132, r: 1.2 }, { cx: 85, cy: 134, r: 1.2 },
  { cx: 92, cy: 148, r: 1.2 }, { cx: 98, cy: 152, r: 1.2 },
  
  // Kolkata / East
  { cx: 150, cy: 115, r: 3 }, { cx: 145, cy: 108, r: 1.5 }, { cx: 155, cy: 120, r: 1.5 },
  { cx: 148, cy: 125, r: 1.5 }, { cx: 140, cy: 112, r: 1.5 }, { cx: 144, cy: 118, r: 1.2 },
  { cx: 152, cy: 128, r: 1.2 },
  
  // Jharkhand / Chhattisgarh
  { cx: 138, cy: 102, r: 1.8 }, { cx: 130, cy: 135, r: 2 }, { cx: 125, cy: 142, r: 1.5 },
  { cx: 135, cy: 128, r: 1.5 }, { cx: 122, cy: 120, r: 1.5 }, { cx: 128, cy: 115, r: 1.2 },
  { cx: 118, cy: 114, r: 1.2 }, { cx: 122, cy: 108, r: 1.2 },
  
  // Northeast
  { cx: 162, cy: 95, r: 1.5 }, { cx: 168, cy: 88, r: 1.5 }, { cx: 172, cy: 92, r: 1.2 },
  { cx: 165, cy: 100, r: 1.2 }, { cx: 158, cy: 98, r: 1.2 }, { cx: 175, cy: 86, r: 1.2 },
  { cx: 170, cy: 82, r: 1.2 }, { cx: 178, cy: 90, r: 1.0 },
  
  // Odisha
  { cx: 130, cy: 148, r: 1.5 }, { cx: 136, cy: 142, r: 1.5 }, { cx: 140, cy: 148, r: 1.2 },
  { cx: 134, cy: 155, r: 1.2 }, { cx: 126, cy: 152, r: 1.2 },
  
  // Telangana / Hyderabad
  { cx: 102, cy: 168, r: 3 }, { cx: 95, cy: 175, r: 1.5 }, { cx: 110, cy: 165, r: 1.5 },
  { cx: 98, cy: 160, r: 1.5 }, { cx: 106, cy: 158, r: 1.2 }, { cx: 115, cy: 162, r: 1.2 },
  { cx: 108, cy: 172, r: 1.2 }, { cx: 118, cy: 158, r: 1.2 },
  
  // AP coastal
  { cx: 120, cy: 168, r: 1.2 }, { cx: 125, cy: 162, r: 1.2 }, { cx: 128, cy: 158, r: 1.2 },
  { cx: 122, cy: 175, r: 1.2 }, { cx: 118, cy: 180, r: 1.2 },
  
  // Goa
  { cx: 68, cy: 170, r: 2 }, { cx: 72, cy: 168, r: 1.2 },
  
  // Karnataka / Bangalore
  { cx: 90, cy: 195, r: 3 }, { cx: 82, cy: 188, r: 1.5 }, { cx: 98, cy: 192, r: 1.5 },
  { cx: 85, cy: 200, r: 1.5 }, { cx: 78, cy: 182, r: 1.5 }, { cx: 88, cy: 185, r: 1.2 },
  { cx: 75, cy: 176, r: 1.2 }, { cx: 94, cy: 188, r: 1.2 }, { cx: 80, cy: 194, r: 1.2 },
  { cx: 102, cy: 188, r: 1.2 },
  
  // Chennai / Tamil Nadu
  { cx: 110, cy: 200, r: 3 }, { cx: 105, cy: 210, r: 2 }, { cx: 100, cy: 218, r: 1.5 },
  { cx: 115, cy: 195, r: 1.5 }, { cx: 108, cy: 215, r: 1.5 }, { cx: 95, cy: 225, r: 1.5 },
  { cx: 98, cy: 232, r: 1.2 }, { cx: 104, cy: 205, r: 1.2 }, { cx: 112, cy: 208, r: 1.2 },
  { cx: 102, cy: 195, r: 1.2 }, { cx: 92, cy: 210, r: 1.2 },
  
  // Kerala
  { cx: 80, cy: 215, r: 2.2 }, { cx: 75, cy: 225, r: 1.5 }, { cx: 78, cy: 208, r: 1.5 },
  { cx: 82, cy: 222, r: 1.2 }, { cx: 84, cy: 210, r: 1.2 }, { cx: 72, cy: 232, r: 1.2 },
  
  // Sri Lanka hint (very faint)
  { cx: 105, cy: 245, r: 1.0 }, { cx: 108, cy: 250, r: 1.0 }, { cx: 102, cy: 248, r: 0.8 },
];

// Sort by distance from center for ripple effect
const sortedDots = [...indiaDots].sort((a, b) => {
  const distA = Math.hypot(a.cx - CENTER_X, a.cy - CENTER_Y);
  const distB = Math.hypot(b.cx - CENTER_X, b.cy - CENTER_Y);
  return distA - distB;
});

const GeoReachScene = () => (
  <ImpactScene>
    <FadeInSection>
      <div className="relative flex flex-col items-center justify-center min-h-[320px] md:min-h-[420px] px-6 py-14 md:py-20">
        {/* Full-width inline SVG map with pings baked in */}
        <div className="w-full max-w-2xl mx-auto">
          <svg viewBox="0 0 200 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* No outline — dense dots form the silhouette */}

            {/* International arcs */}
            {internationalDots.map((dot, i) => {
              const midX = (dot.cx + CENTER_X) / 2;
              const midY = (dot.cy + CENTER_Y) / 2 - 30;
              return (
                <path
                  key={`arc-${i}`}
                  d={`M ${CENTER_X} ${CENTER_Y} Q ${midX} ${midY} ${dot.cx} ${dot.cy}`}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth={0.4}
                  strokeDasharray="2 3"
                  opacity={0.15}
                  className="animate-impact-arc-draw"
                  style={{ animationDelay: `${0.5 + i * 0.15}s` }}
                />
              );
            })}

            {/* India dots — ripple in from center */}
            {sortedDots.map((dot, i) => (
              <circle
                key={`dot-${i}`}
                cx={dot.cx}
                cy={dot.cy}
                r={dot.r}
                fill="hsl(var(--primary))"
                opacity={dot.r >= 2.5 ? 0.9 : 0.5}
                className="animate-impact-dot-ripple"
                style={{ animationDelay: `${i * 0.015}s` }}
              />
            ))}

            {/* City ping rings — precisely on SVG coordinates */}
            {majorCities.map((city, i) => (
              <circle
                key={`ping-${i}`}
                cx={city.cx}
                cy={city.cy}
                r={3}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth={0.6}
                className="animate-impact-city-ping"
                style={{ animationDelay: `${0.8 + i * 0.25}s` }}
              />
            ))}

            {/* International dots */}
            {internationalDots.map((dot, i) => (
              <g key={`intl-${i}`}>
                <circle cx={dot.cx} cy={dot.cy} r={2} fill="hsl(var(--muted-foreground))" opacity={0.5} />
                <text x={dot.cx} y={dot.cy - 5} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize={5} opacity={0.6} fontFamily="sans-serif">
                  {dot.label}
                </text>
                {/* Ping on international dots too */}
                <circle
                  cx={dot.cx}
                  cy={dot.cy}
                  r={2}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth={0.4}
                  className="animate-impact-city-ping"
                  style={{ animationDelay: `${1.5 + i * 0.3}s` }}
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Stats overlay */}
        <div className="relative z-10 flex items-center gap-8 md:gap-16 mt-8 md:mt-10">
          <div className="text-center">
            <p className="text-4xl md:text-6xl font-semibold text-foreground tracking-tight">
              <AnimatedCounter target={821} celebrate />
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">cities</p>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <p className="text-4xl md:text-6xl font-semibold text-foreground tracking-tight">
              <AnimatedCounter target={13} suffix="+" celebrate delay={400} />
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">countries</p>
          </div>
        </div>
      </div>
    </FadeInSection>
  </ImpactScene>
);

export default GeoReachScene;
