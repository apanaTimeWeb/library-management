// RESPONSIBILITY: Defines all TypeScript types and interfaces for the superadmin_finance module.
// DATA FLOW: Imported by all finance module components, hooks, and stores - no API calls here.

/** Minimal student reference embedded in receipt/payment records */
export interface SuperadminFinanceStudentRef {
  id: string | number;
  name: string;
  smartId?: string;
  phone?: string;
}

export interface SuperadminFinanceDashboardStats {
  totalCollections: number; collectionsGrowth: number; activeStudents: number;
  expiringSoon: number; suspended: number; totalReferrals: number;
  depositsHeld: number; pendingPromises: number; overdueStudents: number;
  pendingRefunds: number; renewalsDue: number; lateFeeAccrued: number;
}
export interface SuperadminFinanceRecentPayment {
  id: number; studentName: string; studentSmartId: string;
  amount: number; mode: string; date: string;
}
export interface SuperadminFinanceReceiptData {
  receiptNo: string; studentName: string; studentId: string;
  phone: string; total: number; mode: SuperadminFinanceCollectFeeMode; date: string; waMessage: string;
  student: SuperadminFinanceStudentRef; amount: number; lateFee: number;
  couponDiscount: number; txnId: string; remark: string;
}
export type SuperadminFinanceCollectFeeMode = 'cash' | 'upi' | 'card' | 'bank';
export type SuperadminFinanceTrustScoreStudent = {
  rank: number;
  studentName: string;
  smartId: string;
  shift: 'Morning' | 'Evening' | 'Full Day';
  trustScore: number;
  totalPromises: number;
  timesChanged: number;
  fulfilledCount: number;
  badge: 'reliable' | 'moderate' | 'low';
};
export type SuperadminFinanceSecurityDeposit = {
  id: number;
  studentName: string;
  smartId: string;
  depositAmount: number;
  collectedBy: string;
  collectedDate: string;
  deductionAmount: number;
  deductionReason?: string;
  status: 'held' | 'refunded' | 'forfeited';
  refundedDate?: string;
};
export type SuperadminFinanceRenewalsFilterType = 'expired' | 'expiring_7' | 'expiring_15';
export type SuperadminFinanceRenewal = {
  id: number;
  studentName: string;
  smartId: string;
  shift: string;
  plan: string;
  planId: number;
  expiryDate: string;
  daysLeft: number;
  lastPaymentDate: string;
  due: number;
  total: number;
};
export type SuperadminFinanceRefund = {
  id: number;
  studentName: string;
  smartId: string;
  exitDate?: string;
  depositHeld: number;
  deductionAmount: number;
  netRefund: number;
  status: 'pending' | 'approved' | 'rejected' | 'processed';
  requestedDate: string;
  processedDate?: string;
  paymentMethod?: string;
  rejectionReason?: string;
};
export type SuperadminFinanceReferrer = {
  id: number;
  name: string;
  smartId: string;
  referredNames: string[];
  referredCount: number;
  bonusEarned: number;
  redeemed: number;
  balance: number;
};
export type SuperadminFinanceReceiptFilterMode = 'all' | 'upi' | 'cash' | 'card' | 'bank transfer';
export type SuperadminFinancePayment = {
  id: number;
  receiptNumber: string;
  date: string;
  studentName: string;
  smartId: string;
  amount: number;
  mode: 'cash' | 'upi' | 'card' | 'bank';
  txnId?: string;
  lateFee: number;
  receivedBy: string;
  remark?: string;
  status: 'valid' | 'deleted';
  deletionReason?: string;
};
export type SuperadminFinancePromiseItem = {
  id: number;
  studentName: string;
  smartId: string;
  promisedAmount: number;
  expectedDate: string;
  daysUntilDue: number;
  timesChanged: number;
  status: 'pending' | 'fulfilled' | 'overdue';
  fulfilledDate?: string;
};
export type SuperadminFinanceLateFeesConfig = { gracePeriodDays: number; penaltyPerDay: number };
export type SuperadminFinanceOverdueStudent = {
  studentId: string;
  studentName: string;
  smartId: string;
  phone: string;
  dueDate: string;
  daysOverdue: number;
  accruedFee: number;
  totalDue: number;
};
export type SuperadminFinanceInvoiceFilterStatus = 'all' | 'paid' | 'pending' | 'overdue';
export type SuperadminFinanceAutoSuspendConfig = { daysBeforeSuspend: number; currentlySuspended: number; autoRestoredThisMonth: number; manualRestores: number };
export type SuperadminFinanceSuspendedStudent = { id: number; studentId: number; studentName: string; smartId: string; seat: string; shift: string; daysOverdue: number; suspendedSince: string };
export type SuperadminFinanceDialogState = { id: number; name: string };
export type SuperadminFinanceReferral = {
  id: number;
  date: string;
  referrerName: string;
  referrerSmartId: string;
  refereeName: string;
  refereeSmartId: string;
  rewardAmount: number;
  status: 'pending' | 'paid';
  paidDate?: string;
  paymentMethod?: string;
};

// RESPONSIBILITY: Defines all types and interfaces for the superadmin_finance module.
