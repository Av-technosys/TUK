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
    badge: "POPULAR",
    title: "24-Port Angled Panel",
    desc: "High-density patch panel with forty five degree angle ports for optimized cable management.",
    image: "/image/arival2.png",
  },
  {
    badge: "",
    title: "Professional Kit Pro",
    desc: "Complete toolset for field technicians, including crimpers, testers, and cutters.",
    image: "/image/arival3.png",
  },
]

const Arrivals = () => {
  return (
    <section className="w-full bg-white font-poppins">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 xl:px-8 py-3 space-y-10">
        
        <div className="text-center">
          <h2 className="text-2xl xl:text-3xl font-bold">
            New Arrivals
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map((item, index) => (
            <div
              key={index}
              className="bg-background border rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              
              <div className="relative w-full h-56">
                {item.badge && (
                  <span className="absolute top-4 left-4 bg-[#0300A7] text-primary-foreground text-xs px-3 py-1 rounded-full z-10">
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

              <div className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>

                <div className="flex items-center justify-between pt-2">
                  
                  <button className="flex items-center gap-1 text-[#0300A7] font-semibold font-poppins text-sm hover:underline">
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

export default Arrivals