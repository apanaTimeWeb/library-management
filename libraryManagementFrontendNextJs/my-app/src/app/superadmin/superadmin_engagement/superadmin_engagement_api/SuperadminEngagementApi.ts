// RESPONSIBILITY: Fetches superadmin engagement data.
import { fetchApi } from '@/lib/api';
import { SUPERADMIN_API_ROUTES } from '@/app/superadmin/Superadminsuperadmin_url_config';
import type { ApiResponse } from '@/app/superadmin/superadmin_shared_components/Superadminsuperadmin_types';

const ENGAGEMENT_ENDPOINT = SUPERADMIN_API_ROUTES.ENGAGEMENT;

export async function fetchEngagementData(): Promise<ApiResponse<unknown>> {
  const response = await fetchApi(ENGAGEMENT_ENDPOINT);
  return response as ApiResponse<unknown>;
}
