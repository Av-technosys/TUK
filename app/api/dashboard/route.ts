import { db } from "@/src/db";
import { products, categories, distributors } from "@/src/db/schema";
import { count } from "drizzle-orm";

export async function GET() {
  try {
    const [totalProducts] = await db
      .select({ value: count() })
      .from(products);

    const [totalCategories] = await db
      .select({ value: count() })
      .from(categories);

    const [totalDistributors] = await db
      .select({ value: count() })
      .from(distributors);

    // 👉 If you have relatedProducts table
    const totalRelatedProducts = totalProducts.value; // or query your table

    return Response.json({
      totalProducts: totalProducts.value,
      totalCategories: totalCategories.value,
      totalDistributors: totalDistributors.value,
      totalRelatedProducts,
    });
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}