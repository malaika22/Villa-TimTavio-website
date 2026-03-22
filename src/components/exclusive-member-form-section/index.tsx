import { SectionContainer } from "../section-container";
import { ExclusiveMemberForm } from "./ExclusiveMemberForm";

export const ExclusiveMemberFormSection = () => {
  return (
    <SectionContainer wrapperClassName="bg-[F3F1EE]">
      <h2 className="text-[#2C2C2C] text-[52px] leading-[56.16px] font-light text-center tracking-[0%]">
        Apply to become an Exclusive Member
      </h2>
      <ExclusiveMemberForm />
    </SectionContainer>
  );
};
