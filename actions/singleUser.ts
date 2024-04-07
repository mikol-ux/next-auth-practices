"use server";
import { db } from "../lib/db";
export const singleUser = async (email: string) => {
  const user = await db.user.findFirst({
    where: { email: email },
  });
  return user;
};
