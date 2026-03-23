
import { db } from "@/src/db";
import { distributors } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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
    .where(eq(distributors.id, id))
    .returning();

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await db.delete(distributors).where(eq(distributors.id, id));

  return NextResponse.json({ success: true });
}