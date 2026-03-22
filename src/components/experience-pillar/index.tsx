"use client";

import { PillarHeroSection } from "../pillar-hero-section";
import NextImage from "next/image";
import { SectionContainer } from "../section-container";
import { SectionTitle } from "../section-title";
import { PillarCard } from "../pillar-card";
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
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

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
            <motion.div variants={cardLeft} style={{ flex: "0 0 calc(66.666% - 8px)" }}>
              <PillarCard
                className="h-[643px]"
                Image={
                  <NextImage
                    src="/images/experience-pillar/experience-1.png"
                    alt="experience-1"
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
                className="h-[643px]"
                Image={
                  <NextImage
                    src="/images/experience-pillar/experience-2.png"
                    alt="experience-2"
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
              { src: "/images/experience-pillar/experience-3.png", alt: "experience-3" },
              { src: "/images/experience-pillar/experience-4.png", alt: "experience-4" },
              { src: "/images/experience-pillar/experience-5.png", alt: "experience-5" },
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
