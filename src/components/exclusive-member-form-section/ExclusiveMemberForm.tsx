"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { formSchema, type FormValues } from "./schema";

const labelClass = "text-[10px] tracking-[0.18em] uppercase text-[#8a7f72] font-normal mb-1";

const inputClass =
  "border-0 border-b border-[#c8bfb0] rounded-none bg-transparent px-0 py-2 text-[#3a3530] placeholder:text-[#b0a898] text-[15px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#3a3530] aria-[invalid=true]:border-b-rose-400 aria-[invalid=true]:border-t-0 aria-[invalid=true]:border-l-0 aria-[invalid=true]:border-r-0 aria-[invalid=true]:ring-0 aria-[invalid=true]:bg-transparent transition-colors duration-200 h-auto";

const selectTriggerClass =
  "border-0 border-b border-[#c8bfb0] rounded-none bg-transparent px-0 py-2 text-[15px] text-[#b0a898] focus:ring-0 focus:border-[#3a3530] transition-colors duration-200 h-auto shadow-none data-[placeholder]:text-[#b0a898] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#3a3530] aria-[invalid=true]:border-b-rose-400 aria-[invalid=true]:border-t-0 aria-[invalid=true]:border-l-0 aria-[invalid=true]:border-r-0 aria-[invalid=true]:ring-0 aria-[invalid=true]:bg-transparent w-full";

// Reusable animated row wrapper with its own useInView
const AnimatedRow = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-10"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay }}
    >
      {children}
    </motion.div>
  );
};

export const ExclusiveMemberForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      intendedUse: "",
      anticipatedVisits: "",
      preferredDates: "",
      numberOfGuests: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <section
      className="px-0 py-10 max-w-[1920px] mx-auto sm:px-4 sm:py-12 lg:px-[48px] lg:py-[80px]"
      id="exclusive-member"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          {/* Row 1: First Name + Last Name */}
          <AnimatedRow>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className={labelClass}>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" className={inputClass} {...field} />
                  </FormControl>
                  <FormMessage className="text-[11px] text-rose-400/80 font-light" />
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
                    <Input placeholder="Last name" className={inputClass} {...field} />
                  </FormControl>
                  <FormMessage className="text-[11px] text-rose-400/80 font-light" />
                </FormItem>
              )}
            />
          </AnimatedRow>

          {/* Row 2: Email + Phone */}
          <AnimatedRow>
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
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px] text-rose-400/80 font-light" />
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
                    <Input placeholder="+1 000 000 0000" className={inputClass} {...field} />
                  </FormControl>
                  <FormMessage className="text-[11px] text-rose-400/80 font-light" />
                </FormItem>
              )}
            />
          </AnimatedRow>

          {/* Row 3: City + Country */}
          <AnimatedRow>
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className={labelClass}>Current Residence (City)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your City" className={inputClass} {...field} />
                  </FormControl>
                  <FormMessage className="text-[11px] text-rose-400/80 font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="space-y-1 w-full">
                  <FormLabel className={labelClass}>Country</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(selectTriggerClass, field.value && "text-[#3a3530]")}
                      >
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#F4F1EC] border-[#c8bfb0] rounded-none">
                      {[
                        "United States",
                        "United Kingdom",
                        "Canada",
                        "Mexico",
                        "France",
                        "Germany",
                        "Australia",
                        "Japan",
                        "Brazil",
                        "Other",
                      ].map((c) => (
                        <SelectItem
                          key={c}
                          value={c}
                          className="text-[#3a3530] text-[14px] focus:bg-[#e8e2d8] cursor-pointer"
                        >
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[11px] text-rose-400/80 font-light" />
                </FormItem>
              )}
            />
          </AnimatedRow>

          {/* Row 4: Intended Use + Anticipated Visits */}
          <AnimatedRow>
            <FormField
              control={form.control}
              name="intendedUse"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className={labelClass}>
                    Intended Use (Personal, Family, Business)
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(selectTriggerClass, field.value && "text-[#3a3530]")}
                      >
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#F4F1EC] border-[#c8bfb0] rounded-none">
                      {["Personal", "Family", "Business", "Mixed"].map((use) => (
                        <SelectItem
                          key={use}
                          value={use}
                          className="text-[#3a3530] text-[14px] focus:bg-[#e8e2d8] cursor-pointer"
                        >
                          {use}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[11px] text-rose-400/80 font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="anticipatedVisits"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className={labelClass}>Anticipated Annual Visits</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={52}
                      placeholder="e.g. 4"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px] text-rose-400/80 font-light" />
                </FormItem>
              )}
            />
          </AnimatedRow>

          {/* Row 5: Preferred Dates + Number of Guests */}
          <AnimatedRow>
            <FormField
              control={form.control}
              name="preferredDates"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className={labelClass}>Preferred Dates</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Oct – Nov 2025" className={inputClass} {...field} />
                  </FormControl>
                  <FormMessage className="text-[11px] text-rose-400/80 font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberOfGuests"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className={labelClass}>Number of Guests</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={8}
                      max={18}
                      placeholder="8 – 18"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px] text-rose-400/80 font-light" />
                  <p className="text-[10px] tracking-[0.06em] text-[#b0a898] pt-0.5">
                    Minimum 8 guests &ndash; Maximum 18 guests per stay.
                  </p>
                </FormItem>
              )}
            />
          </AnimatedRow>

          {/* Submit */}
          <motion.div
            className="pt-2 space-y-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <button
              type="submit"
              className="group relative inline-flex items-center justify-center overflow-hidden border border-[#8C7261] bg-[#8C7261] px-[28px] py-[13px] cursor-pointer w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 translate-y-full bg-[#F3F1EE] transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0" />
              <span className="relative text-xs tracking-[0.15em] uppercase text-white transition-colors duration-200 group-hover:text-[#8C7261]">
                Request Invitation
              </span>
            </button>
            <p
              className="text-[12px] text-[#9a9088] italic"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Your privacy is absolute. We do not share guest information.
            </p>
          </motion.div>
        </form>
      </Form>
    </section>
  );
};
