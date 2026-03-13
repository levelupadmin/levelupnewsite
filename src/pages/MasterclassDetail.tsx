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
  Scissors,
  Heart,
  Briefcase,
  GraduationCap,
  Clapperboard,
  Video,
  Palette,
  Ruler,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import karthikImg from "@/assets/karthik-subbaraj-masterclass.png";
import anthonyImg from "@/assets/anthony-gonsalvez-masterclass.png";
import venketImg from "@/assets/venket-ram.png";
import kiranImg from "@/assets/drk-kiran.webp";
import raviImg from "@/assets/ravi-basrur.webp";
import lokeshImg from "@/assets/lokesh-kanagaraj.png";
import nelsonImg from "@/assets/nelson-dilipkumar.jpg";

const otherMasterclasses = [
  { name: "Karthik Subbaraj", image: karthikImg, href: "https://masterclass.leveluplearning.in/karthik-subbaraj" },
  { name: "Anthony Gonsalvez", image: anthonyImg, href: "/masterclass/anthony-gonsalvez" },
  { name: "G Venket Ram", image: venketImg, href: "/masterclass/g-venket-ram" },
  { name: "DRK Kiran", image: kiranImg, href: "/masterclass/drk-kiran" },
  { name: "Ravi Basrur", image: raviImg, href: "https://masterclass.leveluplearning.in/ravi-basrur" },
  { name: "Lokesh Kanagaraj", image: lokeshImg, href: "https://masterclass.leveluplearning.in/lokesh-kanagaraj" },
  { name: "Nelson Dilipkumar", image: nelsonImg, href: "https://masterclass.leveluplearning.in/nelson-dilipkumar" },
];
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import { trackCTAClick } from "@/lib/clarity";
import { cn } from "@/lib/utils";
import devicesShowcase from "@/assets/devices-showcase.png";
import googlePlayBadge from "@/assets/google-play-badge.svg";
import appStoreBadge from "@/assets/app-store-badge.svg";

// Audience icons (used for GVR)
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

const audienceLucideIcons: Record<string, LucideIcon> = {
  "Film Editors": Scissors,
  "Film Enthusiasts": Heart,
  "Freelancing Editors": Briefcase,
  "Aspiring Editors": GraduationCap,
  "Filmmakers": Clapperboard,
  "Cinema Aspirants": Video,
  "Art Directors": Palette,
  "Set Directors": Ruler,
  "Art Direction Aspirants": Sparkles,
};

// Portfolio images (GVR specific)
import portfolioTheri from "@/assets/portfolio/theri-poster.png";
import portfolioKamal from "@/assets/portfolio/kamal-vishwaroopam.png";
import portfolioJaanu from "@/assets/portfolio/jaanu-poster.png";
import portfolioRaviVarma from "@/assets/portfolio/ravi-varma-calendar.png";
import portfolioSuriya from "@/assets/portfolio/suriya-24.png";
import portfolioKadaram from "@/assets/portfolio/kadaram-kondan.png";
import portfolioRaviVarma2 from "@/assets/portfolio/ravi-varma-calendar-2.png";
import portfolioRaangi from "@/assets/portfolio/raangi-poster.png";
import portfolioSamantha from "@/assets/portfolio/ravi-varma-samantha.png";

type PortfolioItem = string | { src: string; objectPosition: string };

const defaultPortfolioImages: PortfolioItem[] = [
  portfolioTheri, portfolioKamal, portfolioJaanu, portfolioRaviVarma,
  { src: portfolioSamantha, objectPosition: "left center" },
  { src: portfolioSamantha, objectPosition: "right center" },
  portfolioSuriya, portfolioKadaram, portfolioRaviVarma2, portfolioRaangi,
];

// Portfolio images (Anthony Gonsalvez specific)
import portfolioSarvam from "@/assets/portfolio/sarvam-thaala-mayam.png";
import portfolioIShankar from "@/assets/portfolio/i-shankar.png";
import portfolioKaakha from "@/assets/portfolio/kaakha-kaakha.png";
import portfolioSivaji from "@/assets/portfolio/sivaji-the-boss.png";
import portfolioVaaranam from "@/assets/portfolio/vaaranam-aayiram.png";
import portfolioEnthiran from "@/assets/portfolio/enthiran.png";
import portfolioYennai from "@/assets/portfolio/yennai-arindhaal.png";
import portfolioStalin from "@/assets/portfolio/stalin.png";

