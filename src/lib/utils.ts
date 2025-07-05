import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Pagination utility function
export function paginateData<T>(
  data: T[], 
  page: number, 
  perPage: number
): { items: T[]; total: number; totalPages: number } {
  const total = data.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;
  
  return {
    items: data.slice(start, end),
    total,
    totalPages
  };
}
