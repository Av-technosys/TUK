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
        // Handle "all" special case for "All Categories"
        if (categoryId === "all") {
          onCategoryChange("All Categories");
        } else {
          const found = data.find(
            (c: any) => String(c.id) === String(categoryId),
          );

          if (found) {
            onCategoryChange(found.name);
          }
        }
      } else {
        // If no categoryId in URL, default to "All Categories"
        onCategoryChange("All Categories");
      }
    };

    fetchCategories();
  }, [categoryId, onCategoryChange, onCategoriesLoad]);

  return null;
}
