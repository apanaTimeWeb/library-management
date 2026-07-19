// RESPONSIBILITY: Renders or handles logic for SuperadminBillingTypes.ts.


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

