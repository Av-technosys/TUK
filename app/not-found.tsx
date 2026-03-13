"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  IconSearch,
  IconHome,
  IconBox,
  IconHeadset
} from "@tabler/icons-react"

import Header from "@/components/common/header"
import Footer from "@/components/common/footer"


const Page = () => {
  return (
    <>
      <Header />

      <section className="w-full min-h-screen bg-muted flex items-center justify-center px-4 sm:px-6 xl:px-8">

        <div className="w-full max-w-xl text-center space-y-8">

          {/* 404 IMAGE */}
          <div className="w-full flex justify-center">
            <div className="relative w-full max-w-md aspect-video overflow-hidden rounded-xl">
              <Image
                src="/image/404.png"
                alt="404"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* TITLE */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">
              Page Not Found
            </h1>

            <p className="text-muted-foreground max-w-lg mx-auto">
              We couldn't find the resource you're looking for. It might have been
              moved, renamed, or is currently undergoing maintenance.
            </p>
          </div>

        {/* SEARCH BAR */}
<div className="w-full flex justify-center">
  <div className="w-full max-w-lg bg-background border shadow-sm rounded-full flex items-center overflow-hidden py-1 pr-2">

    {/* ICON */}
    <div className="px-4 text-muted-foreground">
      <IconSearch className="size-5" />
    </div>

    {/* INPUT */}
    <Input
      placeholder="Search for tools, parts, or manuals..."
      className="border-none shadow-none focus-visible:ring-0 flex-1 h-10 text-sm"
    />

    {/* BUTTON */}
    <Button className="rounded-full px-5 h-10 bg-[#0300A7]  text-white">
      Search
    </Button>

  </div>
</div>

         {/* ACTION BUTTONS */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">

  <Link href="/" className="w-full">
    <Button
      variant="outline"
      className="w-full flex items-center gap-2 justify-center h-12"
    >
      <IconHome className="size-4 text-[#0300A7]" />
      Home Page
    </Button>
  </Link>

  <Link href="/products" className="w-full">
    <Button
      variant="outline"
      className="w-full flex items-center gap-2 justify-center h-12"
    >
      <IconBox className="size-4 text-[#0300A7]" />
      Products
    </Button>
  </Link>

  <Link href="/support" className="w-full">
    <Button
      variant="outline"
      className="w-full flex items-center gap-2 justify-center h-12"
    >
      <IconHeadset className="size-4 text-[#0300A7]" />
      Support
    </Button>
  </Link>

</div>

        </div>

      </section>

      <Footer />
    </>
  )
}

export default Page

