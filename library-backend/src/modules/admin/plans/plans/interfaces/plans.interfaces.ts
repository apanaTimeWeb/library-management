export interface PlansIPlanRecord {
  id: string;
  name: string;
  price: number;
  duration: string;
  durationDays: number;
  features: string[];
  status: 'Active' | 'Inactive';
  subscribers: number;
}

export interface PlansIPlansPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
