import { useState, useEffect, useMemo } from "react";
import { Star, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { testimonials, PROGRAMS, type Program, type Testimonial } from "@/data/testimonials";
import FadeInSection from "@/components/FadeInSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── SEO Head Management ─── */

const PAGE_TITLE = "Student Reviews & Testimonials | LevelUp Learning";
const PAGE_DESCRIPTION =
  "Read honest reviews from 500+ creators who transformed their careers through LevelUp Learning's filmmaking, video editing, screenwriting, and UI/UX programs. Real stories, real creative growth.";
const CANONICAL_URL = "https://levelupnewsite.lovable.app/reviews";

function usePageSEO() {
  useEffect(() => {
    // Title
    document.title = PAGE_TITLE;

    // Meta tags
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

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const createdCanonical = !canonical;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", CANONICAL_URL);

    // JSON-LD structured data
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "LevelUp Learning Student Reviews",
      description: PAGE_DESCRIPTION,
      itemListElement: testimonials.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Review",
          author: { "@type": "Person", name: t.name },
          reviewBody: t.fullStory,
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
  }, []);
}

/* ─── Review Card ─── */

const ReviewCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const [expanded, setExpanded] = useState(false);
  const shortText = testimonial.fullStory.slice(0, 180);
  const needsTruncation = testimonial.fullStory.length > 180;

  return (
    <article className="break-inside-avoid mb-5 rounded-sm border border-border/50 bg-card p-5 md:p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_20px_2px_hsl(24_95%_53%/0.12)]">
      {/* Header: avatar + name */}
      <figure className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-border">
          <img
            src={testimonial.image}
            alt={`${testimonial.name}, ${testimonial.program} student at LevelUp Learning`}
            className="w-full h-full object-cover"
            loading="lazy"
            width={40}
            height={40}
          />
        </div>
        <figcaption>
          <p className="font-serif-display text-sm font-medium text-hero-headline leading-tight">
            {testimonial.name}
          </p>
          <p className="font-sans-body text-[11px] text-muted-foreground">{testimonial.role}</p>
        </figcaption>
      </figure>

      {/* Program tag + rating */}
      <div className="flex items-center justify-between mb-3">
        <span className="inline-block px-2.5 py-1 rounded-sm bg-primary/10 text-primary font-sans-body text-[10px] tracking-wider uppercase">
          {testimonial.program}
        </span>
        <div className="flex items-center gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < testimonial.rating ? "fill-primary text-primary" : "text-border"}`}
            />
          ))}
        </div>
      </div>

      {/* Pull quote */}
      <blockquote cite="LevelUp Learning">
        <p className="font-serif-display text-base md:text-lg text-hero-headline leading-snug italic mb-3">
          "{testimonial.pullQuote}"
        </p>
      </blockquote>

      {/* Full story — always in DOM for SEO */}
      <div className={`overflow-hidden transition-all duration-500 ${expanded ? "max-h-[2000px]" : "max-h-[4.5rem]"}`}>
        <p className="font-sans-body text-sm text-muted-foreground leading-relaxed">
          {testimonial.fullStory}
        </p>
      </div>

      {needsTruncation && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 inline-flex items-center gap-1 font-sans-body text-xs text-primary hover:text-primary/80 transition-colors"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Read more"}
          <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
        </button>
      )}
    </article>
  );
};

/* ─── Main Page ─── */

const Reviews = () => {
  usePageSEO();

  const [activeFilter, setActiveFilter] = useState<Program>("All");

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? testimonials
        : testimonials.filter((t) => t.program === activeFilter),
    [activeFilter]
  );

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
              Real reviews from creators who transformed their careers through our filmmaking masterclasses, video editing bootcamps, screenwriting programs, and UI/UX cohorts. No scripts — just honest creative growth.
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
                <span className="font-sans-body text-xs text-muted-foreground">from 500+ creators</span>
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
              {PROGRAMS.map((program) => (
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
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Reviews Grid (Masonry) ─── */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <h2 className="sr-only">Student Reviews</h2>
          <div className="columns-1 md:columns-2 gap-5">
            {filtered.map((t, i) => (
              <FadeInSection key={`${t.name}-${t.program}-${i}`} delay={i * 60}>
                <ReviewCard testimonial={t} />
              </FadeInSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground font-sans-body py-20">
              No reviews found for this program yet.
            </p>
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
                Join 500+ creators who chose to invest in their craft with LevelUp Learning.
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
