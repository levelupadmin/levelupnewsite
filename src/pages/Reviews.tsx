import { useState, useEffect, useMemo, useCallback } from "react";
import { Star, ArrowRight, ChevronDown, Quote, ArrowUp } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import FadeInSection from "@/components/FadeInSection";
import AccentLine from "@/components/AccentLine";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoryCard from "@/components/stories/StoryCard";
import { studentStories, getReadingTime } from "@/data/studentStories";

const STORY_PROGRAMS = ["All", "Filmmaking", "Screenwriting", "The Forge", "Breakthrough Filmmaker Program", "Photography"] as const;
import * as XLSX from "xlsx";

/* ─── Types ─── */

type ReviewProgram =
  | "All"
  | "Screenwriting"
  | "Filmmaking"
  | "Video Editing"
  | "Breakthrough Filmmaker Program"
  | "The Forge"
  | "Photography"
  | "Cinematography"
  | "Community"
  | "Other";

const REVIEW_PROGRAMS: ReviewProgram[] = [
  "All",
  "Breakthrough Filmmaker Program",
  "Video Editing",
  "The Forge",
  "Screenwriting",
  "Filmmaking",
  "Photography",
  "Cinematography",
  "Community",
  "Other",
];

interface Review {
  name: string;
  role: string;
  program: ReviewProgram;
  rating: number;
  text: string;
}

/* ─── Program mapping ─── */

const PROGRAM_MAP: Record<string, ReviewProgram> = {
  "LevelUp Screenwriting": "Screenwriting",
  "LevelUp Filmmaking": "Filmmaking",
  "LevelUp Photography": "Photography",
  "LevelUp Video Editing": "Video Editing",
  "LevelUp BFP": "Breakthrough Filmmaker Program",
  "LevelUp Cinematography": "Cinematography",
  "Forge Writing": "The Forge",
  "Forge Filmmaking": "The Forge",
  "Forge Creators": "The Forge",
  "Forge Other": "The Forge",
  "LU Community": "Community",
  "Other Programs": "Other",
};

function mapProgram(raw: string): ReviewProgram {
  return PROGRAM_MAP[raw] || "Other";
}

/* ─── Program accent colors ─── */

const PROGRAM_BORDER_COLORS: Record<string, string> = {
  Screenwriting: "border-l-amber-500",
  Filmmaking: "border-l-rose-500",
  "Video Editing": "border-l-violet-500",
  "Breakthrough Filmmaker Program": "border-l-blue-500",
  "The Forge": "border-l-emerald-500",
  Photography: "border-l-cyan-500",
  Cinematography: "border-l-fuchsia-500",
  Community: "border-l-orange-500",
  Other: "border-l-gray-400",
};

const PROGRAM_DOT_COLORS: Record<string, string> = {
  Screenwriting: "bg-amber-500",
  Filmmaking: "bg-rose-500",
  "Video Editing": "bg-violet-500",
  "Breakthrough Filmmaker Program": "bg-blue-500",
  "The Forge": "bg-emerald-500",
  Photography: "bg-cyan-500",
  Cinematography: "bg-fuchsia-500",
  Community: "bg-orange-500",
  Other: "bg-gray-400",
};

/* PROGRAM_TINT_COLORS removed — dark theme uses card bg with border accents */

/* ─── xlsx loader ─── */

async function loadReviews(): Promise<Review[]> {
  const response = await fetch("/data/reviews.xlsx");
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  let headerIndex = -1;
  for (let i = 0; i < Math.min(rows.length, 10); i++) {
    const row = rows[i];
    if (row && row.some((cell: any) => String(cell).includes("Program"))) {
      headerIndex = i;
      break;
    }
  }

  if (headerIndex === -1) return [];

  const dataRows = rows.slice(headerIndex + 1);

  return dataRows
    .filter((row) => {
      const hasProgram = row[1] && String(row[1]).trim().length > 0;
      const hasText = row[5] && String(row[5]).trim().length > 0;
      return hasProgram && hasText;
    })
    .map((row) => {
      const rawProgram = String(row[1] || "").trim();
      const name = String(row[2] || "").trim();
      const role = String(row[3] || "").trim();
      const ratingRaw = Number(row[4]) || 10;
      const text = String(row[5] || "").replace(/<br\s*\/?>/g, "\n").trim();

      return {
        name,
        role,
        program: mapProgram(rawProgram),
        rating: Math.round((ratingRaw / 2) * 2) / 2,
        text,
      };
    });
}

/* ─── SEO Head Management ─── */

