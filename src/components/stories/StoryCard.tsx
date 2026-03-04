import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { m } from "framer-motion";
import type { StudentStory } from "@/data/studentStories";
import { getReadingTime } from "@/data/studentStories";

const PROGRAM_ACCENT: Record<string, string> = {
  Filmmaking: "bg-rose-500/10 text-rose-700 border-rose-200",
  Screenwriting: "bg-amber-500/10 text-amber-700 border-amber-200",
  "The Forge": "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  "Breakthrough Filmmaker Program": "bg-blue-500/10 text-blue-700 border-blue-200",
  Photography: "bg-cyan-500/10 text-cyan-700 border-cyan-200",
};

export default function StoryCard({ story, index = 0 }: { story: StudentStory; index?: number }) {
  const accent = PROGRAM_ACCENT[story.program] || "bg-muted text-muted-foreground border-border";
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
        className="group block rounded-2xl border border-border/50 bg-card p-6 md:p-7 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20"
      >
        {/* Program badge + reading time */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${accent}`}>
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
