import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface Payment {
  id: number;
  receiptNumber: string;
  date: string;
  studentName: string;
  smartId: string;
  amount: number;
  mode: PaymentMode;
  txnId?: string;
  lateFee: number;
  receivedBy: string;
  remark?: string;
  status: PaymentStatus;
  deletionReason?: string;
}
export type PaymentMode = 'cash' | 'upi' | 'card' | 'bank';
export type PaymentStatus = 'valid' | 'deleted';
