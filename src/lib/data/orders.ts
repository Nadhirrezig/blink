import { Order } from '@/lib/definitions';
import { placeholderOrders } from '@/lib/placeholder-data';
import { paginateData } from '@/lib/utils';

// Development toggle for simulating errors
const simulateError = false;
const simulateNetworkDelay = 500; // ms

export async function fetchOrders(profileId: string): Promise<Order[]> {
  await new Promise((res) => setTimeout(res, simulateNetworkDelay));
  
  if (simulateError) {
    throw new Error('Failed to fetch orders');
  }
  
  // Filter orders by profile (in real implementation, this would be a DB query)
  return placeholderOrders.filter(order => order.profileId === profileId);
}

export async function fetchOrderById(orderId: string): Promise<Order | null> {
  await new Promise((res) => setTimeout(res, simulateNetworkDelay));
  
  if (simulateError) {
    throw new Error('Failed to fetch order');
  }
  
  const order = placeholderOrders.find(order => order.orderId === orderId);
  return order || null;
}

export async function fetchPaginatedOrders(
  profileId: string, 
  page: number, 
  perPage: number
): Promise<{ orders: Order[]; total: number; totalPages: number }> {
  await new Promise((res) => setTimeout(res, simulateNetworkDelay));
  
  if (simulateError) {
    throw new Error('Failed to fetch paginated orders');
  }
  
  // Filter orders by profile
  const profileOrders = placeholderOrders.filter(order => order.profileId === profileId);
  
  // Use pagination utility
  const { items: orders, total, totalPages } = paginateData(profileOrders, page, perPage);
  
  return {
    orders,
    total,
    totalPages
  };
}

export async function fetchOrdersByStatus(
  profileId: string, 
  status: string
): Promise<Order[]> {
  await new Promise((res) => setTimeout(res, simulateNetworkDelay));
  
  if (simulateError) {
    throw new Error('Failed to fetch orders by status');
  }
  
  return placeholderOrders.filter(
    order => order.profileId === profileId && order.status === status
  );
}

export async function fetchRecentOrders(profileId: string, limit: number = 10): Promise<Order[]> {
  await new Promise((res) => setTimeout(res, simulateNetworkDelay));
  
  if (simulateError) {
    throw new Error('Failed to fetch recent orders');
  }
  
  const profileOrders = placeholderOrders.filter(order => order.profileId === profileId);
  
  // Sort by creation date (newest first) and limit
  return profileOrders
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
} 