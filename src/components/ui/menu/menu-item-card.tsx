'use client';

import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { MenuItem } from '@/lib/definitions';

interface MenuItemCardProps {
  item: MenuItem;
  isFavorite: boolean;
  onToggleFavorite: (itemId: string) => void;
  onAddToCart: (item: MenuItem) => void;
  showRating?: boolean;
  rating?: number;
}

export default function MenuItemCard({
  item,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  showRating = true,
  rating = 4.5,
}: MenuItemCardProps) {
  return (
    <div className="bg-[#F7F8FB] rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-[#1D1721]">
      {/* Image section */}
      <div className="relative mb-4">
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-[#EEA4CE]/20 to-[#BBEED1]/20">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>

        {/* Favorite button */}
        <button
          onClick={() => onToggleFavorite(item.id)}
          aria-label="Toggle Favorite"
          className={`absolute top-2 right-2 p-2 rounded-full shadow-sm transition-colors ${
            isFavorite
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        {/* Rating */}
        {showRating && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full text-xs font-medium text-gray-800 shadow-sm">
            <Star size={12} className="text-yellow-400 fill-current" />
            {rating}
          </div>
        )}
      </div>

      {/* Name + description */}
      <div className="mb-3 space-y-1">
        <h3 className="font-semibold text-base sm:text-lg leading-tight">{item.name}</h3>
        {item.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
        )}
      </div>

      {/* Price + action */}
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-[#EEA4CE]">${item.price.toFixed(2)}</span>
        <button
          onClick={() => onAddToCart(item)}
          className="px-4 py-2 text-sm font-semibold rounded-lg text-[#1D1721] bg-gradient-to-r from-[#EEA4CE] to-[#BBEED1] hover:opacity-90 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
