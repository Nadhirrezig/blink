// API contracts for order submission and related payloads

export interface OrderPayload {
  pointId: string;
  itemTag: string;
  quantity: number;
  mode: 'onsite' | 'takeaway';
  size: 's' | 'm' | 'l';
  sugar: 0 | 1 | 2 | 3;
  total: number;
  barista?: string | null;
  strength?: 'light' | 'medium' | 'strong';
  note?: string;
  syrup?: string | null;
  additives?: string[];
} 