"use client"

import Image from "next/image"
import { IconHeart, IconArrowUpRight } from "@tabler/icons-react"

const products = [
  {
    badge: "NEW",
    title: "SPEEDY Cat6a Shielded",
    desc: "High-performance shielded connector for data centers and EMI-heavy environments.",
    image: "/image/arival1.png",
  },
  {
    badge: "",
    title: "Professional Kit Pro",
    desc: "Complete toolset for field technicians, including crimpers, testers, and cutters.",
    image: "/image/arival3.png",
  },
  {
    badge: "POPULAR",
    title: "24-Port Angled Panel",
    desc: "High-density patch panel with 45-degree angle ports for optimized cable management.",
    image: "/image/arival2.png",
  },
  {
    badge: "",
    title: "Professional Kit Pro",
    desc: "Complete toolset for field technicians, including crimpers, testers, and cutters.",
    image: "/image/arival3.png",
  },
]

const RelatedProducts = () => {
  return (
    <section className="w-full font-poppins bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 py-12 space-y-10">

        {/* Heading */}
        <div>
          <h2 className="text-2xl xl:text-3xl font-semibold font-inter text-foreground">
            Related Products
          </h2>
        </div>

        {/* Grid */}
       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {products.map((item, index) => (
            <div
              key={index}
              className="bg-background border rounded-xl overflow-hidden hover:shadow-md transition"
            >

              {/* Image */}
              <div className="relative w-full h-48">
                {item.badge && (
                  <span className="absolute top-3 left-3 bg-[#0300A7] text-white text-xs px-3 py-1 rounded-full z-10">
                    {item.badge}
                  </span>
                )}

                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <h3 className="text-base xl:text-lg font-semibold ">
                  {item.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2">
                  <button className="flex items-center gap-1 text-[#0300A7] font-semibold text-sm hover:underline">
                    View Specs
                    <IconArrowUpRight size={16} />
                  </button>

                  <button className="border rounded-full p-2 hover:bg-muted transition text-[#0300A7]">
                    <IconHeart size={18} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default RelatedProducts