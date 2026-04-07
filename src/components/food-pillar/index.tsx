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
    <div id="food">
      <PillarHeroSection
        tag="The Food"
        title="Where the freshest seafood goes directly from sea to table on the beach."
        subtitle="Private Chef · Local Harvest · Candlelit Evenings"
        Image={
          <NextImage
            src="/images/food-pillar/food-pillar-hero-section.jpg"
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
          buttonText="Enter The Infinity"
        />

        <div className="space-y-3">
          <AnimatedRow className="lg:grid-cols-[2fr_1fr]">
            <motion.div variants={cardLeft}>
              <PillarCard
                className="h-[320px] sm:h-[420px] lg:h-[650px]"
                Image={
                  <NextImage
                    src="/images/food-pillar/food-pillar-1.jpg"
                    alt="food-1"
                    layout="fill"
                    objectFit="cover"
                  />
                }
                title="Aguachile de Pesca"
                subtitle="Fresh ingredients, plated with intention"
              />
            </motion.div>
            <motion.div variants={cardRight}>
              <PillarCard
                className="h-[320px] sm:h-[420px] lg:h-[650px]"
                Image={
                  <NextImage
                    src="/images/food-pillar/food-pillar-3.jpg"
                    alt="food-2"
                    layout="fill"
                    objectFit="cover"
                  />
                }
                title="Chef Billy Maldonado"
                subtitle="The hand behind every plate"
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
