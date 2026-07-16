'use client';
import React from 'react';
import { useSuperadminShiftGapAnalyzer } from '@/app/superadmin/superadmin_accounting/shift-gap-analyzer/superadmin_shift_gap_analyzer_hooks/useSuperadminShiftGapAnalyzer';
import { SuperadminShiftGapAnalyzerHeader } from '@/app/superadmin/superadmin_accounting/shift-gap-analyzer/superadmin_shift_gap_analyzer_components/SuperadminShiftGapAnalyzerHeader';
import { SuperadminShiftGapAnalyzerKpiGrid } from '@/app/superadmin/superadmin_accounting/shift-gap-analyzer/superadmin_shift_gap_analyzer_components/SuperadminShiftGapAnalyzerKpiGrid';
import { SuperadminShiftGapAnalyzerSummaryCards } from '@/app/superadmin/superadmin_accounting/shift-gap-analyzer/superadmin_shift_gap_analyzer_components/SuperadminShiftGapAnalyzerSummaryCards';
import { SuperadminShiftGapAnalyzerFilterBar } from '@/app/superadmin/superadmin_accounting/shift-gap-analyzer/superadmin_shift_gap_analyzer_components/SuperadminShiftGapAnalyzerFilterBar';
import { SuperadminShiftGapAnalyzerTable } from '@/app/superadmin/superadmin_accounting/shift-gap-analyzer/superadmin_shift_gap_analyzer_components/SuperadminShiftGapAnalyzerTable';

export function SuperadminShiftGapAnalyzerClient() {
  const { 
    shiftGaps,
    visibleDays,
    shiftFilter,
    setShiftFilter,
    totalLoss,
    totalVacant,
    avgOccupancy,
    shiftsAnalyzed
  } = useSuperadminShiftGapAnalyzer();

  return (
    <div className="relative p-2 sm:p-4">
      <SuperadminShiftGapAnalyzerHeader />
      
      <SuperadminShiftGapAnalyzerKpiGrid 
        totalLoss={totalLoss} 
        totalVacant={totalVacant} 
        avgOccupancy={avgOccupancy} 
        shiftsAnalyzed={shiftsAnalyzed} 
      />
      
      <SuperadminShiftGapAnalyzerSummaryCards shifts={shiftGaps} />
      
      <SuperadminShiftGapAnalyzerFilterBar 
        shiftFilter={shiftFilter} 
        setShiftFilter={setShiftFilter} 
      />
      
      <SuperadminShiftGapAnalyzerTable days={visibleDays} />
    </div>
  );
}
