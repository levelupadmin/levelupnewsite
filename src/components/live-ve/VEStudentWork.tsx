import FadeInSection from "@/components/FadeInSection";

const VEStudentWork = () => (
  <section className="py-20 md:py-28" style={{ background: "hsl(160 8% 8%)" }}>
    <div className="max-w-[1400px] mx-auto px-6 md:px-8">
      <FadeInSection className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight mb-4">
          Our<br />Students Work
        </h2>
        <p className="text-sm text-white/50 max-w-xl mx-auto">
          From Reels to short films, this is the kind of work our students leave the program with.
        </p>
      </FadeInSection>

      <FadeInSection delay={100}>
        <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video">
          <video
            src="https://framerusercontent.com/assets/UuGNRRoqDbhEhYyfwwmszz2LY.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </FadeInSection>
    </div>
  </section>
);

export default VEStudentWork;
