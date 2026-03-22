"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
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
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <section className="px-[48px] py-[80px] max-w-[1920px] mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          {/* Row 1: First Name + Last Name */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-10">
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

            {/* Row 2: Email + Phone */}
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

            {/* Row 3: City + Country */}
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

            {/* Row 4: Intended Use + Anticipated Visits */}
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
                    <Input placeholder="e.g. Oct – Nov 2025" className={inputClass} {...field} />
                  </FormControl>
                  <FormMessage className="text-[11px] text-rose-400/80 font-light" />
                </FormItem>
              )}
            />
          </div>

          {/* Submit */}
          <div className="pt-2 space-y-4">
            <Button
              type="submit"
              className="bg-[#8C7261] hover:bg-[#2a2520] text-white text-[11px] tracking-[0.2em] uppercase font-normal rounded-none px-8 py-6 transition-colors duration-300 cursor-pointer"
            >
              Submit Inquiry
            </Button>
            <p
              className="text-[12px] text-[#9a9088] italic"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Your privacy is absolute. We do not share guest information.
            </p>
          </div>
        </form>
      </Form>
    </section>
  );
};
