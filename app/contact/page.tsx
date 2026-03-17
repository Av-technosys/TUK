"use client"

import React from "react"
import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconSend
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import Footer from "@/components/common/footer"
import Header from "@/components/common/header"

const Page = () => {
  return (<>
  <Header/>
    <section className="w-full bg-gray-100">

      {/* HEADER */}
      <div
  className="w-full text-white py-16"
  style={{
    background: "linear-gradient(to right, #141D3D, #364FA3)"
  }}
>
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-sm opacity-90">
            Get in touch with our expert team for voice and data cabling solutions,
            technical support, or bespoke requirements.
          </p>
        </div>
      </div>

      {/* CONTACT SECTION */}
      <div className="max-w-5xl mx-auto px-6 py-16 grid xl:grid-cols-12 gap-12">

        {/* LEFT SIDE */}
        <div className="space-y-8 xl:col-span-6">

          <h2 className="text-xl font-semibold">Get In Touch</h2>

          {/* ADDRESS */}
          <div className="flex gap-4">
            <IconMapPin className="text-[#1E3A8A]" />
            <div className="text-sm text-gray-700">
              <p className="font-semibold">Our Address</p>
              <p>Your business address here</p>
            </div>
          </div>

          {/* PHONE */}
          <div className="flex gap-4">
            <IconPhone className="text-[#1E3A8A]" />
            <div className="text-sm text-gray-700">
              <p className="font-semibold">Phone</p>
              <p>+91 000000000</p>
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex gap-4">
            <IconMail className="text-[#1E3A8A]" />
            <div className="text-sm text-gray-700">
              <p className="font-semibold">Email</p>
              <p>support@email.com</p>
            </div>
          </div>

          {/* MAP */}
          <div className="w-full h-64 rounded-xl overflow-hidden shadow">
            <iframe
              src="https://maps.google.com/maps?q=26.906008,75.748697&z=15&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* ✅ UPDATED QUOTE CARD */}
          <div className="bg-gray-100 rounded-2xl p-6 shadow-sm">
            
            <h3 className="font-semibold text-gray-900 mb-2">
              Need a fast quote?
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Click below to jump to our quick quote request form.
            </p>

            <Button className="w-full bg-[#1E3A8A] hover:bg-blue-900 rounded-full py-6 text-sm font-semibold tracking-wide">
              REQUEST A QUOTE
            </Button>

          </div>

        </div>

        {/* RIGHT SIDE FORM */}
<div className="bg-white p-8 rounded-xl shadow space-y-6 xl:col-span-6 h-fit">

          <h2 className="text-xl font-semibold">
            Send us a message
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-lg px-4 py-3 text-sm w-full"
            />

            <input
              type="text"
              placeholder="Company"
              className="border rounded-lg px-4 py-3 text-sm w-full"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="email"
              placeholder="Email Address"
              className="border rounded-lg px-4 py-3 text-sm w-full"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="border rounded-lg px-4 py-3 text-sm w-full"
            />

          </div>

          <input
            type="text"
            placeholder="Subject"
            className="border rounded-lg px-4 py-3 text-sm w-full"
          />

          <textarea
            placeholder="Message"
            className="border rounded-lg px-4 py-3 text-sm w-full h-32"
          ></textarea>

          <Button className="bg-[#1E3A8A] hover:bg-blue-900 w-full flex items-center justify-center gap-2">
            <IconSend size={18} />
            SEND MESSAGE
          </Button>

        </div>

      </div>

    </section>
    <Footer/>
  </>)
}

export default Page