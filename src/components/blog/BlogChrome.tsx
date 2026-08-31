import MotionProvider from "@/components/MotionProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Navbar and Footer for blog pages, which are .astro rather than one big React
 * island. Both use framer-motion's `m` components, which render at their
 * `initial` state and never animate unless a LazyMotion provider sits above
 * them: mounted bare from an .astro file the navbar stays at opacity 0, present
 * in the DOM but invisible. These wrappers carry the provider with them.
 *
 * Chrome only. Everything a crawler needs is server-rendered in the .astro
 * templates, so nothing here is load-bearing for the answer on the page.
 */
export function BlogNavbar() {
  return (
    <MotionProvider>
      <Navbar />
    </MotionProvider>
  );
}

export function BlogFooter() {
  return (
    <MotionProvider>
      <Footer />
    </MotionProvider>
  );
}
