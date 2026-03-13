"use client"

import Image from "next/image"
import { useState } from "react"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

const images = [
  "/cable1.jpg",
  "/cable2.jpg",
  "/cable3.jpg",
  "/cable4.jpg",
]

export default function ProductGallery() {
  const [active, setActive] = useState(0)

  const next = () => {
    setActive((prev) => (prev + 1) % images.length)
  }

  const prev = () => {
    setActive((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">

      {/* Main Image */}
      <div className="relative bg-white rounded-xl shadow-sm overflow-hidden">

        <Image
          src={images[active]}
          alt="product"
          width={800}
          height={600}
          className="w-full h-auto object-contain"
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-3 top-1/2 -translate-y-1/2"
          onClick={prev}
        >
          <IconChevronLeft size={18} />
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={next}
        >
          <IconChevronRight size={18} />
        </Button>

      </div>

      {/* Thumbnails */}
      <div className="flex gap-3">

        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`border rounded-lg overflow-hidden ${
              active === i ? "border-primary" : "border-muted"
            }`}
          >
            <Image
              src={img}
              alt="thumb"
              width={120}
              height={100}
              className="object-cover"
            />
          </button>
        ))}

      </div>
    </div>
  )
}