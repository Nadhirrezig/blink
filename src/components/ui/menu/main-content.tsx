'use client';
import Image from "next/image";
import React from "react";
import type { Category, MenuItem } from "@/lib/definitions";

interface MainContentProps {
  categories: Category[];
  selectedCategory: string | null;
  menuItems: MenuItem[];
  onCategoryClick?: (catId: string) => void;
  onItemClick?: (item: MenuItem) => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  categories,
  selectedCategory,
  menuItems,
  onCategoryClick,
  onItemClick,
}) => {
  return (
    <main
      className={`flex-1 overflow-y-auto p-4 pb-20 ${selectedCategory ? 'pt-4' : 'pt-4'}`}
    >
      {!selectedCategory ? (
        <div className="flex flex-col gap-4 w-full max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryClick?.(cat.id)}
              className="flex items-center justify-between bg-white rounded-2xl px-4 py-4 shadow hover:scale-[1.01] transition group border border-[#E5E7EB]"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14">
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-[cursive] text-[#1D1721] group-hover:text-[#EEA4CE]">
                  {cat.name}
                </span>
              </div>
              <span className="text-2xl text-[#EEA4CE]">→</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="flex flex-col items-center bg-white rounded-2xl py-6 px-2 shadow hover:scale-[1.03] transition border border-[#E5E7EB] cursor-pointer"
              onClick={() => onItemClick?.(item)}
            >
              <div className="relative" style={{ width: 80, height: 80 }}>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-contain"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <span className="mt-3 text-base font-semibold text-[#1D1721] text-center">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </main>
  );
}; 