const PAGE_TITLE = "Student Reviews & Testimonials | LevelUp Learning";
const PAGE_DESCRIPTION =
  "Read honest reviews from 500+ creators who transformed their careers through LevelUp Learning's filmmaking, video editing, screenwriting, and UI/UX programs. Real stories, real creative growth.";
import { SITE_URL } from "@/lib/constants";
const CANONICAL_URL = `${SITE_URL}/student-stories`;

function usePageSEO(reviews: Review[]) {
  useEffect(() => {
    document.title = PAGE_TITLE;

    const metaTags: Record<string, string> = {
      description: PAGE_DESCRIPTION,
      "og:title": PAGE_TITLE,
      "og:description": PAGE_DESCRIPTION,
      "og:type": "website",
      "og:url": CANONICAL_URL,
      "twitter:card": "summary_large_image",
      "twitter:title": PAGE_TITLE,
      "twitter:description": PAGE_DESCRIPTION,
    };

    const createdTags: HTMLElement[] = [];

    Object.entries(metaTags).forEach(([key, content]) => {
      const attr = key.startsWith("og:") || key.startsWith("twitter:") ? "property" : "name";
      let tag = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
        createdTags.push(tag);
      }
      tag.setAttribute("content", content);
    });

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const createdCanonical = !canonical;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", CANONICAL_URL);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "LevelUp Learning Student Reviews",
      description: PAGE_DESCRIPTION,
      numberOfItems: reviews.length,
      itemListElement: reviews.slice(0, 50).map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Review",
          author: { "@type": "Person", name: t.name },
          reviewBody: t.text.slice(0, 300),
          reviewRating: {
            "@type": "Rating",
            ratingValue: t.rating,
            bestRating: 5,
          },
          itemReviewed: {
            "@type": "EducationalOrganization",
            name: "LevelUp Learning",
            url: SITE_URL,
          },
        },
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      createdTags.forEach((tag) => tag.remove());
      if (createdCanonical && canonical) canonical.remove();
      script.remove();
    };
  }, [reviews]);
}

/* ─── Initials Avatar ─── */

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const AVATAR_COLORS = [
  "bg-orange-100 text-orange-700",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-violet-100 text-violet-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
  "bg-cyan-100 text-cyan-700",
  "bg-fuchsia-100 text-fuchsia-700",
];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

/* ─── Marquee Pull-Quotes ─── */

const MARQUEE_QUOTES = [
  "This program completely changed my perspective on storytelling",
  "Best investment I've ever made in my creative career",
  "The mentors genuinely care about your growth as an artist",
  "I went from amateur to confident filmmaker in 8 weeks",
  "The community alone is worth every penny — incredible people",
  "Finally learned the craft properly after years of self-teaching",
  "Got my first paid gig within a month of completing the program",
  "The live feedback sessions were absolute game-changers",
  "I never thought I could write a screenplay — now I've written three",
  "More practical and hands-on than any film school I've seen",
  "The editing techniques I learned here tripled my freelance rate",
  "Incredible depth of knowledge packed into every session",
];

const MarqueeStrip = () => {
  const row1 = MARQUEE_QUOTES.slice(0, 6);
  const row2 = MARQUEE_QUOTES.slice(6, 12);

  const renderQuotes = (quotes: string[]) =>
    [...quotes, ...quotes].map((q, i) => (
      <span
        key={i}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50 font-sans-body text-xs text-muted-foreground whitespace-nowrap shadow-sm"
      >
        <Quote className="w-3 h-3 text-primary/40 shrink-0" />
        {q}
      </span>
    ));

  return (
    <div className="w-full space-y-3 mt-8">
      <div className="reviews-marquee-container">
        <div className="reviews-marquee-track reviews-marquee-left">
          {renderQuotes(row1)}
        </div>
      </div>
      <div className="reviews-marquee-container">
        <div className="reviews-marquee-track reviews-marquee-right">
          {renderQuotes(row2)}
        </div>
      </div>
    </div>
  );
};

/* ─── Stats Banner ─── */

