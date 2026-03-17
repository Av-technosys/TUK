"use client"

import React from "react"
import Header from "@/components/common/header"
import Footer from "@/components/common/footer"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
  <section
  className="w-full text-white"
  style={{
    background: "linear-gradient(to right, #141D3D, #364FA3)"
  }}
>
        <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center text-center">

          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Help & FAQ Center
          </h1>

          <p className="text-gray-300 max-w-2xl mb-10">
            Find answers to common questions about our connectivity solutions,
            ordering process, and technical support.
          </p>

          <div className="w-full max-w-sm md:max-w-md mx-auto flex items-center bg-white rounded-full p-2 shadow-lg">
            <Input
              placeholder="Search for answers (e.g. RJ45 wiring, lead times...)"
              className="border-none focus-visible:ring-0 text-gray-700"
            />

            <Button
              size="icon"
              className="rounded-full bg-[#0300A7] hover:bg-[#0300A7]"
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
                <IconPackage size={26} className="text-[#0300A7]" />
                <p className="font-medium">Products</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                <IconShoppingCart size={26} className="text-[#0300A7]" />
                <p className="font-medium">Ordering</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                <IconSettings size={26} className="text-[#0300A7]" />
                <p className="font-medium">Technical</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                <IconTruck size={26} className="text-[#0300A7]" />
                <p className="font-medium">Delivery</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                <IconRefresh size={26} className="text-[#0300A7]" />
                <p className="font-medium">Returns</p>
              </CardContent>
            </Card>

          </div>

        </div>
      </section>

      {/* FAQ ACCORDION (ADDED HERE) */}
      <section className="w-full bg-gray-50 py-10">
        <div className="mx-auto w-full max-w-5xl px-4">

          {/* Products & Solutions */}
          <div className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
              <span className="h-2 w-2 rounded-sm bg-[#0300A7]"></span>
              Products & Solutions
            </h2>

            <Accordion className="space-y-3">
              <AccordionItem value="item-1" className="rounded-xl border bg-white px-4">
                <AccordionTrigger className="text-left text-sm font-medium">
                  I can’t see what I’m looking for on your website, does that mean you don’t sell it?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600">
                  Most of our products are listed on our website, however, if you cannot find what you are looking for,
                  we may have them available so please contact us via sales@tkc.co.uk or call us.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="rounded-xl border bg-white px-4">
                <AccordionTrigger className="text-left text-sm font-medium">
                  How can I get a quote for your products?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600">
                  You can request a quote by contacting our sales team or filling out the quote form on our website.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Ordering & Accounts */}
          <div className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
              <span className="h-2 w-2 rounded-sm bg-[#0300A7]"></span>
              Ordering & Accounts
            </h2>

            <Accordion  className="space-y-3">
              <AccordionItem value="item-3" className="rounded-xl border bg-white px-4">
                <AccordionTrigger className="text-left text-sm font-medium">
                  What if I want to order a small quantity of your products?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600">
                  We support both small and bulk orders. Contact our team for more details.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="rounded-xl border bg-white px-4">
                <AccordionTrigger className="text-left text-sm font-medium">
                  How can I set up a trade account?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600">
                  You can apply for a trade account by submitting your business details through our registration form.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Technical Support */}
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
              <span className="h-2 w-2 rounded-sm bg-[#0300A7]"></span>
              Technical Support
            </h2>

            <Accordion className="space-y-3">
              <AccordionItem value="item-5" className="rounded-xl border bg-white px-4">
                <AccordionTrigger className="text-left text-sm font-medium">
                  What is the difference between T568A and T568B wiring standards?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600">
                  T568A and T568B are two wiring standards used in networking cables. The difference lies in wire color arrangement.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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

            <Button className="flex items-center gap-2 bg-[#0300A7] hover:bg-[#0300A7]">
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