import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize2,
  X,
  BookOpen,
  Code,
  Users,
  Clock,
  Sparkles,
  RefreshCw,
  Zap,
} from "lucide-react";

const featurePills = [
  { icon: BookOpen, label: "Lessons" },
  { icon: Code, label: "Coding tasks" },
  { icon: Users, label: "Community events" },
  { icon: Clock, label: "Office hours" },
  { icon: Sparkles, label: "AI hints & instant feedback" },
  { icon: Zap, label: "Our AI assistant Dot" },
  { icon: RefreshCw, label: "Lifetime access" },
];

const lessons = [
  { title: "From Chatbots to Agents: What's the Difference?", category: "Theory", duration: "15 min" },
  { title: "Setting Up Your First AI Agent", category: "Practical", duration: "25 min" },
  { title: "Prompt Engineering Fundamentals", category: "Theory", duration: "20 min" },
  { title: "Building a RAG Pipeline", category: "Practical", duration: "30 min" },
  { title: "Evaluating Agent Performance", category: "Theory", duration: "15 min" },
];

const WhyLevelUp = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section aria-label="Why choose LevelUp" className="relative py-12 md:py-16 overflow-hidden">
      {/* Headline */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 md:mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12">
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium text-hero-headline leading-[1.15] tracking-tight max-w-lg">
            The most intentional way to learn{" "}
            <span className="text-gradient-amber">the craft.</span>
          </h2>
          <p className="font-sans-body text-sm md:text-base text-hero-subtext leading-relaxed max-w-sm md:pb-2">
            We changed how creators learn. Build real skills with mentors who
            built careers — not PowerPoint decks.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {/* Card 1 - Black */}
          <Card
            index={0}
            isExpanded={expandedIndex === 0}
            onToggle={toggle}
            bg="bg-[hsl(0_0%_5%)]"
            textColor="text-white"
            subTextColor="text-white/60"
            headline="A learning experience tailored to you"
            closedContent={
              <div className="mt-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-sans-body">Chapter 2</span>
                <p className="font-sans-body text-sm text-white/80">Development Environments</p>
                <div className="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-4 py-1.5">
                  <span className="font-sans-body text-xs text-white/70">Continue →</span>
                </div>
              </div>
            }
            expandedContent={
              <div className="space-y-6">
                <p className="font-sans-body text-sm text-white/70 leading-relaxed">
                  The most powerful learning platform on the market—that anyone can follow. AI study tools included. You just need a computer and an Internet connection.
                </p>
                <div>
                  <span className="font-sans-body text-xs uppercase tracking-widest text-white/40 mb-3 block">Everything in one place</span>
                  <div className="flex flex-wrap gap-2">
                    {featurePills.map((pill) => (
                      <span key={pill.label} className="inline-flex items-center gap-1.5 border border-white/20 rounded-full px-3 py-1.5">
                        <pill.icon size={14} className="text-white/50" />
                        <span className="font-sans-body text-xs text-white/80">{pill.label}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-white/10 pt-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                      <span className="font-sans-body text-xs font-semibold text-white/80">SM</span>
                    </div>
                    <div>
                      <p className="font-sans-body text-xs font-semibold text-white/90">Stephanie McMillan</p>
                      <p className="font-sans-body text-xs text-white/40">Creative Technologist</p>
                      <p className="font-sans-body text-sm text-white/60 mt-2 italic leading-relaxed">
                        "The structured approach combined with real mentorship was exactly what I needed to transition into tech."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          {/* Card 2 - Peach/Coral */}
          <Card
            index={1}
            isExpanded={expandedIndex === 1}
            onToggle={toggle}
            bg="bg-[hsl(15_70%_88%)]"
            textColor="text-[hsl(20_20%_15%)]"
            subTextColor="text-[hsl(20_20%_15%)/0.6]"
            headline="Stuck? Get 1-on-1 guidance"
            closedContent={
              <div className="mt-auto flex flex-col gap-3">
                <div className="rounded-xl border border-[hsl(20_20%_15%)/0.1] bg-white/40 backdrop-blur-sm p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[hsl(20_20%_15%)/0.1] flex items-center justify-center">
                    <Users size={18} className="text-[hsl(20_20%_15%)/0.6]" />
                  </div>
                  <div>
                    <p className="font-sans-body text-sm font-medium text-[hsl(20_20%_15%)]">Meet your mentor</p>
                    <p className="font-sans-body text-[11px] text-[hsl(20_20%_15%)/0.5]">Real humans, real help</p>
                  </div>
                </div>
              </div>
            }
            expandedContent={
              <div className="space-y-4">
                <div className="rounded-xl border border-[hsl(20_20%_15%)/0.1] bg-white/50 backdrop-blur-sm p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-[hsl(20_20%_15%)/0.15] flex items-center justify-center">
                      <span className="font-sans-body text-sm font-semibold text-[hsl(20_20%_15%)]">AK</span>
                    </div>
                    <div>
                      <p className="font-sans-body text-sm font-semibold text-[hsl(20_20%_15%)]">Andrew K.</p>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="font-sans-body text-[11px] text-green-700">Online now</span>
                      </div>
                    </div>
                  </div>
                  <p className="font-sans-body text-xs text-[hsl(20_20%_15%)/0.6]">Senior Engineer • 12 years exp.</p>
                </div>
                <div className="rounded-xl border border-[hsl(20_20%_15%)/0.1] bg-white/50 backdrop-blur-sm p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center">
                      <Sparkles size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-sans-body text-sm font-semibold text-[hsl(20_20%_15%)]">Dot — AI Assistant</p>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="font-sans-body text-[11px] text-green-700">Online 24/7</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          {/* Card 3 - Dark brown */}
          <Card
            index={2}
            isExpanded={expandedIndex === 2}
            onToggle={toggle}
            bg="bg-[hsl(20_20%_15%)]"
            textColor="text-white"
            subTextColor="text-white/60"
            headline="Make steady progress with bite-sized lessons"
            closedContent={
              <div className="mt-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 text-center">
                <Clock size={20} className="text-white/30 mx-auto mb-2" />
                <span className="font-sans-body text-xs text-white/50">15–30 min per lesson</span>
              </div>
            }
            expandedContent={
              <div className="space-y-2">
                {lessons.map((lesson, i) => (
                  <div key={i} className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-sans-body text-sm text-white/85 leading-snug truncate">{lesson.title}</p>
                      <span className="inline-flex items-center gap-1.5 mt-1.5">
                        <span className="font-sans-body text-[10px] uppercase tracking-wider text-white/40 border border-white/15 rounded px-1.5 py-0.5">{lesson.category}</span>
                      </span>
                    </div>
                    <span className="font-sans-body text-xs text-white/40 shrink-0">{lesson.duration}</span>
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
};

interface CardProps {
  index: number;
  isExpanded: boolean;
  onToggle: (index: number) => void;
  bg: string;
  textColor: string;
  subTextColor: string;
  headline: string;
  closedContent: React.ReactNode;
  expandedContent: React.ReactNode;
}

const Card = ({ index, isExpanded, onToggle, bg, textColor, subTextColor, headline, closedContent, expandedContent }: CardProps) => {
  return (
    <motion.div
      layout
      className={`${bg} rounded-2xl cursor-pointer overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl ${!isExpanded ? "hover:-translate-y-1" : ""}`}
      onClick={() => onToggle(index)}
      style={{ minHeight: isExpanded ? 480 : undefined }}
    >
      <motion.div layout className="flex flex-col p-7 md:p-8" style={{ minHeight: isExpanded ? "auto" : 420 }}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <h3 className={`font-serif-display text-xl md:text-2xl font-medium ${textColor} leading-tight max-w-[85%]`}>
            {headline}
          </h3>
          <button
            className={`shrink-0 w-8 h-8 rounded-full border ${textColor === "text-white" ? "border-white/20 hover:bg-white/10" : "border-[hsl(20_20%_15%)/0.2] hover:bg-[hsl(20_20%_15%)/0.1]"} flex items-center justify-center transition-colors`}
            onClick={(e) => { e.stopPropagation(); onToggle(index); }}
          >
            {isExpanded ? (
              <X size={16} className={textColor === "text-white" ? "text-white/70" : "text-[hsl(20_20%_15%)/0.7]"} />
            ) : (
              <Maximize2 size={14} className={textColor === "text-white" ? "text-white/70" : "text-[hsl(20_20%_15%)/0.7]"} />
            )}
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              {expandedContent}
            </motion.div>
          ) : (
            <motion.div
              key="closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col"
            >
              {closedContent}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default WhyLevelUp;
