// RESPONSIBILITY: Renders or handles logic for manager_crm_api.ts.
import { fetchApi } from '@/lib/api';

export async function fetchEnquiries(): Promise<unknown[]> {
  return await fetchApi('/crm/enquiries');
}

