import { useState, useEffect, useMemo } from 'react';
import { ADMIN_FINANCE_MOCK_REFERRERS } from '@/app/admin/admin_finance/admin_finance_constants/AdminFinanceConstants';

export function useFinanceReferrals() {
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const totalReferrals = useMemo(() => {
    return ADMIN_FINANCE_MOCK_REFERRERS.reduce((a, r) => a + r.referredCount, 0);
  }, []);

  const totalBonus = useMemo(() => {
    return ADMIN_FINANCE_MOCK_REFERRERS.reduce((a, r) => a + r.bonusEarned, 0);
  }, []);

  const topReferrer = useMemo(() => {
    return ADMIN_FINANCE_MOCK_REFERRERS[0];
  }, []);

  const referrers = ADMIN_FINANCE_MOCK_REFERRERS;

  return {
    isLoading,
    expanded,
    setExpanded,
    totalReferrals,
    totalBonus,
    topReferrer,
    referrers
  };
}
