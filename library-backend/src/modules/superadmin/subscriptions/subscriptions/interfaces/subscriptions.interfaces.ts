export interface ISubscriptionRecord {
  id: string;
}

export interface ISubscriptionsPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
