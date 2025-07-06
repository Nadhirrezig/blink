import React from 'react';

interface BlinkSummaryProps {
  total: number;
  onNext: () => void;
}

export default function BlinkSummary({ total, onNext }: BlinkSummaryProps) {
  const formattedTotal = total.toFixed(2);
  return (
    <section className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-md rounded-b-2xl flex flex-col gap-4 z-10 max-w-md mx-auto">
      <div className="flex justify-between items-center text-lg font-semibold text-[#1D1721]">
        <span>Total Amount</span>
        <span>{formattedTotal} DT</span>
      </div>
      <button
        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#1D1721] to-[#BBEED1] text-white font-bold text-lg shadow-md cursor-pointer transition-opacity disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#EEA4CE]"
        onClick={onNext}
        disabled={total === 0}
      >
        Next
      </button>
    </section>
  );
} 