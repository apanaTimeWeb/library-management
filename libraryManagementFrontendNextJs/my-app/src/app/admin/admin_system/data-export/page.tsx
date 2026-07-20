import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminSystemDataExportClient } from '@/app/admin/admin_system/admin_system_data_export_components/AdminSystemDataExportClient';

export default function DataExportPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminSystemDataExportClient />
    </Suspense>
  );
}
