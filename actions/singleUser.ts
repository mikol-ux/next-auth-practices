"use server";
import { db } from "../lib/db";
export const singleUser = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id: id },
  });
  return user;
};
