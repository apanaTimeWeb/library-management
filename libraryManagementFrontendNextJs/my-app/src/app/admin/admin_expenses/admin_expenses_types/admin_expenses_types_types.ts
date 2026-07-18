import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface ExpenseRecord {
  id: string;
  date: string;
  category: string;
  recordedBy: string;
  amount: number;
  status: string;
  branch: string;
}
export interface AdminExpensesStoreState {
  expenses: ExpenseRecord[];
  fetchState: FetchState;
  errorMessage: string | null;
  fetchExpenses: () => Promise<void>;
  setExpenses: (expenses: ExpenseRecord[]) => void;
  setFetchState: (state: FetchState) => void;
}
export type FetchState = 'idle' | 'loading' | 'success' | 'error';
