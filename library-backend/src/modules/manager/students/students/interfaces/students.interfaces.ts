export interface IStudentRecord {
  id: string;
}

export interface IStudentsPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
