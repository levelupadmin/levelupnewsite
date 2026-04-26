import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Clock, MapPin, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeInSection from "@/components/FadeInSection";
import StoryCard from "@/components/stories/StoryCard";
import { getStoryBySlug, getReadingTime, studentStories } from "@/data/studentStories";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { SITE_URL } from "@/lib/constants";

const PROGRAM_BORDER: Record<string, string> = {
  Filmmaking: "border-l-rose-500",
  Screenwriting: "border-l-amber-500",
  "The Forge": "border-l-emerald-500",
  "Breakthrough Filmmaker Program": "border-l-blue-500",
  Photography: "border-l-cyan-500",
};

export default function StudentStory() {
  const { slug } = useParams<{ slug: string }>();
  const story = getStoryBySlug(slug || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!story) return;

    document.title = story.seoTitle;

    const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
    const metaTags: Record<string, string> = {
      description: story.metaDescription,
      "og:title": story.seoTitle,
      "og:description": story.metaDescription,
      "og:type": "article",
      "og:url": `${SITE_URL}/student-stories/${story.slug}`,
      "og:image": OG_IMAGE,
      "og:image:width": "1200",
      "og:image:height": "630",
      "twitter:card": "summary_large_image",
      "twitter:title": story.seoTitle,
      "twitter:description": story.metaDescription,
      "twitter:image": OG_IMAGE,
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
    canonical.setAttribute("href", `${SITE_URL}/student-stories/${story.slug}`);

    // JSON-LD Article
    const articleLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: story.h1,
      description: story.metaDescription,
      author: { "@type": "Person", name: story.authorName },
      publisher: {
        "@type": "EducationalOrganization",
        name: "LevelUp Learning",
        url: SITE_URL,
      },
      datePublished: "2026-03-01",
      url: `${SITE_URL}/student-stories/${story.slug}`,
      keywords: story.targetKeywords.join(", "),
      ...(story.location ? { contentLocation: { "@type": "Place", name: story.location } } : {}),
    };

    // Breadcrumb JSON-LD
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Wall of Love", item: `${SITE_URL}/student-stories` },
        { "@type": "ListItem", position: 3, name: "Student Stories", item: `${SITE_URL}/student-stories` },
        { "@type": "ListItem", position: 4, name: story.h1 },
      ],
    };

    const script1 = document.createElement("script");
    script1.type = "application/ld+json";
    script1.textContent = JSON.stringify(articleLd);
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.type = "application/ld+json";
    script2.textContent = JSON.stringify(breadcrumbLd);
    document.head.appendChild(script2);

    return () => {
      createdTags.forEach(t => t.remove());
      if (createdCanonical && canonical) canonical.remove();
      script1.remove();
      script2.remove();
    };
  }, [story]);

  if (!story) {
    return (
      <div className="theme-reviews">
        <Navbar />
        <main className="min-h-screen bg-background pt-32 text-center">
          <h1 className="font-serif-display text-2xl text-foreground mb-4">Story not found</h1>
          <Link to="/student-stories" className="text-primary font-sans-body text-sm underline">← Back to all stories</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const readTime = getReadingTime(story);
  const borderColor = PROGRAM_BORDER[story.program] || "border-l-primary";

  // More stories (excluding current)
  const moreStories = studentStories.filter(s => s.slug !== story.slug).slice(0, 3);

  return (
    <div className="theme-reviews">
      <Navbar />
      <main className="relative min-h-screen bg-background pt-20">
        <div className="reviews-editorial-glow" aria-hidden="true" />

        <article className="max-w-3xl mx-auto px-6 md:px-12 pt-8 md:pt-14 pb-16">
          {/* Breadcrumbs */}
          <nav className="mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link to="/student-stories">Wall of Love</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link to="/student-stories">Student Stories</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1 max-w-[200px]">{story.h1}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </nav>

          {/* Hero */}
          <FadeInSection>
            <header className="mb-10">
              <h1 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-medium text-foreground leading-tight mb-5">
                {story.h1}
              </h1>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground font-sans-body">
                <span className="font-medium text-foreground">{story.authorName}</span>
                <span className="text-border">|</span>
                <span>{story.authorRole}</span>
                {story.location && (
                  <>
                    <span className="text-border">|</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{story.location}</span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(story.rating / 2) ? "fill-amber-500 text-amber-500" : "text-border"}`} />
                  ))}
                  <span className="ml-2 text-xs text-muted-foreground">{story.rating}/10</span>
                </div>
                <span className="text-border">·</span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />{readTime} min read
                </span>
              </div>
            </header>
          </FadeInSection>

          {/* Article body */}
          <div className="space-y-8">
            {story.sections.map((section, i) => (
              <FadeInSection key={i}>
                <section>
                  <h2 className="font-serif-display text-xl md:text-2xl font-medium text-foreground mb-3">
                    {section.heading}
                  </h2>
                  <p className="font-sans-body text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                    {section.body}
                  </p>
                </section>
              </FadeInSection>
            ))}
          </div>

          {/* Pull-quote style CTA */}
          <FadeInSection>
            <div className={`mt-12 border-l-4 ${borderColor} bg-card rounded-r-xl p-6 md:p-8`}>
              <p className="font-sans-body text-sm md:text-base text-foreground/80 leading-relaxed italic mb-4">
                {story.ctaText}
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-sans-body text-sm font-semibold hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
              >
                Explore {story.ctaProgram} Programs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeInSection>

          {/* Back link */}
          <div className="mt-10">
            <Link
              to="/student-stories"
              className="inline-flex items-center gap-2 font-sans-body text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Student Stories
            </Link>
          </div>
        </article>

        {/* More Stories */}
        {moreStories.length > 0 && (
          <section className="max-w-5xl mx-auto px-6 md:px-12 pb-16">
            <h2 className="font-serif-display text-xl font-medium text-foreground mb-6 text-center">More Stories</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {moreStories.map((s, i) => (
                <StoryCard key={s.slug} story={s} index={i} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
