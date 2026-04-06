"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const FilterSide = ({ category, setCategory, sort, setSort }: any) => {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();

        // 🔥 Add "All Categories" manually
        setCategories([{ id: "all", name: "All Categories" }, ...data]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  if (loading) {
    return <p className="p-4 text-sm">Loading categories...</p>;
  }
  return (
    <div className="hidden lg:block bg-white rounded-xl border p-6 space-y-8">
      {/* CATEGORIES */}

      <div className="space-y-5">
        <h3 className="text-sm font-semibold tracking-widest text-gray-500 font-poppins">
          CATEGORIES
        </h3>

        <RadioGroup
          value={category}
          onValueChange={(value) => {
            setCategory(value);

            const selected = categories.find((c) => c.name === value);

            if (selected) {
              router.push(`/category?categoryId=${selected.id}`);
            }
          }}
        >
          {categories.map((cat: any) => (
            <div key={cat.id} className="flex items-center gap-3 font-poppins">
              <RadioGroupItem value={cat.name} id={cat.name} />

              <label htmlFor={cat.name} className="text-black cursor-pointer">
                {cat.name}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* SORT */}

      <div className="space-y-4">
        <h3 className="text-sm font-semibold tracking-widest text-gray-500 font-poppins">
          SORT BY
        </h3>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-full h-10 text-sm">
            <SelectValue placeholder="Latest" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterSide;
