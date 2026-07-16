export type SuperadminExpenseMode = 'cash' | 'upi' | 'card' | 'bank';

export interface SuperadminExpense {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  paidBy: string;
  mode: SuperadminExpenseMode;
}
