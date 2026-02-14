const ExpertMembershipCard = () => {
  const points = [
    { x: 0.08, y: 0.82 },
    { x: 0.22, y: 0.68 },
    { x: 0.36, y: 0.65 },
    { x: 0.50, y: 0.50 },
    { x: 0.64, y: 0.42 },
    { x: 0.78, y: 0.35 },
    { x: 0.92, y: 0.22 },
  ];

  const toSvg = (p: { x: number; y: number }) => `${p.x * 280},${p.y * 180}`;
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${toSvg(p)}`).join(" ");
  const areaPath = `${linePath} L${0.92 * 280},180 L${0.08 * 280},180 Z`;

  return (
    <div className="flex flex-col h-full">
      {/* Chart */}
      <div className="flex-1 relative">
        <svg viewBox="0 0 280 180" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="emAreaGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(30 80% 50%)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(30 80% 50%)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="emLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(30 60% 40%)" />
              <stop offset="100%" stopColor="hsl(35 90% 55%)" />
            </linearGradient>
            <filter id="dotGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Vertical grid lines */}
          {points.map((p, i) => (
            <line key={i} x1={p.x * 280} y1={p.y * 180} x2={p.x * 280} y2={180} stroke="hsl(30 50% 40%)" strokeOpacity="0.15" strokeWidth="1" />
          ))}
          <path d={areaPath} fill="url(#emAreaGlow)" />
          <path d={linePath} fill="none" stroke="url(#emLineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((p, i) => (
            <circle key={i} cx={p.x * 280} cy={p.y * 180} r="4.5" fill="hsl(35 90% 55%)" filter="url(#dotGlow)" />
          ))}
        </svg>

        {/* Verified avatar */}
        <div className="absolute top-1 right-3 flex items-start gap-0">
          <div className="w-11 h-11 rounded-full border-2 border-primary bg-muted overflow-hidden shadow-[0_0_12px_hsl(30_80%_50%/0.4)]">
            <div className="w-full h-full bg-gradient-to-br from-primary/50 to-primary/20" />
          </div>
          <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center -ml-2 mt-7 text-[10px] text-white font-bold shadow-[0_0_8px_hsl(160_60%_45%/0.5)]">✓</span>
        </div>
      </div>

      {/* Label */}
      <div className="mt-2 rounded-lg border border-primary/30 bg-primary/10 backdrop-blur-sm px-3 py-1.5">
        <span className="font-sans-body text-xs text-primary tracking-wide">1:1 coaching from top creators</span>
      </div>

      {/* Avatar row */}
      <div className="flex items-center gap-1.5 mt-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-9 h-9 rounded-lg border border-border/40 bg-muted overflow-hidden">
            <div className="w-full h-full" style={{ background: `hsl(${200 + i * 40} 45% ${25 + i * 8}%)` }} />
          </div>
        ))}
        <div className="w-9 h-9 rounded-lg border border-border/40 bg-muted/50 flex items-center justify-center">
          <span className="font-sans-body text-xs text-muted-foreground">+5</span>
        </div>
      </div>
    </div>
  );
};

export default ExpertMembershipCard;
