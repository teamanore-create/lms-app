import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.email("Invalid email address"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    firstName: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
    name: z.string().trim().optional(),
  })
  .transform((data) => {
    const firstName = data.firstName || data.name?.split(" ")[0]?.trim();

    const lastName =
      data.lastName || data.name?.split(" ").slice(1).join(" ").trim();

    return {
      ...data,
      firstName,
      lastName,
    };
  })
  .refine((data) => !!data.firstName, {
    message: "First name is required",
    path: ["firstName"],
  });

export const verifyOtpSchema = z.object({
  email: z.email("Invalid email address"),

  otp: z
    .string()
    .trim()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

export const resetPasswordSchema = verifyOtpSchema.extend({
  password: z.string().trim().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address"),

  password: z.string().trim().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
