import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminSystemBulkImportClient } from '@/app/admin/admin_system/admin_system_bulk_import_components/AdminSystemBulkImportClient';

export default function BulkImportPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminSystemBulkImportClient />
    </Suspense>
  );
}
