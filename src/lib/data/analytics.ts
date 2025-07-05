import { Analytics } from '@/lib/definitions';
import { placeholderAnalytics } from '@/lib/placeholder-data';

// Development toggle for simulating errors
const simulateError = false;
const simulateNetworkDelay = 500; // ms

export async function fetchAnalytics(profileId: string): Promise<Analytics> {
  await new Promise((res) => setTimeout(res, simulateNetworkDelay));
  
  if (simulateError) {
    throw new Error('Failed to fetch analytics');
  }
  
  // In real implementation, this would aggregate data from orders, items, etc.
  // For now, return the first analytics object
  return placeholderAnalytics[0] || {
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    topItems: [],
    orderTrends: []
  };
}

export async function fetchAnalyticsByDateRange(
  profileId: string, 
  startDate: Date, 
  endDate: Date
): Promise<Analytics> {
  await new Promise((res) => setTimeout(res, simulateNetworkDelay));
  
  if (simulateError) {
    throw new Error('Failed to fetch analytics by date range');
  }
  
  // In real implementation, this would filter data by date range
  return placeholderAnalytics[0] || {
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    topItems: [],
    orderTrends: []
  };
}

export async function fetchRevenueAnalytics(profileId: string): Promise<{
  totalRevenue: number;
  averageOrderValue: number;
  revenueTrend: number;
}> {
  await new Promise((res) => setTimeout(res, simulateNetworkDelay));
  
  if (simulateError) {
    throw new Error('Failed to fetch revenue analytics');
  }
  
  const analytics = placeholderAnalytics[0];
  return {
    totalRevenue: analytics?.totalRevenue || 0,
    averageOrderValue: analytics?.averageOrderValue || 0,
    revenueTrend: 12.5 // Mock trend percentage
  };
} 