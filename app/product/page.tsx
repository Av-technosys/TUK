"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/common/header"
import Footer from "@/components/common/footer"
import FilterSideBar from "@/components/common/product/FilterSidebar"
import ProductDefine, { products } from "@/components/common/product/ProductDefine"

export default function Page() {

  const [category, setCategory] = useState("All Categories")
  const [sort, setSort] = useState("latest")

  return (
    <>
      <Header />

      <div className="w-full bg-gray-100 ">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-600 flex items-center gap-2">

          <Link href="/" className="hover:text-black">
            Home
          </Link>

          <span>›</span>

          <Link href="/products" className="hover:text-black">
            Products
          </Link>

          <span>›</span>

          <span className="text-black font-medium">
            {category}
          </span>

        </div>
      </div>

      <section className="bg-gray-100 w-full py-1 lg:py-10">

        <div className="max-w-6xl mx-auto px-4">

          {/* MOBILE FILTER BAR */}

          <div className="lg:hidden flex items-center gap-3 mb-6">

            {/* CATEGORY SELECT */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-lg px-4 py-2 text-sm bg-white"
            >
              <option value="All Categories">All</option>
              <option value="Voice & Data">Voice & Data</option>
              <option value="Fiber Optic">Fiber Optic</option>
              <option value="Network Racks">Network Racks</option>
              <option value="Patch Panels">Patch Panels</option>
              <option value="Keystone Jacks">Keystone Jacks</option>
              <option value="Power Distribution">Power Distribution</option>
              <option value="Cable Management">Cable Management</option>
              <option value="Testing Equipment">Testing Equipment</option>
              <option value="Copper Cables">Copper Cables</option>
              <option value="Wall Outlets">Wall Outlets</option>
              <option value="Tools & Accessories">Tools & Accessories</option>
            </select>

            {/* SORT */}
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

            <div className="hidden lg:block lg:w-1/4 lg:sticky lg:top-24 h-fit">

              <FilterSideBar
                category={category}
                setCategory={setCategory}
                sort={sort}
                setSort={setSort}
                products={products}
              />

            </div>

            {/* PRODUCTS */}

            <div className="lg:w-3/4">

              <ProductDefine
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
  )
}