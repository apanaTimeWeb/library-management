import { ManagerFinanceTransaction, ManagerFinanceInvoice, ManagerFinanceStats } from '@/app/manager/manager_finance/manager_finance_types/manager_finance_types';

export const FINANCE_STATS_MOCK: ManagerFinanceStats = {
  todayRevenue: 15400,
  thisMonthRevenue: 342500,
  pendingDues: 45000,
  activeSubscriptions: 184
};

export const RECENT_TRANSACTIONS_MOCK: ManagerFinanceTransaction[] = [
  { id: '1', transactionId: 'TXN-001', studentName: 'Alex Rivera', studentId: 'LIB-001', amount: 1500, date: 'Today, 10:30 AM', method: 'UPI', status: 'Completed', feeType: 'Monthly' },
  { id: '2', transactionId: 'TXN-002', studentName: 'Priya Sharma', studentId: 'LIB-002', amount: 500, date: 'Today, 09:15 AM', method: 'Cash', status: 'Completed', feeType: 'Fine' },
  { id: '3', transactionId: 'TXN-003', studentName: 'Rohan Mehta', studentId: 'LIB-003', amount: 2000, date: 'Yesterday', method: 'Card', status: 'Failed', feeType: 'Admission' },
  { id: '4', transactionId: 'TXN-004', studentName: 'Sneha Patel', studentId: 'LIB-004', amount: 1500, date: 'Yesterday', method: 'UPI', status: 'Completed', feeType: 'Monthly' },
];

export const INVOICES_MOCK: ManagerFinanceInvoice[] = [
  { id: '1', invoiceNumber: 'INV-2024-001', studentName: 'Alex Rivera', studentId: 'LIB-001', amount: 1500, dueDate: '2024-10-31', status: 'Paid', items: [{ description: 'Monthly Fee (Nov)', amount: 1500 }] },
  { id: '2', invoiceNumber: 'INV-2024-002', studentName: 'Vikram Rao', studentId: 'LIB-005', amount: 2500, dueDate: '2024-10-15', status: 'Overdue', items: [{ description: 'Monthly Fee (Oct)', amount: 1500 }, { description: 'Locker Fee', amount: 1000 }] },
  { id: '3', invoiceNumber: 'INV-2024-003', studentName: 'Ananya Gupta', studentId: 'LIB-006', amount: 1500, dueDate: '2024-11-05', status: 'Unpaid', items: [{ description: 'Monthly Fee (Nov)', amount: 1500 }] },
];

export const STATUS_COLORS = {
  Completed: 'bg-success-bg text-success',
  Pending: 'bg-warning-bg text-warning',
  Failed: 'bg-danger-bg text-danger',
  Refunded: 'bg-bg-elevated text-text-secondary',
  Paid: 'bg-success-bg text-success',
  Unpaid: 'bg-warning-bg text-warning',
  Overdue: 'bg-danger-bg text-danger',
};
