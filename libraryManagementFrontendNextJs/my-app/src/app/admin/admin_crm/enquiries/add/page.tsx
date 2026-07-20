import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminCrmAddClient } from '@/app/admin/admin_crm/enquiries/add/admin_crm_add_components/AdminCrmAddClient';

export default function page() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminCrmAddClient />
    </Suspense>
  );
}
