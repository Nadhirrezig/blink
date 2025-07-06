'use client';
import OrderHeader from '../common/OrderHeader';
import ProductDisplay from '../common/ProductDisplay';
import OrderOptions from './OrderOptions';
import OrderSummary from '../common/OrderSummary';
import AdditionalOptions from './AdditionalOptions';
import { useOrder } from '@/hooks/useOrder';
import type { MenuItem } from '@/lib/definitions';

interface StandardOrderClientProps {
  item: MenuItem;
}

export default function StandardOrderClient({ item }: StandardOrderClientProps) {
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

  const handleNext = () => {
    // Placeholder for next step logic
    alert('Order placed!');
  };

  return (
    <main className="min-h-screen bg-[#F8F8F8] flex flex-col items-center px-2 pb-18">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mt-2">
        <OrderHeader onBack={() => window.history.back()} />
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
          <AdditionalOptions to="customise" />
          <OrderSummary total={total} onNext={handleNext} />
        </div>
      </div>
    </main>
  );
} 