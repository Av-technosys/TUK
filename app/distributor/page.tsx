"use client"

import Image from "next/image"
import Header from "@/components/common/header"
import Footer from "@/components/common/footer"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import {
  IconExternalLink,
  IconMapPin,
  IconShieldCheck,
  IconChevronDown
} from "@tabler/icons-react"

const distributors = [
  {
    name: "CPC Farnell",
    desc: "Voice & Data Cabling Solutions",
    logo: "/distributors/cpc.png",
    region: "£ UK"
  },
  {
    name: "Anixter",
    desc: "Voice & Data Cabling Solutions",
    logo: "/distributors/anixter.png",
    region: "$ International"
  },
  {
    name: "Euronetwork",
    desc: "Voice & Data Cabling Solutions",
    logo: "/distributors/euronet.png",
    region: "£ UK"
  },
  {
    name: "InfraTEL",
    desc: "Voice & Data Cabling Solutions",
    logo: "/distributors/infratel.png",
    region: "€ Europe"
  },
  {
    name: "CPC Farnell",
    desc: "Voice & Data Cabling Solutions",
    logo: "/distributors/cpc.png",
    region: "£ UK"
  },
  {
    name: "Anixter",
    desc: "Voice & Data Cabling Solutions",
    logo: "/distributors/anixter.png",
    region: "$ International"
  },
  {
    name: "Euronetwork",
    desc: "Voice & Data Cabling Solutions",
    logo: "/distributors/euronet.png",
    region: "£ UK"
  },
  {
    name: "InfraTEL",
    desc: "Voice & Data Cabling Solutions",
    logo: "/distributors/infratel.png",
    region: "€ Europe"
  }
]

const page = () => {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="bg-[#334b9b] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">

          <h1 className="text-3xl md:text-4xl xl:text-5xl font-semibold">
            Authorised Distributors
          </h1>

          <p className="mt-4 text-sm md:text-base text-white/80 max-w-2xl mx-auto">
            TUK Ltd products are available worldwide through our trusted network
            of specialized partners. Find a distributor in your region below.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-6">

            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm">
              <IconShieldCheck size={18} />
              ISO 9001:2015 Certified
            </div>

            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm">
              <IconMapPin size={18} />
              Based in London, UK
            </div>

          </div>

        </div>
      </section>


      {/* Sort Section */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-end">

          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">Sort by:</span>

            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              Most Recent
              <IconChevronDown size={16} />
            </Button>

          </div>

        </div>
      </section>


     
     {/* Cards */}
<section className="bg-gray-100 pb-16">
  <div className="max-w-7xl mx-auto px-4">

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {distributors.map((item, index) => (
        <Card
          key={index}
          className="relative bg-white border rounded-xl hover:shadow-md transition"
        >
          <CardContent className="flex flex-col items-center text-center gap-4 py-10 px-6">

            {/* Region Badge */}
            <span className="absolute right-4 top-4 text-xs bg-gray-100 text-[#334b9b] px-3 py-1 rounded-full">
              {item.region}
            </span>

            {/* Logo */}
            <div className="flex items-center justify-center">
              <Image
                src={item.logo}
                alt={item.name}
                width={140}
                height={80}
                className="object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900">
              {item.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-500">
              {item.desc}
            </p>

            {/* Button */}
            <Button
              variant="secondary"
              className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200"
            >
              Visit Store
              <IconExternalLink size={16} />
            </Button>

          </CardContent>
        </Card>
      ))}

    </div>

  </div>
</section>

      <Footer />
    </>
  )
}

export default page