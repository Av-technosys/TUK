"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void;
  onCategoriesLoad: (categories: any[]) => void;
}

export function CategoryFilter({
  onCategoryChange,
  onCategoriesLoad,
}: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const [localCategories, setLocalCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/category");
      const data = await res.json();

      setLocalCategories(data);

      // call parent ONLY once
      if (onCategoriesLoad) {
        onCategoriesLoad(data);
      }

      // If categoryId is in URL, find and select that category
      if (categoryId) {
        const found = data.find(
          (c: any) => String(c.id) === String(categoryId),
        );

        if (found) {
          onCategoryChange(found.name);
        }
      }
    };

    fetchCategories();
  }, [categoryId, onCategoryChange, onCategoriesLoad]);

  return null;
}
