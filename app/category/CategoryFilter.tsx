"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void
  onCategoriesLoad: (categories: any[]) => void
}

export function CategoryFilter({ onCategoryChange, onCategoriesLoad }: CategoryFilterProps) {
  const searchParams = useSearchParams()
  const categoryId = searchParams.get("categoryId")
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/category")
      const data = await res.json()
      setCategories(data)
      onCategoriesLoad(data)
    }

    fetchCategories()
  }, [onCategoriesLoad])

  useEffect(() => {
    if (categoryId && categories.length) {
      const found = categories.find(
        (c: any) => String(c.id) === String(categoryId)
      )

      if (found) {
        onCategoryChange(found.name)
      }
    }
  }, [categoryId, categories, onCategoryChange])

  return null
}
