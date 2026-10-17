import { useRef, useEffect, useState } from "react";

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
}

/**
 * Muted loop that plays only while on screen.
 *
 * - preload="none": nothing downloads until the clip first scrolls into view.
 * - Plays while at least `threshold` of it is visible, pauses when it leaves.
 * - If the browser refuses autoplay (Low Power Mode, data saver) or the
 *   visitor prefers reduced motion, native controls appear so the box is
 *   never a dead black rectangle.
 */
export default function IntersectionPlayVideo({ src, poster, className = "", ariaLabel, threshold = 0.3 }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [needsControls, setNeedsControls] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setNeedsControls(true);
      return;
    }
    if (!("IntersectionObserver" in window)) {
      setNeedsControls(true);
      return;
    }
    let started = false;
    let refused = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (refused) continue;
          if (e.isIntersecting) {
            if (!started) {
              v.preload = "auto";
              started = true;
            }
            v.muted = true;
            v.play().catch(() => {
              refused = true;
              setNeedsControls(true);
            });
          } else {
            v.pause();
          }
        }
      },
      { threshold }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      disableRemotePlayback
      controls={needsControls}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel || needsControls ? undefined : true}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
