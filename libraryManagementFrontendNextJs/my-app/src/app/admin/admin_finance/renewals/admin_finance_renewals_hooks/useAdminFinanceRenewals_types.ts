import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export type FilterType = 'expired' | 'expiring_7' | 'expiring_15';
export type Renewal = {
  id: number;
  studentName: string;
  smartId: string;
  shift: string;
  plan: string;
  planId: number;
  expiryDate: string;
  daysLeft: number;
  lastPaymentDate: string;
  due: number;
  total: number;
};
