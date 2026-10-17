import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  /** Desktop video (also the fallback when no mobileSrc is given). */
  src: string;
  /** Desktop poster; the first-screen image until the video plays. */
  poster: string;
  /** Mobile video, picked for viewports up to 767 px. */
  mobileSrc?: string;
  /** Mobile poster matching the mobile video. */
  mobilePoster?: string;
  /** Optional aria label override */
  ariaLabel?: string;
  /**
   * Whether the clip has a sound track. When false there is no
   * "tap to unmute" hint and no tap-to-toggle; the clip is a plain muted
   * loop. Default true, which keeps the old behaviour.
   */
  hasAudio?: boolean;
  /** Alt text for the poster image. Default: `ariaLabel`, else empty. */
  posterAlt?: string;
  /** CSS object-position for the desktop poster and video. */
  objectPosition?: string;
  /** CSS object-position for the mobile poster and video. */
  mobileObjectPosition?: string;
  /** Start the muted loop after the page loads. Default true. */
  autoPlay?: boolean;
}

const MOBILE = "(max-width: 767px)";

/**
 * True only when the playing clip is known to carry sound. Browsers expose
 * this differently; when none of them answers, assume silence so a silent
 * loop never shows a "Tap to unmute" hint that does nothing.
 */
function clipHasSound(v: HTMLVideoElement): boolean {
  const m = v as HTMLVideoElement & {
    mozHasAudio?: boolean;
    webkitAudioDecodedByteCount?: number;
    audioTracks?: { length: number };
  };
  if (typeof m.mozHasAudio === "boolean") return m.mozHasAudio;
  if (m.audioTracks && typeof m.audioTracks.length === "number") return m.audioTracks.length > 0;
  if (typeof m.webkitAudioDecodedByteCount === "number") return m.webkitAudioDecodedByteCount > 0;
  return false;
}

/**
 * First-screen video.
 *
 * - The server HTML carries a <picture> poster (mobile and desktop) and a
 *   <video preload="none"> with a source per breakpoint, so the poster is
 *   the LCP image and no video bytes load before the page has.
 * - After window load the muted loop starts; the poster fades out once
 *   frames are playing. prefers-reduced-motion and Save-Data skip autoplay.
 * - If the browser refuses autoplay, a play button appears.
 * - With hasAudio, a tap toggles sound, and a short "Tap to unmute" hint
 *   shows only if the browser reports a sound track in the file. Without
 *   hasAudio, taps do nothing and no hint shows.
 */
export default function HeroPlayer({
  src,
  poster,
  mobileSrc,
  mobilePoster,
  ariaLabel,
  hasAudio = true,
  posterAlt,
  objectPosition,
  mobileObjectPosition,
  autoPlay = true,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hintTimer = useRef<number | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  const start = useCallback(
    (fromTap: boolean) => {
      const v = videoRef.current;
      if (!v) return;
      // Browsers without <source media> support pick the first source;
      // set the right one explicitly before the first byte loads.
      const wantMobile = Boolean(mobileSrc) && window.matchMedia(MOBILE).matches;
      const desired = wantMobile && mobileSrc ? mobileSrc : src;
      const abs = new URL(desired, window.location.href).href;
      if (v.currentSrc !== abs) v.src = desired;
      v.muted = true;
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.then(() => {
          setAutoplayBlocked(false);
          if (hasAudio) {
            // Check for a sound track once a little audio could have been
            // decoded; the hint only shows when there is something to hear.
            window.clearTimeout(hintTimer.current);
            hintTimer.current = window.setTimeout(() => {
              if (!clipHasSound(v)) return;
              setShowHint(true);
              hintTimer.current = window.setTimeout(() => setShowHint(false), 4500);
            }, 700);
          }
        }).catch(() => {
          if (!fromTap) setAutoplayBlocked(true);
        });
      }
    },
    [src, mobileSrc, hasAudio]
  );

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
    if (!autoPlay || reduce || saveData) {
      // Silent loops just stay on the poster; clips with sound offer a button.
      if (hasAudio) setAutoplayBlocked(true);
      return;
    }
    let t: number | undefined;
    const go = () => {
      t = window.setTimeout(() => start(false), 120);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      window.clearTimeout(t);
      window.clearTimeout(hintTimer.current);
    };
  }, [start, autoPlay, hasAudio]);

  const handleClick = () => {
    const v = videoRef.current;
    if (!v) return;
    if (!isPlaying) {
      start(true);
      return;
    }
    if (!hasAudio) return;
    v.muted = !v.muted;
    setShowHint(false);
  };

  const pos = (isMobile && mobileObjectPosition) || objectPosition;
  const posterLayer = (
    <picture
      className={`absolute inset-0 block w-full h-full pointer-events-none transition-opacity duration-700 motion-reduce:transition-none ${
        isPlaying ? "opacity-0" : "opacity-100"
      }`}
    >
      {mobilePoster && <source media={MOBILE} srcSet={mobilePoster} />}
      <img
        src={poster}
        alt={posterAlt ?? ariaLabel ?? ""}
        className="absolute inset-0 w-full h-full object-cover"
        style={pos ? { objectPosition: pos } : undefined}
        // @ts-expect-error fetchpriority is valid HTML; React 18 types lag behind.
        fetchpriority="high"
        loading="eager"
        decoding="async"
      />
    </picture>
  );

  const video = (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      disableRemotePlayback
      // The poster fades only once frames are actually on screen.
      onPlaying={() => setIsPlaying(true)}
      aria-hidden={hasAudio ? undefined : true}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      style={pos ? { objectPosition: pos } : undefined}
    >
      {mobileSrc && <source src={mobileSrc} media={MOBILE} type="video/mp4" />}
      <source src={src} type="video/mp4" />
    </video>
  );

  // Same play button as the trailer: dark glass, gold ring, white glyph.
  const playIcon = (
    <span className="inline-flex items-center justify-center h-16 w-16 md:h-20 md:w-20 rounded-full bg-black/45 text-white ring-1 ring-[#f5d59a]/70 shadow-[0_0_0_6px_rgba(245,213,154,0.12),0_14px_34px_rgba(0,0,0,0.5)] backdrop-blur-[6px] transition-transform duration-300 group-hover:scale-105 group-active:scale-95 motion-reduce:transition-none">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="ml-1"><path d="M8 5v14l11-7z" /></svg>
    </span>
  );

  if (!hasAudio) {
    // A silent loop is decoration: no full-bleed button, so taps on the
    // hero are not dead clicks. Only a refused autoplay gets a button.
    return (
      <div className="absolute inset-0 w-full h-full block">
        {video}
        {posterLayer}
        {autoplayBlocked && !isPlaying && (
          <button
            type="button"
            onClick={handleClick}
            aria-label={ariaLabel || "Play video"}
            className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5d59a]"
          >
            {playIcon}
          </button>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel || "Play hero video"}
      className="group absolute inset-0 w-full h-full p-0 m-0 border-0 bg-transparent cursor-pointer block focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#f5d59a]"
    >
      {video}
      {posterLayer}
      {autoplayBlocked && !isPlaying && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">{playIcon}</span>
      )}
      {showHint && isPlaying && (
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-sm text-white text-[12px] tracking-[-0.01em] pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /></svg>
          Tap to unmute
        </span>
      )}
    </button>
  );
}
