import { z, ZodType } from "zod";

export const validatePersonal: ZodType = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});
