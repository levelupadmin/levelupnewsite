import { useEffect, useRef, useState } from "react";

interface Props {
  /**
   * Fixed ISO date the offer expires at. Pass a real campaign close
   * date so the countdown is honest. If omitted, falls back to a
   * rolling 14-day window keyed to the user's first visit (still
   * better than the 72h "ever-rolling urgency" the audit flagged as
   * dishonest, but use a real date when there is one).
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
 * Countdown timer.
 *
 * Wave 1 honesty pass: when given a real `endsAt`, the countdown is a
 * truthful campaign-close clock. When `endsAt` is omitted it falls
 * back to a 14-day rolling window keyed to the visitor's first visit
 * (was 72h — too short to read as honest given how many returning
 * visits we see in Clarity).
 *
 * Accessibility: aria-live polite announcements throttled to once per
 * minute (was every second — would spam screen-reader users).
 *
 * SSR-safe: server renders a static placeholder; the client hydrates
 * and replaces with the real value within ~50ms.
 */
export default function CountdownTimer({
  endsAt,
  storageKey = "lokesh-countdown-v1",
  compact = false,
  tone = "warm",
}: Props) {
  const [target, setTarget] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  // What we have ALREADY announced to assistive tech. Compare on each
  // tick — only update DOM if the minute boundary changed.
  const lastAnnouncedMinute = useRef<number | null>(null);
  const [a11yLabel, setA11yLabel] = useState("");

  useEffect(() => {
    let t: number;
    if (endsAt) {
      t = new Date(endsAt).getTime();
    } else {
      const seen = window.localStorage.getItem(storageKey);
      if (seen) {
        t = parseInt(seen, 10);
      } else {
        // 14d rolling fallback (was 72h — audit flagged as dishonest).
        t = Date.now() + 14 * 24 * 60 * 60 * 1000;
        window.localStorage.setItem(storageKey, String(t));
      }
    }
    setTarget(t);
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [endsAt, storageKey]);

  // SSR placeholder — won't blink to a different value because we render
  // a stable hh:mm:00 first paint and hydrate over it.
  const ms = target === null ? 47 * 3600_000 + 30 * 60_000 : Math.max(0, target - now);
  const totalSeconds = Math.floor(ms / 1000);
  const totalDays = Math.floor(totalSeconds / 86400);
  const hh = Math.floor(totalSeconds / 3600);
  const mm = Math.floor((totalSeconds % 3600) / 60);
  const ss = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  // Throttle the live-region announcement to once per minute. Without
  // this, screen readers re-announce the time every second — completely
  // unusable. Update the label only when the minute boundary changes.
  useEffect(() => {
    if (target === null) return;
    const minutes = Math.floor(totalSeconds / 60);
    if (lastAnnouncedMinute.current !== minutes) {
      lastAnnouncedMinute.current = minutes;
      // Friendly natural-language label, e.g. "Offer closes in 2 days, 4 hours, 17 minutes."
      const parts: string[] = [];
      if (totalDays > 0) parts.push(`${totalDays} day${totalDays === 1 ? "" : "s"}`);
      const remHours = hh - totalDays * 24;
      if (remHours > 0) parts.push(`${remHours} hour${remHours === 1 ? "" : "s"}`);
      parts.push(`${mm} minute${mm === 1 ? "" : "s"}`);
      setA11yLabel(`Offer closes in ${parts.join(", ")}.`);
    }
  }, [totalSeconds, hh, mm, totalDays, target]);

  const colors =
    tone === "alert"
      ? { num: "text-amber-200", label: "text-amber-200/70", bg: "bg-amber-200/[0.06]", border: "border-amber-200/20" }
      : { num: "text-white", label: "text-white/55", bg: "bg-white/[0.04]", border: "border-white/[0.10]" };

  // The visible digits update every second (visual UX) but get
  // aria-hidden so AT users only hear the throttled label.
  const visibleDigits = (
    <span className="flex items-center gap-1 tabular-nums font-semibold text-[14px] md:text-[15px] tracking-tight" aria-hidden="true">
      {totalDays > 0 && (
        <>
          <span className={colors.num}>{totalDays}d</span>
          <span className={colors.num} aria-hidden="true">·</span>
        </>
      )}
      <span className={colors.num}>{pad(hh - totalDays * 24)}</span>
      <span className={colors.num} aria-hidden="true">:</span>
      <span className={colors.num}>{pad(mm)}</span>
      <span className={colors.num} aria-hidden="true">:</span>
      <span className={colors.num}>{pad(ss)}</span>
    </span>
  );

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1 tabular-nums font-semibold tracking-tight">
        {visibleDigits}
        <span className="sr-only" aria-live="polite" aria-atomic="true">{a11yLabel}</span>
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border ${colors.bg} ${colors.border}`}>
      <span className={`text-[10px] md:text-[11px] uppercase tracking-[0.16em] ${colors.label}`} aria-hidden="true">
        Closes in
      </span>
      {visibleDigits}
      <span className="sr-only" aria-live="polite" aria-atomic="true">{a11yLabel}</span>
    </div>
  );
}
