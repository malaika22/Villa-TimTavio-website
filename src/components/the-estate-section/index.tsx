import Image from "next/image";
import { EstateCard } from "./estate-card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { SectionContainer } from "../section-container";

export const TheEstateSection = () => {
  return (
    <SectionContainer wrapperClassName="bg-[#F9F7F4]">
      <div>
        <span className="text-[10px] text-[#B59B8A] mb-[20px] block">The Estate</span>
        <div className="flex justify-between">
          <div className="flex-1">
            <h5 className="text-[#2C2C2C] text-[56px] font-light leading-[60.48px]">Six villas.</h5>
            <h5 className="text-[#2C2C2C] text-[56px] font-light leading-[60.48px]">One world.</h5>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <p className="text-[#8A8278] text-[15px] font-light">
              Each villa is a private world — designed by local architects, furnished with Oaxacan
              craft, and oriented toward either the ocean, the jungle, or the sky. No two are alike.
              All are exceptional.
            </p>
            <Button className="p-0 text-[#2C2C2C99] text-[11px] bg-transparent :hover:bg-transparent w-fit">
              Enquire About a Villa <ArrowRight />
            </Button>
          </div>
        </div>
      </div>

      <section className="bg-[#F9F7F4] space-y-8">
        <div className="flex gap-4">
          <EstateCard
            Image={
              <Image
                src="/images/estate-section/estate-1.png"
                alt="estate-1"
                layout="fill"
                objectFit="cover"
              />
            }
            title="La Casa Grande"
            subtitle="6 Guests · Ocean Pool Terrace · The Crown Villa"
            style={{ flex: "0 0 calc(66.666% - 8px)" }}
          />
          <EstateCard
            Image={
              <Image
                src="/images/estate-section/estate-2.png"
                alt="estate-2"
                layout="fill"
                objectFit="cover"
              />
            }
            title="La Casa Chica"
            subtitle="2 Guests · Private Terrace · The Garden Suite"
            style={{ flex: "0 0 calc(33.333% - 8px)" }}
          />
        </div>
        <div className="flex gap-4">
          <EstateCard
            Image={
              <Image
                src="/images/estate-section/estate-3.png"
                alt="estate-1"
                layout="fill"
                objectFit="cover"
              />
            }
            title="Villa Ceilo"
            subtitle="2 Guests · Rooftop Terrace · Sunset Views"
            style={{ flex: "0 0 calc(33.333% - 8px)" }}
          />
          <EstateCard
            Image={
              <Image
                src="/images/estate-section/estate-4.png"
                alt="estate-2"
                layout="fill"
                objectFit="cover"
              />
            }
            title="Villa Ceilo"
            subtitle="2 Guests · Private Terrace · The Garden Suite"
            style={{ flex: "0 0 calc(66.666% - 8px)" }}
          />
        </div>
        <div className="flex gap-4">
          <EstateCard
            Image={
              <Image
                src="/images/estate-section/estate-5.png"
                alt="estate-2"
                layout="fill"
                objectFit="cover"
              />
            }
            title="Villa Tierra"
            subtitle="3 Guests · Garden Bedroom · Private Terrace"
            style={{ flex: "0 0 calc(50% - 8px)" }}
          />
          <EstateCard
            Image={
              <Image
                src="/images/estate-section/estate-6.png"
                alt="estate-2"
                layout="fill"
                objectFit="cover"
              />
            }
            title="Villa Ceilo"
            subtitle="2 Guests · Cliftop · Pacific Panorama"
            style={{ flex: "0 0 calc(50% - 8px)" }}
          />
        </div>
      </section>
    </SectionContainer>
  );
};
