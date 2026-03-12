"use client"

import React from "react"
import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconShieldCheck
} from "@tabler/icons-react"

const Cards = () => {

  const items = [
    {
      icon: IconMapPin,
      title: "Head Office",
      line1: "TUK Ltd, Wimbledon",
      line2: "London, SW19, UK"
    },
    {
      icon: IconPhone,
      title: "Sales Enquiries",
      line1: "+44 (0)20 8543 3131",
      line2: "Mon–Fri 8:30am–5:30pm"
    },
    {
      icon: IconMail,
      title: "Email",
      line1: "sales@tuk.co.uk",
      line2: "technical@tuk.co.uk"
    },
    {
      icon: IconShieldCheck,
      title: "Certifications",
      line1: "ISO 9001:2015",
      line2: "UKCA & CE Marked"
    }
  ]

  return (

    /* OUTER WHITE SPACE */
    <section className="w-full bg-white py-6">

      {/* GRAY BAR */}
      <div className="w-full bg-gray-100">

        {/* CONTENT WIDTH */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 xl:px-8 py-6">

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">

            {items.map((item, index) => {

              const Icon = item.icon

              return (
                <div key={index} className="flex items-center gap-3">

                  <div className="bg-[#1E3A8A] text-[#FB923C] rounded-xs p-2 flex items-center justify-center">
                    <Icon size={18} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-gray-900">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-600">
                      {item.line1}
                    </p>

                    <p className="text-xs text-gray-500">
                      {item.line2}
                    </p>
                  </div>

                </div>
              )
            })}

          </div>

        </div>

      </div>

    </section>
  )
}

export default Cards