"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  IconChevronLeft,
  IconChevronRight,
  IconMaximize,
} from "@tabler/icons-react"

const images = [
  "/image/product.png",
  "/image/product.png",
  "/image/product.png",
  "/image/product.png",
]

export default function ProductGallery() {
  const [index, setIndex] = useState(0)
  const [zoomStyle, setZoomStyle] = useState({})
  const [zoom, setZoom] = useState(false)

  const prev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const next = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect()

    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    })
  }

  return (
    <div className="flex flex-col gap-4">

      {/* MAIN IMAGE WRAPPER */}
      <div className="relative px-6 md:px-10">

        {/* IMAGE BOX */}
        <div
          className="relative overflow-hidden rounded-2xl"
          onMouseMove={handleMove}
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => {
            setZoom(false)
            setZoomStyle({ transform: "scale(1)" })
          }}
        >
        <Image
  src={images[index]}
  alt="product"
  width={800}
  height={600}
  className="w-full h-auto object-cover rounded-2xl transition duration-300 cursor-pointer"
  style={zoom ? zoomStyle : {}}
/>

          {/* Hover label */}
          <div className="absolute top-4 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-lg flex items-center gap-2">
            <IconMaximize size={16} />
            Hover to magnify
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
            {index + 1} / {images.length}
          </div>

          {/* Fullscreen Icon */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-4 right-4 rounded-full"
          >
            <IconMaximize size={18} />
          </Button>
        </div>

        {/* LEFT BUTTON (outside image) */}
        <Button
          variant="secondary"
          size="icon"
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
        >
          <IconChevronLeft size={18} />
        </Button>

        {/* RIGHT BUTTON (outside image) */}
        <Button
          variant="secondary"
          size="icon"
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
        >
          <IconChevronRight size={18} />
        </Button>

      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-4 overflow-x-auto">
        {images.map((img, i) => (
          <Card
            key={i}
            onClick={() => setIndex(i)}
            className={`cursor-pointer overflow-hidden rounded-xl 
            ${i === index ? "ring-2 " : ""}`}
          >
            <Image
              src={img}
              alt="thumb"
              width={120}
              height={80}
              className="w-full h-auto object-cover"
            />
          </Card>
        ))}
      </div>
    </div>
  )
}