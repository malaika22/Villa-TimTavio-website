"use client";

import { PillarHeroSection } from "../pillar-hero-section";
import NextImage from "next/image";
import { SectionContainer } from "../section-container";
import { PillarCard } from "../pillar-card";
import { SectionTitle } from "../section-title";
import { motion } from "framer-motion";
import { cardLeft, cardRight, cardUp } from "./animations";
import { AnimatedRow } from "./AnimatedRow";
import { foodsContent } from "./constants";

export const FoodPillar = () => {
  return (
    <div id="cuisine">
      <PillarHeroSection
        tag="The Food"
        title="Always Oaxacan. Always fresh from sea and soil to your table."
        subtitle="Elevated Mexican Cuisine · Michelin Pedigree · Bespoke Curation"
        Image={
          <NextImage
            src="/images/food-pillar/food-pillar-hero-section.jpg"
            alt="Michelin Pedigree"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        }
      />
      <SectionContainer wrapperClassName="bg-[#E3E0DA]">
        <SectionTitle
          description="Elevated Oaxacan cuisine rooted in wellness and local ingredients, where the guest comes first."
          buttonText="Enter The Infinity"
        />

        <div className="space-y-3">
          <AnimatedRow className="lg:grid-cols-[2fr_1fr]">
            <motion.div variants={cardLeft}>
              <PillarCard
                className="h-[420px] lg:h-[650px]"
                Image={
                  <NextImage
                    src="/images/food-pillar/food-pillar-1.jpg"
                    alt="Aguachile de Pesca"
                    layout="fill"
                    objectFit="cover"
                  />
                }
                title="Aguachile de Pesca"
                subtitle="Bright, raw, and sourced at dawn."
              />
            </motion.div>
            <motion.div variants={cardRight}>
              <PillarCard
                className="h-[420px] lg:h-[650px]"
                Image={
                  <NextImage
                    src="/images/food-pillar/food-pillar-3.jpg"
                    alt="Chef Billy Maldonado"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top"
                  />
                }
                title="Chef Billy Maldonado"
                subtitle="Executive Chef, Fónico Mexico City."
              />
            </motion.div>
          </AnimatedRow>

          <AnimatedRow className="sm:grid-cols-2 lg:grid-cols-3">
            {foodsContent.map(({ src, title, subtitle, alt }) => (
              <motion.div key={alt} variants={cardUp}>
                <PillarCard
                  className="h-[340px] lg:h-[424px]"
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
