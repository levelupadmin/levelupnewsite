import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import ProblemSection from "@/components/about/ProblemSection";
import OpportunityStats from "@/components/about/OpportunityStats";
import EcosystemJourney from "@/components/about/EcosystemJourney";
import ImpactNumbers from "@/components/about/ImpactNumbers";
import SuccessStories from "@/components/about/SuccessStories";
import WhyUsSection from "@/components/about/WhyUsSection";
import ClosingVision from "@/components/about/ClosingVision";
import FeaturedInSection from "@/components/about/FeaturedInSection";
import ManifestoSection from "@/components/about/ManifestoSection";
import usePageSeo from "@/hooks/usePageSeo";

const About = () => {
  usePageSeo({
    title: "About LevelUp Learning — India's Creative Education Ecosystem",
    description: "LevelUp Learning is India's largest creative education platform. Learn filmmaking, editing, writing & design from 40+ industry mentors. 18,000+ creators trained.",
    path: "/about",
  });

  return (
    <div className="min-h-screen bg-background theme-warm">
      <Navbar />
      <main>
        <AboutHero />
        <ProblemSection />
        <OpportunityStats />
        <EcosystemJourney />
        <ImpactNumbers />
        <ManifestoSection />
        <SuccessStories />
        <WhyUsSection />
        <ClosingVision />
        <FeaturedInSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
