'use client';
import React, { useState } from 'react';
import { useSuperadminSubscriptions } from './superadmin_subscriptions_hooks/useSuperadminSubscriptions';
import { SuperadminSubscriptionsHeader } from './superadmin_subscriptions_components/SuperadminSubscriptionsHeader';
import { SuperadminSubscriptionsKpiGrid } from './superadmin_subscriptions_components/SuperadminSubscriptionsKpiGrid';
import { SuperadminSubscriptionsGrid } from './superadmin_subscriptions_components/SuperadminSubscriptionsGrid';
import { SuperadminSubscriptionsPanel } from './superadmin_subscriptions_components/SuperadminSubscriptionsPanel';
import type { SuperadminSubscription } from './superadmin_subscriptions_types/SuperadminSubscriptionsTypes';
import { SUPERADMIN_SUBSCRIPTIONS_KPI } from './superadmin_subscriptions_constants/SuperadminSubscriptionsConstants';

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
        <div className="fixed top-24 right-8 z-50 bg-[var(--bg-card)] border border-[var(--border)] shadow-xl rounded-[var(--radius-md)] px-4 py-3 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="text-sm font-semibold text-[var(--text-primary)]">{toast}</span>
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
