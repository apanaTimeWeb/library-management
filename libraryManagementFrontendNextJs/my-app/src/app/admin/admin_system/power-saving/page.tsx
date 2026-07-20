import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminSystemPowerSavingClient } from '@/app/admin/admin_system/admin_system_power_saving_components/AdminSystemPowerSavingClient';

export default function PowerSavingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminSystemPowerSavingClient />
    </Suspense>
  );
}
