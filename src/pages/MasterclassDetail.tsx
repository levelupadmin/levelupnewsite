import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { masterclassPages } from "@/data/masterclassPages";
import usePageSeo from "@/hooks/usePageSeo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeInSection from "@/components/FadeInSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Play,
  BookOpen,
  Clock,
  Star,
  Camera,
  Film,
  ChevronRight,
  ArrowLeft,
  FileText,
  Monitor,
  Award,
  Smartphone,
  Users,
  CheckCircle,
} from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import { trackCTAClick } from "@/lib/clarity";
import { cn } from "@/lib/utils";
import certificateImg from "@/assets/gvr-certificate.png";
import gvrHeroBg from "@/assets/gvr-hero-bg.png";
import devicesShowcase from "@/assets/devices-showcase.png";
import gvrSittingImg from "@/assets/gvr-sitting.png";
import gvrPricingImg from "@/assets/gvr-pricing.png";
import googlePlayBadge from "@/assets/google-play-badge.svg";
import appStoreBadge from "@/assets/app-store-badge.svg";

// Audience icons
import iconModelPhotographers from "@/assets/icons/model-photographers.png";
import iconCinematographers from "@/assets/icons/cinematographers.png";
import iconFoodPhotographers from "@/assets/icons/food-photographers.png";
import iconWildlifePhotographers from "@/assets/icons/wildlife-photographers.png";
import iconCinephiles from "@/assets/icons/cinephiles.png";
import iconCinemaAspirants from "@/assets/icons/cinema-aspirants.png";

const audienceIcons: Record<string, string> = {
  "Model Photographers": iconModelPhotographers,
  "Cinematographers": iconCinematographers,
  "Food Photographers": iconFoodPhotographers,
  "Wildlife Photographers": iconWildlifePhotographers,
  "Cinephiles": iconCinephiles,
  "Cinema Aspirants": iconCinemaAspirants,
};

// Portfolio images
import portfolioTheri from "@/assets/portfolio/theri-poster.png";
import portfolioKamal from "@/assets/portfolio/kamal-vishwaroopam.png";
import portfolioJaanu from "@/assets/portfolio/jaanu-poster.png";
import portfolioRaviVarma from "@/assets/portfolio/ravi-varma-calendar.png";
import portfolioSuriya from "@/assets/portfolio/suriya-24.png";
import portfolioKadaram from "@/assets/portfolio/kadaram-kondan.png";
import portfolioRaviVarma2 from "@/assets/portfolio/ravi-varma-calendar-2.png";
import portfolioRaangi from "@/assets/portfolio/raangi-poster.png";

