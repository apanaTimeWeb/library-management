// RESPONSIBILITY: Server Component entry page for admin_accounting assets (`Rule 8`, `Rule 38`).
// DATA FLOW: Next.js App Router -> Server Page -> AdminAssetsClient (`Rule 39`).

import { Suspense } from 'react';
import { AdminAssetsClient } from '@/app/admin/admin_accounting/assets/admin_assets_components/AdminAssetsClient';

export default function AdminAssetsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground animate-pulse">Loading Assets...</div>}>
      <AdminAssetsClient />
    </Suspense>
  );
}
