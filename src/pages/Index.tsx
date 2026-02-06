import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CredibilityCues from "@/components/CredibilityCues";
import WhyLevelUp from "@/components/WhyLevelUp";
import MasterclassSection from "@/components/MasterclassSection";
import LiveProgramsSection from "@/components/LiveProgramsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CredibilityCues />
      <WhyLevelUp />
      <MasterclassSection />
      <LiveProgramsSection />
    </div>
  );
};

export default Index;
