"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { IconCheck, IconBrandTwitterFilled, IconBrandLinkedinFilled, IconShieldCheck } from "@tabler/icons-react"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-[#9CA3AF]">
      <div className="max-w-6xl mx-auto  py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* logo & description */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="TUK Ltd" width={120} height={40} />
          </div>
          <p className="text-sm">
            Britain’s leading B2B manufacturer and supplier of voice and data
            copper cabling solutions. ISO 9001 certified. Trade only.
          </p>
          <div className="flex space-x-3">
           <div className="h-10 w-10  bg-[#1E3A8A] items-center justify-center rounded-md flex">
             <Link href="https://linkedin.com" className="text-white" aria-label="LinkedIn">
            <IconBrandLinkedinFilled  size={24} />
          </Link>
           </div>
          <div className="h-10 w-10 bg-[#1E3A8A] items-center justify-center rounded-md flex">
            <Link href="https://twitter.com" className="text-white" aria-label="Twitter">
            <IconBrandTwitterFilled size={24} />
          </Link>
          </div>
          
          </div>
        </div>

        {/* product categories */}
        <div>
          <h3 className="font-semibold mb-2 text-white">Product Categories</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/products/rails-connections" className="hover:text-white">
                Rails Connections
              </Link>
            </li>
            <li>
              <Link href="/products/patch-panels" className="hover:text-white">
                Patch Panels
              </Link>
            </li>
            <li>
              <Link href="/products/data-cable" className="hover:text-white">
                Data Cable
              </Link>
            </li>
            <li>
              <Link href="/products/voice-cable" className="hover:text-white">
                Voice Cable
              </Link>
            </li>
            <li>
              <Link href="/products/keystone-jacks" className="hover:text-white">
                Keystone Jacks
              </Link>
            </li>
            <li>
              <Link href="/products/patch-leads" className="hover:text-white">
                Patch Leads
              </Link>
            </li>
            <li>
              <Link href="/products/cable-management" className="hover:text-white">
                Cable Management
              </Link>
            </li>
          </ul>
        </div>

        {/* company links */}
        <div>
          <h3 className="font-semibold mb-2 text-white">Company</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/about" className="hover:text-white">
                About TUK
              </Link>
            </li>
            <li>
              <Link href="/case-studies" className="hover:text-white">
                Case Studies
              </Link>
            </li>
            <li>
              <Link href="/free-product-guide" className="hover:text-white">
                Free Product Guide
              </Link>
            </li>
            <li>
              <Link href="/technical-support" className="hover:text-white">
                Technical Support
              </Link>
            </li>
            <li>
              <Link href="/become-a-distributor" className="hover:text-white">
                Become a Distributor
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* quality & compliance */}
        <div>
          <h3 className="font-semibold mb-2 text-white">Quality &amp; Compliance</h3>
          <ul className="space-y-2 text-sm">
            <div className="h-10 w-full p-3 rounded-lg bg-[#1E3A8A]"><li className="flex items-center">
              <IconShieldCheck size={16} className="text-[#FB923C] mr-2" />
              ISO 9001:2015 Certified
            </li></div>
            <div className="h-10 w-full p-3 rounded-lg bg-[#1E3A8A]">
                <li className="flex items-center">
              <IconCheck size={16} className="text-[#FB923C] mr-2" />
              UKCA &amp; CE Marked
            </li>
            </div>
           <div className="h-10 w-full p-3 rounded-lg bg-[#1E3A8A]">
             <li className="flex items-center">
              <IconCheck size={16} className="text-[#FB923C] mr-2" />
              RoHS Compliant
            </li>
           </div>
            <div className="h-10 w-full p-3 rounded-lg bg-[#1E3A8A]">
                <li className="flex items-center">
              <IconCheck size={16} className="text-[#FB923C] mr-2" />
              Made in Britain
            </li>
            </div>
          </ul>
        </div>
      </div>

      <div className=" max-w-6xl mx-auto flex w-full h-16 justify-between border-t border-gray-700 mt-8 pt-4">
        <div className="w-full">
             <p className="text-center text-xs">© 2026 TUK Ltd. All rights reserved. Registered in England &amp; Wales. B2B Trade Only</p>
        
        </div>
       <div className=" w-full float-right flex text-center space-x-4 text-xs">
          <Link href="/privacy-policy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms-conditions" className="hover:text-white">
            Terms &amp; Conditions
          </Link>
          <Link href="/cookie-policy" className="hover:text-white">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
