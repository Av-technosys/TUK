import { db } from "@/src/db";
import { distributors } from "@/src/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await db.select().from(distributors).orderBy(distributors.position, distributors.createdAt);
  return NextResponse.json(data);
}

// export async function POST(req: Request) {
//   const body = await req.json();

//   const newDistributor = await db
//     .insert(distributors)
//     .values({
//       name: body.name,
//       slug: body.slug,
//       description: body.description,
//       image: body.image,
//       visitUrl: body.visitUrl,
//     })
//     .returning();

//   return NextResponse.json(newDistributor);
// }


export async function POST(req: Request) {
  const body = await req.json();

  // 👇 Get last position
const lastItem = await db
  .select()
  .from(distributors)
  .orderBy(distributors.position)
  .limit(1);

const nextPosition =
  lastItem.length > 0
    ? (lastItem[0].position ?? 0) + 1
    : 0;

  const newDistributor = await db
    .insert(distributors)
    .values({
      name: body.name,
      slug: body.slug,
      description: body.description,
      image: body.image,
      visitUrl: body.visitUrl,
      position: nextPosition, // 👈 IMPORTANT
    })
    .returning();

  return NextResponse.json(newDistributor);
}