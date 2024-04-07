"use server";
import * as z from "zod";
import { getUserByEmail, getUserById } from "../data/user";
import { db } from "../lib/db";
import { UserRole } from "@prisma/client";
import { SettingsSchema } from "../schemas";
enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  SUPER_ADMIN = "SUPER_ADMIN",
}
interface FormData {
  id: string;
  name: string | null;
  email: string | undefined;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  role: UserRole;
}
export const update_user = async (values: FormData) => {
  //const existingUser = await getUserByEmail(values.email);
  // console.log(values.email);
  //console.log(existingUser);
  //const existingUserById = await getUserById(values.name);
  /*  if (!existingUser) {
    return { error: "User Does not exist" };
  } */
  await db.user.update({
    where: { email: values.email },
    data: {
      role: values.role,
    },
  });
  return { success: "User does not exist" };
};
