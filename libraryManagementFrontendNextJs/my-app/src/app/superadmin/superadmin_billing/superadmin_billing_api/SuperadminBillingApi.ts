import { fetchApi } from '@/lib/api';
import type { SuperadminBillingInvoice } from '@/app/superadmin/superadmin_billing/superadmin_billing_types/SuperadminBillingTypes';

const BILLING_ENDPOINT = '/superadmin/billing/invoices';

export async function fetchInvoices(): Promise<{ data: SuperadminBillingInvoice[] }> {
  const response = await fetchApi(BILLING_ENDPOINT);
  return response as { data: SuperadminBillingInvoice[] };
}

export async function markInvoicePaidApi(id: string): Promise<void> {
  await fetchApi(`${BILLING_ENDPOINT}/${id}/mark-paid`, {
    method: 'PATCH',
  });
}
