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
            alt="experience-pillar-hero-section"
            layout="fill"
            objectFit="cover"
          />
        }
        tag="The Experience"
      />
      <SectionContainer wrapperClassName="bg-[#E3E0DA]">
        <SectionTitle
          description="From humpback whale encounters to private turtle releases at dawn — Puerto Escondido offers experiences that cannot be manufactured, replicated, or forgotten."
          buttonText="Curated Exclusively Upon Inquiry"
        />

        <div className="space-y-3">
          {/* Row 1 — left big, right small */}
          <AnimatedRow>
            <motion.div variants={cardLeft} style={{ flex: "0 0 calc(66.666% - 6px)" }}>
              <PillarCard
                className="h-[643px]"
                Image={
                  <NextImage
                    src="/images/experience-pillar/experience-8.jpeg"
                    alt="experience-1"
                    layout="fill"
                    objectFit="cover"
                  />
                }
                title="The kind of place, you stop checking your phone."
                subtitle="Punta Zicatela · Oaxaca · Mexico"
              />
            </motion.div>
            <motion.div variants={cardRight} style={{ flex: "0 0 calc(33.333% - 6px)" }}>
              <PillarCard
                className="h-[643px]"
                Image={
                  <NextImage
                    src="/images/experience-pillar/experience-6.webp"
                    alt="experience-2"
                    layout="fill"
                    objectFit="cover"
                  />
                }
                title="The shore,at your own pace."
                subtitle="Sunset rides · Arranged exclusively"
              />
            </motion.div>
          </AnimatedRow>

          <AnimatedRow>
            {experienceContent.map(({ alt, src, title, subtitle }) => (
              <motion.div key={alt} variants={cardUp} style={{ flex: "0 0 calc(33.333% - 8px)" }}>
                <PillarCard
                  className="h-[424px]"
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
