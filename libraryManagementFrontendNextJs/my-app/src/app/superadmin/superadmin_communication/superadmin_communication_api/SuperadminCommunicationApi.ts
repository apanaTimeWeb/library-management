import { fetchApi } from '@/lib/api';

const COMMUNICATION_ENDPOINT = '/superadmin/communication';

export async function fetchCommunicationData(): Promise<unknown> {
  const response = await fetchApi(COMMUNICATION_ENDPOINT);
  return response;
}
