import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import testimonial6 from "@/assets/testimonial-6.jpg";
import testimonial7 from "@/assets/testimonial-7.jpg";
import testimonial8 from "@/assets/testimonial-8.jpg";

export type Program =
  | "All"
  | "Masterclasses"
  | "BFP"
  | "Video Editing"
  | "UI/UX"
  | "Screenwriting"
  | "The Forge";

export interface Testimonial {
  image: string;
  name: string;
  role: string;
  context: string;
  program: Program;
  rating: number;
  pullQuote: string;
  fullStory: string;
}

export const PROGRAMS: Program[] = [
  "All",
  "Masterclasses",
  "BFP",
  "Video Editing",
  "UI/UX",
  "Screenwriting",
  "The Forge",
];

export const testimonials: Testimonial[] = [
  {
    image: testimonial1,
    name: "Janani",
    role: "Director",
    context: "Enrolled in the Direction Masterclass",
    program: "Masterclasses",
    rating: 5,
    pullQuote:
      "I was blown away by the depth of knowledge shared. The instructors were passionate and experienced, providing valuable insights into the art of filmmaking.",
    fullStory:
      "Before joining LevelUp, I had been dabbling with short films for two years, feeling stuck and unsure of how to take my work to the next level. The Direction Masterclass completely changed how I think about storytelling and visual language. From the very first session, I realised I had been approaching scenes from the wrong angle — focusing too much on action and too little on emotion. The instructors broke down complex concepts like blocking, shot composition, and actor direction into frameworks I could immediately apply on set. What surprised me most was the feedback culture — every assignment was dissected with care and specificity, not just generic praise. I started getting callbacks for projects I submitted after the course. Within six months, I directed my first commissioned short for a regional streaming platform. The community that LevelUp built around the course was equally invaluable — I connected with cinematographers, writers, and producers who I continue to collaborate with today. If you're serious about directing, this isn't just a course — it's a career turning point. I recommend it to anyone who wants to move from aspiring to actually working in the industry.",
  },
  {
    image: testimonial2,
    name: "Karthik",
    role: "Filmmaker",
    context: "Took the Filmmaking Masterclass",
    program: "Masterclasses",
    rating: 5,
    pullQuote:
      "LevelUp Learning's Filmmaking Masterclass is a game-changer. The course content is comprehensive, covering every aspect of filmmaking.",
    fullStory:
      "I came into the Filmmaking Masterclass with a basic understanding of cameras and editing software, but no real grasp of how films actually get made from start to finish. The course bridged that gap completely. We covered everything — from scriptwriting fundamentals and pre-production planning to on-set etiquette and post-production workflows. What stood out was how each module connected to the next. By the time we got to the editing sessions, I understood why certain decisions had been made on the shoot, and vice versa. The guest sessions with working industry professionals gave me an honest picture of what the job actually looks like day-to-day. I stopped romanticising filmmaking and started treating it as a craft with learnable skills. After completing the course, I co-directed a documentary that was screened at a local film festival — something I would never have had the confidence to pursue before. The structured learning path, combined with real-world assignments, made the experience both rigorous and deeply engaging. LevelUp doesn't just teach you to make films. It teaches you to think like a filmmaker, and that shift in mindset has been the most valuable thing I have taken away.",
  },
  {
    image: testimonial4,
    name: "Kishore",
    role: "Photographer",
    context: "Enrolled in the Photography Masterclass",
    program: "Masterclasses",
    rating: 5,
    pullQuote:
      "LevelUp elevated my skills to a professional level. I particularly liked the emphasis on storytelling through photographs.",
    fullStory:
      "Photography had always been a weekend hobby for me — something I did to decompress from my nine-to-five. After years of posting on Instagram without any real growth or understanding of why certain images worked and others didn't, I decided to invest in the Photography Masterclass. The transformation was immediate. The very first module on light — how to read it, how to use it, and when to fight it — rewired how I see every environment I walk into. The sessions on composition went far beyond the rule of thirds that you find in every free tutorial. We discussed visual weight, leading lines in context, and how the human eye naturally moves through a frame. The emphasis on narrative — building a story within a single still image — was something I hadn't encountered before and it completely changed my approach to portrait and street photography. By the end of the course, I had a portfolio I was genuinely proud of. I started getting freelance inquiries within weeks of sharing the work. The instructors were accessible, thoughtful, and clearly invested in each student's individual growth. LevelUp gave me the technical confidence and the creative vocabulary to call myself a photographer with conviction.",
  },
  {
    image: testimonial8,
    name: "Avantika Sharma",
    role: "Filmmaker",
    context: "BFP Live Program participant",
    program: "BFP",
    rating: 5,
    pullQuote:
      "Dedicated and focused teachers, present in the moment. This really blurs the online/offline divide and makes it feel like a community.",
    fullStory:
      "I was initially sceptical about a live online filmmaking program — my previous experience with virtual learning had been passive and isolating. The BFP Live Program at LevelUp was nothing like that. From the first session, the energy was collaborative and the instructors were genuinely present, not just reading from slides. Every class felt like a real workshop, with live feedback, group critiques, and spontaneous conversations that went far beyond the scheduled agenda. The program pushed me to make work consistently — short exercises, rapid assignments, and a final project that required real commitment. The accountability of a cohort was something I hadn't expected to value so much, but it made all the difference. Having peers who were at similar stages of their journey, facing the same creative and technical challenges, made the experience feel less lonely and far more dynamic. By the end of the program, I had a short film I was proud enough to submit to festivals. Two of my classmates have since become long-term collaborators. The live format truly erases the distance — I felt as connected to my instructors and peers as I would have in a physical classroom, sometimes even more so.",
  },
  {
    image: testimonial4,
    name: "Michael V",
    role: "Engineering Student",
    context: "BFP Live Program participant",
    program: "BFP",
    rating: 5,
    pullQuote:
      "It was great learning filmmaking from the scratch. Many processes of films make more sense now after the sessions with industry mentors.",
    fullStory:
      "As an engineering student with zero formal background in film, I was nervous about joining the BFP Live Program. I had a passion for cinema but felt like I was missing a foundational vocabulary that everyone else seemed to already have. From the very first week, that anxiety disappeared. The program was built for people like me — curious, motivated, but starting from the beginning. The mentors were patient and specific in a way that made complex concepts approachable without ever feeling dumbed down. Understanding how a script becomes a shot list, how a shot list becomes a shooting schedule, and how that schedule shapes the final film gave me a clarity I had never had before. I started watching films completely differently — noticing choices I had always felt subconsciously but couldn't name. The industry mentor sessions were particularly revelatory. Hearing real accounts of how productions are structured, how decisions get made under pressure, and how the business side of filmmaking works alongside the creative side was invaluable context. I'm now developing my first short film as a writer-director. I never imagined saying that a year ago. LevelUp made it feel not just possible but inevitable.",
  },
  {
    image: testimonial5,
    name: "Priya Menon",
    role: "Content Creator",
    context: "Took the Video Editing Bootcamp",
    program: "Video Editing",
    rating: 5,
    pullQuote:
      "The editing bootcamp turned my hobby into a paying career. I went from basic cuts to professional-grade edits in just eight weeks.",
    fullStory:
      "I had been editing YouTube videos for my channel for about a year, but everything I knew was self-taught from random tutorials. The Video Editing Bootcamp at LevelUp gave me a structured foundation that filled in all the gaps I didn't even know I had. We covered pacing, rhythm, colour grading, sound design, and the psychology behind why certain edits work emotionally. The hands-on assignments were challenging — each week built on the last, and by the end I had a reel that looked nothing like the work I was producing before. What I valued most was the instructor feedback on timing and storytelling. Editing isn't just about software skills; it's about understanding narrative flow, and that was drilled into every exercise. Within a month of completing the bootcamp, I landed my first freelance gig editing for a brand's social content. The confidence I gained was as valuable as the technical skills.",
  },
  {
    image: testimonial6,
    name: "Rahul Deshmukh",
    role: "Screenwriter",
    context: "Completed the Screenwriting Program",
    program: "Screenwriting",
    rating: 5,
    pullQuote:
      "This program gave me the discipline and structure I needed. I finally finished my first feature-length script after years of starting and stopping.",
    fullStory:
      "I had been trying to write a feature screenplay for three years. I'd start strong, get to page thirty, lose momentum, and abandon it. The Screenwriting Program at LevelUp broke that cycle completely. The weekly deadlines, peer reviews, and mentor check-ins created an accountability structure I couldn't have built on my own. We studied story architecture, character development, dialogue, and subtext through the lens of both Western and Indian cinema, which gave me a richer understanding of narrative traditions. The most transformative module was on rewriting — learning to treat your first draft as raw material rather than a finished product. By the end of the program, I had a completed 110-page script that had been through three drafts. More importantly, I had a writing process I could replicate. I've since started my second screenplay with a clarity of method I never had before. The mentors were working screenwriters who understood the Indian industry landscape, which made their advice immediately actionable.",
  },
  {
    image: testimonial7,
    name: "Sneha Iyer",
    role: "UX Designer",
    context: "Enrolled in the UI/UX Live Cohort",
    program: "UI/UX",
    rating: 5,
    pullQuote:
      "The UI/UX cohort was intense, practical, and exactly what I needed to transition from graphic design to product design.",
    fullStory:
      "I had been working as a graphic designer for four years and wanted to transition into product design, but I didn't know where to start. The UI/UX Live Cohort at LevelUp was the bridge I needed. The program covered user research, wireframing, prototyping, design systems, and usability testing — all through live sessions with real-time feedback. What set it apart from self-paced courses I'd tried before was the cohort structure. Working alongside other designers, reviewing each other's work, and presenting to the group every week pushed me far beyond my comfort zone. The capstone project required us to design a full product from research to high-fidelity prototype, and the mentors treated it like a real client engagement. By the end, I had a case study portfolio piece that directly led to interviews. I landed a junior product designer role within two months of completing the program. The instructors were generous with their time and genuinely invested in each student's career trajectory.",
  },
  {
    image: testimonial2,
    name: "Arjun Nair",
    role: "Aspiring Director",
    context: "The Forge — Creators Track",
    program: "The Forge",
    rating: 5,
    pullQuote:
      "The Forge pushed me harder than any program I've done. The mentorship was intense, personal, and exactly what I needed to level up.",
    fullStory:
      "The Forge is not a course — it's a crucible. I joined the Creators Track expecting structured lessons, but what I got was something far more valuable: personalised mentorship that forced me to confront my creative weaknesses head-on. Each week, I had to produce work, present it, and defend my creative choices to mentors who were working professionals. There was no hiding behind theory. The program demanded output, and that pressure was transformative. I learned more about my own creative voice in twelve weeks than I had in the previous three years of self-directed study. The peer group was equally important — everyone in The Forge was serious, motivated, and willing to give honest feedback. By the end, I had a short film, a development document for a web series, and a network of collaborators I trust. If you're looking for comfort, this isn't the program for you. But if you want genuine creative growth, The Forge delivers.",
  },
  {
    image: testimonial1,
    name: "Divya Rajan",
    role: "Video Editor",
    context: "Took the Video Editing Bootcamp",
    program: "Video Editing",
    rating: 5,
    pullQuote:
      "I went from knowing only the basics of Premiere Pro to confidently delivering client projects. The bootcamp was worth every rupee.",
    fullStory:
      "Before the Video Editing Bootcamp, I could do basic cuts and transitions but had no understanding of pacing, colour theory, or audio mixing. The program changed that completely. Each module was designed to build on the last — we started with the fundamentals of timeline management and progressed to advanced techniques like multicam editing, motion graphics integration, and colour grading workflows. The instructors didn't just teach software; they taught editorial thinking. Understanding why you make a cut at a specific frame, how music and visuals create emotional rhythm together, and how to manage client feedback without losing creative integrity — these were lessons I couldn't have learned from YouTube tutorials. The final project required us to edit a short film from raw footage, and the process of receiving detailed notes and revising was exactly like a professional workflow. I now work as a freelance editor with three regular clients, and I attribute that directly to the confidence and skill the bootcamp gave me.",
  },
  {
    image: testimonial8,
    name: "Meera Krishnan",
    role: "Design Student",
    context: "Enrolled in the UI/UX Live Cohort",
    program: "UI/UX",
    rating: 5,
    pullQuote:
      "The live cohort format was perfect — real deadlines, real feedback, and a community that kept me accountable throughout.",
    fullStory:
      "As a final-year design student, I had theoretical knowledge but no practical portfolio to show for it. The UI/UX Live Cohort changed that. Every week, we had deliverables — user personas, journey maps, wireframes, prototypes — each reviewed live by mentors with industry experience. The feedback was specific and actionable, not the vague encouragement I was used to in academic settings. The cohort of fifteen students became a tight-knit group; we shared resources, critiqued each other's work honestly, and celebrated each other's progress. The capstone project — redesigning a real product's onboarding flow — gave me a portfolio piece that I'm genuinely proud to present. The career support sessions on building a design portfolio and preparing for interviews were an unexpected bonus. I graduated with a job offer in hand, largely because of the work I produced during this program.",
  },
  {
    image: testimonial5,
    name: "Vikram Shetty",
    role: "Writer & Filmmaker",
    context: "Completed the Screenwriting Program",
    program: "Screenwriting",
    rating: 5,
    pullQuote:
      "The screenwriting program taught me that writing is rewriting. That single lesson transformed my entire creative process.",
    fullStory:
      "I had always considered myself a writer, but I had never actually finished anything longer than a short script. The Screenwriting Program at LevelUp forced me to commit to a feature-length screenplay from outline to polished draft. The structured approach — beat sheets, treatment documents, scene-by-scene outlines before any pages — was initially frustrating for someone who preferred to write intuitively. But it worked. By the time I sat down to write actual scenes, I knew exactly where each one was heading, and the writing flowed in a way it never had before. The peer workshop sessions were invaluable; reading my work aloud and hearing immediate reactions taught me more about dialogue than any book could. The mentors — both working in Indian cinema — provided context about the industry that helped me understand what producers actually look for in a script. I completed a 105-page screenplay that I'm now developing further. The discipline and craft I learned in this program will stay with me for every project I write.",
  },
];
