import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface ReceiptData {
  receiptNo: string; 
  studentName: string; 
  studentId: string;
  phone: string; 
  total: number; 
  mode: Mode; 
  date: string; 
  waMessage: string;
  student: typeof ADMIN_FINANCE_MOCK_STUDENTS[0]; 
  amount: number; 
  lateFee: number;
  couponDiscount: number; 
  txnId: string; 
  remark: string;
}
export type Mode = typeof ADMIN_FINANCE_MODES[number];
