"use client"

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

const categories = [
  { name: "All Categories", icon: IconLayoutGrid },
  { name: "Voice & Data", icon: IconBox },
  { name: "RJ45 Connectors", icon: IconPlugConnected },
  { name: "Patch Panels", icon: IconServer },
  { name: "Keystone Jacks", icon: IconTopologyStar },
  { name: "Cable Management", icon: IconAdjustments },
  { name: "Wall Plates", icon: IconGridDots },
  { name: "Fiber Optic", icon: IconBolt },
  { name: "Tools & Testers", icon: IconTools },
  { name: "Racks & Cabinets", icon: IconDatabase },
  { name: "Adapters", icon: IconPlug },
  { name: "Telephone Systems", icon: IconPhone },
]

const FilterSideBar = ({ category, setCategory, products }: any) => {

  const getCount = (name: string) => {
    if (name === "All Categories") return products.length
    return products.filter((p: any) => p.category === name).length
  }

  return (
    <div className="bg-white rounded-xl border p-6 space-y-8">

      <div className="space-y-5">

        <h3 className="text-sm font-semibold tracking-widest text-gray-500">
          Categories
        </h3>

        <div className="flex flex-col gap-3">

          {categories.map((cat) => {

            const Icon = cat.icon
            const count = getCount(cat.name)

            return (
              <div
                key={cat.name}
                onClick={() => setCategory(cat.name)}
                className={`flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer transition
                ${category === cat.name ? "bg-[#0300A7] text-white" : "hover:bg-gray-100"}
                `}
              >

                <div className="flex items-center gap-3">

                  <Icon size={18} />

                  <span className="text-sm">
                    {cat.name}
                  </span>

                </div>

                <span
                  className={`text-xs px-2 py-1 rounded-full
                  ${category === cat.name
                      ? "bg-white text-[#0300A7]"
                      : "bg-gray-200 text-gray-600"
                    }`}
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