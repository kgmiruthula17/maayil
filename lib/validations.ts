import { z } from "zod";

const phone = z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number");
const pincode = z.string().trim().regex(/^[1-9]\d{5}$/, "Enter a valid 6-digit pincode");

export const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone,
  address1: z.string().trim().min(5, "Enter your street address"),
  address2: z.string().trim().optional(),
  city: z.string().trim().min(2, "Enter your city"),
  state: z.string().trim().min(2, "Enter your state"),
  pincode,
  payment: z.enum(["upi", "card", "cod"]),
});
export type CheckoutValues = z.infer<typeof checkoutSchema>;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  phone,
  product: z.string().min(1, "Choose a product"),
  size: z.string().min(1, "Choose a size"),
  measurements: z.string().trim().max(500, "Please keep this under 500 characters").optional(),
  instructions: z.string().trim().max(1000, "Please keep this under 1000 characters").optional(),
});
export type EnquiryValues = z.infer<typeof enquirySchema>;
