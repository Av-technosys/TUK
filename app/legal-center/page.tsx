"use client"

import Header from "@/components/common/header"
import Footer from "@/components/common/footer"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import {
  IconFileText,
  IconShieldLock,
  IconCookie,
  IconRecycle,
  IconMail,
  IconInfoCircle,
  IconPhone,
  IconAdjustments,
  IconBulb,
  IconBolt,
  IconRouter
} from "@tabler/icons-react"

const page = () => {
  return (
    <>
      <Header />

      <section className="w-full bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-10">

          <div className="grid gap-8 lg:grid-cols-4">

           {/* LEFT SIDEBAR */}
<div className="lg:col-span-1">

  <div className="space-y-8">

    {/* TITLE */}
    <h2 className="text-xs font-semibold tracking-widest text-muted-foreground">
      LEGAL CENTER
    </h2>

    {/* MENU */}
    <div className="space-y-2">

      {/* ACTIVE */}
      <div className="flex items-center gap-3 rounded-lg bg-indigo-100 text-[#0300A7] px-4 py-3 font-medium">
        <IconFileText size={20} />
        <span>Terms & Conditions</span>
      </div>

      <div className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground cursor-pointer">
        <IconShieldLock size={20} />
        <span>Privacy Policy</span>
      </div>

      <div className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground cursor-pointer">
        <IconCookie size={20} />
        <span>Cookie Policy</span>
      </div>

      <div className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground cursor-pointer">
        <IconRecycle size={20} />
        <span>WEEE Compliance</span>
      </div>

      <div className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground cursor-pointer">
        <IconMail size={20} />
        <span>Contact Legal</span>
      </div>

    </div>

    {/* LAST UPDATED */}
 <Card className="max-w-xs rounded-xl border border-slate-200 bg-[#f1f5f9]">
  <CardContent className="py-5">
    <p className="text-sm text-slate-500">
      Last updated
    </p>

    <p className="text-lg font-semibold text-slate-700 mt-1">
      October 14, 2023
    </p>
  </CardContent>
</Card>

  </div>

</div>
{/* RIGHT CONTENT */}
<div className="lg:col-span-3 space-y-10">

  {/* TITLE */}
  <div>
    <h1 className="text-xl font-semibold">
      WEEE Compliance
    </h1>

    <p className="text-sm text-muted-foreground mt-2">
      Waste Electrical and Electronic Equipment (WEEE) regulatory information
      and recycling procedures for TUK Ltd business partners.
    </p>
  </div>


  {/* Regulatory Context */}
  <Card className="border bg-muted/30">
    <CardContent className="py-6 space-y-3">

      <div className="flex items-center gap-2 font-semibold text-sm">
        <IconInfoCircle size={18} className="text-[#0300A7]"/>
        Regulatory Context
      </div>

      <p className="text-sm text-muted-foreground">
        TUK Ltd is committed to meeting its responsibilities under the UK Waste
        Electrical and Electronic Equipment (WEEE) Regulations 2013. These
        regulations aim to reduce the amount of WEEE going to landfill and
        encourage reuse and recycling.
      </p>

      <p className="text-sm text-muted-foreground">
        As a producer of over 1,500 appliances, we provide mechanisms for the
        environmentally sound disposal of end-of-life products purchased from
        our organization.
      </p>

    </CardContent>
  </Card>


  {/* Producer Number */}
  <div>
    <h3 className="font-semibold text-sm mb-2">
      Producer Registration Number
    </h3>

    <p className="text-sm text-muted-foreground">
      TUK Ltd is registered with the Environment Agency under producer number:
      <span className="text-[#0300A7] font-medium ml-1">
        WEE/ABC123XYZ
      </span>
    </p>
  </div>


  {/* Disposal */}
  <div className="space-y-3">

    <h3 className="font-semibold text-sm">
      Disposal and Recycling Process
    </h3>

    <p className="text-sm text-muted-foreground">
      The “crossed-out wheeled bin” symbol on our products or packaging
      indicates that the product must not be disposed of with other commercial
      waste. Instead, it is your responsibility to dispose of your waste
      equipment by handing it over to a designated collection point for the
      recycling of waste electrical and electronic equipment.
    </p>


    {/* INFO BOX */}
  {/* INFO BOX */}
<div className="flex gap-4 rounded-lg bg-[#eef0f6] p-5">

  {/* LEFT BLUE LINE */}
  <div className="w-1 rounded bg-[#0300A7]"></div>

  <div className="flex gap-3">

    <IconInfoCircle className="text-[#0300A7] mt-1" size={22} />

    <div>
      <p className="font-semibold text-slate-800">
        How to request a collection?
      </p>

      <p className="text-sm text-slate-600 mt-1">
        For all B2B recycling inquiries, please contact our dedicated
        environmental compliance team. We provide free-of-charge take-back
        for equipment sold after 13 August 2005.
      </p>
    </div>

  </div>

</div>

  </div>


{/* CONTACT BOX */}
<div className="rounded-2xl bg-[#0f172a] p-8 text-white">

  <div className="space-y-6">

    <div>
      <h4 className="text-lg font-semibold">
        Direct B2B WEEE Contact
      </h4>

      <p className="text-slate-300 mt-2 text-sm max-w-2xl">
        If you have TUK Ltd. products that have reached the end of their lifecycle,
        please contact us for disposal instructions:
      </p>
    </div>

    <div className="flex flex-wrap gap-4">

      {/* EMAIL BUTTON */}
      <Button className="bg-[#0300A7] hover:bg-[#0300A7] text-white flex items-center gap-2 px-6 py-3">
        <IconMail size={18} />
        b2b-weee@tuk.co.uk
      </Button>

      {/* PHONE BUTTON */}
      <Button
  className="flex items-center gap-3 bg-transparent border border-slate-600 text-slate-200 hover:bg-slate-800 rounded-xl px-6 py-3"
>
  <IconPhone size={20} className="text-slate-400" />
  +44 (0) 20 8123 4567
</Button>

    </div>

  </div>

</div>


  {/* CATEGORIES */}
 <div className="grid sm:grid-cols-2 gap-4">

  <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-5 py-4 bg-white">
    <IconRouter size={20} className="text-slate-500"/>
    <span className="text-sm font-medium text-slate-700">
      IT & Telecommunications
    </span>
  </div>

  <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-5 py-4 bg-white">
    <IconAdjustments size={20} className="text-slate-500"/>
    <span className="text-sm font-medium text-slate-700">
      Monitoring & Control Tools
    </span>
  </div>

  <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-5 py-4 bg-white">
    <IconBulb size={20} className="text-slate-500"/>
    <span className="text-sm font-medium text-slate-700">
      Lighting Equipment
    </span>
  </div>

  <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-5 py-4 bg-white">
    <IconBolt size={20} className="text-slate-500"/>
    <span className="text-sm font-medium text-slate-700">
      Electrical Tools
    </span>
  </div>

</div>
</div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  )
}

export default page