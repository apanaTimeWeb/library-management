import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminSystemSettingsClient } from '@/app/admin/admin_system/admin_system_settings_components/AdminSystemSettingsClient';

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminSystemSettingsClient />
    </Suspense>
  );
}
