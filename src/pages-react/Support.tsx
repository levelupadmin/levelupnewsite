import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, MessageCircle, LifeBuoy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import usePageSeo from "@/hooks/usePageSeo";

/**
 * Support hub. Required as the App Store / Play support URL and as the
 * single place students reach a human. Plain contact + common topics, no
 * ticketing system to pretend we have one.
 */

const topics = [
  {
    title: "Account and sign in",
    body: "Trouble receiving your OTP, signing in, or updating your profile. Tell us the phone number on your account so we can look it up.",
  },
  {
    title: "Course access and playback",
    body: "A lesson will not load, video will not play, or a program you enrolled in is missing. Note that lessons stream over the internet and need an active connection.",
  },
  {
    title: "Payments and refunds",
    body: "Questions about a payment, an invoice, or a refund. Include the order ID from your purchase email. Refund windows are in our Refund Policy.",
  },
  {
    title: "Certificates",
    body: "Completed a program but do not see your certificate, or need it reissued. Share the program name and the email on your account.",
  },
  {
    title: "Live cohorts and sessions",
    body: "Help with your cohort schedule, joining a live session, or submitting assignments. Mention which cohort and batch you are in.",
  },
  {
    title: "Delete your account",
    body: "You can request deletion of your account and data at any time. Email us, or use the in-app option under Profile.",
  },
];

const Support = () => {
  usePageSeo({
    title: "Support, LevelUp Learning",
    description:
      "Get help with your LevelUp Learning account, courses, payments, certificates and live cohorts. Reach our team at support@leveluplearning.in.",
    path: "/support",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MotionProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-4xl mx-auto px-6 py-20 md:py-28">
          <div className="flex items-center gap-3 mb-3">
            <LifeBuoy className="h-7 w-7 text-primary" aria-hidden="true" />
            <h1 className="font-sans-body text-3xl md:text-4xl font-bold text-foreground">Support</h1>
          </div>
          <p className="font-sans-body text-base text-muted-foreground mb-10 max-w-2xl">
            We are a small team and we read every message. Tell us what is going on and we will get
            you sorted. Most replies go out within one working day.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
            <a
              href="mailto:support@leveluplearning.in"
              className="group flex items-start gap-4 bg-card border border-border rounded-lg p-5 hover:border-primary transition-colors"
            >
              <Mail className="h-6 w-6 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold text-foreground">Email us</p>
                <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors break-all">
                  support@leveluplearning.in
                </p>
                <p className="text-xs text-muted-foreground mt-1">Best for account, payment and access help.</p>
              </div>
            </a>
            <a
              href="https://wa.me/918610700088"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 bg-card border border-border rounded-lg p-5 hover:border-primary transition-colors"
            >
              <MessageCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold text-foreground">WhatsApp</p>
                <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  +91 86107 00088
                </p>
                <p className="text-xs text-muted-foreground mt-1">Quick questions, Mon to Sat, 10am to 7pm IST.</p>
              </div>
            </a>
          </div>

          <h2 className="font-sans-body text-xl font-semibold text-foreground mb-5">What can we help with?</h2>
          <div className="space-y-5 font-sans-body text-sm md:text-base text-muted-foreground leading-relaxed mb-14">
            {topics.map((t) => (
              <div key={t.title} className="border-b border-border pb-5">
                <h3 className="text-lg font-semibold text-foreground mb-1.5">{t.title}</h3>
                <p>{t.body}</p>
              </div>
            ))}
          </div>

          <div className="bg-muted/50 border-l-2 border-primary p-5 rounded font-sans-body text-sm text-muted-foreground">
            <p className="text-foreground font-medium mb-2">When you write in, it helps to include:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>The phone number or email on your LevelUp account</li>
              <li>The name of the masterclass, cohort or program involved</li>
              <li>For payments, the order ID from your purchase email</li>
              <li>What you expected to happen, and what happened instead</li>
            </ul>
          </div>

          <p className="font-sans-body text-sm text-muted-foreground mt-12">
            See also our{" "}
            <Link to="/refund-policy" className="text-primary hover:underline">Refund Policy</Link>,{" "}
            <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> and{" "}
            <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>.
          </p>
          <p className="font-sans-body text-sm text-muted-foreground mt-4">
            LevelUp Edu Pvt Ltd, Old no.9 New no.17, Seethammal Rd, Alwarpet, Chennai, Tamil Nadu 600018.
          </p>
        </main>
        <Footer />
      </div>
    </MotionProvider>
  );
};

export default Support;
