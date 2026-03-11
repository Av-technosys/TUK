"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IconSearch } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="TUK Ltd logo" width={120} height={40} />
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-sm hover:text-primary">
              Home
            </Link>
            <Link href="/products" className="text-sm hover:text-primary">
              Products
            </Link>
            <Link href="/about" className="text-sm hover:text-primary">
              About
            </Link>
            <Link href="/wishlist" className="text-sm hover:text-primary">
              Wishlist
            </Link>
            <Link href="/contact" className="text-sm hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-lg py-1 px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <IconSearch size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
          <Button variant="default" size="sm">
            Request Quote
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
