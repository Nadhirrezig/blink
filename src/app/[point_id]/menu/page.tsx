import { fetchProfileByPointId } from "@/lib/data/profiles";
import { MenuClient } from "@/components/ui/menu/menu-client";

export default async function MenuPage({ params }: { params: Promise<{ point_id: string }> }) {
  const resolvedParams = await params;
  
  // Fetch the profile based on point_id
  const profile = await fetchProfileByPointId(resolvedParams.point_id);
  
  if (!profile) {
    throw new Error('Restaurant or café not found. Please check the QR code or return to the map.');
  }

  return (
    <MenuClient
      profile={profile}
      selectedCategory={null}
      menuItems={[]} // No items initially, will be loaded on category selection
    />
  );
} 