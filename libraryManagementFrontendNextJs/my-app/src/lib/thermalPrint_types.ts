import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface ThermalBillData {
  type: 'idcard' | 'receipt' | 'dues';
  shopName?: string;
  branch?: string;
  studentName: string;
  smartId: string;
  phone: string;
  shift?: string;
  seat?: string;
  locker?: string;
  plan?: string;
  joinDate?: string;
  expiryDate?: string;
  billNumber?: string;
  date?: string;
  totalPayable?: number;
  amountPaid?: number;
  discount?: number;
  balance?: number;
  paymentMode?: string;
  transactionId?: string;
}
