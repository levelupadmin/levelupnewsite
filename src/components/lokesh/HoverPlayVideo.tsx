import { useRef, useState } from "react";

interface Props {
  src: string;
  poster?: string;
  className?: string;
}

/**
 * A perf-friendly video card. Loads a static poster image by default;
 * starts the video only when the user hovers (desktop) or scrolls into
 * view + taps (mobile). Pauses on leave. preload="none" until activated.
 */
export default function HoverPlayVideo({ src, poster, className = "" }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState(false);

  const start = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.preload !== "auto") v.preload = "auto";
    v.muted = true;
    v.play().catch(() => {});
    setActive(true);
  };

  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    setActive(false);
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={start}
      onMouseLeave={stop}
      onTouchStart={start}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${active ? "opacity-100" : "opacity-95"}`}
      />
      {!active && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/90 text-black shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </span>
        </div>
      )}
    </div>
  );
}
