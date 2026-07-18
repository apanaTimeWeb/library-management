// RESPONSIBILITY: Fetches superadmin subscriptions data.
import { fetchApi } from '@/lib/api';
import { SUPERADMIN_API_ROUTES } from '@/app/superadmin/Superadminsuperadmin_url_config';
import type { ApiResponse } from '@/app/superadmin/superadmin_shared_components/Superadminsuperadmin_types';

const SUBSCRIPTIONS_ENDPOINT = `${SUPERADMIN_API_ROUTES.SUBSCRIPTIONS}/plans`;

export async function fetchSubscriptions(): Promise<ApiResponse<unknown>> {
  const response = await fetchApi(SUBSCRIPTIONS_ENDPOINT);
  return response as ApiResponse<unknown>;
}
