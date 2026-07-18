export const SUPERADMIN_FINANCE_DASHBOARD_MOCK_STATS = {
  totalCollections: 44880, collectionsGrowth: 12.5, activeStudents: 12,
  expiringSoon: 3, suspended: 2, totalReferrals: 6, depositsHeld: 16000,
  pendingPromises: 2, overdueStudents: 3, pendingRefunds: 18, renewalsDue: 4, lateFeeAccrued: 1500,
};

export const SUPERADMIN_FINANCE_RECENT_PAYMENTS = [
  { id: 1, studentName: 'Aarav Sharma',  studentSmartId: 'STU001', amount: 1499, mode: 'cash', date: '2026-04-01' },
  { id: 2, studentName: 'Priya Patel',   studentSmartId: 'STU002', amount: 1049, mode: 'upi',  date: '2026-04-02' },
  { id: 3, studentName: 'Ananya Singh',  studentSmartId: 'STU004', amount: 1499, mode: 'bank', date: '2026-04-05' },
  { id: 4, studentName: 'Vikram Rao',    studentSmartId: 'STU005', amount: 1149, mode: 'cash', date: '2026-04-06' },
  { id: 5, studentName: 'Sneha Gupta',   studentSmartId: 'STU006', amount: 2199, mode: 'upi',  date: '2026-04-08' },
];

export const SUPERADMIN_FINANCE_MOCK_INVOICES = [
  { id: '1', invoiceNumber: 'INV-20260411-001', studentName: 'Gajodhar Prasad', studentId: 'STU-001234', phone: '9876543210', invoiceDate: '2026-04-11T00:00:00Z', grandTotal: 1716, paymentStatus: 'paid',    paymentMode: 'UPI',          planName: 'Annual Library Membership',       shift: 'Evening', seat: 'B-05' },
  { id: '2', invoiceNumber: 'INV-20260410-002', studentName: 'Aravind Sharma',  studentId: 'STU-002567', phone: '8765432109', invoiceDate: '2026-04-10T00:00:00Z', grandTotal: 1200, paymentStatus: 'paid',    paymentMode: 'Cash',         planName: 'Monthly Basic Plan',              shift: 'Morning', seat: 'A-01' },
  { id: '3', invoiceNumber: 'INV-20260409-003', studentName: 'Priya Nair',      studentId: 'STU-003891', phone: '7654321098', invoiceDate: '2026-04-09T00:00:00Z', grandTotal: 2400, paymentStatus: 'pending', paymentMode: 'Bank Transfer', planName: 'Quarterly Premium Plan',          shift: 'Full Day', seat: 'A-05' },
  { id: '4', invoiceNumber: 'INV-20260408-004', studentName: 'Rohan Khanna',    studentId: 'STU-004312', phone: '6543210987', invoiceDate: '2026-04-08T00:00:00Z', grandTotal: 900,  paymentStatus: 'paid',    paymentMode: 'Card',         planName: 'Monthly Basic Plan',              shift: 'Morning', seat: 'D-10' },
  { id: '5', invoiceNumber: 'INV-20260407-005', studentName: 'Sara Mishra',     studentId: 'STU-005678', phone: '5432109876', invoiceDate: '2026-04-07T00:00:00Z', grandTotal: 1500, paymentStatus: 'overdue', paymentMode: '',             planName: 'Half-Yearly Plan',                shift: 'Night',   seat: 'C-12' },
];

