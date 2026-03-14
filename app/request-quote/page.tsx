"use client"

import Header from "@/components/common/header"
import Footer from "@/components/common/footer"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  IconUser,
  IconBuilding,
  IconMail,
  IconPhone,
  IconCategory,
  IconSend,
} from "@tabler/icons-react"
import Link from "next/link"

export default function Page() {
  return (
    <>
      <Header />

      <section className="w-full bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-10 lg:py-16">

          {/* breadcrumb */}
         <p className="text-sm text-muted-foreground mb-6">
  <Link href="/" className="hover:text-black">
    Home
  </Link>{" "}
  / Request a Quote
</p>

          {/* title */}
          <div className="max-w-xl mb-10">
            <h1 className="text-2xl font-bold lg:text-3xl">
              Request a Wholesale Quote
            </h1>

            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              TUK ltd provides high-quality, professional-grade cabling solutions
              for global trade buyers and distributors. Fill our the form below
              to recieve a custom quotation tailored to your business requirements.
            </p>
          </div>

          {/* form */}
          <div className="bg-background border rounded-xl p-6 lg:p-10">

            {/* Contact Info */}
            <div className="mb-10">
              <h3 className="text-sm text-[#1E3A8A] font-semibold  mb-6">
                CONTACT INFORMATION
              </h3>

             <div className="grid gap-6 md:grid-cols-2">

  {/* Full Name */}
  <div className="space-y-2">
    <label className="text-sm font-medium">Full Name</label>
    <div className="relative">
      <IconUser className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        placeholder="e.g. Robert Smith"
        className="pl-10"
      />
    </div>
  </div>

  {/* Company Name */}
  <div className="space-y-2">
    <label className="text-sm font-medium">Company Name</label>
    <div className="relative">
      <IconBuilding className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        placeholder="Your Registered Business Name"
        className="pl-10"
      />
    </div>
  </div>

  {/* Business Email */}
  <div className="space-y-2">
    <label className="text-sm font-medium">Business Email</label>
    <div className="relative">
      <IconMail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        placeholder="name@company.com"
        className="pl-10"
      />
    </div>
  </div>

  {/* Phone Number */}
  <div className="space-y-2">
    <label className="text-sm font-medium">Phone Number</label>
    <div className="relative">
      <IconPhone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        placeholder="+44 20 1234 5678"
        className="pl-10"
      />
    </div>
  </div>

</div>
            </div>

          {/* Requirement Details */}
<div className="mb-8">
  <h3 className="text-sm font-semibold text-[#1E3A8A] mb-6">
    REQUIREMENTS DETAILS
  </h3>

  <div className="grid gap-6 md:grid-cols-2">

{/* product interest */}
<div className="space-y-2">
  <label className="text-sm font-medium">Products Interest</label>

  <div className="relative">
    <IconCategory className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground z-10" />

    <Select>
      <SelectTrigger className="pl-10 w-full">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="cat6">Cat 6 Cable</SelectItem>
        <SelectItem value="cat7">Cat 7 Cable</SelectItem>
        <SelectItem value="fiber">Fiber Cable</SelectItem>
        <SelectItem value="accessories">Accessories</SelectItem>
      </SelectContent>
    </Select>
  </div>
</div>
    {/* company */}
    <div className="space-y-2">
      <label className="text-sm font-medium">Company Name</label>

      <div className="relative">
        <IconBuilding className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Your Registered Business Name"
          className="pl-10"
        />
      </div>
    </div>

  </div>

  {/* textarea */}
  <div className="mt-6 space-y-2">
    <label className="text-sm font-medium">Business Email</label>

  <Textarea
  placeholder="Please describe any specific technical requirements"
  className="min-h-30"
/>
  </div>

</div>

            {/* privacy + button */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-start gap-3">
                <Checkbox id="policy" />

                <label
                  htmlFor="policy"
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  I agree to TUK ltd's{" "}
                  <span className="text-[#F97316] underline cursor-pointer">
                    Privacy Policy
                  </span>{" "}
                  and understand my data will be used to process this enquiry.
                </label>
              </div>

              <Button className="flex items-center bg-[#1E3A8A] gap-2">
                Submit Enquiry
                <IconSend size={18} />
              </Button>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}