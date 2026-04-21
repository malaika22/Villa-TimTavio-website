import * as z from "zod";

export const formSchema = z.object({
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
  preferredDates: z
    .string()
    .min(1, "Preferred dates are required")
    .regex(/^\d{1,2}-\d{1,2}\s+[A-Za-z]{3,9}$/, "Use format: e.g. 12-13 Oct"),
  numberOfGuests: z
    .string()
    .min(1, "Number of guests is required")
    .refine(
      (val) => {
        const n = parseInt(val, 10);
        return !isNaN(n) && n >= 8 && n <= 18;
      },
      { message: "Guest count must be between 8 and 18" }
    ),
});

export type FormValues = z.infer<typeof formSchema>;
