"use client"

import React from "react"
import Header from "@/components/common/header"
import Footer from "@/components/common/footer"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import {
  IconSearch,
  IconTruck,
  IconPackage,
  IconMail,
  IconPhone,
  IconShoppingCart,
  IconSettings,
  IconRefresh
} from "@tabler/icons-react"

const page = () => {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="w-full bg-[#19244a] text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center text-center">

          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Help & FAQ Center
          </h1>

          <p className="text-gray-300 max-w-2xl mb-10">
            Find answers to common questions about our connectivity solutions,
            ordering process, and technical support.
          </p>

          <div className="w-full max-w-xl flex items-center bg-white rounded-full p-2 shadow-lg">
            <Input
              placeholder="Search for answers (e.g. RJ45 wiring, lead times...)"
              className="border-none focus-visible:ring-0 text-gray-700"
            />

            <Button
              size="icon"
              className="rounded-full bg-blue-700 hover:bg-blue-800"
            >
              <IconSearch size={20} />
            </Button>
          </div>

        </div>
      </section>

      {/* CATEGORY CARDS */}
      <section className="w-full bg-gray-100 py-12">
        <div className="max-w-5xl mx-auto px-4">

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">

            <Card className="hover:shadow-md transition cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                <IconPackage size={26} className="text-blue-700" />
                <p className="font-medium">Products</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                <IconShoppingCart size={26} className="text-blue-700" />
                <p className="font-medium">Ordering</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                <IconSettings size={26} className="text-blue-700" />
                <p className="font-medium">Technical</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                <IconTruck size={26} className="text-blue-700" />
                <p className="font-medium">Delivery</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                <IconRefresh size={26} className="text-blue-700" />
                <p className="font-medium">Returns</p>
              </CardContent>
            </Card>

          </div>

        </div>
      </section>



      {/* DELIVERY & RETURNS */}
      <section className="w-full bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">

          <h2 className="text-2xl font-semibold mb-10 flex items-center gap-2">
            <IconTruck size={22} />
            Delivery & Returns
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3 font-semibold">
                  <IconTruck size={18} />
                  Delivery Times
                </div>

                <p className="text-gray-600 text-sm">
                  Orders for in-stock items placed before 2:00 PM GMT are
                  typically dispatched the same day via next-day courier
                  for UK mainland addresses.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3 font-semibold">
                  <IconPackage size={18} />
                  Returns Policy
                </div>

                <p className="text-gray-600 text-sm">
                  Faulty items can be returned within 30 days of purchase.
                  For non-faulty returns, a 15% restocking fee may apply.
                  All returns must have a valid RMA number.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* STILL HAVE QUESTIONS */}
      <section className="w-full bg-gray-200 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">

          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Still have questions?
          </h2>

          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Can't find the answer you're looking for? Our technical support
            team is ready to help you with your specific requirements.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">

            <Button className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800">
              <IconMail size={18} />
              Contact Support
            </Button>

            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <IconPhone size={18} />
              +44 (0) 20 8946 6688
            </Button>

          </div>

        </div>
      </section>

      <Footer />
    </>
  )
}

export default page