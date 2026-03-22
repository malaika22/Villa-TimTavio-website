import { ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import { IntroStripSection } from "../intro-strip-section";

export const HeroSection = () => {
  return (
    <div>
      <section className="relative  h-[945px] bg-cover bg-center bg-no-repeat  bg-[url('/images/hero-section/hero-image.png')] flex flex-col justify-end relative">
        <div className="absolute bottom-[150px] left-[100px] space-y-[55px]">
          <div className="w-[600px] space-y-[55px]">
            <div className="text-[#E8E0D461] text-[10px]">Puerto Escondido · Oaxaca · Mexico</div>
            <h1 className="text-[#F5F3F0] text-[88px] font-[300] leading-[89.76px]">
              Where the Pacific begins to whisper.
            </h1>
            <p className="text-[#F5F3F06B] text-[14px]">
              Six private villas. One estate. Entirely yours.
            </p>
          </div>
          <div className="space-x-[40px]">
            <Button className="px-[48px] h-[48px] text-[10px]">REQUEST AN INVITATION</Button>
            <Button className="bg-transparent text-[#F5F3F061] text-[10px]">
              ENTER THE ESTATE <ArrowDown size={20} />
            </Button>
          </div>
        </div>
      </section>
      <IntroStripSection />
    </div>
  );
};
