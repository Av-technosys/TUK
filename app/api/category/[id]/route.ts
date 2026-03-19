
import { db } from "@/src/db";
import { categories } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// ✅ GET SINGLE CATEGORY
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await db
      .select()
      .from(categories
      )
      .where(eq(categories.id, params.id));

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

// ✅ UPDATE CATEGORY
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const updated = await db
      .update(categories)
      .set({
        name: body.name,
        slug: body.slug,
        description: body.description,
        image: body.image,
        updatedAt: new Date(),
      })
      .where(eq(categories.id, params.id))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// ✅ DELETE CATEGORY
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db
      .delete(categories)
      .where(eq(categories.id, params.id));

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}