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
    <SectionContainer wrapperClassName="bg-[#F9F7F4]" id="estate">
      {/* Section header */}
      <div ref={headingRef}>
        <motion.span
          className="text-[10px] text-[#B59B8A] mb-[20px] block tracking-[0.2em] uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          The Estate
        </motion.span>

        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-0">
          <div className="flex-1 overflow-hidden">
            {["Six villas.", "One world."].map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.h5
                  className="text-[#2C2C2C] text-[32px] font-light leading-[1.08] sm:text-[40px] lg:text-[56px] lg:leading-[60.48px]"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={isHeadingInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + i * 0.12,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {line}
                </motion.h5>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6 lg:flex-1 lg:justify-between lg:gap-0">
            <motion.p
              className="text-[#8A8278] text-[14px] font-light leading-relaxed lg:text-[15px]"
              initial={{ opacity: 0, y: 16 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            >
              Each villa is a private world — designed by local architects, furnished with Oaxacan
              craft, and oriented toward either the ocean, the jungle, or the sky. No two are alike.
              All are exceptional.
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
                  Enquire About a Villa{" "}
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
                  src="/images/estate-section/estate-1.png"
                  alt="estate-1"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="La Casa Grande"
              subtitle="6 Guests · Ocean Pool Terrace · The Crown Villa"
            />
          </motion.div>
          <motion.div variants={cardRight} className="h-[320px] sm:h-[420px] lg:h-[659px]">
            <EstateCard
              Image={
                <Image
                  src="/images/estate-section/estate-2.png"
                  alt="estate-2"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="La Casa Chica"
              subtitle="2 Guests · Private Terrace · The Garden Suite"
            />
          </motion.div>
        </CardRow>

        <CardRow className="lg:grid-cols-[1fr_2fr]">
          <motion.div variants={cardLeft} className="h-[320px] sm:h-[420px] lg:h-[659px]">
            <EstateCard
              Image={
                <Image
                  src="/images/estate-section/estate-3.png"
                  alt="estate-3"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="Villa Cielo"
              subtitle="2 Guests · Rooftop Terrace · Sunset Views"
            />
          </motion.div>
          <motion.div variants={cardRight} className="h-[320px] sm:h-[420px] lg:h-[659px]">
            <EstateCard
              Image={
                <Image
                  src="/images/estate-section/estate-4.png"
                  alt="estate-4"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="Villa Cielo"
              subtitle="2 Guests · Private Terrace · The Garden Suite"
            />
          </motion.div>
        </CardRow>

        <CardRow className="lg:grid-cols-2">
          <motion.div variants={cardLeft} className="h-[280px] sm:h-[320px] lg:h-[365px]">
            <EstateCard
              Image={
                <Image
                  src="/images/estate-section/estate-5.png"
                  alt="estate-5"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="Villa Tierra"
              subtitle="3 Guests · Garden Bedroom · Private Terrace"
            />
          </motion.div>
          <motion.div variants={cardRight} className="h-[280px] sm:h-[320px] lg:h-[365px]">
            <EstateCard
              Image={
                <Image
                  src="/images/estate-section/estate-6.png"
                  alt="estate-6"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="Villa Cielo"
              subtitle="2 Guests · Clifftop · Pacific Panorama"
            />
          </motion.div>
        </CardRow>
      </section>
    </SectionContainer>
  );
};
