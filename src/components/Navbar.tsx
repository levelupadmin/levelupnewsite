import { motion } from "framer-motion";
import levelupLogo from "@/assets/levelup-logo.png";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-20 py-5"
      style={{ background: "linear-gradient(180deg, hsl(220 15% 6% / 0.9) 0%, transparent 100%)" }}
    >
      <a href="#" className="flex items-center">
        <img
          src={levelupLogo}
          alt="LevelUp Learning"
          className="h-8 md:h-9 w-auto"
        />
      </a>

      <div className="hidden md:flex items-center gap-8">
        <a href="#" className="font-sans-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
          Masterclasses
        </a>
        <a href="#" className="font-sans-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
          The Forge
        </a>
        <a href="#" className="font-sans-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
          StarDa
        </a>
        <a href="#" className="font-sans-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
          About
        </a>
      </div>

      <div className="flex items-center">
        <a
          href="#"
          className="font-sans-body text-sm text-foreground border border-border px-5 py-2 rounded-full hover:border-primary hover:text-primary transition-all duration-300"
        >
          Sign In
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
