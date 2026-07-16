export interface IComplaintRecord {
  id: string;
}

export interface IComplaintsPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
