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
import { distributors, productDistributor } from "@/src/db/schema";

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

      const distributorsData = await db
  .select({
    distributor: distributors,
  })
  .from(productDistributor)
  .leftJoin(
    distributors,
    eq(productDistributor.distributorsId, distributors.id)
  )
  .where(eq(productDistributor.productId, id));

  const distributorsList = distributorsData
  .map((item) => item.distributor)
  .filter(Boolean);

    return NextResponse.json({
      ...product,
      features,
      specifications,
      images,
      diTerms,
       distributors: distributorsList,
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
      content: body.content ?? null,
    };

    await db
      .update(products)
      .set(updateData)
      .where(eq(products.id, id));

    // 🔥 DELETE & UPDATE FEATURES
    await db
      .delete(productFeatures)
      .where(eq(productFeatures.productId, id));

    if (body.features?.length > 0) {
      await db.insert(productFeatures).values(
        body.features.map((feature: string) => ({
          productId: id,
          feature,
        }))
      );
    }

    // 🔥 DELETE & UPDATE SPECIFICATIONS
    await db
      .delete(productSpecifications)
      .where(eq(productSpecifications.productId, id));

    // Combine specs and techspecs into one array to avoid duplication
    const allSpecs = [
      ...(body.specs?.filter((s: any) => s?.key && s?.value) || []),
      ...(body.techspecs?.filter((s: any) => s?.key && s?.value) || []),
    ];

    if (allSpecs.length > 0) {
      // Remove duplicates based on key-value combination
      const uniqueSpecs = Array.from(
        new Map(
          allSpecs.map((spec: any) => [`${spec.key}-${spec.value}`, spec])
        ).values()
      );

      await db.insert(productSpecifications).values(
        uniqueSpecs.map((spec: any) => ({
          productId: id,
          key: spec.key,
          value: spec.value,
        }))
      );
    }

    // 🔥 DELETE & UPDATE GALLERY IMAGES
    await db
      .delete(productImages)
      .where(eq(productImages.productId, id));

    if (body.images?.length > 0) {
      await db.insert(productImages).values(
        body.images.map((imageUrl: string) => ({
          productId: id,
          imageUrl,
        }))
      );
    }

    // 🔥 DELETE & UPDATE DI TERMS
    await db
      .delete(productDiTerms)
      .where(eq(productDiTerms.productId, id));

    if (body.diTerms?.length > 0) {
      await db.insert(productDiTerms).values(
        body.diTerms.map((term: string) => ({
          productId: id,
          value: term,
        }))
      );
    }

      await db
  .delete(productDistributor)
  .where(eq(productDistributor.productId, id));

// 🔥 INSERT NEW DISTRIBUTORS
if (body.distributors?.length > 0) {
  await db.insert(productDistributor).values(
    body.distributors.map((distId: string) => ({
      productId: id,
      distributorsId: distId,
    }))
  );
}

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
    await db
  .delete(productDistributor)
  .where(eq(productDistributor.productId, id));

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