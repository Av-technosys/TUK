"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    // const confirmDelete = confirm(
    //   "Are you sure you want to delete this product?",
    // );
    // if (!confirmDelete) return;

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      toast("Product deleted");

      // 🔥 remove from UI instantly
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      toast("Delete failed");
    }
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredProducts = normalizedQuery
    ? products.filter((p) => {
        const searchable = [p.name, p.slug, p.brand, p.sku, p.productCode]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return searchable.includes(normalizedQuery);
      })
    : products;

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-barlow">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-6">All Products</h2>
          {/* searchbar */}
          <div className="relative w-full max-w-sm mr-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products..."
              className=" w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button
            onClick={() =>
              (window.location.href = "/admin/Product/add-product")
            }
            className="bg-black cursor-pointer text-white px-4 py-2 rounded-lg "
          >
            Add Product
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Product Code</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody className="items-center">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="border-t ">
                  <td className="p-3">
                    {p.bannerImageUrl ? (
                      <img
                        src={p.bannerImageUrl}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </td>

                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">
                    {p.category ? (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold">
                        {p.category}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">No category</span>
                    )}
                  </td>
                  <td className="p-3 ">{p.productCode}</td>

                  <td className="p-3 flex gap-2 mt-4">
                    <Button
                      onClick={() => router.push(`/admin/Product/edit/${p.id}`)}
                      className="cursor-pointer rounded"
                    >
                      Edit
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button
                          variant="destructive"
                          className="px-3 py-1 cursor-pointer text-sm font-medium  rounded "
                        >
                          Delete
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>

                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the category.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>

                          <AlertDialogAction onClick={() => handleDelete(p.id)}>
                            Yes, Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
