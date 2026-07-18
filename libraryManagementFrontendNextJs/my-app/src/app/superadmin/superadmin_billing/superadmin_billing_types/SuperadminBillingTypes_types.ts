import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminBillingInvoice {
  id: string;
  tenant: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Overdue';
  method: string;
  gst: string;
}
export interface SuperadminBillingGridProps {
  invoices: SuperadminBillingInvoice[];
  onRowClick: (inv: SuperadminBillingInvoice) => void;
  onExport: () => void;
}
export interface SuperadminBillingPanelProps {
  inv: SuperadminBillingInvoice;
  onClose: () => void;
  onMarkPaid: (id: string) => Promise<void>;
}
