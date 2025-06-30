import React from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import type { Category } from "@/lib/definitions";


interface HeaderContentProps {
  pointId: string;
  selectedCategory: string | null;
  categories: Category[];
  onBack: () => void;
}

export const HeaderContent: React.FC<HeaderContentProps> = ({
  pointId,
  selectedCategory,
  categories,
  onBack,
}) => {
  const categoryName = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)?.name
    : null;

  return (
    <header className="px-6 pt-8 pb-4 bg-white/80 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        {selectedCategory && (
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-[#F7F8FB] hover:bg-[#EEA4CE]/20 text-[#1D1721] transition"
            aria-label="Go Back"
          >
            <IconArrowLeft size={22} />
          </button>
        )}
        <h1 className="text-lg font-semibold text-[#1D1721]">Welcome To <span className="text-[#EEA4CE] font-bold text-2xl uppercase ">{pointId}</span> Menu!</h1>
      </div>
      <h2 className="text-base font-medium text-[#1D1721] opacity-80">
        {selectedCategory
          ? `Select Your ${categoryName}`
          : 'Select Category'}
      </h2>
    </header>
  );
}; 