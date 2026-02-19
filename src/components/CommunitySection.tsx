import { ArrowLeft, ArrowRight } from "lucide-react";

const gridItems = [
  { src: "https://framerusercontent.com/images/BYEJmEGKJbMtIUNOOJnTn8x7bI.jpg", alt: "Creators collaborating on set", className: "col-span-1 row-span-2" },
  { src: "https://framerusercontent.com/images/6Fs7kg1MQc0tPjBPHJicVaPYKw.jpg", alt: "Group learning session", className: "col-span-1 row-span-1" },
  { src: "https://framerusercontent.com/images/QTzKDvEMmKrCMiXYr3VfjyEqcU.jpg", alt: "People creating content together", className: "col-span-1 row-span-2" },
  { src: "https://framerusercontent.com/images/TdTF5FmC13HuQzBl3betaHi6DeE.jpg", alt: "Outdoor creator challenge", className: "col-span-1 row-span-1" },
  { src: "https://framerusercontent.com/images/wJMFRMDa5ePMdMjfiDe2JaaQA.jpg", alt: "Workshop mentoring moment", className: "col-span-1 row-span-1" },
  { src: "https://framerusercontent.com/images/90aqgxnsMoMGbcRsEgWvVS1Lpk.jpg", alt: "Collaborative filming session", className: "col-span-1 row-span-1" },
  { src: "https://framerusercontent.com/images/ckwOsA1cF3VeJHilFPAotSOW6I.jpg", alt: "Team discussion and brainstorming", className: "col-span-1 row-span-1" },
  { src: "https://framerusercontent.com/images/3HpLaR4Z2uVzMVADt4v1TJE0fQ.jpg", alt: "Creator in action on location", className: "col-span-1 row-span-1" },
  { src: "https://framerusercontent.com/images/AoFTrEzekJAXse1VDg6jotVQM.jpg", alt: "Core learning session with mentors", className: "col-span-1 row-span-2" },
  { src: "https://framerusercontent.com/images/S2pcNDOeVFHZfnRqBT15sAdpo.jpg", alt: "Behind-the-feed community session", className: "col-span-1 row-span-1" },
  { src: "https://framerusercontent.com/images/kAjwW7QZ8W8MvPnOh5JJrXMdY.jpg", alt: "Group activity discovering creative niches", className: "col-span-1 row-span-1" },
];

const CommunitySection = () => {
  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <span className="text-primary text-xs uppercase tracking-[0.25em] font-semibold mb-3 block">
              Dive into our community
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 text-foreground">
              Learn Online, Connect Offline
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg leading-relaxed">
              Engage with other learners, alumni, and mentors and attend community sessions to learn from each other in our curated community.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 mt-2">
            <button className="w-10 h-10 rounded-md border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-md border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 auto-rows-[140px] md:auto-rows-[160px] gap-3">
          {gridItems.map((item, i) => (
            <div
              key={i}
              className={`${item.className} rounded-lg overflow-hidden ${i > 7 ? "hidden md:block" : ""}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
