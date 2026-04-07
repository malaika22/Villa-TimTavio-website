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
            {["1 Estate.", "6 Suites."].map((line, i) => (
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
              1 Estate. 6 Suites — 4 King Master Suites and 2 Bunk Rooms, each with a Queen and two
              Twins. Designed by Ludwig Godefroy. No two suites are alike. All are exceptional.
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
                  src="/images/estate-section/estate-1.jpeg"
                  alt="estate-1"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="King Master Suite."
              subtitle="Private, open-air sleeping quarters framed by brutalist concrete and tropical gardens"
            />
          </motion.div>
          <motion.div variants={cardRight} className="h-[320px] sm:h-[420px] lg:h-[659px]">
            <EstateCard
              Image={
                <Image
                  src="/images/estate-section/estate-2.jpeg"
                  alt="estate-2"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="Private Rooftop Terraces"
              subtitle="Every suite features its own rooftop — designed for golden hour and nothing else"
            />
          </motion.div>
        </CardRow>

        <CardRow className="lg:grid-cols-[1fr_2fr]">
          <motion.div variants={cardLeft} className="h-[320px] sm:h-[420px] lg:h-[659px]">
            <EstateCard
              Image={
                <Image
                  src="/images/estate-section/estate-3.jpeg"
                  alt="estate-3"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="The Entrance"
              subtitle="A singular threshold. Once you pass through, the world outside ceases to exist"
            />
          </motion.div>
          <motion.div variants={cardRight} className="h-[320px] sm:h-[420px] lg:h-[659px]">
            <EstateCard
              Image={
                <Image
                  src="/images/estate-section/estate-4.jpeg"
                  alt="estate-4"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="Bunk Room"
              subtitle="Queen bed and two twins — crafted in raw wood and concrete for those who travel together"
            />
          </motion.div>
        </CardRow>

        <CardRow className="lg:grid-cols-2">
          <motion.div variants={cardLeft} className="h-[280px] sm:h-[320px] lg:h-[365px]">
            <EstateCard
              Image={
                <Image
                  src="/images/estate-section/estate-5.jpeg"
                  alt="estate-5"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="The Firepit & Social Sunbathing Pit"
              subtitle="Where the Pacific becomes your backdrop and every afternoon turns into an occasion"
            />
          </motion.div>
          <motion.div variants={cardRight} className="h-[280px] sm:h-[320px] lg:h-[365px]">
            <EstateCard
              Image={
                <Image
                  src="/images/estate-section/estate-6.jpeg"
                  alt="estate-6"
                  layout="fill"
                  objectFit="cover"
                />
              }
              title="Living Room & Bar Area"
              subtitle="The heart of the estate — where evenings begin and no one wants them to end"
            />
          </motion.div>
        </CardRow>
      </section>
    </SectionContainer>
  );
};
