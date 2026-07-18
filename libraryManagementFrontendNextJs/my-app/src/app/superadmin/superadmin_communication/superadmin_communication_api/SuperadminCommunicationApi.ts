// RESPONSIBILITY: Fetches superadmin communication data.
import { fetchApi } from '@/lib/api';
import { SUPERADMIN_API_ROUTES } from '@/app/superadmin/Superadminsuperadmin_url_config';
import type { ApiResponse } from '@/app/superadmin/superadmin_shared_components/Superadminsuperadmin_types';

const COMMUNICATION_ENDPOINT = SUPERADMIN_API_ROUTES.COMMUNICATION;

export async function fetchCommunicationData(): Promise<ApiResponse<unknown>> {
  const response = await fetchApi(COMMUNICATION_ENDPOINT);
  return response as ApiResponse<unknown>;
}
