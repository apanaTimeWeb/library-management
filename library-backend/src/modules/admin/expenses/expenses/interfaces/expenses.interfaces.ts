export interface IExpenseRecord {
  id: string;
}

export interface IExpensesPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
