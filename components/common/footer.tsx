"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"

import {
IconBrandLinkedin,
IconBrandTwitter,
IconShieldCheck,
IconCheck,
IconCertificate,
IconMapPin
} from "@tabler/icons-react"

const Footer = () => {
return (

<footer className="bg-[#16233a] text-white">

<div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-16 py-12">

<div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">

{/* company info */}
<div className="space-y-4">

<div className="flex items-center gap-3">
<div className="bg-white rounded-full p-2">
<Link href="/">
  <Image
    src="/footerlogo.png"
    alt="logo"
    width={20}
    height={20}
    className="cursor-pointer"
  />
</Link>
</div>

<div>
<Link href="/"><p className="font-semibold text-lg">TUK Ltd</p></Link>
<p className="text-orange-400 text-sm">
Since 1984 · Wimbledon, London
</p>
</div>
</div>

<p className="text-gray-300 text-sm leading-relaxed">
Britain's leading B2B manufacturer and supplier of voice and data
copper cabling solutions. ISO 9001 certified. Trade only.
</p>

<div className="flex gap-3 pt-2">


<Button
  variant="ghost"
  size="icon"
  className="bg-[#23345a] hover:bg-[#2e4472] rounded-md"
>
  <div className="bg-white text-[#2e4ea1] p-1 rounded-sm flex items-center justify-center">
    <IconBrandLinkedin size={16} />
  </div>
</Button>

<Button
  variant="ghost"
  size="icon"
  className="bg-[#23345a] hover:bg-[#2e4472] rounded-md"
>
  <div className="bg-white text-[#2e4ea1] p-1 rounded-sm flex items-center justify-center">
    <IconBrandTwitter size={16} />
  </div>
</Button>

</div>

</div>


{/* product categories */}
<div className="space-y-3">

<h3 className="font-semibold text-lg">
Product Categories
</h3>

<div className="flex flex-col space-y-2 text-gray-300 text-sm">

<Link href="#">RJ45 Connectors</Link>
<Link href="#">Patch Panels</Link>
<Link href="#">Data Cable</Link>
<Link href="#">Voice Cable</Link>
<Link href="#">Keystone Jacks</Link>
<Link href="#">Patch Leads</Link>
<Link href="#">Cable Management</Link>

</div>

</div>


{/* company */}
<div className="space-y-3">

<h3 className="font-semibold text-lg">
Company
</h3>

<div className="flex flex-col space-y-2 text-gray-300 text-sm">

<Link href="/about">About TUK</Link>
<Link href="#">Free Product Guide</Link>
<Link href="/distributor">Become a Distributor</Link>
<Link href="/contact">Contact Us</Link>

</div>

</div>


{/* quality */}
<div className="space-y-3">

<h3 className="font-semibold text-lg">
Quality & Compliance
</h3>

<div className="space-y-3">

<div className="flex items-center gap-3 bg-[#23345a] px-4 py-3 rounded-lg">
<IconShieldCheck size={18}/>
<p className="text-sm">ISO 9001:2015 Certified</p>
</div>

<div className="flex items-center gap-3 bg-[#23345a] px-4 py-3 rounded-lg">
<IconCheck size={18}/>
<p className="text-sm">UKCA & CE Marked</p>
</div>

<div className="flex items-center gap-3 bg-[#23345a] px-4 py-3 rounded-lg">
<IconCertificate size={18}/>
<p className="text-sm">RoHS Compliant</p>
</div>

<div className="flex items-center gap-3 bg-[#23345a] px-4 py-3 rounded-lg">
<IconMapPin size={18}/>
<p className="text-sm">Made in Britain</p>
</div>

</div>

</div>

</div>


{/* bottom bar */}

<div className="border-t border-[#1E3A8A] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">

<p>
© 2026 TUK Ltd. All rights reserved. Registered in England & Wales.
B2B Trade Only
</p>

<div className="flex items-center gap-6">
<Link href="/privacy-policy">Privacy Policy</Link>
<Link href="/terms-conditions">Terms & Conditions</Link>
<Link href="/cookie-policy">Cookie Policy</Link>
</div>

</div>

</div>

</footer>

)
}

export default Footer