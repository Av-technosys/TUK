import { db } from "@/src/db";
import { categories } from "@/src/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await db.select().from(categories);
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newCategory = await db.insert(categories).values({
  name: body.name,
  slug: body.slug,
  description: body.description,
  image: body.image, // ✅ ADD THIS LINE
}).returning();

    return NextResponse.json({
  success: true,
  data: newCategory[0],
});
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}