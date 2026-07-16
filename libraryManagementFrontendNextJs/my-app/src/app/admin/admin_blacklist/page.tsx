// RESPONSIBILITY: Server Component entry page for the admin_blacklist module (`Rule 8`, `Rule 38`).
// DATA FLOW: Next.js App Router -> Server Page -> AdminBlacklistClient (`Rule 39`).

import { Suspense } from 'react';
import { AdminBlacklistClient } from '@/app/admin/admin_blacklist/admin_blacklist_components/AdminBlacklistClient';
import { AdminBlacklistSkeleton } from '@/app/admin/admin_blacklist/admin_blacklist_components/AdminBlacklistSkeleton';

export default function AdminBlacklistPage() {
  return (
    <Suspense fallback={<AdminBlacklistSkeleton />}>
      <AdminBlacklistClient />
    </Suspense>
  );
}
