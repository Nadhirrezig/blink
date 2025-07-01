'use client';

import { useRouter } from "next/navigation";
import { Category, MenuItem } from "@/lib/definitions";
import { MainContent } from "@/components/ui/menu/main-content";

interface MenuClientProps {
  pointId: string;
  categories: Category[];
  selectedCategory: string | null;
  menuItems: MenuItem[];
}

export function MenuClient({ 
  pointId,
  categories,
  selectedCategory,
  menuItems
}: MenuClientProps) {
  const router = useRouter();

  const handleCategoryClick = (catId: string) => {
    router.push(`/client/${pointId}/menu/${catId}`);
  };

  return (
    <MainContent
      categories={selectedCategory ? categories.filter(c => c.id === selectedCategory) : categories}
      selectedCategory={selectedCategory}
      menuItems={menuItems}
      onCategoryClick={handleCategoryClick}
    />
  );
} 