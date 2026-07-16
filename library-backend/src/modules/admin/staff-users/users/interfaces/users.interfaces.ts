export interface UsersIUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsersIUserListResponse {
  data: UsersIUser[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
