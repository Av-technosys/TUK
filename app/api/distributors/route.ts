import { db } from "@/src/db";
import { distributors } from "@/src/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await db.select().from(distributors);
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newDistributor = await db
    .insert(distributors)
    .values({
      name: body.name,
      slug: body.slug,
      description: body.description,
      image: body.image,
      visitUrl: body.visitUrl,
    })
    .returning();

  return NextResponse.json(newDistributor);
}