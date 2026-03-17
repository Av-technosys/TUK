"use client"

import React from "react"
import { IconPhone, IconMail, IconMapPin } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

const Topbar = () => {
  return (
    <div className="w-full bg-[#0b1d39] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-8 py-1 flex items-center justify-between flex-wrap">

        {/* Left */}
        <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-3 text-xs">

          <div className="flex items-center gap-1">
            <IconPhone className="w-3.5 h-3.5 text-[#FB923C]" />
            <span>+44 (0)20 8543 3131</span>
          </div>

          <div className="flex items-center gap-1">
            <IconMail className="w-3.5 h-3.5 text-[#FB923C]" />
            <span>sales@tuk.co.uk</span>
          </div>

          <div className="flex items-center gap-1">
            <IconMapPin className="w-3.5 h-3.5 text-[#FB923C]" />
            <span>Wimbledon, London, UK</span>
          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-2 mt-1 md:mt-0">

          <span className="hidden md:block text-[#FB923C] text-xs">
            B2B Trade Only — Authorised Distributors Welcome
          </span>

          <Button className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] px-2 py-1 h-auto">
            Free Product Guide
          </Button>

        </div>

      </div>
    </div>
  )
}

export default Topbar