export const SUPERADMIN_FINANCE_MOCK_RECEIPTS = [
  { id: 'SL360-TRX-99421-X', receiptNumber: 'REC-20260411-001', studentName: 'Aravind Sharma',  studentId: 'LIB-2024-883', phone: '9876543210', date: '2024-10-24T00:00:00Z', amount: 1249, paymentMode: 'UPI',          planName: 'Premium Reading Zone (Monthly)',  shift: 'Morning', seat: 'A-01' },
  { id: 'SL360-TRX-88310-Y', receiptNumber: 'REC-20260410-002', studentName: 'Gajodhar Prasad', studentId: 'STU-001234',   phone: '8765432109', date: '2026-04-10T00:00:00Z', amount: 1716, paymentMode: 'UPI',          planName: 'Annual Library Membership',       shift: 'Evening', seat: 'B-05' },
  { id: 'SL360-TRX-77203-Z', receiptNumber: 'REC-20260409-003', studentName: 'Sara Mishra',     studentId: 'STU-008821',   phone: '7654321098', date: '2024-10-10T00:00:00Z', amount: 9750, paymentMode: 'Bank Transfer', planName: 'Security Deposit Refund',         shift: 'Night',   seat: 'C-12' },
  { id: 'SL360-TRX-66192-A', receiptNumber: 'REC-20260408-004', studentName: 'Rohan Khanna',    studentId: 'STU-007654',   phone: '6543210987', date: '2026-04-08T00:00:00Z', amount: 900,  paymentMode: 'Cash',         planName: 'Monthly Basic Plan',              shift: 'Morning', seat: 'D-10' },
  { id: 'SL360-TRX-55081-B', receiptNumber: 'REC-20260407-005', studentName: 'Priya Nair',      studentId: 'STU-003891',   phone: '5432109876', date: '2026-04-07T00:00:00Z', amount: 2400, paymentMode: 'Card',         planName: 'Quarterly Premium Plan',          shift: 'Full Day', seat: 'A-05' },
];

export const SUPERADMIN_FINANCE_MOCK_INVOICE_DETAIL = {
  invoiceNumber:        'INV-20260411-001',
  libraryName:          'Smart Library 360',
  libraryAddress:       'Main Branch, Pune',
  libraryGstin:         '22AAACP1234B1Z5',
  libraryPhone:         '+91 98765 43210',
  studentName:          'Gajodhar Prasad',
  studentSmartId:       'STU-001234',
  studentPhone:         '9876543210',
  studentAddress:       'Burla, Sambalpur, Odisha',
  invoiceDate:          '2026-04-01T00:00:00Z',
  paymentDate:          '2026-04-05T00:00:00Z',
  shift:                'Evening',
  seat:                 'B-05',
  items: [
    { description: 'Annual Library Membership', hsnCode: '9992', duration: '12 months', amount: 1200, gstPercent: 18, gstAmount: 216 },
    { description: 'Book Issue Fee',            hsnCode: '9992', duration: '—',         amount: 300,  gstPercent: 0,  gstAmount: 0   },
  ],
  subtotal:             1500,
  totalGst:             216,
  grandTotal:           1716,
  paymentMode:          'UPI',
  paymentTransactionId: 'UPI-1234567890',
  paymentStatus:        'paid',
};

export const SUPERADMIN_FINANCE_MOCK_RECEIPT_DETAIL = {
  id:          'SL360-TRX-99421-X',
  receiptNo:   'REC-20260411-001',
  date:        '24 Oct 2024',
  studentName: 'Aravind Sharma',
  studentId:   'LIB-2024-883',
  phone:       '9876543210',
  shift:       'Morning',
  seat:        'A-01',
  plan:        'Premium Reading Zone (Monthly)',
  items: [
    { label: 'Subscription Fee', amount: 1200 },
    { label: 'Processing Fee',   amount: 49   },
  ],
  total:       1249,
  paymentMode: 'UPI (PhonePe)',
  txnId:       'UPI-9876543210',
};
export const SUPERADMIN_FINANCE_MOCK_RENEWALS = [
  { id: 1, studentName: 'Aarav Sharma',  smartId: 'STU001', shift: 'Morning', plan: 'Premium', planId: 2, expiryDate: '2026-04-05', daysLeft: -6,  lastPaymentDate: '2026-03-01', due: 1499, total: 1499 },
  { id: 2, studentName: 'Priya Patel',   smartId: 'STU002', shift: 'Evening', plan: 'Basic',   planId: 1, expiryDate: '2026-04-15', daysLeft: 4,   lastPaymentDate: '2026-03-15', due: 999,  total: 999  },
  { id: 3, studentName: 'Rohan Kumar',   smartId: 'STU003', shift: 'Morning', plan: 'Elite',   planId: 3, expiryDate: '2026-04-20', daysLeft: 12,  lastPaymentDate: '2026-03-20', due: 2499, total: 2499 },
  { id: 4, studentName: 'Ananya Singh',  smartId: 'STU004', shift: 'Evening', plan: 'Premium', planId: 2, expiryDate: '2026-04-08', daysLeft: -2,  lastPaymentDate: '2026-03-08', due: 1499, total: 1499 },
  { id: 5, studentName: 'Vikram Rao',    smartId: 'STU005', shift: 'Morning', plan: 'Basic',   planId: 1, expiryDate: '2026-04-16', daysLeft: 6,   lastPaymentDate: '2026-03-16', due: 999,  total: 999  },
  { id: 6, studentName: 'Sneha Gupta',   smartId: 'STU006', shift: 'Evening', plan: 'Elite',   planId: 3, expiryDate: '2026-04-22', daysLeft: 14,  lastPaymentDate: '2026-03-22', due: 2499, total: 2499 },
];

