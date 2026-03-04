import { useState, useEffect, useMemo } from "react";
import { Star, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import FadeInSection from "@/components/FadeInSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import * as XLSX from "xlsx";

/* ─── Types ─── */

type ReviewProgram =
  | "All"
  | "Screenwriting"
  | "Filmmaking"
  | "Video Editing"
  | "BFP"
  | "The Forge"
  | "Photography"
  | "Cinematography"
  | "Community"
  | "Other";

const REVIEW_PROGRAMS: ReviewProgram[] = [
  "All",
  "Screenwriting",
  "Filmmaking",
  "Video Editing",
  "BFP",
  "The Forge",
  "Photography",
  "Cinematography",
  "Community",
  "Other",
];

interface Review {
  name: string;
  role: string;
  program: ReviewProgram;
  rating: number; // out of 5
  text: string;
}

/* ─── Program mapping ─── */

const PROGRAM_MAP: Record<string, ReviewProgram> = {
  "LevelUp Screenwriting": "Screenwriting",
  "LevelUp Filmmaking": "Filmmaking",
  "LevelUp Photography": "Photography",
  "LevelUp Video Editing": "Video Editing",
  "LevelUp BFP": "BFP",
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

/* ─── xlsx loader ─── */

async function loadReviews(): Promise<Review[]> {
  const response = await fetch("/data/reviews.xlsx");
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  // Find the header row (contains "Program")
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
const CANONICAL_URL = "https://levelupnewsite.lovable.app/reviews";

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

    // JSON-LD structured data - only first 50 for perf
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
            url: "https://levelupnewsite.lovable.app",
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
  "bg-primary/20 text-primary",
  "bg-blue-500/20 text-blue-400",
  "bg-emerald-500/20 text-emerald-400",
  "bg-violet-500/20 text-violet-400",
  "bg-rose-500/20 text-rose-400",
  "bg-amber-500/20 text-amber-400",
  "bg-cyan-500/20 text-cyan-400",
  "bg-fuchsia-500/20 text-fuchsia-400",
];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

/* ─── Review Card ─── */

const ReviewCard = ({ review }: { review: Review }) => {
  const [expanded, setExpanded] = useState(false);
  const needsTruncation = review.text.length > 200;

  return (
    <article className="break-inside-avoid mb-5 rounded-sm border border-border/50 bg-card p-5 md:p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_20px_2px_hsl(24_95%_53%/0.12)]">
      {/* Header: avatar + name */}
      <figure className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-border font-sans-body text-xs font-semibold ${getAvatarColor(review.name)}`}
        >
          {getInitials(review.name)}
        </div>
        <figcaption>
          <p className="font-serif-display text-sm font-medium text-hero-headline leading-tight">
            {review.name}
          </p>
          {review.role && (
            <p className="font-sans-body text-[11px] text-muted-foreground">{review.role}</p>
          )}
        </figcaption>
      </figure>

      {/* Program tag + rating */}
      <div className="flex items-center justify-between mb-3">
        <span className="inline-block px-2.5 py-1 rounded-sm bg-primary/10 text-primary font-sans-body text-[10px] tracking-wider uppercase">
          {review.program}
        </span>
        <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.floor(review.rating) ? "fill-primary text-primary" : i < review.rating ? "fill-primary/50 text-primary" : "text-border"}`}
            />
          ))}
        </div>
      </div>

      {/* Review text — always in DOM for SEO */}
      <blockquote cite="LevelUp Learning">
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
          className="mt-2 inline-flex items-center gap-1 font-sans-body text-xs text-primary hover:text-primary/80 transition-colors"
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
  <div className="break-inside-avoid mb-5 rounded-sm border border-border/50 bg-card p-5 md:p-6 animate-pulse">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-secondary" />
      <div className="space-y-1.5">
        <div className="h-3 w-24 bg-secondary rounded" />
        <div className="h-2.5 w-16 bg-secondary rounded" />
      </div>
    </div>
    <div className="flex items-center justify-between mb-3">
      <div className="h-5 w-20 bg-secondary rounded" />
      <div className="h-3.5 w-16 bg-secondary rounded" />
    </div>
    <div className="space-y-2">
      <div className="h-3 w-full bg-secondary rounded" />
      <div className="h-3 w-4/5 bg-secondary rounded" />
      <div className="h-3 w-3/5 bg-secondary rounded" />
    </div>
  </div>
);

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
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load reviews:", err);
        setLoading(false);
      });
  }, []);

  // Reset visible count when filter changes
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

  // Count per program for badges
  const programCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    reviews.forEach((r) => {
      counts[r.program] = (counts[r.program] || 0) + 1;
    });
    return counts;
  }, [reviews]);

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-background pt-20">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 30% at 50% 10%, hsl(24 95% 53% / 0.04) 0%, transparent 70%)",
          }}
        />

        {/* ─── Hero ─── */}
        <section className="relative max-w-5xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-8 md:pb-12 text-center">
          <FadeInSection>
            <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-medium text-hero-headline leading-[1.1] tracking-tight mb-4">
              Wall of Love
            </h1>
            <p className="font-sans-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              Real reviews from creators who transformed their careers through our filmmaking masterclasses, video editing bootcamps, screenwriting programs, and creative cohorts. No scripts — just honest creative growth.
            </p>
          </FadeInSection>

          {/* Rating badges */}
          <FadeInSection delay={150}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-sm border border-border bg-card">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="font-sans-body text-sm text-hero-headline font-medium">4.9/5</span>
                <span className="font-sans-body text-xs text-muted-foreground">
                  from {reviews.length || "500"}+ creators
                </span>
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* ─── Sticky Filter Bar ─── */}
        <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-b border-border/50">
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
                    className={`shrink-0 px-4 py-2 rounded-sm font-sans-body text-sm transition-all duration-300 ${
                      activeFilter === program
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {program}
                    {!loading && (
                      <span className="ml-1.5 text-[10px] opacity-60">({count})</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Reviews Grid (Masonry) ─── */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <h2 className="sr-only">Student Reviews</h2>

          {loading ? (
            <div className="columns-1 md:columns-2 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="columns-1 md:columns-2 gap-5">
                {visible.map((review, i) => (
                  <FadeInSection key={`${review.name}-${i}`} delay={Math.min(i * 40, 400)}>
                    <ReviewCard review={review} />
                  </FadeInSection>
                ))}
              </div>

              {hasMore && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-border bg-card font-sans-body text-sm text-foreground hover:bg-secondary transition-colors"
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

        {/* ─── CTA Section ─── */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <FadeInSection>
            <div className="text-center border border-border/50 rounded-sm bg-card p-10 md:p-14">
              <h2 className="font-serif-display text-2xl md:text-3xl text-hero-headline mb-3">
                Ready to start your journey?
              </h2>
              <p className="font-sans-body text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                Join {reviews.length || "500"}+ creators who chose to invest in their craft with
                LevelUp Learning.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-primary text-primary-foreground font-sans-body text-sm font-medium hover:bg-primary/90 transition-colors cta-glow"
              >
                Explore Programs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeInSection>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Reviews;
