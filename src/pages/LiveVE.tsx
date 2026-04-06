import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VEHero from "@/components/live-ve/VEHero";
import VESonyBanner from "@/components/live-ve/VESonyBanner";
import VEPromoVideo from "@/components/live-ve/VEPromoVideo";
import VEMentors from "@/components/live-ve/VEMentors";
import VEBrands from "@/components/live-ve/VEBrands";
import VEPortfolio from "@/components/live-ve/VEPortfolio";
import VEProblem from "@/components/live-ve/VEProblem";
import VECurriculum from "@/components/live-ve/VECurriculum";
import VEStudentWork from "@/components/live-ve/VEStudentWork";
import VECommunity from "@/components/live-ve/VECommunity";
import VEApplication from "@/components/live-ve/VEApplication";
import VEPricing from "@/components/live-ve/VEPricing";
import VETestimonials from "@/components/live-ve/VETestimonials";
import VEExperience from "@/components/live-ve/VEExperience";
import VEFAQs from "@/components/live-ve/VEFAQs";
import VEFooterCTA from "@/components/live-ve/VEFooterCTA";

const LiveVE = () => {
  useEffect(() => {
    document.title = "LevelUp Video Editing Academy | Become the Editor Everyone Wants to Hire";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "hsl(160 8% 8%)" }}>
      <Navbar />
      <VEHero />
      <VESonyBanner />
      <VEPromoVideo />
      <VEMentors />
      <VEBrands />
      <VEPortfolio />
      <VEProblem />
      <VECurriculum />
      <VEStudentWork />
      <VECommunity />
      <VEApplication />
      <VEPricing />
      <VETestimonials />
      <VEExperience />
      <VEFAQs />
      <VEFooterCTA />
      <Footer />
    </div>
  );
};

export default LiveVE;
