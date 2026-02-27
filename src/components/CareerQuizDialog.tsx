import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CareerQuizDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "start" | "q1" | "q2" | "q3" | "q4" | "q5" | "result";

const STEPS: Step[] = ["start", "q1", "q2", "q3", "q4", "q5", "result"];

const Q1_OPTIONS = ["Filmmaking", "Editing", "Writing", "Photography", "Music", "Design", "Content Creation"];
const Q2_OPTIONS = ["Beginner", "Intermediate", "Advanced"];
const Q3_OPTIONS = ["Passion / hobby", "Go pro / level up"];
const Q4_OPTIONS = ["All-in for 1–2 weeks", "Own pace / a few hours per week"];
const Q5_OPTIONS = ["Under ₹15k", "₹15k–40k or whatever it takes", "₹3k–15k"];

type Result = "masterclass" | "live-workshop" | "the-forge" | "advanced-mentorship";

interface ResultData {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  href: string;
  external?: boolean;
}

const RESULTS: Record<Result, ResultData> = {
  masterclass: {
    title: "Masterclass",
    subtitle: "Learn from India's finest, at your own pace.",
    description: "Pre-recorded deep-dives from top industry professionals. Learn on your schedule, revisit lessons anytime, and build your creative foundation.",
    cta: "Explore Masterclasses",
    href: "#masterclasses",
  },
  "live-workshop": {
    title: "Live Workshop",
    subtitle: "Structured learning with real-time feedback.",
    description: "Join our intensive live programs with industry mentors. Get hands-on assignments, live critiques, and a certificate on completion.",
    cta: "View Live Programs",
    href: "#live-programs",
  },
  "the-forge": {
    title: "The Forge",
    subtitle: "12 days. In person. You make a film.",
    description: "An immersive residential filmmaking bootcamp. Work with professional crew, equipment, and mentors to create a portfolio-worthy short film.",
    cta: "Learn About The Forge",
    href: "https://www.forgebylevelup.com/",
    external: true,
  },
  "advanced-mentorship": {
    title: "Advanced Mentorship Program",
    subtitle: "For those ready to make the leap.",
    description: "A rigorous, mentor-led program designed for experienced creators who want to break into the professional industry with guided portfolio building.",
    cta: "Apply for Mentorship",
    href: "https://www.leveluplearning.live/bfp",
    external: true,
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
            </div>
            <Progress value={(questionNumber / 5) * 100} className="h-1.5 bg-muted" />
          </div>
        )}

        <div className="px-6 pb-6 pt-4 min-h-[320px] flex flex-col">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
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
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Find Your Creative Path</h3>
                    <p className="text-sm text-muted-foreground font-sans-body leading-relaxed max-w-xs mx-auto">
                      Answer 5 quick questions and we'll recommend the perfect program for your goals.
                    </p>
                  </div>
                  <Button onClick={goNext} className="mt-2 gap-2 rounded-full px-8">
                    Start Quiz <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* Q1: Multi-select */}
              {step === "q1" && (
                <QuestionLayout
                  question="What do you want to learn?"
                  hint="Select all that interest you"
                  onBack={goBack}
                  onNext={handleNext}
                  canProceed={canProceed()}
                >
                  <div className="grid grid-cols-2 gap-2">
                    {Q1_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => toggleQ1(opt)}
                        className={`px-3 py-2.5 rounded-lg text-sm font-sans-body text-left transition-all border ${
                          q1.includes(opt)
                            ? "bg-primary/15 border-primary text-foreground"
                            : "bg-muted/50 border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </QuestionLayout>
              )}

              {/* Q2: Single select */}
              {step === "q2" && (
                <QuestionLayout
                  question="How would you describe your experience?"
                  onBack={goBack}
                  onNext={handleNext}
                  canProceed={canProceed()}
                >
                  <SingleSelect options={Q2_OPTIONS} value={q2} onChange={setQ2} />
                </QuestionLayout>
              )}

              {/* Q3 */}
              {step === "q3" && (
                <QuestionLayout
                  question="What's your goal?"
                  onBack={goBack}
                  onNext={handleNext}
                  canProceed={canProceed()}
                >
                  <SingleSelect options={Q3_OPTIONS} value={q3} onChange={setQ3} />
                </QuestionLayout>
              )}

              {/* Q4 */}
              {step === "q4" && (
                <QuestionLayout
                  question="How much time can you commit?"
                  onBack={goBack}
                  onNext={handleNext}
                  canProceed={canProceed()}
                >
                  <SingleSelect options={Q4_OPTIONS} value={q4} onChange={setQ4} />
                </QuestionLayout>
              )}

              {/* Q5 */}
              {step === "q5" && (
                <QuestionLayout
                  question="What's your budget?"
                  onBack={goBack}
                  onNext={handleNext}
                  canProceed={canProceed()}
                  nextLabel="See My Result"
                >
                  <SingleSelect options={Q5_OPTIONS} value={q5} onChange={setQ5} />
                </QuestionLayout>
              )}

              {/* RESULT */}
              {step === "result" && result && (
                <div className="flex flex-col items-center text-center gap-4 py-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground font-sans-body uppercase tracking-wider">We recommend</p>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">{result.title}</h3>
                    <p className="text-sm text-primary font-sans-body">{result.subtitle}</p>
                  </div>
                  <p className="text-sm text-muted-foreground font-sans-body leading-relaxed max-w-xs">
                    {result.description}
                  </p>
                  <div className="flex flex-col gap-2 w-full mt-2">
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
                  </div>
                </div>
              )}
            </motion.div>
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
  children,
  onBack,
  onNext,
  canProceed,
  nextLabel = "Next",
}: {
  question: string;
  hint?: string;
  children: React.ReactNode;
  onBack: () => void;
  onNext: () => void;
  canProceed: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <div>
        <h3 className="text-lg font-semibold text-foreground">{question}</h3>
        {hint && <p className="text-xs text-muted-foreground font-sans-body mt-1">{hint}</p>}
      </div>
      <div className="flex-1">{children}</div>
      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1 text-muted-foreground">
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Button>
        <Button onClick={onNext} disabled={!canProceed} size="sm" className="gap-1 rounded-full px-6">
          {nextLabel} <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

function SingleSelect({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-4 py-3 rounded-lg text-sm font-sans-body text-left transition-all border ${
            value === opt
              ? "bg-primary/15 border-primary text-foreground"
              : "bg-muted/50 border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default CareerQuizDialog;
