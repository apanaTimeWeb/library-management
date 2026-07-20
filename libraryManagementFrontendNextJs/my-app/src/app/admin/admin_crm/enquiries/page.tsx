import { Suspense } from 'react';
// RESPONSIBILITY: Server Component entry for the CRM Enquiries page. Delegates all interactivity to AdminCrmEnquiriesClient.
// DATA FLOW: Next.js Router -> AdminCrmEnquiriesPage (Server) -> AdminCrmEnquiriesClient (Client)

import AdminCrmEnquiriesClient from '@/app/admin/admin_crm/enquiries/AdminCrmEnquiriesClient';

export default function AdminCrmEnquiriesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminCrmEnquiriesClient />
    </Suspense>
  );
}
