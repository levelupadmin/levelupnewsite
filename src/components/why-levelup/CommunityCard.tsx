const CommunityCard = () => {
  const nodes = [
    { cx: 60, cy: 40 },
    { cx: 35, cy: 60 },
    { cx: 85, cy: 60 },
    { cx: 28, cy: 85 },
    { cx: 60, cy: 90 },
    { cx: 92, cy: 85 },
  ];

  const edges: [number, number][] = [
    [0, 1], [0, 2], [1, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 4], [4, 5],
  ];

  return (
    <div className="flex items-center justify-center h-full w-full">
      <svg viewBox="0 0 120 120" className="w-full h-full max-w-[120px] max-h-[120px]" fill="none">
        {/* Connection lines */}
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].cx} y1={nodes[a].cy}
            x2={nodes[b].cx} y2={nodes[b].cy}
            stroke="hsl(30 60% 45% / 0.25)"
            strokeWidth="1"
          />
        ))}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.cx} cy={n.cy}
            r={i === 0 ? 10 : 7}
            stroke={i === 0 ? "hsl(30 70% 50%)" : "hsl(30 50% 40% / 0.5)"}
            strokeWidth={i === 0 ? 1.5 : 1}
            fill={i === 0 ? "hsl(30 70% 50% / 0.15)" : "hsl(30 50% 40% / 0.08)"}
          />
        ))}

        {/* Pulse ring on center */}
        <circle cx="60" cy="40" r="15" stroke="hsl(30 70% 50% / 0.15)" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
};

export default CommunityCard;