export const SUPERADMIN_FINANCE_MOCK_REFUNDS = [
  { id: 1, studentName: 'Sara Mishra',    smartId: 'STU-8821', exitDate: '2024-10-10', depositHeld: 10000, deductionAmount: 250,   netRefund: 9750, status: 'processed', requestedDate: '2024-10-10', processedDate: '2024-10-12', paymentMethod: 'UPI'  },
  { id: 2, studentName: 'Rohan Khanna',   smartId: 'STU-7654', exitDate: '2024-10-15', depositHeld: 12000, deductionAmount: 3200,  netRefund: 8800, status: 'pending',   requestedDate: '2024-10-15' },
  { id: 3, studentName: 'Ananya Sharma',  smartId: 'STU-5432', exitDate: '2024-10-18', depositHeld: 8000,  deductionAmount: 0,     netRefund: 8000, status: 'approved',  requestedDate: '2024-10-18' },
  { id: 4, studentName: 'Vikram Singh',   smartId: 'STU-3321', exitDate: '2024-10-05', depositHeld: 15000, deductionAmount: 15000, netRefund: 0,    status: 'rejected',  requestedDate: '2024-10-05', processedDate: '2024-10-08', rejectionReason: 'Deposit forfeited due to contract violation' },
  { id: 5, studentName: 'Priya Mehta',    smartId: 'STU-6670', exitDate: '2024-10-20', depositHeld: 10000, deductionAmount: 500,   netRefund: 9500, status: 'pending',   requestedDate: '2024-10-20' },
];

export const SUPERADMIN_FINANCE_MOCK_REFERRERS = [
  { id: 1, name: 'Rahul Kumar',  smartId: 'STU101', referredNames: ['Priya S', 'Aman V', 'Sneha P', 'Vikas S', 'Neha G'], referredCount: 8, bonusEarned: 800, redeemed: 300, balance: 500 },
  { id: 2, name: 'Priya Singh',  smartId: 'STU102', referredNames: ['Aman V', 'Rohan M'],                                   referredCount: 5, bonusEarned: 500, redeemed: 200, balance: 300 },
  { id: 3, name: 'Aman Verma',   smartId: 'STU103', referredNames: ['Sneha P', 'Vikas S'],                                  referredCount: 4, bonusEarned: 400, redeemed: 0,   balance: 400 },
  { id: 4, name: 'Sneha Patel',  smartId: 'STU104', referredNames: ['Neha G', 'Rohan M', 'Kiran D'],                        referredCount: 3, bonusEarned: 300, redeemed: 100, balance: 200 },
  { id: 5, name: 'Vikas Sharma', smartId: 'STU105', referredNames: ['Kiran D'],                                             referredCount: 2, bonusEarned: 200, redeemed: 0,   balance: 200 },
  { id: 6, name: 'Neha Gupta',   smartId: 'STU106', referredNames: ['Rohan M'],                                             referredCount: 1, bonusEarned: 100, redeemed: 0,   balance: 100 },
];
export const SUPERADMIN_FINANCE_MOCK_STUDENTS_TRUST = [
  { rank: 1, studentName: 'Rahul Kumar',  smartId: 'STU101', shift: 'Morning',  trustScore: 92, totalPromises: 12, timesChanged: 0, fulfilledCount: 12, badge: 'reliable' },
  { rank: 2, studentName: 'Priya Singh',  smartId: 'STU102', shift: 'Evening',  trustScore: 85, totalPromises: 9,  timesChanged: 1, fulfilledCount: 8,  badge: 'reliable' },
  { rank: 3, studentName: 'Aman Verma',   smartId: 'STU103', shift: 'Full Day', trustScore: 67, totalPromises: 15, timesChanged: 3, fulfilledCount: 9,  badge: 'moderate' },
  { rank: 4, studentName: 'Sneha Patel',  smartId: 'STU104', shift: 'Morning',  trustScore: 45, totalPromises: 8,  timesChanged: 4, fulfilledCount: 3,  badge: 'low'      },
  { rank: 5, studentName: 'Vikas Sharma', smartId: 'STU105', shift: 'Evening',  trustScore: 78, totalPromises: 11, timesChanged: 2, fulfilledCount: 10, badge: 'moderate' },
  { rank: 6, studentName: 'Neha Gupta',   smartId: 'STU106', shift: 'Full Day', trustScore: 33, totalPromises: 7,  timesChanged: 5, fulfilledCount: 2,  badge: 'low'      },
];

