export interface IDocumentRecord {
  id: string;
}

export interface IDocumentsPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
