import React from "react";
import { placeholderItem} from "@/lib/placeholder-data";
export function MenuItemsSkeleton() {
  const items = placeholderItem.length;
  return (
    <div className="grid grid-cols-2 gap-6 mt-4">
      {[...Array(items)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center bg-white rounded-2xl py-6 px-2 shadow border border-[#E5E7EB] animate-pulse"
        >
          <div className="w-20 h-20 bg-gray-200 rounded" />
          <div className="mt-3 h-4 w-24 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
} 