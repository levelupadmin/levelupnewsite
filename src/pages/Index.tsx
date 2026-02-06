import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CredibilityCues from "@/components/CredibilityCues";
import WhyLevelUp from "@/components/WhyLevelUp";
import MasterclassSection from "@/components/MasterclassSection";
import LiveProgramsSection from "@/components/LiveProgramsSection";
import ForgeSection from "@/components/ForgeSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import StudentLogosSection from "@/components/StudentLogosSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CredibilityCues />
      <WhyLevelUp />
      <MasterclassSection />
      <LiveProgramsSection />
      <ForgeSection />
      <StudentLogosSection />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
};

export default Index;
