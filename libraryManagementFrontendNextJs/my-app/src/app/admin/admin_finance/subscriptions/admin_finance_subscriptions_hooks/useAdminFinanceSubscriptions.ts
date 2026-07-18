// RESPONSIBILITY: Renders the useAdminFinanceSubscriptions.ts component/hook.
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ADMIN_FINANCE_MOCK_SUBSCRIPTIONS } from '@/app/admin/admin_finance/admin_finance_constants/AdminFinanceConstants';

export function useAdminFinanceSubscriptions() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [shiftFilter, setShiftFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const rows = useMemo(() => {
    return ADMIN_FINANCE_MOCK_SUBSCRIPTIONS.filter((s) => {
      const st = statusFilter === 'all' || s.status === statusFilter;
      const pl = planFilter === 'all' || s.plan === planFilter;
      const sh = shiftFilter === 'all' || s.shift === shiftFilter;
      return st && pl && sh;
    });
  }, [statusFilter, planFilter, shiftFilter]);

  const handleRenew = (id: number) => {
    router.push(`${ADMIN_ROUTES.FINANCE_COLLECT_FEE}?studentId=${id}&renew=true`);
  };

  const handleView = (name: string) => {
    toast.success(`Viewing subscription for ${name}`);
  };

  return {
    statusFilter,
    setStatusFilter,
    planFilter,
    setPlanFilter,
    shiftFilter,
    setShiftFilter,
    rows,
    isLoading,
    handleRenew,
    handleView
  };
}
