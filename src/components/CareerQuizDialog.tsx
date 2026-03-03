import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, ArrowRight, Sparkles, CheckCircle2,
  Clapperboard, Scissors, PenTool, Camera, Music, Palette, Video,
  Baby, BarChart3, Trophy,
  Heart, Rocket,
  Flame, Clock,
  Coins, Gem, Wallet,
  GraduationCap, Radio, Hammer, Users
} from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface CareerQuizDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "start" | "q1" | "q2" | "q3" | "q4" | "q5" | "result";

const STEPS: Step[] = ["start", "q1", "q2", "q3", "q4", "q5", "result"];

const Q1_OPTIONS: { label: string; icon: LucideIcon }[] = [
  { label: "Filmmaking", icon: Clapperboard },
  { label: "Editing", icon: Scissors },
  { label: "Writing", icon: PenTool },
  { label: "Photography", icon: Camera },
  { label: "Music", icon: Music },
  { label: "Design", icon: Palette },
  { label: "Content Creation", icon: Video },
];

const Q2_OPTIONS: { label: string; icon: LucideIcon; desc: string }[] = [
  { label: "Beginner", icon: Baby, desc: "Just starting out" },
  { label: "Intermediate", icon: BarChart3, desc: "Some experience" },
  { label: "Advanced", icon: Trophy, desc: "Seasoned creator" },
];

const Q3_OPTIONS: { label: string; icon: LucideIcon; desc: string }[] = [
  { label: "Passion / hobby", icon: Heart, desc: "Learn for the joy of it" },
  { label: "Go pro / level up", icon: Rocket, desc: "Build a career in this" },
];

const Q4_OPTIONS: { label: string; icon: LucideIcon; desc: string }[] = [
  { label: "All-in for 1–2 weeks", icon: Flame, desc: "Intensive, immersive learning" },
  { label: "Own pace / a few hours per week", icon: Clock, desc: "Flexible, self-paced" },
];

const Q5_OPTIONS: { label: string; icon: LucideIcon; desc: string }[] = [
  { label: "Under ₹15k", icon: Coins, desc: "Budget-friendly options" },
  { label: "₹3k–15k", icon: Wallet, desc: "Mid-range investment" },
  { label: "₹15k–40k or whatever it takes", icon: Gem, desc: "Premium experience" },
];

type Result = "masterclass" | "live-workshop" | "the-forge" | "advanced-mentorship";

interface ResultData {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  href: string;
  external?: boolean;
  icon: LucideIcon;
  emoji: string;
}

const RESULTS: Record<Result, ResultData> = {
  masterclass: {
    title: "Masterclass",
    subtitle: "Learn from India's finest, at your own pace.",
    description: "Pre-recorded deep-dives from top industry professionals. Learn on your schedule, revisit lessons anytime, and build your creative foundation.",
    cta: "Explore Masterclasses",
    href: "#masterclasses",
    icon: GraduationCap,
    emoji: "🎓",
  },
  "live-workshop": {
    title: "Live Workshop",
    subtitle: "Structured learning with real-time feedback.",
    description: "Join our intensive live programs with industry mentors. Get hands-on assignments, live critiques, and a certificate on completion.",
    cta: "View Live Programs",
    href: "#live-programs",
    icon: Radio,
    emoji: "📡",
  },
  "the-forge": {
    title: "The Forge",
    subtitle: "12 days. In person. You make a film.",
    description: "An immersive residential filmmaking bootcamp. Work with professional crew, equipment, and mentors to create a portfolio-worthy short film.",
    cta: "Learn About The Forge",
    href: "https://www.forgebylevelup.com/",
    external: true,
    icon: Hammer,
    emoji: "🔨",
  },
  "advanced-mentorship": {
    title: "Advanced Mentorship Program",
    subtitle: "For those ready to make the leap.",
    description: "A rigorous, mentor-led program designed for experienced creators who want to break into the professional industry with guided portfolio building.",
    cta: "Apply for Mentorship",
    href: "https://www.leveluplearning.live/bfp",
    external: true,
    icon: Users,
    emoji: "🚀",
  },
};

function getResult(answers: { q1: string[]; q2: string; q3: string; q4: string; q5: string }): Result {
  const { q2, q3, q4, q5 } = answers;
  const isAllIn = q4 === "All-in for 1–2 weeks";
  const isOwnPace = q4 === "Own pace / a few hours per week";
  const isHobby = q3 === "Passion / hobby";
  const isPro = q3 === "Go pro / level up";
  const isAdvanced = q2 === "Advanced" || q2 === "Intermediate";
  const highBudget = q5 === "₹15k–40k or whatever it takes";
  const midBudget = q5 === "₹3k–15k";
  const lowBudget = q5 === "Under ₹15k";

  if (isAllIn && highBudget) return "the-forge";
  if (isAllIn && isPro && isAdvanced && (highBudget || midBudget)) return "advanced-mentorship";
  if (isOwnPace || (isHobby && lowBudget)) return "masterclass";
  if (midBudget || (isPro && !isAllIn)) return "live-workshop";
  if (lowBudget || isHobby) return "masterclass";

  return "masterclass";
}

