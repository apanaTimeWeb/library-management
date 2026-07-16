import { useState, useCallback } from 'react';
import type { SuperadminSubscription } from '@/app/superadmin/superadmin_subscriptions/superadmin_subscriptions_types/SuperadminSubscriptionsTypes';
import { SUPERADMIN_SUBSCRIPTIONS_MOCK_DATA } from '@/app/superadmin/superadmin_subscriptions/superadmin_subscriptions_constants/SuperadminSubscriptionsConstants';

// DATA FLOW: API → superadmin_useSuperadminSubscriptions.ts → SuperadminSubscriptionsComponent
export function superadmin_useSuperadminSubscriptions() {
  const [subs, setSubs] = useState<SuperadminSubscription[]>(SUPERADMIN_SUBSCRIPTIONS_MOCK_DATA);
  const [filter, setFilter] = useState('All');

  const updateSubscription = useCallback(async (updated: SuperadminSubscription) => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 800));
    setSubs(current => current.map(s => s.id === updated.id ? updated : s));
  }, []);

  const renewSubscription = useCallback(async (id: string) => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 1200));
    setSubs(current => current.map(s => s.id === id ? { ...s, status: 'Paid' } : s));
  }, []);

  const filteredSubs = filter === 'All' ? subs : subs.filter(s => s.status === filter);

  return {
    subs,
    filteredSubs,
    filter,
    setFilter,
    updateSubscription,
    renewSubscription,
  };
}
