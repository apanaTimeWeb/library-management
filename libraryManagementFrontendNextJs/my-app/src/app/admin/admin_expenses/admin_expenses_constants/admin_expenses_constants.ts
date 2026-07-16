// RESPONSIBILITY: Centralized constants and mock data for admin_expenses (`Rule 3`, `Rule 35`).
// DATA FLOW: Constants -> Store and Components.

import { ExpenseRecord } from '@/app/admin/admin_expenses/admin_expenses_types/admin_expenses_types';

export const MOCK_EXPENSES: ExpenseRecord[] = [
  { id: 'E1', date: '2025-10-01', category: 'Electricity', recordedBy: 'Admin', amount: 5000, status: 'Approved', branch: 'Library A' },
  { id: 'E2', date: '2025-10-02', category: 'Stationery', recordedBy: 'Manager Rahul', amount: 450, status: 'Pending', branch: 'Library A' },
  { id: 'E3', date: '2025-10-03', category: 'Maintenance', recordedBy: 'Manager Priya', amount: 1200, status: 'Approved', branch: 'Library B' },
  { id: 'E4', date: '2025-10-04', category: 'Internet', recordedBy: 'Admin', amount: 1500, status: 'Approved', branch: 'All Branches' },
  { id: 'E5', date: '2025-10-05', category: 'Cleaning', recordedBy: 'Manager Rahul', amount: 300, status: 'Approved', branch: 'Library A' },
];
