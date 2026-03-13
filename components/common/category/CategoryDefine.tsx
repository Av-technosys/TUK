"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { IconArrowRight } from "@tabler/icons-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const products = [
  {
    id: 1,
    title: "Cat6 U/UTP LSZH Patch Cable",
    category: "Voice & Data",
    image: "/image/category.png",
    desc: "High-quality 9/125 OS2 fiber for high-speed long-distance connectivity.",
    new: true
  },
  {
    id: 2,
    title: "24 Port High Density Panel",
    category: "Network Racks",
    image: "/image/category1.png",
    desc: "High-quality 9/125 OS2 fiber for high-speed long-distance connectivity.",
    new: false
  },
  {
    id: 3,
    title: "Dual Keystone Faceplate",
    category: "Wall Outlets",
    image: "/image/category.png",
    desc: "High-quality 9/125 OS2 fiber for high-speed long-distance connectivity.",
    new: true
  },
  {
    id: 4,
    title: "Dual Keystone Faceplate",
    category: "Wall Outlets",
    image: "/image/category1.png",
    desc: "High-quality 9/125 OS2 fiber for high-speed long-distance connectivity.",
    new: true
  },
  {
    id: 5,
    title: "Fiber Cable",
    category: "Fiber Optic",
    image: "/image/category.png",
    desc: "High-quality 9/125 OS2 fiber for high-speed long-distance connectivity.",
    new: false
  },
  {
    id: 6,
    title: "Patch Panel",
    category: "Patch Panels",
    image: "/image/category1.png",
    desc: "High-quality 9/125 OS2 fiber for high-speed long-distance connectivity.",
    new: false
  },
  {
    id: 7,
    title: "Copper Cable",
    category: "Copper Cables",
    image: "/image/category.png",
    desc: "High-quality 9/125 OS2 fiber for high-speed long-distance connectivity.",
    new: false
  },
  {
    id: 8,
    title: "Cable Management Kit",
    category: "Cable Management",
    image: "/image/category1.png",
    desc: "High-quality 9/125 OS2 fiber for high-speed long-distance connectivity.",
    new: false
  },
   {
    id: 9,
    title: "Cat6 U/UTP LSZH Patch Cable",
    category: "Voice & Data",
    image: "/image/category.png",
    desc: "High-quality 9/125 OS2 fiber for high-speed long-distance connectivity.",
    new: true
  },
  {
    id: 10,
    title: "24 Port High Density Panel",
    category: "Network Racks",
    image: "/image/category1.png",
    desc: "High-quality 9/125 OS2 fiber for high-speed long-distance connectivity.",
    new: false
  },
  {
    id: 11,
    title: "Dual Keystone Faceplate",
    category: "Wall Outlets",
    image: "/image/category.png",
    desc: "High-quality 9/125 OS2 fiber for high-speed long-distance connectivity.",
    new: true
  },
  {
    id: 12,
    title: "Dual Keystone Faceplate",
    category: "Wall Outlets",
    image: "/image/category1.png",
    desc: "High-quality 9/125 OS2 fiber for high-speed long-distance connectivity.",
    new: true
  },
  {
    id: 13,
    title: "Fiber Cable",
    category: "Fiber Optic",
    image: "/image/category.png",
    desc: "High-quality 9/125 OS2 fiber for high-speed long-distance connectivity.",
    new: false
  },
  {
    id: 14,
    title: "Patch Panel",
    category: "Patch Panels",
    image: "/image/category1.png",
    desc: "High-quality 9/125 OS2 fiber for high-speed long-distance connectivity.",
    new: false
  },
  {
    id: 15,
    title: "Copper Cable",
    category: "Copper Cables",
    image: "/image/category.png",
    desc: "High-quality 9/125 OS2 fiber for high-speed long-distance connectivity.",
    new: false
  },
  {
    id: 16,
    title: "Cable Management Kit",
    category: "Cable Management",
    image: "/image/category1.png",
    desc: "High-quality 9/125 OS2 fiber for high-speed long-distance connectivity.",
    new: false
  }
]

const CategoryDefine = ({ category, sort, setSort }: any) => {

  const [page, setPage] = useState(1)
  const productsPerPage = 12

  let filtered =
    category === "All Categories"
      ? [...products]
      : products.filter((p: any) => p.category === category)

  if (sort === "name") {
    filtered = filtered.sort((a: any, b: any) =>
      a.title.localeCompare(b.title)
    )
  }

  const totalPages = Math.ceil(filtered.length / productsPerPage)

  const start = (page - 1) * productsPerPage
  const end = start + productsPerPage

  const visibleProducts = filtered.slice(start, end)

  return (
    <div>

      {/* HEADER */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h2 className="text-3xl font-semibold">
            All Categories
          </h2>

          <p className="text-gray-500 mt-1">
            Showing {filtered.length} results
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-3">

          <span className="text-gray-500 text-sm">
            Sort by:
          </span>

          <Select
            value={sort}
            onValueChange={setSort}
          >
          <SelectTrigger className="w-full sm:w-auto">
              <SelectValue placeholder="Latest Arrivals" />
            </SelectTrigger>

            <SelectContent>

              <SelectItem value="latest">
                Latest Arrivals
              </SelectItem>

              <SelectItem value="name">
                Name
              </SelectItem>

              <SelectItem value="popular">
                Popular
              </SelectItem>

            </SelectContent>

          </Select>

        </div>

      </div>

      {/* PRODUCT GRID */}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">

        {visibleProducts.map((product: any) => (

          <div
            key={product.id}
            className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition"
          >

            <div className="relative">

              {product.new && (
                <span className="absolute top-3 left-3 bg-[#FB923C] text-white text-xs px-3 py-1 rounded-full">
                  NEW
                </span>
              )}

              <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={400}
                className="w-full h-32 sm:h-44 object-cover"
              />

            </div>

            <div className="p-4 space-y-2">

              <p className="text-xs font-semibold text-gray-400">
                CABLING SOLUTIONS
              </p>

              <h3 className="font-semibold text-sm sm:text-base leading-snug">
                {product.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {product.desc}
              </p>

              <Button
                variant="link"
                className="p-0 text-[#0300A7] flex items-center gap-2"
              >
                View
                <IconArrowRight size={18} />
              </Button>

            </div>

          </div>

        ))}

      </div>

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
          className="text-[#0300A7] border-[#0300A7] data-[active=true]:bg-[#0300A7] data-[active=true]:text-white"
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
  )
}

export default CategoryDefine