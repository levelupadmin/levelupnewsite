import { Link } from "react-router-dom";
import FadeInSection from "@/components/FadeInSection";
import karthikImg from "@/assets/karthik-subbaraj-masterclass.png";
import anthonyImg from "@/assets/anthony-gonsalvez-masterclass.png";
import venketImg from "@/assets/venket-ram.png";
import kiranImg from "@/assets/drk-kiran.webp";
import raviImg from "@/assets/ravi-basrur.webp";
import lokeshImg from "@/assets/lokesh-kanagaraj.png";
import nelsonImg from "@/assets/nelson-dilipkumar.jpg";

const otherMasterclasses = [
  { name: "Karthik Subbaraj", image: karthikImg, href: "https://masterclass.leveluplearning.in/karthik-subbaraj" },
  { name: "Anthony Gonsalvez", image: anthonyImg, href: "/masterclass/anthony-gonsalvez" },
  { name: "G Venket Ram", image: venketImg, href: "/masterclass/g-venket-ram" },
  { name: "DRK Kiran", image: kiranImg, href: "/masterclass/drk-kiran" },
  { name: "Ravi Basrur", image: raviImg, href: "https://masterclass.leveluplearning.in/ravi-basrur" },
  { name: "Lokesh Kanagaraj", image: lokeshImg, href: "https://masterclass.leveluplearning.in/lokesh-kanagaraj" },
  { name: "Nelson Dilipkumar", image: nelsonImg, href: "https://masterclass.leveluplearning.in/nelson-dilipkumar" },
];

const OtherMasterclasses = ({ currentName }: { currentName: string }) => (
  <section className="relative bg-background py-12 md:py-16">
    <FadeInSection className="text-center px-6 md:px-12 mb-8 md:mb-10">
      <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-medium text-hero-headline tracking-[-0.03em]">
        Check out our{" "}
        <em className="not-italic font-normal text-gradient-amber">other masterclasses</em>
      </h2>
    </FadeInSection>
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
        {otherMasterclasses
          .filter((mc) => mc.name !== currentName)
          .map((mc) => {
            const isInternal = mc.href.startsWith("/");
            const Wrapper = isInternal ? Link : "a";
            const linkProps = isInternal
              ? { to: mc.href }
              : { href: mc.href, target: "_blank" as const, rel: "noopener noreferrer" };
            return (
              <Wrapper
                key={mc.name}
                {...(linkProps as any)}
                className="group flex-shrink-0 snap-start w-[180px] md:w-[220px]"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-card shadow-md transition-shadow duration-500 group-hover:shadow-[0_0_20px_2px_hsl(38_75%_55%/0.35)]">
                  <img
                    src={mc.image}
                    alt={`Portrait of ${mc.name}, Instructor at LevelUp Learning`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 rounded-sm ring-1 ring-inset ring-white/0 group-hover:ring-primary/40 transition-all duration-500 pointer-events-none" />
                </div>
              </Wrapper>
            );
          })}
      </div>
    </div>
  </section>
);

export default OtherMasterclasses;
