import type {
  Owner,
  Profile,
  Category,
  MenuItem,
  Table,
  Waiter,
  StockItem,
  Post,
  Review,
  Order,
  Analytics,
} from './definitions';

// === Universal Menu Items ===
const menuItems1: MenuItem[] = [
  {
    itemId: 'espresso',
    name: 'Espresso',
    description: 'Rich and bold single shot of pure coffee essence',
    price: 3.99,
    costPrice: 1.2,
    stockQty: 100,
    isAvailable: true,
    imageUrl: '/coffee/express.png',
  },
  {
    itemId: 'flat-white',
    name: 'Flat White',
    description: 'Smooth espresso with velvety microfoam milk',
    price: 4.99,
    costPrice: 1.5,
    stockQty: 80,
    isAvailable: true,
    imageUrl: '/coffee/flat-white.png',
  },
  {
    itemId: 'mochiato',
    name: 'Mochiato',
    description: 'Espresso with a touch of frothy milk',
    price: 4.49,
    costPrice: 1.3,
    stockQty: 90,
    isAvailable: true,
    imageUrl: '/coffee/mochiato.png',
  },
  {
    itemId: 'americano',
    name: 'Americano',
    description: 'Diluted espresso with hot water',
    price: 3.49,
    costPrice: 1.0,
    stockQty: 100,
    isAvailable: true,
    imageUrl: '/coffee/mugcoffe.png',
  },
  {
    itemId: 'cold-brew',
    name: 'Cold Brew',
    description: 'Smooth cold-brewed coffee',
    price: 4.99,
    costPrice: 1.5,
    stockQty: 70,
    isAvailable: true,
    imageUrl: '/coffee/mugcoffe.png',
  },
];

const menuItems2: MenuItem[] = [
  {
    itemId: 'margherita-pizza',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato, mozzarella, and basil',
    price: 12.99,
    costPrice: 4.5,
    stockQty: 30,
    isAvailable: true,
    imageUrl: '/food/food.png',
  },
  {
    itemId: 'caesar-salad',
    name: 'Caesar Salad',
    description: 'Crisp romaine, parmesan, croutons, and Caesar dressing',
    price: 8.99,
    costPrice: 2.5,
    stockQty: 40,
    isAvailable: true,
    imageUrl: '/food/food.png',
  },
];

// === Categories ===
const categories1: Category[] = [
  {
    catId: 'cat-1',
    name: 'Beverages',
    description: 'Various drink options',
    imageUrl: '/coffee/express.png',
    items: menuItems1.slice(0, 3), // First 3 items: espresso, flat-white, mochiato
  },
  {
    catId: 'cat-2',
    name: 'Meals',
    description: 'Food & snacks',
    imageUrl: '/food/food.png',
    items: menuItems1.slice(3), // Last 2 items: americano, cold-brew
  },
];

const categories2: Category[] = [
  {
    catId: 'cat-3',
    name: 'Main Courses',
    description: 'Signature dishes',
    imageUrl: '/food/food.png',
    items: menuItems2.slice(0, 1), // First item: margherita-pizza
  },
  {
    catId: 'cat-4',
    name: 'Salads',
    description: 'Fresh & healthy',
    imageUrl: '/food/food.png',
    items: menuItems2.slice(1), // Last item: caesar-salad
  },
];

// === Tables ===
const tables1: Table[] = [
  { tableId: 'table-1', profileId: 'profile-1', tableNumber: 1, status: 'Free', currentOrderId: '' },
];

const tables2: Table[] = [
  { tableId: 'table-2', profileId: 'profile-2', tableNumber: 1, status: 'Free', currentOrderId: '' },
  { tableId: 'table-3', profileId: 'profile-2', tableNumber: 2, status: 'Occupied', currentOrderId: 'order-2' },
];

// === Waiters ===
const waiters1: Waiter[] = [{ waiterId: 'waiter-1', profileId: 'profile-1', name: 'Alice', pin: '1234' }];
const waiters2: Waiter[] = [{ waiterId: 'waiter-2', profileId: 'profile-2', name: 'Bob', pin: '5678' }];

// === Stock ===
const stock1: StockItem[] = [
  { itemId: 'espresso', name: 'Espresso Beans', quantity: 50, threshold: 10 },
];
const stock2: StockItem[] = [
  { itemId: 'margherita-pizza', name: 'Pizza Dough', quantity: 20, threshold: 5 },
  { itemId: 'caesar-salad', name: 'Lettuce', quantity: 15, threshold: 3 },
];

