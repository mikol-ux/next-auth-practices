import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest) {
  const posts = await db.user.findMany();
  console.log(posts);
  Response.json(posts);
}
