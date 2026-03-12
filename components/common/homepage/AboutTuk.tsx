"use client"

import Image from "next/image"
import { IconCheck } from "@tabler/icons-react"

const AboutTuk = () => {

  const points = [
    "Cat 5e, 6 & 6A connectivity",
    "UK telephone connectivity",
    "US RJ type modular plugs and sockets",
    "Handtools for voice and data cabling systems",
    "19 inch related metalwork",
    "OEM production of related products",
  ]

  const badges = [
    "ISO 9001 Certified",
    "B2B Trade Only",
    "UK Manufactured",
    "Technical Support",
  ]

  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 xl:px-8 py-8">

        <div className="grid xl:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-6">

          <div className="flex items-center gap-3">
 <div className="h-px w-12 bg-[#FB923C]"></div>

  <p className="text-[#FB923C] uppercase tracking-wider text-sm">
    ABOUT TUK LTD
  </p>
</div>

            <h2 className="text-[#0300A7] font-extrabold text-2xl xl:text-3xl">
              TUK SPECIALISES IN
            </h2>

            <ul className="space-y-2 text-gray-700 text-sm">
              {points.map((item, index) => (
                <li key={index} className="flex gap-2 items-start">
                  <span className="text-gray-500">•</span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-gray-700 text-sm font-medium">
              TUK supplies manufacturers, wholesalers and distributors but
              does not cater for retailers or the public.
            </p>

            {/* BADGES */}
            <div className="flex flex-wrap gap-3">
              {badges.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-[#0300A7] text-white px-3 py-1.5 rounded-full text-xs"
                >
                <IconCheck size={16} className="text-[#FB923C]" />
                  {item}
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT IMAGES */}
          <div className="w-full flex justify-center xl:justify-end">

            <div className="flex items-start gap-6 xl:max-w-md">

              {/* IMAGE 1 */}
              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/image/about1.png"
                  alt="about"
                  width={300}
                  height={240}
                  className="object-cover"
                />
              </div>

              {/* IMAGE 2 */}
              <div className="rounded-xl overflow-hidden shadow-lg mt-16">
                <Image
                  src="/image/about2.png"
                  alt="about"
                  width={300}
                  height={260}
                  className="object-cover"
                />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default AboutTuk