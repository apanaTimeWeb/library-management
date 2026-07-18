// RESPONSIBILITY: Server Component entry page for the admin_expense-categories module (`Rule 8`, `Rule 38`).
// DATA FLOW: Next.js App Router -> Server page -> AdminExpenseCategoriesClient (`Rule 39`).

import { Suspense } from 'react';
import { AdminExpenseCategoriesClient } from '@/app/admin/admin_expense-categories/admin_expense-categories_components/AdminExpenseCategoriesClient';
import { AdminExpenseCategoriesSkeleton } from '@/app/admin/admin_expense-categories/admin_expense-categories_components/AdminExpenseCategoriesSkeleton';

export default function AdminExpenseCategoriesPage() {
  return (
    <Suspense fallback={<AdminExpenseCategoriesSkeleton />}>
      <AdminExpenseCategoriesClient />
    </Suspense>
  );
}
