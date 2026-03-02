import { lazy, Suspense } from "react";

const RatingScene = lazy(() => import("./impact/RatingScene"));
const CommunityScene = lazy(() => import("./impact/CommunityScene"));
const LearnersScene = lazy(() => import("./impact/LearnersScene"));
const CollaborationsScene = lazy(() => import("./impact/CollaborationsScene"));

const ImpactBentoGrid = () => (
  <section className="relative w-full">
    {/* Section label */}
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-4">
      <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">
        Our Impact
      </p>
    </div>

    <Suspense fallback={null}>
      <RatingScene />
      <CommunityScene />
      <LearnersScene />
      <CollaborationsScene />
    </Suspense>
  </section>
);

export default ImpactBentoGrid;
