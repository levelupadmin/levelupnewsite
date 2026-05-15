import { useState } from "react";
import { ArrowRight, Play, Quote, Star, X } from "lucide-react";
import FadeInSection from "./FadeInSection";
import AccentLine from "./AccentLine";
import { Picture } from "./Picture";

import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import aanchalThumb from "@/assets/aanchal-thumb.jpg";
import stinsonThumb from "@/assets/stinson-thumb.png";
import ashwinThumb from "@/assets/ashwin-thumb.jpg";
import ashwinVideo from "@/assets/ashwin.mp4";

const stars = Array.from({ length: 5 });

const TAG_STYLES: Record<string, string> = {
  Masterclass: "bg-primary/15 text-primary border-primary/25",
  "Online Cohort": "bg-teal-500/15 text-teal-400 border-teal-500/25",
  Forge: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  "The Forge": "bg-violet-500/15 text-violet-400 border-violet-500/25",
};

type Story = {
  tag: "Masterclass" | "Online Cohort" | "Forge" | "The Forge";
  quote: string;
  name: string;
  role: string;
  avatar: string | { src: string };
  thumbnail: string | { src: string };
  duration?: string;
  vimeoUrl?: string;
  kind: "video" | "text";
};

const stories: Story[] = [
  {
    kind: "video",
    tag: "The Forge",
    quote:
      "What I learnt over 3 years at Film School they covered in 10 days by actually doing rather than just learning.",
    name: "Aanchal",
    role: "Content Creator - Delhi",
    avatar: aanchalThumb,
    thumbnail: aanchalThumb,
    duration: "2:34",
  },
  {
    kind: "text",
    tag: "Online Cohort",
    quote:
      "In college they keep throwing theory at us. Nelson just talks about why he did something a certain way. That Kolamavu Kokila breakdown? Beautiful. I'm learning more here than in a full semester.",
    name: "Prasath",
    role: "Mass Comm Student - Chennai",
    avatar: testimonial2,
    thumbnail: testimonial2,
  },
  {
    kind: "text",
    tag: "Forge",
    quote:
      "This masterclass won't give you a shot list - it'll give you sanity. The way it's structured makes you think like a director, not just follow steps.",
    name: "Hari",
    role: "Assistant Director - Hyderabad",
    avatar: testimonial4,
    thumbnail: testimonial4,
  },
  {
    kind: "text",
    tag: "Online Cohort",
    quote:
      "I don't work in films - I lead a product team in tech. But I've always believed storytelling matters everywhere. The way Lokesh builds emotional arcs reminded me of how we build pitch decks. I took notes like I was back in college.",
    name: "Rahul Mehta",
    role: "Product Manager - Mumbai",
    avatar: testimonial5,
    thumbnail: testimonial5,
  },
  {
    kind: "video",
    tag: "Online Cohort",
    quote:
      "The way he breaks down scene transitions changed how I approach editing. Every cut now has intention behind it.",
    name: "Stinson Thomas",
    role: "Film Student - Bangalore",
    avatar: stinsonThumb,
    thumbnail: stinsonThumb,
    duration: "3:12",
    vimeoUrl: "https://player.vimeo.com/video/1162748387?autoplay=1",
  },
  {
    kind: "video",
    tag: "Forge",
    quote:
      "I was stuck for a while and I needed an experience that could teach me everything about filmmaking, and I exactly got that over here at Forge",
    name: "Ashwin",
    role: "Key Account Manager - Chennai",
    avatar: ashwinThumb,
    thumbnail: ashwinThumb,
    duration: "2:48",
    vimeoUrl: ashwinVideo,
  },
];

const StarRow = () => (
  <div className="flex gap-0.5">
    {stars.map((_, index) => (
      <Star key={index} className="h-3.5 w-3.5 fill-primary text-primary" />
    ))}
  </div>
);

