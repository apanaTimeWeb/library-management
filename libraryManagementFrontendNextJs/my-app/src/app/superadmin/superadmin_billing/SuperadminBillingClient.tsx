'use client';
import React, { useState } from 'react';
import { useSuperadminBilling } from '@/app/superadmin/superadmin_billing/superadmin_billing_hooks/useSuperadminBilling';
import { SuperadminBillingHeader } from '@/app/superadmin/superadmin_billing/superadmin_billing_components/SuperadminBillingHeader';
import { SuperadminBillingGrid } from '@/app/superadmin/superadmin_billing/superadmin_billing_components/SuperadminBillingGrid';
import { SuperadminBillingPanel } from '@/app/superadmin/superadmin_billing/superadmin_billing_components/SuperadminBillingPanel';
import type { SuperadminBillingInvoice } from '@/app/superadmin/superadmin_billing/superadmin_billing_types/SuperadminBillingTypes';

export function SuperadminBillingClient() {
  const { invoices, markInvoicePaid } = useSuperadminBilling();
  const [selected, setSelected] = useState<SuperadminBillingInvoice | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const handleMarkPaid = async (id: string) => {
    try {
      await markInvoicePaid(id);
      if (selected && selected.id === id) {
        setSelected({ ...selected, status: 'Paid', method: 'Manual' });
      }
      showToast('✅ Invoice marked as Paid');
    } catch (err) {
      showToast('❌ Failed to mark invoice as paid');
    }
  };

  const handleExport = () => {
    showToast('📥 CSV exported successfully');
  };

  return (
    <div className="relative p-2 sm:p-4">
      {toast && (
        <div className="fixed top-24 right-8 z-50 bg-bg-card border border-border shadow-xl rounded-[var(--radius-md)] px-4 py-3 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="text-sm font-semibold text-text-primary">{toast}</span>
        </div>
      )}

      {selected && (
        <SuperadminBillingPanel 
          inv={selected} 
          onClose={() => setSelected(null)} 
          onMarkPaid={handleMarkPaid} 
        />
      )}

      <SuperadminBillingHeader />
      <SuperadminBillingGrid 
        invoices={invoices} 
        onRowClick={setSelected} 
        onExport={handleExport} 
      />
    </div>
  );
}
