import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminAccountingExpensesAddClient } from '@/app/admin/admin_accounting/expenses/add/admin_accounting_expenses_add_components/AdminAccountingExpensesAddClient';
export default function AddExpensePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminAccountingExpensesAddClient />
    </Suspense>
  );
}
