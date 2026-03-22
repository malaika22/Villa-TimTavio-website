import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export const SectionTitle = ({
  description,
  buttonText,
  //   buttonLink,
}: {
  description: string;
  buttonText: string;
  //   buttonLink: string;
}) => {
  return (
    <div className="flex items-end">
      <div className="flex-1">
        <p className="text-[#797168] text-[12px] leading-[28.8px] font-light max-w-[440px]">
          {description}
        </p>
      </div>
      <div className="flex-1 flex justify-center">
        <Button
          variant="ghost"
          className="gap-2 :hover:bg-transparent text-[#797168] font-regular text-[9px]"
        >
          {buttonText} <ArrowRight />
        </Button>
      </div>
    </div>
  );
};
