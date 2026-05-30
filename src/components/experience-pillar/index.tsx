"use client";

import { PillarHeroSection } from "../pillar-hero-section";
import { SectionContainer } from "../section-container";
import { SectionTitle } from "../section-title";
import { PillarCard } from "../pillar-card";
import { motion } from "framer-motion";
import { AnimatedRow } from "./AnimatedRow";
import { cardLeft } from "./animations";
import { cardRight } from "./animations";
import { cardUp } from "./animations";
import { experienceContent } from "./constants";
import { IMAGE_SIZES, OptimizedImage } from "../ui/optimized-image";

export const ExperiencePillar = () => {
  return (
    <div id="experiences">
      <PillarHeroSection
        title="Puerto Escondido doesn't hold back. Neither should you."
        subtitle="Humpback Whales · Turtle Releases · The Wild Pacific"
        Image={
          <OptimizedImage
            src="/images/experience-pillar/experience-hero-section.webp"
            alt="Puerto Escondido doesn't hold back. Neither should you"
            sizes={IMAGE_SIZES.pillarHero}
          />
        }
        tag="The Experience"
      />
      <SectionContainer wrapperClassName="bg-[#E3E0DA]">
        <SectionTitle
          description="Experiences that cannot be manufactured, replicated, or forgotten. Curated entirely by your dedicated concierge, the full portfolio of excursions unlocks once you enter The Infinity."
          buttonText="Enter The Infinity"
        />

        <div className="space-y-3">
          <AnimatedRow className="lg:grid-cols-[2fr_1fr]">
            <motion.div variants={cardLeft}>
              <PillarCard
                className="h-[320px] sm:h-[420px] lg:h-[643px]"
                Image={
                  <OptimizedImage
                    src="/images/experience-pillar/experience-1.webp"
                    alt="Punta Zicatela"
                    sizes={IMAGE_SIZES.pillarCardLarge}
                  />
                }
                title="The kind of place you stop checking your phone."
                subtitle="Punta Zicatela · Oaxaca · Mexico"
              />
            </motion.div>
            <motion.div variants={cardRight}>
              <PillarCard
                className="h-[320px] sm:h-[420px] lg:h-[643px]"
                Image={
                  <OptimizedImage
                    src="/images/experience-pillar/experience-2.webp"
                    alt="Sunset rides"
                    sizes={IMAGE_SIZES.pillarCardLarge}
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
                  Image={
                    <OptimizedImage
                      src={src}
                      alt={alt}
                      sizes={IMAGE_SIZES.pillarCardSmall}
                    />
                  }
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
