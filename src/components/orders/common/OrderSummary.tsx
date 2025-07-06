interface OrderSummaryProps {
  total: number;
  onNext: () => void;
}

export default function OrderSummary({ total, onNext }: OrderSummaryProps) {
  const formattedTotal = total.toFixed(2);
  return (
    <section className="flex flex-col gap-4 w-full mt-6">
      <div className="flex justify-between items-center text-lg font-semibold text-[#1D1721]">
        <span>Total</span>
        <span>{formattedTotal} DT</span>
      </div>
      <button
        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#EEA4CE] to-[#BBEED1] text-[#1D1721] font-bold text-lg shadow-md cursor-pointer transition-opacity disabled:opacity-50"
        onClick={onNext}
        disabled={total === 0}
      >
        Next
      </button>
    </section>
  );
} 