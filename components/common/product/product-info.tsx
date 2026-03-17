"use client"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  IconCheck,
  IconCopy,
  IconTruck,
  IconShieldCheck,
  IconMessageCircle,
  IconPhone,
  IconMail,
  IconFileText,
  IconHeart,
  IconRosetteDiscountCheck
} from "@tabler/icons-react"

export default function ProductInfo() {

  const [qty, setQty] = useState(1)

  return (
    <div className="flex flex-col gap-6">

      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <span className="text-primary font-medium">Network Cables</span>
        <span>|</span>
        <span>SKU: PXSPDY6B / PXSPDY6BL</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold">
        Cat6 UTP Cable – Blue 305m Box
      </h1>

      {/* Product Code */}
      <div className="flex items-center gap-3">
        <div className="border rounded-lg px-3 py-2 flex items-center gap-2 bg-muted/40">
          <span className="text-sm text-muted-foreground">
            Product Code:
          </span>

          <span className="font-medium">
            PXSPDY6BL
          </span>

          <IconCopy size={18} className="cursor-pointer text-muted-foreground" />
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-3 flex-wrap">
        <Badge className="bg-orange-100 text-orange-600 border-0">
          🔥 Popular
        </Badge>

        <Badge className="bg-green-100 text-green-600 border-0">
          ✔ In Stock
        </Badge>

        <Badge className="bg-blue-100 text-[#1E3A8A] border-0">
          B2B Pricing
        </Badge>
      </div>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">
        High-performance 23AWG solid copper conductor Cat6 UTP cable for reliable
        data transmission up to 250MHz. Suitable for Gigabit Ethernet installations.
        This premium quality cable meets all TIA/EIA standards and is ideal for
        commercial and industrial network installations.
      </p>

      {/* Key Features */}
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-lg">
          Key Features
        </h3>

        <ul className="flex flex-col gap-2">

          <li className="flex items-start gap-2">
            <IconCheck className="text-green-600 mt-1" size={18}/>
            23AWG solid bare copper conductors for optimal performance
          </li>

          <li className="flex items-start gap-2">
            <IconCheck className="text-green-600 mt-1" size={18}/>
            Supports data rates up to 10 Gbps at limited distances
          </li>

          <li className="flex items-start gap-2">
            <IconCheck className="text-green-600 mt-1" size={18}/>
            Reduced crosstalk and improved signal-to-noise ratio
          </li>

          <li className="flex items-start gap-2">
            <IconCheck className="text-green-600 mt-1" size={18}/>
            Suitable for horizontal cabling in structured systems
          </li>

          <li className="flex items-start gap-2">
            <IconCheck className="text-green-600 mt-1" size={18}/>
            Easy pull box packaging for convenient installation
          </li>

          <li className="flex items-start gap-2">
            <IconCheck className="text-green-600 mt-1" size={18}/>
            Compliant with international cabling standards
          </li>

        </ul>
      </div>

      {/* Quick Specifications */}
      <div className="bg-muted/40 rounded-xl border p-4">
        <h4 className="font-semibold mb-3">
          Quick Specifications
        </h4>

        <div className="grid grid-cols-2 gap-3 text-sm">

          <div>
            <p className="text-muted-foreground">Cable Type</p>
            <p className="font-medium">Cat6 UTP</p>
          </div>

          <div>
            <p className="text-muted-foreground">Conductor</p>
            <p className="font-medium">23AWG Solid Copper</p>
          </div>

          <div>
            <p className="text-muted-foreground">Frequency</p>
            <p className="font-medium">Up to 250MHz</p>
          </div>

          <div>
            <p className="text-muted-foreground">Length</p>
            <p className="font-medium">305m (1000ft)</p>
          </div>

        </div>
      </div>

      {/* Quantity (UPDATED) */}
      <div className="flex items-center gap-3">

        <span className="font-medium">
          Quantity:
        </span>

        <div className="flex items-center border rounded-lg overflow-hidden">

          <Button
            variant="ghost"
            className="px-3 rounded-none"
            onClick={() => setQty((prev) => Math.max(1, prev - 1))}
          >
            -
          </Button>

          <div className="px-4 py-2 text-center min-w-[40px]">
            {qty}
          </div>

          <Button
            variant="ghost"
            className="px-3 rounded-none"
            onClick={() => setQty((prev) => prev + 1)}
          >
            +
          </Button>

        </div>

      </div>
<div className="flex flex-col sm:flex-row gap-4 w-full">

  {/* Request Quote */}
  <Button className="w-full sm:flex-1 h-14 sm:h-12 rounded-full bg-[#0b0bbf] hover:bg-[#0b0bbf] text-white text-base sm:text-sm font-medium flex items-center justify-center gap-2 px-6">
    <IconFileText size={20} />
    Request Quote
  </Button>

  {/* Wishlist */}
  <Button
    variant="outline"
    className="w-full sm:flex-1 h-14 sm:h-12 rounded-full border-[#0b0bbf] text-[#0b0bbf] hover:bg-transparent text-base sm:text-sm font-medium flex items-center justify-center gap-2 px-6"
  >
    <IconHeart size={20} />
    Add to Wishlist
  </Button>

</div>
      {/* B2B Pricing Box */}
     <div className="flex items-start gap-4 bg-gray-100 border rounded-xl p-4">

  {/* Icon Box */}
  <div className="bg-[#0300A7] text-white p-3 rounded-lg flex items-center justify-center">
    <IconMessageCircle size={22} />
  </div>

  {/* Content */}
  <div className="flex flex-col gap-2">

    <p className="font-semibold text-base">
      Need B2B Pricing?
    </p>

    <p className="text-sm text-muted-foreground leading-relaxed">
      Our sales team specializes in bulk orders and can provide competitive
      pricing for wholesalers and distributors.
    </p>

    {/* Contact Row */}
    <div className="flex flex-wrap items-center gap-4 text-sm text-[#0300A7] font-extrabold">

      <span className="flex items-center gap-2">
        <IconPhone size={16} />
        +44 (0)20 8946 9494
      </span>

      <span className="flex items-center gap-2">
        <IconMail size={16} />
        sales@tuk.co.uk
      </span>

    </div>

  </div>

</div>

      {/* Footer Info */}
    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">

  {/* ISO Certified */}
  <span className="flex items-center gap-2">
    <IconShieldCheck size={18} className="text-green-600" />
    ISO 9001 Certified
  </span>

  {/* Fast Delivery */}
  <span className="flex items-center gap-2">
    <IconTruck size={18} className="text-blue-600" />
    Fast UK Delivery
  </span>

  {/* Warranty */}
  <span className="flex items-center gap-2">
    <IconRosetteDiscountCheck size={18} className="text-orange-500" />
    2 Year Warranty
  </span>

</div>

    </div>
  )
}