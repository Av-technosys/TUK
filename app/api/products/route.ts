import { db } from "@/src/db";
import { products, categories } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const data = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      description: products.description,
      bannerImageUrl: products.bannerImageUrl,
      shortDescription: products.shortDescription,
      brand: products.brand,
      sku: products.sku,
      productCode: products.productCode,
      pdfUrl: products.pdfUrl,
      isFeatured: products.isFeatured,
      isActive: products.isActive,
      createdAt: products.createdAt,
      category: categories.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id));

  return Response.json(data);
}