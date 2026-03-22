import { PillarHeroSection } from "../pillar-hero-section";
import NextImage from "next/image";
import { SectionContainer } from "../section-container";
import { PillarCard } from "../pillar-card";
import { SectionTitle } from "../section-title";

export const FoodPillar = () => {
  return (
    <div>
      <PillarHeroSection
        tag="The Food"
        title="Where every meal is an occasion."
        subtitle="Private Chef · Local Harvest · Candlelit Evenings"
        Image={
          <NextImage
            src="/images/food-pillar/hero-section.png"
            alt="A table set for one world"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        }
      />
      <SectionContainer wrapperClassName="bg-[#E3E0DA]">
        <SectionTitle
          description="Michelin-trained chefs. Fresh-caught Pacific seafood. Private dinners composed entirely around you — never from a menu, always under open sky."
          buttonText="Enquire About Dining"
        />
        <div className="space-y-3">
          <div className="flex gap-4">
            <PillarCard
              className="h-[650px]"
              Image={
                <NextImage
                  src="/images/food-pillar/food-pillar-1.png"
                  alt="estate-1"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="La Casa Grande"
              subtitle="6 Guests · Ocean Pool Terrace · The Crown Villa"
              style={{ flex: "0 0 calc(66.666% - 8px)" }}
            />
            <PillarCard
              className="h-[650px]"
              Image={
                <NextImage
                  src="/images/food-pillar/food-pillar-2.png"
                  alt="estate-1"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="La Casa Grande"
              subtitle="6 Guests · Ocean Pool Terrace · The Crown Villa"
              style={{ flex: "0 0 calc(33.333% - 8px)" }}
            />
          </div>
          <div className="flex gap-4">
            <PillarCard
              className="h-[424px]"
              Image={
                <NextImage
                  src="/images/food-pillar/food-pillar-3.png"
                  alt="estate-1"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="La Casa Grande"
              subtitle="6 Guests · Ocean Pool Terrace · The Crown Villa"
              style={{ flex: "0 0 calc(33.333% - 8px)" }}
            />
            <PillarCard
              className="h-[424px]"
              Image={
                <NextImage
                  src="/images/food-pillar/food-pillar-4.png"
                  alt="estate-1"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="La Casa Grande"
              subtitle="6 Guests · Ocean Pool Terrace · The Crown Villa"
              style={{ flex: "0 0 calc(33.333% - 8px)" }}
            />
            <PillarCard
              className="h-[424px]"
              Image={
                <NextImage
                  src="/images/food-pillar/food-pillar-5.png"
                  alt="estate-1"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="La Casa Grande"
              subtitle="6 Guests · Ocean Pool Terrace · The Crown Villa"
              style={{ flex: "0 0 calc(33.333% - 8px)" }}
            />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};
