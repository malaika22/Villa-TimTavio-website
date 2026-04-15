"use client";

import { PillarHeroSection } from "../pillar-hero-section";
import NextImage from "next/image";
import { SectionContainer } from "../section-container";
import { SectionTitle } from "../section-title";
import { PillarCard } from "../pillar-card";
import { motion } from "framer-motion";
import { AnimatedRow } from "./AnimatedRow";
import { cardLeft } from "./animations";
import { cardRight } from "./animations";
import { cardUp } from "./animations";
import { experienceContent } from "./constants";

export const ExperiencePillar = () => {
  return (
    <div id="experiences">
      <PillarHeroSection
        title="Puerto Escondido doesn't hold back. Neither should you."
        subtitle="Humpback Whales · Turtle Releases · The Wild Pacific"
        Image={
          <NextImage
            src="/images/experience-pillar/experience-hero-section.png"
            alt="Puerto Escondido doesn't hold back. Neither should you"
            layout="fill"
            objectFit="cover"
          />
        }
        tag="The Experience"
      />
      <SectionContainer wrapperClassName="bg-[#E3E0DA]">
        <SectionTitle
          description="From humpback whale encounters to private turtle releases at dawn — Puerto Escondido offers experiences that cannot be manufactured, replicated, or forgotten."
          buttonText="Enter The Infinity"
        />

        <div className="space-y-3">
          <AnimatedRow className="lg:grid-cols-[2fr_1fr]">
            <motion.div variants={cardLeft}>
              <PillarCard
                className="h-[320px] sm:h-[420px] lg:h-[643px]"
                Image={
                  <NextImage
                    src="/images/experience-pillar/experience-1.jpeg"
                    alt="Punta Zicatela"
                    layout="fill"
                    objectFit="cover"
                  />
                }
                title="The kind of place, you stop checking your phone."
                subtitle="Punta Zicatela · Oaxaca · Mexico"
              />
            </motion.div>
            <motion.div variants={cardRight}>
              <PillarCard
                className="h-[320px] sm:h-[420px] lg:h-[643px]"
                Image={
                  <NextImage
                    src="/images/experience-pillar/experience-2.webp"
                    alt="Sunset rides"
                    layout="fill"
                    objectFit="cover"
                  />
                }
                title="The shore,at your own pace."
                subtitle="Sunset rides · Curated upon request"
              />
            </motion.div>
          </AnimatedRow>

          <AnimatedRow className="sm:grid-cols-2 lg:grid-cols-3">
            {experienceContent.map(({ alt, src, title, subtitle }) => (
              <motion.div key={alt} variants={cardUp}>
                <PillarCard
                  className="h-[280px] sm:h-[340px] lg:h-[424px]"
                  Image={<NextImage src={src} alt={alt} layout="fill" objectFit="cover" />}
                  title={title}
                  subtitle={subtitle}
                />
              </motion.div>
            ))}
          </AnimatedRow>
        </div>
      </SectionContainer>
    </div>
  );
};
