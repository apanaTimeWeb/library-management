// RESPONSIBILITY: Type definitions for admin_expenses (`Rule 7`, `Rule 27`, `Rule 44`).
// DATA FLOW: Types imported by Store, Hooks, and Client Component.

export type FetchState = 'idle' | 'loading' | 'success' | 'error';

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
