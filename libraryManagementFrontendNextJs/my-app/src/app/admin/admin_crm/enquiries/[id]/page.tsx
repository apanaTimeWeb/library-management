// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminCrmEnquiriesIdClient } from '@/app/admin/admin_crm/enquiries/[id]/admin_crm_enquiries_id_components/AdminCrmEnquiriesIdClient';

export default function page({ params }: { params: Promise<{ id: string }> }) {
  return <AdminCrmEnquiriesIdClient params={params} />;
}
