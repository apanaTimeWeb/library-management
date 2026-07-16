'use client';
import React, { useState } from 'react';
import { superadmin_useSuperadminDailySettlement as useSuperadminDailySettlement } from '@/app/superadmin/superadmin_accounting/daily-settlement/superadmin_daily_settlement_hooks/superadmin_useSuperadminDailySettlement';
import { SuperadminDailySettlementHeader } from '@/app/superadmin/superadmin_accounting/daily-settlement/superadmin_daily_settlement_components/SuperadminDailySettlementHeader';
import { SuperadminDailySettlementKpiGrid } from '@/app/superadmin/superadmin_accounting/daily-settlement/superadmin_daily_settlement_components/SuperadminDailySettlementKpiGrid';
import { SuperadminDailySettlementGrid } from '@/app/superadmin/superadmin_accounting/daily-settlement/superadmin_daily_settlement_components/SuperadminDailySettlementGrid';

export function SuperadminDailySettlementClient() {
  const { 
    date, 
    setDate, 
    entries, 
    handleSettle, 
    totalCash, 
    totalUpi, 
    totalExp 
  } = useSuperadminDailySettlement();

  const [toast, setToast] = useState('');
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const onSettleShift = async (id: number) => {
    await handleSettle(id);
    showToast('✅ Shift settled successfully');
  };

  return (
    <div className="relative p-2 sm:p-4">
      {toast && (
        <div className="fixed top-24 right-8 z-50 bg-bg-card border border-border shadow-xl rounded-[var(--radius-md)] px-4 py-3 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="text-sm font-semibold text-text-primary">{toast}</span>
        </div>
      )}

      <SuperadminDailySettlementHeader 
        date={date} 
        setDate={setDate} 
      />
      
      <SuperadminDailySettlementKpiGrid 
        totalCash={totalCash} 
        totalUpi={totalUpi} 
        totalExp={totalExp} 
      />
      
      <SuperadminDailySettlementGrid 
        entries={entries} 
        onSettle={onSettleShift} 
      />
    </div>
  );
}
