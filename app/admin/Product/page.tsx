import { Suspense } from "react";
import { ProductsPageClient } from "./ProductsPageClient";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <ProductsPageClient />
    </Suspense>
  );
}
