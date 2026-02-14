const LiveProjectsCard = () => {
  return (
    <div className="flex flex-col items-center justify-between h-full py-2">
      {/* Flow diagram */}
      <div className="flex-1 flex flex-col items-center justify-center gap-0 w-full">
        {/* Script ── Shoot row */}
        <div className="flex items-center justify-center gap-4 w-full">
          <div className="rounded-md border border-primary/40 bg-primary/10 px-5 py-2">
            <span className="font-sans-body text-sm text-foreground/90">Script</span>
          </div>
          <div className="w-8 border-t border-dashed border-primary/40" />
          <div className="rounded-md border border-primary/40 bg-primary/10 px-5 py-2">
            <span className="font-sans-body text-sm text-foreground/90">Shoot</span>
          </div>
        </div>

        {/* Vertical dashed connector */}
        <div className="h-10 border-l border-dashed border-primary/40 ml-8" />

        {/* Edit */}
        <div className="rounded-md border border-primary/40 bg-primary/10 px-5 py-2 ml-8">
          <span className="font-sans-body text-sm text-foreground/90">Edit</span>
        </div>
      </div>

      {/* Bottom label */}
      <div className="mt-4 w-full rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-center">
        <span className="font-sans-body text-xs text-primary tracking-wide">Portfolio-ready deliverables</span>
      </div>
    </div>
  );
};

export default LiveProjectsCard;
