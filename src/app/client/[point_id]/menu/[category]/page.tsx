import { notFound } from "next/navigation";
import { placeholderProfiles } from "@/lib/placeholder-data";
import { MenuClient } from "@/components/ui/menu/menu-client";

export default async function CategoryPage({ 
  params 
}: { 
  params: { point_id: string; category: string }
}) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  const profile = placeholderProfiles.find(p => p.profileId === params.point_id);
  
  if (!profile) {
    throw new Error('Restaurant or café not found. Please check the QR code or return to the map.');
  }

  const category = profile.menu.find(cat => cat.catId === params.category);
  
  if (!category) {
    throw new Error('Menu category not found. Please return to the main menu.');
  }

  return (
    <MenuClient
      profile={profile}
      selectedCategory={category.catId}
      menuItems={category.items}
    />
  );
} 