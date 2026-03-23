
import { db } from "@/src/db";
import { distributors } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: any) {
  const body = await req.json();

  const updated = await db
    .update(distributors)
    .set({
      name: body.name,
      slug: body.slug,
      description: body.description,
      image: body.image,
      updatedAt: new Date(),
    })
    .where(eq(distributors.id, params.id))
    .returning();

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: any) {
  await db.delete(distributors).where(eq(distributors.id, params.id));

  return NextResponse.json({ success: true });
}