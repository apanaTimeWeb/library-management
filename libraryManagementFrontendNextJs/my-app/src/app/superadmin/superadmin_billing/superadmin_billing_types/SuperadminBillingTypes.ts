export interface SuperadminBillingInvoice {
  id: string;
  tenant: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Overdue';
  method: string;
  gst: string;
}
