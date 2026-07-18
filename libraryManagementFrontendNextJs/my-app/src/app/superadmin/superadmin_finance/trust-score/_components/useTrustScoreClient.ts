/**
 * RESPONSIBILITY: Logic and state management for the TrustScoreClient component.
 */
import { useState, useEffect } from 'react';
import type { SuperadminFinanceTrustScoreStudent } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';
import { SUPERADMIN_FINANCE_MOCK_STUDENTS_TRUST } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';

export function useTrustScoreClient() {
  const [levelFilter, setLevelFilter] = useState('all');
  const [shiftFilter, setShiftFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const filtered = (SUPERADMIN_FINANCE_MOCK_STUDENTS_TRUST as SuperadminFinanceTrustScoreStudent[]).filter((s) => {
    const lm = levelFilter === 'all' || s.badge === levelFilter;
    const sm = shiftFilter === 'all' || s.shift === shiftFilter;
    return lm && sm;
  });

  const lowTrust = SUPERADMIN_FINANCE_MOCK_STUDENTS_TRUST.filter((s) => s.trustScore < 40).length;
  const avg = Math.round(SUPERADMIN_FINANCE_MOCK_STUDENTS_TRUST.reduce((a, s) => a + s.trustScore, 0) / SUPERADMIN_FINANCE_MOCK_STUDENTS_TRUST.length);
  const total = SUPERADMIN_FINANCE_MOCK_STUDENTS_TRUST.length;

  return {
    levelFilter,
    setLevelFilter,
    shiftFilter,
    setShiftFilter,
    isLoading,
    filtered,
    lowTrust,
    avg,
    total,
  };
}
