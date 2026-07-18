/**
 * RESPONSIBILITY: Logic and state management for the SubscriptionsClient component.
 */
import { useState, useEffect } from 'react';
import { SUPERADMIN_FINANCE_MOCK_SUBSCRIPTIONS } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';

export function useSubscriptionsClient() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [shiftFilter, setShiftFilter] = useState('all');
  const [rows, setRows] = useState(SUPERADMIN_FINANCE_MOCK_SUBSCRIPTIONS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setRows(
      SUPERADMIN_FINANCE_MOCK_SUBSCRIPTIONS.filter((s) => {
        const st = statusFilter === 'all' || s.status === statusFilter;
        const pl = planFilter === 'all' || s.plan === planFilter;
        const sh = shiftFilter === 'all' || s.shift === shiftFilter;
        return st && pl && sh;
      })
    );
  }, [statusFilter, planFilter, shiftFilter]);

  return {
    statusFilter, setStatusFilter,
    planFilter, setPlanFilter,
    shiftFilter, setShiftFilter,
    rows,
    isLoading,
  };
}
