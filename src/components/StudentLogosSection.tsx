import { motion } from "framer-motion";

const moviePosters = [
  { src: "https://cdn.prod.website-files.com/64a1317b723d50f75d1384c6/65267ad03028387e5d226bf6_kavan.jpg", alt: "Kavan" },
  { src: "https://cdn.prod.website-files.com/64a1317b723d50f75d1384c6/65267b5e286c64355816d8ac_Theri.jpg", alt: "Theri" },
  { src: "https://cdn.prod.website-files.com/64a1317b723d50f75d1384c6/65267b4f71be1f9403e1fa0d_Master.jpg", alt: "Master" },
  { src: "https://cdn.prod.website-files.com/64a1317b723d50f75d1384c6/65267b425741678fffee1099_kadaram%20k.jpg", alt: "Kadaram Kondan" },
  { src: "https://cdn.prod.website-files.com/64a1317b723d50f75d1384c6/65267b3398a90d5704b090ef_Jaanu.jpg", alt: "Jaanu" },
  { src: "https://cdn.prod.website-files.com/64a1317b723d50f75d1384c6/65267b0b840b51a26016169e_Bigil%20(1).jpg", alt: "Bigil" },
  { src: "https://cdn.prod.website-files.com/64a1317b723d50f75d1384c6/65267ae1cce78bd18a50706e_24Suriya.jpg", alt: "24" },
  { src: "https://cdn.prod.website-files.com/64a1317b723d50f75d1384c6/65267b6d786f099f6a4d5cbd_KGF.jpg", alt: "KGF" },
  { src: "https://cdn.prod.website-files.com/64a1317b723d50f75d1384c6/65267ba8089d47ca1b43a901_KGF2.jpg", alt: "KGF Chapter 2" },
  { src: "https://cdn.prod.website-files.com/64a1317b723d50f75d1384c6/64d20b76dc3dd580b71f4b15_Jailer.jpg", alt: "Jailer" },
  { src: "https://cdn.prod.website-files.com/64a1317b723d50f75d1384c6/64f6111393c1fcd9b5f5abf9_Ghajini_Hindi.jpg", alt: "Ghajini" },
  { src: "https://cdn.prod.website-files.com/64a1317b723d50f75d1384c6/64d20b8c997ceee09490f7c5_Beast.jpg", alt: "Beast" },
  { src: "https://cdn.prod.website-files.com/64a1317b723d50f75d1384c6/64d20bb83af223021982dda7_Doctor.jpg", alt: "Doctor" },
  { src: "https://cdn.prod.website-files.com/64a1317b723d50f75d1384c6/65267bf8effe02376c263f46_Anegan.jpg", alt: "Anegan" },
  { src: "https://cdn.prod.website-files.com/64a1317b723d50f75d1384c6/65267b7df78886f293ca6af2_KO.jpg", alt: "KO" },
  { src: "https://cdn.prod.website-files.com/64a1317b723d50f75d1384c6/64d20bd486b55c7b22ed6238_thaanaa.jpg", alt: "Thaanaa Serndha Koottam" },
  { src: "https://cdn.prod.website-files.com/64a1317b723d50f75d1384c6/64d20ba63ee4627a4b019e8d_Naanum%20Rowdy%20Dhaan.jpg", alt: "Naanum Rowdy Dhaan" },
  { src: "https://cdn.prod.website-files.com/64a1317b723d50f75d1384c6/65267bc38e0e6553b63085a0_Mayyakam%20Enna.jpg", alt: "Mayyakam Enna" },
];

const MarqueeRow = () => (
  <div className="flex items-center gap-4 md:gap-5">
    {moviePosters.map((poster) => (
      <img
        key={poster.alt}
        src={poster.src}
        alt={poster.alt}
        className="h-20 md:h-28 lg:h-32 w-auto rounded-sm object-cover select-none"
        loading="lazy"
      />
    ))}
  </div>
);

const StudentLogosSection = () => {
  return (
    <section className="relative bg-background py-12 md:py-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
      >
        {/* Thin separator */}
        <div className="w-12 h-px bg-border mx-auto mb-10 md:mb-12" />

        {/* Headline */}
        <h2 className="font-serif-display text-2xl md:text-3xl lg:text-4xl text-center text-muted-foreground mb-10 md:mb-12 px-6">
          Our mentors have worked in
        </h2>

        {/* Marquee container */}
        <div className="relative">
          {/* Fade left */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />

          {/* Fade right */}
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

          {/* Scrolling track */}
          <div className="flex animate-scroll-left">
            <MarqueeRow />
            <div className="w-4 md:w-5 shrink-0" />
            <MarqueeRow />
            <div className="w-4 md:w-5 shrink-0" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default StudentLogosSection;
