import * as z from "zod";
import { UserRole } from "@prisma/client";
export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER, UserRole.SUPER_ADMIN]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newpassword: z.optional(z.string()),
  })
  .refine(
    (data) => {
      if (data.newpassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "password is required",
      path: ["password"],
    }
  )
  .refine(
    (data) => {
      if (data.password && !data.newpassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required",
      path: ["newpassword"],
    }
  );
export const LoginSchema = z.object({
  email: z.string().email({
    message: "email is required",
  }),
  password: z.string().min(1, { message: "password is required" }),

  code: z.optional(z.string()),
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
export const RoleSchema = z.object({
  role: z.enum([UserRole.ADMIN, UserRole.USER, UserRole.SUPER_ADMIN]),
  email: z.optional(z.string().email()),
  //name: z.string(),
});