export const SUPERADMIN_FINANCE_MOCK_SUBSCRIPTIONS = [
  { id: 1, studentName: 'Aarav Sharma',  smartId: 'STU001', plan: 'Premium Plan', shift: 'Morning', startDate: '2026-01-01', endDate: '2026-06-30', daysLeft: 12,  base: 15000, discount: 0,    total: 15000, paid: 15000, due: 0,    status: 'active'    },
  { id: 2, studentName: 'Priya Patel',   smartId: 'STU002', plan: 'Basic Plan',   shift: 'Evening', startDate: '2025-11-01', endDate: '2026-04-30', daysLeft: 3,   base: 8000,  discount: 200,  total: 7800,  paid: 6000, due: 1800, status: 'active'    },
  { id: 3, studentName: 'Rohan Kumar',   smartId: 'STU003', plan: 'Premium Plan', shift: 'Full Day',startDate: '2025-08-01', endDate: '2025-12-31', daysLeft: -15, base: 18000, discount: 0,    total: 18000, paid: 18000,due: 0,    status: 'expired'   },
  { id: 4, studentName: 'Sneha Singh',   smartId: 'STU004', plan: 'Basic Plan',   shift: 'Morning', startDate: '2026-02-01', endDate: '2026-07-31', daysLeft: 45,  base: 9000,  discount: 0,    total: 9000,  paid: 4500, due: 4500, status: 'suspended' },
  { id: 5, studentName: 'Vikram Rao',    smartId: 'STU005', plan: 'Premium Plan', shift: 'Evening', startDate: '2025-10-01', endDate: '2025-12-31', daysLeft: -45, base: 16000, discount: 500,  total: 15500, paid: 15500,due: 0,    status: 'cancelled' },
  { id: 6, studentName: 'Ananya Gupta',  smartId: 'STU006', plan: 'Basic Plan',   shift: 'Full Day',startDate: '2026-03-01', endDate: '2026-08-31', daysLeft: 8,   base: 7500,  discount: 0,    total: 7500,  paid: 7500, due: 0,    status: 'active'    },
  { id: 7, studentName: 'Karan Mehta',   smartId: 'STU007', plan: 'Premium Plan', shift: 'Morning', startDate: '2025-09-01', endDate: '2026-02-28', daysLeft: -5,  base: 14000, discount: 0,    total: 14000, paid: 10000,due: 4000, status: 'expired'   },
];
export const SUPERADMIN_FINANCE_MOCK_PAYMENTS = [
  { id: 1, receiptNumber: 'REC-20260401-001', date: '2026-04-01', studentName: 'Aarav Sharma',  smartId: 'STU001', amount: 1499, mode: 'cash', lateFee: 0,   receivedBy: 'Admin',   status: 'valid'   },
  { id: 2, receiptNumber: 'REC-20260402-002', date: '2026-04-02', studentName: 'Priya Patel',   smartId: 'STU002', amount: 999,  mode: 'upi',  txnId: 'UPI123', lateFee: 100, receivedBy: 'Staff',   status: 'valid'   },
  { id: 3, receiptNumber: 'REC-20260403-003', date: '2026-04-03', studentName: 'Rohan Kumar',   smartId: 'STU003', amount: 2499, mode: 'card', txnId: 'CARD456', lateFee: 0,   receivedBy: 'Admin',   status: 'deleted', deletionReason: 'Student left the institute' },
  { id: 4, receiptNumber: 'REC-20260405-004', date: '2026-04-05', studentName: 'Ananya Singh',  smartId: 'STU004', amount: 1499, mode: 'bank', txnId: 'BANK789', lateFee: 0,   receivedBy: 'Manager', status: 'valid'   },
  { id: 5, receiptNumber: 'REC-20260406-005', date: '2026-04-06', studentName: 'Vikram Rao',    smartId: 'STU005', amount: 999,  mode: 'cash', lateFee: 150, receivedBy: 'Staff',   status: 'valid'   },
  { id: 6, receiptNumber: 'REC-20260408-006', date: '2026-04-08', studentName: 'Sneha Gupta',   smartId: 'STU006', amount: 2499, mode: 'upi',  txnId: 'UPI999', lateFee: 0,   receivedBy: 'Admin',   status: 'valid'   },
];

