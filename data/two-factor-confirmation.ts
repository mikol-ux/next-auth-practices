import email from "next-auth/providers/email";
import { db } from "../lib/db";

export const getTwoFactorConfirmationById = async (userId: string) => {
  try {
    const twoFactorById = db.twoFactorConfirmation.findUnique({
      where: { userId },
    });
    return twoFactorById;
  } catch {
    return null;
  }
};
