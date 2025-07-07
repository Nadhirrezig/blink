import React from 'react';

interface AdditionalOptionsProps {
  to?: string;
  onClick?: () => void;
}

export default function AdditionalOptions({ to, onClick }: AdditionalOptionsProps) {
  return (
    <section 
      className={`w-full mt-4 p-4 rounded-xl border-2 border-dashed border-[#EEA4CE] bg-[#F8F8F8] text-center text-xs text-[#1D1721] opacity-70 ${
        to ? 'cursor-pointer hover:opacity-100 transition-opacity' : ''
      }`}
      onClick={to ? onClick : undefined}
    >
      {/* Reserved for future advanced options like Blink Assemblage */}
      {to ? (
        <span>Tap for Blink assemblage customization</span>
      ) : (
        <span>Additional options coming soon…</span>
      )}
    </section>
  );
} 