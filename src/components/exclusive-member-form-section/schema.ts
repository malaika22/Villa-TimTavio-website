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
  anticipatedVisits: z
    .string()
    .min(1, "Anticipated visits is required")
    .regex(/^[A-Za-z]{3,9}\s*[-–]\s*[A-Za-z]{3,9}\s+\d{4}$/, "Use format: e.g. Oct – Nov 2025"),
});

export type FormValues = z.infer<typeof formSchema>;
