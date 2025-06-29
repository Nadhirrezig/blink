"use client";

import { useState } from "react";
import Image from "next/image";
import { placeholderItem } from "@/lib/placeholder-data";
import { useIsMobile } from "@/hooks/use-mobile";
import { IconArrowLeft } from "@tabler/icons-react";
import { MobileNav , DeskNav } from "@/components/ui/deskNav";

const categories = [
  {
    id: "beverages",
    name: "Beverages",
    imageUrl: "/coffee/express.png",
    items: ["Espresso", "Flat White", "Macchiato", "Latte", "Cappuccino", "Green Tea", "Chai Latte", "Earl Grey"],
  },
  {
    id: "lunch",
    name: "Lunch & Snacks",
    imageUrl: "/food/food.png",
    items: ["Croissant", "Avocado Toast", "Breakfast Sandwich", "Quiche Lorraine"],
  },
  {
    id: "desserts",
    name: "Desserts",
    imageUrl: "/dessert/glace.png",
    items: ["Tiramisu", "Chocolate Cake", "Cheesecake"],
  },
];

export default function page() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();

  // Filter items for the selected category
  const menuItems = selectedCategory
    ? placeholderItem.filter((item) =>
        categories
          .find((cat) => cat.id === selectedCategory)
          ?.items.includes(item.name)
      )
    : [];

  return (
    <div className={`min-h-screen flex bg-[#F7F8FB]`}>
      {/* desktop nav babyyyy */}
      {!isMobile && <DeskNav />}

      {/* Content Area */}
      <div className={`flex-1 flex flex-col ${!isMobile ? 'ml-40' : ''}`}>
        {/* Header */}
        <header
          className={
            isMobile
              ? "fixed top-0 left-0 w-full z-40 px-6 pt-2 pb-4 bg-white/80 shadow-sm"
              : "px-6 pt-8 pb-4 bg-white/80 shadow-sm"
          }
        >
          <div className="flex items-center gap-2 mb-4">
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="p-2 rounded-full bg-[#F7F8FB] hover:bg-[#EEA4CE]/20 text-[#1D1721] transition"
                aria-label="Go Back"
              >
                <IconArrowLeft size={22} />
              </button>
            )}
            <h1 className="text-lg font-semibold text-[#1D1721]">Welcome!</h1>
          </div>
          <h2 className="text-base font-medium text-[#1D1721] opacity-80">
            {selectedCategory
              ? `Select Your ${categories.find((c) => c.id === selectedCategory)?.name}`
              : 'Select Category'}
          </h2>
        </header>

        {/* Main Content */}
        <main
          className={`flex-1 overflow-y-auto p-4 pb-20 ${
            isMobile ? 'pt-[100px]' : 'pt-10'
          }`}
        >
          {!selectedCategory ? (
            <div className="flex flex-col gap-4 w-full max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
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
                  className="flex flex-col items-center bg-white rounded-2xl py-6 px-2 shadow hover:scale-[1.03] transition border border-[#E5E7EB]"
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
        {/* Mobile nav view baby */}
        {isMobile && <MobileNav />} 
      </div>
    </div>
  );
}
