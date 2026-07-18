import { fetchApi } from '@/lib/api';
import { SUPERADMIN_API_ROUTES } from '@/app/superadmin/superadmin_url_config';

const COMMUNICATION_ENDPOINT = SUPERADMIN_API_ROUTES.COMMUNICATION;

export async function fetchCommunicationData(): Promise<unknown> {
  const response = await fetchApi(COMMUNICATION_ENDPOINT);
  return response;
}
