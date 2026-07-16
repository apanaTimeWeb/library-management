import { useState, useCallback } from 'react';
import type { SuperadminBillingInvoice } from '../superadmin_billing_types/SuperadminBillingTypes';
import { SUPERADMIN_BILLING_MOCK_INVOICES } from '../superadmin_billing_constants/SuperadminBillingConstants';

export function useSuperadminBilling() {
  const [invoices, setInvoices] = useState<SuperadminBillingInvoice[]>(SUPERADMIN_BILLING_MOCK_INVOICES);

  const markInvoicePaid = useCallback(async (id: string) => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 1200));
    setInvoices(current => current.map(inv => inv.id === id ? { ...inv, status: 'Paid', method: 'Manual' } : inv));
  }, []);

  return {
    invoices,
    markInvoicePaid,
  };
}
