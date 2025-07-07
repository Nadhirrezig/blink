'use client';
import OrderHeader from '../common/OrderHeader';
import ProductDisplay from '../common/ProductDisplay';
import OrderOptions from './OrderOptions';
import OrderSummary from '../common/OrderSummary';
import AdditionalOptions from './AdditionalOptions';
import { useOrder } from '@/hooks/useOrder';
import type { MenuItem } from '@/lib/definitions';
import type { OrderPayload } from '@/lib/type';
import { useRouter, usePathname } from 'next/navigation';

interface StandardOrderClientProps {
  item: MenuItem;
  pointId: string;
}

export default function StandardOrderClient({ item, pointId }: StandardOrderClientProps) {
  const {
    quantity,
    mode,
    size,
    sugar,
    total,
    setQuantity,
    setMode,
    setSize,
    setSugar,
  } = useOrder(item);

  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = () => {
    try {
      const payload: OrderPayload = {
        pointId,
        itemTag: item.itemId,
        quantity,
        mode,
        size,
        sugar,
        total,
      };
      console.log(payload);
    } catch (err) {
      console.error('Order submission error:', err);
    }
  };

  const handleBlinkCustomise = () => {
    const params = new URLSearchParams({
      quantity: String(quantity),
      mode,
      size,
      sugar: String(sugar),
      total: String(total),
    });
    router.push(`${pathname}/customise?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-[#F8F8F8] flex flex-col items-center px-2 pb-18">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mt-2">
        <OrderHeader />
        <div className="p-4 flex flex-col gap-4">
          <ProductDisplay
            name={item.name}
            imageUrl={item.imageUrl}
            quantity={quantity}
            onQuantityChange={setQuantity}
          />
          <OrderOptions
            mode={mode}
            size={size}
            sugar={sugar}
            onModeChange={setMode}
            onSizeChange={setSize}
            onSugarChange={setSugar}
          />
          <AdditionalOptions to="customise" onClick={handleBlinkCustomise} />
          <OrderSummary total={total} onNext={handleSubmit} />
        </div>
      </div>
    </main>
  );
} 