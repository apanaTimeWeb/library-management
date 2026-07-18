// RESPONSIBILITY: Manages superadmin billing and invoices.
import { fetchApi } from '@/lib/api';
import { SUPERADMIN_API_ROUTES } from '@/app/superadmin/superadmin_url_config';
import type { SuperadminBillingInvoice } from '@/app/superadmin/superadmin_billing/superadmin_billing_types/SuperadminBillingTypes';
import type { ApiResponse } from '@/app/superadmin/superadmin_shared_components/superadmin_types';

const BILLING_ENDPOINT = SUPERADMIN_API_ROUTES.BILLING_INVOICES;

export async function fetchInvoices(): Promise<ApiResponse<SuperadminBillingInvoice[]>> {
  const response = await fetchApi(BILLING_ENDPOINT);
  return response as ApiResponse<SuperadminBillingInvoice[]>;
}

export async function markInvoicePaidApi(id: string): Promise<ApiResponse<null>> {
  const response = await fetchApi(SUPERADMIN_API_ROUTES.BILLING_INVOICES_MARK_PAID(id), {
    method: 'PATCH',
  });
  return response as ApiResponse<null>;
}
