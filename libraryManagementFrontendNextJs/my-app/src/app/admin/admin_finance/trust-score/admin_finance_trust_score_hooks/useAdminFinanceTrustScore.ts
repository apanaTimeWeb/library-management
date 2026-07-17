import { useState, useEffect } from 'react';
import { ADMIN_FINANCE_MOCK_TRUST_SCORE } from '@/app/admin/admin_finance/admin_finance_constants/AdminFinanceConstants';
import { AdminFinanceTrustScoreStudent } from '../admin_finance_trust_score_types/admin_finance_trust_score_types';

export function useAdminFinanceTrustScore() {
  const [levelFilter, setLevelFilter] = useState('all');
  const [shiftFilter, setShiftFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const filtered = (ADMIN_FINANCE_MOCK_TRUST_SCORE as AdminFinanceTrustScoreStudent[]).filter((s) => {
    const ml = levelFilter === 'all' || s.badge === levelFilter;
    const ms = shiftFilter === 'all' || s.shift === shiftFilter;
    return ml && ms;
  });

  const lowTrust = (ADMIN_FINANCE_MOCK_TRUST_SCORE as AdminFinanceTrustScoreStudent[]).filter((s) => s.trustScore < 40).length;
  const avg = Math.round((ADMIN_FINANCE_MOCK_TRUST_SCORE as AdminFinanceTrustScoreStudent[]).reduce((a, s) => a + s.trustScore, 0) / (ADMIN_FINANCE_MOCK_TRUST_SCORE as AdminFinanceTrustScoreStudent[]).length);

  return {
    levelFilter, setLevelFilter,
    shiftFilter, setShiftFilter,
    isLoading, filtered, lowTrust, avg,
    totalCount: ADMIN_FINANCE_MOCK_TRUST_SCORE.length
  };
}
