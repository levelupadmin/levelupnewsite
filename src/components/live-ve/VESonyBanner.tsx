import FadeInSection from "@/components/FadeInSection";
import sonyBg from "@/assets/ve-sony-bg.png";

const VESonyBanner = () => (
  <section className="py-6 px-4 md:px-8" style={{ background: "hsl(160 8% 8%)" }}>
    <div className="max-w-[1400px] mx-auto">
      <FadeInSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* VE Academy Logo Card */}
          <div
            className="rounded-2xl p-8 md:p-10 flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(270 50% 25%), hsl(280 60% 35%))",
            }}
          >
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "24px 24px"
            }} />
            <div className="relative text-center">
              <div className="text-white/80 text-xs tracking-[0.3em] uppercase mb-1">
                THE LEVELUP
              </div>
              <div className="text-3xl md:text-4xl font-normal text-white mb-1">
                Video <em className="text-purple-300">Editing</em>
              </div>
              <div className="text-white/80 text-xs tracking-[0.3em] uppercase">
                ACADEMY
              </div>
            </div>
          </div>

          {/* Sony Partnership Card */}
          <div
            className="rounded-2xl p-8 md:p-10 flex items-center justify-center gap-8 min-h-[200px] relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(270 40% 20%), hsl(280 50% 30%))",
            }}
          >
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "24px 24px"
            }} />
            <div className="relative flex items-center gap-8 flex-wrap justify-center">
              <div className="text-center">
                <p className="text-white/60 text-xs mb-2">Powered By</p>
                <div className="text-4xl md:text-5xl font-bold text-white tracking-[0.15em]">
                  SONY<span className="text-xs align-super">®</span>
                </div>
              </div>
              <div className="text-left">
                <p className="text-white/60 text-xs mb-1">This program offers</p>
                <p className="text-sm">
                  <span className="text-purple-300 font-semibold">exclusive discounts</span>{" "}
                  <span className="text-white/80">on</span><br />
                  <span className="text-purple-300 font-semibold">industry-standard gear</span>{" "}
                  <span className="text-white/80">& tools</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  </section>
);

export default VESonyBanner;
