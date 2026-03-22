import { cn } from "@/lib/utils";
import { INTRO_STRIP_SECTION_CONTENT } from "./constants";

export const IntroStripSection = () => {
  return (
    <section className="bg-[#181818] px-[100px] py-[72px] flex items-center gap-[70px]">
      {INTRO_STRIP_SECTION_CONTENT.map((item, index) => (
        <div
          key={item.label}
          className={cn(
            "border-r border-[#FFFFFF0D] flex-1 space-y-[10px]",
            index === INTRO_STRIP_SECTION_CONTENT.length - 1 && "border-r-0"
          )}
        >
          <p className="text-[#FFFFFF26] text-[10px] text-sm">{item.label}</p>
          <p className="text-[#F3F1EE99] text-[14px] font-heading text-[21px]">{item.value}</p>
        </div>
      ))}
    </section>
  );
};