export const SUPERADMIN_FINANCE_MOCK_STUDENTS_COLLECT_FEE = [
  { id: 1, name: 'Aarav Sharma',  smartId: 'STU001', phone: '8084350824', status: 'active',    dueAmount: 0,    plan: 'Premium Plan', shift: 'Morning', seat: 'A-01' },
  { id: 2, name: 'Priya Patel',   smartId: 'STU002', phone: '8084350824', status: 'active',    dueAmount: 1800, plan: 'Basic Plan',   shift: 'Evening', seat: 'B-05' },
  { id: 3, name: 'Rohan Kumar',   smartId: 'STU003', phone: '8084350824', status: 'expired',   dueAmount: 4000, plan: 'Premium Plan', shift: 'Night',   seat: 'C-12' },
  { id: 4, name: 'Sneha Singh',   smartId: 'STU004', phone: '8084350824', status: 'suspended', dueAmount: 4500, plan: 'Basic Plan',   shift: 'Morning', seat: 'A-08' },
  { id: 5, name: 'Vikram Rao',    smartId: 'STU005', phone: '8084350824', status: 'active',    dueAmount: 0,    plan: 'Elite Plan',   shift: 'Full Day','seat': 'D-03' },
  { id: 6, name: 'Ananya Gupta',  smartId: 'STU006', phone: '8084350824', status: 'active',    dueAmount: 0,    plan: 'Basic Plan',   shift: 'Evening', seat: 'B-10' },
];

export const SUPERADMIN_FINANCE_MOCK_CONFIG_AUTO_SUSPEND = { daysBeforeSuspend: 7, currentlySuspended: 4, autoRestoredThisMonth: 2, manualRestores: 1 };

