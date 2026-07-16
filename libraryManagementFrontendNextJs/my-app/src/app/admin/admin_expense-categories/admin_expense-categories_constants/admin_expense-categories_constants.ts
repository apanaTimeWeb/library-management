// RESPONSIBILITY: Centralized constants and mock data for admin_expense-categories (`Rule 3`, `Rule 35`).
// DATA FLOW: Constants -> Store, Hooks, and Components.

import { ExpenseCategoryRecord } from '@/app/admin/admin_expense-categories/admin_expense-categories_types/admin_expense-categories_types';

export const MOCK_EXPENSE_CATEGORIES: ExpenseCategoryRecord[] = [
  { id: '1', name: 'Electricity', description: 'Monthly electricity and power bills', status: 'Active' },
  { id: '2', name: 'Rent', description: 'Building or property rent', status: 'Active' },
  { id: '3', name: 'Maintenance', description: 'AC repair, plumbing, painting', status: 'Active' },
  { id: '4', name: 'Stationery', description: 'Pens, registers, printer ink, paper', status: 'Active' },
  { id: '5', name: 'Cleaning', description: 'Housekeeping and cleaning supplies', status: 'Active' },
  { id: '6', name: 'Internet', description: 'Broadband and Wi-Fi charges', status: 'Active' },
  { id: '7', name: 'Miscellaneous', description: 'Other unspecified expenses', status: 'Active' },
];
