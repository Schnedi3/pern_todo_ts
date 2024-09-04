import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterType, LoginType } from "../types/types";

// zod register schema
const registerSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Fiel is required" })
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" }),
  email: z
    .string()
    .min(1, { message: "Fiel is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Fiel is required" })
    .min(5, { message: "Password must be at least 5 characters long" }),
});

export const useRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });

  return { register, handleSubmit, errors };
};

// zod login schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Fiel is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Fiel is required" })
    .min(5, { message: "Password must be at least 5 characters long" }),
});

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  return { register, handleSubmit, errors };
};
