import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Quote } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeInSection from "@/components/FadeInSection";
import StoryCard from "@/components/stories/StoryCard";
import { studentStories } from "@/data/studentStories";

const PROGRAMS = ["All", "Filmmaking", "Screenwriting", "The Forge", "Breakthrough Filmmaker Program", "Photography"] as const;

const PAGE_TITLE = "Student Stories | Real Journeys of Creative Transformation | LevelUp Learning";
const PAGE_DESC = "Read 18 in-depth stories from LevelUp students — construction workers, doctors, engineers, and students who transformed their lives through filmmaking, screenwriting, and creative programs.";

export default function StudentStoriesIndex() {
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = PAGE_TITLE;

    const metaTags: Record<string, string> = {
      description: PAGE_DESC,
      "og:title": PAGE_TITLE,
      "og:description": PAGE_DESC,
      "og:type": "website",
      "og:url": "https://levelupnewsite.lovable.app/student-stories",
    };

    const created: HTMLElement[] = [];
    Object.entries(metaTags).forEach(([key, content]) => {
      const attr = key.startsWith("og:") ? "property" : "name";
      let tag = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
        created.push(tag);
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
    canonical.setAttribute("href", "https://levelupnewsite.lovable.app/student-stories");

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: PAGE_TITLE,
      description: PAGE_DESC,
      url: "https://levelupnewsite.lovable.app/student-stories",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: studentStories.length,
        itemListElement: studentStories.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://levelupnewsite.lovable.app/student-stories/${s.slug}`,
          name: s.h1,
        })),
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      created.forEach(t => t.remove());
      if (createdCanonical && canonical) canonical.remove();
      script.remove();
    };
  }, []);

  const filtered = useMemo(
    () => filter === "All" ? studentStories : studentStories.filter(s => s.program === filter),
    [filter]
  );

  return (
    <div className="theme-reviews">
      <Navbar />
      <main className="relative min-h-screen bg-background pt-20">
        <div className="reviews-editorial-glow" aria-hidden="true" />

        {/* Hero */}
        <section className="relative max-w-5xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-6 text-center">
          <div className="absolute inset-0 flex items-start justify-center pointer-events-none overflow-hidden" aria-hidden="true">
            <Quote className="w-48 h-48 md:w-64 md:h-64 text-primary/[0.04] -mt-4 rotate-180" strokeWidth={1} />
          </div>
          <FadeInSection>
            <h1 className="relative font-serif-display text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight mb-4">
              <span className="text-gradient-amber">Student Stories</span>
            </h1>
            <p className="font-sans-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Eighteen journeys that define LevelUp Learning. Real reviews. Real transformations. Real people.
            </p>
          </FadeInSection>
        </section>

        {/* Filter bar */}
        <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border/40">
          <div className="max-w-5xl mx-auto px-6 md:px-12 py-3">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide" role="tablist">
              {PROGRAMS.map(p => (
                <button
                  key={p}
                  role="tab"
                  aria-selected={filter === p}
                  onClick={() => setFilter(p)}
                  className={`shrink-0 px-4 py-2 rounded-full font-sans-body text-sm font-medium transition-all duration-300 ${
                    filter === p
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stories grid */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((story, i) => (
              <StoryCard key={story.slug} story={story} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground font-sans-body py-20">No stories for this program yet.</p>
          )}
        </section>

        {/* Back to reviews */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-16 text-center">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card font-sans-body text-sm text-foreground hover:bg-muted transition-colors shadow-sm"
          >
            ← Back to Wall of Love
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
