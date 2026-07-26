"use client";

import { EstateCard } from "./estate-card";
import { ArrowRight } from "lucide-react";
import { SectionContainer } from "../section-container";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IMAGE_SIZES, OptimizedImage } from "../ui/optimized-image";

const rowVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const cardRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const CardRow = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={cn("grid grid-cols-1 gap-4 lg:gap-4", className)}
      variants={rowVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

export const TheEstateSection = () => {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <SectionContainer wrapperClassName="bg-[#F9F7F4]" id="villa">
      {/* Section header */}
      <div ref={headingRef}>
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-0 items-center">
          <div className="flex-1 overflow-hidden">
            <div className="overflow-hidden">
              <motion.h5
                className="text-[#2C2C2C] text-[32px] font-light leading-[1.08] sm:text-[40px] lg:text-[56px] lg:leading-[60.48px]"
                initial={{ y: "100%", opacity: 0 }}
                animate={isHeadingInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{
                  duration: 0.7,
                  // delay: 0.1 + i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                Villa TimTavio
              </motion.h5>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:flex-1 lg:justify-between lg:gap-0">
            <motion.p
              className="text-[18px] text-center  leading-relaxed  italic font-heading lg:text-[24px] lg:text-start"
              initial={{ opacity: 0, y: 16 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            >
              Villa TimTavio Accommodating upto 14 guests. Sweeping curves and dramatic shadows
              seamlessly unite every room, social space, and sunset view in absolute privacy.
            </motion.p>

            <motion.div
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            >
              <Link
                href="#contact"
                className="group relative inline-flex items-center gap-2 border border-[#2C2C2C] px-5 py-2.5  overflow-hidden lg:mt-5"
              >
                <span className="absolute inset-0 bg-[#8C7261] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
                <span className="relative text-[11px] font-medium tracking-[0.15em] uppercase text-[#2C2C2C] group-hover:text-[#F5F3F0] transition-colors duration-300">
                  Enter The Infinity
                </span>
                <ArrowRight
                  size={13}
                  className="relative text-[#2C2C2C] group-hover:text-[#F5F3F0] transition-all duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <section className="space-y-4 mt-6 sm:space-y-6 lg:mt-8 lg:space-y-8">
        <CardRow className="lg:grid-cols-[1fr_1fr]">
          <motion.div variants={cardLeft} className="h-[320px] sm:h-[420px] lg:h-[659px]">
            <EstateCard
              Image={
                <OptimizedImage
                  src="/images/estate-section/the-curve-and-pool.webp"
                  alt="The Entrance"
                  sizes={IMAGE_SIZES.estateCard}
                />
              }
              title="The Entrance"
              subtitle="A seamless architectural meridian stretching from the threshold straight to the horizon."
            />
          </motion.div>
          <motion.div variants={cardRight} className="h-[320px] sm:h-[420px] lg:h-[659px]">
            <EstateCard
              Image={
                <OptimizedImage
                  src="/images/estate-section/living-room-bar-area.webp"
                  alt="Living Room & Bar Area"
                  sizes={IMAGE_SIZES.estateCard}
                  className="object-cover object-[top_right]"
                />
              }
              title="Living Room & Bar Area"
              subtitle="The heart of the estate — where evenings begin and no one wants them to end."
            />
          </motion.div>
        </CardRow>

        <CardRow className="lg:grid-cols-[1fr_1fr]">
          <motion.div variants={cardLeft} className="h-[320px] sm:h-[420px] lg:h-[659px]">
            <EstateCard
              Image={
                <OptimizedImage
                  src="/images/estate-section/dining-room.webp"
                  alt="The Dining Room"
                  sizes={IMAGE_SIZES.estateCard}
                  className="object-cover object-[top_100%_left_10%]"
                />
              }
              title="The Dining Room"
              subtitle="The stage for the evening. Set for bespoke gatherings and Michelin-tier dining."
            />
          </motion.div>
          <motion.div variants={cardRight} className="h-[320px] sm:h-[420px] lg:h-[659px]">
            <EstateCard
              Image={
                <OptimizedImage
                  src="/images/estate-section/king-master-suite.webp"
                  alt="King Master Suite"
                  sizes={IMAGE_SIZES.estateCard}
                />
              }
              title="King Master Suite"
              subtitle="Private, open-air sleeping quarters framed by brutalist concrete and tropical gardens."
            />
          </motion.div>
        </CardRow>

        <CardRow className="lg:grid-cols-[1fr_1fr]">
          <motion.div variants={cardLeft} className="h-[320px] sm:h-[420px] lg:h-[659px]">
            <EstateCard
              Image={
                <OptimizedImage
                  src="/images/estate-section/bunk-room.webp"
                  alt="Bunk Room"
                  sizes={IMAGE_SIZES.estateCard}
                />
              }
              title="Bunk Room"
              subtitle="Crafted in raw wood and concrete, designed for those who travel together."
            />
          </motion.div>
          <motion.div variants={cardRight} className="h-[320px] sm:h-[420px] lg:h-[659px]">
            <EstateCard
              Image={
                <OptimizedImage
                  src="/images/estate-section/fire-sunbathing-pit.webp"
                  alt="The Firepit & Social Sunbathing Pit"
                  sizes={IMAGE_SIZES.estateCard}
                />
              }
              title="The Firepit & Social Sunbathing Pit"
              subtitle="Where the Pacific becomes your backdrop and every afternoon turns into an occasion."
            />
          </motion.div>
        </CardRow>
      </section>
    </SectionContainer>
  );
};
