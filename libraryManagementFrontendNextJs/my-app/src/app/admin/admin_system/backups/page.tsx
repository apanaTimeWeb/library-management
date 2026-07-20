import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminSystemBackupsClient } from '@/app/admin/admin_system/admin_system_backups_components/AdminSystemBackupsClient';

export default function BackupsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminSystemBackupsClient />
    </Suspense>
  );
}
