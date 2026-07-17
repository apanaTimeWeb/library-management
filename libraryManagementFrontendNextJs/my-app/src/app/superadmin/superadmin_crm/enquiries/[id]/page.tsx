import { EnquiriesIdClient } from '@/app/superadmin/superadmin_crm/enquiries/[id]/_components/EnquiriesIdClient';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  return <EnquiriesIdClient params={params} />;
}
