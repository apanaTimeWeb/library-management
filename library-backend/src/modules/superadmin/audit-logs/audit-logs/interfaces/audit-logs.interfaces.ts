export interface IAuditLogRecord {
  id: string;
}

export interface IAuditLogsPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
