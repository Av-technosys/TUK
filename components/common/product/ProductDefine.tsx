"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconArrowRight, IconHeart } from "@tabler/icons-react";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const getWishlist = () => {
  return JSON.parse(localStorage.getItem("wishlist") || "[]");
};

const ProductDefine = ({ category, sort, setSort }: any) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  const productsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const items = getWishlist();
    setWishlistIds(items.map((i: any) => i.id));
  }, []);

  const handleWishlist = (product: any) => {
    let wishlist = getWishlist();

    const exists = wishlist.find((i: any) => i.id === product.id);

    if (exists) {
      wishlist = wishlist.filter((i: any) => i.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setWishlistIds(wishlist.map((i: any) => i.id));

      toast.error("Removed from wishlist ❌");
    } else {
      wishlist.push({
        id: product.id,
        name: product.name,
        bannerImageUrl: product.bannerImageUrl,
        sku: product.sku,
      });

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setWishlistIds(wishlist.map((i: any) => i.id));

      toast.success("Added to wishlist ❤️");
    }
  };

  const getProductCode = (product: any) => {
    return (
      product.code ||
      product.productCode ||
      product.sku ||
      product.product_code ||
      "N/A"
    );
  };

  let filtered =
    category === "All Categories"
      ? products
      : products.filter((p: any) => p.category === category);

  if (sort === "name") {
    filtered = filtered.sort((a: any, b: any) =>
      (a.name || "").localeCompare(b.name || ""),
    );
  }

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const visibleProducts = filtered.slice(start, end);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-semibold">{category}</h2>

          <p className="text-gray-500 mt-1">
            Showing {filtered.length} results
          </p>
        </div>

        <div className="hidden xl:flex items-center gap-3">
          <span className="text-gray-500 text-sm">Sort by:</span>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full sm:w-auto">
              <SelectValue placeholder="Latest Arrivals" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="latest">Latest Arrivals</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {visibleProducts.map((product: any) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition block"
          >
            <div className="relative">
              {product.createdAt &&
                new Date(product.createdAt) >
                  new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) && (
                  <span className="absolute top-3 left-3 bg-[#FB923C] text-white text-xs px-3 py-1 rounded-full">
                    NEW
                  </span>
                )}

              <Image
                src={product.bannerImageUrl || "/image/category.png"}
                alt={product.name}
                width={500}
                height={400}
                className="w-full h-32 sm:h-44 object-cover"
              />
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-semibold">{product.name}</h3>

              <p className="text-black text-xs font-bold">
                ProductCode:&nbsp;
                <span className="text-gray-700 text-xs">
                  {getProductCode(product)}
                </span>
              </p>

              {/* ✅ UPDATED ROW */}
              <div className="flex items-center justify-between">
                <Button
                  variant="link"
                  className="p-0 text-[#0300A7] flex items-center gap-2"
                >
                  View <IconArrowRight size={18} />
                </Button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleWishlist(product);
                  }}
                  className="border rounded-full p-2 hover:bg-muted transition"
                >
                  <IconHeart
                    size={18}
                    className={
                      wishlistIds.includes(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }
                  />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* PAGINATION */}
      <Pagination className="mt-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={page === i + 1}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductDefine;
