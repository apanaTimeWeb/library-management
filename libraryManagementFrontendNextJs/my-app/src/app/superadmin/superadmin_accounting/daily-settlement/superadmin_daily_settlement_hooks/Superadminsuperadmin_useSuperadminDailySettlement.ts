import { useState, useMemo } from 'react';
import type { SuperadminDailySettlementEntry } from '@/app/superadmin/superadmin_accounting/daily-settlement/superadmin_daily_settlement_types/SuperadminDailySettlementTypes';
import { SUPERADMIN_DAILY_SETTLEMENT_MOCK_DATA } from '@/app/superadmin/superadmin_accounting/daily-settlement/superadmin_daily_settlement_constants/SuperadminDailySettlementConstants';

const TODAY = new Date().toISOString().split('T')[0];

// RESPONSIBILITY: Hook managing daily settlement records, totals, and settlement state transitions.
// DATA FLOW: API → useSuperadminDailySettlement.ts → SuperadminDailySettlementComponent
export function Superadminsuperadmin_useSuperadminDailySettlement() {
  const [date, setDate] = useState(TODAY);
  const [entries, setEntries] = useState<SuperadminDailySettlementEntry[]>(SUPERADMIN_DAILY_SETTLEMENT_MOCK_DATA);

  const handleSettle = async (id: number) => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 800));
    setEntries(prev => prev.map(( e: SuperadminDailySettlementEntry ) => 
      e.id === id ? { ...e, status: 'settled', settledBy: 'Super Admin' } : e
    ));
  };

  const { totalCash, totalUpi, totalExp } = useMemo(() => {
    return {
      totalCash: entries.reduce((s, e) => s + e.cashCollected, 0),
      totalUpi: entries.reduce((s, e) => s + e.upiCollected, 0),
      totalExp: entries.reduce((s, e) => s + e.expenses, 0)
    };
  }, [entries]);

  return {
    date,
    setDate,
    entries,
    handleSettle,
    totalCash,
    totalUpi,
    totalExp
  };
}
