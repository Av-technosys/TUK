"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  IconBuilding,
  IconHeart,
  IconRosetteDiscountCheck,
  IconShoppingCart,
  IconTrash,
  IconUsers,
  IconWorld,
} from "@tabler/icons-react";
import { getWishlist, removeFromWishlist } from "@/src/lib/wishlist";
import EnquiryModal from "@/components/common/EnquiryModal";
import Counter from "@/components/common/homepage/counter";

const Page = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const handleDelete = (id: string) => {
    const updated = removeFromWishlist(id);
    setWishlist(updated);
  };

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
              {wishlist.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-12 items-start md:items-center border-b last:border-none px-4 md:px-6 py-6 gap-4"
                >
                  {/* Product Image */}
                  <div className="md:col-span-2 flex items-center">
                    {/* Product Image */}
                    <div className="md:col-span-2 flex items-center">
                      <Image
                        src={item.bannerImageUrl || item.img}
                        alt="product"
                        width={80}
                        height={80}
                        className="object-contain rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="md:col-span-8">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>

                    <p className="text-sm text-gray-500">CODE: {item.sku}</p>

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
                    <EnquiryModal />

                    <IconTrash
                      className="text-gray-400 cursor-pointer hover:text-red-500"
                      onClick={() => handleDelete(item.id)}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <Counter />
      <Footer />
    </>
  );
};

export default Page;
