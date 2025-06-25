export interface OrderItem {
    name: string;
    quantity: number;
    details?: string;
}
  
export interface Order {
    id: string;
    tableNumber: number;
    orderCode: string;
    items: OrderItem[];
    subtotal: number;
    discount: number;
    total: number;
    status: 'pending' | 'paid';
}
  
export interface TableData {
  data: Order[];
  total: number;
}
  