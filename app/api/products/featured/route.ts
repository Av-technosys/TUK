import { db } from "@/src/db";
import { products } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const featuredProducts = await db
      .select()
      .from(products)
      .where(eq(products.isFeatured, true))
      .limit(6);

    return Response.json(featuredProducts);
  } catch (error) {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}