// === Posts ===
const posts1: Post[] = [{ postId: 'post-1', profileId: 'profile-1', content: 'Welcome to our new menu!', createdAt: new Date() }];
const posts2: Post[] = [{ postId: 'post-2', profileId: 'profile-2', content: 'Try our new Caesar Salad!', createdAt: new Date() }];

// === Reviews ===
const reviews1: Review[] = [{ reviewId: 'review-1', profileId: 'profile-1', rating: 5, comment: 'Awesome place!', createdAt: new Date() }];
const reviews2: Review[] = [{ reviewId: 'review-2', profileId: 'profile-2', rating: 4, comment: 'Great pizza!', createdAt: new Date() }];

// === Analytics ===
const analytics1: Analytics = {
  totalRevenue: 1000,
  totalOrders: 200,
  averageOrderValue: 5,
  topItems: menuItems1,
  orderTrends: [
    { item: menuItems1[0], orderCount: 120 },
    { item: menuItems1[1], orderCount: 80 },
  ],
};

const analytics2: Analytics = {
  totalRevenue: 2500,
  totalOrders: 350,
  averageOrderValue: 10,
  topItems: menuItems2,
  orderTrends: [
    { item: menuItems2[0], orderCount: 200 },
    { item: menuItems2[1], orderCount: 150 },
  ],
};

// === Orders ===
const orders1: Order[] = [
  {
    orderId: 'order-1',
    profileId: 'profile-1',
    tableId: 'table-1',
    waiterId: 'waiter-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [
      {
        itemId: 'espresso',
        name: 'Espresso',
        quantity: 2,
        unitPrice: 3.99,
        details: 'No sugar',
      },
    ],
    subtotal: 7.98,
    discount: 0,
    total: 7.98,
    status: 'Paid',
  },
];

const orders2: Order[] = [
  {
    orderId: 'order-2',
    profileId: 'profile-2',
    tableId: 'table-3',
    waiterId: 'waiter-2',
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [
      {
        itemId: 'margherita-pizza',
        name: 'Margherita Pizza',
        quantity: 1,
        unitPrice: 12.99,
        details: 'Extra cheese',
      },
    ],
    subtotal: 12.99,
    discount: 0,
    total: 12.99,
    status: 'Preparing',
  },
];

// === Profiles ===
const profiles: Profile[] = [
  {
    profileId: 'profile-1',
    ownerId: 'owner-1',
    name: 'Locca Place',
    description: 'Trendy spot for quality service',
    location: '123 Main St',
    coordX: 40.7128,
    coordY: -74.006,
    phone: '123-456-7890',
    email: 'locca@example.com',
    team: waiters1,
    menu: categories1,
    tables: tables1,
    stock: stock1,
    posts: posts1,
    reviews: reviews1,
  },
  {
    profileId: 'profile-2',
    ownerId: 'owner-1',
    name: 'Gusto Place',
    description: 'Italian flair, great service',
    location: '456 Elm St',
    coordX: 41.1234,
    coordY: -73.9876,
    phone: '987-654-3210',
    email: 'gusto@example.com',
    team: waiters2,
    menu: categories2,
    tables: tables2,
    stock: stock2,
    posts: posts2,
    reviews: reviews2,
  },
];

// === Owners ===
export const owners: Owner[] = [
  {
    userId: 'owner-1',
    name: 'Nadhir Rezig',
    email: 'rzignadhir56@gmail.com',
    phoneNumber: '123-456-7890',
    passwordHash: 'hashedpassword',
    lastLogin: new Date(),
    subscriptionPlan: 'Premium',
    profiles,
  },
];

// === Exports ===
export const placeholderProfiles = profiles;
export const placeholderCategories = [...categories1, ...categories2];
export const placeholderMenuItems = [...menuItems1, ...menuItems2];
export const placeholderTables = [...tables1, ...tables2];
export const placeholderWaiters = [...waiters1, ...waiters2];
export const placeholderStock = [...stock1, ...stock2];
export const placeholderPosts = [...posts1, ...posts2];
export const placeholderReviews = [...reviews1, ...reviews2];
export const placeholderAnalytics = [analytics1, analytics2];
export const placeholderOrders = [...orders1, ...orders2];
