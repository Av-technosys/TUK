import { db } from "@/src/db";
import {
  products,
  productFeatures,
  productSpecifications,
  productImages,
  productDiTerms,
} from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // ✅ FIX
) {
  try {
    const { id } = await params; // ✅ VERY IMPORTANT

    if (!id) {
      return NextResponse.json(
        { error: "ID is missing" },
        { status: 400 }
      );
    }

    // 🔥 MAIN PRODUCT
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .then((res) => res[0]);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // 🔥 RELATED DATA
    const features = await db
      .select()
      .from(productFeatures)
      .where(eq(productFeatures.productId, id));

    const specifications = await db
      .select()
      .from(productSpecifications)
      .where(eq(productSpecifications.productId, id));

    const images = await db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, id));

    const diTerms = await db
      .select()
      .from(productDiTerms)
      .where(eq(productDiTerms.productId, id));

    return NextResponse.json({
      ...product,
      features,
      specifications,
      images,
      diTerms,
    });
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// ✅ PUT (for update button)
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // ✅ FIX
) {
  try {
    const { id } = await params; // ✅ MUST

    if (!id) {
      return Response.json({ error: "Missing ID" }, { status: 400 });
    }

    const body = await req.json();

    // 🔥 REMOVE UNDEFINED VALUES
    const updateData: any = {
      name: body.name ?? null,
      slug: body.slug ?? null,
      description: body.description ?? null,
      shortDescription: body.shortDescription ?? null,
      brand: body.brand ?? null,
      sku: body.sku ?? null,
      productCode: body.productCode ?? null,
      categoryId: body.categoryId ?? null,
      bannerImageUrl: body.bannerImageUrl ?? null,
      pdfUrl: body.pdfUrl ?? null,
    };

    await db
      .update(products)
      .set(updateData)
      .where(eq(products.id, id));

    return Response.json({ success: true });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return Response.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "ID is missing" },
        { status: 400 }
      );
    }

    // 🔥 Delete related data first
    await db.delete(productFeatures).where(eq(productFeatures.productId, id));
    await db.delete(productSpecifications).where(eq(productSpecifications.productId, id));
    await db.delete(productImages).where(eq(productImages.productId, id));
    await db.delete(productDiTerms).where(eq(productDiTerms.productId, id));

    // 🔥 Delete main product
    await db.delete(products).where(eq(products.id, id));

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}