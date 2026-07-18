// RESPONSIBILITY: Entry page for the admin_finance receipts module.
// DATA FLOW: Next.js Router -> page -> Components

import { AdminFinanceReceiptClient } from '@/app/admin/admin_finance/receipt/admin_finance_receipt_components/AdminFinanceReceiptClient';

export default function ReceiptsPage() {
  return <AdminFinanceReceiptClient />;
}
