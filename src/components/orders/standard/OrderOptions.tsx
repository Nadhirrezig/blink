"use client";
import { Coffee, CupSoda } from 'lucide-react';
import { useEffect, useState } from 'react';
interface OrderOptionsProps {
  mode: 'onsite' | 'takeaway';
  size: 's' | 'm' | 'l';
  sugar: 0 | 1 | 2 | 3;
  onModeChange: (mode: 'onsite' | 'takeaway') => void;
  onSizeChange: (size: 's' | 'm' | 'l') => void;
  onSugarChange: (sugar: 0 | 1 | 2 | 3) => void;
}

export default function OrderOptions({ mode, size, sugar, onModeChange, onSizeChange, onSugarChange }: OrderOptionsProps) {
  const [isTakeaway, setIsTakeaway] = useState(false);
  useEffect(() => {
    // Set isTakeaway true if mode is takeaway, false otherwise
    if (mode === 'takeaway') {
      setIsTakeaway(true);
    } else {
      setIsTakeaway(false);
    }
  }, [mode]);
  return (
    <section className="flex flex-col gap-6 w-full">
      {/* Mode Toggle */}
      <div>
        <div className="text-sm font-medium text-[#1D1721] mb-2">Mode</div>
        <div className="flex gap-4">
          <button
            className={`flex-1 flex flex-col items-center p-3 rounded-xl border transition shadow-sm cursor-pointer ${mode === 'onsite' ? 'bg-gradient-to-r from-[#EEA4CE] to-[#BBEED1] border-transparent' : 'bg-white border-gray-200'}`}
            onClick={() => onModeChange('onsite')}
            aria-pressed={mode === 'onsite'}
          >
            <Coffee className="w-6 h-6 mb-1" />
            <span className="text-xs font-semibold">Onsite</span>
          </button>
          <button
            className={`flex-1 flex flex-col items-center p-3 rounded-xl border transition shadow-sm cursor-pointer ${mode === 'takeaway' ? 'bg-gradient-to-r from-[#EEA4CE] to-[#BBEED1] border-transparent' : 'bg-white border-gray-200'}`}
            onClick={() => onModeChange('takeaway')}
            aria-pressed={mode === 'takeaway'}
          >
            <CupSoda className="w-6 h-6 mb-1" />
            <span className="text-xs font-semibold">Takeaway</span>
          </button>
        </div>
      </div>
      {/* Size Selector */}
      {isTakeaway && (
      <div>
        <div className="text-sm font-medium text-[#1D1721] mb-2">Size</div>
        <div className="flex gap-4">
          <button
            className={`flex-1 flex flex-col items-center p-3 rounded-xl border transition shadow-sm cursor-pointer ${size === 's' ? 'bg-gradient-to-r from-[#EEA4CE] to-[#BBEED1] border-transparent' : 'bg-white border-gray-200'}`}
            onClick={() => onSizeChange('s')}
            aria-pressed={size === 's'}
          >
            <Coffee className="w-5 h-5 mb-1" />
            <span className="text-xs font-semibold">S</span>
          </button>
          <button
            className={`flex-1 flex flex-col items-center p-3 rounded-xl border transition shadow-sm cursor-pointer ${size === 'm' ? 'bg-gradient-to-r from-[#EEA4CE] to-[#BBEED1] border-transparent' : 'bg-white border-gray-200'}`}
            onClick={() => onSizeChange('m')}
            aria-pressed={size === 'm'}
          >
            <Coffee className="w-6 h-6 mb-1" />
            <span className="text-xs font-semibold">M</span>
          </button>
          <button
            className={`flex-1 flex flex-col items-center p-3 rounded-xl border transition shadow-sm cursor-pointer ${size === 'l' ? 'bg-gradient-to-r from-[#EEA4CE] to-[#BBEED1] border-transparent' : 'bg-white border-gray-200'}`}
            onClick={() => onSizeChange('l')}
            aria-pressed={size === 'l'}
          >
            <Coffee className="w-7 h-7 mb-1" />
            <span className="text-xs font-semibold">L</span>
          </button>
        </div>
      </div>
      )}
      {/* Sugar Selector */}
      <div>
        <div className="text-sm font-medium text-[#1D1721] mb-2">Sugar</div>
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((cube) => (
            <button
              key={cube}
              className={`w-10 h-10 flex items-center justify-center rounded-full border transition shadow-sm cursor-pointer ${sugar === cube ? 'bg-gradient-to-r from-[#EEA4CE] to-[#BBEED1] border-transparent' : 'bg-white border-gray-200'}`}
              onClick={() => onSugarChange(cube as 0 | 1 | 2 | 3)}
              aria-pressed={sugar === cube}
            >
              <span className="text-lg font-bold text-[#1D1721]">{cube}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
} 