import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  manager: string;
  students: number;
  seats: number;
  status: 'Active' | 'Inactive';
}
export interface FormState {
  name: string;
  address: string;
  city: string;
  phone: string;
  manager: string;
  seats: string;
}
