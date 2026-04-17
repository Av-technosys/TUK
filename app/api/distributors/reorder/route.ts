import { db } from "@/src/db";
import { distributors } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { items } = await req.json();

  try {
    for (const item of items) {
      await db
        .update(distributors)
        .set({ position: item.position })
        .where(eq(distributors.id, item.id));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}