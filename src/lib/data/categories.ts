import { Category } from '@/lib/definitions';
import { placeholderCategories } from '@/lib/placeholder-data';

// Development toggle for simulating errors
const simulateError = false;
const simulateNetworkDelay = 500; // ms

export async function fetchCategories(profileId: string): Promise<Category[]> {
  await new Promise((res) => setTimeout(res, simulateNetworkDelay));
  
  if (simulateError) {
    throw new Error('Failed to fetch categories');
  }
  
  // Filter categories by profile (in real implementation, this would be a DB query)
  // For now, return all placeholder categories
  return placeholderCategories;
}

export async function fetchCategoryById(categoryId: string): Promise<Category | null> {
  await new Promise((res) => setTimeout(res, simulateNetworkDelay));
  
  if (simulateError) {
    throw new Error('Failed to fetch category');
  }
  
  const category = placeholderCategories.find(cat => cat.catId === categoryId);
  return category || null;
}

export async function fetchCategoriesWithItems(profileId: string): Promise<Category[]> {
  await new Promise((res) => setTimeout(res, simulateNetworkDelay));
  
  if (simulateError) {
    throw new Error('Failed to fetch categories with items');
  }
  
  // Return categories with their items populated
  return placeholderCategories;
} 