"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

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
import { Spinner } from "../ui/spinner";
import { FormSubmissionDialog } from "./FormSubmissionDialog";

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
      referredByRepresentation: "",
      socialLink: "",
      preferredFrom: "",
      preferredTo: "",
      numberOfGuests: "",
    },
  });
  const [isLoading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  // Today (YYYY-MM-DD) for the date pickers' min; end date can't precede start.
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
  const startDate = form.watch("preferredFrom");

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      // Forward to the estate-manager API (inquiry lands in the dashboard) and
      // send the notification email. The /api/notify-invitation route does both.
      const res = await fetch("/api/notify-invitation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        console.error("Form submission failed", res.status);
        setLoading(false);
        return;
      }

      setSuccessOpen(true);
      form.reset();
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
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
              name="referredByRepresentation"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className={labelClass}>
                    Referred By / Representation{" "}
                    <span className="normal-case tracking-normal text-[#b0a898]">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name, agency, or member referral"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px] text-rose-400/80 font-light" />
                </FormItem>
              )}
            />
          </AnimatedRow>

          {/* Row 5: Preferred Start Date + Preferred End Date */}
          <AnimatedRow>
            <FormField
              control={form.control}
              name="preferredFrom"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className={labelClass}>Arrival Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      min={today}
                      className={cn(inputClass, !field.value && "text-[#b0a898]")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px] text-rose-400/80 font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferredTo"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className={labelClass}>Departure Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      min={startDate || today}
                      className={cn(inputClass, !field.value && "text-[#b0a898]")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px] text-rose-400/80 font-light" />
                </FormItem>
              )}
            />
          </AnimatedRow>

          {/* Row 6: Number of Guests + Social Link */}
          <AnimatedRow>
            <FormField
              control={form.control}
              name="numberOfGuests"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className={labelClass}>Number of Guests</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={3}
                      max={16}
                      placeholder="3 – 16"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px] text-rose-400/80 font-light" />
                  <p className="text-[10px] tracking-[0.06em] text-[#b0a898] pt-0.5">
                    Minimum 3 guests &ndash; Maximum 16 guests per stay.
                  </p>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialLink"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className={labelClass}>Social Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://instagram.com/you"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px] text-rose-400/80 font-light" />
                  <p className="text-[10px] tracking-[0.06em] text-[#b0a898] pt-0.5">
                    Instagram, LinkedIn, or personal site.
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
              disabled={isLoading}
              className="group relative inline-flex items-center justify-center overflow-hidden border border-[#8C7261] bg-[#8C7261] px-[28px] py-[13px] cursor-pointer w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed min-w-[220px]"
            >
              <span
                className={cn(
                  isLoading ? "translate-y-0" : "translate-y-full",
                  "absolute inset-0 bg-[#F3F1EE] transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0"
                )}
              />
              {isLoading ? (
                <Spinner className="text-[#8C7261]" />
              ) : (
                <span className="relative text-xs tracking-[0.15em] uppercase text-white transition-colors duration-200 group-hover:text-[#8C7261]">
                  Request Invitation
                </span>
              )}
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
      <FormSubmissionDialog successOpen={successOpen} setSuccessOpen={setSuccessOpen} />
    </section>
  );
};
