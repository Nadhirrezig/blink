import { Minus, Plus } from 'lucide-react';

interface ProductDisplayProps {
  name: string;
  imageUrl: string;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export default function ProductDisplay({ name, imageUrl, quantity, onQuantityChange }: ProductDisplayProps) {
  const handleDecrement = () => {
    if (quantity > 1) onQuantityChange(quantity - 1);
  };
  const handleIncrement = () => {
    if (quantity < 10) onQuantityChange(quantity + 1);
  };
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <img src={imageUrl} alt={name} className="w-24 h-24 object-contain rounded-xl shadow-md bg-gradient-to-br from-[#EEA4CE] to-[#BBEED1]" />
      <h2 className="text-xl font-bold text-[#1D1721]">{name}</h2>
      <div className="flex items-center gap-4 mt-2">
        <button
          aria-label="Decrease quantity"
          onClick={handleDecrement}
          className="p-2 rounded-full bg-white dark:bg-[#F8F8F8] shadow hover:bg-gradient-to-r from-[#EEA4CE] to-[#BBEED1] cursor-pointer transition-colors"
          disabled={quantity <= 1}
        >
          <Minus className="w-5 h-5 text-[#1D1721]" />
        </button>
        <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
        <button
          aria-label="Increase quantity"
          onClick={handleIncrement}
          className="p-2 rounded-full bg-white dark:bg-[#F8F8F8] shadow hover:bg-gradient-to-r from-[#EEA4CE] to-[#BBEED1] cursor-pointer transition-colors"
          disabled={quantity >= 10}
        >
          <Plus className="w-5 h-5 text-[#1D1721]" />
        </button>
      </div>
    </div>
  );
} 