// RESPONSIBILITY: Renders or handles logic for SuperadminExpensesConstants.ts.
import type { SuperadminExpense } from '@/app/superadmin/superadmin_accounting/expenses/superadmin_expenses_types/SuperadminExpensesTypes';

export const SUPERADMIN_EXPENSES_CATEGORIES = [
  'Electricity', 
  'Maintenance', 
  'Stationery', 
  'Internet', 
  'Cleaning', 
  'Miscellaneous', 
  'Rent', 
  'Salary'
];

export const SUPERADMIN_EXPENSES_MOCK_DATA: SuperadminExpense[] = [
  { id: 1, date: '2026-04-01', category: 'Electricity',   description: 'Monthly electricity bill',    amount: 4200,  paidBy: 'Manager', mode: 'bank' },
  { id: 2, date: '2026-04-03', category: 'Maintenance',   description: 'AC servicing — Hall A',       amount: 1800,  paidBy: 'Staff',   mode: 'cash' },
  { id: 3, date: '2026-04-05', category: 'Stationery',    description: 'Registers & pens',            amount: 650,   paidBy: 'Manager', mode: 'cash' },
  { id: 4, date: '2026-04-08', category: 'Internet',      description: 'Broadband monthly plan',      amount: 2200,  paidBy: 'Admin',   mode: 'upi'  },
  { id: 5, date: '2026-04-10', category: 'Cleaning',      description: 'Housekeeping supplies',       amount: 900,   paidBy: 'Staff',   mode: 'cash' },
  { id: 6, date: '2026-04-12', category: 'Miscellaneous', description: 'Courier charges',             amount: 320,   paidBy: 'Manager', mode: 'upi'  },
];

