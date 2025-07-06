import { ArrowLeft } from 'lucide-react';

interface BlinkHeaderProps {
  onBack?: () => void;
}

export default function BlinkHeader({ onBack }: BlinkHeaderProps) {
  return (
    <header className="flex items-center px-2 py-3 border-b border-gray-200 bg-white shadow-sm rounded-t-2xl min-h-[56px] relative">
      <button
        aria-label="Back"
        onClick={onBack}
        className="absolute left-2 p-2 rounded-full hover:bg-gradient-to-r from-[#EEA4CE] to-[#BBEED1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#EEA4CE] cursor-pointer"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        <ArrowLeft className="w-6 h-6 text-[#1D1721]" />
      </button>
      <h1 className="flex-1 text-center text-lg font-semibold text-[#1D1721]">BLINK assemblage</h1>
      <div className="w-8" />
    </header>
  );
} 