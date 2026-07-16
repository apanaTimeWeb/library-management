import { fetchApi } from '@/lib/api';

const SUBSCRIPTIONS_ENDPOINT = '/superadmin/subscriptions/plans';

export async function fetchSubscriptions(): Promise<any> {
  const response = await fetchApi(SUBSCRIPTIONS_ENDPOINT);
  return response;
}
