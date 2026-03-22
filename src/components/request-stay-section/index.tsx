"use client";

import { SectionContainer } from "../section-container";
import { contactItems } from "./constants";
import { RequestStayForm } from "./request-stay-form";

export const RequestStaySection = () => {
  return (
    <SectionContainer className="bg-[#2C2C2C] px-12 py-16 max-w-[1920px] mx-auto">
      <div className="grid grid-cols-[3fr_3fr] gap-x-24">
        {/* LEFT: Info */}
        <div className="flex flex-col">
          <div>
            <p className="text-[10px] tracking-[2.8px] uppercase text-[#B59B8A] mb-6">
              Request a Stay
            </p>
            <h2 className="text-white text-[52px] font-light leading-[56.16px] tracking-[0%] mb-8">
              Tell us
              <br />
              what you
              <br />
              <em className="italic">need.</em>
            </h2>
            <p className="text-[#F9F7F466] text-[14px] leading-[26.6px] tracking-[0%] font-light">
              Every stay at Casa TimTavio is arranged personally. There are no booking engines, no
              availability calendars. Tell us who you are and what you&apos;re looking for —
              we&apos;ll take care of the rest.
            </p>
          </div>

          <div className="space-y-6 mt-14">
            {contactItems.map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] tracking-[1.98px] uppercase text-[#F9F7F447] mb-2">
                  {label}
                </p>
                <p className="text-[15px] font-light text-[#F9F7F4BF]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Form */}
        <RequestStayForm />
      </div>
    </SectionContainer>
  );
};
