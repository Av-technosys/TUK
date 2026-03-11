"use client"

import React from 'react'
import { IconPhone, IconMail, IconMapPin } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'

const Topbar = () => {
  return (
    <div className="bg-[#0A1632] text-white text-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-1 px-4">
        <div className="flex space-x-4">
          <div className="flex items-center space-x-1">
            <IconPhone size={16} className="text-[#F97316]" />
            <span>+44 (0)20 8543 3131</span>
          </div>
          <div className="flex items-center space-x-1">
            <IconMail size={16} className="text-[#F97316]" />
            <span>sales@tuk.co.uk</span>
          </div>
          <div className="flex items-center space-x-1">
            <IconMapPin size={16} className="text-[#F97316]" />
            <span>Wimbledon, London, UK</span>
          </div>
        </div>
        <Button variant="outline" size="xs">
          Free Product Guide
        </Button>
      </div>
    </div>
  )
}

export default Topbar
