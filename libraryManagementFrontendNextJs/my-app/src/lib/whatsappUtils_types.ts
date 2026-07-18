import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface StudentWhatsAppData {
  name: string;
  smartId: string;
  phone: string;
  parentPhone?: string;
  shift: string;
  seat: string;
  locker: string;
  plan: string;
  amountPaid: number;
  totalPayable: number;
  discount: number;
  paymentMode: string;
  transactionId?: string;
  joinDate: string;
  expiryDate: string;
  branch?: string;
}
