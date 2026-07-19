export type TransactionStatus = 'Completed' | 'Pending' | 'Failed' | 'Refunded';
export type InvoiceStatus = 'Paid' | 'Unpaid' | 'Overdue';
export type PaymentMethod = 'UPI' | 'Card' | 'Cash' | 'NetBanking';
export type FeeType = 'Admission' | 'Monthly' | 'Fine' | 'Security Deposit' | 'Locker';

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
