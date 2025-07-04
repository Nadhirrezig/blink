import type { Owner, Profile, Category, MenuItem, Table, Waiter, StockItem, Post, Review, Order , Analytics } from './definitions';

// --- Coffee Shop Data ---
const coffeeMenuItems: MenuItem[] = [
  {
    itemId: 'coffee-1',
    name: 'Espresso',
    description: 'Rich and bold single shot of pure coffee essence',
    price: 3.99,
    costPrice: 1.2,
    stockQty: 100,
    isAvailable: true,
    imageUrl: '/coffee/express.png',
  },
  {
    itemId: 'coffee-2',
    name: 'Flat White',
    description: 'Smooth espresso with velvety microfoam milk',
    price: 4.99,
    costPrice: 1.5,
    stockQty: 80,
    isAvailable: true,
    imageUrl: '/coffee/flat-white.png',
  },
  {
    itemId: 'coffee-3',
    name: 'Mochiato',
    description: 'Espresso with a touch of frothy milk',
    price: 4.49,
    costPrice: 1.3,
    stockQty: 90,
    isAvailable: true,
    imageUrl: '/coffee/mochiato.png',
  },
  {
    itemId: 'coffee-4',
    name: 'Americano',
    description: 'Diluted espresso with hot water',
    price: 3.49,
    costPrice: 1.0,
    stockQty: 100,
    isAvailable: true,
    imageUrl: '/coffee/mugcoffe.png',
  },
  {
    itemId: 'coffee-5',
    name: 'Cold Brew',
    description: 'Smooth cold-brewed coffee',
    price: 4.99,
    costPrice: 1.5,
    stockQty: 70,
    isAvailable: true,
    imageUrl: '/coffee/mugcoffe.png',
  },
];

const lunchMenuItems: MenuItem[] = [
  {
    itemId: 'lunch-1',
    name: 'Club Sandwich',
    description: 'Triple-decker sandwich with turkey, bacon, lettuce, and tomato',
    price: 12.99,
    costPrice: 4.5,
    stockQty: 30,
    isAvailable: true,
    imageUrl: '/food/food.png',
  },
  {
    itemId: 'lunch-2',
    name: 'Caesar Salad',
    description: 'Crisp romaine, parmesan, croutons, and Caesar dressing',
    price: 8.99,
    costPrice: 2.5,
    stockQty: 40,
    isAvailable: true,
    imageUrl: '/food/food.png',
  },
];

const dessertMenuItems: MenuItem[] = [
  {
    itemId: 'dessert-1',
    name: 'Ice Cream Sundae',
    description: 'Vanilla ice cream with chocolate sauce and nuts',
    price: 6.99,
    costPrice: 2.0,
    stockQty: 50,
    isAvailable: true,
    imageUrl: '/dessert/glace.png',
  },
];

