import type { SuperadminBillingInvoice } from '@/app/superadmin/superadmin_billing/superadmin_billing_types/SuperadminBillingTypes';

export const SUPERADMIN_BILLING_MOCK_INVOICES: SuperadminBillingInvoice[] = [
  { id: 'REC-2026-0410', tenant: 'City Reading Hub',      date: '10 Apr, 2026', amount: 2999,  status: 'Paid',    method: 'UPI',           gst: '29AABCT1332L1ZD' },
  { id: 'REC-2026-0401', tenant: 'Scholar Spaces',        date: '01 Apr, 2026', amount: 999,   status: 'Overdue', method: '—',             gst: '27AABCS1429B1Z6' },
  { id: 'REC-2026-0328', tenant: 'Quiet Corner Lib',      date: '28 Mar, 2026', amount: 999,   status: 'Paid',    method: 'Card',          gst: '29AABCQ1234A1Z5' },
  { id: 'REC-2026-0315', tenant: 'The Alexandria Modern', date: '15 Mar, 2026', amount: 15000, status: 'Paid',    method: 'Bank Transfer', gst: '29AABCA5678B1Z3' },
];
