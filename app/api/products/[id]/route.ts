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

// 🔥 GET SINGLE PRODUCT WITH ALL DATA
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return Response.json(
        { error: "Product ID required" },
        { status: 400 }
      );
    }

    const product = await db.select().from(products).where(eq(products.id, id));

    if (!product.length) {
      return Response.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const productData = product[0];

    // Fetch all related data
    const images = await db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, id));

    const features = await db
      .select()
      .from(productFeatures)
      .where(eq(productFeatures.productId, id));

    const specifications = await db
      .select()
      .from(productSpecifications)
      .where(eq(productSpecifications.productId, id));

    const diTerms = await db
      .select()
      .from(productDiTerms)
      .where(eq(productDiTerms.productId, id));

    const relatedProds = await db
      .select()
      .from(relatedProductsTable)
      .where(eq(relatedProductsTable.productId, id));

    return Response.json({
      ...productData,
      images,
      features,
      specifications,
      diTerms,
      relatedProducts: relatedProds,
    });
  } catch (error) {
    console.error("❌ GET PRODUCT ERROR:", error);
    return Response.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// 🔥 UPDATE PRODUCT WITH ALL DATA
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const {
      name,
      slug,
      description,
      shortDescription,
      brand,
      sku,
      productCode,
      categoryId,
      features = [],
      specs = [],
      techspecs = [],
      diTerms = [],
      bannerImageUrl = "",
      images = [],
      relatedProducts = [],
      content,
      pdfUrl,
    } = body;

    if (!id) {
      return Response.json(
        { error: "Product ID required" },
        { status: 400 }
      );
    }

    if (!name || !slug || !categoryId) {
      return Response.json(
        { error: "Name, slug and category are required" },
        { status: 400 }
      );
    }

    const result = await db.transaction(async (tx) => {
      // 1. Update Product
      await tx
        .update(products)
        .set({
          name,
          slug,
          description,
          shortDescription,
          brand,
          bannerImageUrl,
          sku,
          productCode,
          categoryId,
          content,
          pdfUrl,
        })
        .where(eq(products.id, id));

      // 2. Delete and re-add Images
      await tx.delete(productImages).where(eq(productImages.productId, id));
      if (images.length > 0) {
        await tx.insert(productImages).values(
          images.map((img: string, i: number) => ({
            productId: id,
            imageUrl: img,
            isPrimary: i === 0,
          }))
        );
      }

      // 3. Also add banner image if provided
      if (bannerImageUrl) {
        await tx.insert(productImages).values({
          productId: id,
          imageUrl: bannerImageUrl,
          isPrimary: images.length === 0,
        });
      }

      // 4. Delete and re-add Features
      await tx.delete(productFeatures).where(eq(productFeatures.productId, id));
      const cleanFeatures = features.filter((f: string) => f?.trim());
      if (cleanFeatures.length > 0) {
        await tx.insert(productFeatures).values(
          cleanFeatures.map((f: string) => ({
            productId: id,
            feature: f,
          }))
        );
      }

      // 5. Delete and re-add Specifications
      await tx.delete(productSpecifications).where(eq(productSpecifications.productId, id));
      const allSpecs = [...specs, ...techspecs].filter(
        (s: any) => s?.key && s?.value
      );
      if (allSpecs.length > 0) {
        await tx.insert(productSpecifications).values(
          allSpecs.map((s: any) => ({
            productId: id,
            key: s.key,
            value: s.value,
          }))
        );
      }

      // 6. Delete and re-add DI Terms
      await tx.delete(productDiTerms).where(eq(productDiTerms.productId, id));
      const cleanTerms = diTerms.filter((t: string) => t?.trim());
      if (cleanTerms.length > 0) {
        await tx.insert(productDiTerms).values(
          cleanTerms.map((term: string) => ({
            productId: id,
            value: term,
          }))
        );
      }

      // 7. Delete and re-add Related Products
      await tx.delete(relatedProductsTable).where(eq(relatedProductsTable.productId, id));
      
      return { id };
    });

    // 7. Handle Related Products after transaction (outside to avoid rollback)
    const validRelatedIds = Array.isArray(relatedProducts) 
      ? relatedProducts.filter((relId: string) => relId && typeof relId === 'string' && relId.trim() && relId !== id)
      : [];
    
    if (validRelatedIds.length > 0) {
      try {
        await db.insert(relatedProductsTable).values(
          validRelatedIds.map((relId: string) => ({
            productId: id,
            relatedProductId: relId,
          }))
        );
      } catch (err) {
        console.warn("⚠️ Related product insert failed (continuing anyway):", err);
        // Continue - related products failure shouldn't fail the entire update
      }
    }

    return Response.json({
      success: true,
      productId: result.id,
    });
  } catch (error: any) {
    console.error("❌ PRODUCT UPDATE ERROR:", error);
    return Response.json(
      { error: error?.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
    
    // const productId = params.id;
    console.log("product ID",id);

    if (!id) {
      return Response.json(
        { error: "Product ID required" },
        { status: 400 }
      );
    }

    // 🔥 Transaction (important)
    await db.transaction(async (tx) => {
      // Delete child tables first
      await tx.delete(productImages).where(eq(productImages.productId, id));
      await tx.delete(productFeatures).where(eq(productFeatures.productId, id));
      await tx.delete(productSpecifications).where(eq(productSpecifications.productId, id));
      await tx.delete(productDiTerms).where(eq(productDiTerms.productId, id));
      await tx.delete(relatedProductsTable).where(eq(relatedProductsTable.productId, id));

      // Delete main product
      await tx.delete(products).where(eq(products.id, id));
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error(" DELETE ERROR:", error);

    return Response.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}