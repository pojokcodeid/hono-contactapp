import { z, ZodType } from "zod";

// Skema validasi untuk kata sandi yang kuat
export const strongPasswordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[@$!%*?&]/, {
    message: "Password must contain at least one special character",
  });

export const validateUser: ZodType = z
  .object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: strongPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords and  confirmPassword do not match",
    path: ["confirmPassword"],
  });

export const validateNoPasswordUser: ZodType = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name must be at least 1 character long" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email format" }),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .superRefine((data, context) => {
    if (data.password && data.confirmPassword) {
      if (data.password !== data.confirmPassword) {
        context.addIssue({
          code: "invalid_literal",
          path: ["confirmPassword"],
          message: "Passwords do not match",
          expected: "matching passwords",
          received: data.confirmPassword,
        });
      }
    }
  });

export const loginValidation: ZodType = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const resetPasswordValidation: ZodType = z
  .object({
    password: strongPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords and  confirmPassword do not match",
    path: ["confirmPassword"],
  });
