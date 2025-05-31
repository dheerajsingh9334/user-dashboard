import { z } from "zod";

export const basicInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address")
});

export const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  zipcode: z.string().min(1, "Zip code is required")
});

export const newUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  address: addressSchema
});

export type BasicInfo = z.infer<typeof basicInfoSchema>;
export type Address = z.infer<typeof addressSchema>;
export type NewUser = z.infer<typeof newUserSchema>;