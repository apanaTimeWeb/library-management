import { useState, useCallback } from 'react';
import type { SuperadminBillingInvoice } from '@/app/superadmin/superadmin_billing/superadmin_billing_types/SuperadminBillingTypes';
import { SUPERADMIN_BILLING_MOCK_INVOICES } from '@/app/superadmin/superadmin_billing/superadmin_billing_constants/SuperadminBillingConstants';

import { markInvoicePaidApi } from '@/app/superadmin/superadmin_billing/superadmin_billing_api/SuperadminBillingApi';

// DATA FLOW: API → useSuperadminBilling.ts → SuperadminBillingComponent
export function superadmin_useSuperadminBilling() {
  const [invoices, setInvoices] = useState<SuperadminBillingInvoice[]>(SUPERADMIN_BILLING_MOCK_INVOICES);

  const markInvoicePaid = useCallback(async (id: string) => {
    try {
      await markInvoicePaidApi(id);
      setInvoices(current => current.map(inv => inv.id === id ? { ...inv, status: 'Paid', method: 'Manual' } : inv));
    } catch (error) {
      console.error('Failed to mark invoice paid', error);
    }
  }, []);

  return {
    invoices,
    markInvoicePaid,
  };
}
