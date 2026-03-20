"use client"

import { IconArrowRight, IconChevronRight } from "@tabler/icons-react"
import Image from "next/image"

const distributors = [
  "/image/img1.png",
  "/image/img1.png",
  "/image/img1.png",
  "/image/img1.png",
  "/image/img1.png",
  "/image/img1.png",
]

const OurDistribution = () => {
  return (
    <section className="w-full bg-white font-poppins">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 xl:px-8 py-8">

        {/* heading with lines */}
        <div className="flex items-center justify-center gap-4">
         <div className="flex-1 border-t-2 border-[#FB923C] max-w-20" />

          <p className="text-[#FB923C] uppercase tracking-widest text-sm font-semibold">
            Authorised Distributors
          </p>

         <div className="flex-1 border-t-2 border-orange-500 max-w-20" />
        </div>

        {/* main heading */}
        <h2 className="text-center text-3xl font-extrabold text-black mt-4">
          Our Distribution Network
        </h2>

        {/* subtitle */}
        <p className="text-center text-gray-500 mt-2">
          TUK products are available through our network of authorised trade distributors
        </p>

        {/* images grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-6 mt-8">
          {distributors.map((img, index) => (
            <div
              key={index}
              className="bg-[#F9FAFB]  rounded-xl p-4 flex items-center justify-center"
            >
              <div className="relative w-full h-16">
                <Image
                  src={img}
                  alt="distributor"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* link */}
       <div className="text-center mt-10">
  <a className="text-[#1E3A8A] font-semibold inline-flex items-center gap-2">
    Become an Authorised Distributor
    <IconChevronRight className="w-4 h-4" />
  </a>
</div>
      </div>
    </section>
  )
}

export default OurDistribution