const anthonyPortfolioImages = [
  portfolioSarvam, portfolioIShankar, portfolioKaakha, portfolioSivaji,
  portfolioVaaranam, portfolioEnthiran, portfolioYennai, portfolioStalin,
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
    ogImage: data?.pricingImage ? undefined : undefined,
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

  const portfolioImages = slug === "anthony-gonsalvez" ? anthonyPortfolioImages : (data.portfolioImages ?? defaultPortfolioImages);
  const showPortfolio = data.showPortfolio !== false;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ═══ 1. HERO ═══ */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[55vh] sm:min-h-[70vh] md:min-h-[85vh] flex items-center justify-center">
          {/* Mobile: existing layout */}
          <div className="absolute inset-0 z-0 md:hidden">
            {data.heroNameOverlay && (
              <img src={data.heroNameOverlay} alt="" className="absolute inset-x-0 top-16 sm:top-24 bottom-0 w-full h-auto object-contain z-0" aria-hidden="true" />
            )}
            <img src={data.heroBgImage} alt="" className="w-full h-full object-cover object-center z-[1]" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-[2]" />
          </div>

          {/* Desktop: single combined image if available, otherwise fallback */}
          <div className="absolute inset-0 z-0 hidden md:block">
            {data.heroDesktopBg ? (
              <img src={data.heroDesktopBg} alt="" className="w-full h-full object-cover object-top z-[1]" aria-hidden="true" />
            ) : (
              <>
                {data.heroNameOverlay && (
                  <img src={data.heroNameOverlay} alt="" className="absolute inset-x-0 md:top-20 lg:top-16 bottom-0 w-full h-auto object-contain z-0" aria-hidden="true" />
                )}
                <img src={data.heroBgImage} alt="" className="w-full h-full object-cover object-center z-[1]" aria-hidden="true" />
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-[2]" />
          </div>
        </div>

        <div className="relative z-10 bg-background w-full max-w-5xl mx-auto px-6 py-12 md:py-16 text-center -mt-16">
          <FadeInSection>
            <p className="font-display text-2xl md:text-3xl text-foreground/80 uppercase tracking-[0.15em] mb-1">Teaches</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-foreground uppercase tracking-wide leading-[0.9]">
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
            <FadeInSection>
              <div className="aspect-video rounded-xl overflow-hidden bg-card border border-border">
                <iframe
                  width="100%"
                  height="100%"
                  src={data.trailerEmbedUrl}
                  title={`${data.name} | Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </FadeInSection>

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
      {showPortfolio && (
        <section className="py-16 md:py-24 border-t border-border overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 mb-10 md:mb-14">
            <FadeInSection>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground uppercase tracking-wide text-center max-w-lg mx-auto leading-tight">
                {data.portfolioHeadline}
              </h2>
            </FadeInSection>
          </div>

          <div className="relative w-full">
            <div className="flex gap-4 animate-ticker w-max">
              {[...portfolioImages, ...portfolioImages].map((item, i) => {
                const src = typeof item === "string" ? item : item.src;
                const objectPosition = typeof item === "string" ? undefined : item.objectPosition;
                return (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[260px] md:w-[320px] aspect-[3/4] rounded-xl overflow-hidden border border-border"
                  >
                    <img src={src} alt={`Portfolio work by ${data.name}`} className="w-full h-full object-cover" style={objectPosition ? { objectPosition } : undefined} loading="lazy" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══ 4. WHO IS THIS PROGRAM FOR ═══ */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative max-w-sm mx-auto md:mx-0">
                <img src={data.portraitImage} alt={`Portrait of ${data.name}, Instructor at LevelUp Learning`} className="w-full aspect-[3/4] object-cover rounded-lg" />
              </div>

              <div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground uppercase tracking-wide mb-8">
                  Who is this <span className="text-primary">program</span> for?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {data.audienceTargets.map((target) => {
                    const iconSrc = target.icon || audienceIcons[target.label];
                    const LucideIcon = audienceLucideIcons[target.label];
                    return (
                      <div key={target.label} className="flex items-center gap-4 bg-card border border-border rounded-lg px-5 py-4 hover:border-primary/30 transition-colors">
                        {iconSrc ? (
                          <img
                            src={iconSrc}
                            alt={target.label}
                            className="w-12 h-12 rounded-full shrink-0 object-contain"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full shrink-0 bg-primary/10 flex items-center justify-center">
                            {LucideIcon ? <LucideIcon className="w-6 h-6 text-primary" /> : <Film className="w-6 h-6 text-primary" />}
                          </div>
                        )}
                        <span className="text-sm md:text-base font-semibold text-foreground">{target.label}</span>
                      </div>
                    );
                  })}
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

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

            <div className="space-y-16 md:space-y-24">
              {data.valueProps.map((vp, i) => (
                <FadeInSection key={i} delay={i * 80}>
                  <div className="relative">
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -top-4 w-10 h-10 rounded-full bg-primary text-primary-foreground items-center justify-center font-bold text-sm z-10">
                      {i + 1}
                    </div>

                    <div className={cn(
                      "grid md:grid-cols-2 gap-8 md:gap-12 items-center mt-6",
                      i % 2 === 1 && "md:[direction:rtl] md:*:[direction:ltr]"
                    )}>
                      <div className="aspect-video rounded-xl overflow-hidden bg-card border border-border relative">
                        {vp.videoUrl ? (
                          <video
                            src={vp.videoUrl}
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

              <div className="rounded-xl overflow-hidden">
                <img src={data.certificateImage} alt="Certificate of Completion" className="w-full h-auto rounded-xl shadow-2xl" />
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
                      <img src={t.image} alt={`Portrait of ${t.name}, LevelUp Learning student`} className="w-10 h-10 rounded-full object-cover" />
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
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                {[400, 600, 800, 1000, 1200].map((s, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-white/[0.06]"
                    style={{ width: s, height: s }}
                  />
                ))}
              </div>

              <div className="relative z-10 w-full grid grid-cols-2 gap-y-4 md:gap-y-0 px-4 md:px-12">
              <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
                  <Monitor className="w-9 h-9 text-primary" />
                  <p className="text-base font-semibold text-foreground">Watch on any Device</p>
                </div>
                <div className="flex flex-col items-center md:items-end gap-1 text-center md:text-right">
                  <Award className="w-9 h-9 text-primary" />
                  <p className="text-base font-semibold text-foreground">Get Certified</p>
                </div>
              </div>

              <img
                src={devicesShowcase}
                alt="Watch on laptop, tablet or phone"
                className="relative z-10 w-full max-w-2xl mx-auto my-10 md:my-16"
                loading="lazy"
              />

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
                      <img key={i} src={img} alt="" className="w-8 h-8 rounded-full border-2 border-background object-cover" />
                    ))}
                  </div>
                  <div>
                    <span className="text-sm text-foreground font-bold">{data.studentCount} Students</span>
                    <span className="text-xs text-muted-foreground ml-1">have bought this course</span>
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
                    <img src={data.pricingImage || data.heroBgImage} alt={`LevelUp Learning ${data.name} Masterclass course thumbnail`} className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>
                  <div className="p-6 text-center space-y-3">
                    <h3 className="font-serif-display text-lg text-foreground">{data.pricingCardHeadline}</h3>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-3xl font-bold text-primary">{data.currency}{data.price}</span>
                      <span className="text-lg text-muted-foreground line-through">{data.currency}{data.originalPrice}</span>
                    </div>
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


      {/* Other Masterclasses */}
      <section className="relative bg-background py-12 md:py-16">
        <FadeInSection className="text-center px-6 md:px-12 mb-8 md:mb-10">
          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-medium text-hero-headline tracking-[-0.03em]">
            Check out our{" "}
            <em className="not-italic font-normal text-gradient-amber">other masterclasses</em>
          </h2>
        </FadeInSection>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
            {otherMasterclasses
              .filter((mc) => mc.name !== data.name)
              .map((mc) => {
                const isInternal = mc.href.startsWith("/");
                const Wrapper = isInternal ? Link : "a";
                const linkProps = isInternal
                  ? { to: mc.href }
                  : { href: mc.href, target: "_blank" as const, rel: "noopener noreferrer" };
                return (
                  <Wrapper
                    key={mc.name}
                    {...(linkProps as any)}
                    className="group flex-shrink-0 snap-start w-[180px] md:w-[220px]"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-card shadow-md transition-shadow duration-500 group-hover:shadow-[0_0_20px_2px_hsl(38_75%_55%/0.35)]">
                      <img
                        src={mc.image}
                        alt={`Portrait of ${mc.name}, Instructor at LevelUp Learning`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 rounded-sm ring-1 ring-inset ring-white/0 group-hover:ring-primary/40 transition-all duration-500 pointer-events-none" />
                    </div>
                  </Wrapper>
                );
              })}
          </div>
        </div>
      </section>

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
