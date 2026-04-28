import { useState } from "react";
import { Play } from "lucide-react";

export default function LokeshTrailer({ ytId }: { ytId: string }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://i.ytimg.com/vi_webp/${ytId}/maxresdefault.webp`;

  if (playing) {
    return (
      <div className="relative aspect-video bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&color=white`}
          title="Lokesh Kanagaraj Masterclass — Official Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="relative aspect-video w-full bg-black overflow-hidden group"
      aria-label="Play official trailer"
    >
      <img
        src={thumb}
        alt="Lokesh Kanagaraj Masterclass trailer"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
      <div className="absolute top-4 left-4 md:top-5 md:left-5 inline-flex items-center gap-2.5">
        <span className="block h-5 w-1 bg-red-500 rounded-sm" />
        <span className="text-[11px] tracking-[0.22em] uppercase text-white font-semibold">
          Official Trailer
        </span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-white/95 text-black shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-110">
          <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
        </span>
      </div>
    </button>
  );
}
