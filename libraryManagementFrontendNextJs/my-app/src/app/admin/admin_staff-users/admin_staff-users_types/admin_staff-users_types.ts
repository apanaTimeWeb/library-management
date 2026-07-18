

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'staff';
  tenantId: string;
  branchId: string;
  isActive: boolean;
  joinedDate?: string;
}
export interface CreateUserDto {
  fullName: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'staff';
  branchId: string;
}
export interface UpdateUserDto extends Partial<CreateUserDto> {
  isActive?: boolean;
}

// RESPONSIBILITY: Renders the admin_staff-users_types.ts component/hook.
