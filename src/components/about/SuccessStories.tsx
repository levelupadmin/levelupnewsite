import { m } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin, Briefcase } from "lucide-react";

import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";

const stories = [
  {
    name: "Chetan Chaudhary",
    role: "Aspiring Director",
    location: "Chennai",
    avatar: testimonial1,
    outcome: "Now directing his first feature film",
    journey: [
      "Attended LevelUp screenwriting workshop",
      "Made first short film at Forge",
      "Connected to Music Director Anirudh Ravichander through mentor network",
      "Now directing his first feature film with Forge batchmates as crew",
    ],
  },
  {
    name: "Bishall Paul",
    role: "Media Agency Founder",
    location: "Mumbai",
    avatar: testimonial2,
    outcome: "Amazon bestseller in fiction",
    journey: [
      "Wanted to write and publish a book but stuck without guidance",
      "Attended Forge Writing Residency, broke through creative block",
      "Published book 6 months later with Bloomberg — Amazon bestseller in fiction",
      "Now on country-wide book tour backed by publishers",
    ],
  },
  {
    name: "Kiruba Shankar",
    role: "Founder",
    location: "Bangalore",
    avatar: testimonial4,
    outcome: "500K+ views per reel",
    journey: [
      "Struggling with personal branding: camera-shy, 600–800 views per video",
      "Joined Forge Creator Program, learned authentic on-camera presence",
      "First 2 reels went viral: 500K+ views each",
      "Content now drives direct customers to his farmstay",
    ],
  },
  {
    name: "Sneha Patil",
    role: "Video Editor",
    location: "Delhi",
    avatar: testimonial5,
    outcome: "Placed at Swiggy",
    journey: [
      "Countless interviews, no job offers — couldn't prove her skills",
      "Attended LevelUp video editing cohort, built professional portfolio",
      "Placed at Swiggy 1 month after program completion",
      "Portfolio and network from the program sealed the deal",
    ],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

const SuccessStories = () => (
  <section className="py-16 md:py-24 px-6 md:px-12 bg-background relative">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-border to-transparent" />

    <div className="max-w-7xl mx-auto">
      <m.p
        {...fadeUp}
        transition={{ duration: 0.5 }}
        className="font-sans-body text-xs md:text-sm uppercase tracking-[0.2em] text-primary text-center mb-3"
      >
        Student Success Stories
      </m.p>
      <m.h2
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-serif-display text-2xl md:text-4xl text-hero-headline text-center mb-4"
      >
        Learning fueled by real outcomes
      </m.h2>
      <m.p
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="font-sans-body text-sm md:text-base text-muted-foreground text-center max-w-2xl mx-auto mb-12"
      >
        Our learners don't stop at certificates — they graduate with outcomes. Short films at festivals, books on bestseller lists, viral content, and dream jobs.
      </m.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {stories.map((s, i) => (
          <m.div
            key={s.name}
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            className="rounded-xl bg-card border border-border/50 overflow-hidden shadow-cinematic group hover:border-primary/30 transition-colors duration-300"
          >
            {/* Header */}
            <div className="flex items-center gap-4 p-5 pb-4 border-b border-border/30">
              <img
                src={s.avatar}
                alt={`Portrait of ${s.name}, ${s.role} at LevelUp Learning`}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-serif-display text-base md:text-lg text-foreground">{s.name}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Briefcase className="w-3 h-3" />
                  <span>{s.role}</span>
                  <span className="text-border">·</span>
                  <MapPin className="w-3 h-3" />
                  <span>{s.location}</span>
                </div>
              </div>
              <span className="shrink-0 bg-primary/10 text-primary text-[10px] md:text-xs font-medium px-3 py-1 rounded-full">
                {s.outcome}
              </span>
            </div>

            {/* Journey timeline */}
            <div className="p-5 pt-4">
              <ol className="space-y-3 relative">
                {s.journey.map((step, j) => {
                  const isLast = j === s.journey.length - 1;
                  return (
                    <li key={j} className="flex gap-3 items-start">
                      <div className="flex flex-col items-center shrink-0 mt-0.5">
                        {isLast ? (
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-primary/40 mt-1" />
                        )}
                        {!isLast && (
                          <div className="w-[1px] h-full min-h-[16px] bg-border/50 mt-1" />
                        )}
                      </div>
                      <p className={`font-sans-body text-sm leading-relaxed ${isLast ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                        {step}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </m.div>
        ))}
      </div>
    </div>
  </section>
);

export default SuccessStories;
