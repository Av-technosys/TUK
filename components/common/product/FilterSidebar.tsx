"use client"
 import { useEffect, useState } from "react"
import {
  IconLayoutGrid,
  IconBox,
  IconPlugConnected,
  IconServer,
  IconTopologyStar,
  IconAdjustments,
  IconGridDots,
  IconBolt,
  IconTools,
  IconDatabase,
  IconPlug,
  IconPhone
} from "@tabler/icons-react"



const FilterSideBar = ({ category, setCategory, products }: any) => {
 
const [categories, setCategories] = useState<any[]>([])
 const getCount = (cat: any) => {
  if (cat.id === "all") return products.length

  return products.filter(
    (p: any) => String(p.categoryId) === String(cat.id)
  ).length
}

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/category")
      const data = await res.json()

      // Add All Categories
      setCategories([{ id: "all", name: "All Categories" }, ...data])
    } catch (error) {
      console.error(error)
    }
  }

  fetchCategories()
}, [])

if (!categories.length) {
  return <p className="p-4 text-sm">Loading categories...</p>
}

  return (
    <div className="bg-white rounded-xl border p-6 space-y-8">

      <div className="space-y-5">

        <h3 className="text-sm font-semibold tracking-widest text-gray-500 font-poppins">
          Categories
        </h3>

        <div className="flex flex-col gap-3">

          {categories.map((cat: any) => {
  
  const count = getCount(cat)

  return (
    <div
      key={cat.id || cat.name}
      onClick={() => setCategory(cat.name)}
      className={`flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer transition
        ${category === cat.name ? "bg-[#0300A7] text-white" : "hover:bg-gray-100"}
      `}
    >

      <div className="flex items-center gap-3">
        
        <span className="text-sm">{cat.name}</span>
      </div>

      <span
        className={`text-xs px-2 py-1 rounded-full
          ${category === cat.name
            ? "bg-white text-[#0300A7]"
            : "bg-gray-200 text-gray-600"}
        `}
      >
        {count}
      </span>

    </div>
  )
})}

        </div>

      </div>

    </div>
  )
}

export default FilterSideBar