const coffeeCategories: Category[] = [
  {
    catId: 'coffee-cat-1',
    name: 'Beverages',
    description: 'Our signature coffee drinks',
    imageUrl: '/coffee/express.png',
    items: coffeeMenuItems,
  },
  {
    catId: 'coffee-cat-2',
    name: 'Lunch & Food',
    description: 'Delicious lunch options',
    imageUrl: '/food/food.png',
    items: lunchMenuItems,
  },
  {
    catId: 'coffee-cat-3',
    name: 'Desserts',
    description: 'Sweet treats',
    imageUrl: '/dessert/glace.png',
    items: dessertMenuItems,
  },
];
const coffeeTables: Table[] = [
  {
    tableId: 'coffee-table-1',
    profileId: 'profile-1',
    tableNumber: 1,
    status: 'Free',
    currentOrderId: '',
  },
];
const coffeeWaiters: Waiter[] = [
  {
    waiterId: 'coffee-waiter-1',
    profileId: 'profile-1',
    name: 'Alice',
    pin: '1234',
  },
];
const coffeeStock: StockItem[] = [
  {
    itemId: 'coffee-1',
    name: 'Espresso Beans',
    quantity: 50,
    threshold: 10,
  },
];
const coffeePosts: Post[] = [
  {
    postId: 'coffee-post-1',
    profileId: 'profile-1',
    content: 'Welcome to our new menu!',
    createdAt: new Date(),
  },
];
const coffeeReviews: Review[] = [
  {
    reviewId: 'coffee-review-1',
    profileId: 'profile-1',
    rating: 5,
    comment: 'Great coffee and service!',
    createdAt: new Date(),
  },
];
const coffeeAnalytics: Analytics = {
  totalRevenue: 1000,
  totalOrders: 200,
  averageOrderValue: 5,
  topItems: coffeeMenuItems,
  orderTrends: [
    { item: coffeeMenuItems[0], orderCount: 120 },
    { item: coffeeMenuItems[1], orderCount: 80 },
  ],
};
const coffeeOrders: Order[] = [
  {
    orderId: 'coffee-order-1',
    profileId: 'profile-1',
    tableId: 'coffee-table-1',
    waiterId: 'coffee-waiter-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [
      {
        itemId: 'coffee-1',
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

// --- Restaurant Data ---
const restoMenuItems: MenuItem[] = [
  {
    itemId: 'resto-1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato, mozzarella, and basil',
    price: 12.99,
    costPrice: 4.5,
    stockQty: 30,
    isAvailable: true,
    imageUrl: '/food/food.png',
  },
  {
    itemId: 'resto-2',
    name: 'Caesar Salad',
    description: 'Crisp romaine, parmesan, croutons, and Caesar dressing',
    price: 8.99,
    costPrice: 2.5,
    stockQty: 40,
    isAvailable: true,
    imageUrl: '/food/food.png',
  },
];
const restoCategories: Category[] = [
  {
    catId: 'resto-cat-1',
    name: 'Main Courses',
    description: 'Our signature main courses',
    imageUrl: '/food/food.png',
    items: [restoMenuItems[0]],
  },
  {
    catId: 'resto-cat-2',
    name: 'Salads',
    description: 'Our signature salads',
    imageUrl: '/food/food.png',
    items: [restoMenuItems[1]],
  },
];
const restoTables: Table[] = [
  {
    tableId: 'resto-table-1',
    profileId: 'profile-2',
    tableNumber: 1,
    status: 'Free',
    currentOrderId: '',
  },
  {
    tableId: 'resto-table-2',
    profileId: 'profile-2',
    tableNumber: 2,
    status: 'Occupied',
    currentOrderId: 'resto-order-1',
  },
];
const restoWaiters: Waiter[] = [
  {
    waiterId: 'resto-waiter-1',
    profileId: 'profile-2',
    name: 'Bob',
    pin: '5678',
  },
];
const restoStock: StockItem[] = [
  {
    itemId: 'resto-1',
    name: 'Pizza Dough',
    quantity: 20,
    threshold: 5,
  },
  {
    itemId: 'resto-2',
    name: 'Romaine Lettuce',
    quantity: 15,
    threshold: 3,
  },
];
const restoPosts: Post[] = [
  {
    postId: 'resto-post-1',
    profileId: 'profile-2',
    content: 'Try our new Caesar Salad!',
    createdAt: new Date(),
  },
];
const restoReviews: Review[] = [
  {
    reviewId: 'resto-review-1',
    profileId: 'profile-2',
    rating: 4,
    comment: 'Delicious pizza, will come again!',
    createdAt: new Date(),
  },
];
const restoAnalytics: Analytics = {
  totalRevenue: 2500,
  totalOrders: 350,
  averageOrderValue: 10,
  topItems: restoMenuItems,
  orderTrends: [
    { item: restoMenuItems[0], orderCount: 200 },
    { item: restoMenuItems[1], orderCount: 150 },
  ],
};
const restoOrders: Order[] = [
  {
    orderId: 'resto-order-1',
    profileId: 'profile-2',
    tableId: 'resto-table-2',
    waiterId: 'resto-waiter-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [
      {
        itemId: 'resto-1',
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

// --- Profiles ---
const profiles: Profile[] = [
  {
    profileId: 'profile-1',
    ownerId: 'owner-1',
    name: 'Locca Coffee',
    description: 'Trendy coffee shop',
    location: '123 Main St',
    coordX: 40.7128,
    coordY: -74.0060,
    phone: '123-456-7890',
    email: 'Locca@coffee.com',
    team: coffeeWaiters,
    menu: coffeeCategories,
    tables: coffeeTables,
    stock: coffeeStock,
    posts: coffeePosts,
    reviews: coffeeReviews,
  },
  {
    profileId: 'profile-2',
    ownerId: 'owner-1',
    name: 'Gusto Bistro',
    description: 'Cozy Italian restaurant',
    location: '456 Elm St',
    coordX: 41.1234,
    coordY: -73.9876,
    phone: '987-654-3210',
    email: 'contact@gustobistro.com',
    team: restoWaiters,
    menu: restoCategories,
    tables: restoTables,
    stock: restoStock,
    posts: restoPosts,
    reviews: restoReviews,
  },
];

// --- Owners ---
export const owners: Owner[] = [
  {
    userId: 'owner-1',
    name: 'Nadhir rezig',
    email: 'rzignadhir56@gmail.com',
    phoneNumber: '123-456-7890',
    passwordHash: 'hashedpassword',
    lastLogin: new Date(),
    subscriptionPlan: 'Premium',
    profiles: [profiles[0] , profiles[1]],
  },
];
// Export other sample data for testing
export const placeholderProfiles = profiles;
export const placeholderCategories = [...coffeeCategories, ...restoCategories];
export const placeholderMenuItems = [...coffeeMenuItems, ...restoMenuItems];
export const placeholderTables = [...coffeeTables, ...restoTables];
export const placeholderWaiters = [...coffeeWaiters, ...restoWaiters];
export const placeholderStock = [...coffeeStock, ...restoStock];
export const placeholderPosts = [...coffeePosts, ...restoPosts];
export const placeholderReviews = [...coffeeReviews, ...restoReviews];
export const placeholderAnalytics = [coffeeAnalytics, restoAnalytics];
export const placeholderOrders = [...coffeeOrders, ...restoOrders];
  