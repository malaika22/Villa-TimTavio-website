import { SectionContainer } from "../section-container";
import { Button } from "../ui/button";

export const PhilosophySection = () => {
  return (
    <SectionContainer
      wrapperClassName="bg-[#8C7261]"
      className=" flex items-center space-y-0 justify-between"
    >
      <h4 className="text-[#F9F7F4BF] text-[32px] leading-[40px] tracking-[0%]">
        &quot;There are places in the world that ask nothing of you. Casa TimTavio is one of
        them.&quot;
      </h4>
      <div className="bg-[#FFFFFF1F] h-[100px] w-[1px]"></div>
      <Button className="border border-[#F9F7F44D] h-[49px] w-[253px] text-[11px] text-[#F9F7F4BF] leading-[1.98px] uppercase">
        Read our Philosophy
      </Button>
    </SectionContainer>
  );
};
