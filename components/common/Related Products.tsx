"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  slug: string;
  bannerImageUrl?: string | null;
  description: string;
  sku: string;
};

export default function RelatedProducts({
  categoryID,
}: {
  categoryID: string;
}) {
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch(`/api/products/${categoryID}/related`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setRelated(data);
        } else {
          setRelated([]);
        }
      } catch (err) {
        console.error(err);
        setRelated([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [categoryID]);

  return (
    <div className="mt-14">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Related Products</h2>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}

      {!loading && related.length === 0 && (
        <p className="text-gray-400">No related products found</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.isArray(related) &&
          related.map((item) => (
            <Link
              href={`/product/${item.slug}`}
              key={item?.id}
              className="group bg-white border rounded-xl overflow-hidden hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={item?.bannerImageUrl || "/placeholder.png"}
                  className="h-44 w-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-3 space-y-1">
                {/* Category */}

                {/* Name */}
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {item?.name}
                </h3>

                {/* Description */}
                {item?.sku && (
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {item?.sku}
                  </p>
                )}

                {/* Price */}
                {item?.description && (
                  <p className="text-sm  text-black pt-1 line-clamp-3">
                    {item?.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
