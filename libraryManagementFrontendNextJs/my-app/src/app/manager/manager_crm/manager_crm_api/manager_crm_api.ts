import { fetchApi } from '@/lib/api';

export async function fetchEnquiries(): Promise<unknown[]> {
  return await fetchApi('/crm/enquiries');
}
