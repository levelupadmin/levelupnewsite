import { SITE_URL } from "./constants";
import { ORGANIZATION_ID } from "./structuredData";
import { toFiveScale, type Review } from "@/data/reviewCategories";
import type { Aggregate } from "./reviews";

/**
 * Every value here is computed from the same published set the page renders,
 * so the markup and the visible text can never drift apart. Nothing in this
 * file accepts a hand-typed rating or count.
 */

const provider = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "LevelUp Learning",
  url: SITE_URL,
};

function reviewNode(r: Review) {
  return {
    "@type": "Review",
    author: { "@type": "Person", name: r.name || "Verified student" },
    datePublished: r.submittedAt.slice(0, 10),
    reviewRating: {
      "@type": "Rating",
      ratingValue: toFiveScale(r.score),
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: r.text,
    itemReviewed: { "@type": "Course", name: r.program, provider },
    ...(r.profileUrl ? { url: r.profileUrl } : {}),
  };
}

/**
 * Omitted entirely when there is nothing published: an AggregateRating of
 * 0 from 0 reviews is invalid markup and reads worse than saying nothing.
 *
 * `reviews` is the page's own slice, not the whole set. reviewCount is still
 * the full total, which is the number the page prints in its headline, so the
 * figure a crawler cross-checks is the one it can read. Attaching all seven
 * thousand nodes to every page put 3.8MB of JSON-LD in each one.
 */
function ratingFields(agg: Aggregate, reviews: Review[]) {
  if (agg.count === 0) return {};
  return {
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: agg.average,
      reviewCount: agg.count,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map(reviewNode),
  };
}

/** The published aggregate, attached to the organisation, with this page's reviews. */
export function organizationReviewsJsonLd(agg: Aggregate, reviews: Review[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "LevelUp Learning",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    ...ratingFields(agg, reviews),
  };
}

/** One category, as a Course with its own aggregate and reviews. */
export function categoryReviewsJsonLd(
  label: string,
  slug: string,
  description: string,
  agg: Aggregate,
  reviews: Review[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: label,
    description,
    url: `${SITE_URL}/reviews/${slug}/`,
    provider,
    ...ratingFields(agg, reviews),
  };
}

/** The page itself, so the review count is legible without parsing the list. */
export function reviewsCollectionJsonLd(
  name: string,
  description: string,
  path: string,
  agg: Aggregate
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${SITE_URL}${path}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: agg.count,
    },
  };
}
