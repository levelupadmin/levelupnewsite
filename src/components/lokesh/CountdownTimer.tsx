import { useEffect, useState } from "react";

interface Props {
  /**
   * Either a fixed ISO date the offer expires at, OR omitted to use a
   * rolling 72-hour window keyed to the user's first visit.
   * (Storing first-visit timestamp in localStorage means a returning
   * user sees a consistent countdown — not a fresh 72h every reload —
   * so the urgency reads as honest.)
   */
  endsAt?: string;
  /** Storage key — bump this to force a fresh countdown for all users */
  storageKey?: string;
  /** Static layout? hh:mm:ss only with no labels (compact, for hero) */
  compact?: boolean;
  /** Tone — "warm" for hero (cream), "alert" for pricing card (amber) */
  tone?: "warm" | "alert";
}

/**
 * Real countdown timer for the Lokesh masterclass CRO plan.
 *
 * Pattern: when a visitor first lands, we mark `firstSeen` in
 * localStorage. The countdown ticks down from `firstSeen + 72h`. If a
 * fixed `endsAt` is passed, that overrides — useful when there's an
 * actual cohort close date.
 *
 * SSR-safe: server renders a static "47:30:00" placeholder; the client
 * hydrates and replaces with the real value within ~50ms.
 */
export default function CountdownTimer({
  endsAt,
  storageKey = "lokesh-countdown-v1",
  compact = false,
  tone = "warm",
}: Props) {
  const [target, setTarget] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let t: number;
    if (endsAt) {
      t = new Date(endsAt).getTime();
    } else {
      const seen = window.localStorage.getItem(storageKey);
      if (seen) {
        t = parseInt(seen, 10);
      } else {
        t = Date.now() + 72 * 60 * 60 * 1000;
        window.localStorage.setItem(storageKey, String(t));
      }
    }
    setTarget(t);
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [endsAt, storageKey]);

  // SSR placeholder — won't blink to a different value because we render
  // 47:30:00 on first paint and hydrate over it.
  const ms = target === null ? 47 * 3600_000 + 30 * 60_000 : Math.max(0, target - now);
  const totalSeconds = Math.floor(ms / 1000);
  const hh = Math.floor(totalSeconds / 3600);
  const mm = Math.floor((totalSeconds % 3600) / 60);
  const ss = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  const colors =
    tone === "alert"
      ? { num: "text-amber-200", label: "text-amber-200/70", bg: "bg-amber-200/[0.06]", border: "border-amber-200/20" }
      : { num: "text-white", label: "text-white/55", bg: "bg-white/[0.04]", border: "border-white/[0.10]" };

  if (compact) {
    return (
      <span
        className="inline-flex items-center gap-1 tabular-nums font-semibold tracking-tight"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className={colors.num}>{pad(hh)}</span>
        <span className={colors.num} aria-hidden="true">:</span>
        <span className={colors.num}>{pad(mm)}</span>
        <span className={colors.num} aria-hidden="true">:</span>
        <span className={colors.num}>{pad(ss)}</span>
      </span>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border ${colors.bg} ${colors.border}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className={`text-[10px] md:text-[11px] uppercase tracking-[0.16em] ${colors.label}`}>
        Closes in
      </span>
      <span className="flex items-center gap-1 tabular-nums font-semibold text-[14px] md:text-[15px] tracking-tight">
        <span className={colors.num}>{pad(hh)}</span>
        <span className={colors.num} aria-hidden="true">:</span>
        <span className={colors.num}>{pad(mm)}</span>
        <span className={colors.num} aria-hidden="true">:</span>
        <span className={colors.num}>{pad(ss)}</span>
      </span>
    </div>
  );
}
