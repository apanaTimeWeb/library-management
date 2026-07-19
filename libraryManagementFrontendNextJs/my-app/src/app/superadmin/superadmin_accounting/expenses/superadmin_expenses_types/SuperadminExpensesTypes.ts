// RESPONSIBILITY: Renders or handles logic for SuperadminExpensesTypes.ts.


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

