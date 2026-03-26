import { db } from "@/src/db";
import { products, categories } from "@/src/db/schema";
import { NextResponse } from "next/server";
import { ilike, or, sql } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const results = await db
      .select({
        id: products.id,
        name: products.name,
        image: products.bannerImageUrl,
        category: categories.name,
      })
      .from(products)
      .leftJoin(categories, sql`${products.categoryId} = ${categories.id}`)
      .where(
        or(
          ilike(products.name, `%${query}%`),
          ilike(categories.name, `%${query}%`),
        )
      )
      .limit(10);

    return NextResponse.json(results);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}