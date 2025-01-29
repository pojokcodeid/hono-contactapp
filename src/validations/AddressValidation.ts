import { z, ZodType } from "zod";

export const validateAddress: ZodType = z.object({
  addressName: z.string().min(1, { message: "Address name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().optional(),
  province: z.string().optional(),
  country: z.string().optional(),
});
