import { lazy, Suspense } from "react";

const RatingScene = lazy(() => import("./impact/RatingScene"));
const CommunityScene = lazy(() => import("./impact/CommunityScene"));
const LearnersScene = lazy(() => import("./impact/LearnersScene"));
const CollaborationsScene = lazy(() => import("./impact/CollaborationsScene"));

const ImpactBentoGrid = () => (
  <section className="relative w-full">

    <Suspense fallback={null}>
      <RatingScene />
      <CommunityScene />
      <LearnersScene />
      <CollaborationsScene />
    </Suspense>
  </section>
);

export default ImpactBentoGrid;
