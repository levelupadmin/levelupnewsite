import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=919791520177&text=Hi";

const FloatingSupport = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 inline-flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-md bg-card/90 backdrop-blur-md border border-border text-foreground font-sans-body text-xs md:text-sm shadow-cinematic hover:border-primary/50 hover:shadow-[0_0_24px_hsl(38_75%_55%/0.15)] transition-all duration-400"
    >
      <MessageCircle className="w-4 h-4 text-primary" strokeWidth={1.5} />
      <span className="hidden sm:inline">Need help?</span>
    </a>
  );
};

export default FloatingSupport;
