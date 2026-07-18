import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminExpense {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  paidBy: string;
  mode: SuperadminExpenseMode;
}
export type SuperadminExpenseMode = 'cash' | 'upi' | 'card' | 'bank';
