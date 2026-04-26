import { SITE_URL } from "./constants";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LevelUp Learning",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  description:
    "India's leading creative education ecosystem for filmmakers, editors, writers, and designers.",
  email: "hello@leveluplearning.com",
  sameAs: [],
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

export interface CourseParams {
  name: string;
  description: string;
  path: string;
  provider?: string;
  image?: string;
  instructorName?: string;
  courseMode?: "online" | "blended" | "onsite";
}

export const courseJsonLd = ({
  name,
  description,
  path,
  provider = "LevelUp Learning",
  image,
  instructorName,
  courseMode = "online",
}: CourseParams) => {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: {
      "@type": "Organization",
      name: provider,
      sameAs: SITE_URL,
    },
  };
  if (image) data.image = image;
  if (instructorName) {
    data.instructor = {
      "@type": "Person",
      name: instructorName,
    };
  }
  data.hasCourseInstance = {
    "@type": "CourseInstance",
    courseMode,
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
