"use client"

import React from "react"
import Header from "@/components/common/header"
import Footer from "@/components/common/footer"
import { IconShieldCheck, IconMapPin, IconLeaf, IconHeadset, IconLink, IconBulb, IconPackage, IconDownload, IconRecycle } from "@tabler/icons-react"
import Image from "next/image"
import MissionSection from "@/components/common/MissionSection"

const page = () => {
  return (
    <>
      <Header />

      {/* HERO SECTION */}
      <section
  className="w-full text-white"
  style={{
    background: "linear-gradient(to right, #141D3D, #364FA3)"
  }}
>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 xl:px-10 py-12 sm:py-16 xl:py-20 text-center">

          <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-semibold">
            Cabling Solutions for a Connected World
          </h1>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-blue-100 max-w-3xl mx-auto">
            A legacy of British manufacturing excellence in voice and data
            infrastructure since 1984.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-6">

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              <IconShieldCheck className="w-5 h-5" />
              ISO 9001:2015 Certified
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              <IconMapPin className="w-5 h-5" />
              Based in London, UK
            </div>

          </div>

        </div>
      </section>

      {/* HERITAGE SECTION */}
      <section className="w-full bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 xl:px-10 py-12 sm:py-16 xl:py-20">

          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* LEFT TEXT */}
            <div>
              <p className="text-sm font-semibold text-[#0300A7] tracking-widest uppercase">
                Established 1984
              </p>

              <h2 className="mt-3 text-2xl sm:text-3xl xl:text-4xl font-semibold text-gray-900">
                Our Heritage of Innovation
              </h2>

              <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                Originally founded in 1984, TUK Ltd is based in South West London
                and has manufacturing facilities both in the UK and Far East.
                For nearly four decades, we have been at the forefront of the
                cabling industry.
              </p>

              <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                The quality of our products is ensured through ISO 9001
                manufacturing and a two-stage quality assurance procedure,
                making us a trusted partner for telecommunications, data
                centres, and enterprise networking.
              </p>

              <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                Our commitment to excellence has allowed us to grow from a
                small local supplier to an international distributor of
                high-performance RJ45 solutions, multimedia connectors,
                and modular patch panels.
              </p>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative">

              <Image
                src="/image/about.png"
                alt="network"
                width={600}
                height={400}
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />

              {/* EXPERIENCE CARD */}
              <div className="absolute bottom-4 right-4 bg-[#0300A7] text-white px-6 py-4 rounded-lg shadow-lg">
                <p className="text-xl font-semibold">40+</p>
                <p className="text-xs uppercase tracking-wide">
                  Years Experience
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


{/* ISO INFO SECTION */}
<section className="w-full bg-gray-100">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 xl:px-10 py-10">

    <div className="grid md:grid-cols-2 gap-8 items-center">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <div className="flex items-center justify-center border-2 border-[#0300A7] rounded-full p-4">
          <IconShieldCheck className="text-[#364FA3]" size={28} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            ISO 9001:2015 Firm
          </h3>

          <p className="text-sm text-gray-500">
            Certification Number: GB1094
          </p>
        </div>

      </div>

      {/* RIGHT */}
      <p className="text-sm text-gray-600 leading-relaxed">
        Our ISO 9001 registration is a testament to our commitment to
        maintaining the highest standards in manufacturing and customer
        service across our entire product range.
      </p>

    </div>

  </div>
</section>

{/* MISSION SECTION */}
<MissionSection/>

{/* CORE VALUES */}
<section className="w-full bg-gray-50">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 xl:px-10 py-12 sm:py-16">

    {/* Heading */}
    <div className="text-center mb-10">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
        OUR CORE VALUES
      </h2>

      <div className="w-16 h-1 bg-[#0300A7] mx-auto mt-3 rounded"></div>
    </div>

    {/* Cards */}
    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">

      {/* Card 1 */}
      <div className="bg-white rounded-xl p-6 shadow-sm text-center">
        <IconShieldCheck className="mx-auto text-[#0300A7]" size={30} />
        <h3 className="mt-4 font-semibold text-gray-900">Quality First</h3>
        <p className="text-sm text-gray-600 mt-2">
          Rigorous two-stage QA testing for every product we manufacture.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-xl p-6 shadow-sm text-center">
        <IconBulb className="mx-auto text-[#0300A7]" size={30} />
        <h3 className="mt-4 font-semibold text-gray-900">Innovation</h3>
        <p className="text-sm text-gray-600 mt-2">
          Developing patented solutions like our SPEEDY RJ45 system.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-xl p-6 shadow-sm text-center">
        <IconLink className="mx-auto text-[#0300A7]" size={30} />
        <h3 className="mt-4 font-semibold text-gray-900">Reliability</h3>
        <p className="text-sm text-gray-600 mt-2">
          Consistent lead times and high stock availability.
        </p>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-xl p-6 shadow-sm text-center">
        <IconLeaf className="mx-auto text-[#0300A7]" size={30} />
        <h3 className="mt-4 font-semibold text-gray-900">Sustainability</h3>
        <p className="text-sm text-gray-600 mt-2">
          WEEE compliance and eco-conscious manufacturing processes.
        </p>
      </div>

      {/* Card 5 */}
      <div className="bg-white rounded-xl p-6 shadow-sm text-center">
        <IconHeadset className="mx-auto text-[#0300A7]" size={30} />
        <h3 className="mt-4 font-semibold text-gray-900">Technical Support</h3>
        <p className="text-sm text-gray-600 mt-2">
          Expert guidance from our London-based engineering team.
        </p>
      </div>

    </div>

  </div>
</section>

{/* WEEE COMPLIANCE */}
<section
  className="w-full text-white"
  style={{
    background: "linear-gradient(to right, #141D3D, #364FA3)"
  }}
>
  <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 xl:px-10 py-12 sm:py-16">

    <div className="grid md:grid-cols-3 gap-8 items-start">

      {/* LEFT CONTENT */}
      <div>
        <div className="flex items-center gap-3">
          <IconRecycle className="text-cyan-400" size={30} />
          <h2 className="text-xl sm:text-2xl font-semibold">
            WEEE Compliance
          </h2>
        </div>

        <p className="mt-4 text-sm text-white leading-relaxed">
          TUK Ltd is fully registered for WEEE (Waste Electrical and Electronic
          Equipment) compliance, ensuring our products are disposed of
          responsibly at the end of their lifecycle.
        </p>

        <a
          href="#"
          className="flex items-center gap-2 mt-4 text-cyan-400 text-sm font-medium"
        >
          Download Policy Document
          <IconDownload size={18} />
        </a>
      </div>

      {/* CARD 1 */}
      <div className="bg-[#1B4C7D] rounded-xl p-6">
        <div className="flex items-center gap-2 text-white">
          <IconLeaf size={22} />
          <h3 className="font-semibold">Environmental Policy</h3>
        </div>

        <p className="text-sm text-white mt-3 leading-relaxed">
          We are committed to minimizing our carbon footprint through localized
          manufacturing and streamlined logistics to reduce transport emissions.
        </p>
      </div>

      {/* CARD 2 */}
      <div className="bg-[#1B4C7D] rounded-xl p-6">
        <div className="flex items-center gap-2 text-white">
          <IconPackage size={22} />
          <h3 className="font-semibold">Sustainable Packaging</h3>
        </div>

        <p className="text-sm text-white mt-3 leading-relaxed">
          Transitioning to 100% recyclable packaging across our flagship
          product lines to eliminate single-use plastics from the supply chain.
        </p>
      </div>

    </div>

  </div>
</section>

{/* PARTNERS SECTION */}
<section className="w-full bg-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 xl:px-10 py-10 sm:py-14">

    {/* Heading */}
    <p className="text-center text-sm tracking-widest font-bold text-black uppercase mb-8">
      Authorised Distributors & Partners
    </p>

    {/* Logos */}
    <div className="flex flex-wrap items-center justify-center gap-10">

      <img
        src="/image/partner2.svg"
        alt="EUROcables"
        className="h-5 object-contain"
      />

       <img
        src="/image/partner.svg"
        alt="EUROcables"
        className="h-3 object-contain"
      />

       <img
        src="/image/partner2.svg"
        alt="EUROcables"
        className="h-5 object-contain"
      />

       <img
        src="/image/partner.svg"
        alt="EUROcables"
        className="h-3 object-contain"
      />

      <img
        src="/image/partner2.svg"
        alt="EUROcables"
        className="h-5 object-contain"
      />

    </div>

  </div>
</section>
      <Footer />
    </>
  )
}

export default page