const portfolioImages = [
  portfolioTheri, portfolioKamal, portfolioJaanu, portfolioRaviVarma,
  portfolioSuriya, portfolioKadaram, portfolioRaviVarma2, portfolioRaangi,
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

  const CTAButton = ({ className = "" }: { className?: string }) => (
    <a
      href={data.ctaLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCTAClick("masterclass-subscribe", data.name)}
      className={cn(
        "inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-sans-body font-bold text-sm tracking-wide px-8 py-3.5 rounded-lg transition-colors shadow-lg uppercase",
        className
      )}
    >
      {data.ctaText}
    </a>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ═══ 1. HERO ═══ */}
      <section className="relative overflow-hidden">
        {/* Full-bleed background image — takes up the visual hero area */}
        <div className="relative min-h-[80vh] md:min-h-[85vh] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img src={gvrHeroBg} alt="" className="w-full h-full object-cover object-top" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          </div>

        </div>

        {/* Content BELOW the image — not overlapping the face */}
        <div className="relative z-10 bg-background w-full max-w-5xl mx-auto px-6 py-12 md:py-16 text-center -mt-16">
          <FadeInSection>
            <p className="font-display text-2xl md:text-3xl text-foreground/80 uppercase tracking-[0.15em] mb-1">Teaches</p>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl text-foreground uppercase tracking-wide leading-[0.9]">
              {data.discipline}
            </h2>
          </FadeInSection>

          <FadeInSection delay={100}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#trailer" className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border text-foreground font-sans font-bold text-sm tracking-wide px-10 py-4 rounded-lg hover:bg-card transition-colors uppercase">
                <Play className="w-4 h-4" /> Watch Trailer
              </a>
              <CTAButton />
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            <blockquote className="mt-10 max-w-2xl mx-auto">
              <p className="text-sm md:text-base text-foreground/80 italic leading-relaxed">
                {data.pullQuote}
              </p>
            </blockquote>
            <p className="mt-6 max-w-2xl mx-auto text-sm text-muted-foreground leading-relaxed">
              {data.courseDescription}
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* ═══ 2. CLASS INFO + LESSON ACCORDION ═══ */}
      <section id="trailer" className="py-16 md:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <h2 className="font-display text-3xl md:text-4xl text-foreground uppercase tracking-wide mb-2">Class Info</h2>
            <p className="text-sm text-muted-foreground mb-8">
              {data.courseDetails.chapters} video lessons ({data.courseDetails.duration})
            </p>
          </FadeInSection>

          <div className="grid md:grid-cols-[1.2fr_1fr] gap-6 items-start">
            {/* YouTube trailer embed */}
            <FadeInSection>
              <div className="aspect-video rounded-xl overflow-hidden bg-card border border-border">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/j8bJXiHLmmE?si=PbebiugOjIA1wzk3"
                  title="G Venketram Teaches Photography | Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </FadeInSection>

            {/* Lesson list accordion — scrollable column */}
            <FadeInSection delay={100}>
              <div className="max-h-[340px] overflow-y-auto pr-1 space-y-3 scrollbar-thin scrollbar-track-card scrollbar-thumb-border">
                {data.lessons.map((lesson) => (
                  <Accordion key={lesson.number} type="single" collapsible>
                    <AccordionItem
                      value={`lesson-${lesson.number}`}
                      className="bg-card border border-border rounded-xl overflow-hidden"
                    >
                      <AccordionTrigger className="px-5 py-4 hover:no-underline">
                        <div className="text-left">
                          <span className="block text-[11px] text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                            Lesson {lesson.number}
                          </span>
                          <span className="text-sm md:text-base text-foreground font-bold">{lesson.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">{lesson.description}</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ═══ 3. PORTFOLIO SHOWCASE — Infinite Ticker ═══ */}
      <section className="py-16 md:py-24 border-t border-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-10 md:mb-14">
          <FadeInSection>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground uppercase tracking-wide text-center max-w-lg mx-auto leading-tight">
              {data.portfolioHeadline}
            </h2>
          </FadeInSection>
        </div>

        {/* Ticker – duplicated list for seamless loop */}
        <div className="relative w-full">
          <div className="flex gap-4 animate-ticker w-max">
            {[...portfolioImages, ...portfolioImages].map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[260px] md:w-[320px] aspect-[3/4] rounded-xl overflow-hidden border border-border"
              >
                <img src={src} alt="Portfolio work by G Venket Ram" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. WHO IS THIS PROGRAM FOR ═══ */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left portrait */}
              <div className="relative max-w-sm mx-auto md:mx-0">
                <img src={data.portraitImage} alt={data.name} className="w-full aspect-[3/4] object-cover rounded-lg" />
              </div>

              {/* Right — audience cards */}
              <div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground uppercase tracking-wide mb-8">
                  Who is this <span className="text-primary">program</span> for?
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {data.audienceTargets.map((target) => (
                    <div key={target} className="flex items-center gap-4 bg-card border border-border rounded-lg px-5 py-4 hover:border-primary/30 transition-colors">
                      <img
                        src={audienceIcons[target]}
                        alt={target}
                        className="w-12 h-12 rounded-full shrink-0 object-contain"
                      />
                      <span className="text-sm md:text-base font-semibold text-foreground">{target}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-center">
                  <CTAButton />
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ═══ 5. WHY THIS MASTERCLASS ═══ */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground uppercase tracking-wide text-center mb-12 md:mb-16">
              Why is this masterclass<br />for you?
            </h2>
          </FadeInSection>

          {/* Timeline layout */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

            <div className="space-y-16 md:space-y-24">
              {data.valueProps.map((vp, i) => (
                <FadeInSection key={i} delay={i * 80}>
                  <div className="relative">
                    {/* Numbered dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -top-4 w-10 h-10 rounded-full bg-primary text-primary-foreground items-center justify-center font-bold text-sm z-10">
                      {i + 1}
                    </div>

                    <div className={cn(
                      "grid md:grid-cols-2 gap-8 md:gap-12 items-center mt-6",
                      i % 2 === 1 && "md:[direction:rtl] md:*:[direction:ltr]"
                    )}>
                      <div className="aspect-video rounded-xl overflow-hidden bg-card border border-border relative">
                        {["/videos/gvr-why-1.webm", "/videos/gvr-why-2.webm", "/videos/gvr-why-3.webm"][i] ? (
                          <video
                            src={["/videos/gvr-why-1.webm", "/videos/gvr-why-2.webm", "/videos/gvr-why-3.webm"][i]}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Camera className="w-10 h-10 text-muted-foreground/20" />
                            </div>
                          </>
                        )}
                      </div>
                      <div>
                        <div className="md:hidden w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm mb-4">
                          {i + 1}
                        </div>
                        <h3 className="font-serif-display text-lg md:text-xl text-foreground font-medium leading-snug mb-3">
                          {vp.title}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {vp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6. CERTIFICATE ═══ */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-4xl md:text-5xl text-foreground uppercase tracking-wide leading-tight mb-8">
                  <span className="text-primary">Certificate</span> of<br />Completion
                </h2>
                <ul className="space-y-4">
                  {data.certificatePoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base text-foreground/80">{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <CTAButton />
                </div>
              </div>

              {/* Certificate preview */}
              <div className="rounded-xl overflow-hidden">
                <img src={certificateImg} alt="Certificate of Completion" className="w-full h-auto rounded-xl shadow-2xl" />
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ═══ 7. TESTIMONIALS ═══ */}
      <section className="py-16 md:py-24 border-t border-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground uppercase tracking-wide text-center mb-4">
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
              {data.testimonials.map((t, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6 flex flex-col h-full">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed flex-1">"{t.quote}"</p>
                  <div className="flex items-center gap-3 mt-4">
                    {t.image && (
                      <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                    )}
                    <div>
                      <p className="text-sm text-foreground font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ═══ 8. BENEFITS GRID ═══ */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-5xl mx-auto px-6">
          <FadeInSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.benefits.map((b, i) => {
                const icons = [
                  <FileText className="w-8 h-8 text-primary" />,
                  <Clock className="w-8 h-8 text-primary" />,
                  <Users className="w-8 h-8 text-primary" />,
                  <Award className="w-8 h-8 text-primary" />,
                ];
                return (
                  <div key={i} className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center gap-4">
                    {icons[i]}
                    <p className="text-sm text-foreground font-medium">{b.title}</p>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-8">
              <CTAButton />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ═══ 9. WATCH ON ANY DEVICE ═══ */}
      <section className="py-24 md:py-32 border-t border-border overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <FadeInSection>
            <div className="relative flex flex-col items-center">
              {/* Concentric rings background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                {[400, 600, 800, 1000, 1200].map((s, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-white/[0.06]"
                    style={{ width: s, height: s }}
                  />
                ))}
              </div>

              {/* 4 corner feature labels */}
              <div className="relative z-10 w-full grid grid-cols-2 gap-y-4 md:gap-y-0 px-4 md:px-12">
                {/* Top row */}
              <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
                  <Monitor className="w-9 h-9 text-primary" />
                  <p className="text-base font-semibold text-foreground">Watch on any Device</p>
                </div>
                <div className="flex flex-col items-center md:items-end gap-1 text-center md:text-right">
                  <Award className="w-9 h-9 text-primary" />
                  <p className="text-base font-semibold text-foreground">Get Certified</p>
                </div>
              </div>

              {/* Device mockup */}
              <img
                src={devicesShowcase}
                alt="Watch on laptop, tablet or phone"
                className="relative z-10 w-full max-w-2xl mx-auto my-10 md:my-16"
                loading="lazy"
              />

              {/* Bottom row */}
              <div className="relative z-10 w-full grid grid-cols-2 px-4 md:px-12">
                <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
                  <svg className="w-9 h-9 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/></svg>
                  <p className="text-base font-semibold text-foreground">Pay Once, Play Forever</p>
                </div>
                <div className="flex flex-col items-center md:items-end gap-1 text-center md:text-right">
                  <Clock className="w-9 h-9 text-primary" />
                  <p className="text-base font-semibold text-foreground">Learn at your own Pace</p>
                </div>
              </div>

              {/* App store badges */}
              <div className="relative z-10 flex items-center justify-center gap-4 mt-8">
                <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <img src={googlePlayBadge} alt="Get it on Google Play" className="h-12" />
                </a>
                <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <img src={appStoreBadge} alt="Download on the App Store" className="h-12" />
                </a>
              </div>
            </div>

            <div className="text-center mt-8">
              <CTAButton />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ═══ 10. PRICING CTA ═══ */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="font-display text-4xl md:text-5xl text-foreground uppercase tracking-wide leading-tight">
                  Grab the offer while<br />it lasts...
                </h2>

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[testimonial1, testimonial2, testimonial4].map((img, i) => (
                      <img key={i} src={img} alt="Student" className="w-8 h-8 rounded-full border-2 border-background object-cover" />
                    ))}
                  </div>
                  <div>
                    <span className="text-sm text-foreground font-bold">{data.studentCount}+ Students</span>
                    <span className="text-xs text-muted-foreground ml-1">have attended this workshop</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-serif-display text-lg text-primary font-medium mb-4">What you'll get...</h3>
                  <ul className="space-y-3">
                    {data.pricingPoints.map((point, i) => (
                      <li key={i} className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3">
                        <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-sm text-foreground/80">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Instructor card */}
              <div className="rounded-xl p-[2px] bg-gradient-to-b from-primary/40 via-primary/20 to-primary/5">
                <div className="bg-card rounded-xl overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <img src={gvrPricingImg} alt={data.name} className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>
                  <div className="p-6 text-center space-y-3">
                    <h3 className="font-serif-display text-lg text-foreground">Learn from an Award-Winning Cinematic Photographer</h3>
                    <CTAButton />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Enroll now and get bonuses worth Rs.19,999 for free. There was never a better time to grab this on-demand program.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ═══ 11. FAQ ═══ */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <FadeInSection>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground uppercase tracking-wide mb-2">
              Questions?
            </h2>
            <p className="text-lg text-foreground font-medium mb-2">We've got you covered</p>
            <p className="text-sm text-muted-foreground mb-8">Answers to the burning questions in your mind.</p>
          </FadeInSection>

          <Accordion type="single" collapsible className="space-y-3">
            {data.faqs.map((faq, i) => (
              <FadeInSection key={i} delay={i * 50}>
                <AccordionItem
                  value={`faq-${i}`}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
                >
                  <AccordionTrigger className="px-5 py-4 hover:no-underline">
                    <span className="text-sm md:text-base text-foreground font-medium text-left pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              </FadeInSection>
            ))}
          </Accordion>

          <FadeInSection delay={200}>
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-3">Have a different question?</p>
              <a
                href="mailto:support@leveluplearning.in"
                className="inline-block border border-primary text-primary font-sans-body font-bold text-sm tracking-wide px-6 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors uppercase"
              >
                Contact Us
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ═══ 12. FOOTER CTA ═══ */}
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <div className="relative rounded-3xl overflow-visible" style={{ background: "linear-gradient(135deg, hsl(24 95% 53%) 0%, hsl(30 90% 55%) 50%, hsl(38 95% 55%) 100%)" }}>
              <div className="relative flex flex-col md:flex-row items-end">
                {/* Text + CTA side */}
                <div className="flex-1 px-8 py-10 md:px-12 md:py-14 flex flex-col gap-5 z-10">
                  <h2 className="font-serif-display text-3xl md:text-4xl lg:text-5xl text-white font-medium leading-tight">
                    What are you waiting for?
                  </h2>
                  <p className="font-sans-body text-base md:text-lg text-white/90">
                    Learn Photography with Venket today!
                  </p>
                  <div>
                    <a
                      href={data.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackCTAClick("masterclass-footer-cta", data.name)}
                      className="inline-block bg-white hover:bg-white/90 text-primary font-sans-body font-bold text-sm tracking-wide px-8 py-3.5 rounded-full transition-colors shadow-lg uppercase"
                    >
                      {data.ctaText}
                    </a>
                  </div>
                </div>
                {/* Instructor sitting image — overflows top of card */}
                <div className="hidden md:block w-[340px] lg:w-[400px] shrink-0 self-end relative overflow-visible">
                  <img
                    src={gvrSittingImg}
                    alt={data.name}
                    className="w-[130%] h-auto object-contain drop-shadow-2xl relative -top-16 lg:-top-20 -left-[15%]"
                    loading="lazy"
                  />
                </div>
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

export default MasterclassDetail;
