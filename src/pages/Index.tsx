import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

// Lazy-load all below-fold sections to minimize initial JS bundle
const CredibilityCues = lazy(() => import("@/components/CredibilityCues"));
const WhyLevelUp = lazy(() => import("@/components/WhyLevelUp"));
const MasterclassSection = lazy(() => import("@/components/MasterclassSection"));
const LiveProgramsSection = lazy(() => import("@/components/LiveProgramsSection"));
const ForgeSection = lazy(() => import("@/components/ForgeSection"));
const StudentLogosSection = lazy(() => import("@/components/StudentLogosSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const TrustedCTASection = lazy(() => import("@/components/TrustedCTASection"));
const Footer = lazy(() => import("@/components/Footer"));
const FloatingSupport = lazy(() => import("@/components/FloatingSupport"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Skip-to-content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-primary-foreground focus:font-sans-body focus:text-sm"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <HeroSection />
        <Suspense fallback={null}>
          <CredibilityCues />
          <WhyLevelUp />
          <MasterclassSection />
          <LiveProgramsSection />
          <ForgeSection />
          <StudentLogosSection />
          <TestimonialsSection />
          <FAQSection />
          <Footer />
          <FloatingSupport />
        </Suspense>
      </main>
    </div>
  );
};

export default Index;
