export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number; 
  details?: string;
}

export type Order = {
  id: string;
  tableNumber: number;
  orderCode: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: 'pending' | 'preparing' | 'served' | 'paid' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
}

export type MenuItem = {
  id: string;
  path_id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  isAvailable?: boolean;  
  tags?: string[];      
  categoryId?: string;
}

export type MenuSection = {
  id: string;
  name: string;
  items: MenuItem[];
}

export type TableData<T> = {
  data: T[];
  total: number;
}

export type Category = {
  id: string;
  name: string;
  imageUrl: string;
  itemIds: string[];
}

export type Point = {
  id: string;
  name: string;
  categories: Category[];
}
