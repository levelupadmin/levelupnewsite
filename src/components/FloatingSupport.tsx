import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

const SCROLL_THRESHOLD = 600;
const WHATSAPP_URL =
  "https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20LevelUp%20programs.";

const FloatingSupport = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 inline-flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-full bg-card/90 backdrop-blur-md border border-border text-foreground font-sans-body text-xs md:text-sm shadow-cinematic hover:border-primary/50 hover:shadow-[0_0_24px_hsl(38_75%_55%/0.15)] transition-all duration-400"
        >
          <MessageCircle className="w-4 h-4 text-primary" strokeWidth={1.5} />
          <span className="hidden sm:inline">Need help?</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default FloatingSupport;
