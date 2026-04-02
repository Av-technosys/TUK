"use client";

import { Suspense } from "react";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import FilterSide from "@/components/common/category/FilterSide";
import CategoryDefine from "@/components/common/category/CategoryDefine";
import { CategoryFilter } from "./CategoryFilter";

export const dynamic = "force-dynamic";

export default function Page() {
  const [sort, setSort] = useState("latest");
  const [category, setCategory] = useState("All Categories");
  const [categories, setCategories] = useState<any[]>([]);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  const handleCategoriesLoad = (data: any[]) => {
    setCategories(data);
  };

  return (
    <>
      <Header />

      {/* BREADCRUMB */}
      <div className="w-full bg-gray-100 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-600 flex items-center gap-2">
          <Link href="/" className="hover:text-black">
            Home
          </Link>

          <span>›</span>

          <Link href="/product" className="hover:text-black">
            Products
          </Link>

          <span>›</span>

          <span className="text-black font-medium">{category}</span>
        </div>
      </div>

      <Suspense fallback={<div className="w-full h-96 bg-gray-100" />}>
        <CategoryFilter
          onCategoryChange={handleCategoryChange}
          onCategoriesLoad={handleCategoriesLoad}
        />
      </Suspense>

      <section className="bg-gray-100 w-full py-1 lg:py-10">
        <div className="max-w-6xl mx-auto px-4">

          {/* MOBILE FILTER */}
          <div className="lg:hidden flex items-center gap-3 mb-6">

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-lg px-4 py-2 text-sm bg-white"
            >
              <option value="All Categories">All</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-lg px-4 py-2 text-sm bg-white"
            >
              <option value="latest">Sort by</option>
              <option value="name">Name</option>
              <option value="popular">Popular</option>
            </select>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">

            {/* SIDEBAR */}
            <div className="lg:w-1/4 lg:sticky lg:top-24 h-fit">
              <FilterSide
                category={category}
                setCategory={setCategory}
                sort={sort}
                setSort={setSort}
              />
            </div>

            {/* ✅ PRODUCTS (API BASED) */}
            <div className="lg:w-3/4">
              <CategoryDefine
                category={category}
                sort={sort}
                setSort={setSort}
              />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}