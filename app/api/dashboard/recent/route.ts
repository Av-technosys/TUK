import { db } from "@/src/db";
import { products, categories } from "@/src/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    // 🔹 Get categories
    const category = await db
      .select()
      .from(categories)
      .orderBy(desc(categories.id))
      .limit(5);

    // 🔹 Attach products to each category
    const categoriesWithProducts = await Promise.all(
      category.map(async (cat) => {
        const relatedProducts = await db
          .select()
          .from(products)
          .where(eq(products.categoryId, cat.id))
          .limit(3); // only show 3 products

        return {
          ...cat,
          products: relatedProducts,
        };
      })
    );

    return Response.json({
      recentCategories: categoriesWithProducts,
    });
  } catch (error) {
    return Response.json({ error: "Error fetching data" }, { status: 500 });
  }
}