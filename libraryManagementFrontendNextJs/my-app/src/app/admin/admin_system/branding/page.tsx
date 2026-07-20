import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminSystemBrandingClient } from '@/app/admin/admin_system/admin_system_branding_components/AdminSystemBrandingClient';

export default function BrandingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminSystemBrandingClient />
    </Suspense>
  );
}
