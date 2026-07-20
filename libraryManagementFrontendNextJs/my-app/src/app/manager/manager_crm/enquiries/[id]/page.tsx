import { Suspense } from 'react';
// RESPONSIBILITY: Renders the enquiry detail page (Server Component).
import { ManagerCrmEnquiriesDetailClient } from '@/app/manager/manager_crm/enquiries/[id]/ManagerCrmEnquiriesDetailClient';

export default async function EnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <ManagerCrmEnquiriesDetailClient id={id} />
    </Suspense>
  );
}
