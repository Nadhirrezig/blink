import { ArrowLeft } from 'lucide-react';

interface OrderHeaderProps {
  onBack?: () => void;
}

export default function OrderHeader({ onBack }: OrderHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-[#2A2232] bg-white dark:bg-[#F8F8F8] shadow-sm rounded-t-xl">
      <button
        aria-label="Back"
        onClick={onBack}
        className="p-2 rounded-full hover:bg-gradient-to-r from-[#EEA4CE] to-[#BBEED1] transition-colors focus:outline-none cursor-pointer"
      >
        <ArrowLeft className="w-6 h-6 text-[#1D1721]" />
      </button>
      <h1 className="flex-1 text-center text-lg font-semibold text-[#1D1721]">Order</h1>
      <div className="w-8" />
    </header>
  );
} 