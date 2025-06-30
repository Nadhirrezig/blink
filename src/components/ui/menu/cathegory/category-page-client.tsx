"use client";

import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { DeskNav, MobileNav } from "@/components/ui/menu/deskNav";
import { HeaderContent } from "@/components/ui/menu/header-content";
import { MainContent } from "@/components/ui/menu/main-content";
import { MenuItem, category } from "@/lib/definitions";

export default function CategoryPageClient({
  pointId,
  selectedCategory,
  category,
  menuItems,
}: {
  pointId: string;
  selectedCategory: string;
  category: category;
  menuItems: MenuItem[];
}) {
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleBack = () => {
    router.push(`/client/${pointId}/menu`);
  };

  if (!category) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Category not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F7F8FB]">
      {!isMobile && <DeskNav />}
      <div className={`flex-1 flex flex-col ${!isMobile ? 'ml-40' : ''}`}>
        <HeaderContent
          selectedCategory={category.id}
          categories={[category]}
          onBack={handleBack}
        />
        <MainContent
          pointId={pointId}
          categories={[category]}
          selectedCategory={category.id}
          menuItems={menuItems}
          onCategoryClick={() => {}}
          onBack={handleBack}
        />
        {isMobile && <MobileNav />}
      </div>
    </div>
  );
}
