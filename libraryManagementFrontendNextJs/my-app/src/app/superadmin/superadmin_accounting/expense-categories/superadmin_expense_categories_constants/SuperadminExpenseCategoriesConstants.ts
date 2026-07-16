import type { SuperadminExpenseCategory } from '@/app/superadmin/superadmin_accounting/expense-categories/superadmin_expense_categories_types/SuperadminExpenseCategoriesTypes';

export const SUPERADMIN_EXPENSE_CATEGORIES_COLORS = [
  'var(--primary)', 
  'var(--success)', 
  'var(--warning)', 
  'var(--danger)', 
  'var(--info)'
];

export const SUPERADMIN_EXPENSE_CATEGORIES_MOCK_DATA: SuperadminExpenseCategory[] = [
  { id: 1, name: 'Electricity',   budget: 5000,  spent: 4200,  color: 'var(--warning)' },
  { id: 2, name: 'Maintenance',   budget: 4000,  spent: 3600,  color: 'var(--danger)' },
  { id: 3, name: 'Internet',      budget: 2500,  spent: 2200,  color: 'var(--info)' },
  { id: 4, name: 'Salary',        budget: 15000, spent: 12000, color: 'var(--primary)' },
  { id: 5, name: 'Stationery',    budget: 1000,  spent: 650,   color: 'var(--success)' },
  { id: 6, name: 'Cleaning',      budget: 1200,  spent: 900,   color: 'var(--info)' },
];
