"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  IconCheck,
  IconCopy,
  IconTruck,
  IconShieldCheck,
  IconMessageCircle
} from "@tabler/icons-react"

export default function ProductInfo() {
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

        <Badge className="bg-blue-100 text-blue-600 border-0">
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
            <p className="text-muted-foreground">
              Cable Type
            </p>
            <p className="font-medium">
              Cat6 UTP
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">
              Conductor
            </p>
            <p className="font-medium">
              23AWG Solid Copper
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">
              Frequency
            </p>
            <p className="font-medium">
              Up to 250MHz
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">
              Length
            </p>
            <p className="font-medium">
              305m (1000ft)
            </p>
          </div>

        </div>

      </div>


      {/* Quantity */}

      <div className="flex items-center gap-3">

        <span className="font-medium">
          Quantity:
        </span>

        <Input
          type="number"
          defaultValue="1"
          className="w-24"
        />

      </div>


      {/* Buttons */}

      <div className="flex flex-wrap gap-3">

        <Button className="flex-1">
          Request Quote
        </Button>

        <Button variant="outline" className="flex-1">
          Add to Wishlist
        </Button>

      </div>


      {/* B2B Pricing Box */}

      <div className="border rounded-xl p-4 bg-muted/40 flex items-start gap-3">

        <IconMessageCircle className="text-primary mt-1" size={24} />

        <div>

          <p className="font-medium">
            Need B2B Pricing?
          </p>

          <p className="text-sm text-muted-foreground">
            Our sales team specializes in bulk orders and can provide competitive
            pricing for wholesalers and distributors.
          </p>

          <p className="text-sm mt-2 text-primary">
            +44 (0)2038 848 555 &nbsp; | &nbsp; sales@site.co.uk
          </p>

        </div>

      </div>


      {/* Footer Info */}

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">

        <span className="flex items-center gap-2">
          <IconCheck size={16} className="text-green-600"/>
          500+ sold earlier
        </span>

        <span className="flex items-center gap-2">
          <IconTruck size={16}/>
          Fast delivery
        </span>

        <span className="flex items-center gap-2">
          <IconShieldCheck size={16}/>
          2 Year warranty
        </span>

      </div>

    </div>
  )
}