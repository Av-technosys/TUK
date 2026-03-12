"use client"

import Image from "next/image"

const ProductGuide = () => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 xl:px-8 py-10">

        <div className="w-full">
          <Image
            src="/image/Product-Guide.png"
            alt="Product Guide"
            width={1200}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

      </div>
    </section>
  )
}

export default ProductGuide