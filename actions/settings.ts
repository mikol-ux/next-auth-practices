"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { SettingsSchema } from "../schemas";
import { db } from "../lib/db";
import { getUserByEmail, getUserById } from "../data/user";
import { currentUser } from "../lib/auth";
import { generateVerificationToken } from "../lib/tokens";
import { sendVerificationEmail } from "../lib/mail";
export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorizzzed" };
  }
  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Unauthoried" };
  }
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newpassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use" };
    }
    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "verification email sent" };
  }
  if (values.password && values.newpassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    // verify logic
    if (!passwordsMatch) {
      return { error: "incorrect password" };
    }
    const hashedPassword = await bcrypt.hash(values.newpassword, 10);
    values.password = hashedPassword;
    values.newpassword = undefined;
  }
  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "Settings updated" };
};
