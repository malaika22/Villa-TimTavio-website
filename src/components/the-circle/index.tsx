import Image from "next/image";
import { SectionContainer } from "../section-container";

const circleData = [
  "Priority access to all six villas",
  "Dedicated estate concierge",
  "Exclusive member events & gatherings",
  "Invitation to new property releases",
  "Annual estate retreat for members",
];

export const TheCircle = () => {
  return (
    <SectionContainer
      wrapperClassName="bg-[#E3E0DA] "
      className="flex justify-between items-center"
    >
      <div className="flex-1 space-y-[60px]">
        <div className="border border-[#6E3D3538] text-[#8C7261] text-[8px] py-[9px] px-[18px] w-fit uppercase tracking-[2.88px]">
          The Circle — Members Only
        </div>
        <div>
          <h4 className="text-[56px] text-[#181818] leading-[58.8px] italic max-w-[242px] font-light pb-[40px]">
            A different kind of belonging.
          </h4>
          <p className="max-w-[350px] text-[#797168] text-[12px] leading-[30px] font-light">
            The Circle is our private membership for guests who return. Not a loyalty programme. Not
            a points system. A quiet acknowledgment that you are part of something rare.
          </p>
        </div>
        <div>
          {circleData.map((item, index) => (
            <div key={index} className="py-[18px] border-b border-[#8F88801F] flex gap-[20px]">
              <div className="w-[16px] h-[1px] bg-[#8C7261]"> </div>
              <p className="text-[#797168] text-[10px] leading-[0.8px]">{item}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex-1 w-[960] h-[1108px]">
        <Image src="/images/the-circle-section.png" alt="the-circle-section" fill />
      </div>
    </SectionContainer>
  );
};
