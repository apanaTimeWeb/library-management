// RESPONSIBILITY: Fetches superadmin CRM data.
import { fetchApi } from '@/lib/api';
import { SUPERADMIN_API_ROUTES } from '@/app/superadmin/superadmin_url_config';
import type { ApiResponse } from '@/app/superadmin/superadmin_shared_components/superadmin_types';

const CRM_ENDPOINT = SUPERADMIN_API_ROUTES.CRM_ENQUIRIES;

export async function fetchCrmData(): Promise<ApiResponse<unknown>> {
  const response = await fetchApi(CRM_ENDPOINT);
  return response as ApiResponse<unknown>;
}
