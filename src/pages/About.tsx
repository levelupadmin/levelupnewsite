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

const About = () => (
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

export default About;
