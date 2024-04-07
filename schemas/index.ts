import * as z from "zod";
import { UserRole } from "@prisma/client";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "email is required",
  }),
  password: z.string().min(1, { message: "password is required" }),
});
export const RegisterSchema = z.object({
  email: z.string().email({
    message: "email is required",
  }),
  password: z.string().min(6, { message: "minimum 6 characters" }),
  name: z.string().min(1, { message: "Name is required" }),
});
export const ResetSchema = z.object({
  email: z.string().email({
    message: "email is required",
  }),
});
export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "minimum 6 characters" }),
});
export const SettingsSchema = z.object({
  role: z.enum([UserRole.ADMIN, UserRole.USER, UserRole.SUPER_ADMIN]),
  email: z.optional(z.string().email()),
  //name: z.string(),
});
