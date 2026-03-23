import { db } from "@/src/db";
import { products } from "@/src/db/schema";

export async function GET() {
  const data = await db.select().from(products);

  return Response.json(data);
}