import { fetchApi } from '@/lib/api';
import { SUPERADMIN_API_ROUTES } from '@/app/superadmin/superadmin_url_config';

const SUBSCRIPTIONS_ENDPOINT = `${SUPERADMIN_API_ROUTES.SUBSCRIPTIONS}/plans`;

export async function fetchSubscriptions(): Promise<unknown> {
  const response = await fetchApi(SUBSCRIPTIONS_ENDPOINT);
  return response;
}
