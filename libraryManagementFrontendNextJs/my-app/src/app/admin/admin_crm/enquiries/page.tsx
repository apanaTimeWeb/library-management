// RESPONSIBILITY: Server Component entry for the CRM Enquiries page. Delegates all interactivity to AdminCrmEnquiriesClient.
// DATA FLOW: Next.js Router -> AdminCrmEnquiriesPage (Server) -> AdminCrmEnquiriesClient (Client)

import AdminCrmEnquiriesClient from '@/app/admin/admin_crm/enquiries/AdminCrmEnquiriesClient';

export default function AdminCrmEnquiriesPage() {
  return <AdminCrmEnquiriesClient />;
}
