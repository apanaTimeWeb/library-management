// RESPONSIBILITY: Server Component entry page for admin_accounting expenses (`Rule 8`, `Rule 38`).
// DATA FLOW: Next.js App Router -> Server Page -> AdminAccountingExpensesClient (`Rule 39`).

import { Suspense } from 'react';
import { AdminAccountingExpensesClient } from '@/app/admin/admin_accounting/expenses/admin_accounting_expenses_components/AdminAccountingExpensesClient';

export default function AdminAccountingExpensesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground animate-pulse">Loading Expenses...</div>}>
      <AdminAccountingExpensesClient />
    </Suspense>
  );
}
