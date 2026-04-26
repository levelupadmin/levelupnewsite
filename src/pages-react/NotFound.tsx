import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";

const NotFound = () => {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    setPathname(path);
    if (path) {
      console.error("404 Error: User attempted to access non-existent route:", path);
    }
  }, []);

  return (
    <MotionProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-6 py-24 md:py-32">
          <div className="text-center max-w-xl mx-auto">
            <p className="font-display text-7xl md:text-9xl uppercase tracking-tight text-primary leading-none mb-4">404</p>
            <h1 className="font-serif-display text-2xl md:text-4xl text-foreground mb-4">Page not found</h1>
            <p className="font-sans-body text-sm md:text-base text-muted-foreground mb-2">
              We couldn't find the page you're looking for.
            </p>
            {pathname && (
              <p className="font-mono text-xs text-muted-foreground/60 mb-8 break-all">
                {pathname}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-8">
              <a
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-sans-body font-semibold text-sm hover:bg-primary/90 transition-colors"
              >
                Back to home
              </a>
              <a
                href="/student-stories"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-border text-foreground font-sans-body text-sm hover:bg-card transition-colors"
              >
                Read student stories
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </MotionProvider>
  );
};

export default NotFound;
