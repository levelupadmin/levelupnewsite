import { useRef, useEffect, useState, type CSSProperties } from "react";

interface Props {
  src: string;
  /** Frame shown before the clip plays. Without it the box is black until
   *  the first frame loads, so pass one for every below-the-fold clip. */
  poster?: string;
  className?: string;
  /** Accessible name. Leave out for a decorative clip (it is then hidden
   *  from screen readers). */
  ariaLabel?: string;
  /** Share of the clip that must be on screen before it plays. Default 0.3. */
  threshold?: number;
  /** Paint the dark placeholder on the video itself. Default true. Pass
   *  false when the caller puts its own poster image behind the video: the
   *  opaque placeholder covered that image until a frame painted, and for
   *  good when the clip never loads (reduced motion, Save-Data, no JS). */
  placeholder?: boolean;
  /** Poster set only once native controls show (reduced motion, Save-Data,
   *  autoplay refused). Chrome paints its controls grey over a video with no
   *  frame, hiding any image behind it. It is not in the HTML, so nothing
   *  downloads with the page; pass the URL the image behind the video has
   *  already loaded. */
  lazyPoster?: string;
}

/** Shown behind the clip until a frame paints, so the box is never flat black. */
const PLACEHOLDER: CSSProperties = {
  backgroundColor: "#0b0a09",
  backgroundImage: "radial-gradient(90% 70% at 50% 40%, rgba(70,48,26,0.45), transparent 70%)",
};

/**
 * Muted loop that plays only while on screen.
 *
 * - preload="none" in the HTML: nothing downloads on page load.
 * - About one screen before the clip arrives it asks for metadata, so the
 *   first frame is ready by the time it is in view.
 * - Plays while at least `threshold` of it is visible, pauses when it leaves.
 * - With no poster, a dark warm placeholder sits behind the clip until its
 *   first frame paints (unless `placeholder` is false: the caller's own
 *   image behind the video then shows through).
 * - If the browser refuses autoplay (Low Power Mode), the visitor prefers
 *   reduced motion, or Save-Data is on, native controls appear and nothing
 *   plays by itself, so the box is never a dead rectangle.
 */
export default function IntersectionPlayVideo({ src, poster, className = "", ariaLabel, threshold = 0.3, placeholder = true, lazyPoster }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [needsControls, setNeedsControls] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || saveData || !("IntersectionObserver" in window)) {
      setNeedsControls(true);
      return;
    }

    let primed = false;
    let refused = false;
    const prime = () => {
      if (primed) return;
      primed = true;
      if (v.preload === "none") v.preload = "metadata";
    };

    // One screen ahead: fetch metadata and the first frame.
    const near = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          prime();
          near.disconnect();
        }
      },
      { rootMargin: "100% 0px 100% 0px" }
    );

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (refused) continue;
          if (e.isIntersecting) {
            prime();
            v.preload = "auto";
            v.muted = true;
            const p = v.play();
            if (p && typeof p.catch === "function") {
              p.catch(() => {
                refused = true;
                setNeedsControls(true);
              });
            }
          } else if (!v.paused) {
            v.pause();
          }
        }
      },
      { threshold }
    );
    near.observe(v);
    io.observe(v);
    return () => {
      near.disconnect();
      io.disconnect();
    };
  }, [threshold]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster ?? (needsControls ? lazyPoster : undefined)}
      muted
      loop
      playsInline
      preload="none"
      disableRemotePlayback
      controls={needsControls}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel || needsControls ? undefined : true}
      className={`w-full h-full object-cover ${className}`}
      style={placeholder ? PLACEHOLDER : undefined}
    />
  );
}
