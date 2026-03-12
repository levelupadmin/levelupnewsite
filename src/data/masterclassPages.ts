import venketImg from "@/assets/venket-ram.png";
import testimonialLisa from "@/assets/testimonial-lisa.png";
import testimonialPrathyaksh from "@/assets/testimonial-prathyaksh.png";

export interface MasterclassFAQ {
  question: string;
  answer: string;
}

export interface ValueProp {
  title: string;
  description: string;
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

export interface MasterclassPageData {
  slug: string;
  name: string;
  nameUpper: string;
  title: string;
  discipline: string;
  heroImage: string;
  portraitImage: string;
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
  lessons: Lesson[];
  portfolioHeadline: string;
  audienceTargets: string[];
  valueProps: ValueProp[];
  certificatePoints: string[];
  testimonials: Testimonial[];
  benefits: Benefit[];
  deviceFeatures: string[];
  pricingPoints: string[];
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
      "\"You don't need an expensive complex camera to be a photographer. The key to great photography lies in the understanding of light.\"",
    courseDescription:
      "This class is for anyone who has an interest in Photography and wants to learn the know-how of capturing the perfect image. Through this course, Venket Ram will divulge into a diverse range of case studies, touching on various locations, lighting techniques and a culmination of other aspects that can be used to establish how you can stand apart as a photographer. He discusses how you can tap into your unique identity, creative style and way of thinking.",
    courseDetails: {
      chapters: 25,
      duration: "3h 20m",
      level: "All Levels",
      language: "Tamil & English",
      access: "Lifetime Access",
    },
    trailerUrl: "https://www.youtube.com/embed/YOUR_TRAILER_ID",
    lessons: [
      { number: 1, title: "Introduction", description: "G Venketram introduces his world of Photography and tells us what to expect from the lessons to come and how he approaches this class." },
      { number: 2, title: "Beginnings", description: "Venket Ram explains how his desire to express himself turned into an interest in photography. He tells us that everyone's journey is different and that one has to discover their passion in their own way." },
      { number: 3, title: "Definition of Light", description: "Light helps us see things around us. This lesson gives us a basic overview of lighting in photography." },
      { number: 4, title: "Understanding Light", description: "Photography is painting with light. In this lesson, Venket Ram tells us how important it is for a photographer to understand light." },
      { number: 5, title: "Painter's Perception of Light", description: "Venket Ram explains how painters have inspired his work and establishes a relationship between painting and photography. He emphasizes the importance of observation of the environment." },
      { number: 6, title: "The Camera - Getting Started", description: "\"The camera is a gadget that registers light\". Cameras have gone through many changes over the years as technology has improved. Venket Ram gives us an overview of what a camera does and the different types of cameras." },
      { number: 7, title: "Understanding Lenses", description: "Venket Ram explains the role of lenses in shooting certain subjects. He defines terms like aperture, shutter speed and ISO. He also defines the relevancy of these technicalities when it comes to shooting great imagery." },
      { number: 8, title: "Composition", description: "According to Venket Ram composition is one of the most important aspects of photography as it expresses the creativity of the photographer. He briefly talks about what elements are involved in composition." },
      { number: 9, title: "Case Study 1 - Conceptualization", description: "Conceptualisation is the first step in narrating a story. Venket Ram explains the importance of conceptualisation in photography through a case study." },
      { number: 10, title: "Genres in Photography", description: "This lesson is an introduction to the different genres in photography. According to Venket Ram, students should select their field of photography according to their interests." },
      { number: 11, title: "Wildlife Photography", description: "An introduction to the different genres in photography. According to Venket Ram, students should select their field of photography according to their interests. He explains what goes into wildlife photography." },
      { number: 12, title: "Fashion Photography", description: "Venket Ram elaborates on the different aspects of fashion photography and what students should know before choosing it." },
      { number: 13, title: "Food Photography", description: "A photographer should have knowledge about any subject they are photographing. Venket Ram talks about the challenges and elements in food photography." },
      { number: 14, title: "Case Study - Raja Ravi Varma Part 1", description: "A case study of Venket Ram's collaboration with \"Naam Foundation\" where he recreated paintings of Raja Ravi Varma with popular artistes. He explains what went into the preparation and conceptualisation of the project." },
      { number: 15, title: "Case Study - Raja Ravi Varma Part 2", description: "Venket Ram talks about another recreation of a painting of Raja Ravi Varma. This lesson tells us how an in depth understanding of textiles, lighting and composition will give better results." },
      { number: 16, title: "Case Study 3 - Bigil", description: "Venket Ram shares his expertise on working with stars and shooting for movie posters through his work for the movie 'Bigil'." },
      { number: 17, title: "Into The Studio - Getting Started - Conceptualisation", description: "This lesson is an introduction by Venket Ram to practical studio sessions and how to get started with studio shoots." },
      { number: 18, title: "Setting Up Your Shoot", description: "In this lesson, Venket Ram goes into detail about setting up the shot with respect to the background and lighting." },
      { number: 19, title: "Collaboration for a Fashion Shoot - Makeup and Hair", description: "Venket Ram shows us how he collaborates with makeup artists and designers for a fashion shoot." },
      { number: 20, title: "Art and Lighting Setup - Recreating Daylight in the Studio", description: "It sometimes isn't always possible to shoot outside because of various factors such as light, weather, budget and time. Venket Ram shows us how to set up studio lights to recreate daylight within an enclosed room." },
      { number: 21, title: "Working with the Setup - The Shoot", description: "In this lesson, Venket Ram shows us how he works with the setup and model for the shoot. Talking and conversing with your crew is essential to get exactly what you want from the shoot." },
    ],
    portfolioHeadline: "Learn From The Photographer Behind These Splendid Shots",
    audienceTargets: [
      "Model Photographers",
      "Cinematographers",
      "Food Photographers",
      "Wildlife Photographers",
      "Cinephiles",
      "Cinema Aspirants",
    ],
    valueProps: [
      {
        title: "Learn essential lighting techniques you need for photography",
        description:
          "This masterclass is invaluable as it offers a captivating insight into the intricacies and nuances of photography, allowing for a fresh and inspiring perspective. Elevate your photography skill by understanding essential techniques, settings, and principles.",
      },
      {
        title: "Dive into the intricacies of scriptwriting, actor collaboration, music and sound, storyboarding, and more",
        description:
          "This masterclass is perfect because it allows you to delve into scene analysis through the Instructor's enlightening case studies.",
      },
      {
        title: "Understand the necessity of thorough preproduction and detailing before photoshoot",
        description:
          "Learn why the best photographs are made before the camera clicks — from mood boards and creative direction to working with subjects.",
      },
    ],
    certificatePoints: [
      "Showcase your Certificate on social media",
      "Download or print out as PDF to share with others",
      "Share as image online to demonstrate your skill",
    ],
    testimonials: [
      {
        name: "Lisa M",
        role: "Actor",
        image: testimonialLisa,
        quote:
          "Venket Ram's photography course is a game-changer! I've always had a passion for photography, but this course took my skills to a whole new level. The case studies were incredibly insightful, and Venket Ram's guidance on finding my unique creative style was invaluable. I can confidently say I'm a better photographer now!",
      },
      {
        name: "Janani",
        role: "Theater Artist",
        quote:
          "If you want to elevate your photography skills, Venket Ram's course is the way to go. His expertise and the diverse range of case studies are eye-opening. I learned so much about lighting, composition, and finding my own photographic voice. This course is a must for anyone serious about photography!",
      },
      {
        name: "Prathyaksh",
        role: "Director",
        quote:
          "Venket Ram's course not only taught me the technical aspects of photography but also how to infuse my personality and creativity into every shot. I've gained the confidence to stand out as a photographer, and I'm capturing images like never before. Thank you, Venket Ram!",
      },
    ],
    benefits: [
      { title: "PDF workbook for every class" },
      { title: "4+ hours of course content" },
      { title: "Exclusive workshops and events" },
      { title: "Signed certificate from the Instructor" },
    ],
    deviceFeatures: [
      "Watch on any Device",
      "Pay Once, Play Forever",
      "Get Certified",
      "Learn at your own Pace",
    ],
    pricingPoints: [
      "Opportunity to learn from the best",
      "Detailed Insights into the creative processes",
      "Case Studies and Examples",
      "Film Management",
      "Planning and Supporting Functions",
      "Secrets and personal experiences",
    ],
    studentCount: "1800+",
    faqs: [
      {
        question: "Who is this class for?",
        answer: "This class acts as a guide for an aspiring photographer.",
      },
      {
        question: "I'm an Intermediate/Professional Photographer, would I benefit from this?",
        answer:
          "In this course, Venket Ram shares his professional experiences as a photographer, rather than teach a photography course with established guidelines and instructions. He believes that this is a better way to understand photography concepts, so that you can build your own style and perspective, using his processes as inspiration.",
      },
      {
        question: "What do I need to learn from this class?",
        answer:
          "The only prerequisite that you require for this class is the Passion to learn. You do not need any prior knowledge of photography. Oh, and you definitely do need a Device with an Internet connection and a few hours to spare!",
      },
      {
        question: "Will G. Venket Ram be teaching the Class?",
        answer:
          "Yes, G. Venket Ram will be teaching all the lessons in the Class. However, the lessons will be recorded & will not have or involve any live sessions/interactions.",
      },
      {
        question: "Which Language is the course in?",
        answer: "This course is in Tamil and English with English Subtitles.",
      },
      {
        question: "Are there any recurring costs that I need to pay to access the videos?",
        answer:
          "There are no recurring costs or any additional charge that you need to pay after purchasing the Learning experience.",
      },
      {
        question: "How long is the Class?",
        answer:
          "The Class is approximately 190 minutes long and is divided into 25 Video Lessons.",
      },
      {
        question: "When do I get to download the customised signed certificate?",
        answer:
          "You get to access the certificate once you complete watching all the lessons in the course.",
      },
      {
        question: "Where can I watch these classes?",
        answer:
          "You can access classes on mobile by downloading the LevelUp Learning App for Android and iOS devices.",
      },
    ],
    price: 499,
    originalPrice: 2999,
    currency: "₹",
    ctaLink: "https://study.leveluplearning.in/l/6eefb60912",
    ctaText: "SUBSCRIBE FOR ₹499",
    seo: {
      title: "G Venket Ram Photography Masterclass | LevelUp Learning",
      description:
        "Learn photography from G Venket Ram — India's most celebrated portrait photographer. Master lighting, composition, post-processing and more in this in-depth masterclass.",
    },
  },
};
