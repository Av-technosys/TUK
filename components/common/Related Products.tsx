"use client";

import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  bannerImageUrl?: string | null;
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

        // ✅ IMPORTANT FIX
        if (Array.isArray(data)) {
          setRelated(data);
        } else {
          setRelated([]); // fallback
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

  // console.log("RELATED DATA:", related);
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Related Products</h2>

      {loading && <p>Loading...</p>}

      {!loading && related.length === 0 && <p>No related products found</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.isArray(related) &&
          related.map((item) => (
            <div
              key={item?.id}
              className="border rounded-lg  hover:shadow-md transition"
            >
              <img
                src={item?.bannerImageUrl || "/placeholder.png"}
                className="h-44 object-cover w-full rounded-t-lg"
              />

              <h3 className="text-sm font-medium mt-3 text-center">
                {item?.name}
              </h3>
            </div>
          ))}
      </div>
    </div>
  );
}
