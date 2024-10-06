import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Fiel is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Fiel is required")
    .min(8, "Password must be at least 8 characters long"),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, "Fiel is required")
    .min(4, "Username must be at least 4 characters long"),
  email: z.string().min(1, "Fiel is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Fiel is required")
    .min(8, "Password must be at least 8 characters long"),
});
