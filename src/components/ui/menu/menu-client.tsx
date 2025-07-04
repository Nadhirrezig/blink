'use client';

import { useRouter } from "next/navigation";
import { Profile, MenuItem } from "@/lib/definitions";
import { MainContent } from "@/components/ui/menu/main-content";

interface MenuClientProps {
  profile: Profile;
  selectedCategory: string | null;
  menuItems: MenuItem[];
}

export function MenuClient({ 
  profile,
  selectedCategory,
  menuItems,
}: MenuClientProps) {
  const router = useRouter();

  const handleCategoryClick = (catId: string) => {
    router.push(`/client/${profile.profileId}/menu/${catId}`);
  };

  const onItemClick = (item: MenuItem) => {
    router.push(`/client/${profile.profileId}/menu/${selectedCategory}/order/${item.itemId}`);
  };

  return (
    <MainContent
      categories={selectedCategory ? profile.menu.filter(c => c.catId === selectedCategory) : profile.menu}
      selectedCategory={selectedCategory}
      menuItems={menuItems}
      onCategoryClick={handleCategoryClick}
      onItemClick={onItemClick}
    />
  );
}