export const SUPERADMIN_FINANCE_MOCK_SUSPENDED_STUDENTS = [
  { id: 1, studentId: 101, studentName: 'Rahul Kumar',  smartId: 'STU101', seat: 'A-12', shift: 'Morning',  daysOverdue: 14, suspendedSince: '2026-03-28' },
  { id: 2, studentId: 102, studentName: 'Priya Singh',  smartId: 'STU102', seat: 'B-05', shift: 'Evening',  daysOverdue: 9,  suspendedSince: '2026-04-02' },
  { id: 3, studentId: 103, studentName: 'Aman Verma',   smartId: 'STU103', seat: 'C-18', shift: 'Full Day', daysOverdue: 21, suspendedSince: '2026-03-21' },
  { id: 4, studentId: 104, studentName: 'Sneha Patel',  smartId: 'STU104', seat: 'A-07', shift: 'Morning',  daysOverdue: 8,  suspendedSince: '2026-04-03' },
];
export const SUPERADMIN_FINANCE_MOCK_CONFIG_LATE_FEES = { gracePeriodDays: 5, penaltyPerDay: 50 };
export const SUPERADMIN_FINANCE_MOCK_OVERDUE_STUDENTS = [
  { studentId: 'STU101', studentName: 'Rahul Kumar', smartId: 'STU101', phone: '8084350824', dueDate: '2026-04-05', daysOverdue: 6,  accruedFee: 300, totalDue: 45300 },
  { studentId: 'STU102', studentName: 'Priya Singh', smartId: 'STU102', phone: '8084350824', dueDate: '2026-04-01', daysOverdue: 10, accruedFee: 500, totalDue: 30500 },
  { studentId: 'STU103', studentName: 'Aman Verma',  smartId: 'STU103', phone: '8084350824', dueDate: '2026-03-28', daysOverdue: 14, accruedFee: 700, totalDue: 60700 },
];

export const SUPERADMIN_FINANCE_MOCK_PROMISES = [
  { id: 1, studentName: 'Rahul Kumar',  smartId: 'STU101', promisedAmount: 1499, expectedDate: '2026-04-20', daysUntilDue: 9,   timesChanged: 0, status: 'pending'   },
  { id: 2, studentName: 'Priya Singh',  smartId: 'STU102', promisedAmount: 999,  expectedDate: '2026-04-05', daysUntilDue: -6,  timesChanged: 1, status: 'overdue'   },
  { id: 3, studentName: 'Aman Verma',   smartId: 'STU103', promisedAmount: 2499, expectedDate: '2026-03-15', daysUntilDue: -27, timesChanged: 0, status: 'fulfilled', fulfilledDate: '2026-04-10' },
  { id: 4, studentName: 'Sneha Patel',  smartId: 'STU104', promisedAmount: 1200, expectedDate: '2026-04-30', daysUntilDue: 19,  timesChanged: 2, status: 'pending'   },
  { id: 5, studentName: 'Vikas Sharma', smartId: 'STU105', promisedAmount: 800,  expectedDate: '2026-04-12', daysUntilDue: -3,  timesChanged: 3, status: 'overdue'   },
];

export const SUPERADMIN_FINANCE_MOCK_DEPOSITS = [
  { id: 1, studentName: 'Rahul Kumar',  smartId: 'STU101', depositAmount: 10000, collectedBy: 'Admin',   collectedDate: '2026-03-15', deductionAmount: 0,    status: 'held'     },
  { id: 2, studentName: 'Priya Singh',  smartId: 'STU102', depositAmount: 8000,  collectedBy: 'Manager', collectedDate: '2026-03-20', deductionAmount: 1500, deductionReason: 'Damaged property', status: 'held' },
  { id: 3, studentName: 'Aman Verma',   smartId: 'STU103', depositAmount: 12000, collectedBy: 'Admin',   collectedDate: '2026-02-10', deductionAmount: 0,    status: 'refunded', refundedDate: '2026-04-08' },
  { id: 4, studentName: 'Sneha Patel',  smartId: 'STU104', depositAmount: 9000,  collectedBy: 'Admin',   collectedDate: '2026-03-05', deductionAmount: 9000, deductionReason: 'Multiple violations', status: 'forfeited' },
  { id: 5, studentName: 'Vikas Sharma', smartId: 'STU105', depositAmount: 11000, collectedBy: 'Manager', collectedDate: '2026-04-01', deductionAmount: 0,    status: 'held'     },
];

export const SUPERADMIN_FINANCE_PROMISE_STATUS_BADGE: Record<string, string> = {
  pending:   'bg-warning text-warning-foreground px-2.5 py-0.5 rounded-full text-[11px] font-semibold',
  fulfilled: 'bg-success text-success-foreground px-2.5 py-0.5 rounded-full text-[11px] font-semibold',
  overdue:   'bg-danger text-danger-foreground px-2.5 py-0.5 rounded-full text-[11px] font-semibold',
};
