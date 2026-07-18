// RESPONSIBILITY: Server Component entry page for the admin_plans module (`Rule 8`, `Rule 38`).
// DATA FLOW: Next.js App Router -> Server page -> AdminPlansClient (`Rule 39`).

import { Suspense } from 'react';
import { AdminPlansClient } from '@/app/admin/admin_plans/admin_plans_components/AdminPlansClient';
import { AdminPlansSkeleton } from '@/app/admin/admin_plans/admin_plans_components/AdminPlansSkeleton';

export default function AdminPlansPage() {
  return (
    <Suspense fallback={<AdminPlansSkeleton />}>
      <AdminPlansClient />
    </Suspense>
  );
}
