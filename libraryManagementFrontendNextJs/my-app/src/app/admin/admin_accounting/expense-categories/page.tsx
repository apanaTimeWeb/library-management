// RESPONSIBILITY: Server Component entry page for accounting expense categories (`Rule 8`).
// DATA FLOW: Next.js App Router -> Server page -> AdminAccountingExpenseCategoriesClient (`Rule 39`).

import { Suspense } from 'react';
import { AdminAccountingExpenseCategoriesClient } from '@/app/admin/admin_accounting/expense-categories/admin_accounting_expense_categories_components/AdminAccountingExpenseCategoriesClient';

export default function AccountingExpenseCategoriesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground animate-pulse">Loading Categories...</div>}>
      <AdminAccountingExpenseCategoriesClient />
    </Suspense>
  );
}