const CareerQuizDialog = ({ open, onOpenChange }: CareerQuizDialogProps) => {
  const [step, setStep] = useState<Step>("start");
  const [q1, setQ1] = useState<string[]>([]);
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [q4, setQ4] = useState("");
  const [q5, setQ5] = useState("");
  const [direction, setDirection] = useState(1);

  const stepIndex = STEPS.indexOf(step);
  const questionNumber = stepIndex >= 1 && stepIndex <= 5 ? stepIndex : 0;

  const reset = useCallback(() => {
    setStep("start");
    setQ1([]);
    setQ2("");
    setQ3("");
    setQ4("");
    setQ5("");
    setDirection(1);
  }, []);

  const handleOpenChange = (val: boolean) => {
    if (!val) reset();
    onOpenChange(val);
  };

  const goNext = () => {
    setDirection(1);
    const next = STEPS[stepIndex + 1];
    if (next) setStep(next);
  };

  const goBack = () => {
    setDirection(-1);
    const prev = STEPS[stepIndex - 1];
    if (prev) setStep(prev);
  };

  const toggleQ1 = (val: string) => {
    setQ1((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));
  };

  const canProceed = () => {
    switch (step) {
      case "q1": return q1.length > 0;
      case "q2": return q2 !== "";
      case "q3": return q3 !== "";
      case "q4": return q4 !== "";
      case "q5": return q5 !== "";
      default: return true;
    }
  };

  const handleNext = () => {
    if (step === "q5") {
      setDirection(1);
      setStep("result");
    } else {
      goNext();
    }
  };

  const result = step === "result" ? RESULTS[getResult({ q1, q2, q3, q4, q5 })] : null;

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md p-0 bg-background border-border overflow-hidden">
        <DialogTitle className="sr-only">Career Quiz</DialogTitle>

        {/* Progress bar for question steps */}
        {questionNumber > 0 && step !== "result" && (
          <div className="px-6 pt-5 pb-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-sans-body">Question {questionNumber} of 5</span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className={`w-2 h-2 rounded-full transition-all ${
                      n <= questionNumber ? "bg-primary" : "bg-muted-foreground/20"
                    }`}
                  />
                ))}
              </div>
            </div>
            <Progress value={(questionNumber / 5) * 100} className="h-1.5 bg-muted" />
          </div>
        )}

        <div className="px-6 pb-6 pt-4 min-h-[340px] flex flex-col">
          <AnimatePresence mode="wait" custom={direction}>
            <m.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex-1 flex flex-col"
            >
              {/* START */}
              {step === "start" && (
                <div className="flex flex-col items-center text-center gap-5 py-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
                      <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <m.div
                      className="absolute -top-1 -right-1 text-lg"
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      ✨
                    </m.div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Find Your Creative Path</h3>
                    <p className="text-sm text-muted-foreground font-sans-body leading-relaxed max-w-xs mx-auto">
                      Answer 5 quick questions and we'll recommend the perfect program for your goals.
                    </p>
                  </div>
                  <div className="flex gap-3 mt-1">
                    {[Clapperboard, Camera, Music, PenTool].map((Icon, i) => (
                      <m.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="w-9 h-9 rounded-lg bg-muted/60 flex items-center justify-center"
                      >
                        <Icon className="w-4 h-4 text-muted-foreground" />
                      </m.div>
                    ))}
                  </div>
                  <Button onClick={goNext} className="mt-2 gap-2 rounded-full px-8">
                    Start Quiz <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* Q1: Multi-select with icons */}
              {step === "q1" && (
                <QuestionLayout
                  question="What do you want to learn?"
                  hint="Select all that interest you"
                  icon={<Clapperboard className="w-5 h-5 text-primary" />}
                  onBack={goBack}
                  onNext={handleNext}
                  canProceed={canProceed()}
                >
                  <div className="grid grid-cols-2 gap-2">
                    {Q1_OPTIONS.map(({ label, icon: Icon }) => (
                      <button
                        key={label}
                        onClick={() => toggleQ1(label)}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-sans-body text-left transition-all border ${
                          q1.includes(label)
                            ? "bg-primary/15 border-primary text-foreground"
                            : "bg-muted/50 border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        {label}
                      </button>
                    ))}
                  </div>
                </QuestionLayout>
              )}

              {/* Q2 */}
              {step === "q2" && (
                <QuestionLayout
                  question="How would you describe your experience?"
                  icon={<BarChart3 className="w-5 h-5 text-primary" />}
                  onBack={goBack}
                  onNext={handleNext}
                  canProceed={canProceed()}
                >
                  <IconSingleSelect options={Q2_OPTIONS} value={q2} onChange={setQ2} />
                </QuestionLayout>
              )}

              {/* Q3 */}
              {step === "q3" && (
                <QuestionLayout
                  question="What's your goal?"
                  icon={<Rocket className="w-5 h-5 text-primary" />}
                  onBack={goBack}
                  onNext={handleNext}
                  canProceed={canProceed()}
                >
                  <IconSingleSelect options={Q3_OPTIONS} value={q3} onChange={setQ3} />
                </QuestionLayout>
              )}

              {/* Q4 */}
              {step === "q4" && (
                <QuestionLayout
                  question="How much time can you commit?"
                  icon={<Clock className="w-5 h-5 text-primary" />}
                  onBack={goBack}
                  onNext={handleNext}
                  canProceed={canProceed()}
                >
                  <IconSingleSelect options={Q4_OPTIONS} value={q4} onChange={setQ4} />
                </QuestionLayout>
              )}

              {/* Q5 */}
              {step === "q5" && (
                <QuestionLayout
                  question="What's your budget?"
                  icon={<Wallet className="w-5 h-5 text-primary" />}
                  onBack={goBack}
                  onNext={handleNext}
                  canProceed={canProceed()}
                  nextLabel="See My Result"
                >
                  <IconSingleSelect options={Q5_OPTIONS} value={q5} onChange={setQ5} />
                </QuestionLayout>
              )}

              {/* RESULT */}
              {step === "result" && result && (
                <div className="flex flex-col items-center text-center gap-4 py-2">
                  <m.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="relative"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
                      <result.icon className="w-8 h-8 text-primary" />
                    </div>
                    <m.span
                      className="absolute -top-2 -right-2 text-xl"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {result.emoji}
                    </m.span>
                  </m.div>
                  <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <p className="text-xs text-muted-foreground font-sans-body uppercase tracking-wider mb-3">We recommend</p>
                    <h3 className="text-xl font-semibold text-foreground mb-1">{result.title}</h3>
                    <p className="text-sm text-primary font-sans-body">{result.subtitle}</p>
                  </m.div>
                  <m.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-muted-foreground font-sans-body leading-relaxed max-w-xs"
                  >
                    {result.description}
                  </m.p>
                  <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col gap-2 w-full mt-2"
                  >
                    <Button asChild className="rounded-full gap-2">
                      <a
                        href={result.href}
                        target={result.external ? "_blank" : undefined}
                        rel={result.external ? "noopener noreferrer" : undefined}
                        onClick={() => {
                          if (!result.external) handleOpenChange(false);
                        }}
                      >
                        {result.cta} <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground text-xs">
                      Retake Quiz
                    </Button>
                  </m.div>
                </div>
              )}
            </m.div>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

/* ---- Sub-components ---- */

function QuestionLayout({
  question,
  hint,
  icon,
  children,
  onBack,
  onNext,
  canProceed,
  nextLabel = "Next",
}: {
  question: string;
  hint?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onBack: () => void;
  onNext: () => void;
  canProceed: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-base font-semibold text-foreground leading-snug">{question}</h3>
          {hint && <p className="text-xs text-muted-foreground font-sans-body mt-1">{hint}</p>}
        </div>
      </div>
      <div className="flex-1">{children}</div>
      <div className="flex justify-between items-center pt-2 border-t border-border/50">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1 text-muted-foreground">
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Button>
        <Button onClick={onNext} disabled={!canProceed} size="sm" className="gap-1 rounded-full px-5">
          {nextLabel} <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

function IconSingleSelect({
  options,
  value,
  onChange,
}: {
  options: { label: string; icon: LucideIcon; desc: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map(({ label, icon: Icon, desc }) => (
        <button
          key={label}
          onClick={() => onChange(label)}
          className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-left transition-all border ${
            value === label
              ? "bg-primary/15 border-primary"
              : "bg-muted/50 border-transparent hover:bg-muted"
          }`}
        >
          <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
            value === label ? "bg-primary/20" : "bg-muted"
          }`}>
            <Icon className={`w-4 h-4 ${value === label ? "text-primary" : "text-muted-foreground"}`} />
          </div>
          <div>
            <p className={`text-sm font-medium ${value === label ? "text-foreground" : "text-foreground/80"}`}>{label}</p>
            <p className="text-xs text-muted-foreground font-sans-body">{desc}</p>
          </div>
          {value === label && <CheckCircle2 className="w-4 h-4 text-primary ml-auto shrink-0" />}
        </button>
      ))}
    </div>
  );
}

export default CareerQuizDialog;
