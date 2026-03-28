import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Play, ArrowRight, X } from "lucide-react";
import FadeInSection from "./FadeInSection";
import AccentLine from "./AccentLine";

/* ─── Data ─── */

const stars = Array.from({ length: 5 });

interface TextTestimonial {
  type: "text";
  tag: "Masterclass" | "Online Cohort" | "Forge" | "The Forge";
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

interface VideoTestimonial {
  type: "video";
  tag: "Masterclass" | "Online Cohort" | "Forge" | "The Forge";
  quote: string;
  name: string;
  role: string;
  avatar: string;
  thumbnail: string;
  duration?: string;
  vimeoUrl?: string;
}

const TAG_STYLES: Record<string, string> = {
  Masterclass:
    "bg-primary/15 text-primary border-primary/25",
  "Online Cohort":
    "bg-teal-500/15 text-teal-400 border-teal-500/25",
  Forge:
    "bg-violet-500/15 text-violet-400 border-violet-500/25",
  "The Forge":
    "bg-violet-500/15 text-violet-400 border-violet-500/25",
};

/* ─── Cards ─── */

const StarRow = () => (
  <div className="flex gap-0.5">
    {stars.map((_, i) => (
      <Star
        key={i}
        className="w-3.5 h-3.5 fill-primary text-primary"
      />
    ))}
  </div>
);

const ProgramTag = ({ tag }: { tag: string }) => (
  <span
    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase border ${TAG_STYLES[tag]}`}
  >
    {tag}
  </span>
);

const TextCard = ({ t }: { t: TextTestimonial }) => (
  <div className="group relative flex flex-col justify-between rounded-xl border border-border/50 bg-card p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_24px_-4px_hsl(24_95%_53%/0.12)] h-full">
    {/* Top row */}
    <div className="flex items-start justify-between gap-3 mb-4">
      <StarRow />
      <ProgramTag tag={t.tag} />
    </div>

    {/* Quote */}
    <blockquote className="font-serif-display text-base md:text-lg text-hero-headline leading-relaxed italic flex-1">
      "{t.quote}"
    </blockquote>

    {/* Author */}
    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border/40">
      <div className="w-9 h-9 rounded-full bg-secondary overflow-hidden shrink-0">
        <img
          src={t.avatar}
          alt={t.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div>
        <p className="font-sans-body text-sm font-medium text-foreground">
          {t.name}
        </p>
        <p className="font-sans-body text-xs text-muted-foreground">
          {t.role}
        </p>
      </div>
    </div>
  </div>
);

const PortraitVideoCard = ({ t, onPlay }: { t: VideoTestimonial; onPlay?: (url: string) => void }) => (
  <div
    className="group relative rounded-xl border border-border/50 overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_24px_-4px_hsl(24_95%_53%/0.12)] h-full min-h-[480px] cursor-pointer"
    onClick={() => t.vimeoUrl && onPlay?.(t.vimeoUrl)}
  >
    {/* Thumbnail */}
    <img
      src={t.thumbnail}
      alt={t.name}
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      loading="lazy"
    />

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

    {/* Badges */}
    <div className="absolute top-4 left-4 flex items-center gap-2">
      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/20 border border-primary/30 text-[10px] font-semibold tracking-wider uppercase text-primary backdrop-blur-sm">
        <Play className="w-2.5 h-2.5 fill-primary" />
        Video Story
      </span>
      <ProgramTag tag={t.tag} />
    </div>

    {t.duration && (
      <span className="absolute top-4 right-4 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] text-foreground/70 font-mono">
        {t.duration}
      </span>
    )}

    {/* Center play */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-14 h-14 rounded-full border-2 border-white/30 bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300">
        <Play className="w-6 h-6 text-white fill-white/80 ml-0.5" />
      </div>
    </div>

    {/* Bottom content */}
    <div className="absolute bottom-0 left-0 right-0 p-5">
      <blockquote className="font-serif-display text-sm md:text-base text-white/90 leading-relaxed italic mb-4">
        "{t.quote}"
      </blockquote>
      <div className="flex items-center gap-2.5">
        <StarRow />
      </div>
      <div className="flex items-center gap-3 mt-3">
        <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden shrink-0 border border-white/20">
          <img
            src={t.avatar}
            alt={t.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <p className="font-sans-body text-sm font-medium text-white">
            {t.name}
          </p>
          <p className="font-sans-body text-[11px] text-white/50">
            {t.role}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const HorizontalVideoCard = ({ t, onPlay }: { t: VideoTestimonial; onPlay?: (url: string) => void }) => (
  <div
    className="group relative flex flex-col sm:flex-row rounded-xl border border-border/50 overflow-hidden bg-card transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_24px_-4px_hsl(24_95%_53%/0.12)] h-full cursor-pointer"
    onClick={() => t.vimeoUrl && onPlay?.(t.vimeoUrl)}
  >
    {/* Thumbnail */}
    <div className="relative w-full sm:w-[200px] shrink-0 aspect-video sm:aspect-auto">
      <img
        src={t.thumbnail}
        alt={t.name}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/30" />
      {/* Play */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <Play className="w-4 h-4 text-white fill-white/80 ml-0.5" />
        </div>
      </div>
      {/* Video badge */}
      <span className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 border border-primary/30 text-[9px] font-semibold tracking-wider uppercase text-primary backdrop-blur-sm">
        <Play className="w-2 h-2 fill-primary" />
        Video Story
      </span>
    </div>

    {/* Content */}
    <div className="flex flex-col justify-between p-5 flex-1">
      <div className="flex items-start justify-between gap-2 mb-2">
        <ProgramTag tag={t.tag} />
        {t.duration && (
          <span className="text-[10px] text-muted-foreground font-mono">
            {t.duration}
          </span>
        )}
      </div>
      <blockquote className="font-serif-display text-sm md:text-base text-hero-headline leading-relaxed italic flex-1 mt-1">
        "{t.quote}"
      </blockquote>
      <div className="flex items-center gap-3 mt-4">
        <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden shrink-0">
          <img
            src={t.avatar}
            alt={t.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <p className="font-sans-body text-xs font-medium text-foreground">
            {t.name}
          </p>
          <p className="font-sans-body text-[11px] text-muted-foreground">
            {t.role}
          </p>
        </div>
      </div>
    </div>
  </div>
);

/* ─── Testimonial Data ─── */

import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import aanchalThumb from "@/assets/aanchal-thumb.jpg";
import stinsonThumb from "@/assets/stinson-thumb.png";

const portraitVideo: VideoTestimonial = {
  type: "video",
  tag: "The Forge",
  quote:
    "Earlier I used to think that films should only educate and they shouldn't be entertaining. Taking your stand is the major learning that I am taking from here. People from various backgrounds, are here",
  name: "Swetha",
  role: "Screenwriting Student · Mumbai",
  avatar: aanchalThumb,
  thumbnail: aanchalThumb,
  duration: "2:34",
};

const textCard1: TextTestimonial = {
  type: "text",
  tag: "Online Cohort",
  quote:
    "In college they keep throwing theory at us. Nelson just talks about why he did something a certain way. That Kolamavu Kokila breakdown? Beautiful. I'm learning more here than in a full semester.",
  name: "Prasath",
  role: "Mass Comm Student · Chennai",
  avatar: testimonial2,
};

const textCard2: TextTestimonial = {
  type: "text",
  tag: "Forge",
  quote:
    "This masterclass won't give you a shot list — it'll give you sanity. The way it's structured makes you think like a director, not just follow steps.",
  name: "Hari",
  role: "Assistant Director · Hyderabad",
  avatar: testimonial4,
};

const horizontalVideo: VideoTestimonial = {
  type: "video",
  tag: "Masterclass",
  quote:
    "This masterclass won't give you a shot list — it'll give you sanity",
  name: "Hari",
  role: "Assistant Director · Hyderabad",
  avatar: testimonial4,
  thumbnail: testimonial2,
  duration: "1:55",
};

const bottomCard1: TextTestimonial = {
  type: "text",
  tag: "Online Cohort",
  quote:
    "I don't work in films — I lead a product team in tech. But I've always believed storytelling matters everywhere. The way Lokesh builds emotional arcs reminded me of how we build pitch decks. I took notes like I was back in college.",
  name: "Rahul Mehta",
  role: "Product Manager · Mumbai",
  avatar: testimonial5,
};

const bottomCard2: TextTestimonial = {
  type: "text",
  tag: "Forge",
  quote:
    "I've worked on sets with ADs screaming and actors confused. But Nelson's vibe? Calm. Direct. When he explains how he gets performances from newcomers, I realised I've been overcomplicating it my entire career.",
  name: "Hari",
  role: "Assistant Director · Hyderabad",
  avatar: testimonial4,
};

const videoRow1: VideoTestimonial = {
  type: "video",
  tag: "Masterclass",
  quote:
    "The way he breaks down scene transitions changed how I approach editing. Every cut now has intention behind it.",
  name: "Amirtha Fazina",
  role: "Film Student · Bangalore",
  avatar: stinsonThumb,
  thumbnail: stinsonThumb,
  duration: "3:12",
  vimeoUrl: "https://player.vimeo.com/video/1162748387?autoplay=1",
};

const videoRow2: VideoTestimonial = {
  type: "video",
  tag: "Online Cohort",
  quote:
    "I joined skeptical, but by week two I had rewritten my entire short film script. The feedback loop is incredible.",
  name: "Karthik",
  role: "Independent Filmmaker · Delhi",
  avatar: testimonial1,
  thumbnail: testimonial1,
  duration: "2:48",
};

/* ─── Main Section ─── */

const VideoModal = ({ url, onClose }: { url: string; onClose: () => void }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      className="relative w-[90vw] max-w-4xl aspect-video rounded-xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>
      <iframe
        src={url}
        className="w-full h-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  </div>
);

const TestimonialsSection = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section
      id="testimonials"
      aria-label="Student testimonials"
      className="relative bg-background py-16 md:py-24 overflow-hidden"
    >
      <AccentLine />

      {/* Video Modal */}
      {activeVideo && <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />}

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 20%, hsl(24 95% 53% / 0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <FadeInSection className="mb-12 md:mb-16">
          <p className="font-sans-body text-[11px] tracking-[0.2em] uppercase text-primary mb-4">
            What Students Say
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-medium text-hero-headline leading-[1.15] tracking-tight max-w-lg">
            Real stories.{" "}
            <em className="not-italic text-gradient-amber">Real results.</em>
          </h2>
          <p className="font-sans-body text-sm text-muted-foreground mt-4 flex items-center gap-2">
            <span className="flex gap-0.5">
              {stars.map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
              ))}
            </span>
            Rated 4.8+ by 2,100+ masterclass students across India
          </p>
        </FadeInSection>

        {/* Main Bento Grid */}
        <FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {/* Left: Portrait video — spans 2 rows */}
            <div className="md:row-span-2">
              <PortraitVideoCard t={portraitVideo} onPlay={setActiveVideo} />
            </div>

            {/* Top-right: two text cards */}
            <TextCard t={textCard1} />
            <TextCard t={textCard2} />

            {/* Bottom-right: horizontal video — spans 2 cols */}
            <div className="md:col-span-2">
              <HorizontalVideoCard t={horizontalVideo} onPlay={setActiveVideo} />
            </div>
          </div>
        </FadeInSection>

        {/* Bottom Row */}
        <FadeInSection className="mt-4 md:mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <TextCard t={bottomCard1} />
            <TextCard t={bottomCard2} />
          </div>
        </FadeInSection>

        {/* Video Row */}
        <FadeInSection className="mt-4 md:mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <HorizontalVideoCard t={videoRow1} onPlay={setActiveVideo} />
            <HorizontalVideoCard t={videoRow2} onPlay={setActiveVideo} />
          </div>
        </FadeInSection>

        {/* CTA */}
        <FadeInSection className="mt-10 md:mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="font-sans-body text-sm text-muted-foreground">
            Curious what the journey looks like?
          </p>
          <Link
            to="/student-stories"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-sans-body text-foreground hover:border-primary/40 hover:text-primary transition-colors duration-300"
          >
            Read our student stories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeInSection>
      </div>
    </section>
  );
};

export default TestimonialsSection;
