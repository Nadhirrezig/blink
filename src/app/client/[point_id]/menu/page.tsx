import { placeholderCategories } from "@/lib/placeholder-data";
import { MenuClient } from "@/components/ui/menu/menu-client";

export default function MenuPage({ params }: { params: { point_id: string } }) {
  return (
    <MenuClient
      pointId={params.point_id}
      categories={placeholderCategories}
      selectedCategory={null}
      menuItems={[]}
    />
  );
} 