import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface AdminReusablePayment {
  name: string;
  initials: string;
  amount: string;
  mode: 'UPI' | 'Cash' | 'Card' | 'Bank Transfer';
  timeAgo: string;
  studentId?: string;
}
