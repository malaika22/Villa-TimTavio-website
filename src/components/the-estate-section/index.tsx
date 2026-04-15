"use client";

import Image from "next/image";
import { EstateCard } from "./estate-card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { SectionContainer } from "../section-container";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-0">
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
              className="text-[#8A8278] text-[14px] font-light leading-relaxed lg:text-[15px]"
              initial={{ opacity: 0, y: 16 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            >
              Villa TimTavio — Accommodating up to 16 guests across four King Master Suites and two
              luxury Bunk Rooms.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            >
              <Button
                className="p-0 text-[#2C2C2C99] text-[11px] bg-transparent hover:bg-transparent w-fit group hover:text-[#2C2C2C] hover:bg-transparent"
                asChild
              >
                <Link href="#contact" className="hover:bg-transparent!">
                  Enter The Infinity{" "}
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <section className="space-y-4 mt-6 sm:space-y-6 lg:mt-8 lg:space-y-8">
        <CardRow className="lg:grid-cols-[2fr_1fr]">
          <motion.div variants={cardLeft} className="h-[320px] sm:h-[420px] lg:h-[659px]">
            <EstateCard
              Image={
                <Image
                  src="/images/estate-section/the-curve-and-pool.jpg"
                  alt="The Curve & Pool"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="The Curve & Pool"
              subtitle="A seamless architectural meridian stretching from the threshold straight to the horizon."
            />
          </motion.div>
          <motion.div variants={cardRight} className="h-[320px] sm:h-[420px] lg:h-[659px]">
            <EstateCard
              Image={
                <Image
                  src="/images/estate-section/living-room-bar-area.jpg"
                  alt="Living Room & Bar Area"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="Living Room & Bar Area"
              subtitle="The heart of the estate — where evenings begin and no one wants them to end."
            />
          </motion.div>
        </CardRow>

        <CardRow className="lg:grid-cols-[1fr_2fr]">
          <motion.div variants={cardLeft} className="h-[320px] sm:h-[420px] lg:h-[659px]">
            <EstateCard
              Image={
                <Image
                  src="/images/estate-section/dining-room.jpg"
                  alt="The Dining Room"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="The Dining Room"
              subtitle="The stage for the evening. Set for bespoke gatherings and Michelin-tier dining."
            />
          </motion.div>
          <motion.div variants={cardRight} className="h-[320px] sm:h-[420px] lg:h-[659px]">
            <EstateCard
              Image={
                <Image
                  src="/images/estate-section/king-master-suite.jpg"
                  alt="King Master Suite"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="King Master Suite"
              subtitle="Private, open-air sleeping quarters framed by brutalist concrete and tropical gardens"
            />
          </motion.div>
        </CardRow>

        <CardRow className="lg:grid-cols-2">
          <motion.div variants={cardLeft} className="h-[280px] sm:h-[320px] lg:h-[365px]">
            <EstateCard
              Image={
                <Image
                  src="/images/estate-section/bunk-room.jpg"
                  alt="Bunk Room"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="Bunk Room"
              subtitle="Crafted in raw wood and concrete, designed for those who travel together."
            />
          </motion.div>
          <motion.div variants={cardRight} className="h-[280px] sm:h-[320px] lg:h-[365px]">
            <EstateCard
              Image={
                <Image
                  src="/images/estate-section/fire-sunbathing-pit.jpg"
                  alt="The Firepit & Social Sunbathing Pit"
                  layout="fill"
                  objectFit="cover"
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
