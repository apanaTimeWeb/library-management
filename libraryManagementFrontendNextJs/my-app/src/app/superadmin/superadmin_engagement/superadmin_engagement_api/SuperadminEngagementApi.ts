import { fetchApi } from '@/lib/api';

const ENGAGEMENT_ENDPOINT = '/superadmin/engagement';

export async function fetchEngagementData(): Promise<any> {
  const response = await fetchApi(ENGAGEMENT_ENDPOINT);
  return response;
}
