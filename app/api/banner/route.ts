import { db } from "@/src/db";
import { banners } from "@/src/db/schema";
import { eq, desc } from "drizzle-orm";

const DEFAULT_BANNERS = [
  {
    title: "Download Product Guide",
    subtitle:
      "Access detailed specifications, features, and complete information about our connectivity and cabling solutions.",
    ctaText: "Download product guide →",
    ctaLink: "#product-guide",
    imageUrl: "/banner 3.png",
    isActive: true,
    position: 1,
  },
  {
    title: "WORLD CLASS DESIGNER AND MANUFACTURER",
    subtitle:
      "World-class designer and manufacturer of reliable copper cabling solutions for advanced and efficient connectivity infrastructure.",
    ctaText: "Browse All Products →",
    ctaLink: "/products",
    imageUrl: "/banner 2.png",
    isActive: true,
    position: 2,
  },
  {
    title: "Explore our wide range of SPEEDY RJ45 plugs and tools",
    subtitle:
      "Since 1984, TUK has been the trusted B2B partner for voice and data copper cabling — supplying manufacturers, wholesalers and distributors across 10+ countries.",
    ctaText: "Browse SPEEDY RJ45 →",
    ctaLink: "/category?categoryId=41b19390-5260-43e8-8d0c-08312ee4e041",
    imageUrl: "/banner 3.png",
    isActive: true,
    position: 3,
  },
];

// GET all banners (auto-seeds defaults if table is empty)
export async function GET() {
  try {
    let allBanners = await db
      .select()
      .from(banners)
      .orderBy(desc(banners.position));

    // Auto-seed defaults if table is empty
    if (allBanners.length === 0) {
      await db.insert(banners).values(DEFAULT_BANNERS);
      allBanners = await db
        .select()
        .from(banners)
        .orderBy(desc(banners.position));
    }

    return Response.json(allBanners);
  } catch (error) {
    return Response.json({ error: "Failed to fetch banners" }, { status: 500 });
  }
}


// POST - Create new banner
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await db
      .insert(banners)
      .values({
        title: body.title,
        subtitle: body.subtitle,
        ctaText: body.ctaText,
        ctaLink: body.ctaLink,
        imageUrl: body.imageUrl,
        isActive: body.isActive !== false,
      })
      .returning();

    return Response.json(result[0]);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to create banner" }, { status: 500 });
  }
}
