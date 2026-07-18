import { fetchApi } from '@/lib/api';
import { SUPERADMIN_API_ROUTES } from '@/app/superadmin/superadmin_url_config';
import type { SuperadminBillingInvoice } from '@/app/superadmin/superadmin_billing/superadmin_billing_types/SuperadminBillingTypes';

const BILLING_ENDPOINT = SUPERADMIN_API_ROUTES.BILLING_INVOICES;

export async function fetchInvoices(): Promise<{ data: SuperadminBillingInvoice[] }> {
  const response = await fetchApi(BILLING_ENDPOINT);
  return response as { data: SuperadminBillingInvoice[] };
}

export async function markInvoicePaidApi(id: string): Promise<void> {
  await fetchApi(`${BILLING_ENDPOINT}/${id}/mark-paid`, {
    method: 'PATCH',
  });
}