const StatsBanner = ({ reviewCount }: { reviewCount: number }) => (
  <FadeInSection>
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-8">
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-0 md:divide-x md:divide-border">
        {[
          { target: reviewCount || 500, suffix: "+", label: "Reviews", hasComma: true },
          { target: 4.9, suffix: "", label: "Avg Rating", decimals: 1 },
          { target: 10, suffix: "+", label: "Programs" },
        ].map((stat, i) => (
          <div key={stat.label} className="flex flex-col items-center px-6 md:px-10">
            <span className="font-serif-display text-3xl md:text-4xl text-hero-headline font-semibold tabular-nums">
              <AnimatedCounter
                target={stat.target}
                suffix={stat.suffix}
                hasComma={stat.hasComma}
                decimals={stat.decimals}
                delay={i * 150}
                celebrate
              />
            </span>
            <span className="font-sans-body text-xs text-muted-foreground mt-1 uppercase tracking-wider">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </FadeInSection>
);

/* ─── Featured Review Card (Vertical Editorial) ─── */

const FeaturedReviewCard = ({ review, index }: { review: Review; index: number }) => {
  const borderColor = PROGRAM_BORDER_COLORS[review.program] || "border-l-gray-400";
  const dotColor = PROGRAM_DOT_COLORS[review.program] || "bg-gray-400";

  return (
    <m.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-2xl bg-card p-8 md:p-10 border border-border/50 border-l-[3px] ${borderColor} shadow-sm hover:shadow-md transition-all duration-300`}
    >
      {/* Opening quote */}
      <span className="block font-serif text-6xl leading-none text-primary/20 mb-3 select-none" style={{ fontStyle: 'italic' }}>"</span>

      <blockquote className="relative z-10">
        <p className="font-sans-body text-sm md:text-base text-foreground/80 leading-relaxed whitespace-pre-line">
          {review.text}
        </p>
      </blockquote>

      <div className="flex items-center gap-3 mt-6 pt-5 border-t border-border/20">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-sans-body text-xs font-semibold ${getAvatarColor(review.name)}`}
        >
          {getInitials(review.name)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-serif-display text-sm font-medium text-foreground truncate">
            {review.name}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
            <span className="font-sans-body text-[10px] text-muted-foreground uppercase tracking-wider">
              {review.program}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          ))}
        </div>
      </div>
    </m.article>
  );
};

/* ─── Review Card ─── */

