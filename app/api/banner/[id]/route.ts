import { db } from "@/src/db";
import { banners } from "@/src/db/schema";
import { eq } from "drizzle-orm";

// PUT - Update banner
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: bannerId } = await params;
    const body = await req.json();

    const result = await db
      .update(banners)
      .set({
        title: body.title ?? undefined,
        subtitle: body.subtitle ?? undefined,
        ctaText: body.ctaText ?? undefined,
        ctaLink: body.ctaLink ?? undefined,
        imageUrl: body.imageUrl ?? undefined,
        isActive: body.isActive ?? undefined,
        position: body.position ?? undefined,
      })
      .where(eq(banners.id, bannerId))
      .returning();

    return Response.json(result[0]);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to update banner" }, { status: 500 });
  }
}

// DELETE - Delete banner
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: bannerId } = await params;

    await db.delete(banners).where(eq(banners.id, bannerId));

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to delete banner" }, { status: 500 });
  }
}
