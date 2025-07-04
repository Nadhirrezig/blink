import { notFound } from 'next/navigation';
import { placeholderProfiles } from '@/lib/placeholder-data';
import OrderClient from '@/components/order/OrderClient';

interface OrderPageProps {
  params: Promise<{ point_id: string; category: string; item_tag: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const resolvedParams = await params;
  
  // Find the profile first
  const profile = placeholderProfiles[0]; // For now using first profile, should be based on point_id
  if (!profile) return notFound();

  // Find the category and item
  const category = profile.menu.find(cat => cat.catId === resolvedParams.category);
  const item = category?.items.find(i => i.itemId === resolvedParams.item_tag);
  
  if (!item || !category) return notFound();

  return (
    <OrderClient item={item} category={category} />
  );
}