const ReviewCard = ({ review }: { review: Review }) => {
  const [expanded, setExpanded] = useState(false);
  const needsTruncation = review.text.length > 200;
  const borderColor = PROGRAM_BORDER_COLORS[review.program] || "border-l-gray-400";
  const dotColor = PROGRAM_DOT_COLORS[review.program] || "bg-gray-400";

  return (
    <article
      className={`relative break-inside-avoid mb-5 rounded-xl border border-border/50 bg-card p-5 md:p-6 border-l-[3px] ${borderColor} shadow-sm hover:shadow-md transition-all duration-300`}
    >
      {/* Header: avatar + name */}
      <figure className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-sans-body text-xs font-semibold ${getAvatarColor(review.name)}`}
        >
          {getInitials(review.name)}
        </div>
        <figcaption>
          <p className="font-serif-display text-sm font-medium text-foreground leading-tight">
            {review.name}
          </p>
          {review.role && (
            <p className="font-sans-body text-[11px] text-muted-foreground">{review.role}</p>
          )}
        </figcaption>
      </figure>

      {/* Program tag + rating */}
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-sans-body text-[10px] tracking-wider uppercase font-medium">
          <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
          {review.program}
        </span>
        <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.floor(review.rating) ? "fill-amber-500 text-amber-500" : i < review.rating ? "fill-amber-500/50 text-amber-500" : "text-border"}`}
            />
          ))}
        </div>
      </div>

      {/* Review text */}
      <blockquote>
        <div
          className={`overflow-hidden transition-all duration-500 ${expanded ? "max-h-[5000px]" : "max-h-[6rem]"}`}
        >
          <p className="font-sans-body text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {review.text}
          </p>
        </div>
      </blockquote>

      {needsTruncation && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 inline-flex items-center gap-1 font-sans-body text-xs text-primary font-medium hover:text-primary/80 transition-colors"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Read more"}
          <ChevronDown
            className={`w-3 h-3 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </article>
  );
};

/* ─── Loading Skeleton ─── */

const SkeletonCard = () => (
  <div className="break-inside-avoid mb-5 rounded-xl border border-border/50 bg-card p-5 md:p-6 animate-pulse">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-muted" />
      <div className="space-y-1.5">
        <div className="h-3 w-24 bg-muted rounded" />
        <div className="h-2.5 w-16 bg-muted rounded" />
      </div>
    </div>
    <div className="flex items-center justify-between mb-3">
      <div className="h-5 w-20 bg-muted rounded-full" />
      <div className="h-3.5 w-16 bg-muted rounded" />
    </div>
    <div className="space-y-2">
      <div className="h-3 w-full bg-muted rounded" />
      <div className="h-3 w-4/5 bg-muted rounded" />
      <div className="h-3 w-3/5 bg-muted rounded" />
    </div>
  </div>
);

/* ─── Scroll to Top Button ─── */

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 flex items-center justify-center hover:bg-primary/90 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </m.button>
      )}
    </AnimatePresence>
  );
};

/* ─── Student Stories Section (Medium-style) ─── */

const StudentStoriesSection = () => {
  const [storyFilter, setStoryFilter] = useState<string>("All");

  const filteredStories = useMemo(
    () => storyFilter === "All" ? studentStories : studentStories.filter(s => s.program === storyFilter),
    [storyFilter]
  );

  const [heroStory, ...restStories] = filteredStories;

  return (
    <section className="relative max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
      {/* Editorial header */}
      <FadeInSection>
        <div className="text-center mb-12">
          <div className="h-px w-16 bg-foreground/20 mx-auto mb-6" />
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-medium text-foreground tracking-tight mb-3" style={{ fontStyle: 'italic' }}>
            Student Stories
          </h2>
          <p className="font-sans-body text-sm md:text-base text-muted-foreground max-w-md mx-auto">
            Long-form journeys worth reading
          </p>
          <div className="h-px w-16 bg-foreground/20 mx-auto mt-6" />
        </div>
      </FadeInSection>

      {/* Underline-style tabs */}
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide mb-12 border-b border-border/40 pb-px md:justify-center">
        {STORY_PROGRAMS.map(p => (
          <button
            key={p}
            onClick={() => setStoryFilter(p)}
            className={`relative shrink-0 px-4 py-2.5 font-sans-body text-sm whitespace-nowrap transition-colors duration-200 ${
              storyFilter === p
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {p}
            {storyFilter === p && (
              <m.div
                layoutId="storyTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Featured / hero story */}
      {heroStory && (
        <FadeInSection className="mb-0">
          <Link
            to={`/student-stories/${heroStory.slug}`}
            className="group block py-8 border-b border-border/30"
          >
            <span className="inline-block font-sans-body text-[10px] font-semibold uppercase tracking-widest text-primary mb-3">
              {heroStory.program}
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-medium text-foreground leading-snug mb-3 group-hover:text-primary transition-colors">
              {heroStory.h1}
            </h3>
            <p className="font-sans-body text-base text-muted-foreground leading-relaxed mb-4 line-clamp-3 max-w-2xl">
              {heroStory.sections[0]?.body.slice(0, 280)}…
            </p>
            <div className="flex items-center gap-2 font-sans-body text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{heroStory.authorName}</span>
              <span>·</span>
              <span>{heroStory.program}</span>
              <span>·</span>
              <span>{getReadingTime(heroStory)} min read</span>
            </div>
          </Link>
        </FadeInSection>
      )}

      {/* Vertical list of remaining stories */}
      {restStories.map((story, i) => (
        <FadeInSection key={story.slug} delay={i * 60}>
          <Link
            to={`/student-stories/${story.slug}`}
            className="group block py-7 border-b border-border/30"
          >
            <h3 className="font-serif-display text-lg sm:text-xl md:text-2xl font-medium text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
              {story.h1}
            </h3>
            <p className="font-sans-body text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2 max-w-2xl">
              {story.sections[0]?.body.slice(0, 180)}…
            </p>
            <div className="flex items-center gap-2 font-sans-body text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{story.authorName}</span>
              <span>·</span>
              <span>{story.program}</span>
              <span>·</span>
              <span>{getReadingTime(story)} min read</span>
            </div>
          </Link>
        </FadeInSection>
      ))}

      {filteredStories.length === 0 && (
        <p className="text-center text-muted-foreground font-sans-body py-20">No stories for this program yet.</p>
      )}
    </section>
  );
};

/* ─── Main Page ─── */

const ITEMS_PER_PAGE = 30;

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<ReviewProgram>("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  usePageSEO(reviews);

  useEffect(() => {
    loadReviews()
      .then((data) => {
        for (let i = data.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [data[i], data[j]] = [data[j], data[i]];
        }
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load reviews:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeFilter]);

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? reviews
        : reviews.filter((t) => t.program === activeFilter),
    [activeFilter, reviews]
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const programCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    reviews.forEach((r) => {
      counts[r.program] = (counts[r.program] || 0) + 1;
    });
    return counts;
  }, [reviews]);

  // Featured: 3 random 5-star reviews with longest text
  const featuredReviews = useMemo(() => {
    const fiveStars = reviews
      .filter((r) => r.rating >= 5 && r.text.length > 300)
      .sort((a, b) => b.text.length - a.text.length);
    // Pick 3 from top 10 longest, shuffled
    const pool = fiveStars.slice(0, 10);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, 3);
  }, [reviews]);

  // Unique programs count
  const uniquePrograms = useMemo(
    () => Object.keys(programCounts).length,
    [programCounts]
  );

  return (
    <div className="theme-reviews">
      <Navbar />
      <main className="relative min-h-screen bg-background pt-20">
        {/* Warm editorial ambient glow */}
        <div className="reviews-editorial-glow" aria-hidden="true" />

        {/* ─── Hero ─── */}
        <section className="relative max-w-5xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-4 md:pb-6 text-center">
          {/* Decorative watermark quotes */}
          <div className="absolute inset-0 flex items-start justify-center pointer-events-none overflow-hidden" aria-hidden="true">
            <Quote className="w-48 h-48 md:w-64 md:h-64 text-primary/[0.04] -mt-4 rotate-180" strokeWidth={1} />
          </div>

          <FadeInSection>
            <h1 className="relative font-serif-display text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight mb-4">
              <span className="text-gradient-amber">Wall of Love</span>
            </h1>
            <p className="font-sans-body text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Real reviews from creators who transformed their careers through our programs. No scripts — just honest creative growth.
            </p>
          </FadeInSection>

          {/* Marquee pull-quotes */}
          <MarqueeStrip />
        </section>

        {/* ─── Animated Stats Banner ─── */}
        <StatsBanner reviewCount={reviews.length} />

        {/* ─── Featured Reviews ─── */}
        {!loading && featuredReviews.length >= 3 && (
          <section className="max-w-5xl mx-auto px-6 md:px-12 pb-8">
            <FadeInSection>
              <p className="font-sans-body text-xs text-muted-foreground uppercase tracking-widest text-center mb-6">
                Featured Reviews
              </p>
            </FadeInSection>
            <div className="flex flex-col gap-6">
              {featuredReviews.map((review, i) => (
                <FeaturedReviewCard key={`featured-${review.name}-${i}`} review={review} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* ─── Sticky Filter Bar ─── */}
        <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border/40">
          <div className="max-w-5xl mx-auto px-6 md:px-12 py-3">
            <div
              role="tablist"
              aria-label="Filter reviews by program"
              className="flex items-center gap-2 overflow-x-auto scrollbar-hide"
            >
              {REVIEW_PROGRAMS.map((program) => {
                const count =
                  program === "All" ? reviews.length : programCounts[program] || 0;
                return (
                  <button
                    key={program}
                    role="tab"
                    aria-selected={activeFilter === program}
                    onClick={() => setActiveFilter(program)}
                    className={`shrink-0 px-4 py-2 rounded-full font-sans-body text-sm font-medium transition-all duration-300 ${
                      activeFilter === program
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {program}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Reviews Grid (Masonry) with Waterfall + Spotlight ─── */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <h2 className="sr-only">Student Reviews</h2>

          {loading ? (
            <div className="columns-1 md:columns-2 xl:columns-3 gap-5">
              {Array.from({ length: 9 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="columns-1 md:columns-2 xl:columns-3 gap-5 reviews-grid-spotlight">
                {visible.map((review, i) => (
                  <div
                    key={`${review.name}-${i}`}
                  >
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card font-sans-body text-sm text-foreground hover:bg-muted transition-colors shadow-sm"
                  >
                    Show more reviews
                    <span className="text-[11px] text-muted-foreground">
                      ({filtered.length - visibleCount} remaining)
                    </span>
                  </button>
                </div>
              )}

              {filtered.length === 0 && (
                <p className="text-center text-muted-foreground font-sans-body py-20">
                  No reviews found for this program yet.
                </p>
              )}
            </>
          )}
        </section>

        {/* ═══ Visual Break ═══ */}
        <div className="relative py-10 md:py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-muted/50" />
          <div className="relative max-w-xl mx-auto px-6">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </div>

        {/* ─── Student Stories Section (Medium-style) ─── */}
        <div className="relative bg-muted/30">
          <StudentStoriesSection />
        </div>

        {/* ─── CTA Section ─── */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <FadeInSection>
            <div className="text-center rounded-2xl bg-gradient-to-br from-primary to-amber-600 p-10 md:p-14 shadow-xl shadow-primary/10">
              <h2 className="font-serif-display text-2xl md:text-3xl text-white mb-3">
                Ready to start your journey?
              </h2>
              <p className="font-sans-body text-sm text-white/80 mb-6 max-w-md mx-auto">
                Join {reviews.length || "500"}+ creators who chose to invest in their craft with
                LevelUp Learning.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary font-sans-body text-sm font-semibold hover:bg-white/90 transition-colors shadow-md"
              >
                Explore Programs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeInSection>
        </section>
      </main>

      {/* Scroll to top button */}
      <ScrollToTopButton />

      <Footer />
    </div>
  );
};

export default Reviews;
