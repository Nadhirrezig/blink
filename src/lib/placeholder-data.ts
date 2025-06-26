import type { MenuItem, Order } from './definitions';

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
export const placeholderItem : MenuItem[] = [
  {
    id: '1',
    name: 'Expresso',
    description: 'i though i would never come back to this place..',
    price: 9.99,
    imageUrl: '/coffee/express.png',
  },
  {
    id: '2',
    name: 'Flat White',
    description: 'but here i find myself thinking about you',
    price: 14.99,
    imageUrl: '/coffee/flat-white.png',
  },
  {
    id: '3',
    name: 'Mochiato',
    description: 'i know you dont like it but i do',
    price: 19.99,
    imageUrl: '/coffee/mochiato.png',
  },
  {
    id: '4',
    name: 'Mug Coffee',
    description: 'we both know very well that it was our last time.',
    price: 12.99,
    imageUrl: '/coffee/mugcoffe.png',
  },
]
