import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export type AdminAccountingExpenseForm = {
  date: string;
  category: string;
  description: string;
  amount: string;
  paidBy: string;
  mode: string;
  notes: string;
};
