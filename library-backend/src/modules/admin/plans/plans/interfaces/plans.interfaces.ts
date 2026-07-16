export interface IPlanRecord {
  id: string;
  name: string;
  price: number;
  duration: string;
  durationDays: number;
  features: string[];
  status: 'Active' | 'Inactive';
  subscribers: number;
}

export interface IPlansPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
