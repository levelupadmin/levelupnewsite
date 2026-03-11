import venketImg from "@/assets/venket-ram.png";

export interface MasterclassFAQ {
  question: string;
  answer: string;
}

export interface ValueProp {
  title: string;
  description: string;
}

export interface MasterclassPageData {
  slug: string;
  name: string;
  nameUpper: string;
  title: string;
  discipline: string;
  heroImage: string;
  portraitImage: string;
  pullQuote: string;
  pullQuoteAuthor: string;
  courseDetails: {
    chapters: number;
    duration: string;
    level: string;
    language: string;
    access: string;
  };
  overview: string[];
  portfolioHeadline: string;
  audienceTargets: string[];
  valueProps: ValueProp[];
  faqs: MasterclassFAQ[];
  price: number;
  originalPrice: number;
  currency: string;
  ctaLink: string;
  seo: {
    title: string;
    description: string;
  };
}

export const masterclassPages: Record<string, MasterclassPageData> = {
  "g-venket-ram": {
    slug: "g-venket-ram",
    name: "G Venket Ram",
    nameUpper: "G VENKET RAM",
    title: "Teaches Photography",
    discipline: "Photography",
    heroImage: venketImg,
    portraitImage: venketImg,
    pullQuote:
      "\"You don't need an expensive camera or studio to be a photographer. The key to great photography is vision, emotion, and understanding light.\"",
    pullQuoteAuthor: "G Venket Ram",
    courseDetails: {
      chapters: 12,
      duration: "3+ hours",
      level: "All Levels",
      language: "English & Tamil",
      access: "Lifetime Access",
    },
    overview: [
      "Learn the art of portrait photography from one of India's most celebrated photographers",
      "Master lighting techniques — from natural light to studio setups",
      "Understand composition, framing, and the art of visual storytelling",
      "Post-processing workflows used by professional photographers",
      "How to build a photography portfolio that stands out",
      "Real case studies from iconic shoots and celebrity portraits",
    ],
    portfolioHeadline: "Learn From The Photographer Behind These Splendid Shots",
    audienceTargets: [
      "Photographers",
      "Filmmakers",
      "Content Creators",
      "Visual Artists",
      "Design Students",
      "Hobbyists & Enthusiasts",
    ],
    valueProps: [
      {
        title: "Learn essential lighting techniques that make the difference",
        description:
          "From natural light mastery to complex studio setups — learn how Venket Ram crafts his signature look using light as the primary storytelling tool.",
      },
      {
        title: "Elevate your photos with editing, colour correction, and post-processing",
        description:
          "Discover the retouching and colour grading workflows used by professional photographers to create polished, gallery-ready images.",
      },
      {
        title: "Understand the necessity of concept, pre-production and direction before you shoot",
        description:
          "Learn why the best photographs are made before the camera clicks — from mood boards and creative direction to working with subjects.",
      },
    ],
    faqs: [
      {
        question: "Is prior photography experience required?",
        answer:
          "No, this masterclass is designed for all levels. Whether you're just starting out or have been shooting for years, the course covers fundamental techniques and advanced concepts alike.",
      },
      {
        question: "What equipment do I need?",
        answer:
          "Any camera will do — even a smartphone. The masterclass focuses on vision, composition, and lighting principles that transcend gear. That said, having a DSLR or mirrorless camera will help you follow along with some exercises.",
      },
      {
        question: "How long do I have access to the course?",
        answer:
          "You get lifetime access. Watch and re-watch at your own pace, as many times as you like.",
      },
      {
        question: "Will I get a certificate?",
        answer:
          "Yes! Upon completing the masterclass, you'll receive a certificate of completion from LevelUp Learning.",
      },
      {
        question: "Can I interact with other students?",
        answer:
          "Absolutely. You'll be added to the LevelUp community where you can share your work, get feedback, and connect with fellow photography enthusiasts.",
      },
      {
        question: "Is there a refund policy?",
        answer:
          "Due to the digital nature of the product, we do not offer refunds. However, we're confident you'll find immense value in the masterclass.",
      },
    ],
    price: 1499,
    originalPrice: 2999,
    currency: "₹",
    ctaLink: "https://masterclass.leveluplearning.in/g-venket-ram",
    seo: {
      title: "G Venket Ram Photography Masterclass | LevelUp Learning",
      description:
        "Learn photography from G Venket Ram — India's most celebrated portrait photographer. Master lighting, composition, post-processing and more in this in-depth masterclass.",
    },
  },
};