const ProgramTag = ({ tag }: { tag: string }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase ${TAG_STYLES[tag]}`} style={{ letterSpacing: 0 }}>
    {tag}
  </span>
);

const VideoModal = ({ url, onClose }: { url: string; onClose: () => void }) => {
  const isMp4 = url.endsWith(".mp4");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-lg border border-white/10 bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white/70 transition-colors hover:text-white"
          aria-label="Close video"
        >
          <X className="h-5 w-5" />
        </button>
        {isMp4 ? (
          <video src={url} className="h-full w-full" controls autoPlay />
        ) : (
          <iframe
            src={url}
            className="h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const activeStory = stories[activeIndex];

  return (
    <section
      id="testimonials"
      aria-label="Student testimonials"
      className="relative scroll-mt-24 overflow-hidden bg-[hsl(22_14%_5%)] py-16 md:py-24"
    >
      <AccentLine />
      {activeVideo && <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,rgba(249,112,21,0.10),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <FadeInSection className="mb-10 grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <div>
            <p className="font-sans-body text-xs font-semibold uppercase text-primary" style={{ letterSpacing: 0 }}>
              Hear from our learners
            </p>
            <h2 className="mt-4 max-w-2xl font-serif-display text-4xl font-semibold text-white sm:text-5xl md:text-6xl" style={{ lineHeight: 1.02, letterSpacing: 0 }}>
              Real stories. Real pressure. Real results.
            </h2>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <StarRow />
              <p className="font-sans-body text-sm text-white/58" style={{ letterSpacing: 0 }}>
                Rated 4.8+ by 15,000+ learners across the globe.
              </p>
            </div>
            <p className="mt-4 max-w-xl font-sans-body text-sm leading-relaxed text-white/52 md:text-base" style={{ letterSpacing: 0 }}>
              The strongest proof is not a statistic. It is what someone says after they have been pushed, reviewed, and changed by the work.
            </p>
          </div>
        </FadeInSection>

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <FadeInSection delay={120}>
            <article className="relative min-h-[620px] overflow-hidden rounded-lg border border-white/10 bg-black">
              <Picture
                key={activeStory.name}
                src={activeStory.thumbnail}
                alt={activeStory.name}
                className="absolute inset-0 h-full w-full object-cover opacity-72 transition-transform duration-700 hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/15" />
              <div className="absolute left-5 top-5 flex flex-wrap gap-2 md:left-7 md:top-7">
                <ProgramTag tag={activeStory.tag} />
                {activeStory.kind === "video" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/15 px-2.5 py-1 text-[10px] font-semibold uppercase text-primary" style={{ letterSpacing: 0 }}>
                    <Play className="h-2.5 w-2.5 fill-current" />
                    Video story
                  </span>
                )}
              </div>

              {activeStory.kind === "video" && activeStory.vimeoUrl && (
                <button
                  type="button"
                  onClick={() => setActiveVideo(activeStory.vimeoUrl || null)}
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label={`Play ${activeStory.name}'s story`}
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur transition-transform duration-300 hover:scale-110">
                    <Play className="ml-1 h-7 w-7 fill-current" />
                  </span>
                </button>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 lg:p-10">
                <Quote className="mb-5 h-8 w-8 text-primary/80" />
                <blockquote className="max-w-3xl font-serif-display text-3xl font-semibold leading-tight text-white md:text-5xl" style={{ letterSpacing: 0 }}>
                  "{activeStory.quote}"
                </blockquote>
                <div className="mt-7 flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full border border-white/20 bg-white/10">
                    <Picture src={activeStory.avatar} alt={activeStory.name} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div>
                    <p className="font-sans-body text-sm font-semibold text-white" style={{ letterSpacing: 0 }}>
                      {activeStory.name}
                    </p>
                    <p className="font-sans-body text-xs text-white/52" style={{ letterSpacing: 0 }}>
                      {activeStory.role}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </FadeInSection>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {stories.map((story, index) => {
              const isActive = activeIndex === index;

              return (
                <FadeInSection key={`${story.name}-${index}`} delay={180 + index * 45}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    aria-pressed={isActive}
                    className={`group flex h-full w-full gap-4 rounded-lg border p-3 text-left transition-all duration-300 ${
                      isActive
                        ? "border-primary/45 bg-primary/10"
                        : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-black">
                      <Picture
                        src={story.thumbnail}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      {story.kind === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Play className="h-4 w-4 fill-white text-white" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <ProgramTag tag={story.tag} />
                        {story.duration && <span className="font-mono text-[10px] text-white/35">{story.duration}</span>}
                      </div>
                      <p className="mt-2 line-clamp-2 font-serif-display text-base leading-snug text-white" style={{ letterSpacing: 0 }}>
                        "{story.quote}"
                      </p>
                      <p className="mt-2 font-sans-body text-xs text-white/45" style={{ letterSpacing: 0 }}>
                        {story.name}
                      </p>
                    </div>
                  </button>
                </FadeInSection>
              );
            })}
          </div>
        </div>

        <FadeInSection delay={420} className="mt-8 flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.025] p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans-body text-sm text-white/55" style={{ letterSpacing: 0 }}>
            Curious what the journey looks like beyond the testimonial?
          </p>
          <a
            href="/student-stories"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 font-sans-body text-sm text-white transition-colors duration-300 hover:border-primary/40 hover:text-primary"
          >
            Read our student stories
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </FadeInSection>
      </div>
    </section>
  );
};

export default TestimonialsSection;
