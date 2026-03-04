import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin, Quote, Star } from "lucide-react";
import { m } from "framer-motion";
import type { StudentStory } from "@/data/studentStories";
import { getReadingTime } from "@/data/studentStories";

const PROGRAM_ACCENT: Record<string, { badge: string; bar: string; glow: string }> = {
  Filmmaking: {
    badge: "bg-rose-500/10 text-rose-700 border-rose-200",
    bar: "from-rose-400 to-rose-600",
    glow: "group-hover:shadow-rose-500/15",
  },
  Screenwriting: {
    badge: "bg-amber-500/10 text-amber-700 border-amber-200",
    bar: "from-amber-400 to-amber-600",
    glow: "group-hover:shadow-amber-500/15",
  },
  "The Forge": {
    badge: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    bar: "from-emerald-400 to-emerald-600",
    glow: "group-hover:shadow-emerald-500/15",
  },
  "Breakthrough Filmmaker Program": {
    badge: "bg-blue-500/10 text-blue-700 border-blue-200",
    bar: "from-blue-400 to-blue-600",
    glow: "group-hover:shadow-blue-500/15",
  },
  Photography: {
    badge: "bg-cyan-500/10 text-cyan-700 border-cyan-200",
    bar: "from-cyan-400 to-cyan-600",
    glow: "group-hover:shadow-cyan-500/15",
  },
};

const DEFAULT_ACCENT = {
  badge: "bg-muted text-muted-foreground border-border",
  bar: "from-primary to-primary",
  glow: "group-hover:shadow-primary/15",
};

function RatingStars({ rating }: { rating: number }) {
  // rating is out of 10, show as x/10 with stars
  const stars = Math.round(rating / 2);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < stars ? "text-amber-500 fill-amber-500" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
}

export default function StoryCard({ story, index = 0 }: { story: StudentStory; index?: number }) {
  const accent = PROGRAM_ACCENT[story.program] || DEFAULT_ACCENT;
  const readTime = getReadingTime(story);
  const excerpt = story.sections[0]?.body.slice(0, 140) + "…";

  return (
    <m.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/student-stories/${story.slug}`}
        className={`group relative block overflow-hidden rounded-2xl border border-border/50 bg-card p-7 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/20 ${accent.glow}`}
      >
        {/* Program-colored top accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent.bar}`} />

        {/* Decorative quote icon */}
        <Quote
          className="absolute top-5 right-5 w-10 h-10 text-muted-foreground/[0.06] rotate-180"
          strokeWidth={1}
          aria-hidden="true"
        />

        {/* Program badge + reading time */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${accent.badge}`}>
            {story.program}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground font-sans-body">
            <Clock className="w-3 h-3" />
            {readTime} min read
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif-display text-base md:text-lg font-medium text-foreground leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {story.h1}
        </h3>

        {/* Excerpt */}
        <p className="font-sans-body text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Rating */}
        <div className="mb-4">
          <RatingStars rating={story.rating} />
        </div>

        {/* Author + location */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-sans-body text-xs font-medium text-foreground">{story.authorName}</p>
            <p className="font-sans-body text-[10px] text-muted-foreground">{story.authorRole}</p>
          </div>
          <div className="flex items-center gap-3">
            {story.location && (
              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {story.location}
              </span>
            )}
            <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </Link>
    </m.article>
  );
}
