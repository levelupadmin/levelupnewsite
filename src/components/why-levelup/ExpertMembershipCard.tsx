const ExpertMembershipCard = () => {
  // Chart data points (normalized 0-1 for the SVG viewbox)
  const points = [
    { x: 0.05, y: 0.85 },
    { x: 0.15, y: 0.72 },
    { x: 0.28, y: 0.7 },
    { x: 0.4, y: 0.55 },
    { x: 0.52, y: 0.48 },
    { x: 0.65, y: 0.42 },
    { x: 0.78, y: 0.32 },
    { x: 0.92, y: 0.22 },
  ];

  const toSvg = (p: { x: number; y: number }) => `${p.x * 280},${p.y * 160}`;
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${toSvg(p)}`).join(" ");
  const areaPath = `${linePath} L${0.92 * 280},160 L${0.05 * 280},160 Z`;

  return (
    <div className="flex flex-col h-full">
      {/* Chart area */}
      <div className="flex-1 relative">
        <svg viewBox="0 0 280 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(30 90% 50%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(30 90% 50%)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(30 70% 45%)" />
              <stop offset="100%" stopColor="hsl(35 85% 55%)" />
            </linearGradient>
          </defs>
          {/* Vertical grid lines */}
          {points.map((p, i) => (
            <line key={i} x1={p.x * 280} y1={p.y * 160} x2={p.x * 280} y2={160} stroke="hsl(30 60% 40%)" strokeOpacity="0.2" strokeWidth="1" />
          ))}
          {/* Area fill */}
          <path d={areaPath} fill="url(#chartGlow)" />
          {/* Line */}
          <path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Dots */}
          {points.map((p, i) => (
            <circle key={i} cx={p.x * 280} cy={p.y * 160} r="4" fill="hsl(35 85% 55%)" />
          ))}
        </svg>
        {/* Avatar with check at top-right of chart */}
        <div className="absolute top-2 right-4 flex items-start gap-0">
          <div className="w-10 h-10 rounded-full border-2 border-primary bg-muted overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-primary/40 to-primary/20" />
          </div>
          <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center -ml-2 mt-6 text-[10px] text-white font-bold">✓</span>
        </div>
      </div>

      {/* Label bar */}
      <div className="mt-2 rounded-md border border-primary/40 bg-primary/10 px-3 py-1.5">
        <span className="font-sans-body text-xs text-primary tracking-wide">1:1 coaching from top creators</span>
      </div>

      {/* Avatar row */}
      <div className="flex items-center gap-1.5 mt-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-9 h-9 rounded-md border border-border/60 bg-muted overflow-hidden">
            <div className="w-full h-full" style={{ background: `hsl(${200 + i * 40} 50% ${25 + i * 10}%)` }} />
          </div>
        ))}
        <div className="w-9 h-9 rounded-md border border-border/60 bg-muted flex items-center justify-center">
          <span className="font-sans-body text-xs text-muted-foreground">+5</span>
        </div>
      </div>
    </div>
  );
};

export default ExpertMembershipCard;
