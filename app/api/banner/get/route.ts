import { db } from "@/src/db";
import { banners } from "@/src/db/schema";
import { eq, asc } from "drizzle-orm";

// GET all active banners (sorted by position)
export async function GET() {
  try {
    const activeBanners = await db
      .select()
      .from(banners)
      .where(eq(banners.isActive, true))
      .orderBy(asc(banners.position));

    return Response.json(activeBanners);
  } catch (error) {
    return Response.json({ error: "Failed to fetch banners" }, { status: 500 });
  }
}
