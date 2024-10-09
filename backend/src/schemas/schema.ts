import { z } from "zod";

export const userSchema = z.object({
  email: z.string().min(1, "Fiel is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Fiel is required")
    .min(8, "Password must be at least 8 characters long"),
});
