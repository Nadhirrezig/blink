import { placeholderProfiles } from "@/lib/placeholder-data";
import { MenuClient } from "@/components/ui/menu/menu-client";

export default async function MenuPage({ params }: { params: Promise<{ point_id: string }> }) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const resolvedParams = await params;
  
  // Find the profile based on point_id
  const profile = placeholderProfiles.find(p => p.profileId === resolvedParams.point_id);
  
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