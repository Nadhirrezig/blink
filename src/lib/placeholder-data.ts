import type { MenuItem, Order, Category } from './definitions';

export const placeholderOrders: Order[] = [
  {
    id: '1',
    tableNumber: 5,
    orderCode: 'ORD-001',
    items: [
      {
        id: 'item-1',
        name: 'Pizza',
        quantity: 2,
        price: 20,
        details: 'Large, extra cheese',
      },
      {
        id: 'item-2',
        name: 'Coke',
        quantity: 3,
        price: 2,
      },
    ],
    subtotal: 40,
    discount: 5,
    total: 35,
    status: 'paid',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    tableNumber: 3,
    orderCode: 'ORD-002',
    items: [
      {
        id: 'item-3',
        name: 'Burger',
        quantity: 1,
        price: 10,
      },
      {
        id: 'item-4',
        name: 'Fries',
        quantity: 2,
        price: 7.5,
        details: 'Large',
      },
    ],
    subtotal: 25,
    discount: 0,
    total: 25,
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    tableNumber: 1,
    orderCode: 'ORD-003',
    items: [
      {
        id: 'item-5',
        name: 'Salad',
        quantity: 1,
        price: 10,
      },
    ],
    subtotal: 10,
    discount: 2,
    total: 8,
    status: 'paid',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    tableNumber: 21,
    orderCode: 'ORD-004',
    items: [
      {
        id: 'item-5',
        name: 'Salad',
        quantity: 1,
        price: 10,
      },
    ],
    subtotal: 10,
    discount: 2,
    total: 8,
    status: 'paid',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    tableNumber: 1,
    orderCode: 'ORD-005',
    items: [
      {
        id: 'item-5',
        name: 'Salad',
        quantity: 1,
        price: 10,
      },
    ],
    subtotal: 10,
    discount: 2,
    total: 8,
    status: 'paid',
    createdAt: new Date().toISOString(),
  },
];

export const placeholderItem: MenuItem[] = [
  {
    id: '1',
    path_id: 'espresso',
    name: 'Espresso',
    description: 'Rich and bold single shot of pure coffee essence',
    price: 3.99,
    imageUrl: '/coffee/express.png',
  },
  {
    id: '2',
    path_id: 'flat-white',
    name: 'Flat White',
    description: 'Smooth espresso with velvety microfoam milk',
    price: 4.99,
    imageUrl: '/coffee/flat-white.png',
  },
  {
    id: '3',
    path_id: 'macchiato',
    name: 'Macchiato',
    description: 'Espresso marked with a dollop of steamed milk',
    price: 4.49,
    imageUrl: '/coffee/mochiato.png',
  },
  {
    id: '4',
    path_id: 'mug-coffee',
    name: 'Mug Coffee',
    description: 'Classic brewed coffee in a generous mug',
    price: 3.49,
    imageUrl: '/coffee/mugcoffe.png',
  },
  {
    id: '5',
    path_id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Perfect balance of espresso, steamed milk, and foam',
    price: 5.49,
    imageUrl: '/coffee/express.png',
  },
  {
    id: '6',
    path_id: 'latte',
    name: 'Latte',
    description: 'Smooth espresso with creamy steamed milk',
    price: 5.99,
    imageUrl: '/coffee/flat-white.png',
  },
  
  // Tea Items
  {
    id: '7',
    path_id: 'green-tea',
    name: 'Green Tea',
    description: 'Refreshing and healthy traditional green tea',
    price: 3.99,
    imageUrl: '/coffee/mugcoffe.png',
  },
  {
    id: '8',
    path_id: 'chai-latte',
    name: 'Chai Latte',
    description: 'Spiced tea with steamed milk and honey',
    price: 4.99,
    imageUrl: '/coffee/mochiato.png',
  },
  {
    id: '9',
    path_id: 'earl-grey',
    name: 'Earl Grey',
    description: 'Classic black tea with bergamot oil',
    price: 3.49,
    imageUrl: '/coffee/express.png',
  },
  
  // Food Items
  {
    id: '10',
    path_id: 'croissant',
    name: 'Croissant',
    description: 'Buttery, flaky French pastry',
    price: 4.99,
    imageUrl: '/coffee/mugcoffe.png',
  },
  {
    id: '11',
    path_id: 'avocado-toast',
    name: 'Avocado Toast',
    description: 'Sourdough toast with fresh avocado and herbs',
    price: 8.99,
    imageUrl: '/coffee/flat-white.png',
  },
  {
    id: '12',
    path_id: 'breakfast-sandwich',
    name: 'Breakfast Sandwich',
    description: 'Egg, cheese, and bacon on a brioche bun',
    price: 7.99,
    imageUrl: '/coffee/express.png',
  },
  {
    id: '13',
    path_id: 'quiche-lorraine',
    name: 'Quiche Lorraine',
    description: 'Classic French quiche with bacon and cheese',
    price: 9.99,
    imageUrl: '/coffee/mochiato.png',
  },
  
  // Desserts
  {
    id: '14',
    path_id: 'tiramisu',
    name: 'Tiramisu', 
    description: 'Italian dessert with coffee-soaked ladyfingers',
    price: 6.99,
    imageUrl: '/coffee/mugcoffe.png',
  },
  {
    id: '15',
    path_id: 'chocolate-cake',
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with ganache frosting',
    price: 5.99,
    imageUrl: '/coffee/flat-white.png',
  },
  {
    id: '16',
    path_id: 'cheesecake',
    name: 'Cheesecake',
    description: 'Creamy New York style cheesecake',
    price: 6.49,
    imageUrl: '/coffee/express.png',
  },
];

export const placeholderCategories: Category[] = [
    {
      id: "beverages",
      name: "Beverages",
      imageUrl: "/coffee/express.png",
      itemIds: placeholderItem
        .filter(item => ["Espresso", "Flat White", "Macchiato", "Mug Coffee", "Cappuccino", "Latte", "Green Tea", "Chai Latte", "Earl Grey"]
        .includes(item.name))
        .map(item => item.id),
    },
    {
      id: "lunch",
      name: "Lunch & Snacks",
      imageUrl: "/food/food.png",
      itemIds: placeholderItem
        .filter(item => ["Croissant", "Avocado Toast", "Breakfast Sandwich", "Quiche Lorraine"]
        .includes(item.name))
        .map(item => item.id),
    },
    {
      id: "desserts",
      name: "Desserts",
      imageUrl: "/dessert/glace.png",
      itemIds: placeholderItem
        .filter(item => ["Tiramisu", "Chocolate Cake", "Cheesecake"]
        .includes(item.name))
        .map(item => item.id),
    },
];
  