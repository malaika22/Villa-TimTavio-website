import * as z from "zod";

/** Today as YYYY-MM-DD (local) — used to block past start dates. */
const todayISO = () => {
  const d = new Date();
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().split("T")[0];
};

export const formSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    phone: z
      .string()
      .min(7, "Phone number is too short")
      .regex(/^\+?[0-9\s\-().]+$/, "Invalid phone number"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    intendedUse: z.string().min(1, "Please select intended use"),
    /** Optional — who referred them or agency representation */
    referredByRepresentation: z.string().max(500),
    /** Social profile used for the private vibe-check review */
    socialLink: z
      .string()
      .min(1, "Social link is required")
      .url("Enter a valid URL (e.g. https://instagram.com/you)"),
    /** Preferred stay window — ISO date strings (YYYY-MM-DD) from the date pickers */
    preferredFrom: z.string().min(1, "Start date is required"),
    preferredTo: z.string().min(1, "End date is required"),
    numberOfGuests: z
      .string()
      .min(1, "Number of guests is required")
      .refine(
        (val) => {
          const n = parseInt(val, 10);
          return !isNaN(n) && n >= 2 && n <= 14;
        },
        { message: "Guest count must be between 2 and 14" }
      ),
  })
  .refine((d) => !d.preferredFrom || d.preferredFrom >= todayISO(), {
    path: ["preferredFrom"],
    message: "Start date can't be in the past",
  })
  .refine((d) => !d.preferredFrom || !d.preferredTo || d.preferredTo >= d.preferredFrom, {
    path: ["preferredTo"],
    message: "End date must be on or after the start date",
  });

export type FormValues = z.infer<typeof formSchema>;
