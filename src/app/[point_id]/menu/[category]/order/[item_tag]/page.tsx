import { notFound } from 'next/navigation';
import { fetchProfileByPointId } from '@/lib/data/profiles';
import { fetchCategoryById } from '@/lib/data/categories';
import OrderClient from '@/components/order/OrderClient';

interface OrderPageProps {
  params: Promise<{ point_id: string; category: string; item_tag: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const resolvedParams = await params;
  
  // Fetch the profile based on point_id
  const profile = await fetchProfileByPointId(resolvedParams.point_id);
  
  if (!profile) return notFound();

  const category = await fetchCategoryById(resolvedParams.category);
  
  if (!category) return notFound();

  // Try to find item by itemId first (direct match)
  let item = category.items.find(i => i.itemId === resolvedParams.item_tag);
  
  // If not found, try to find by converting item_tag to itemId format
  if (!item) {
    // Convert item_tag back to itemId format (e.g., "margherita-pizza" -> "margherita-pizza")
    // This handles cases where the URL uses the item name without spaces
    item = category.items.find(i => {
      const itemNameForUrl = i.name.toLowerCase().replace(/\s+/g, '-');
      return itemNameForUrl === resolvedParams.item_tag;
    });
  }
  
  if (!item) return notFound();

  return (
    <OrderClient item={item} />
  );
}
