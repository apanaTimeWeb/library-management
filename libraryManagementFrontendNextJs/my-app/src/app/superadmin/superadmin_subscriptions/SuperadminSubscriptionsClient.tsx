'use client';
import React, { useState } from 'react';
import { useSuperadminSubscriptions } from '@/app/superadmin/superadmin_subscriptions/superadmin_subscriptions_hooks/superadmin_useSuperadminSubscriptions';
import { SuperadminSubscriptionsHeader } from '@/app/superadmin/superadmin_subscriptions/superadmin_subscriptions_components/SuperadminSubscriptionsHeader';
import { SuperadminSubscriptionsKpiGrid } from '@/app/superadmin/superadmin_subscriptions/superadmin_subscriptions_components/SuperadminSubscriptionsKpiGrid';
import { SuperadminSubscriptionsGrid } from '@/app/superadmin/superadmin_subscriptions/superadmin_subscriptions_components/SuperadminSubscriptionsGrid';
import { SuperadminSubscriptionsPanel } from '@/app/superadmin/superadmin_subscriptions/superadmin_subscriptions_components/SuperadminSubscriptionsPanel';
import type { SuperadminSubscription } from '@/app/superadmin/superadmin_subscriptions/superadmin_subscriptions_types/SuperadminSubscriptionsTypes';
import { SUPERADMIN_SUBSCRIPTIONS_KPI } from '@/app/superadmin/superadmin_subscriptions/superadmin_subscriptions_constants/SuperadminSubscriptionsConstants';

export function SuperadminSubscriptionsClient() {
  const { subs, filteredSubs, filter, setFilter, updateSubscription, renewSubscription } = useSuperadminSubscriptions();
  const [selected, setSelected] = useState<SuperadminSubscription | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const handleUpdate = async (updated: SuperadminSubscription) => {
    try {
      await updateSubscription(updated);
      setSelected(updated);
      showToast(`✅ ${updated.tenant} subscription updated`);
    } catch (err) {
      showToast(`❌ Failed to update subscription`);
    }
  };

  const handleRenew = async (id: string) => {
    try {
      await renewSubscription(id);
      if (selected && selected.id === id) {
        setSelected({ ...selected, status: 'Paid' });
      }
      showToast(`✅ Subscription successfully renewed`);
    } catch (err) {
      showToast(`❌ Failed to renew subscription`);
    }
  };

  return (
    <div className="relative p-2 sm:p-4">
      {toast && (
        <div className="fixed top-24 right-8 z-50 bg-bg-card border border-border shadow-xl rounded-[var(--radius-md)] px-4 py-3 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="text-sm font-semibold text-text-primary">{toast}</span>
        </div>
      )}

      {selected && (
        <SuperadminSubscriptionsPanel 
          sub={selected} 
          onClose={() => setSelected(null)} 
          onUpdate={handleUpdate}
          onRenew={handleRenew}
        />
      )}

      <SuperadminSubscriptionsHeader />
      <SuperadminSubscriptionsKpiGrid kpis={SUPERADMIN_SUBSCRIPTIONS_KPI} />
      <SuperadminSubscriptionsGrid 
        subs={subs}
        filteredSubs={filteredSubs}
        filter={filter}
        setFilter={setFilter}
        onRowClick={setSelected}
      />
    </div>
  );
}
