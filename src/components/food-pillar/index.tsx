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
    <div>
      <PillarHeroSection
        tag="The Food"
        title="Where every meal is an occasion."
        subtitle="Private Chef · Local Harvest · Candlelit Evenings"
        Image={
          <NextImage
            src="/images/food-pillar/food-pillar-1.png"
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
          <AnimatedRow className="lg:grid-cols-[2fr_1fr]">
            <motion.div variants={cardLeft}>
              <PillarCard
                className="h-[320px] sm:h-[420px] lg:h-[650px]"
                Image={
                  <NextImage
                    src="/images/food-pillar/food-pillar-6.jpeg"
                    alt="food-1"
                    layout="fill"
                    objectFit="cover"
                  />
                }
                title="Roasted garden vegetables, mole negro & herb oil."
                subtitle="Chef Billy Maldonado · Fónico"
              />
            </motion.div>
            <motion.div variants={cardRight}>
              <PillarCard
                className="h-[320px] sm:h-[420px] lg:h-[650px]"
                Image={
                  <NextImage
                    src="/images/food-pillar/food-pillar-9.jpeg"
                    alt="food-2"
                    layout="fill"
                    objectFit="cover"
                  />
                }
                title="Chef Billy"
                subtitle="Fónico · Mexico City"
              />
            </motion.div>
          </AnimatedRow>

          <AnimatedRow className="sm:grid-cols-2 lg:grid-cols-3">
            {foodsContent.map(({ src, title, subtitle, alt }) => (
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
