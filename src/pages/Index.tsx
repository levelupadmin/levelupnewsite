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
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
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
      </Suspense>
    </div>
  );
};

export default Index;
