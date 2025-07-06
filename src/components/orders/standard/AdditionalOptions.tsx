import { useRouter, usePathname } from 'next/navigation';

interface AdditionalOptionsProps {
  to?: string;
}

export default function AdditionalOptions({ to }: AdditionalOptionsProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (to) {
      // Navigate to the customise page by appending /customise to the current path
      router.push(`${pathname}/customise`);
    }
  };

  return (
    <section 
      className={`w-full mt-4 p-4 rounded-xl border-2 border-dashed border-[#EEA4CE] bg-[#F8F8F8] text-center text-xs text-[#1D1721] opacity-70 ${
        to ? 'cursor-pointer hover:opacity-100 transition-opacity' : ''
      }`}
      onClick={handleClick}
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