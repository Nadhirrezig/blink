import { useState, useMemo } from 'react';
import type { MenuItem } from '@/lib/definitions';

export interface OrderState {
  quantity: number;
  mode: 'onsite' | 'takeaway';
  size: 's' | 'm' | 'l';
  sugar: 0 | 1 | 2 | 3;
}

export function useOrder(item: MenuItem) {
  const [orderState, setOrderState] = useState<OrderState>({
    quantity: 1,
    mode: 'onsite',
    size: 'm',
    sugar: 1,
  });

  const total = useMemo(() => {
    let basePrice = item.price;
    
    // Apply size multiplier for takeaway orders
    if (orderState.mode === 'takeaway') {
      switch (orderState.size) {
        case 's':
          basePrice = item.price * 0.8; // 20% discount for small
          break;
        case 'l':
          basePrice = item.price * 1.2; // 20% premium for large
          break;
        default:
          basePrice = item.price; // Medium size, no change
      }
    }
    
    return basePrice * orderState.quantity;
  }, [item.price, orderState.quantity, orderState.mode, orderState.size]);

  const updateOrderState = (updates: Partial<OrderState>) => {
    setOrderState(prev => ({ ...prev, ...updates }));
  };

  return {
    ...orderState,
    total,
    updateOrderState,
    setQuantity: (quantity: number) => updateOrderState({ quantity }),
    setMode: (mode: 'onsite' | 'takeaway') => updateOrderState({ mode }),
    setSize: (size: 's' | 'm' | 'l') => updateOrderState({ size }),
    setSugar: (sugar: 0 | 1 | 2 | 3) => updateOrderState({ sugar }),
  };
} 