export interface IBulkImportRecord {
  id: string;
}

export interface IBulkImportsPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
