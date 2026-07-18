import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminMonthlyReport {
  month: string;
  income: number;
  expense: number;
}
export interface SuperadminCategoryBreakdown {
  category: string;
  amount: number;
  pct: number;
}
