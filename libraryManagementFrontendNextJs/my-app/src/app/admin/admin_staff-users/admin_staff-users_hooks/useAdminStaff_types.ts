import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Admin' | 'Manager' | 'Staff';
  branch: string;
  status: 'Active' | 'Inactive';
  joinedDate: string;
}
export interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roleId: string;
  branchId: string;
}
