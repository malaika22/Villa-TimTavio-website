import * as z from "zod";

export const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone number is too short")
    .regex(/^\+?[0-9\s\-().]+$/, "Invalid phone number"),
  preferredDates: z
    .string()
    .min(1, "Preferred dates are required")
    .regex(/^[A-Za-z]{3,9}\s*[-–]\s*[A-Za-z]{3,9}\s+\d{4}$/, "Use format: e.g. Oct – Nov 2025"),
  numberOfGuests: z.string().min(1, "Please select number of guests"),
  referralName: z.string().optional(),
  specialRequests: z.string().optional(),
  howDidYouHear: z.string().min(1, "Please select an option"),
  idealStay: z.string().min(10, "Please tell us a bit more (min 10 characters)"),
});

export type FormValues = z.infer<typeof formSchema>;
