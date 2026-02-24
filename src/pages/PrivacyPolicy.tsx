import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <h1 className="font-sans-body text-3xl md:text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="font-sans-body text-sm text-muted-foreground mb-10">Effective Date: 28th August 2025</p>

        <div className="space-y-8 font-sans-body text-sm md:text-base text-muted-foreground leading-relaxed">
          <p>At LevelUp Edu Pvt Ltd ("LevelUp", "we", "us", or "our"), we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit www.leveluplearning.in, register for our programs, or engage with our services.</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
            <p className="mb-3">We collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Personal Information:</strong> Name, email address, phone number, billing information, etc., provided during sign-ups, applications, purchases, or contact forms.</li>
              <li><strong className="text-foreground">Usage Data:</strong> Information about your device, browser, IP address, time of visit, and interaction with the site via cookies or analytics tools.</li>
              <li><strong className="text-foreground">Program Data:</strong> Assignments, submissions, feedback, and activity from participation in our programs, workshops, or bootcamps.</li>
              <li><strong className="text-foreground">Communications:</strong> Emails, WhatsApp messages, or other interactions with our support and admissions teams.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
            <p className="mb-3">We use the collected data to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Deliver and improve our educational services and experiences</li>
              <li>Process payments and provide invoices</li>
              <li>Send program-related updates, reminders, or promotions (opt-out available)</li>
              <li>Offer customer support and respond to queries</li>
              <li>Analyze and optimize website performance and learner engagement</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Data Sharing and Disclosure</h2>
            <p className="mb-3">We do not sell or rent your data. However, we may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Third-party service providers (e.g., payment processors, communication tools like Interakt, Zoom, or Mailchimp)</li>
              <li>Mentors or instructors (if relevant to program delivery)</li>
              <li>Legal or regulatory bodies if required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Retention</h2>
            <p>We retain your personal data only for as long as necessary to fulfill the purposes outlined above, unless a longer retention period is required by law.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction, deletion, or restriction of your data</li>
              <li>Withdraw consent at any time (for marketing communication)</li>
              <li>Request a copy of your data in a portable format</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Data Security</h2>
            <p>We take commercially reasonable steps to protect your personal data through encryption, secure access controls, and regular audits.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Children's Privacy</h2>
            <p>Our website and programs are not directed toward individuals under the age of 13. We do not knowingly collect data from minors.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">8. Updates to This Policy</h2>
            <p>This policy may be updated from time to time. Changes will be posted on this page with an updated effective date.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">9. Contact Us</h2>
            <p>For questions or concerns regarding this Privacy Policy, please contact:</p>
            <p className="mt-2">
              <a href="mailto:admin@leveluplearning.in" className="text-primary hover:underline">admin@leveluplearning.in</a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
