import { useState } from "react";
import FadeInSection from "@/components/FadeInSection";
import { vePromoVideo } from "@/data/liveVEData";
import { Play } from "lucide-react";

const VEPromoVideo = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-16 md:py-24 px-4 md:px-8" style={{ background: "hsl(160 8% 8%)" }}>
      <div className="max-w-[1200px] mx-auto">
        <FadeInSection className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight">
            {vePromoVideo.title}
          </h2>
        </FadeInSection>

        <FadeInSection delay={100}>
          <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video relative">
            {!playing ? (
              <button onClick={() => setPlaying(true)} className="relative w-full h-full group">
                <video
                  src="https://ik.imagekit.io/levelup/VE/Gif.mp4?updatedAt=1775051200072"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-purple-500/80 flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-7 h-7 text-white ml-1" fill="white" />
                  </div>
                </div>
              </button>
            ) : (
              <iframe
                src={`https://player.vimeo.com/video/${vePromoVideo.vimeoId}?autoplay=1&badge=0&autopause=0`}
                allow="autoplay; fullscreen; picture-in-picture"
                title="Promo video"
                className="w-full h-full"
              />
            )}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default VEPromoVideo;
