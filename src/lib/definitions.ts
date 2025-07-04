// ---- ENUMS ----
export type OrderStatus = 'Pending' | 'Preparing' | 'Served' | 'Paid' | 'Cancelled';
export type TableStatus = 'Free' | 'Occupied' | 'Reserved' | 'Cleaning';

// ---- OWNER ----
export interface Owner {
  userId: string; // UUID
  name: string;
  email: string;
  phoneNumber: string;
  passwordHash: string;
  lastLogin: Date;
  subscriptionPlan: string;
  profiles: Profile[];
}

// ---- PROFILE ----
export interface Profile {
  profileId: string; // UUID
  ownerId: string; // UUID
  name: string;
  description: string;
  location: string;
  coordX: number; // maps
  coordY: number; // maps
  phone: string;
  email: string;
  team: Waiter[];
  menu: Category[];
  tables: Table[];
  stock: StockItem[];
  posts: Post[];
  reviews: Review[];
}

// ---- CATEGORY & MENU ITEM ----
export interface Category {
  catId: string; // UUID
  name: string;
  description?: string;
  imageUrl: string;
  items: MenuItem[];
}

export interface MenuItem {
  itemId: string; // UUID
  name: string;
  description: string;
  price: number;
  costPrice: number;
  stockQty: number;
  isAvailable: boolean;
  imageUrl: string;
}

// ---- ORDER ----
export interface Order {
  orderId: string; // UUID
  profileId: string; // UUID
  tableId: string; // UUID
  waiterId?: string; // UUID
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: OrderStatus;
}

export interface OrderItem {
  itemId: string; // UUID
  name: string;
  quantity: number;
  unitPrice: number;
  details: string;
}

// ---- TABLE ----
export interface Table {
  tableId: string; // UUID
  profileId: string; // UUID
  tableNumber: number;
  status: TableStatus;
  currentOrderId: string;
}

// ---- WAITER ----
export interface Waiter {
  waiterId: string; // UUID
  profileId: string; // UUID
  name: string;
  pin: string;
}

// ---- STOCK ----
export interface StockItem {
  itemId: string; // UUID
  name: string;
  quantity: number;
  threshold: number;
}

// ---- POSTS & REVIEWS ----
export interface Post {
  postId: string; // UUID
  profileId: string; // UUID
  content: string;
  imageUrl?: string;
  createdAt: Date;
}

export interface Review {
  reviewId: string; // UUID
  profileId: string; // UUID
  rating: number;
  comment: string;
  createdAt: Date;
}

// ---- ANALYTICS ----
export interface Analytics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  topItems: MenuItem[];
  orderTrends: MostOrderedItemTrend[];
}

export interface MostOrderedItemTrend {
  item: MenuItem;
  orderCount: number;
}
