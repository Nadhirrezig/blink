import { notFound } from "next/navigation";
import { placeholderCategories, placeholderItem } from "@/lib/placeholder-data";
import { MenuClient } from "@/components/ui/menu/menu-client";
export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ point_id: string; category: string }>; 
}) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const resolvedParams = await params;
  const category = placeholderCategories.find(cat => cat.id === resolvedParams.category);
  if (!category) {
    notFound();
  }

  const categoryItems = placeholderItem.filter(item => 
    category.itemIds.includes(item.id)
  );

  return (
    <MenuClient
      pointId={resolvedParams.point_id}
      categories={placeholderCategories}
      selectedCategory={category.id}
      menuItems={categoryItems}
    />
  );
} 