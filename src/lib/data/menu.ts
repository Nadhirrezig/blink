import { MenuItem } from '@/lib/definitions';
import { placeholderMenuItems } from '@/lib/placeholder-data';

// Development toggle for simulating errors
const simulateError = false;
const simulateNetworkDelay = 500; // ms

export async function fetchMenuItems(profileId: string): Promise<MenuItem[]> {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, simulateNetworkDelay));
  
  // Simulate error in development
  if (simulateError) {
    throw new Error('Failed to fetch menu items');
  }
  
  // Filter menu items by profile (in real implementation, this would be a DB query)
  // For now, return all placeholder items
  return placeholderMenuItems;
}

export async function fetchMenuItemById(itemId: string): Promise<MenuItem | null> {
  await new Promise((res) => setTimeout(res, simulateNetworkDelay));
  
  if (simulateError) {
    throw new Error('Failed to fetch menu item');
  }
  
  const item = placeholderMenuItems.find(item => item.itemId === itemId);
  return item || null;
}

export async function fetchMenuItemsByCategory(categoryId: string): Promise<MenuItem[]> {
  await new Promise((res) => setTimeout(res, simulateNetworkDelay));
  
  if (simulateError) {
    throw new Error('Failed to fetch menu items by category');
  }
  
  // In real implementation, this would filter by category
  // For now, return all items
  return placeholderMenuItems;
}

export async function fetchAvailableMenuItems(profileId: string): Promise<MenuItem[]> {
  await new Promise((res) => setTimeout(res, simulateNetworkDelay));
  
  if (simulateError) {
    throw new Error('Failed to fetch available menu items');
  }
  
  // Filter only available items
  return placeholderMenuItems.filter(item => item.isAvailable);
} 