'use client';
import { useState } from 'react';
import OrderHeader from './OrderHeader';
import ProductDisplay from './ProductDisplay';
import OrderOptions from './OrderOptions';
import OrderSummary from './OrderSummary';
import AdditionalOptions from './AdditionalOptions';
import type { MenuItem, Category } from '@/lib/definitions';

interface OrderClientProps {
  item: MenuItem;
  category: Category;
}

export default function OrderClient({ item, category }: OrderClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [mode, setMode] = useState<'onsite' | 'takeaway'>('onsite');
  const [size, setSize] = useState<'s' | 'm' | 'l'>('m');
  const [sugar, setSugar] = useState<0 | 1 | 2 | 3>(1);

  const handleNext = () => {
    // Placeholder for next step logic
    alert('Order placed!');
  };

  return (
    <main className="min-h-screen bg-[#F8F8F8] flex flex-col items-center px-2 pb-8">
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
          <AdditionalOptions />
          <OrderSummary price={item.price} quantity={quantity} onNext={handleNext} />
        </div>
      </div>
    </main>
  );
} 