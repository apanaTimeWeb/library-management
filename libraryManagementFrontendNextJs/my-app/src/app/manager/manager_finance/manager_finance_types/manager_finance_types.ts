export type TransactionStatus = 'Completed' | 'Pending' | 'Failed' | 'Refunded';
export type InvoiceStatus = 'Paid' | 'Unpaid' | 'Overdue';
export type PaymentMethod = 'UPI' | 'Card' | 'Cash' | 'NetBanking';
export type FeeType = 'Admission' | 'Monthly' | 'Fine' | 'Security Deposit' | 'Locker';
export type SubscriptionStatus = 'Active' | 'Expired' | 'Cancelled' | 'Upcoming';
export type SecurityDepositStatus = 'Held' | 'Refunded' | 'Forfeited';
export type RefundStatus = 'Pending' | 'Approved' | 'Rejected' | 'Processed';

export interface ManagerFinanceTransaction {
  id: string;
  transactionId: string;
  studentName: string;
  studentId: string;
  amount: number;
  date: string;
  method: PaymentMethod;
  status: TransactionStatus;
  feeType: FeeType;
}

export interface ManagerFinanceInvoice {
  id: string;
  invoiceNumber: string;
  studentName: string;
  studentId: string;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
  items: Array<{ description: string; amount: number }>;
}

export interface ManagerFinanceStats {
  todayRevenue: number;
  thisMonthRevenue: number;
  pendingDues: number;
  activeSubscriptions: number;
}

export interface ManagerFinanceSubscription {
  id: string;
  studentName: string;
  studentId: string;
  planName: string;
  startDate: string;
  endDate: string;
  status: SubscriptionStatus;
  amount: number;
}

export interface ManagerFinanceRenewal {
  id: string;
  studentName: string;
  studentId: string;
  dueDate: string;
  amount: number;
  daysLeft: number;
  status: 'Upcoming' | 'Overdue';
}

export interface ManagerFinanceLateFee {
  id: string;
  studentName: string;
  studentId: string;
  daysLate: number;
  baseAmount: number;
  fineAmount: number;
  status: 'Pending' | 'Waived' | 'Collected';
}

export interface ManagerFinanceSecurityDeposit {
  id: string;
  studentName: string;
  studentId: string;
  amount: number;
  dateCollected: string;
  status: SecurityDepositStatus;
}

export interface ManagerFinanceRefund {
  id: string;
  requestId: string;
  studentName: string;
  studentId: string;
  amount: number;
  reason: string;
  requestDate: string;
  status: RefundStatus;
}

export interface ManagerFinancePaymentPromise {
  id: string;
  studentName: string;
  studentId: string;
  promisedAmount: number;
  promisedDate: string;
  status: 'Pending' | 'Fulfilled' | 'Broken';
}


export interface ManagerFinanceReferral {
  id: string;
  referrerName: string;
  referrerId: string;
  referredStudent: string;
  date: string;
  bonusAmount: number;
  status: 'Pending' | 'Applied';
}
