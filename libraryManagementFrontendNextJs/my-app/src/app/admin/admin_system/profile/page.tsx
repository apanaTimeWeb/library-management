import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminSystemProfileClient } from '@/app/admin/admin_system/admin_system_profile_components/AdminSystemProfileClient';

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminSystemProfileClient />
    </Suspense>
  );
}
