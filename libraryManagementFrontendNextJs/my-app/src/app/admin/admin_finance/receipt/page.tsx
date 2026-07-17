// RESPONSIBILITY: Entry page for the admin_finance receipts module.
// DATA FLOW: Next.js Router -> Page -> Components

import { FinanceReceiptClient } from '@/app/admin/admin_finance/receipt/admin_finance_receipt_components/FinanceReceiptClient';

export default function ReceiptsPage() {
  return <FinanceReceiptClient />;
}
