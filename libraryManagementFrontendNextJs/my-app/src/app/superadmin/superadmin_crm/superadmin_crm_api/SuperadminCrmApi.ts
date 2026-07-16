import { fetchApi } from '@/lib/api';

const CRM_ENDPOINT = '/superadmin/crm';

export async function fetchCrmData(): Promise<any> {
  const response = await fetchApi(CRM_ENDPOINT);
  return response;
}
