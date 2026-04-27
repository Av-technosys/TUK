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
import { Copy, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export function ProductsPageClient() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();

      // If returning from an edit, float that product to the top
      const recentId = searchParams.get("recentId");
      if (recentId) {
        const idx = data.findIndex((p: any) => p.id === recentId);
        if (idx > 0) {
          const [edited] = data.splice(idx, 1);
          data.unshift(edited);
        }
        // Clean the URL without causing a navigation
        window.history.replaceState({}, "", "/admin/Product");
      }

      setProducts(data);
    };

    fetchProducts();
  }, [searchParams]);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      toast("Product deleted");
      // remove from UI instantly
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      toast("Delete failed");
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      setDuplicatingId(id);
      const res = await fetch(`/api/products/duplicate/${id}`, {
        method: "POST",
      });
      const data = await res.json();

      if (data.success) {
        toast.success(`"${data.product.name}" created ✓`);
        // Prepend the new product to the top of the list
        setProducts((prev) => [data.product, ...prev]);
      } else {
        toast.error(data.error || "Duplication failed");
      }
    } catch {
      toast.error("Failed to duplicate product");
    } finally {
      setDuplicatingId(null);
    }
  };

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return products;

    return products.filter((p) => {
      const searchable = [p.name, p.slug, p.brand, p.sku, p.productCode]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return searchable.includes(normalizedQuery);
    });
  }, [products, searchQuery]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-barlow">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between">
          <h2 className=" w-full text-lg font-bold mb-6">All Products</h2>
          <div className="relative w-full max-w-sm mr-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products..."
              className=" w-full border hidden lg:block border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button
            onClick={() => (window.location.href = "/admin/Product/add-product")}
            className="bg-black cursor-pointer text-white px-4 py-2 rounded-lg "
          >
            Add Product
          </Button>
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search products..."
          className=" w-full border lg:hidden block border-gray-300 mb-4 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

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

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={duplicatingId === p.id}
                      onClick={() => handleDuplicate(p.id)}
                      className="gap-1.5 cursor-pointer"
                    >
                      {duplicatingId === p.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      Duplicate
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

