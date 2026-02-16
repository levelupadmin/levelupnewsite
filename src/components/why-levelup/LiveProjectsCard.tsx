const LiveProjectsCard = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <svg viewBox="0 0 120 120" className="w-full h-full max-w-[120px] max-h-[120px]" fill="none">
        {/* Clapperboard top */}
        <rect x="25" y="28" width="70" height="12" rx="2" stroke="hsl(30 70% 50%)" strokeWidth="1.5" fill="hsl(30 70% 50% / 0.12)" />
        <line x1="40" y1="28" x2="35" y2="40" stroke="hsl(30 70% 50% / 0.4)" strokeWidth="1" />
        <line x1="55" y1="28" x2="50" y2="40" stroke="hsl(30 70% 50% / 0.4)" strokeWidth="1" />
        <line x1="70" y1="28" x2="65" y2="40" stroke="hsl(30 70% 50% / 0.4)" strokeWidth="1" />
        <line x1="85" y1="28" x2="80" y2="40" stroke="hsl(30 70% 50% / 0.4)" strokeWidth="1" />

        {/* Screen body */}
        <rect x="25" y="40" width="70" height="48" rx="2" stroke="hsl(30 50% 40% / 0.5)" strokeWidth="1.5" fill="hsl(30 50% 40% / 0.06)" />

        {/* Play triangle */}
        <path d="M54 56 l14 8 -14 8z" fill="hsl(30 70% 50% / 0.3)" stroke="hsl(30 70% 50%)" strokeWidth="1.2" strokeLinejoin="round" />

        {/* Timeline bar */}
        <rect x="32" y="80" width="56" height="3" rx="1.5" fill="hsl(30 50% 40% / 0.15)" />
        <rect x="32" y="80" width="32" height="3" rx="1.5" fill="hsl(30 70% 50% / 0.5)" />
        <circle cx="64" cy="81.5" r="3" fill="hsl(30 70% 50%)" />
      </svg>
    </div>
  );
};

export default LiveProjectsCard;
