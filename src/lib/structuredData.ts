import { SITE_URL } from "./constants";

/** Shared so any page that says more about the organisation (the reviews
 *  pages attach an aggregateRating) is understood as the same entity rather
 *  than a second company with the same name. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "LevelUp Learning",
  // The registered company behind the brand. Assistants asked whether LevelUp
  // is a real business have nothing to check unless the legal name is stated,
  // and it is already on /terms, /privacy-policy, /refund-policy and /support.
  legalName: "LevelUp Edu Pvt Ltd",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  description:
    "India's leading creative education ecosystem for filmmakers, editors, writers, and designers.",
  email: "support@leveluplearning.in",
  // The accounts linked in the site footer. Third-party corroboration is the
  // thing we are short of, so the profiles that do exist should be findable
  // from the markup rather than only from the page furniture.
  sameAs: [
    "https://www.instagram.com/leveluplearning.in/",
    "https://www.youtube.com/@leveluplearning_in/",
    "https://x.com/LevelUp_edu",
    "https://www.linkedin.com/company/levelup-learning/",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "LevelUp Learning",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export const breadcrumbJsonLd = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

export interface ArticleParams {
  title: string;
  description: string;
  path: string;
  image?: string;
  authorName: string;
  datePublished: string;
  dateModified?: string;
}

export const articleJsonLd = ({
  title,
  description,
  path,
  image,
  authorName,
  datePublished,
  dateModified,
}: ArticleParams) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  url: `${SITE_URL}${path}`,
  image: image || `${SITE_URL}/og-image.jpg`,
  author: {
    "@type": "Person",
    name: authorName,
  },
  publisher: {
    "@type": "Organization",
    name: "LevelUp Learning",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/favicon.png`,
    },
  },
  datePublished,
  dateModified: dateModified || datePublished,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}${path}`,
  },
});

export interface CourseOffer {
  /** Price in the currency's main unit, e.g. 2499. */
  price: number;
  /** ISO 4217. Default "INR". */
  priceCurrency?: string;
  /** Checkout URL. */
  url?: string;
  /** schema.org availability URL. Default InStock. */
  availability?: string;
  /** "Paid", "Free", "Partially Free" or "Subscription". Default "Paid". */
  category?: string;
}

export interface CourseParams {
  name: string;
  description: string;
  path: string;
  /** Provider name. Default LevelUp Learning, linked to the Organization node. */
  provider?: string;
  /** Provider site, when the provider is not LevelUp Learning. */
  providerUrl?: string;
  image?: string;
  instructorName?: string;
  courseMode?: "online" | "blended" | "onsite";
  /** One or more of the `offers` fields Google needs for a course result. */
  offers?: CourseOffer;
  /** BCP 47 code(s), e.g. "ta" or ["ta", "en"]. */
  inLanguage?: string | string[];
  /** ISO 8601 duration of all lessons, e.g. "PT2H20M". Set on the
   *  CourseInstance as courseWorkload and on the Course as timeRequired. */
  courseWorkload?: string;
}

/** Canonical URLs on this site end in a slash (see Seo.astro). */
function canonicalUrl(path: string): string {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean.endsWith("/") ? clean : `${clean}/`}`;
}

export const courseJsonLd = ({
  name,
  description,
  path,
  provider = "LevelUp Learning",
  providerUrl,
  image,
  instructorName,
  courseMode = "online",
  offers,
  inLanguage,
  courseWorkload,
}: CourseParams) => {
  const isLevelUp = provider === "LevelUp Learning";
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url: canonicalUrl(path),
    provider: isLevelUp
      ? { "@type": "Organization", "@id": ORGANIZATION_ID, name: provider, sameAs: SITE_URL }
      : { "@type": "Organization", name: provider, ...(providerUrl ? { sameAs: providerUrl } : {}) },
  };
  if (image) {
    data.image = image.startsWith("http")
      ? image
      : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;
  }
  if (instructorName) {
    data.instructor = {
      "@type": "Person",
      name: instructorName,
    };
  }
  if (inLanguage) data.inLanguage = inLanguage;
  if (courseWorkload) data.timeRequired = courseWorkload;
  if (offers) {
    data.offers = {
      "@type": "Offer",
      category: offers.category ?? "Paid",
      price: offers.price,
      priceCurrency: offers.priceCurrency ?? "INR",
      availability: offers.availability ?? "https://schema.org/InStock",
      ...(offers.url ? { url: offers.url } : {}),
    };
  }
  data.hasCourseInstance = {
    "@type": "CourseInstance",
    courseMode,
    ...(courseWorkload ? { courseWorkload } : {}),
    ...(instructorName ? { instructor: { "@type": "Person", name: instructorName } } : {}),
  };
  return data;
};

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqJsonLd = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});
