import type { Order } from './definitions';

export const placeholderOrders: Order[] = [
  {
    id: '1',
    tableNumber: 5,
    orderCode: 'ORD-001',
    items: [
      { name: 'Pizza', quantity: 2, details: 'Large, extra cheese' },
      { name: 'Coke', quantity: 3 },
    ],
    subtotal: 40,
    discount: 5,
    total: 35,
    status: 'paid',
  },
  {
    id: '2',
    tableNumber: 3,
    orderCode: 'ORD-002',
    items: [
      { name: 'Burger', quantity: 1 },
      { name: 'Fries', quantity: 2, details: 'Large' },
    ],
    subtotal: 25,
    discount: 0,
    total: 25,
    status: 'pending',
  },
  {
    id: '3',
    tableNumber: 1,
    orderCode: 'ORD-003',
    items: [
      { name: 'Salad', quantity: 1 },
    ],
    subtotal: 10,
    discount: 2,
    total: 8,
    status: 'paid',
  },
];