export interface IUserRecord {
  id: string;
}

export interface IUsersPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
