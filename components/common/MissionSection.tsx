"use client"

import Image from "next/image"

const MissionSection = () => {
  return (
    <section className="w-full bg-white py-12">
      <div className="mx-auto w-full max-w-6xl px-4 grid gap-10 md:grid-cols-2 items-center">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A]">
            Our Mission
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Our mission is to deliver reliable passive data and multimedia
            connectivity systems through a continuously evolving product range.
            We focus on quality, innovation, and dependable performance while
            providing high-value solutions and exceptional service that support
            our customers’ communication infrastructure and long-term success.
          </p>
        </div>

        {/* RIGHT IMAGES */}
        <div className="relative flex justify-center md:justify-end">
          
          {/* BIG IMAGE */}
          <div className="overflow-hidden rounded-2xl shadow-lg 
          w-3/5 sm:w-1/2 md:w-full md:max-w-xs 
          ml-14 sm:ml-20 md:ml-0">
            <Image
              src="/image/about1.png"
              alt="mission"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>

          {/* SMALL IMAGE */}
          <div className="overflow-hidden rounded-2xl shadow-lg absolute top-1/2 -translate-y-1/2 left-4 md:left-6 w-1/2 sm:w-2/5 md:w-1/2">
            <Image
              src="/image/about.png"
              alt="mission"
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default MissionSection