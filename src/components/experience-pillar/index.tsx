import { PillarHeroSection } from "../pillar-hero-section";
import NextImage from "next/image";
import { SectionContainer } from "../section-container";
import { SectionTitle } from "../section-title";
import { PillarCard } from "../pillar-card";

export const ExperiencePillar = () => {
  return (
    <div>
      <PillarHeroSection
        title="Puerto Escondido doesn't hold back.Neither should you."
        subtitle="Humpback Whales · Turtle Releases · The Wild Pacific"
        Image={
          <NextImage
            src="/images/experience-pillar/experience-hero-section.png"
            alt="experience-pillar-hero-section"
            layout="fill"
            objectFit="cover"
          />
        }
        tag="The Experience"
      />
      <SectionContainer wrapperClassName="bg-[#E3E0DA]">
        <SectionTitle
          description="From humpback whale encounters to private turtle releases at dawn — Puerto
Escondido offers experiences that cannot be manufactured, replicated, or
forgotten."
          buttonText="Curated Exclusively Upon Inquiry"
        />
        <div className="space-y-3">
          <div className="flex gap-4">
            <PillarCard
              Image={
                <NextImage
                  src="/images/experience-pillar/experience-1.png"
                  alt="experience-pillar-1"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="La Casa Grande"
              subtitle="6 Guests · Ocean Pool Terrace · The Crown Villa"
              style={{ flex: "0 0 calc(66.666% - 8px)" }}
              className="h-[643px]"
            />
            <PillarCard
              Image={
                <NextImage
                  src="/images/experience-pillar/experience-2.png"
                  alt="experience-pillar-1"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="La Casa Grande"
              subtitle="6 Guests · Ocean Pool Terrace · The Crown Villa"
              style={{ flex: "0 0 calc(33.333% - 8px)" }}
              className="h-[643px]"
            />
          </div>
          <div className="flex gap-4">
            <PillarCard
              className="h-[424px]"
              Image={
                <NextImage
                  src="/images/experience-pillar/experience-3.png"
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
                  src="/images/experience-pillar/experience-4.png"
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
                  src="/images/experience-pillar/experience-5.png"
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
