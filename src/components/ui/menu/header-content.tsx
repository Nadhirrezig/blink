'use client';
import React from "react";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/definitions";

interface HeaderContentProps {
  pointId: string;
  categories: Category[];
}

export const HeaderContent: React.FC<HeaderContentProps> = ({
  pointId,
  categories,
}) => {
  const pathname = usePathname();
  
  // Extract category from pathname if we're on a category page
  const categoryMatch = pathname.match(/\/menu\/([^\/]+)$/);
  const selectedCategory = categoryMatch ? categoryMatch[1] : null;
  
  const categoryName = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)?.name
    : null;

  return (
    <header className="sticky top-0 z-30 px-6 pt-6 pb-4 bg-white/95 backdrop-blur-sm shadow-md border-b border-[#EEA4CE]/10">
      <div className="flex items-center gap-2 mb-3">
        <h1 className="text-lg font-semibold text-[#1D1721]">
          Welcome To <span className="text-[#EEA4CE] font-bold text-2xl uppercase">{pointId}</span> Menu!
        </h1>
      </div>
      <h2 className="text-base font-medium text-[#1D1721] opacity-80">
        {selectedCategory
          ? `Select Your ${categoryName}`
          : 'Select Category'}
      </h2>
    </header>
  );
}; 