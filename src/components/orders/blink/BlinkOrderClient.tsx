'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BlinkHeader from './BlinkHeader';
import BlinkOptions from './BlinkOptions';
import BlinkSummary from './BlinkSummary';
import type { MenuItem } from '@/lib/definitions';
import type { OrderPayload } from '@/lib/type';

interface BlinkOrderClientProps {
  item: MenuItem;
  pointId: string;
}

export default function BlinkOrderClient({ item, pointId }: BlinkOrderClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial values from query params or fallback to defaults
  const initialQuantity = Number(searchParams.get('quantity')) || 1;
  const initialMode = (searchParams.get('mode') as 'onsite' | 'takeaway') || 'onsite';
  const initialSize = (searchParams.get('size') as 's' | 'm' | 'l') || 'm';
  const initialSugar = Number(searchParams.get('sugar')) as 0 | 1 | 2 | 3 || 1;
  const initialTotal = Number(searchParams.get('total')) || item.price * initialQuantity;

  // Blink-specific state
  const [barista, setBarista] = useState<string | null>(null);
  const [strength, setStrength] = useState<'light' | 'medium' | 'strong'>('medium');
  const [note, setNote] = useState('');
  const [syrup, setSyrup] = useState<string | null>(null);
  const [additives, setAdditives] = useState<string[]>([]);

  // Use initial values from query params
  const [quantity, setQuantity] = useState(initialQuantity);
  const [mode, setMode] = useState<'onsite' | 'takeaway'>(initialMode);
  const [size, setSize] = useState<'s' | 'm' | 'l'>(initialSize);
  const [sugar, setSugar] = useState<0 | 1 | 2 | 3>(initialSugar);
  const [total, setTotal] = useState(initialTotal);

  // Optionally, recalculate total if any relevant state changes
  // useEffect(() => { ... }, [quantity, mode, size, item.price]);

  const handleBack = () => router.back();
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
        ...(barista && { barista }),
        ...(strength && { strength }),
        ...(note && { note }),
        ...(syrup && { syrup }),
        ...(additives.length > 0 && { additives }),
      };
      console.log(payload);
    } catch (err) {
      console.error('Order submission error:', err);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F8F8] flex flex-col items-center px-2">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mt-2 relative">
        <BlinkHeader />
        <div className="p-4 flex flex-col gap-6 pb-32">
          <BlinkOptions
            barista={barista}
            strength={strength}
            note={note}
            syrup={syrup}
            additives={additives}
            onBaristaChange={setBarista}
            onStrengthChange={setStrength}
            onNoteChange={setNote}
            onSyrupChange={setSyrup}
            onAdditivesChange={setAdditives}
          />
        </div>
        {/* Summary & Next - fixed only within the card */}
        <BlinkSummary
          total={total}
          onNext={handleSubmit}
        />
      </div>
    </main>
  );
} 