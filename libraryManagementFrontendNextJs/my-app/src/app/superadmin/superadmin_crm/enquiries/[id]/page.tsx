// RESPONSIBILITY: Component or Page.
import { SuperadminEnquiriesIdClient } from '@/app/superadmin/superadmin_crm/enquiries/[id]/_components/SuperadminEnquiriesIdClient';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  return <SuperadminEnquiriesIdClient params={params} />;
}
