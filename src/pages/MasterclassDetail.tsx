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
} from "lucide-react";
import { trackCTAClick } from "@/lib/clarity";
import { cn } from "@/lib/utils";
import certificateImg from "@/assets/gvr-certificate.png";
import gvrHeroBg from "@/assets/gvr-hero-bg.png";

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
      <section className="relative overflow-hidden min-h-[90vh] flex flex-col items-center justify-end">
        {/* Full-bleed background image */}
        <div className="absolute inset-0 z-0">
          <img src={gvrHeroBg} alt="" className="w-full h-full object-cover object-top" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        {/* Name overlay — large, semi-transparent behind the person */}
        <div className="absolute top-16 md:top-20 inset-x-0 z-[1] text-center pointer-events-none select-none">
          <h1 className="font-display text-[12vw] md:text-[10vw] lg:text-[9vw] text-foreground/20 uppercase tracking-wider leading-none whitespace-nowrap">
            {data.name}
          </h1>
        </div>

        {/* Bottom content overlay */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-12 md:pb-16 text-center">
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

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Trailer embed placeholder */}
            <FadeInSection>
              <div className="aspect-video rounded-xl overflow-hidden bg-card border border-border relative">
                <img src={data.portraitImage} alt={data.name} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
                    <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Lesson list accordion */}
            <FadeInSection delay={100}>
              <div className="max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-card scrollbar-thumb-border">
                <Accordion type="single" collapsible className="space-y-2">
                  {data.lessons.map((lesson) => (
                    <AccordionItem
                      key={lesson.number}
                      value={`lesson-${lesson.number}`}
                      className="bg-card border border-border rounded-xl overflow-hidden"
                    >
                      <AccordionTrigger className="px-5 py-4 hover:no-underline">
                        <div className="flex items-center gap-3 text-left">
                          <span className="text-xs text-primary font-bold shrink-0 uppercase">
                            Lesson {lesson.number}
                          </span>
                          <span className="text-sm text-foreground font-medium">{lesson.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">{lesson.description}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ═══ 3. PORTFOLIO SHOWCASE ═══ */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground uppercase tracking-wide text-center max-w-lg mx-auto leading-tight">
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
                <h2 className="font-display text-3xl md:text-4xl text-foreground uppercase tracking-wide mb-8">
                  Who is this <span className="text-primary">program</span> for?
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {data.audienceTargets.map((target) => (
                    <div key={target} className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3 hover:border-primary/30 transition-colors">
                      <Camera className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground/80">{target}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
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
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Camera className="w-10 h-10 text-muted-foreground/20" />
                        </div>
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
                <div key={i} className="bg-card border border-border rounded-xl p-6 space-y-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">"{t.quote}"</p>
                  <div>
                    <p className="text-sm text-foreground font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
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
      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-5xl mx-auto px-6">
          <FadeInSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.deviceFeatures.map((feature, i) => {
                const icons = [
                  <Monitor className="w-8 h-8 text-primary" />,
                  <Play className="w-8 h-8 text-primary" />,
                  <Award className="w-8 h-8 text-primary" />,
                  <BookOpen className="w-8 h-8 text-primary" />,
                ];
                return (
                  <div key={i} className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center gap-4">
                    {icons[i]}
                    <p className="text-sm text-foreground font-medium">{feature}</p>
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

      {/* ═══ 10. PRICING CTA ═══ */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="font-display text-4xl md:text-5xl text-foreground uppercase tracking-wide leading-tight">
                  Grab the offer while<br />it lasts...
                </h2>

                <div className="mt-6 inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground font-medium">{data.studentCount} Students</span>
                  <span className="text-xs text-muted-foreground">have attended this workshop</span>
                </div>

                <div className="mt-8">
                  <h3 className="font-serif-display text-lg text-foreground font-medium mb-4">What you'll get...</h3>
                  <ul className="space-y-3">
                    {data.pricingPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Instructor card */}
              <div className="bg-card border border-primary/20 rounded-xl overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <img src={data.portraitImage} alt={data.name} className="w-full h-full object-cover" />
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
      <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-r from-primary via-[hsl(30_90%_55%)] to-primary">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <FadeInSection>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <p className="text-sm text-primary-foreground/70 uppercase tracking-wide mb-2">What are you waiting for?</p>
                <h2 className="font-display text-3xl md:text-4xl text-primary-foreground uppercase tracking-wide leading-tight">
                  Learn Photography with<br />Venket today!
                </h2>
              </div>
              <a
                href={data.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("masterclass-footer-cta", data.name)}
                className="inline-block bg-background hover:bg-background/90 text-foreground font-sans-body font-bold text-sm tracking-wide px-8 py-3.5 rounded-lg transition-colors shadow-lg uppercase shrink-0"
              >
                {data.ctaText}
              </a>
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
