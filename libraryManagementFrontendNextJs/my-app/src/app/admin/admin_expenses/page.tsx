// RESPONSIBILITY: Server Component entry page for the admin_expenses module (`Rule 8`, `Rule 38`).
// DATA FLOW: Next.js App Router -> Server page -> AdminExpensesClient (`Rule 39`).

import { Suspense } from 'react';
import { AdminExpensesClient } from '@/app/admin/admin_expenses/admin_expenses_components/AdminExpensesClient';
import { AdminExpensesSkeleton } from '@/app/admin/admin_expenses/admin_expenses_components/AdminExpensesSkeleton';

export default function AdminExpensesPage() {
  return (
    <Suspense fallback={<AdminExpensesSkeleton />}>
      <AdminExpensesClient />
    </Suspense>
  );
}
