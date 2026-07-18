export interface IBillingRecord {
  id: string;
}

export interface IBillingsPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
