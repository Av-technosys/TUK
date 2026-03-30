"use client";

import { IconHeart } from "@tabler/icons-react";
import {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
  getWishlist,
} from "@/src/lib/wishlist";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";

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
import Link from "next/link";

const CategoryDefine = ({ category, sort, setSort }: any) => {
  const [categoryList, setCategoryList] = useState<any[]>([]); // ✅ FIX
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    const items = getWishlist();
    setWishlistIds(items.map((i: any) => i.id));
  }, []);

  const handleWishlist = (product: any) => {
    if (isInWishlist(product.id)) {
      const updated = removeFromWishlist(product.id);
      setWishlistIds(updated.map((i: any) => i.id));
    } else {
      const updated = addToWishlist(product);
      setWishlistIds(updated.map((i: any) => i.id));
    }
  };

  const [page, setPage] = useState(1);
  const productsPerPage = 12;

  // ✅ FETCH BOTH APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch("/api/category"),
          fetch("/api/products"),
        ]);

        const catData = await catRes.json();
        const prodData = await prodRes.json();

        setCategoryList(catData);
        setProducts(prodData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ FIND SELECTED CATEGORY OBJECT
  const selectedCat = categoryList.find((c: any) => c.name === category);

  // ✅ FILTER PRODUCTS (MAIN FIX)
  let filtered =
    category === "All Categories"
      ? products
      : products.filter(
          (p: any) => String(p.categoryId) === String(selectedCat?.id),
        );

  // ✅ SORT (optional)
  if (sort === "name") {
    filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const visibleProducts = filtered.slice(start, end);

  if (loading) {
    return <p className="text-center py-10">Loading products...</p>;
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-semibold">
            {category} {/* ✅ dynamic */}
          </h2>

          <p className="text-gray-500 mt-1">
            Showing {filtered.length} results
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <span className="text-gray-500 text-sm">Sort by:</span>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full sm:w-auto">
              <SelectValue placeholder="Latest Arrivals" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="latest">Latest Arrivals</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {visibleProducts.map((item: any) => (
          <Link
            href={`/product/${item.slug}`} // ✅ important
            key={item.id}
            className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition block"
          >
            <div className="relative">
              {item.createdAt &&
                new Date(item.createdAt) >
                  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                  <span className="absolute top-3 left-3 bg-[#FB923C] text-white text-xs px-3 py-1 rounded-full">
                    NEW
                  </span>
                )}

              <Image
                src={item.bannerImageUrl || "/image/category.png"}
                alt={item.name}
                width={500}
                height={400}
                className="w-full h-32 sm:h-44 object-cover"
              />
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-semibold">{item.name}</h3>

              <p className="text-gray-500 text-sm line-clamp-3">
                {item.description || "No description"}
              </p>

              <div className="flex justify-between ">
                <div>
                  <span className="text-[#0300A7] flex items-center gap-2 text-sm">
                    View <IconArrowRight size={16} />
                  </span>
                </div>
                <div>
                  <IconHeart
                    className={`cursor-pointer ${
                      wishlistIds.includes(item.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleWishlist(item);
                    }}
                  />
                </div>
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

export default CategoryDefine;
