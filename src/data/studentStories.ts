export interface StudentStory {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  targetKeywords: string[];
  h1: string;
  authorName: string;
  authorRole: string;
  location: string;
  rating: number;
  program: string;
  sections: { heading: string; body: string }[];
  ctaText: string;
  ctaProgram: string;
}

export const studentStories: StudentStory[] = [
  {
    slug: "from-construction-sites-to-cinema-kerala-worker-filmmaking",
    seoTitle: "From Construction Worker to Filmmaker: Akhil's Story | LevelUp Filmmaking Workshop Review",
    metaDescription: "How Akhil Billy Varghese went from working at construction sites in Kerala to pursuing his dream of film direction after attending LevelUp's online filmmaking workshop. Read his inspiring student journey.",
    targetKeywords: ["filmmaking workshop India", "online filmmaking course review", "LevelUp filmmaking workshop", "learn filmmaking online", "short film workshop for beginners", "filmmaking course Kerala"],
    h1: "From Construction Sites to Cinema: How a Kerala Worker Found His Path to Filmmaking",
    authorName: "Akhil Billy Varghese",
    authorRole: "Video Editor (formerly Construction Worker)",
    location: "Kerala, India",
    rating: 10,
    program: "Filmmaking",
    sections: [
      {
        heading: "A Dream Born on the Construction Site",
        body: "When Akhil Billy Varghese signed up for the LevelUp Filmmaking Workshop, he was working in construction — a physically demanding career far removed from the world of scripts, cameras, and storytelling. But somewhere beneath the concrete and rebar, a different kind of ambition was taking shape. Akhil dreamed of becoming a film director, of telling stories that would move people the way Indian cinema had always moved him."
      },
      {
        heading: "The Long Road from Manual Labour to Media",
        body: "The gap between a construction site and a film set can feel like an ocean. There are no obvious bridges, no clear pathways, no mentors handing you a camera and saying, \"Here, try this.\" Akhil had passion, but passion without direction is just restless energy. Step by step, he had already been building his way out — transitioning to a devotional channel production team, learning the basics of video editing on the job. It was progress, but it was also piecemeal — knowledge gathered in fragments, without the framework to understand how filmmaking actually works from pre-production to post-production."
      },
      {
        heading: "What the LevelUp Online Filmmaking Workshop Taught Him",
        body: "The LevelUp Filmmaking Workshop gave him that framework in a concentrated three-hour session. \"Through this just three-hour workshop program itself, I could actually get a short grasp of what I am to pursue,\" Akhil wrote. But his experience goes deeper than simple satisfaction. The workshop didn't just teach him filmmaking techniques — it reshaped how he saw cinema itself."
      },
      {
        heading: "From Admirer to Aspiring Director",
        body: "What struck Akhil most was how the instructor decoded the art of visual storytelling — breaking down frames, shots, camera angles, and the thinking style of directors in a way that transformed him from a passive admirer of films into someone who could begin to understand the craft behind them. \"Till now I have only been a good admirer of films,\" he reflected. The workshop turned admiration into understanding, and understanding into ambition. Akhil's story is a powerful reminder that talent and passion don't come with prerequisites. You don't need a film school degree or industry connections. Sometimes the most compelling voices in cinema come from the most unexpected places."
      }
    ],
    ctaText: "Akhil's journey from construction sites to cinema started with a single three-hour workshop. The LevelUp Filmmaking Workshop is designed for absolute beginners who are ready to understand the craft behind the films they love. If you've been watching from the sidelines, this might be your first step too.",
    ctaProgram: "Filmmaking"
  },
  {
    slug: "18-year-old-kerala-student-chose-filmmaking-over-engineering",
    seoTitle: "18-Year-Old Takes Gap Year to Learn Filmmaking | Rithu's LevelUp Workshop Review",
    metaDescription: "Rithu Nanda scored 92% in her boards but took a gap year to explore filmmaking. Read how the LevelUp Filmmaking Workshop helped this Kerala teen find her creative calling.",
    targetKeywords: ["gap year filmmaking India", "filmmaking workshop for students", "LevelUp filmmaking review", "learn filmmaking after 12th", "creative career after school", "filmmaking course for beginners India"],
    h1: "The Year She Said No: How an 18-Year-Old Kerala Student Chose Filmmaking Over Engineering",
    authorName: "Rithu Nanda",
    authorRole: "Student (Gap Year)",
    location: "Kerala, India",
    rating: 10,
    program: "Filmmaking",
    sections: [
      {
        heading: "92% in Boards, But No Clarity on What's Next",
        body: "Rithu Nanda had done everything right. She scored 92% in her 12th grade board exams — straight A-plus grades, the kind of academic record that opens doors to engineering colleges and medical schools across India. By every conventional measure, she was exactly where an 18-year-old from Kerala was supposed to be: on the launchpad, ready to be fired into the trajectory that society had planned for her."
      },
      {
        heading: "Why She Took a Gap Year Despite Family Pressure",
        body: "Instead, she did something that took more courage than any exam: she took a gap year. A full twelve months to figure out who she actually was, separate from the expectations that had been shaping her since childhood. It was, by her own account, \"pretty tough\" to convince her parents. Her friends were shipping off to colleges. Her relatives were watching. The social pressure in Indian families around career choices after 12th grade is immense. But Rithu chose self-discovery over the safe path."
      },
      {
        heading: "Finding Direction at the LevelUp Filmmaking Workshop",
        body: "Rithu found herself at a crossroads between fine arts and filmmaking. She needed to know if filmmaking was something she could actually pursue — not just as a hobby, but as a life. The LevelUp Filmmaking Workshop became her testing ground. For the first time, she wasn't learning because a curriculum demanded it. She was learning because she genuinely wanted to."
      },
      {
        heading: "A Gap Year That Became a Foundation",
        body: "What makes Rithu's story remarkable is the self-awareness behind it. At eighteen, in a culture that rewards conformity, she recognized that rushing into engineering or medicine without understanding herself would be a far greater risk than pausing to explore creative careers. She chose exploration over expectation. Rithu's gap year isn't a gap at all — it's a foundation. The first real one she's building for herself, on her own terms. And somewhere in Kerala, an eighteen-year-old with a camera and a story to tell is proving that sometimes the bravest thing you can do is take the path that no one planned for you."
      }
    ],
    ctaText: "If you're a student trying to figure out whether filmmaking is right for you — whether after 12th grade, during a gap year, or alongside college — the LevelUp Filmmaking Workshop is built for exactly that moment of exploration. No prior experience needed. Just curiosity.",
    ctaProgram: "Filmmaking"
  },
  {
    slug: "business-executive-reclaimed-creative-life",
    seoTitle: "How a Corporate Professional Rediscovered His Creative Passion | LevelUp Screenwriting Review",
    metaDescription: "Debajit Dutta, a business development executive, had abandoned all creative pursuits for 4 years. Read how LevelUp's screenwriting workshop reignited his passion for storytelling and filmmaking.",
    targetKeywords: ["screenwriting workshop India", "online screenwriting course for beginners", "LevelUp screenwriting review", "learn screenwriting online", "storytelling workshop", "creative career for working professionals"],
    h1: "A Renaissance at Rock Bottom: How a Business Executive Reclaimed His Creative Life After 4 Years",
    authorName: "Debajit Dutta",
    authorRole: "Business Development Executive",
    location: "India",
    rating: 8,
    program: "Screenwriting",
    sections: [
      {
        heading: "Four Years Without Creating Anything",
        body: "For four years, Debajit Dutta had been a ghost of the person he used to be. There was a time when he danced, made videos, edited footage and uploaded it to his channel — when people actually waited for his content. He was creative, productive, alive in the way that only making things can make you feel. And then life happened. He stopped doing everything he loved. Four years is long enough for skills to rust and for confidence to erode — long enough to start believing the creative person you once were is gone for good."
      },
      {
        heading: "Why He Enrolled in a Screenwriting Workshop",
        body: "But giving up is not the same as letting go. When Debajit enrolled in the LevelUp Screenwriting Workshop, he wasn't just signing up for an online course. He was making a statement to himself: his past didn't have to make him \"a victim of circumstances.\" It could be the raw material for something greater. The basics of screenwriting and storytelling became his re-entry point into the creative world he'd abandoned."
      },
      {
        heading: "What Screenwriting Gave Him Back",
        body: "\"This class is a new renaissance for me,\" he wrote — and the word renaissance is precisely right. Not a beginning, but a rebirth. The workshop on storytelling psychology and screenplay structure reignited a relationship with creativity that he had mourned as lost. It showed him that the storytelling instinct — the urge to shape experience into narrative — was still alive in him. \"If the journey takes ten years, then I am glad that I am taking the first step now,\" he declared."
      },
      {
        heading: "Creative Ambition Doesn't Expire",
        body: "Debajit's story is a reminder that creative ambition can be suppressed, sidelined, buried under the demands of a corporate career — but it waits. And sometimes, all it takes to bring it roaring back is a single screenwriting workshop and a single decision to stop being a victim and start being a storyteller again. He dreams of seeing himself on \"the largest of the larger screens.\" Given the journey he's already survived, it would be unwise to bet against him."
      }
    ],
    ctaText: "Debajit's creative renaissance began with the LevelUp Screenwriting Workshop — a structured introduction to storytelling, screenplay writing, and the psychology behind great narratives. If you've been away from your creative side for too long, this might be the session that brings it back.",
    ctaProgram: "Screenwriting"
  },
  {
    slug: "it-professional-found-creative-voice-screenwriting",
    seoTitle: "IT Professional Discovers Screenwriting: Ankur's LevelUp Workshop Story",
    metaDescription: "Ankur Paliwal, an IT professional, spent years watching cinema but never told his own stories. Read how LevelUp's screenwriting workshop gave him the tools and confidence to finally begin.",
    targetKeywords: ["screenwriting course for IT professionals", "learn screenwriting India", "online storytelling workshop", "LevelUp screenwriting workshop review", "career change to filmmaking", "creative writing for tech professionals"],
    h1: "The Stories He Never Told: How an IT Professional Finally Found His Creative Voice",
    authorName: "Ankur Paliwal",
    authorRole: "IT Professional",
    location: "India",
    rating: 10,
    program: "Screenwriting",
    sections: [
      {
        heading: "A Lifetime of Watching, Never Creating",
        body: "Ankur Paliwal has always lived in two worlds. In one, he is an IT professional — methodical, logical, fluent in the language of systems and software. In the other, he is a lover of stories and cinema, a person who watches films not just for entertainment but with the quiet intensity of someone studying a craft he desperately wants to practice. For years, these two worlds remained separate. He was, by his own description, a lifelong \"listener and watcher\" who never crossed over to the other side."
      },
      {
        heading: "The Frustration of Carrying Untold Stories",
        body: "\"I never knew how to tell my stories,\" Ankur wrote. \"So I ended up shutting myself down and just not telling the stories I want to tell.\" That sentence carries the weight of years of frustration — someone carrying stories inside him like undelivered letters, written in his mind but never sent. The gap between having something to say and knowing the craft of screenwriting and storytelling had become a kind of prison."
      },
      {
        heading: "How the LevelUp Screenwriting Workshop Changed Everything",
        body: "The LevelUp Screenwriting Workshop was the bridge. Not because it gave Ankur everything he needed to become a filmmaker overnight — no workshop can do that. But because it gave him something far more valuable: the confidence to begin. \"It has inspired me and has made me serious about it,\" he reflected. \"It gave me some tools to begin with and the confidence, the push I needed.\""
      },
      {
        heading: "From Silent Observer to Aspiring Screenwriter",
        body: "There are millions of people like Ankur — working professionals in IT, engineering, finance, or other technical fields who secretly harbour creative dreams. What separates the storytellers from the silent observers isn't usually talent. It's permission — the permission to believe that your stories matter, that your perspective is worth sharing. Ankur found that permission in an online screenwriting workshop. After years of silence, he is finally ready to speak."
      }
    ],
    ctaText: "Ankur went from years of silence to finding his voice in a single session. The LevelUp Screenwriting Workshop is designed for people who love stories but don't know where to start — no background in writing or film required. Your stories are already there. This workshop helps you tell them.",
    ctaProgram: "Screenwriting"
  },
  {
    slug: "delhi-university-student-chasing-cinematic-legacy",
    seoTitle: "'A Film By Suryansh': Delhi University Student's Filmmaking Dream | LevelUp Review",
    metaDescription: "Suryansh, a Delhi University student, dreams of seeing his name on the big screen. Read how the LevelUp Filmmaking Workshop brought him closer to his cinematic ambitions.",
    targetKeywords: ["filmmaking course Delhi", "learn filmmaking online India", "filmmaking workshop for college students", "LevelUp filmmaking review", "aspiring filmmaker India", "film direction course online"],
    h1: "'A Film By Suryansh': How a Delhi University Student Is Chasing His Cinematic Legacy",
    authorName: "Suryansh",
    authorRole: "Student, University of Delhi",
    location: "Delhi, India",
    rating: 10,
    program: "Filmmaking",
    sections: [
      {
        heading: "The Moment He's Been Visualizing His Entire Life",
        body: "Suryansh doesn't just want to make films. He wants a specific moment: a packed theatre, the murmur of an expectant audience, the lights going down, and then — right there on the screen — the words: \"A FILM BY SURYANSH.\" It's a Bollywood dream in the most literal sense. A student at the University of Delhi, Suryansh says his life has \"always felt like a Bollywood reference\" — a young person from an ordinary background with an extraordinary dream."
      },
      {
        heading: "Why He Chose LevelUp's Online Filmmaking Workshop",
        body: "What sets Suryansh apart from thousands of college students who casually say they want to \"get into films\" is the clarity of his ambition. He isn't chasing fame. He wants legacy — to contribute something to Indian cinema that outlasts him. The LevelUp Filmmaking Workshop met him at exactly the right moment, providing a thorough introduction to filmmaking fundamentals from pre-production to post-production that transformed his perspective on what cinema really involves."
      },
      {
        heading: "Cinema Is So Much More Than Cameras and Actors",
        body: "\"Many might think that filmmaking is just about cameras, actors, directors, and sets,\" he wrote, \"but cinema is so much more.\" That sentence marks the transition from fan to practitioner — the moment when loving something transforms into understanding how it works. He signed off his feedback the way a future director might: \"Regards, An Aspiring Filmmaker — Suryansh.\" No last name. Just the one word, standing alone, the way it will someday stand on a movie screen."
      }
    ],
    ctaText: "Suryansh's dream of seeing his name on the big screen started with understanding how films actually get made. If you're a college student with cinematic ambitions, the LevelUp Filmmaking Workshop is where that understanding begins.",
    ctaProgram: "Filmmaking"
  },
  {
    slug: "mbbs-student-secret-life-in-cinema",
    seoTitle: "MBBS Student's Secret Filmmaking Dream: Dr. Swathi's LevelUp Screenwriting Review",
    metaDescription: "Swathi Muthu is pursuing MBBS but has dreamed of cinema since childhood. Read how LevelUp's screenwriting workshop became the first step in her journey from medicine to movies.",
    targetKeywords: ["screenwriting workshop for doctors", "creative career for medical students", "learn screenwriting online India", "LevelUp screenwriting review", "filmmaking for non-filmmakers", "storytelling course India"],
    h1: "Between the Stethoscope and the Screenplay: An MBBS Student's Secret Life in Cinema",
    authorName: "Swathi Muthu",
    authorRole: "MBBS Student",
    location: "India",
    rating: 10,
    program: "Screenwriting",
    sections: [
      {
        heading: "A Medical Student Who Watches Films Like a Filmmaker",
        body: "On paper, Swathi Muthu is pursuing medicine — deep in anatomy textbooks, clinical rotations, and the gruelling exam cycles of an MBBS programme. But none of her professors see the other Swathi: the one who falls in love with every film she watches, not just with the story but with the craft of how it was made. \"Every time I fall in love with the process of movie making,\" she wrote, \"and how creatively they have shot it and conveyed it to the audience.\""
      },
      {
        heading: "A Childhood Dream of Cinema, Channelled Into Medicine",
        body: "\"I have dreamt of being in the cinema industry from a very young age,\" Swathi confessed — a sentence that carries particular weight from an MBBS student. Somewhere along the way, life channelled her toward medicine. Maybe it was family expectation, maybe the pragmatic voice that tells ambitious Indian students to choose a \"safe\" career first. Whatever the reason, the cinema dream didn't die. It just went underground, waiting for the right moment to surface."
      },
      {
        heading: "Taking the First Step with LevelUp's Screenwriting Workshop",
        body: "The LevelUp Screenwriting Workshop was, in her words, \"the first step of my journey.\" Not a hobby. Not a side interest. A journey. For someone balancing medical school, choosing to attend an online screenwriting course isn't casual — it's a declaration. She called it an experience she will \"never forget.\" India has no shortage of doctors who secretly wish they were artists. The ones who do something about it are rare. Swathi Muthu is one of them."
      }
    ],
    ctaText: "Swathi's cinema dream survived years of medical school — and the LevelUp Screenwriting Workshop was her first real step toward it. Whether you're a medical student, an engineer, or anyone with a story to tell, this workshop meets you where you are. No film background needed.",
    ctaProgram: "Screenwriting"
  },
  {
    slug: "complete-beginner-made-short-film-at-forge",
    seoTitle: "Never Held a Camera to Making a Short Film in 8 Days | Gagandeep's Forge Experience",
    metaDescription: "Gagandeep Singh Bhatia had never held a camera or seen a film shoot. After 8 days at LevelUp's Forge filmmaking program, he made his own short film. Read his zero-to-filmmaker story.",
    targetKeywords: ["intensive filmmaking course India", "Forge filmmaking program", "LevelUp Forge review", "hands-on filmmaking workshop", "make a short film course", "filmmaking bootcamp India", "learn filmmaking from scratch"],
    h1: "Eight Days to a New Identity: How a Complete Beginner Made His Own Short Film at Forge",
    authorName: "Gagandeep Singh Bhatia",
    authorRole: "Working Professional",
    location: "India",
    rating: 7,
    program: "The Forge",
    sections: [
      {
        heading: "Zero Experience. Zero Knowledge. Complete Beginner.",
        body: "Before the Forge program, Gagandeep Singh Bhatia had never held a camera. Not a professional one, not a student one, not even a friend's camera borrowed for a weekend experiment. He had never seen a film shoot. The entire machinery of filmmaking existed for him only as something that happened on the other side of a screen. He was, by every definition, a complete beginner walking into LevelUp's most immersive filmmaking experience."
      },
      {
        heading: "From Nothing to a Finished Short Film in Eight Days",
        body: "Eight days later, he had made his own short film. In just over a week at the Forge intensive filmmaking program, Gagandeep went from a person who had never touched the tools of filmmaking to someone who had conceived, planned, shot, and completed a film of his own. \"I now understand the process and I think I can create a lot of films and reflect my idea on the screen the way I want it,\" he wrote. Not someone else's vision — his vision, on his terms."
      },
      {
        heading: "A Hands-On Filmmaking Experience That Changes Lives",
        body: "\"Today, just because of the Forge program, I can say I am a filmmaker,\" he concluded. \"And whenever I will look back in my life, I will always remember and cherish the experience I have got in these eight days.\" There are people who spend years in film school working toward the confidence to call themselves filmmakers. Gagandeep claimed it in eight days — not because the title was given to him, but because he earned it by making a film."
      }
    ],
    ctaText: "Gagandeep walked into Forge having never touched a camera. He walked out a filmmaker. The Forge Program is LevelUp's immersive, hands-on filmmaking experience designed to take you from absolute zero to making your own short film. If you're ready to stop watching and start creating, Forge is where it happens.",
    ctaProgram: "The Forge"
  },
  {
    slug: "chennai-student-found-more-value-in-5-days-than-film-school",
    seoTitle: "Film School Student Says LevelUp Taught More in 5 Days Than College in a Year | BFP Review",
    metaDescription: "Raghav Nikhil, a film school student from Chennai now directing his own feature film, says LevelUp's Become a Filmmaker Program surpassed his entire year of formal film education.",
    targetKeywords: ["LevelUp BFP review", "Become a Filmmaker Program", "best filmmaking course India", "online film school alternative", "filmmaking program better than film school", "5-day filmmaking course India"],
    h1: "Better Than Film School: How a Chennai Student Found More Value in 5 Days Than a Full Academic Year",
    authorName: "Raghav Nikhil",
    authorRole: "Independent Filmmaker",
    location: "Chennai, India",
    rating: 10,
    program: "Breakthrough Filmmaker Program",
    sections: [
      {
        heading: "A Film School Student with Zero Expectations",
        body: "Raghav Nikhil was already a film school student in Chennai when he stumbled across a LevelUp advertisement. He signed up for the Become a Filmmaker Program with, as he puts it, \"zero expectations.\" He was, after all, already enrolled in formal film education. What could a five-day online program possibly offer that his institution hadn't already covered?"
      },
      {
        heading: "No Film School Could Teach in a Year What You Did in 5 Days",
        body: "What happened next is the kind of endorsement that can't be manufactured: a film school student declaring that no film school could accomplish in an entire academic year what LevelUp's BFP managed in five days. The weight of his words comes from his position — he's not a starry-eyed beginner. He's someone who has been through the formal system and knows what good teaching looks like because he's experienced its absence."
      },
      {
        heading: "Now Directing His Own Self-Produced Feature Film",
        body: "Today, Raghav is directing a self-produced feature film — not a short film for class, but a full feature, funded and directed by himself. \"My faith in film schools is restored,\" he wrote. The formal education system had let him down. Five days with LevelUp's Become a Filmmaker Program picked him back up. His story raises a question for traditional institutions: if a five-day intensive can outperform a year of formal education, it's clearly not about the duration — it's about the quality."
      }
    ],
    ctaText: "Raghav came from film school and still found the LevelUp Become a Filmmaker Program (BFP) transformative. Whether you're starting from scratch or supplementing your existing education, BFP is a comprehensive, multi-day deep dive into every aspect of filmmaking. See what five focused days can do.",
    ctaProgram: "Breakthrough Filmmaker Program"
  },
  {
    slug: "doctor-learned-to-see-mastering-camera-lens",
    seoTitle: "Doctor Learns Photography: Dr. Kanchana's LevelUp Photography Workshop Review",
    metaDescription: "Dr. Kanchana understood the human body but never understood her camera. Read how LevelUp's photography workshop gave this doctor the confidence to see the world through a lens.",
    targetKeywords: ["photography workshop India", "online photography course for beginners", "LevelUp photography review", "learn photography basics", "camera basics workshop", "photography for hobbyists India"],
    h1: "The Doctor Who Learned to See: From Understanding the Human Body to Mastering the Camera Lens",
    authorName: "Dr. Kanchana",
    authorRole: "Doctor & Photography Enthusiast",
    location: "India",
    rating: 10,
    program: "Photography",
    sections: [
      {
        heading: "She Understood Anatomy. Her Camera Remained a Mystery.",
        body: "Dr. Kanchana has spent her career reading the human body the way most people read a book — with fluency and the trained eye of someone who has studied its every system. But there was one tool she had never truly understood: her camera. \"I've understood a human body,\" she wrote with characteristic wit, \"but never understood a camera.\" Photography had always been her passion, the thing she did when she wasn't practising medicine — capturing moments at weddings, family gatherings, and everyday life. But she knew there was a ceiling she couldn't break through without formal training."
      },
      {
        heading: "What the LevelUp Photography Workshop Revealed",
        body: "The LevelUp Photography Workshop gave her what years of self-teaching couldn't: the confidence to see the world not just with her eyes but through a camera lens. That distinction matters — seeing with your eyes is passive and instinctive. Seeing through a lens is active, deliberate, a skill that transforms ordinary moments into permanent art. The workshop covered camera basics, composition, white balance, shutter speed, and the technical foundations that turn a hobbyist into a confident photographer."
      },
      {
        heading: "A Doctor Who Now Preserves Moments as Well as Lives",
        body: "Dr. Kanchana left the workshop with \"the confidence to see the world through a camera lens as well, to capture that moment forever.\" For a doctor, preserving life is the daily work. For a photographer, preserving moments is the art. Dr. Kanchana now does both. Her story is a reminder that expertise in one field doesn't automatically translate to another — and there's something deeply human about a person accomplished enough to save lives choosing, in her own time, to learn how to capture them."
      }
    ],
    ctaText: "Dr. Kanchana understood the human body but needed help understanding her camera. The LevelUp Photography Workshop covers everything from basic camera settings to composition techniques — perfect for passionate hobbyists ready to take their photography from good to intentional.",
    ctaProgram: "Photography"
  },
  {
    slug: "bcom-graduate-rediscovered-childhood-gift-storytelling",
    seoTitle: "From Playing with Dolls to Screenwriting: Aswathy's Creative Journey | LevelUp Review",
    metaDescription: "Aswathy S created stories as a child but lost her creative voice in formal education. Read how LevelUp's screenwriting workshop helped this BCom graduate rediscover her storytelling gift.",
    targetKeywords: ["screenwriting workshop for beginners", "learn storytelling India", "screenwriting course online", "LevelUp screenwriting review", "creative writing workshop", "mythology-based storytelling India"],
    h1: "The Girl Who Never Stopped Playing Pretend: How a BCom Graduate Rediscovered Her Childhood Gift for Storytelling",
    authorName: "Aswathy S",
    authorRole: "BCom Graduate & Aspiring Writer",
    location: "Kerala, India",
    rating: 8,
    program: "Screenwriting",
    sections: [
      {
        heading: "A Natural-Born Storyteller Lost in the Education System",
        body: "When Aswathy S was a little girl, she did what many children do: she played with dolls. But Aswathy didn't just play — she directed. She created scenarios, built characters, gave them motivations and conflicts. She didn't know what she was doing had a name. She just knew that making up stories was the most natural thing in the world. And then she grew up, got \"stuck in four-wall institutions,\" and slowly the girl who created worlds out of nothing began to feel like nothing herself."
      },
      {
        heading: "Indian Mythology, Imagination, and the Missing Framework",
        body: "But the stories never went away. Aswathy began dreaming of writing narratives rooted in Indian mythology — the epics and legends she had grown up with, reimagined through her own creative lens. The vision was clear. The problem was execution. She had a universe of stories in her head but no framework for getting them onto paper. She didn't know the architecture of screenwriting or how to build a story that works."
      },
      {
        heading: "One Instagram Ad, One Workshop, One Turning Point",
        body: "When she spotted a LevelUp Screenwriting Workshop ad on Instagram, she didn't hesitate. \"I quickly signed and attended the workshop,\" she wrote — and that speed tells you everything about how hungry she was for exactly this kind of guidance. The workshop gave her the structural knowledge to finally transform the stories in her head. Aswathy's journey is proof that the right creative education can unlock a gift that formal schooling failed to nurture."
      }
    ],
    ctaText: "Aswathy had the stories. She just needed the structure. The LevelUp Screenwriting Workshop teaches you the fundamentals of storytelling and screenplay writing — the framework that turns imagination into narrative. If you've been carrying stories you can't get onto paper, this is where you learn how.",
    ctaProgram: "Screenwriting"
  },
  {
    slug: "entrepreneur-perspective-shift-at-forge",
    seoTitle: "Entrepreneur Finds Creative Breakthrough at Forge Filmmaking Program | LevelUp Review",
    metaDescription: "Freelancer Deshpande Akhil attended LevelUp's Forge and discovered that storytelling is about honesty, not approval. Read how this immersive program shifted his creative mindset.",
    targetKeywords: ["Forge filmmaking program review", "immersive filmmaking workshop India", "LevelUp Forge review", "creative filmmaking retreat", "filmmaking for entrepreneurs", "storytelling mindset workshop"],
    h1: "Storytelling Is About Honesty, Not Approval: An Entrepreneur's Perspective Shift at The Forge",
    authorName: "Deshpande Akhil",
    authorRole: "Freelancer & Entrepreneur",
    location: "India",
    rating: 10,
    program: "The Forge",
    sections: [
      {
        heading: "He Came for Filmmaking Skills. He Left with Something Deeper.",
        body: "Most people attend a filmmaking workshop to learn techniques. Deshpande Akhil attended The Forge and learned something about himself. What stayed with him wasn't the camera work or the editing — it was a fundamental insight that reframed everything: storytelling isn't about approval. It's about honesty. As a freelancer and entrepreneur accustomed to creating under pressure and measuring success by external metrics, being given permission to fail was revolutionary."
      },
      {
        heading: "A Safe Space for Vulnerability and Creative Risk",
        body: "\"The Forge was more than a workshop, it was a perspective shift,\" Akhil wrote. \"It was a safe space to be vulnerable, to fail, and to explore ideas without fear of judgment. The mentors didn't just teach, they listened.\" In a world where most educational experiences are transactional, The Forge operated on a different frequency — creating the kind of trust that produces creative breakthroughs no amount of instruction alone can generate."
      },
      {
        heading: "Better Questions, Not Just Better Answers",
        body: "\"You walked in with questions and left with better, deeper ones,\" Akhil reflected. A mediocre program gives you answers. A great one gives you better questions. The Forge didn't pretend to resolve his creative uncertainties. It deepened them — in exactly the way they needed to be deepened. For entrepreneurs and creators who feel stuck in a cycle of performing for approval, The Forge offers a reset."
      }
    ],
    ctaText: "Akhil walked into The Forge as an entrepreneur. He walked out as a storyteller with a completely different relationship to his creative work. The Forge Program is for anyone ready to go beyond techniques and discover why they create. It's immersive, intentional, and unlike any workshop you've attended.",
    ctaProgram: "The Forge"
  },
  {
    slug: "working-professional-found-filmmaking-without-leaving-job",
    seoTitle: "Parents Won't Let Him Quit His Job for Film School — LevelUp BFP Was the Answer | Review",
    metaDescription: "Sudhan's parents refused to let him quit his job for a film diploma. LevelUp's Become a Filmmaker Program gave him everything he needed in 5 days without sacrificing his livelihood.",
    targetKeywords: ["filmmaking course for working professionals India", "LevelUp BFP review", "learn filmmaking without quitting job", "Become a Filmmaker Program", "weekend filmmaking course", "film education for professionals"],
    h1: "The Compromise That Became a Calling: How a Working Professional Found Filmmaking Without Leaving His Job",
    authorName: "Sudhan Ezhil Maran M",
    authorRole: "Working Professional",
    location: "India",
    rating: 10,
    program: "Breakthrough Filmmaker Program",
    sections: [
      {
        heading: "A One-Year Film Diploma He Couldn't Pursue",
        body: "Sudhan Ezhil Maran M had a plan: enroll in a one-year filmmaking diploma — a full-time, all-in commitment to the craft he'd been dreaming about. It meant leaving a steady job, surrendering regular income, betting everything on a passion that offers no guarantees. Sudhan was ready to make that bet. His parents were not. They wouldn't let him quit his job. In an Indian family, a steady income isn't just money — it's security, obligation, and the unspoken contract between a working professional and the people who depend on them."
      },
      {
        heading: "LevelUp's BFP: The Five-Day Alternative That Delivered",
        body: "That's when he found LevelUp's Become a Filmmaker Program. It wasn't a one-year diploma. It was five days. It didn't require him to quit his job or upend his life. It met him where he was — employed, constrained, hungry for knowledge — and delivered a concentrated education in filmmaking fundamentals. \"I literally had a great experience and gained more knowledge about cinema,\" he wrote, \"and at the end of the day I feel complete.\" Not satisfied. Not impressed. Complete."
      },
      {
        heading: "You Don't Need to Quit Everything to Follow Your Dream",
        body: "Sudhan's story speaks to millions of aspiring creatives in India: not everyone can quit their job for film school. Not everyone can afford a full-time programme. But that doesn't mean the passion has to die. What LevelUp's BFP gave Sudhan was proof that the path to filmmaking doesn't require you to sacrifice your livelihood — just your hesitation."
      }
    ],
    ctaText: "Sudhan couldn't quit his job for film school. LevelUp's Become a Filmmaker Program (BFP) gave him a comprehensive filmmaking education in just five days — no career sacrifice required. If you're a working professional who's been waiting for the \"right time\" to learn filmmaking, this is it.",
    ctaProgram: "Breakthrough Filmmaker Program"
  },
  {
    slug: "shy-student-life-changing-transformation-at-forge",
    seoTitle: "Shy Student Transformed at Forge Filmmaking Program | K. Ujwal's LevelUp Review",
    metaDescription: "K. Ujwal was too shy to talk to anyone on Day 1 of Forge. By Day 8, he had made lifelong friends and a completely new perspective on life. Read his transformation story.",
    targetKeywords: ["Forge filmmaking program experience", "immersive filmmaking course India", "LevelUp Forge student review", "filmmaking retreat for students", "hands-on film course", "Forge LevelUp review"],
    h1: "The Shy Kid Who Found His People: A Student's Life-Changing Transformation at The Forge",
    authorName: "K. Ujwal",
    authorRole: "Student",
    location: "India",
    rating: 10,
    program: "The Forge",
    sections: [
      {
        heading: "Too Shy to Speak on Day One",
        body: "On the first day of The Forge, K. Ujwal didn't speak to anyone. He wanted to, but the larger part of him kept quiet. Ujwal was shy — the real kind that builds walls between you and the world, that makes a room full of strangers feel like an obstacle course. He didn't expect what happened next."
      },
      {
        heading: "Friends for Life and a New Perspective",
        body: "The Forge didn't just teach Ujwal about filmmaking. It dismantled the walls he'd been hiding behind. \"At first I'm too shy to talk to others, but it's completely opposite of my thoughts,\" he wrote. The friends came — not acquaintances, not networking contacts, but friends he describes as being \"for the rest of my life.\" For someone who arrived unable to initiate a conversation, that's not just a social outcome. It's a complete recalibration of how he sees himself."
      },
      {
        heading: "Memories That Play Like a Movie",
        body: "\"This particular trip changed my perspective in life, it changed me as a better person,\" Ujwal reflected. \"Every memory there is flashing in front of my eyes like a literal movie.\" For a filmmaking student, there's no higher compliment. The experience was so vivid, so immersive, that his mind processes it the way it processes cinema. The shy kid who walked into The Forge and the person who walked out are not the same human being."
      }
    ],
    ctaText: "Ujwal arrived at Forge too shy to speak. He left with lifelong friends and a transformed perspective. The Forge Program isn't just a filmmaking course — it's an immersive experience that changes how you see yourself and the world. If you're ready for more than just skills, Forge is waiting.",
    ctaProgram: "The Forge"
  },
  {
    slug: "ecommerce-entrepreneur-found-creative-tribe-at-forge",
    seoTitle: "Hogwarts for Writers: Entrepreneur's Forge Writing Program Review | LevelUp",
    metaDescription: "Abhinav Bainslay, an ecommerce entrepreneur and aspiring screenwriter, calls LevelUp's Forge Writing cohort 'Hogwarts for writers.' Read why this immersive program left him spellbound.",
    targetKeywords: ["Forge Writing program review", "LevelUp Forge Writing", "screenwriting retreat India", "immersive writing workshop", "creative writing cohort", "writing program for entrepreneurs India"],
    h1: "Hogwarts for Writers: How an Ecommerce Entrepreneur Found His Creative Tribe at Forge",
    authorName: "Abhinav Bainslay",
    authorRole: "Ecommerce Entrepreneur & Screenwriter",
    location: "India",
    rating: 10,
    program: "The Forge",
    sections: [
      {
        heading: "Building a Business by Day, Writing Screenplays by Night",
        body: "Abhinav Bainslay lives a double life. By day, he's building an ecommerce platform — spreadsheets, logistics, and the relentless pragmatism of making a business survive. By night, he's writing a screenplay. The distance between these two worlds is enormous. Most people choose one or the other. Abhinav refused to. When he arrived at The Forge Writing cohort, he found something unexpected: a community of people who understood both halves of who he was."
      },
      {
        heading: "\"This Cohort Is Like Hogwarts for Writers!\"",
        body: "\"This cohort is like Hogwarts for writers!\" he declared — and the comparison is more precise than it might seem. Hogwarts wasn't just a school. It was where people who had always felt different suddenly felt like they belonged. The location was \"enchanting,\" the mentors were \"visionary sages,\" and the carefully curated cohort of writers from diverse backgrounds ensured everyone learned from and inspired each other. \"Truly forging an experience and friendships of a lifetime,\" he wrote."
      },
      {
        heading: "Where Entrepreneurs and Screenwriters Belong Together",
        body: "For Abhinav, The Forge validated that his double life — entrepreneur by necessity, writer by calling — wasn't a contradiction. It was an asset. \"Forge truly lives up to its name,\" he concluded, \"and I'd highly recommend it to everyone looking to literally level up in life and beyond.\" Coming from a man who builds businesses for a living, that recommendation carries the weight of someone who knows the difference between a good investment and a great one."
      }
    ],
    ctaText: "Abhinav called it Hogwarts for writers — a place where screenwriters from diverse backgrounds come together to learn, create, and forge lifelong bonds. The Forge Writing Program is LevelUp's immersive screenwriting retreat. If you've been writing alone, it's time to find your tribe.",
    ctaProgram: "The Forge"
  },
  {
    slug: "school-teacher-discovered-science-behind-storytelling",
    seoTitle: "School Teacher Learns Storytelling at LevelUp Workshop | Shadabul's Screenwriting Review",
    metaDescription: "Shadabul Haque tells stories to children every day as a teacher, but never learned the art behind it. LevelUp's screenwriting workshop taught him the science of storytelling.",
    targetKeywords: ["storytelling workshop for teachers", "screenwriting course India", "learn storytelling techniques", "LevelUp screenwriting review", "psychology of storytelling", "storytelling for educators"],
    h1: "The Teacher Who Became the Student: How a School Teacher Discovered the Science Behind Storytelling",
    authorName: "Shadabul Haque",
    authorRole: "School Teacher",
    location: "India",
    rating: 10,
    program: "Screenwriting",
    sections: [
      {
        heading: "A Professional Storyteller Who Didn't Know the Craft",
        body: "Shadabul Haque tells stories for a living. As a school teacher, storytelling is his daily professional tool — he uses it to capture children's attention, make dry concepts vivid, and transform distracted students into a captive audience. He's been doing it for years. And until the LevelUp Screenwriting Workshop, he had no idea he'd been doing it on instinct alone, without understanding the science behind what makes storytelling actually work."
      },
      {
        heading: "The Science Behind the Art of Storytelling",
        body: "\"I am a teacher by profession, therefore I have to tell stories to children to attract their focus and to motivate them in the right direction. But I lacked the art of storytelling,\" he wrote. The workshop changed his framework entirely: \"It has changed my view towards the art of storytelling, and I learnt the science behind the art of storytelling.\" That phrase captures it perfectly — storytelling has both an intuitive dimension and a structural one. Shadabul had been operating on intuition alone. The workshop gave him the architecture."
      },
      {
        heading: "A Ripple Effect That Reaches Generations of Students",
        body: "When a filmmaker learns storytelling, the audience benefits. When a teacher learns storytelling, generations of students benefit. Every class Shadabul teaches from this point forward will be informed by the psychological hooks, narrative structures, and storytelling frameworks he discovered at the LevelUp Screenwriting Workshop."
      }
    ],
    ctaText: "Shadabul was already a storyteller. The LevelUp Screenwriting Workshop showed him the science behind the art. Whether you're a teacher, a professional communicator, or someone who wants to understand why great stories work, this workshop gives you the framework that transforms instinct into craft.",
    ctaProgram: "Screenwriting"
  },
  {
    slug: "cad-designer-discovered-screenwriter-inside-him",
    seoTitle: "Skeptic CAD Designer Converts to Screenwriting After LevelUp Mastery Program | Review",
    metaDescription: "Saleem Mohammed, a CAD designer at an MNC, didn't believe a short course could make him a screenwriter. LevelUp's Screenwriting Mastery Program proved him wrong. Read his honest review.",
    targetKeywords: ["screenwriting mastery program review", "LevelUp screenwriting course", "learn screenwriting from scratch", "screenwriting for working professionals", "best screenwriting course India online", "screenplay writing course"],
    h1: "The Skeptic Who Was Converted: How a CAD Designer Discovered the Screenwriter Inside Him",
    authorName: "Saleem Mohammed",
    authorRole: "CAD Designer at an MNC",
    location: "India",
    rating: 10,
    program: "Screenwriting",
    sections: [
      {
        heading: "An Engineer's Doubt About a Short Screenwriting Course",
        body: "Saleem Mohammed designs things for a living. As a CAD designer at a multinational corporation, his days are spent in the precise, measured world of technical drawing. So when he heard that a short screenwriting programme could transform \"an average writer\" into a screenwriter, his analytical mind was skeptical. \"I had my doubts initially,\" he admitted. \"Frankly, I was skeptical when Rahul claimed that no other script writing course would be necessary after this one.\""
      },
      {
        heading: "From A to Z in Screenwriting and Script Writing",
        body: "The claim survived his scrutiny. \"I can now confidently say that this course covers everything from A to Z in script and screenwriting, leaving no need for any other resources,\" Saleem wrote. That's not the language of someone swept up in enthusiasm. That's the measured verdict of an analytical mind that came in doubting and left convinced. What converted him wasn't hype — it was the instructor's visible passion. \"Praveen's passion for script writing and teaching was palpable throughout the sessions.\""
      },
      {
        heading: "Awakening the Storyteller Within",
        body: "Saleem's conclusion carries quiet weight: \"This two-day workshop has the power to awaken the storyteller within you.\" Coming from a skeptic, from an engineer, from a man whose professional life is built on precision and proof — that's not a testimonial. That's a blueprint review from someone who checked every joint and found them all solid. If a CAD designer can find the screenwriter inside him, so can you."
      }
    ],
    ctaText: "Saleem came in as a skeptic and left as a believer. The LevelUp Screenwriting Mastery Program is a comprehensive, multi-day deep dive into the craft of screenwriting — from story structure to dialogue to the psychology of great narratives. If you're analytical, detail-oriented, and wondering whether screenwriting is for you: it is.",
    ctaProgram: "Screenwriting"
  },
  {
    slug: "doctor-became-award-winning-filmmaker-110-awards",
    seoTitle: "Doctor Makes Debut Film, Wins 110 Awards After LevelUp Workshops | Success Story",
    metaDescription: "Dr. C Raja Ravi Varma attended LevelUp's filmmaking, screenwriting, and editing workshops, then made his debut short film Murugesanum Cellphonum — which won 110 national and international film festival awards.",
    targetKeywords: ["LevelUp Learning success story", "award-winning filmmaker LevelUp", "best filmmaking course India", "learn filmmaking online results", "short film course India", "filmmaking workshop success", "doctor turned filmmaker India"],
    h1: "110 Awards and Counting: The Doctor Who Became an Award-Winning Filmmaker After LevelUp Workshops",
    authorName: "Dr. C Raja Ravi Varma",
    authorRole: "Doctor, Writer, Director & Actor",
    location: "India",
    rating: 10,
    program: "Filmmaking",
    sections: [
      {
        heading: "A Doctor with No Film Background Makes His Debut Film",
        body: "The numbers alone tell an extraordinary story. One hundred and ten awards. National and international film festivals. Best Film. Best Director. Best Writer. Best Actor. Best Cinematography. Best Music. All for a single short film called Murugesanum Cellphonum. And the man behind it? Dr. C Raja Ravi Varma — a doctor, a medical professional who had never directed a frame before he started attending LevelUp workshops. There was no film school degree, no years of apprenticing on sets, no family connections to the Indian film industry."
      },
      {
        heading: "How Multiple LevelUp Workshops Built a Complete Filmmaker",
        body: "What made Dr. Raja Ravi Varma's debut so remarkably accomplished wasn't just talent — it was preparation. By attending LevelUp's workshops across direction, screenwriting, and video editing, he didn't just learn one skill. He absorbed the entire filmmaking ecosystem. He understood how a script becomes a shot, how a shot becomes a scene, how a scene becomes a story. \"After attending the Direction, Screenplay, and Editing Workshops, I made my own debut film,\" he wrote, connecting cause and effect with the directness of a doctor delivering a diagnosis."
      },
      {
        heading: "110 National and International Film Festival Awards",
        body: "The result was a debut short film so accomplished that the global festival circuit couldn't stop recognizing it — awards across every major discipline: writing, direction, acting, cinematography, and music. Dr. Raja Ravi Varma is living proof that it's never too late, never too unconventional, and never too ambitious to start making films. \"Much indebted to LevelUp, which gave me the confidence,\" he wrote."
      }
    ],
    ctaText: "Dr. Raja Ravi Varma went from attending LevelUp workshops to winning 110 film festival awards with his debut short film. His journey started with the same workshops available to you today — LevelUp's Filmmaking, Screenwriting, and Video Editing Workshops. The foundation that built an award-winning filmmaker is just one registration away.",
    ctaProgram: "Filmmaking"
  },
  {
    slug: "semi-retired-professional-finally-writes-his-story",
    seoTitle: "Semi-Retired Professional Finally Writes His Dream Story After LevelUp Workshop | Review",
    metaDescription: "D Ashok Kumar carried a love story in his head for 3 years but couldn't write it. One LevelUp screenwriting workshop broke the creative block. Read his emotional transformation story.",
    targetKeywords: ["screenwriting workshop for beginners India", "overcome writers block", "learn story writing India", "LevelUp screenwriting review", "creative writing for seniors", "screenwriting course for late starters"],
    h1: "Three Years of Silence, One Workshop to Break It: A Semi-Retired Professional Finally Writes His Story",
    authorName: "D Ashok Kumar",
    authorRole: "Semi-Retired Professional",
    location: "India",
    rating: 10,
    program: "Screenwriting",
    sections: [
      {
        heading: "A Love Story Trapped Inside His Head for Three Years",
        body: "For three years, D Ashok Kumar carried a story inside him. A love story — beautiful and romantic, the kind he could see playing out in his mind like a finished film. It lived in his head with the vividness of something real. But every time he sat down to write it, nothing came out. Three years of knowing what you want to say and not knowing how — a thousand days of the story growing more vivid in his imagination while remaining stubbornly absent from the page."
      },
      {
        heading: "A Pathbreaking Session That Unlocked Everything",
        body: "He describes himself as living a semi-retired life, \"trying to find my real passion.\" The LevelUp Screenwriting Workshop broke the lock. \"It was a pathbreaking session for me,\" Ashok wrote. \"It has opened new horizons of writing, as I know I can build upon an idea or incident into a gripping story.\" The workshop taught him the fundamentals of story structure, character development, and screenplay craft that turned a formless dream into something he could actually build on paper."
      },
      {
        heading: "\"I Was a Storyteller. Now I Will Be a Screenwriter.\"",
        body: "The transformation was immediate and total. \"I'm full of confidence that my dream of writing a beautiful, romantic love story will be fulfilled for sure,\" he declared. And then the line that makes the whole story land: \"I was a storyteller but now I will be a screenwriter.\" The shift from was to will be — from past to future, from passive identity to active ambition — is the entire journey in seven words. Ashok Kumar's story is for everyone who has ever carried something inside them that they couldn't get out. Sometimes the only thing standing between you and the page isn't talent or courage — it's simply knowledge."
      }
    ],
    ctaText: "Ashok carried his story for three years. It took one LevelUp Screenwriting Workshop to unlock it. If you've been sitting on a story, a script idea, or a creative dream that you don't know how to start — this workshop teaches you the craft of turning what's in your head into what's on the page. It's never too late to begin.",
    ctaProgram: "Screenwriting"
  }
];

export function getStoryBySlug(slug: string): StudentStory | undefined {
  return studentStories.find(s => s.slug === slug);
}

export function getReadingTime(story: StudentStory): number {
  const totalWords = story.sections.reduce((acc, s) => acc + s.body.split(/\s+/).length + s.heading.split(/\s+/).length, 0);
  return Math.max(3, Math.ceil(totalWords / 230));
}
