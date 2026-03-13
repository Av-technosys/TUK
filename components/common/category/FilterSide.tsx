"use client"

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const categories = [
  "All Categories",
  "Voice & Data",
  "Fiber Optic",
  "Network Racks",
  "Patch Panels",
  "Keystone Jacks",
  "Power Distribution",
  "Cable Management",
  "Testing Equipment",
  "Copper Cables",
  "Wall Outlets",
  "Tools & Accessories",
]

const FilterSide = ({ category, setCategory, sort, setSort }: any) => {

  return (
    <div className="hidden lg:block bg-white rounded-xl border p-6 space-y-8">

      {/* CATEGORIES */}

      <div className="space-y-5">

        <h3 className="text-sm font-semibold tracking-widest text-gray-500">
          CATEGORIES
        </h3>

        <RadioGroup
          value={category}
          onValueChange={setCategory}
          className="flex flex-col gap-4"
        >
          {categories.map((cat) => (
            <div key={cat} className="flex items-center gap-3">

              <RadioGroupItem value={cat} id={cat} />

              <label
                htmlFor={cat}
                className="text-black cursor-pointer"
              >
                {cat}
              </label>

            </div>
          ))}
        </RadioGroup>

      </div>

      {/* SORT */}

      <div className="space-y-4">

        <h3 className="text-sm font-semibold tracking-widest text-gray-500">
          SORT BY
        </h3>

        <Select value={sort} onValueChange={setSort}>

          <SelectTrigger className="w-full h-10 text-sm">
            <SelectValue placeholder="Latest" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
          </SelectContent>

        </Select>

      </div>

    </div>
  )
}

export default FilterSide