import { fetchApi } from '@/lib/api';
import { SUPERADMIN_API_ROUTES } from '@/app/superadmin/superadmin_url_config';

const ENGAGEMENT_ENDPOINT = SUPERADMIN_API_ROUTES.ENGAGEMENT;

export async function fetchEngagementData(): Promise<unknown> {
  const response = await fetchApi(ENGAGEMENT_ENDPOINT);
  return response;
}
