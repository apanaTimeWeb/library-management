export interface IPaymentRecord {
  id: string;
}

export interface IPaymentsPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
