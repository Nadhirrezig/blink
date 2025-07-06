'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BlinkHeader from './BlinkHeader';
import BlinkOptions from './BlinkOptions';
import BlinkSummary from './BlinkSummary';
import type { MenuItem } from '@/lib/definitions';

interface BlinkOrderClientProps {
  item: MenuItem;
}

export default function BlinkOrderClient({ item }: BlinkOrderClientProps) {
  const router = useRouter();

  // Blink-specific state
  const [barista, setBarista] = useState<string | null>(null);
  const [strength, setStrength] = useState<'light' | 'strong'>('light');
  const [note, setNote] = useState('');
  const [syrup, setSyrup] = useState<string | null>(null);
  const [additives, setAdditives] = useState<string[]>([]);

  // Basic quantity/state if needed
  const [quantity] = useState(1);

  const handleBack = () => router.back();
  const handleNext = () => {
    // TODO: assemble order object and add to cart
    alert('Blink order placed!');
  };

  // Calculate total (basic calculation for now)
  const total = item.price * quantity;

  return (
    <main className="min-h-screen bg-[#F8F8F8] flex flex-col items-center px-2">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mt-2 relative">
        <BlinkHeader onBack={handleBack} />

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
          onNext={handleNext}
        />
      </div>
    </main>
  );
} 