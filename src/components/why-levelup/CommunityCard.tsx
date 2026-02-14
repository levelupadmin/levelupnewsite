const CommunityCard = () => {
  const satellites = [
    { angle: 30, orbit: 2, size: 30 },
    { angle: 135, orbit: 2, size: 26 },
    { angle: 225, orbit: 2, size: 28 },
    { angle: 320, orbit: 2, size: 24 },
    { angle: 80, orbit: 1, size: 22 },
    { angle: 260, orbit: 1, size: 20 },
  ];

  const orbitRadii = [0, 60, 100, 135];

  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative" style={{ width: 270, height: 270 }}>
        {/* Orbit rings with glow */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-primary/20"
            style={{
              width: orbitRadii[i] * 2,
              height: orbitRadii[i] * 2,
              top: `calc(50% - ${orbitRadii[i]}px)`,
              left: `calc(50% - ${orbitRadii[i]}px)`,
              boxShadow: i === 2 ? '0 0 15px hsl(30 60% 40% / 0.15)' : 'none',
            }}
          />
        ))}

        {/* Center avatar */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-primary bg-muted overflow-hidden z-10 shadow-[0_0_20px_hsl(30_80%_50%/0.3)]">
          <div className="w-full h-full bg-gradient-to-br from-primary/50 to-primary/20" />
        </div>

        {/* Satellite avatars */}
        {satellites.map((s, i) => {
          const rad = (s.angle * Math.PI) / 180;
          const r = orbitRadii[s.orbit];
          const cx = 135;
          const x = cx + Math.cos(rad) * r - s.size / 2;
          const y = cx + Math.sin(rad) * r - s.size / 2;
          return (
            <div
              key={i}
              className="absolute rounded-full border border-border/50 bg-muted overflow-hidden shadow-[0_0_8px_hsl(30_60%_40%/0.15)]"
              style={{ width: s.size, height: s.size, left: x, top: y }}
            >
              <div className="w-full h-full" style={{ background: `hsl(${160 + i * 30} 35% ${28 + i * 5}%)` }} />
            </div>
          );
        })}

        {/* Accent dots */}
        <div
          className="absolute w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_hsl(210_80%_50%/0.6)]"
          style={{ left: 135 + Math.cos((160 * Math.PI) / 180) * 80 - 6, top: 135 + Math.sin((160 * Math.PI) / 180) * 80 - 6 }}
        />
        <div
          className="absolute w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_hsl(160_60%_45%/0.5)]"
          style={{ left: 135 + Math.cos((280 * Math.PI) / 180) * 65 - 5, top: 135 + Math.sin((280 * Math.PI) / 180) * 65 - 5 }}
        />
      </div>
    </div>
  );
};

export default CommunityCard;
