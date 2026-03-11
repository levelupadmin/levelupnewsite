import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { masterclassPages } from "@/data/masterclassPages";
import usePageSeo from "@/hooks/usePageSeo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeInSection from "@/components/FadeInSection";
import { Play, BookOpen, Clock, Globe, Award, ChevronDown, ArrowLeft, Star, Camera, Film, Palette, PenTool, GraduationCap, Heart } from "lucide-react";
import { useState } from "react";
import { trackCTAClick } from "@/lib/clarity";
import { cn } from "@/lib/utils";

const audienceIcons: Record<string, React.ReactNode> = {
  Photographers: <Camera className="w-4 h-4" />,
  Filmmakers: <Film className="w-4 h-4" />,
  "Content Creators": <Play className="w-4 h-4" />,
  "Visual Artists": <Palette className="w-4 h-4" />,
  "Design Students": <PenTool className="w-4 h-4" />,
  "Hobbyists & Enthusiasts": <Heart className="w-4 h-4" />,
};

/* ─── Testimonials ─── */
const testimonials = [
  { name: "Arun K.", text: "This masterclass changed the way I see light. Venket Ram's approach is methodical yet deeply artistic.", rating: 5 },
  { name: "Priya S.", text: "Worth every rupee. The portfolio tips alone have transformed my freelance career.", rating: 5 },
  { name: "Rahul M.", text: "I've taken dozens of online courses. This is the only one that felt like a real mentorship.", rating: 5 },
  { name: "Deepa R.", text: "The behind-the-scenes footage from real shoots is invaluable. You can't learn this anywhere else.", rating: 5 },
  { name: "Karthik V.", text: "As a hobbyist, I didn't expect to learn so much. The lighting module alone is worth it.", rating: 5 },
  { name: "Meera J.", text: "G Venket Ram's calm teaching style makes complex concepts feel simple and achievable.", rating: 4 },
];

const MasterclassDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? masterclassPages[slug] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  usePageSeo({
    title: data?.seo.title ?? "Masterclass | LevelUp Learning",
    description: data?.seo.description ?? "",
    path: `/masterclass/${slug}`,
  });

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-4">
          <h1 className="font-serif-display text-3xl text-foreground">Masterclass not found</h1>
          <Link to="/" className="text-primary underline">Back to home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
        {/* Blurred bg image */}
        <div className="absolute inset-0 z-0">
          <img src={data.heroImage} alt="" className="w-full h-full object-cover scale-110 blur-2xl opacity-30" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <FadeInSection>
            <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-foreground tracking-[-0.04em] leading-[0.9]">
              {data.nameUpper}
            </h1>
          </FadeInSection>

          <FadeInSection delay={100}>
            <div className="mt-8 md:mt-10 inline-block">
              <div className="relative w-64 sm:w-72 md:w-80 mx-auto">
                <img
                  src={data.portraitImage}
                  alt={data.name}
                  className="w-full aspect-[3/4] object-cover rounded-lg shadow-2xl"
                />
                {/* Badge overlay */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-md border border-border rounded-full px-5 py-2 flex items-center gap-2">
                  <span className="text-xs tracking-[0.12em] uppercase text-muted-foreground">Teaches</span>
                  <span className="font-serif-display text-sm font-medium text-primary">{data.discipline}</span>
                </div>
                {/* Play button */}
                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-colors shadow-lg">
                  <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
                </button>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            <blockquote className="mt-10 max-w-2xl mx-auto">
              <p className="font-serif-display text-sm md:text-base text-foreground/80 italic leading-relaxed">
                {data.pullQuote}
              </p>
              <cite className="block mt-3 text-xs text-muted-foreground not-italic tracking-wide uppercase">
                — {data.pullQuoteAuthor}
              </cite>
            </blockquote>
          </FadeInSection>
        </div>
      </section>

      {/* ─── Course Overview ─── */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
              {/* Left — Preview card */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-5">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary">
                  <img src={data.portraitImage} alt={data.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                      <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-serif-display text-lg text-foreground font-medium">{data.name}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="font-serif-display text-sm text-primary italic">{data.discipline}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground"><BookOpen className="w-4 h-4 text-primary" />{data.courseDetails.chapters} Chapters</div>
                  <div className="flex items-center gap-2 text-muted-foreground"><Clock className="w-4 h-4 text-primary" />{data.courseDetails.duration}</div>
                  <div className="flex items-center gap-2 text-muted-foreground"><Globe className="w-4 h-4 text-primary" />{data.courseDetails.language}</div>
                  <div className="flex items-center gap-2 text-muted-foreground"><Award className="w-4 h-4 text-primary" />{data.courseDetails.access}</div>
                </div>
              </div>

              {/* Right — Overview bullets */}
              <div>
                <h2 className="font-serif-display text-2xl md:text-3xl text-foreground font-medium mb-6">What you'll learn</h2>
                <ul className="space-y-4">
                  {data.overview.map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                      <span className="text-sm md:text-base text-foreground/80 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ─── Portfolio Showcase ─── */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-foreground font-medium text-center max-w-lg mx-auto leading-tight">
              {data.portfolioHeadline}
            </h2>
          </FadeInSection>
          <FadeInSection delay={100}>
            <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-card border border-border relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ─── Who Is This For ─── */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left portrait */}
              <div className="relative max-w-sm mx-auto md:mx-0">
                <img src={data.portraitImage} alt={data.name} className="w-full aspect-[3/4] object-cover rounded-lg" />
                <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-md rounded-lg p-4 border border-border">
                  <span className="font-serif-display text-lg text-foreground font-medium">{data.name}</span>
                  <p className="text-xs text-primary mt-0.5">{data.discipline}</p>
                </div>
              </div>

              {/* Right — audience pills */}
              <div>
                <h2 className="font-serif-display text-2xl md:text-3xl text-foreground font-medium mb-2">
                  Who is this <span className="text-primary">program</span> for?
                </h2>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {data.audienceTargets.map((target) => (
                    <div key={target} className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3 hover:border-primary/30 transition-colors">
                      <span className="text-primary">{audienceIcons[target] || <GraduationCap className="w-4 h-4" />}</span>
                      <span className="text-sm text-foreground/80">{target}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ─── Why This Masterclass ─── */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-foreground font-medium text-center mb-12 md:mb-16">
              Why is this masterclass<br />for you?
            </h2>
          </FadeInSection>

          <div className="space-y-16 md:space-y-24">
            {data.valueProps.map((vp, i) => (
              <FadeInSection key={i} delay={i * 80}>
                <div className={cn(
                  "grid md:grid-cols-2 gap-8 md:gap-12 items-center",
                  i % 2 === 1 && "md:[direction:rtl] md:*:[direction:ltr]"
                )}>
                  <div className="aspect-video rounded-xl overflow-hidden bg-card border border-border relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="w-10 h-10 text-muted-foreground/20" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif-display text-lg md:text-xl text-foreground font-medium leading-snug mb-3">
                      {vp.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {vp.description}
                    </p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Certificate ─── */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-4xl mx-auto px-6">
          <FadeInSection>
            <div className="text-center">
              <h2 className="font-serif-display text-3xl md:text-5xl text-foreground font-medium leading-tight">
                <em className="not-italic font-serif-display text-primary">Certificate</em> of<br />Completion
              </h2>
              <div className="mt-10 bg-card border border-border rounded-xl p-8 md:p-12 max-w-lg mx-auto">
                <div className="border border-primary/20 rounded-lg p-6 md:p-8 space-y-4">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Certificate of Completion</p>
                  <p className="font-serif-display text-2xl text-primary">LevelUp Learning</p>
                  <div className="w-16 h-px bg-border mx-auto" />
                  <p className="text-sm text-muted-foreground">This certifies that</p>
                  <p className="font-serif-display text-xl text-foreground">Your Name Here</p>
                  <p className="text-sm text-muted-foreground">has successfully completed</p>
                  <p className="font-serif-display text-base text-foreground">{data.name}'s Masterclass on {data.discipline}</p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-16 md:py-24 border-t border-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-foreground font-medium text-center mb-4">
              This makes our heart beat faster every day
            </h2>
            <div className="flex justify-center gap-1 mb-10">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-primary fill-primary" />
              ))}
            </div>
          </FadeInSection>
          <FadeInSection delay={100}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-5 space-y-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">"{t.text}"</p>
                  <p className="text-xs text-muted-foreground font-medium">{t.name}</p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <FadeInSection>
            <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-foreground font-medium mb-2">
              Questions?
            </h2>
            <p className="text-lg text-foreground font-medium mb-8">We've got you covered</p>
          </FadeInSection>
          <div className="space-y-3">
            {data.faqs.map((faq, i) => (
              <FadeInSection key={i} delay={i * 50}>
                <FAQItem question={faq.question} answer={faq.answer} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing CTA ─── */}
      <section className="relative py-16 md:py-24 border-t border-border overflow-hidden">
        {/* Gradient strip */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-r from-primary via-[hsl(30_90%_60%)] to-primary opacity-90" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <FadeInSection>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="font-serif-display text-3xl md:text-4xl text-foreground font-medium leading-tight">
                  Grab the offer while<br />it lasts...
                </h2>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="font-serif-display text-4xl md:text-5xl text-primary font-bold">
                    {data.currency}{data.price}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    {data.currency}{data.originalPrice}
                  </span>
                </div>
                <a
                  href={data.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCTAClick("masterclass-buy", data.name)}
                  className="inline-block mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-sans-body font-semibold text-sm md:text-base px-8 py-3.5 rounded-lg transition-colors shadow-lg"
                >
                  Enroll Now
                </a>
              </div>
              <div className="hidden md:flex justify-end">
                <img src={data.portraitImage} alt={data.name} className="w-64 aspect-[3/4] object-cover rounded-lg shadow-xl" />
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Back link */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link to="/#masterclasses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to all masterclasses
        </Link>
      </div>

      <Footer />
    </div>
  );
};

/* ─── FAQ Accordion Item ─── */
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-sm md:text-base text-foreground font-medium pr-4">{question}</span>
        <ChevronDown className={cn("w-5 h-5 text-muted-foreground shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default MasterclassDetail;
