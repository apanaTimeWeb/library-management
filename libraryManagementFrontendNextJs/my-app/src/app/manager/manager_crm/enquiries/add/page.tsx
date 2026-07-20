import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component.
import { ManagerCrmEnquiriesAddClient } from '@/app/manager/manager_crm/manager_crm_components/ManagerCrmEnquiriesAddClient';

export default function AddEnquiryPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <ManagerCrmEnquiriesAddClient />
    </Suspense>
  );
}

