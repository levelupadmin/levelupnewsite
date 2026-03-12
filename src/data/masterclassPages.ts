import venketImg from "@/assets/venket-ram.png";
import anthonyImg from "@/assets/anthony-gonsalvez.png";
import anthonyHeroBg from "@/assets/anthony-hero-bg.png";
import anthonyCertificate from "@/assets/anthony-certificate.png";
import anthonyPricing from "@/assets/anthony-pricing.png";
import testimonialLisa from "@/assets/testimonial-lisa.png";
import testimonialPrathyaksh from "@/assets/testimonial-prathyaksh.png";
import testimonialJanani from "@/assets/testimonial-janani.png";
import testimonialHarita from "@/assets/testimonial-harita.png";
import testimonialShalini from "@/assets/testimonial-shalini.png";
import testimonialJagadeesh from "@/assets/testimonial-jagadeesh.png";
import gvrHeroBg from "@/assets/gvr-hero-bg.png";
import gvrCertificate from "@/assets/gvr-certificate.png";

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

export const masterclassPages: Record<string, MasterclassPageData> = {
  "g-venket-ram": {
    slug: "g-venket-ram",
    name: "G Venket Ram",
    nameUpper: "G VENKET RAM",
    title: "Teaches Photography",
    discipline: "Photography",
    heroImage: venketImg,
    heroBgImage: gvrHeroBg,
    portraitImage: venketImg,
    certificateImage: gvrCertificate,
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
    trailerEmbedUrl: "https://www.youtube.com/embed/j8bJXiHLmmE?si=PbebiugOjIA1wzk3",
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
    showPortfolio: true,
    audienceTargets: [
      { label: "Model Photographers" },
      { label: "Cinematographers" },
      { label: "Food Photographers" },
      { label: "Wildlife Photographers" },
      { label: "Cinephiles" },
      { label: "Cinema Aspirants" },
    ],
    valueProps: [
      {
        title: "Learn essential lighting techniques you need for photography",
        description:
          "This masterclass is invaluable as it offers a captivating insight into the intricacies and nuances of photography, allowing for a fresh and inspiring perspective. Elevate your photography skill by understanding essential techniques, settings, and principles.",
        videoUrl: "/videos/gvr-why-1.webm",
      },
      {
        title: "Dive into the intricacies of scriptwriting, actor collaboration, music and sound, storyboarding, and more",
        description:
          "This masterclass is perfect because it allows you to delve into scene analysis through the Instructor's enlightening case studies.",
        videoUrl: "/videos/gvr-why-2.webm",
      },
      {
        title: "Understand the necessity of thorough preproduction and detailing before photoshoot",
        description:
          "Learn why the best photographs are made before the camera clicks — from mood boards and creative direction to working with subjects.",
        videoUrl: "/videos/gvr-why-3.webm",
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
        image: testimonialJanani,
        quote:
          "If you want to elevate your photography skills, Venket Ram's course is the way to go. His expertise and the diverse range of case studies are eye-opening. I learned so much about lighting, composition, and finding my own photographic voice. This course is a must for anyone serious about photography!",
      },
      {
        name: "Prathyaksh",
        role: "Director",
        image: testimonialPrathyaksh,
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
    pricingCardHeadline: "Learn from an Award-Winning Cinematic Photographer",
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
    ctaLink: "https://study.leveluplearning.in/web/checkout/631f6d223938790196fb7a31",
    ctaText: "BUY NOW AT ₹ 2499",
    seo: {
      title: "G Venket Ram Photography Masterclass | LevelUp Learning",
      description:
        "Learn photography from G Venket Ram — India's most celebrated portrait photographer. Master lighting, composition, post-processing and more in this in-depth masterclass.",
    },
  },

  "anthony-gonsalvez": {
    slug: "anthony-gonsalvez",
    name: "Anthony Gonsalvez",
    nameUpper: "ANTHONY GONSALVEZ",
    title: "Teaches Film Editing",
    discipline: "Film Editing",
    heroImage: anthonyImg,
    heroBgImage: anthonyHeroBg,
    portraitImage: anthonyImg,
    certificateImage: anthonyCertificate,
    pricingImage: anthonyPricing,
    pullQuote:
      "\"If you think you need a high spec system to be a great editor, you're lying to yourself.\"",
    courseDescription:
      "In his first-ever online editing class, the Award winning Film Editor teaches his approach, in an all out practical experience. Watch him edit an entire short film right in front of you as he explains the complexities and the basics. Most importantly, his tips, tricks and techniques on how to edit like a pro.",
    courseDetails: {
      chapters: 19,
      duration: "4h 2m",
      level: "All Levels",
      language: "English",
      access: "Lifetime Access",
    },
    trailerUrl: "https://www.youtube.com/embed/aVYjvyB28U4",
    trailerEmbedUrl: "https://www.youtube.com/embed/aVYjvyB28U4?rel=0&controls=1&autoplay=0&mute=0",
    lessons: [
      { number: 1, title: "Introduction", description: "In his first-ever online editing class, the Award-winning Film Editor teaches his approach, in an all-out practical experience. Watch him edit an entire short film right in front of you as he explains the complexities and the basics. Most importantly, his tips, tricks and techniques on how to edit like a pro." },
      { number: 2, title: "Beginnings & Inspirations", description: "Anthony tells us about his journey to becoming an editor, from admiring the work of other editors to sharing his own experiences with us. He emphasizes the importance of trial and error in developing a good sense of what works and what doesn't in different situations." },
      { number: 3, title: "First Projects", description: "Anthony demonstrates how to edit in a variety of formats by showing us shortcuts on the keyboard and the distinctions between film editing and commercial editing. He also explains how to make good choices depending on the allotted time." },
      { number: 4, title: "Editorial Planning and Responsibility: Key Aspects of the Editor's Job", description: "Anthony elucidates the role of editing in movies, from choosing suitable clips to editing them to accurately convey the emotions of the scene. He also covers why it is important to decide on a rough cut and trim." },
      { number: 5, title: "Introduction to Film Editing: Setting up Your Workflow", description: "Anthony outlines the process of beginning to use the necessary editing software. He provides a brief guide to help people get started with editing." },
      { number: 6, title: "Maximizing the Value of Rushes: From Setup to Analysis", description: "Anthony breaks down the process of mastering editing with Avid Media Composer, which gives filmmakers the opportunity to bring their creative visions to life without any limitations. This ranges from creating a project to identifying suitable audio effects and attractive visuals to implement." },
      { number: 7, title: "Make the Right Choice: Choosing the best take", description: "Anthony describes how to pick the ideal slot for an attention-grabbing sequence. He encourages us to select our own way of adding a marker to some footage. Look into the details of the sequence to come up with a process where a marker is required." },
      { number: 8, title: "Working with Footage: Importing and Organizing Your Media", description: "In this episode, Anthony discusses the benefits of returning to a project one is editing multiple times. He tells readers to be familiar with the main points of the material in order to make a consistent narrative, using keyboard shortcuts when editing for a fluid progression." },
      { number: 9, title: "Making The Most Of Keyboard Shortcuts", description: "Anthony goes into detail regarding the fundamentals of Avid's media composer; such as the keyboard shortcuts for inserting clips, relocating them between different modes, and becoming more productive with the editing process." },
      { number: 10, title: "Creating a Cohesive Story: Structuring and Pacing Your Film", description: "Anthony creates a preliminary edit based on the evaluation of the performance, cutting out certain clips and eliminating any segments that are not necessary. He develops a customized board to make activities more understandable. He also makes sure to take away any pieces that should not be included in the context. He organizes the components to generate interest among the viewers." },
      { number: 11, title: "Send us your Rough cut!", description: "Anthony encourages us to take advantage of the chance to have a look by submitting rough drafts to teamanthony@leveluplearning.in." },
      { number: 12, title: "Fine-Tuning Your Edit", description: "Trimming, Splicing, Stylizing, and Assembling Your Film - Anthony notes that once the rough edit of a project has been finalized, it is crucial to examine the material several times. He then outlines some easy ways to cut unnecessary scenes and speed up the pace of your film. When you add music, the result will be more dynamic." },
      { number: 13, title: "Mastering Transitions and Cuts to Tell A Story", description: "This episode will provide an overview of the different trimming techniques used in editing, such as L cut and J cut, Jumpcut, Cross-Cutting, Cutaway, Match Cut, Cutting on Action, Montage, and how they can be used to improve the narrative." },
      { number: 14, title: "Exporting and Delivering Your Film: Preparing for Distribution", description: "In this episode, we'll discuss how changes made to the sound and video departments are exported. Additionally, we can choose a compatible video format so that only the in and out points marked will be included when exporting the sequence." },
      { number: 15, title: "Important qualities to being an Editor", description: "Anthony emphasizes the importance of making sure your work is flawless. The editor must have confidence in their ability to make good suggestions, have plenty of experience, and be patient." },
      { number: 16, title: "Collaborating with Your Director: Maintaining a Creative Partnership", description: "Anthony stresses the importance of a strong connection between the Director and Editor in order to achieve the desired vision on the screen. They must maintain a good relationship to ensure the final product is up to expectations. It is vital that they are in complete agreement and work together in a productive way." },
      { number: 17, title: "Breaking into the Industry: Tips and Strategies for Success as a Film Editor", description: "Anthony states that it takes time to acquire the ability to edit sense, and it gets more comprehensive as one advances. He tells us to Use the chances to develop and refine our approaches to make everything faster and easier. He also tells us to Utilize our skills and talents to acquire bigger chances to explore more and collaborate with new directors." },
      { number: 18, title: "Know Your Audience!", description: "Anthony explains how viewers from different areas respond to a particular scene. He emphasizes the importance of understanding the audience's point of view, saying that as an editor, one needs to comprehend when the audience would be inclined to clap or cheer about something and use it to their advantage." },
      { number: 19, title: "Send us your work!", description: "Anthony is hopeful that the practical session will provide participants with a worthwhile opportunity to learn more about editing. He encourages everyone to take advantage of this chance and come prepared with questions related to editing, so as to further their knowledge." },
    ],
    portfolioHeadline: "Learn from the Editor Behind these Films",
    showPortfolio: false,
    audienceTargets: [
      { label: "Film Editors" },
      { label: "Film Enthusiasts" },
      { label: "Freelancing Editors" },
      { label: "Aspiring Editors" },
      { label: "Filmmakers" },
      { label: "Cinema Aspirants" },
    ],
    valueProps: [
      {
        title: "Know how to Choose the best take from the Rushes",
        description:
          "This masterclass is invaluable as it offers a captivating insight into the intricacies and nuances of filmmaking, allowing for a fresh and inspiring perspective.",
        videoUrl: "https://uploads-ssl.webflow.com/649fbe7d7f61c6fc912e1d33/65053ea5a148878dfef47b2f_ag-1-transcode.mp4",
      },
      {
        title: "Understand when to use transitions and cuts",
        description:
          "This masterclass is perfect because it allows you to delve into scene analysis through the Instructor's enlightening case studies.",
        videoUrl: "https://uploads-ssl.webflow.com/649fbe7d7f61c6fc912e1d33/65053efba148878dfef4b7fb_ag-3-transcode.mp4",
      },
      {
        title: "Master the use of sounds to enhance your editing",
        description:
          "Dive into the intricacies of scriptwriting, actor collaboration, music and sound, storyboarding, and more, to enhance your scene analysis prowess.",
        videoUrl: "https://uploads-ssl.webflow.com/649fbe7d7f61c6fc912e1d33/65053ed859aeff2f476751b6_ag-2-transcode.mp4",
      },
    ],
    certificatePoints: [
      "Showcase your Certificate on social media",
      "Download or print out as PDF to share with others",
      "Share as image online to demonstrate your skill",
    ],
    testimonials: [
      {
        name: "Harita",
        role: "Actor",
        image: testimonialHarita,
        quote:
          "Anthony Gonsalvez's online editing class was an eye-opener! Watching a seasoned professional at work, explaining his every move, was invaluable. His approach blends artistry with technical finesse seamlessly. I feel equipped with the skills to edit like a pro now!",
      },
      {
        name: "Shalini",
        role: "Theater Artist",
        image: testimonialShalini,
        quote:
          "As a budding filmmaker, I couldn't have asked for a better mentor than Anthony Gonsalvez. His class was a masterclass in itself! The way he effortlessly maneuvered through the editing process, demystifying complexities, left me inspired and confident. This course is a game-changer!",
      },
      {
        name: "Jagadeesh",
        role: "Director",
        image: testimonialJagadeesh,
        quote:
          "Anthony Gonsalvez's course exceeded my expectations. His hands-on approach to teaching editing, along with the insights he shared, made it an unparalleled learning experience. I now approach editing with a newfound perspective, thanks to his expert guidance.",
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
    pricingCardHeadline: "Learn from an Award-Winning Film Editor",
    studentCount: "1800+",
    faqs: [
      {
        question: "Who is this class for?",
        answer: "This class is for anyone who has an interest in editing videos, short and feature films. This class acts as a guide for an aspiring editor to navigate the difficulties and intricacies of editing along with Tips and Tricks on how to go about the process in general.",
      },
      {
        question: "I'm an Intermediate/Professional Editor, would I benefit from this?",
        answer: "Yes. In the course Anthony Gonsalvez breaks down his process of editing and walks you through how he edits a scene with the footage provided.",
      },
      {
        question: "What do I need to learn from this class?",
        answer: "The only prerequisite that you require for this class is the Passion to learn. You do not need any prior knowledge of editing. Oh, and you definitely do need a Device with an Internet connection and a few hours to spare!",
      },
      {
        question: "Will Anthony Gonsalvez be teaching the Class?",
        answer: "Yes, Anthony Gonsalvez will be teaching all the lessons in the Class. However, the lessons will be recorded & will not have or involve any live sessions/interactions.",
      },
      {
        question: "Which Language is the course in?",
        answer: "This course is in English with English Subtitles.",
      },
      {
        question: "Are there any recurring costs that I need to pay to access the videos?",
        answer: "There are no recurring costs or any additional charge that you need to pay after purchasing the Learning experience.",
      },
      {
        question: "How long is the Class?",
        answer: "The Class is approximately 240 minutes long and is divided into 19 Video Lessons.",
      },
      {
        question: "When do I get to download the customised signed certificate?",
        answer: "You get to access the certificate once you complete watching all the lessons in the course.",
      },
      {
        question: "Where can I watch these classes?",
        answer: "You can access LevelUp Learning across various devices - Mobiles, Tablets, Desktops or Laptops. You can access classes on mobile by downloading the LevelUp Learning App for Android and iOS devices.",
      },
    ],
    price: 1999,
    originalPrice: 7999,
    currency: "₹",
    ctaLink: "https://study.leveluplearning.in/web/checkout/63bb56ee63f1437ecb2cb17c",
    ctaText: "BUY FOR ₹1999",
    seo: {
      title: "Anthony Gonsalvez Film Editing Masterclass | LevelUp Learning",
      description:
        "Learn film editing from Anthony Gonsalvez — Award-winning Film Editor. Master editing techniques, transitions, pacing and more in this hands-on practical masterclass.",
    },
  },
};
