import { db } from "@/src/db";
import { products } from "@/src/db/schema";
import { eq, and, ne } from "drizzle-orm";

export async function GET(
  req: Request,
  ctx: RouteContext<'/api/products/[id]/related'>
) {
  const { id } = await ctx.params;
  const categoryId = id;
  // console.log("Fetching related products for ID:", categoryId); // ✅ debug  

try{
    const related = await db
      .select()
      .from(products)
      .where(
        and(
          eq(products.categoryId, categoryId),
          ne(products.id, categoryId)
        )
      )
      .limit(8);
    
    // console.log("Related products:", related); // ✅ debug

    return Response.json(related);
  } catch (err: any) {
    console.error("❌ RELATED API ERROR:", err); // 🔥 IMPORTANT

    return Response.json([], { status: 500 }); // always return array
  }
}
