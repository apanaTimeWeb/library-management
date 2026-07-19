import { 
  ManagerFinanceTransaction, 
  ManagerFinanceInvoice, 
  ManagerFinanceStats,
  ManagerFinanceSubscription,
  ManagerFinanceRenewal,
  ManagerFinanceLateFee,
  ManagerFinanceSecurityDeposit,
  ManagerFinanceRefund,
  ManagerFinancePaymentPromise,
  ManagerFinanceTrustScore,
  ManagerFinanceAutoSuspendLog,
  ManagerFinanceReferral
} from '@/app/manager/manager_finance/manager_finance_types/manager_finance_types';

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

// Phase 2 Mocks
export const SUBSCRIPTIONS_MOCK: ManagerFinanceSubscription[] = [
  { id: '1', studentName: 'Alex Rivera', studentId: 'LIB-001', planName: 'Morning Standard', startDate: '2024-10-01', endDate: '2024-10-31', status: 'Active', amount: 1500 },
  { id: '2', studentName: 'Priya Sharma', studentId: 'LIB-002', planName: 'Full Day Premium', startDate: '2024-09-15', endDate: '2024-10-14', status: 'Expired', amount: 2500 },
  { id: '3', studentName: 'Rohan Mehta', studentId: 'LIB-003', planName: 'Evening Standard', startDate: '2024-11-01', endDate: '2024-11-30', status: 'Upcoming', amount: 1200 },
];

export const RENEWALS_MOCK: ManagerFinanceRenewal[] = [
  { id: '1', studentName: 'Sneha Patel', studentId: 'LIB-004', dueDate: '2024-10-25', amount: 1500, daysLeft: 1, status: 'Upcoming' },
  { id: '2', studentName: 'Vikram Rao', studentId: 'LIB-005', dueDate: '2024-10-20', amount: 1500, daysLeft: -4, status: 'Overdue' },
];

export const LATE_FEES_MOCK: ManagerFinanceLateFee[] = [
  { id: '1', studentName: 'Vikram Rao', studentId: 'LIB-005', daysLate: 4, baseAmount: 1500, fineAmount: 200, status: 'Pending' },
  { id: '2', studentName: 'Priya Sharma', studentId: 'LIB-002', daysLate: 10, baseAmount: 2500, fineAmount: 500, status: 'Collected' },
];

export const SECURITY_DEPOSITS_MOCK: ManagerFinanceSecurityDeposit[] = [
  { id: '1', studentName: 'Alex Rivera', studentId: 'LIB-001', amount: 1000, dateCollected: '2024-01-15', status: 'Held' },
  { id: '2', studentName: 'Arjun Das', studentId: 'LIB-012', amount: 1000, dateCollected: '2023-11-01', status: 'Refunded' },
  { id: '3', studentName: 'Meera Singh', studentId: 'LIB-015', amount: 1000, dateCollected: '2024-02-10', status: 'Forfeited' },
];

export const REFUNDS_MOCK: ManagerFinanceRefund[] = [
  { id: '1', requestId: 'REF-001', studentName: 'Arjun Das', studentId: 'LIB-012', amount: 1000, reason: 'Course Completed', requestDate: '2024-10-20', status: 'Processed' },
  { id: '2', requestId: 'REF-002', studentName: 'Sneha Patel', studentId: 'LIB-004', amount: 500, reason: 'Overcharged Fee', requestDate: '2024-10-23', status: 'Pending' },
];

export const PAYMENT_PROMISES_MOCK: ManagerFinancePaymentPromise[] = [
  { id: '1', studentName: 'Vikram Rao', studentId: 'LIB-005', promisedAmount: 1700, promisedDate: '2024-10-28', status: 'Pending' },
  { id: '2', studentName: 'Rahul Verma', studentId: 'LIB-022', promisedAmount: 1500, promisedDate: '2024-10-15', status: 'Broken' },
];

export const TRUST_SCORES_MOCK: ManagerFinanceTrustScore[] = [
  { id: '1', studentName: 'Alex Rivera', studentId: 'LIB-001', score: 95, rating: 'Excellent', latePayments: 0 },
  { id: '2', studentName: 'Sneha Patel', studentId: 'LIB-004', score: 80, rating: 'Good', latePayments: 1 },
  { id: '3', studentName: 'Vikram Rao', studentId: 'LIB-005', score: 45, rating: 'Poor', latePayments: 4 },
];

export const AUTO_SUSPEND_LOGS_MOCK: ManagerFinanceAutoSuspendLog[] = [
  { id: '1', studentName: 'Rahul Verma', studentId: 'LIB-022', suspendDate: '2024-10-16', reason: 'Unpaid Dues > 7 days', status: 'Suspended' },
  { id: '2', studentName: 'Priya Sharma', studentId: 'LIB-002', suspendDate: '2024-10-21', reason: 'Unpaid Dues > 7 days', status: 'Reinstated' },
];

export const REFERRALS_MOCK: ManagerFinanceReferral[] = [
  { id: '1', referrerName: 'Alex Rivera', referrerId: 'LIB-001', referredStudent: 'Karan Johar', date: '2024-10-22', bonusAmount: 500, status: 'Pending' },
  { id: '2', referrerName: 'Ananya Gupta', referrerId: 'LIB-006', referredStudent: 'Riya Sen', date: '2024-09-15', bonusAmount: 500, status: 'Applied' },
];

export const STATUS_COLORS: Record<string, string> = {
  Completed: 'bg-success-bg text-success',
  Pending: 'bg-warning-bg text-warning',
  Failed: 'bg-danger-bg text-danger',
  Refunded: 'bg-bg-elevated text-text-secondary',
  Paid: 'bg-success-bg text-success',
  Unpaid: 'bg-warning-bg text-warning',
  Overdue: 'bg-danger-bg text-danger',
  Active: 'bg-success-bg text-success',
  Expired: 'bg-danger-bg text-danger',
  Cancelled: 'bg-bg-elevated text-text-secondary',
  Upcoming: 'bg-info/10 text-info',
  Waived: 'bg-success-bg text-success',
  Collected: 'bg-success-bg text-success',
  Held: 'bg-info/10 text-info',
  Forfeited: 'bg-danger-bg text-danger',
  Approved: 'bg-success-bg text-success',
  Rejected: 'bg-danger-bg text-danger',
  Processed: 'bg-success-bg text-success',
  Fulfilled: 'bg-success-bg text-success',
  Broken: 'bg-danger-bg text-danger',
  Suspended: 'bg-danger-bg text-danger',
  Reinstated: 'bg-success-bg text-success',
  Applied: 'bg-success-bg text-success',
  Excellent: 'bg-success-bg text-success',
  Good: 'bg-info/10 text-info',
  Average: 'bg-warning-bg text-warning',
  Poor: 'bg-danger-bg text-danger',
};
