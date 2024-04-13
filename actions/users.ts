"use server";
import { db } from "../lib/db";
export const users = async () => {
  const users = await db.user.findMany();

  return users;
};
