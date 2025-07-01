import React from "react";
import { placeholderCategories } from "@/lib/placeholder-data";
export function MenuCategoriesSkeleton() {
  const categories = placeholderCategories.length;
  return (
    <div className="flex flex-col gap-4 w-full max-w-full">
      {[...Array(categories)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between bg-white rounded-2xl px-4 py-4 shadow border border-[#E5E7EB] animate-pulse"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-200 rounded-full" />
            <div className="h-6 w-32 bg-gray-200 rounded" />
          </div>
          <div className="h-6 w-6 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
} 