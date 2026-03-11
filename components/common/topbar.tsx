"use client"

import React from "react"
import { IconPhone, IconMail, IconMapPin } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

const Topbar = () => {
  return (
    <div className="w-full bg-[#0b1d39] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-8 py-2 flex items-center justify-between flex-wrap">

        {/* Left */}
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-sm">

          <div className="flex items-center gap-2">
            <IconPhone className="w-4 h-4 text-orange-400" />
            <span>+44 (0)20 8543 3131</span>
          </div>

          <div className="flex items-center gap-2">
            <IconMail className="w-4 h-4 text-orange-400" />
            <span>sales@tuk.co.uk</span>
          </div>

          <div className="flex items-center gap-2">
            <IconMapPin className="w-4 h-4 text-orange-400" />
            <span>Wimbledon, London, UK</span>
          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-3 mt-2 md:mt-0">

          <span className="hidden md:block text-orange-300 text-sm">
            B2B Trade Only — Authorised Distributors Welcome
          </span>

          <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm">
            Free Product Guide
          </Button>

        </div>

      </div>
    </div>
  )
}

export default Topbar