import { db } from "@/src/db";
import { products } from "@/src/db/schema";
import { eq, inArray } from "drizzle-orm";

// In-memory store of product IDs marked as "New"
let newProductIds: string[] = [];

// GET — return full product objects for all "new" product IDs
export async function GET() {
  try {
    if (newProductIds.length === 0) {
      return Response.json([]);
    }

    const newProducts = await db
      .select()
      .from(products)
      .where(inArray(products.id, newProductIds));

    return Response.json(newProducts);
  } catch (error) {
    return Response.json({ error: "Failed to fetch new products" }, { status: 500 });
  }
}

// POST — add or remove a product ID from the new products list
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, isNew } = body;

    if (!productId) {
      return Response.json({ error: "productId is required" }, { status: 400 });
    }

    if (isNew) {
      if (!newProductIds.includes(productId)) {
        newProductIds.push(productId);
      }
    } else {
      newProductIds = newProductIds.filter((id) => id !== productId);
    }

    return Response.json({ success: true, newProductIds });
  } catch (error) {
    return Response.json({ success: false, error: String(error) }, { status: 500 });
  }
}
