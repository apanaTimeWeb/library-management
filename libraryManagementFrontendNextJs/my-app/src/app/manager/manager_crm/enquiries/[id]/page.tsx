// RESPONSIBILITY: Renders the enquiry detail page (Server Component).
import { ManagerCrmEnquiriesDetailClient } from './ManagerCrmEnquiriesDetailClient';

export default async function EnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ManagerCrmEnquiriesDetailClient id={id} />;
}
