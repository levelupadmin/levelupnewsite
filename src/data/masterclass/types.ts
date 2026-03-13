export interface MasterclassFAQ {
  question: string;
  answer: string;
}

export interface ValueProp {
  title: string;
  description: string;
  videoUrl?: string;
}

export interface Lesson {
  number: number;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image?: string;
}

export interface Benefit {
  title: string;
}

export interface AudienceTarget {
  label: string;
  icon?: string;
}

export interface MasterclassPageData {
  slug: string;
  name: string;
  nameUpper: string;
  title: string;
  discipline: string;
  heroImage: string;
  heroBgImage: string;
  heroNameOverlay?: string;
  heroDesktopBg?: string;
  heroDesktopObjectPosition?: string;
  heroMobileBg?: string;
  portraitImage: string;
  certificateImage: string;
  pricingImage?: string;
  pullQuote: string;
  courseDescription: string;
  courseDetails: {
    chapters: number;
    duration: string;
    level: string;
    language: string;
    access: string;
  };
  trailerUrl: string;
  trailerEmbedUrl: string;
  lessons: Lesson[];
  portfolioHeadline: string;
  portfolioImages?: string[];
  showPortfolio?: boolean;
  audienceTargets: AudienceTarget[];
  audienceIcons?: Record<string, string>;
  portfolioDisplayImages?: Array<string | { src: string; objectPosition: string }>;
  valueProps: ValueProp[];
  certificatePoints: string[];
  testimonials: Testimonial[];
  benefits: Benefit[];
  deviceFeatures: string[];
  pricingPoints: string[];
  pricingCardHeadline: string;
  studentCount: string;
  faqs: MasterclassFAQ[];
  price: number;
  originalPrice: number;
  currency: string;
  ctaLink: string;
  ctaText: string;
  seo: {
    title: string;
    description: string;
  };
}
