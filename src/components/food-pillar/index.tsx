"use client";

import { PillarHeroSection } from "../pillar-hero-section";
import NextImage from "next/image";
import { SectionContainer } from "../section-container";
import { PillarCard } from "../pillar-card";
import { SectionTitle } from "../section-title";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const rowVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const cardRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const cardUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const AnimatedRow = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className="flex gap-4"
      variants={rowVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

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
          {/* Row 1 — left big, right small */}
          <AnimatedRow>
            <motion.div variants={cardLeft} style={{ flex: "0 0 calc(66.666% - 8px)" }}>
              <PillarCard
                className="h-[650px]"
                Image={
                  <NextImage
                    src="/images/food-pillar/food-pillar-1.png"
                    alt="food-1"
                    layout="fill"
                    objectFit="cover"
                  />
                }
                title="La Casa Grande"
                subtitle="6 Guests · Ocean Pool Terrace · The Crown Villa"
              />
            </motion.div>
            <motion.div variants={cardRight} style={{ flex: "0 0 calc(33.333% - 8px)" }}>
              <PillarCard
                className="h-[650px]"
                Image={
                  <NextImage
                    src="/images/food-pillar/food-pillar-2.png"
                    alt="food-2"
                    layout="fill"
                    objectFit="cover"
                  />
                }
                title="La Casa Grande"
                subtitle="6 Guests · Ocean Pool Terrace · The Crown Villa"
              />
            </motion.div>
          </AnimatedRow>

          {/* Row 2 — three equal cards rise up */}
          <AnimatedRow>
            {[
              { src: "/images/food-pillar/food-pillar-3.png", alt: "food-3" },
              { src: "/images/food-pillar/food-pillar-4.png", alt: "food-4" },
              { src: "/images/food-pillar/food-pillar-5.png", alt: "food-5" },
            ].map((img) => (
              <motion.div
                key={img.alt}
                variants={cardUp}
                style={{ flex: "0 0 calc(33.333% - 8px)" }}
              >
                <PillarCard
                  className="h-[424px]"
                  Image={<NextImage src={img.src} alt={img.alt} layout="fill" objectFit="cover" />}
                  title="La Casa Grande"
                  subtitle="6 Guests · Ocean Pool Terrace · The Crown Villa"
                />
              </motion.div>
            ))}
          </AnimatedRow>
        </div>
      </SectionContainer>
    </div>
  );
};
