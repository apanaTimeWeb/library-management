import { Suspense } from 'react';
import { ManagerCrmEnquiriesClient } from '@/app/manager/manager_crm/manager_crm_components/ManagerCrmEnquiriesClient';
import { ManagerCrmErrorBoundary } from '@/app/manager/manager_crm/manager_crm_components/ManagerCrmErrorBoundary';

// RESPONSIBILITY: Strict Server Component for Manager CRM Enquiries.

export default function EnquiriesPage() {
  return (
    <ManagerCrmErrorBoundary>
      <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
        <ManagerCrmEnquiriesClient />
      </Suspense>
</ManagerCrmErrorBoundary>
  );
}
