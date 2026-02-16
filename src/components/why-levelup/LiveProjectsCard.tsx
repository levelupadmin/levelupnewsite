const LiveProjectsCard = () => {
  return (
    <div className="flex flex-col items-center justify-between h-full py-2">
      <div className="flex-1 flex flex-col items-center justify-center gap-0 w-full">
        {/* Script ── Shoot row */}
        <div className="flex items-center justify-center gap-5 w-full">
          <div className="rounded-lg border border-primary/30 bg-primary/8 backdrop-blur-sm px-6 py-2.5">
            <span className="font-sans-body text-sm text-foreground/90">Script</span>
          </div>
          <div className="w-10 border-t border-dashed border-primary/30" />
          <div className="rounded-lg border border-primary/30 bg-primary/8 backdrop-blur-sm px-6 py-2.5">
            <span className="font-sans-body text-sm text-foreground/90">Shoot</span>
          </div>
        </div>

        {/* Vertical dashed connectors */}
        <div className="flex items-start justify-center gap-5 w-full">
          <div className="h-12 border-l border-dashed border-primary/30 ml-[72px]" />
          <div className="w-10" />
          <div className="h-12 border-l border-dashed border-primary/30 mr-[72px]" />
        </div>

        {/* Edit */}
        <div className="rounded-lg border border-primary/30 bg-primary/8 backdrop-blur-sm px-6 py-2.5">
          <span className="font-sans-body text-sm text-foreground/90">Edit</span>
        </div>
      </div>

      {/* Bottom badge */}
      <div className="mt-5 w-full rounded-lg border border-primary/30 bg-primary/10 backdrop-blur-sm px-4 py-2.5 text-center">
        <span className="font-sans-body text-xs text-primary tracking-wide">Portfolio-ready deliverables</span>
      </div>
    </div>
  );
};

export default LiveProjectsCard;
