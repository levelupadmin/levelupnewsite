import FadeInSection from "@/components/FadeInSection";
import { Picture } from "@/components/Picture";
import sonyBg from "@/assets/ve-sony-bg.png";
import veAcademyLogo from "@/assets/ve-sony-banner.png";
import sonyLogo from "@/assets/logos/sony-logo.png";

const VESonyBanner = () => (
  <section className="py-6 px-4 md:px-8" style={{ background: "hsl(160 8% 8%)" }}>
    <div className="max-w-[1400px] mx-auto">
      <FadeInSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl overflow-hidden min-h-[200px] relative">
            <Picture src={veAcademyLogo} alt="The LevelUp Video Editing Academy" className="w-full h-full object-cover" />
          </div>

          {/* Sony Partnership Card */}
          <div
            className="rounded-2xl p-8 md:p-10 flex items-center justify-center gap-8 min-h-[200px] relative overflow-hidden md:col-span-2"
          >
            <Picture src={sonyBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="relative flex items-center gap-8 flex-wrap justify-center">
              <div className="text-center">
                <p className="text-white/60 text-xs mb-2">Powered By</p>
                <Picture src={sonyLogo} alt="Sony" className="h-10 md:h-14 invert" />
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
