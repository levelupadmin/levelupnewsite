const CommunityCard = () => {
  // Orbital positions (angle in degrees, orbit index 0=inner, 1=mid, 2=outer)
  const satellites = [
    { angle: 30, orbit: 2, size: 28 },
    { angle: 120, orbit: 2, size: 24 },
    { angle: 210, orbit: 2, size: 26 },
    { angle: 310, orbit: 2, size: 22 },
    { angle: 70, orbit: 1, size: 20 },
    { angle: 250, orbit: 1, size: 18 },
  ];

  const orbitRadii = [0, 60, 95, 130];

  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative" style={{ width: 260, height: 260 }}>
        {/* Orbit rings */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-primary/20"
            style={{
              width: orbitRadii[i] * 2,
              height: orbitRadii[i] * 2,
              top: `calc(50% - ${orbitRadii[i]}px)`,
              left: `calc(50% - ${orbitRadii[i]}px)`,
            }}
          />
        ))}

        {/* Center avatar */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-primary bg-muted overflow-hidden z-10">
          <div className="w-full h-full bg-gradient-to-br from-primary/50 to-primary/20" />
        </div>

        {/* Satellite avatars */}
        {satellites.map((s, i) => {
          const rad = (s.angle * Math.PI) / 180;
          const r = orbitRadii[s.orbit];
          const x = 130 + Math.cos(rad) * r - s.size / 2;
          const y = 130 + Math.sin(rad) * r - s.size / 2;
          return (
            <div
              key={i}
              className="absolute rounded-full border border-border/60 bg-muted overflow-hidden"
              style={{ width: s.size, height: s.size, left: x, top: y }}
            >
              <div className="w-full h-full" style={{ background: `hsl(${160 + i * 30} 40% ${30 + i * 5}%)` }} />
            </div>
          );
        })}

        {/* Accent dot (blue) */}
        <div
          className="absolute w-3 h-3 rounded-full bg-blue-500"
          style={{ left: 130 + Math.cos((160 * Math.PI) / 180) * 80 - 6, top: 130 + Math.sin((160 * Math.PI) / 180) * 80 - 6 }}
        />
        {/* Accent dot (green) */}
        <div
          className="absolute w-2.5 h-2.5 rounded-full bg-emerald-500"
          style={{ left: 130 + Math.cos((280 * Math.PI) / 180) * 65 - 5, top: 130 + Math.sin((280 * Math.PI) / 180) * 65 - 5 }}
        />
      </div>
    </div>
  );
};

export default CommunityCard;
