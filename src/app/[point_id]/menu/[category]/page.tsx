import { fetchProfileByPointId } from "@/lib/data/profiles";
import { fetchCategoryById } from "@/lib/data/categories";
import { MenuClient } from "@/components/ui/menu/menu-client";

export default async function CategoryPage({ params }: { params: Promise<{ point_id: string; category: string }> }) {
  const resolvedParams = await params;
  
  const profile = await fetchProfileByPointId(resolvedParams.point_id);
  
  if (!profile) {
    throw new Error('Restaurant or café not found. Please check the QR code or return to the map.');
  }

  const category = await fetchCategoryById(resolvedParams.category);
  
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