import { db } from "@/src/db";
import { categories } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { items } = await req.json();

  for (const item of items) {
    await db
      .update(categories)
      .set({ position: item.position })
      .where(eq(categories.id, item.id));
  }

  return NextResponse.json({ success: true });
}