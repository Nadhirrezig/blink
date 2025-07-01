import { placeholderCategories } from "@/lib/placeholder-data";
import { MenuClient } from "@/components/ui/menu/menu-client";

export default async function MenuPage({ params }: { params: Promise<{ point_id: string }> }) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const resolvedParams = await params;
  return (
    <MenuClient
      pointId={resolvedParams.point_id}
      categories={placeholderCategories}
      selectedCategory={null}
      menuItems={[]} // No items initially, will be loaded on category selection
    />
  );
} 