import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CredibilityCues from "@/components/CredibilityCues";
import WhyLevelUp from "@/components/WhyLevelUp";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CredibilityCues />
      <WhyLevelUp />
    </div>
  );
};

export default Index;
