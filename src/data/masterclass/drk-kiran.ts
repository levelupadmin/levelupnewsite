import kiranImg from "@/assets/drk-kiran.webp";
import kiranHeroDesktop from "@/assets/drk-kiran-hero-desktop.png";
import kiranHeroMobile from "@/assets/drk-kiran-hero-mobile.png";
import kiranCertificate from "@/assets/drk-kiran-certificate.png";
import doctorPoster from "@/assets/portfolio/doctor-poster.png";
import beastPoster from "@/assets/portfolio/beast-poster.png";
import jailerPoster from "@/assets/portfolio/jailer-poster.png";
import naanumRowdyPoster from "@/assets/portfolio/naanum-rowdy-dhaan-poster.png";
import threePoster from "@/assets/portfolio/3-poster.png";
import tskPoster from "@/assets/portfolio/thaanaa-serndha-koottam-poster.png";
import aranmanaiPoster from "@/assets/portfolio/aranmanai-poster.png";
import type { MasterclassPageData } from "./types";

const data: MasterclassPageData = {
  slug: "drk-kiran",
  name: "DRK Kiran",
  nameUpper: "DRK KIRAN",
  title: "Teaches Art Direction",
  discipline: "Art Direction",
  heroImage: kiranImg,
  heroBgImage: kiranHeroMobile,
  heroDesktopBg: kiranHeroDesktop,
  heroDesktopObjectPosition: "center center",
  portraitImage: kiranImg,
  certificateImage: kiranCertificate,
  pricingImage: kiranHeroDesktop,
  pullQuote:
    "\"An art director expresses his vision through sets and properties\"",
  courseDescription:
    "Welcome to DRK Kiran's Art Direction Masterclass, where you'll explore the essentials of art direction through his real-life case studies from the movies he has worked on. Learn how to think fast on set, master set designing, solve creative problems, and use miniatures to make stunning designs.",
  courseDetails: {
    chapters: 20,
    duration: "3h 20m",
    level: "All Levels",
    language: "Tamil & English",
    access: "Lifetime Access",
  },
  trailerUrl: "https://www.youtube.com/embed/5qnuEq10Xjg",
  trailerEmbedUrl: "https://www.youtube.com/embed/5qnuEq10Xjg?rel=0&controls=1&autoplay=0&mute=0",
  lessons: [
    { number: 1, title: "The Art of Adaptation: Understanding On-Set Challenges", description: "In this very first episode, Kiran talks about various last minute challenges on set, further gives insights on how to deal with them spontaneously along with case studies from the movie Anegan." },
    { number: 2, title: "Seeing Beyond the Frame: The Art of Observation", description: "Learn the art of keen observation that is crucial for art direction. Discover how art directors define and guide visual style, design and overall aesthetics across diverse mediums." },
    { number: 3, title: "From Concept to Creation: Learning Set Design and Props", description: "Learn the differences between a Production Designer and an Art Director while diving into the captivating world of set designing and props involved in art direction." },
    { number: 4, title: "Cultivating Creative Leadership: Mentoring Assistant Art Directors", description: "Kiran talks about essential leadership skills necessary for both an art director and their assistant to achieve desired outcomes, and effective approaches for managing and mentoring assistants." },
    { number: 5, title: "Time Management and Critical Thinking for Art Directors", description: "Discover the pivotal role of time management in art direction and cultivate critical thinking amidst sudden shoot challenges. Learn the art of effective creative decision-making under pressure." },
    { number: 6, title: "Understanding the Power of Effective Communication", description: "Discover vital communication skills for achieving desired outcomes in film production as Kiran employs the movie Anegan as an example for effective communication techniques with directors and collaborators." },
    { number: 7, title: "Visualizing Personality: When Art Direction and Story Converge", description: "Discover why an art director's understanding of the plot is vital. Explore how merging storytelling nuances with artistic visuals enables the portrayal of characters' preferences, forging a stronger audience connection." },
    { number: 8, title: "From Blueprint to Big Screen: Pre-vis, Set Design, and Miniatures", description: "Experience the fusion of Pre-visualisation, Set Designing, and Miniature Artistry in storytelling. Discover scene visualization, set craftsmanship, and the magic of miniatures." },
    { number: 9, title: "Constructing Cinematic Worlds: A Deep Dive into Set Design", description: "Delve into the intricacies of set designing and the vital role of set designers. Explore the art of constructing sets and discover essential pre-construction factors that shape captivating visual narratives." },
    { number: 10, title: "Set Design Strategies: Using Characters to Shape Interiors", description: "Explore character-driven interiors, prop-based character development, and design's role in narrative. Elevate your visual storytelling with expert insights." },
    { number: 11, title: "Revealing the Art of Location Scouting", description: "Discover how selecting the right locations can make movies look authentic. Understand how the story guides these choices and how the director, cameraman, and art director collaborate through location scouting." },
    { number: 12, title: "The Power of Miniature Artistry: Elevating Set Design", description: "Explore a miniature's role in art direction, delve into collaborative cinematographer partnerships for set previsualization, and gain insights from the movie Kaappaan as a case study." },
    { number: 13, title: "Song Case Study - 'Ko': Art Direction and VFX Collaboration", description: "Discover how art and visual effects work together in movies. Explore their roles and teamwork, illustrated with a real example from a movie song." },
    { number: 14, title: "Decoding the Dynamic Duo of Art Director and Cinematographer", description: "Explore the collaboration of art directors and cinematographers in crafting cinematic brilliance. Uncover their roles in set design, color aesthetics, lighting, and atmosphere for captivating visual storytelling." },
    { number: 15, title: "Behind the Scenes of Thaana Serndha Kootam", description: "Dive into the making of 'Thaana Serndha Kootam' as Kiran unravels the fusion of physical and digital set design, offering insights into the collaborative process and CG integration." },
    { number: 16, title: "Time Travel Through Design: Crafting Authenticity with Props", description: "Explore the magic behind 'Thaana Serndha Kootam' as our Art Director unveils the art of reviving 80's aesthetics. Learn how authentic props, vintage vehicles, and expert CG work combined to recreate the era." },
    { number: 17, title: "Designing Nostalgia: Recreating the 80's Aesthetics", description: "Discover the artful recreation of a 80's jewellery shop interior. Unveil the era's charm through actress posters, vintage telephones, and jewellery, expertly designed to relive the past." },
    { number: 18, title: "Precision in Perspective: The Art Director's Guide to Details", description: "Learn why researching is crucial for creating old-style sets, hear how childhood observation skills turned into a career, and understand the importance of paying close attention to tiny details." },
    { number: 19, title: "Observational Mastery: Recreating the Prime Minister's Office", description: "Delve into the art director's world through a movie case study. Discover how observation led to crafting the Prime Minister's office in Kaappaan and garnered directorial praise." },
    { number: 20, title: "Small Scene, Big Impact: The Significance of Details", description: "Uncover the essence of cinematic mastery in the finale. Explore the significance of detail through a scene, and understand how even the smallest moments demand careful attention." },
  ],
  portfolioHeadline: "Learn from the Art Director Behind these Films",
  showPortfolio: true,
  portfolioImages: [doctorPoster, beastPoster, jailerPoster, naanumRowdyPoster, threePoster, tskPoster, aranmanaiPoster],
  portfolioDisplayImages: [doctorPoster, beastPoster, jailerPoster, naanumRowdyPoster, threePoster, tskPoster, aranmanaiPoster],
  audienceTargets: [
    { label: "Art Directors" },
    { label: "Filmmakers" },
    { label: "Set Directors" },
    { label: "Cinema Aspirants" },
    { label: "Art Direction Aspirants" },
    { label: "Film Enthusiasts" },
  ],
  valueProps: [
    {
      title: "Explore the fundamentals of art direction through real-life case studies",
      description: "This masterclass is invaluable as it offers a captivating insight into the intricacies and nuances of art direction, allowing for a fresh and inspiring perspective.",
      videoUrl: "https://uploads-ssl.webflow.com/649fbe7d7f61c6fc912e1d33/650ad4d0d7a560833f64faef_podacast-transcode.mp4",
    },
    {
      title: "Develop the ability to think spontaneously on the shooting spot",
      description: "This masterclass is perfect because it allows you to delve into scene analysis through the Instructor's enlightening case studies.",
      videoUrl: "https://uploads-ssl.webflow.com/649fbe7d7f61c6fc912e1d33/64d1dd39b63687bac0a5c673_kiran-2-transcode.mp4",
    },
    {
      title: "Learn how to effectively utilize miniatures to create realistic set designs",
      description: "Dive into the intricacies of scriptwriting, actor collaboration, music and sound, storyboarding, and more, to enhance your scene analysis prowess.",
      videoUrl: "https://uploads-ssl.webflow.com/649fbe7d7f61c6fc912e1d33/64d1dd7decb0cb6a993585f9_kiran-3-1-transcode.mp4",
    },
  ],
  certificatePoints: [
    "Showcase your Certificate on social media",
    "Download or print out as PDF to share with others",
    "Share as image online to demonstrate your skill",
  ],
  testimonials: [
    {
      name: "Edwin",
      role: "Actor",
      quote: "Kiran's Art Direction course at Level Up Learning was a game-changer for me. His deep industry insights and practical guidance helped me refine my creative vision and elevate my artistic skills to a whole new level. I'm now confident in my ability to create impactful and visually stunning designs.",
    },
    {
      name: "Monika",
      role: "Theater Artist",
      quote: "Kiran's Art Direction course exceeded all my expectations. His in-depth knowledge of the industry combined with his teaching prowess made every session insightful and enjoyable. The practical exercises challenged me to think outside the box and apply art direction principles in real-world scenarios.",
    },
    {
      name: "Avinash",
      role: "Director",
      quote: "Kiran's Art Direction course is a gem for anyone seeking to master the art of visual storytelling. His expertise shines through in every module, and the course content is tailored to provide a holistic understanding of art direction. Kiran's insightful critiques helped me develop a keen eye for detail and design aesthetics.",
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
  pricingCardHeadline: "Learn from the Ace Art Director",
  studentCount: "1800+",
  faqs: [
    { question: "What can I expect to gain from DRK Kiran's Art Direction Masterclass?", answer: "This masterclass offers a comprehensive exploration of art direction through real-life case studies, covering essential aspects like quick decision-making on set, set designing mastery, creative problem-solving, and using miniatures for captivating designs." },
    { question: "Why should I choose an online pre-recorded masterclass?", answer: "An online pre-recorded format allows you to learn at your own pace and convenience. You can revisit lessons, pause and replay segments, ensuring a thorough understanding of the content." },
    { question: "Who is this masterclass suitable for?", answer: "This masterclass is ideal for aspiring filmmakers, art enthusiasts, and anyone intrigued by the world of art direction in filmmaking. It caters to various skill levels, offering valuable insights regardless of prior experience." },
    { question: "How do I access the certificate upon completing the masterclass?", answer: "You get to access the certificate once you complete watching all the lessons in the course." },
    { question: "What mediums can I use to access the masterclass content?", answer: "The masterclass content can typically be accessed through various mediums, including laptops, desktop computers, tablets, and smartphones. This flexibility allows you to learn from the device that suits you best." },
    { question: "Can I access the masterclass content offline?", answer: "While the content is typically designed for online streaming, it cannot be downloaded. However you can enjoy the flexibility of viewing it at your own pace." },
    { question: "Is there a specific timeframe to complete the masterclass?", answer: "Generally, online pre-recorded masterclasses offer the advantage of flexibility. You can choose your own pace and schedule, allowing you to complete the course based on your availability." },
    { question: "How does this masterclass cover practical application of art direction concepts?", answer: "The real-life case studies from movies that DRK Kiran has worked on provide practical insights into applying art direction principles in actual filmmaking scenarios. This bridges the gap between theory and practice." },
    { question: "Why is the use of miniatures emphasized in this masterclass?", answer: "The masterclass explores the creative potential of using miniatures in art direction. Learning about this unique technique can add depth and innovation to your visual storytelling skills." },
  ],
  price: 999,
  originalPrice: 2999,
  currency: "₹",
  ctaLink: "https://study.leveluplearning.in/web/checkout/64e7670a1e642660e96fc8e9",
  ctaText: "BUY FOR ₹999",
  seo: {
    title: "DRK Kiran Art Direction Masterclass | LevelUp Learning",
    description: "Learn art direction from DRK Kiran. Master set designing, creative problem-solving, miniatures and more through real-life case studies from blockbuster films.",
  },
};

export default data;
