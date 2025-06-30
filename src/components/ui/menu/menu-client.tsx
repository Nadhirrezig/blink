'use client';

import { useRouter } from "next/navigation";
import { Category, MenuItem } from "@/lib/definitions";
import { HeaderContent } from "@/components/ui/menu/header-content";
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

  const handleBack = () => {
    if (selectedCategory) {
      router.push(`/client/${pointId}/menu`);
    }
  };

  return (
    <>
      <HeaderContent
        pointId={pointId}
        selectedCategory={selectedCategory}
        categories={categories}
        onBack={handleBack}
      />
      <MainContent
        categories={selectedCategory ? categories.filter(c => c.id === selectedCategory) : categories}
        selectedCategory={selectedCategory}
        menuItems={menuItems}
        onCategoryClick={handleCategoryClick}
        onBack={handleBack}
      />
    </>
  );
} 