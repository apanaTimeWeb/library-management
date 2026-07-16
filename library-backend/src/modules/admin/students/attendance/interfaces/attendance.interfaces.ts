export interface IAttendanceRecord {
  id: string;
}

export interface IAttendancesPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
