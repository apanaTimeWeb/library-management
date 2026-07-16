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
  data: IUser[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
