import { db } from "@/src/db";
import {
  products,
  productImages,
  productFeatures,
  productSpecifications,
  productDiTerms,
  relatedProducts as relatedProductsTable,
} from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  return Response.json({ error: "Use /api/products/slug/[slug] with GET" }, { status: 400 });
}
