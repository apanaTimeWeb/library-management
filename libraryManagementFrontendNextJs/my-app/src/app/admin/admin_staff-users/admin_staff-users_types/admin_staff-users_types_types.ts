import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
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
