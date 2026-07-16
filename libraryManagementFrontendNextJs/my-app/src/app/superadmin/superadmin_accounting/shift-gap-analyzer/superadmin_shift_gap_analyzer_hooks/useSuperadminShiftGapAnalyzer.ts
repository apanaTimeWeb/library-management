import { useState, useMemo } from 'react';
import { SUPERADMIN_SHIFT_GAPS_MOCK, SUPERADMIN_DAY_GAPS_MOCK } from '@/app/superadmin/superadmin_accounting/shift-gap-analyzer/superadmin_shift_gap_analyzer_constants/SuperadminShiftGapAnalyzerConstants';

export function useSuperadminShiftGapAnalyzer() {
  const [shiftFilter, setShiftFilter] = useState('all');

  const visibleDays = useMemo(() => {
    return shiftFilter === 'all' ? SUPERADMIN_DAY_GAPS_MOCK : SUPERADMIN_DAY_GAPS_MOCK.filter(d => d.shift === shiftFilter);
  }, [shiftFilter]);

  const { totalLoss, totalVacant, avgOccupancy, shiftsAnalyzed } = useMemo(() => {
    const loss = SUPERADMIN_SHIFT_GAPS_MOCK.reduce((s, m) => s + m.revenueLoss, 0);
    const vacant = SUPERADMIN_SHIFT_GAPS_MOCK.reduce((s, m) => s + m.vacant, 0);
    const sumOccupancy = SUPERADMIN_SHIFT_GAPS_MOCK.reduce((s, m) => s + m.occupancyPct, 0);
    const avg = SUPERADMIN_SHIFT_GAPS_MOCK.length > 0 ? Math.round(sumOccupancy / SUPERADMIN_SHIFT_GAPS_MOCK.length) : 0;

    return {
      totalLoss: loss,
      totalVacant: vacant,
      avgOccupancy: avg,
      shiftsAnalyzed: SUPERADMIN_SHIFT_GAPS_MOCK.length
    };
  }, []);

  return {
    shiftGaps: SUPERADMIN_SHIFT_GAPS_MOCK,
    visibleDays,
    shiftFilter,
    setShiftFilter,
    totalLoss,
    totalVacant,
    avgOccupancy,
    shiftsAnalyzed
  };
}
