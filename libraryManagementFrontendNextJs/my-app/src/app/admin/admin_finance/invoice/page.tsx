// RESPONSIBILITY: Entry page for the admin_finance invoices module.
// DATA FLOW: Next.js Router -> Page -> Components

import { FinanceInvoiceClient } from './admin_finance_invoice_components/FinanceInvoiceClient';

export default function InvoicesPage() {
  return <FinanceInvoiceClient />;
}
