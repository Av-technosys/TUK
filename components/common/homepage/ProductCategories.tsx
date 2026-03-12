"use client"

import { IconArrowRight } from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"

const products = [
  { title: "RJ45 Connectors", img: "/image/product.jpg" },
  { title: "Patch Panels", img: "/image/product.jpg" },
  { title: "Keystone Jacks", img: "/image/product.jpg" },
  { title: "Bulk Cables", img: "/image/product.jpg" },
  { title: "Professional Tools", img: "/image/product.jpg" },
  { title: "Fiber Optics", img: "/image/product.jpg" },
  { title: "Cabinets", img: "/image/product12.png" },
  { title: "Wall Plates", img: "/image/product12.png" },
  { title: "AV Solutions", img: "/image/product12.png" },
  { title: "Modular Plugs", img: "/image/product12.png" },
  { title: "Accessories", img: "/image/product12.png" },
  { title: "Couplers", img: "/image/product12.png" },
]

const ProductCategories = () => {
  return (
    <section className="w-full bg-white">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 xl:px-8 py-16">

        {/* Heading */}
        <div className="flex items-start justify-between flex-wrap gap-6 mb-12">

          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-gray-900">
              Product Categories
            </h2>

            <p className="text-gray-600">
              Browse our comprehensive range of high-performance cabling hardware.
            </p>
          </div>

         <Link
  href="#"
  className="text-[#007AFF] font-bold  flex items-center gap-1"
>
  View all categories
  <IconArrowRight size={18} />
</Link>

        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-6">

          {products.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl group cursor-pointer bg-white"
            >

              <Image
                src={item.img}
                alt={item.title}
                width={500}
                height={500}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* text */}
              <div className="absolute bottom-4 left-4 text-white font-semibold">
                {item.title}
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default ProductCategories