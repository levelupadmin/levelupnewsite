const ExpertMembershipCard = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <svg viewBox="0 0 120 120" className="w-full h-full max-w-[120px] max-h-[120px]" fill="none">
        {/* Central mentor circle */}
        <circle cx="60" cy="45" r="18" stroke="hsl(30 70% 50%)" strokeWidth="1.5" fill="hsl(30 70% 50% / 0.1)" />
        <circle cx="60" cy="39" r="7" fill="hsl(30 70% 50% / 0.4)" />
        <path d="M48 53 a12 8 0 0 1 24 0" fill="hsl(30 70% 50% / 0.3)" />
        
        {/* Connection lines */}
        <line x1="45" y1="55" x2="28" y2="78" stroke="hsl(30 60% 45% / 0.3)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="75" y1="55" x2="92" y2="78" stroke="hsl(30 60% 45% / 0.3)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="60" y1="63" x2="60" y2="85" stroke="hsl(30 60% 45% / 0.3)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Student dots */}
        <circle cx="28" cy="84" r="6" stroke="hsl(30 50% 40% / 0.5)" strokeWidth="1" fill="hsl(30 50% 40% / 0.08)" />
        <circle cx="60" cy="90" r="6" stroke="hsl(30 50% 40% / 0.5)" strokeWidth="1" fill="hsl(30 50% 40% / 0.08)" />
        <circle cx="92" cy="84" r="6" stroke="hsl(30 50% 40% / 0.5)" strokeWidth="1" fill="hsl(30 50% 40% / 0.08)" />

        {/* Verified badge */}
        <circle cx="74" cy="33" r="5" fill="hsl(160 60% 45%)" />
        <path d="M71.5 33 l1.8 1.8 3.2-3.2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </div>
  );
};

export default ExpertMembershipCard;
