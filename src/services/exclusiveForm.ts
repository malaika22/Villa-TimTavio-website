// app/actions/submitForm.ts
"use server";

import { formSchema, FormValues } from "@/components/exclusive-member-form-section/schema";
import { supabase } from "@/lib/supabase/service";

export async function submitExclusiveForm(data: FormValues) {
  console.log("data", data);
  const parsed = formSchema.safeParse(data);
  console.log("parsed", parsed);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten(),
    };
  }

  const values = parsed.data;

  return supabase.from("exclusive-member").insert({
    first_name: values.firstName,
    last_name: values.lastName,
    email: values.email,
    phone: values.phone,
    city: values.city,
    country: values.country,
    intended_use: values.intendedUse,
    anticipated_visits: parseInt(values.anticipatedVisits),
    preferred_dates: values.preferredDates,
    number_of_guests: parseInt(values.numberOfGuests),
  });
}
