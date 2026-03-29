"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formSchema, FormValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BORDER, BORDER_ERROR, labelClass } from "./constants";
import { getInputClass, getSelectClass } from "./helpers";
import { cn } from "@/lib/utils";
import { AnimatedButton } from "../animated-button";

const AnimatedRow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -120px 0px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
};

export const RequestStayForm = () => {
  const submitRef = useRef(null);
  const isSubmitInView = useInView(submitRef, { once: true, margin: "0px 0px -40px 0px" });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      preferredDates: "",
      numberOfGuests: "",
      referralName: "",
      specialRequests: "",
      howDidYouHear: "",
      idealStay: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Row 1 */}
          <AnimatedRow className="grid grid-cols-2 gap-x-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className={labelClass}>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First name"
                      className={getInputClass(!!errors.firstName)}
                      style={{ borderBottomColor: errors.firstName ? BORDER_ERROR : BORDER }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px] text-red-400 font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className={labelClass}>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last name"
                      className={getInputClass(!!errors.lastName)}
                      style={{ borderBottomColor: errors.lastName ? BORDER_ERROR : BORDER }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px] text-red-400 font-light" />
                </FormItem>
              )}
            />
          </AnimatedRow>

          {/* Row 2 */}
          <AnimatedRow className="grid grid-cols-2 gap-x-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className={labelClass}>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your@email.com"
                      type="email"
                      className={getInputClass(!!errors.email)}
                      style={{ borderBottomColor: errors.email ? BORDER_ERROR : BORDER }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px] text-red-400 font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className={labelClass}>Phone / WhatsApp</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+1 000 000 0000"
                      className={getInputClass(!!errors.phone)}
                      style={{ borderBottomColor: errors.phone ? BORDER_ERROR : BORDER }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px] text-red-400 font-light" />
                </FormItem>
              )}
            />
          </AnimatedRow>

          {/* Row 3 */}
          <AnimatedRow className="grid grid-cols-2 gap-x-8">
            <FormField
              control={form.control}
              name="preferredDates"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className={labelClass}>Preferred Dates</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Oct – Nov 2025"
                      className={getInputClass(!!errors.preferredDates)}
                      style={{ borderBottomColor: errors.preferredDates ? BORDER_ERROR : BORDER }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px] text-red-400 font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberOfGuests"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className={labelClass}>Number of Guests</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={getSelectClass(!!errors.numberOfGuests, !!field.value)}
                        style={{ borderBottomColor: errors.numberOfGuests ? BORDER_ERROR : BORDER }}
                      >
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#1c1a18] border-[#E6D5C5]/30 rounded-none">
                      {["1", "2", "3", "4", "5", "6", "7+"].map((n) => (
                        <SelectItem
                          key={n}
                          value={n}
                          className="text-white text-[14px] focus:bg-[#2a2724] cursor-pointer"
                        >
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[11px] text-red-400 font-light" />
                </FormItem>
              )}
            />
          </AnimatedRow>

          {/* Row 4 */}
          <AnimatedRow className="grid grid-cols-2 gap-x-8">
            <FormField
              control={form.control}
              name="referralName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className={labelClass}>Referral Name / Access Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First name"
                      className={getInputClass(false)}
                      style={{ borderBottomColor: BORDER }}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialRequests"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className={labelClass}>
                    Special Requests (Security, Dietary, etc.)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Please share your requests with the team"
                      className={getInputClass(false)}
                      style={{ borderBottomColor: BORDER }}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </AnimatedRow>

          {/* Row 5 */}
          <AnimatedRow className="grid grid-cols-2 gap-x-8">
            <FormField
              control={form.control}
              name="howDidYouHear"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className={labelClass}>How Did You Hear of Us?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={getSelectClass(!!errors.howDidYouHear, !!field.value)}
                        style={{ borderBottomColor: errors.howDidYouHear ? BORDER_ERROR : BORDER }}
                      >
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#1c1a18] border-[#E6D5C5]/30 rounded-none">
                      {[
                        "Social Media",
                        "Friend / Referral",
                        "Press / Magazine",
                        "Google Search",
                        "Travel Agent",
                        "Other",
                      ].map((opt) => (
                        <SelectItem
                          key={opt}
                          value={opt}
                          className="text-white text-[14px] focus:bg-[#2a2724] cursor-pointer"
                        >
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[11px] text-red-400 font-light" />
                </FormItem>
              )}
            />
          </AnimatedRow>

          {/* Row 6 — Textarea */}
          <AnimatedRow>
            <FormField
              control={form.control}
              name="idealStay"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className={labelClass}>Tell Us About Your Ideal Stay</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="We'd love to understand what you're looking for..."
                      className={cn(
                        "border-0 border-b rounded-none bg-transparent px-0 py-2 text-white placeholder:text-[#6b6259] text-[15px] focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none resize-none min-h-[60px] transition-colors duration-200"
                      )}
                      style={{ borderBottomColor: errors.idealStay ? BORDER_ERROR : BORDER }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px] text-red-400 font-light" />
                </FormItem>
              )}
            />
          </AnimatedRow>

          {/* Submit */}
          <motion.div
            ref={submitRef}
            className="pt-4 space-y-4"
            initial={{ opacity: 0, y: 16 }}
            animate={isSubmitInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <AnimatedButton
              href="#"
              hrefClassName="bg-[#8C7261] text-[#ffffff] border-[#8C7261]"
              buttonClassName="text-[#ffffff group-hover:text-[#8C7261]"
              hoverClassName="text-[#ffffff] border-[#2a2520] bg-[#F3F1EE]"
            >
              Submit Inquiry
            </AnimatedButton>
            <p
              className="text-[12px] text-[#6b6259] italic"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Your privacy is absolute. We do not share guest information.
            </p>
          </motion.div>
        </form>
      </Form>
    </div>
  );
};
