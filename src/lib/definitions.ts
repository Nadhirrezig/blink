export type OrderItem = {
    name: string;
    quantity: number;
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
    status: 'pending' | 'paid';
}

export type MenuItem = {
    id: string;
    name: string;
    description?: string;
    price: number;
    imageUrl: string;
}

export type MenuSection = {
    id: string;
    name: string;
    items: MenuItem[];
}

export type TableData = {
  data: Order[];
  total: number;
}
  