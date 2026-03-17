"use client"

import React from "react"
import Header from "@/components/common/header"
import Footer from "@/components/common/footer"

import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import {
    IconBuilding,
  IconHeart,
  IconRosetteDiscountCheck,
  IconShoppingCart,
  IconTrash,
  IconUsers,
  IconWorld
} from "@tabler/icons-react"

const products = [
  {
    name: "Speedy RJ45 Cat 6 Plugs",
    code: "TUK-SRJ6-50",
    stock: "In Stock",
    img: "/image/wishlist.png",
  },
  {
    name: "1U 24 Port Toolless Patch Panel",
    code: "TUK-PP-24U",
    stock: "Available to Order",
    img: "/image/wishlist.png",
  },
  {
    name: "Cat 6A Keystone Jack - Shuttered",
    code: "TUK-KJ6A-W",
    stock: "In Stock",
    img: "/image/wishlist.png",
  },
]

const Page = () => {
  return (
    <>
      <Header />

      <section className="w-full bg-gray-100 py-12">
        <div className="max-w-5xl mx-auto px-4">

          {/* Title */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <IconHeart className="text-[#0300A7]" />
              <h1 className="text-xl font-semibold text-gray-800">
                My Wishlist
              </h1>
            </div>

            <p className="text-sm text-gray-500">
              3 Items Saved
            </p>
          </div>

          <Card className="bg-white border rounded-xl">
            <CardContent className="p-0">

              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 border-b text-sm font-semibold text-gray-500 uppercase px-6 py-4">
                <div className="col-span-2">Product</div>
                <div className="col-span-8">Details</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              {/* Rows */}
              {products.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-12 items-start md:items-center border-b last:border-none px-4 md:px-6 py-6 gap-4"
                >

                  {/* Product Image */}
                  <div className="md:col-span-2 flex items-center">
                  {/* Product Image */}
<div className="md:col-span-2 flex items-center">
  <Image
    src={item.img}
    alt="product"
    width={80}
    height={80}
    className="object-contain rounded-lg"
  />
</div>
                  </div>

                  {/* Details */}
                  <div className="md:col-span-8">
                    <h3 className="font-semibold text-gray-800">
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      CODE: {item.code}
                    </p>

                    <p
                      className={`text-sm ${
                        item.stock === "In Stock"
                          ? "text-[#0300A7]"
                          : "text-[#F59E0B]"
                      }`}
                    >
                      {item.stock}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="md:col-span-2 flex items-center md:justify-end gap-4">
                    <Button className="bg-[#0300A7] hover:bg-[#0300A7] text-white flex items-center gap-2">
                      <IconShoppingCart size={16} />
                      ENQUIRE
                    </Button>

                    <IconTrash className="text-gray-400 cursor-pointer hover:text-red-500" />
                  </div>

                </div>
              ))}

            </CardContent>
          </Card>

        </div>
      </section>


{/* Stats Section */}
<section className="w-full bg-[#38bdf8] text-white">
  <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

    {/* Item */}
    <div className="flex flex-col items-center gap-1">
      <IconBuilding size={24} />
      <h3 className="text-xl font-semibold">1984</h3>
      <p className="text-xs tracking-widest text-white/80">
        ORIGINALLY FOUNDED
      </p>
    </div>

    {/* Item */}
    <div className="flex flex-col items-center gap-1">
      <IconRosetteDiscountCheck size={24} />
      <h3 className="text-xl font-semibold">ISO 9001</h3>
      <p className="text-xs tracking-widest text-white/80">
        REGISTERED FIRM
      </p>
    </div>

    {/* Item */}
    <div className="flex flex-col items-center gap-1">
      <IconWorld size={24} />
      <h3 className="text-xl font-semibold">10+</h3>
      <p className="text-xs tracking-widest text-white/80">
        COUNTRY COVER
      </p>
    </div>

    {/* Item */}
    <div className="flex flex-col items-center gap-1">
      <IconUsers size={24} />
      <h3 className="text-xl font-semibold">20k+</h3>
      <p className="text-xs tracking-widest text-white/80">
        HAPPY CLIENTS
      </p>
    </div>

  </div>
</section>
      <Footer />
    </>
  )
}

export default Page