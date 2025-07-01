import { notFound } from 'next/navigation';
import { placeholderItem, placeholderCategories } from '@/lib/placeholder-data';
import OrderClient from '@/components/order/OrderClient';

interface OrderPageProps {
  params: Promise<{ point_id: string; category: string; item_tag: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const resolvedParams = await params;
  const item = placeholderItem.find(i => i.path_id === resolvedParams.item_tag);
  const category = placeholderCategories.find(cat => cat.id === resolvedParams.category);
  if (!item || !category) return notFound();

  return (
    <OrderClient item={item} category={category} />
  );
}
