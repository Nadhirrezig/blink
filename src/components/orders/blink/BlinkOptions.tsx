'use client';
import {
  IconUser,
  IconCoffee,
  IconNote,
  IconBottle,
  IconPlus,
  IconChevronRight,
} from '@tabler/icons-react';

interface BlinkOptionsProps {
  barista: string | null;
  strength: 'light' | 'medium' | 'strong';
  note: string;
  syrup: string | null;
  additives: string[];
  onBaristaChange: (barista: string | null) => void;
  onStrengthChange: (strength: 'light' | 'medium' | 'strong') => void;
  onNoteChange: (note: string) => void;
  onSyrupChange: (syrup: string | null) => void;
  onAdditivesChange: (additives: string[]) => void;
}

export default function BlinkOptions({
  barista,
  strength,
  note,
  syrup,
  additives,
  onBaristaChange,
  onStrengthChange,
  onNoteChange,
  onSyrupChange,
  onAdditivesChange,
}: BlinkOptionsProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Select a barista */}
      <button
        type="button"
        className="flex items-center justify-between w-full min-h-[48px] px-3 py-2 rounded-lg border-b border-gray-200 bg-white text-left focus:outline-none focus:ring-2 focus:ring-[#EEA4CE] hover:bg-[#F8F8F8] active:bg-[#EEA4CE]/10 transition"
        onClick={() => alert('Barista selector coming soon')}
        tabIndex={0}
      >
        <span className="flex items-center gap-2 text-[#1D1721] font-medium">
          <IconUser size={20} />
          Select a barista
        </span>
        <IconChevronRight size={20} className="text-gray-400" />
      </button>

      {/* Coffee strength radio buttons */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 px-3 text-[#1D1721] font-medium mb-1">
          <IconCoffee size={20} />
          Coffee type
        </label>
        <div className="flex flex-row items-center gap-6 px-3">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="coffee-strength"
              checked={strength === 'light'}
              onChange={() => onStrengthChange('light')}
              className="accent-[#EEA4CE] w-5 h-5 rounded focus:ring-2 focus:ring-[#EEA4CE]"
              aria-checked={strength === 'light'}
              aria-label="Light coffee"
            />
            <span className="text-sm text-[#1D1721]">Light</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="coffee-strength"
              checked={strength === 'medium'}
              onChange={() => onStrengthChange('medium')}
              className="accent-[#EEA4CE] w-5 h-5 rounded focus:ring-2 focus:ring-[#EEA4CE]"
              aria-checked={strength === 'medium'}
              aria-label="meduim coffee"
            />
            <span className="text-sm text-[#1D1721]">Medium</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="coffee-strength"
              checked={strength === 'strong'}
              onChange={() => onStrengthChange('strong')}
              className="accent-[#EEA4CE] w-5 h-5 rounded focus:ring-2 focus:ring-[#EEA4CE]"
              aria-checked={strength === 'strong'}
              aria-label="Strong coffee"
            />
            <span className="text-sm text-[#1D1721]">Strong</span>
          </label>
        </div>
      </div>

      {/* Special Note */}
      <div className="flex flex-col gap-1">
        <label htmlFor="special-note" className="flex items-center gap-2 px-3 text-[#1D1721] font-medium mb-1">
          <IconNote size={20} />
          Special Note
        </label>
        <textarea
          id="special-note"
          className="mt-1 p-3 px-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#EEA4CE] text-sm"
          rows={3}
          placeholder="Write your own Special Note"
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
        />
      </div>

      {/* Syrup selector */}
      <button
        type="button"
        className="flex items-center justify-between w-full min-h-[48px] px-3 py-2 rounded-lg border-b border-gray-200 bg-white text-left focus:outline-none focus:ring-2 focus:ring-[#EEA4CE] hover:bg-[#F8F8F8] active:bg-[#EEA4CE]/10 transition"
        onClick={() => alert('Syrup selector coming soon')}
        tabIndex={0}
      >
        <span className="flex items-center gap-2 text-[#1D1721] font-medium">
          <IconBottle size={20} />
          Syrup
        </span>
        <IconChevronRight size={20} className="text-gray-400" />
      </button>

      {/* Additives selector */}
      <button
        type="button"
        className="flex items-center justify-between w-full min-h-[48px] px-3 py-2 rounded-lg border-b border-gray-200 bg-white text-left focus:outline-none focus:ring-2 focus:ring-[#EEA4CE] hover:bg-[#F8F8F8] active:bg-[#EEA4CE]/10 transition"
        onClick={() => alert('Additives selector coming soon')}
        tabIndex={0}
      >
        <span className="flex items-center gap-2 text-[#1D1721] font-medium">
          <IconPlus size={20} />
          Additives
        </span>
        <IconChevronRight size={20} className="text-gray-400" />
      </button>
    </div>
  );
} 